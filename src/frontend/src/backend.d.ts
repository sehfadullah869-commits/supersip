import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderItem {
    productId: ProductId;
    quantity: bigint;
    priceAtPurchase: bigint;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    deliveryAddress: string;
    total: bigint;
    createdAt: Timestamp;
    customerId: Principal;
    items: Array<OrderItem>;
}
export interface UpdateProductInput {
    id: ProductId;
    name: string;
    description: string;
    isActive: boolean;
    stock: bigint;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface CreateProductInput {
    name: string;
    description: string;
    stock: bigint;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface CreateOrderInput {
    deliveryAddress: string;
    items: Array<OrderItem>;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ProductId = bigint;
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    isActive: boolean;
    stock: bigint;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export type OrderId = bigint;
export enum Category {
    MineralWater = "MineralWater",
    Juice = "Juice",
    ColdDrink = "ColdDrink"
}
export enum OrderStatus {
    Delivered = "Delivered",
    Cancelled = "Cancelled",
    Processing = "Processing",
    Shipped = "Shipped",
    Pending = "Pending"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(input: CreateOrderInput): Promise<OrderId>;
    createProduct(input: CreateProductInput): Promise<ProductId>;
    deleteProduct(id: ProductId): Promise<void>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrders(): Promise<Array<Order>>;
    getOrderById(id: OrderId): Promise<Order | null>;
    getProductById(id: ProductId): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<void>;
    updateProduct(input: UpdateProductInput): Promise<void>;
    updateStock(id: ProductId, newStock: bigint): Promise<void>;
}
