import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Category,
  CreateOrderInput,
  CreateProductInput,
  UpdateProductInput,
} from "../types";

// ─── Products ────────────────────────────────────────────────────────────────

export function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      const products = await actor.getProducts();
      return products.filter((p) => p.isActive);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllProductsAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", "admin"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: Category | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      if (!actor || !category) return [];
      const products = await actor.getProductsByCategory(category);
      return products.filter((p) => p.isActive);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useProductById(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getProductById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useSearchProducts(searchTerm: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", "search", searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm.trim()) return [];
      const products = await actor.searchProducts(searchTerm);
      return products.filter((p) => p.isActive);
    },
    enabled: !!actor && !isFetching && searchTerm.trim().length > 0,
  });
}

export function useCreateProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createProduct(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateProductInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProduct(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export function useMyOrders(enabled: boolean) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useAllOrders(enabled: boolean) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useOrderById(id: bigint | null, enabled: boolean) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["order", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getOrderById(id);
    },
    enabled: !!actor && !isFetching && id !== null && enabled,
  });
}

export function useCreateOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateOrderInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createOrder(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: import("../types").OrderStatus }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allOrders"] });
      qc.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}

// ─── Stripe ──────────────────────────────────────────────────────────────────

export function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      items,
      successUrl,
      cancelUrl,
    }: {
      items: import("../types").ShoppingItem[];
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    },
  });
}

export function useStripeSessionStatus(
  sessionId: string | null,
  enabled: boolean,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stripeSession", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId && enabled,
    refetchInterval: 3000,
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}
