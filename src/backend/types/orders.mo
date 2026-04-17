import Common "common";

module {
  public type OrderStatus = {
    #Pending;
    #Processing;
    #Shipped;
    #Delivered;
    #Cancelled;
  };

  public type OrderItem = {
    productId : Common.ProductId;
    quantity : Nat;
    priceAtPurchase : Nat;
  };

  public type Order = {
    id : Common.OrderId;
    customerId : Principal;
    items : [OrderItem];
    total : Nat;
    deliveryAddress : Text;
    status : OrderStatus;
    createdAt : Common.Timestamp;
  };

  public type CreateOrderInput = {
    items : [OrderItem];
    deliveryAddress : Text;
  };
};
