import { c as createLucideIcon, f as useParams, u as useNavigate, j as jsxRuntimeExports, g as LoadingSpinner, k as OrderStatus, B as Badge, a as Button } from "./index-BrhKsGWM.js";
import { S as Separator } from "./separator-BbtyNM_3.js";
import { E as EmptyState } from "./EmptyState-eYyx-cXz.js";
import { E as ErrorMessage } from "./ErrorMessage-_9pcFNXt.js";
import { g as useOrderById } from "./use-backend-C25TRhZ_.js";
import { a as formatDate, b as formatOrderStatus, f as formatPrice } from "./format-DsGgo16x.js";
import { P as Package } from "./package-D8pUBZa-.js";
import { A as ArrowLeft } from "./arrow-left-itSucdJM.js";
import { m as motion } from "./proxy-BvMdA3CJ.js";
import { M as MapPin } from "./map-pin-CicCGYC2.js";
import "./index-DHcS7_Qg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const statusVariant = {
  [OrderStatus.Pending]: "bg-accent/20 text-accent-foreground border-accent/30",
  [OrderStatus.Processing]: "bg-secondary/20 text-secondary border-secondary/30",
  [OrderStatus.Shipped]: "bg-primary/15 text-primary border-primary/30",
  [OrderStatus.Delivered]: "bg-primary/10 text-primary border-primary/25",
  [OrderStatus.Cancelled]: "bg-destructive/10 text-destructive border-destructive/20"
};
const statusSteps = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Shipped,
  OrderStatus.Delivered
];
function OrderDetailPage() {
  const { id } = useParams({ from: "/account/orders/$id" });
  const navigate = useNavigate();
  const orderId = BigInt(id);
  const {
    data: order,
    isLoading,
    error,
    refetch
  } = useOrderById(orderId, true);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", message: "Loading order..." }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { onRetry: () => refetch() });
  }
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Package,
        title: "Order not found",
        description: "This order doesn't exist or doesn't belong to your account.",
        action: {
          label: "My orders",
          onClick: () => navigate({ to: "/account" })
        }
      }
    );
  }
  const currentStep = order.status === OrderStatus.Cancelled ? -1 : statusSteps.indexOf(order.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/account" }),
        className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth mb-8 group",
        "data-ocid": "order_detail.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 group-hover:-translate-x-1 transition-smooth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Back to orders" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-6 border border-border/50 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-foreground text-xl", children: [
              "Order #",
              order.id.toString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
              formatDate(order.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: `text-sm rounded-full px-3 py-1 shrink-0 ${statusVariant[order.status]}`,
              children: formatOrderStatus(order.status)
            }
          )
        ] }),
        order.status !== OrderStatus.Cancelled && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mt-4", children: statusSteps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-full h-1.5 rounded-full transition-smooth ${i <= currentStep ? "bg-primary" : "bg-muted"}`
            }
          ),
          i < statusSteps.length - 1 && null
        ] }, step)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.1 },
          className: "bg-card rounded-2xl p-6 border border-border/50 shadow-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Delivery Address" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: order.deliveryAddress })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.2 },
          className: "bg-card rounded-2xl p-6 border border-border/50 shadow-card space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Items Ordered" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: order.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between items-center text-sm",
                "data-ocid": `order_detail.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
                      "Item #",
                      String(i + 1)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
                      item.quantity.toString(),
                      " ×",
                      " ",
                      formatPrice(item.priceAtPurchase)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: formatPrice(item.priceAtPurchase * item.quantity) })
                ]
              },
              `item-${item.productId.toString()}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(order.total) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "w-full rounded-full font-body",
          onClick: () => navigate({ to: "/products", search: {} }),
          "data-ocid": "order_detail.shop_again_button",
          children: "Order Again"
        }
      )
    ] })
  ] }) });
}
export {
  OrderDetailPage as default
};
