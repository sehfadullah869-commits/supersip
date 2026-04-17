import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrdersLib "../lib/orders";
import OrderTypes "../types/orders";
import ProductTypes "../types/products";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
) {
  // --- Authenticated user endpoints ---

  public shared ({ caller }) func createOrder(input : OrderTypes.CreateOrderInput) : async Common.OrderId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to place an order");
    };
    let nextId = orders.size() + 1;
    OrdersLib.createOrder(orders, products, nextId, caller, input);
  };

  public query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view orders");
    };
    OrdersLib.getMyOrders(orders, caller);
  };

  public query ({ caller }) func getOrderById(id : Common.OrderId) : async ?OrderTypes.Order {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    OrdersLib.getOrderById(orders, caller, isAdmin, id);
  };

  // --- Admin endpoints ---

  public query ({ caller }) func getAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrdersLib.getAllOrders(orders);
  };

  public shared ({ caller }) func updateOrderStatus(id : Common.OrderId, status : OrderTypes.OrderStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrdersLib.updateOrderStatus(orders, id, status);
  };
};
