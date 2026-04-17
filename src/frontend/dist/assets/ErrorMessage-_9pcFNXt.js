import { c as createLucideIcon, j as jsxRuntimeExports, a as Button, d as cn } from "./index-BrhKsGWM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center text-center py-12 px-6",
        className
      ),
      "data-ocid": "error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-destructive/10 rounded-full p-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-8 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-display-sm text-foreground mb-2", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed", children: message }),
        onRetry && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: onRetry,
            className: "gap-2 rounded-full",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4" }),
              "Try again"
            ]
          }
        )
      ]
    }
  );
}
export {
  ErrorMessage as E,
  RefreshCw as R
};
