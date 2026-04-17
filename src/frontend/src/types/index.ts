// Re-export backend types for convenience
export {
  Category,
  OrderStatus,
  UserRole,
} from "../backend";

export type {
  Product,
  ProductId,
  Order,
  OrderId,
  OrderItem,
  CreateOrderInput,
  CreateProductInput,
  UpdateProductInput,
  ShoppingItem,
  StripeSessionStatus,
} from "../backend";

// Cart types
export interface CartItem {
  productId: bigint;
  name: string;
  price: bigint;
  quantity: number;
  imageUrl: string;
  category: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: bigint) => void;
  updateQuantity: (productId: bigint, quantity: number) => void;
  clearCart: () => void;
  total: bigint;
  itemCount: number;
}
