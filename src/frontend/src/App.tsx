import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AdminRoute } from "./components/auth/AdminRoute";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Layout } from "./components/layout/Layout";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { CartProvider } from "./hooks/use-cart";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/Home"));
const ProductsPage = lazy(() => import("./pages/Products"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetail"));
const CartPage = lazy(() => import("./pages/Cart"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const CheckoutSuccessPage = lazy(() => import("./pages/CheckoutSuccess"));
const AccountPage = lazy(() => import("./pages/Account"));
const OrderDetailPage = lazy(() => import("./pages/OrderDetail"));
const AdminPage = lazy(() => import("./pages/Admin"));

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// ─── Route definitions ────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <CartProvider>
      <Layout>
        <Outlet />
      </Layout>
    </CartProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HomePage />
    </Suspense>
  ),
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  validateSearch: (
    search: Record<string, string>,
  ): { category?: string; q?: string } => ({
    category: search.category as string | undefined,
    q: search.q as string | undefined,
  }),
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProductsPage />
    </Suspense>
  ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProductDetailPage />
    </Suspense>
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CartPage />
    </Suspense>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProtectedRoute>
        <CheckoutPage />
      </ProtectedRoute>
    </Suspense>
  ),
});

const checkoutSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout/success",
  validateSearch: (
    search: Record<string, string>,
  ): { session_id?: string } => ({
    session_id: search.session_id as string | undefined,
  }),
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CheckoutSuccessPage />
    </Suspense>
  ),
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProtectedRoute>
        <AccountPage />
      </ProtectedRoute>
    </Suspense>
  ),
});

const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account/orders/$id",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProtectedRoute>
        <OrderDetailPage />
      </ProtectedRoute>
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    </Suspense>
  ),
});

// ─── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  checkoutSuccessRoute,
  accountRoute,
  orderDetailRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
