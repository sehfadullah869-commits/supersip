import { j as jsxRuntimeExports, a as Button, d as cn } from "./index-BrhKsGWM.js";
function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      ),
      "data-ocid": "empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted rounded-full p-5 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-10 text-muted-foreground", strokeWidth: 1.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-display-sm text-foreground mb-2", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mb-6 leading-relaxed", children: description }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: action.onClick, className: "rounded-full px-6", children: action.label })
      ]
    }
  );
}
export {
  EmptyState as E
};
