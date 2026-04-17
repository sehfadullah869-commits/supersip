import { u as useNavigate, i as useAuth, j as jsxRuntimeExports, a as Button, O as OrderRowSkeleton, B as Badge, k as OrderStatus } from "./index-BrhKsGWM.js";
import { E as EmptyState } from "./EmptyState-eYyx-cXz.js";
import { E as ErrorMessage } from "./ErrorMessage-_9pcFNXt.js";
import { f as useMyOrders } from "./use-backend-C25TRhZ_.js";
import { t as truncatePrincipal, a as formatDate, b as formatOrderStatus, f as formatPrice } from "./format-DsGgo16x.js";
import { S as ShoppingBag } from "./shopping-bag-Bk_qZJP9.js";
import { m as motion } from "./proxy-BvMdA3CJ.js";
import { P as Package } from "./package-D8pUBZa-.js";
import { A as ArrowRight } from "./arrow-right-ULP5D10Z.js";
const statusVariant = {
  [OrderStatus.Pending]: "bg-accent/20 text-accent-foreground border-accent/30",
  [OrderStatus.Processing]: "bg-secondary/20 text-secondary border-secondary/30",
  [OrderStatus.Shipped]: "bg-primary/15 text-primary border-primary/30",
  [OrderStatus.Delivered]: "bg-primary/10 text-primary border-primary/25",
  [OrderStatus.Cancelled]: "bg-destructive/10 text-destructive border-destructive/20"
};
function AccountPage() {
  const navigate = useNavigate();
  const { principal, logout } = useAuth();
  const { data: orders = [], isLoading, error, refetch } = useMyOrders(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-lg text-foreground mb-2", children: "My Account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8 font-mono", children: principal ? truncatePrincipal(principal) : "" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-sm text-foreground", children: "Order History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full font-body",
            onClick: logout,
            "data-ocid": "account.logout_button",
            children: "Sign out"
          }
        )
      ] }),
      error ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { onRetry: () => refetch() }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderRowSkeleton, {}, `order-sk-${k}`)) }) : orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: ShoppingBag,
          title: "No orders yet",
          description: "Your order history will appear here after your first purchase.",
          action: {
            label: "Start shopping",
            onClick: () => navigate({ to: "/products", search: {} })
          }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: orders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: i * 0.05 },
          "data-ocid": `account.order.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full text-left bg-card rounded-2xl p-5 border border-border/50 shadow-card hover:shadow-elevated transition-smooth group",
              onClick: () => navigate({
                to: "/account/orders/$id",
                params: { id: order.id.toString() }
              }),
              "data-ocid": `account.order.view_button.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "size-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-foreground text-sm", children: [
                        "Order #",
                        order.id.toString()
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
                      formatDate(order.createdAt),
                      " · ",
                      order.items.length,
                      " ",
                      "item",
                      order.items.length !== 1 ? "s" : ""
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: `text-xs rounded-full px-2.5 py-0.5 ${statusVariant[order.status]}`,
                        children: formatOrderStatus(order.status)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm", children: formatPrice(order.total) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors", children: [
                  "View order details",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-3 group-hover:translate-x-0.5 transition-smooth" })
                ] })
              ]
            }
          )
        },
        order.id.toString()
      )) })
    ] })
  ] }) });
}
export {
  AccountPage as default
};
