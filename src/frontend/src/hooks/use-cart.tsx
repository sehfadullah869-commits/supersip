import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type React from "react";
import type { CartItem, CartState } from "../types";

const CART_STORAGE_KEY = "supersip_cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    // Restore bigint fields from JSON (they are stored as strings)
    return parsed.map((item) => ({
      ...item,
      productId: BigInt(item.productId),
      price: BigInt(item.price),
    }));
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  try {
    // Convert bigints to strings for JSON serialization
    const serializable = items.map((item) => ({
      ...item,
      productId: item.productId.toString(),
      price: item.price.toString(),
    }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serializable));
  } catch {
    // ignore storage errors
  }
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback((newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === newItem.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === newItem.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: bigint) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: bigint, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce(
    (acc, item) => acc + item.price * BigInt(item.quantity),
    0n,
  );

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
