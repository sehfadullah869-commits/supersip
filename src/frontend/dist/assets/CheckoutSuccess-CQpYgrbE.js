import { c as createLucideIcon, u as useNavigate, b as useSearch, r as reactExports, j as jsxRuntimeExports, a as Button } from "./index-BrhKsGWM.js";
import { e as useStripeSessionStatus } from "./use-backend-C25TRhZ_.js";
import { m as motion } from "./proxy-BvMdA3CJ.js";
import { S as ShoppingBag } from "./shopping-bag-Bk_qZJP9.js";
import { A as ArrowRight } from "./arrow-right-ULP5D10Z.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/checkout/success" });
  const sessionId = search.session_id ?? null;
  const { data: sessionStatus, isLoading } = useStripeSessionStatus(
    sessionId,
    !!sessionId
  );
  reactExports.useEffect(() => {
    if ((sessionStatus == null ? void 0 : sessionStatus.__kind__) === "failed") {
      navigate({ to: "/cart" });
    }
  }, [sessionStatus, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md w-full text-center space-y-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-12 text-primary animate-spin mx-auto" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Confirming your order…" })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 rounded-full p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-16 text-primary" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Order Placed!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Thank you for your order. Your refreshments are on their way! You'll receive a confirmation shortly." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "rounded-full px-8 gap-2 font-body",
              onClick: () => navigate({ to: "/account" }),
              "data-ocid": "success.view_orders_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-5" }),
                "View My Orders"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              variant: "outline",
              className: "rounded-full px-8 gap-2 font-body",
              onClick: () => navigate({ to: "/products", search: {} }),
              "data-ocid": "success.continue_shopping_button",
              children: [
                "Continue Shopping",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
              ]
            }
          )
        ] })
      ]
    }
  ) }) });
}
export {
  CheckoutSuccessPage as default
};
