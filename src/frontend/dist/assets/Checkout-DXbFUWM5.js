import { c as createLucideIcon, u as useNavigate, e as useCart, r as reactExports, j as jsxRuntimeExports, a as Button, g as LoadingSpinner, h as ue } from "./index-BrhKsGWM.js";
import { L as Label, T as Textarea } from "./textarea-BGlP2ZWP.js";
import { S as Separator } from "./separator-BbtyNM_3.js";
import { c as useCreateOrder, d as useCreateCheckoutSession } from "./use-backend-C25TRhZ_.js";
import { f as formatPrice } from "./format-DsGgo16x.js";
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
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [address, setAddress] = reactExports.useState("");
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const createOrder = useCreateOrder();
  const createCheckoutSession = useCreateCheckoutSession();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      ue.error("Please enter a delivery address");
      return;
    }
    setIsProcessing(true);
    try {
      await createOrder.mutateAsync({
        deliveryAddress: address,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: BigInt(item.quantity),
          priceAtPurchase: item.price
        }))
      });
      const shoppingItems = items.map((item) => ({
        productName: item.name,
        currency: "usd",
        quantity: BigInt(item.quantity),
        priceInCents: item.price,
        productDescription: `SuperSip ${item.category}`
      }));
      const successUrl = `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/checkout`;
      const sessionUrl = await createCheckoutSession.mutateAsync({
        items: shoppingItems,
        successUrl,
        cancelUrl
      });
      clearCart();
      window.location.href = sessionUrl;
    } catch (err) {
      ue.error("Checkout failed", {
        description: err instanceof Error ? err.message : "Please try again."
      });
      setIsProcessing(false);
    }
  };
  if (items.length === 0) {
    navigate({ to: "/cart" });
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/cart" }),
        className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth mb-8 group",
        "data-ocid": "checkout.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 group-hover:-translate-x-1 transition-smooth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Back to cart" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-lg text-foreground mb-8", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "bg-card rounded-2xl p-6 border border-border/50 shadow-card space-y-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 rounded-xl p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Delivery Address" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", className: "text-sm font-medium", children: "Full delivery address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "address",
                    value: address,
                    onChange: (e) => setAddress(e.target.value),
                    placeholder: "123 Main Street, City, State, ZIP",
                    className: "resize-none rounded-xl min-h-[80px]",
                    required: true,
                    "data-ocid": "checkout.address_textarea"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.1 },
            className: "bg-card rounded-2xl p-6 border border-border/50 shadow-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 rounded-xl p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Payment" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "You'll be redirected to Stripe's secure checkout to complete your payment. We accept all major credit and debit cards." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            size: "lg",
            className: "w-full rounded-full gap-2 font-body",
            disabled: isProcessing,
            "data-ocid": "checkout.submit_button",
            children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
              "Processing…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-5" }),
              "Pay ",
              formatPrice(total)
            ] })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-6 border border-border/50 shadow-card sticky top-20 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-3 items-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted rounded-lg w-10 h-10 shrink-0 overflow-hidden", children: item.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.imageUrl,
                  alt: item.name,
                  className: "w-full h-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: item.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Qty: ",
                  item.quantity
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground shrink-0", children: formatPrice(item.price * BigInt(item.quantity)) })
            ]
          },
          item.productId.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  CheckoutPage as default
};
