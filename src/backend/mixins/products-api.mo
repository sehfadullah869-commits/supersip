import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductsLib "../lib/products";
import ProductTypes "../types/products";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
) {
  // --- Public queries ---

  public query func getProducts() : async [ProductTypes.Product] {
    ProductsLib.getActiveProducts(products);
  };

  public query func getProductsByCategory(category : ProductTypes.Category) : async [ProductTypes.Product] {
    ProductsLib.getProductsByCategory(products, category);
  };

  public query func getProductById(id : Common.ProductId) : async ?ProductTypes.Product {
    ProductsLib.getProductById(products, id);
  };

  public query func searchProducts(searchTerm : Text) : async [ProductTypes.Product] {
    ProductsLib.searchProducts(products, searchTerm);
  };

  // --- Admin updates ---

  public shared ({ caller }) func createProduct(input : ProductTypes.CreateProductInput) : async Common.ProductId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    // Derive next ID from map size + 1 (safe since we never hard-delete)
    let nextId = products.size() + 1;
    ProductsLib.createProduct(products, nextId, input);
  };

  public shared ({ caller }) func updateProduct(input : ProductTypes.UpdateProductInput) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductsLib.updateProduct(products, input);
  };

  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductsLib.deleteProduct(products, id);
  };

  public shared ({ caller }) func updateStock(id : Common.ProductId, newStock : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update stock");
    };
    ProductsLib.updateStock(products, id, newStock);
  };
};
