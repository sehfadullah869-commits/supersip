import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import OrderTypes "../types/orders";
import ProductTypes "../types/products";
import Common "../types/common";

module {
  // Creates an order, validates stock, decrements stock, computes total.
  // products map is passed for validation + mutation.
  public func createOrder(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    nextId : Nat,
    caller : Principal,
    input : OrderTypes.CreateOrderInput,
  ) : Common.OrderId {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in to place an order");
    };
    if (input.items.size() == 0) {
      Runtime.trap("Order must contain at least one item");
    };

    // Validate all items and compute total
    var total : Nat = 0;
    for (item in input.items.vals()) {
      switch (products.get(item.productId)) {
        case null { Runtime.trap("Product not found: " # item.productId.toText()) };
        case (?p) {
          if (not p.isActive) {
            Runtime.trap("Product is unavailable: " # p.name);
          };
          if (p.stock < item.quantity) {
            Runtime.trap("Insufficient stock for: " # p.name);
          };
          total += p.price * item.quantity;
        };
      };
    };

    // Decrement stock for each item
    for (item in input.items.vals()) {
      switch (products.get(item.productId)) {
        case null { Runtime.trap("Product not found during stock update") };
        case (?p) {
          products.add(item.productId, { p with stock = p.stock - item.quantity });
        };
      };
    };

    // Build order items with server-side price-at-purchase snapshot
    let orderItems : [OrderTypes.OrderItem] = input.items.map(
      func(item : OrderTypes.OrderItem) : OrderTypes.OrderItem {
        let price = switch (products.get(item.productId)) {
          case (?p) { p.price };
          case null { 0 };
        };
        { productId = item.productId; quantity = item.quantity; priceAtPurchase = price };
      }
    );

    let id = nextId;
    let order : OrderTypes.Order = {
      id;
      customerId = caller;
      items = orderItems;
      total;
      deliveryAddress = input.deliveryAddress;
      status = #Pending;
      createdAt = Time.now();
    };
    orders.add(id, order);
    id;
  };

  // Returns all orders for the caller, sorted newest-first
  public func getMyOrders(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    caller : Principal,
  ) : [OrderTypes.Order] {
    let mine = orders.values().filter(func(o) {
      Principal.equal(o.customerId, caller)
    }).toArray();
    mine.sort(func(a, b) { Int.compare(b.createdAt, a.createdAt) });
  };

  // Returns an order only if caller is owner or admin check is done at mixin layer
  public func getOrderById(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    caller : Principal,
    isAdmin : Bool,
    id : Common.OrderId,
  ) : ?OrderTypes.Order {
    switch (orders.get(id)) {
      case null { null };
      case (?o) {
        if (Principal.equal(o.customerId, caller) or isAdmin) {
          ?o
        } else {
          Runtime.trap("Unauthorized: You can only view your own orders");
        };
      };
    };
  };

  // Returns all orders (admin only — caller check at mixin layer)
  public func getAllOrders(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>
  ) : [OrderTypes.Order] {
    orders.values().toArray()
      .sort(func(a, b) { Int.compare(b.createdAt, a.createdAt) });
  };

  // Updates an order's status (admin only — caller check at mixin layer)
  public func updateOrderStatus(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    id : Common.OrderId,
    status : OrderTypes.OrderStatus,
  ) {
    switch (orders.get(id)) {
      case null { Runtime.trap("Order not found") };
      case (?o) {
        orders.add(id, { o with status });
      };
    };
  };
};
