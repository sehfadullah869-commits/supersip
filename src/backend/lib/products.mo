import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import ProductTypes "../types/products";
import Common "../types/common";

module {
  // Returns all active products
  public func getActiveProducts(
    products : Map.Map<Common.ProductId, ProductTypes.Product>
  ) : [ProductTypes.Product] {
    products.values().filter(func(p) { p.isActive }).toArray();
  };

  // Returns active products filtered by category
  public func getProductsByCategory(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    category : ProductTypes.Category,
  ) : [ProductTypes.Product] {
    products.values().filter(func(p) {
      p.isActive and p.category == category
    }).toArray();
  };

  // Returns a product by ID (only if active)
  public func getProductById(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    id : Common.ProductId,
  ) : ?ProductTypes.Product {
    switch (products.get(id)) {
      case (?p) { if (p.isActive) ?p else null };
      case null { null };
    };
  };

  // Full-text search across name and description (case-insensitive)
  public func searchProducts(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    searchTerm : Text,
  ) : [ProductTypes.Product] {
    let lower = searchTerm.toLower();
    products.values().filter(func(p) {
      p.isActive and (
        p.name.toLower().contains(#text lower) or
        p.description.toLower().contains(#text lower)
      )
    }).toArray();
  };

  // Creates a new product, inserts it, and returns the new ID
  public func createProduct(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    nextId : Nat,
    input : ProductTypes.CreateProductInput,
  ) : Common.ProductId {
    let id = nextId;
    let product : ProductTypes.Product = {
      id;
      name = input.name;
      category = input.category;
      description = input.description;
      price = input.price;
      imageUrl = input.imageUrl;
      stock = input.stock;
      isActive = true;
    };
    products.add(id, product);
    id;
  };

  // Replaces the product record with updated fields
  public func updateProduct(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    input : ProductTypes.UpdateProductInput,
  ) {
    switch (products.get(input.id)) {
      case null { Runtime.trap("Product not found") };
      case (?existing) {
        products.add(input.id, {
          existing with
          name = input.name;
          category = input.category;
          description = input.description;
          price = input.price;
          imageUrl = input.imageUrl;
          stock = input.stock;
          isActive = input.isActive;
        });
      };
    };
  };

  // Soft-deletes a product by setting isActive = false
  public func deleteProduct(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    id : Common.ProductId,
  ) {
    switch (products.get(id)) {
      case null { Runtime.trap("Product not found") };
      case (?existing) {
        products.add(id, { existing with isActive = false });
      };
    };
  };

  // Updates the stock level for a product
  public func updateStock(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    id : Common.ProductId,
    newStock : Nat,
  ) {
    switch (products.get(id)) {
      case null { Runtime.trap("Product not found") };
      case (?existing) {
        products.add(id, { existing with stock = newStock });
      };
    };
  };

  // Seeds sample products; only seeds when the map is empty
  public func seedSampleProducts(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    startId : Nat,
  ) : Nat {
    if (not products.isEmpty()) { return startId };

    let samples : [(Common.ProductId, ProductTypes.Product)] = [
      (startId + 0, { id = startId + 0; name = "FizzBurst Cola";        category = #ColdDrink;    description = "Refreshing cola with a bold fizz and sweet caramel notes.";         price = 199;  imageUrl = ""; stock = 200; isActive = true }),
      (startId + 1, { id = startId + 1; name = "CitroSpark Lemon";      category = #ColdDrink;    description = "Zesty lemon soda with a sparkling citrus kick.";                  price = 179;  imageUrl = ""; stock = 150; isActive = true }),
      (startId + 2, { id = startId + 2; name = "AquaPure Still";        category = #MineralWater; description = "Natural still mineral water, sourced from pristine springs.";    price = 99;   imageUrl = ""; stock = 500; isActive = true }),
      (startId + 3, { id = startId + 3; name = "AquaPure Sparkling";    category = #MineralWater; description = "Crisp sparkling mineral water with fine natural bubbles.";       price = 129;  imageUrl = ""; stock = 400; isActive = true }),
      (startId + 4, { id = startId + 4; name = "TropiBlend Mango";      category = #Juice;        description = "100% cold-pressed mango juice, no added sugar.";                 price = 299;  imageUrl = ""; stock = 120; isActive = true }),
      (startId + 5, { id = startId + 5; name = "VitaOrange Fresh";      category = #Juice;        description = "Freshly squeezed orange juice packed with vitamin C.";           price = 249;  imageUrl = ""; stock = 100; isActive = true }),
      (startId + 6, { id = startId + 6; name = "GreenLeaf Apple Juice"; category = #Juice;        description = "Crisp apple juice made from hand-picked green apples.";          price = 279;  imageUrl = ""; stock = 90;  isActive = true }),
      (startId + 7, { id = startId + 7; name = "PolarMint Cooler";      category = #ColdDrink;    description = "Cool mint-infused sparkling drink for a refreshing experience."; price = 189;  imageUrl = ""; stock = 180; isActive = true }),
    ];

    for ((id, product) in samples.vals()) {
      products.add(id, product);
    };

    startId + 8;
  };
};
