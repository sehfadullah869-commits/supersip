import Common "common";

module {
  public type Category = {
    #ColdDrink;
    #MineralWater;
    #Juice;
  };

  public type Product = {
    id : Common.ProductId;
    name : Text;
    category : Category;
    description : Text;
    price : Nat;
    imageUrl : Text;
    stock : Nat;
    isActive : Bool;
  };

  public type CreateProductInput = {
    name : Text;
    category : Category;
    description : Text;
    price : Nat;
    imageUrl : Text;
    stock : Nat;
  };

  public type UpdateProductInput = {
    id : Common.ProductId;
    name : Text;
    category : Category;
    description : Text;
    price : Nat;
    imageUrl : Text;
    stock : Nat;
    isActive : Bool;
  };
};
