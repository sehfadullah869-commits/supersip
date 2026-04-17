import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useNavigate, e as useCart, i as useAuth, a as Button, h as ue } from "./index-BrhKsGWM.js";
import { S as Separator } from "./separator-BbtyNM_3.js";
import { E as EmptyState } from "./EmptyState-eYyx-cXz.js";
import { f as formatPrice } from "./format-DsGgo16x.js";
import { S as ShoppingBag } from "./shopping-bag-Bk_qZJP9.js";
import { A as ArrowLeft } from "./arrow-left-itSucdJM.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-BvMdA3CJ.js";
import { P as Plus } from "./plus-DgJIIz4S.js";
import { T as Trash2 } from "./trash-2-jGBSUHmc.js";
import { A as ArrowRight } from "./arrow-right-ULP5D10Z.js";
import "./index-DHcS7_Qg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const { isAuthenticated, login } = useAuth();
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: ShoppingBag,
        title: "Your cart is empty",
        description: "Add some delicious beverages to get started.",
        action: {
          label: "Browse products",
          onClick: () => navigate({ to: "/products", search: {} })
        }
      }
    ) });
  }
  const handleCheckout = () => {
    if (!isAuthenticated) {
      ue.info("Sign in to checkout", {
        description: "You need an account to place an order.",
        action: { label: "Sign in", onClick: login }
      });
      return;
    }
    navigate({ to: "/checkout" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/products", search: {} }),
        className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth group",
        "data-ocid": "cart.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 group-hover:-translate-x-1 transition-smooth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Continue shopping" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-lg text-foreground mb-2", children: "Your Cart" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-8", children: [
      itemCount,
      " item",
      itemCount !== 1 ? "s" : ""
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          layout: true,
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, x: -20, height: 0 },
          transition: { duration: 0.3 },
          className: "bg-card rounded-2xl p-4 border border-border/50 shadow-card flex gap-4 items-center",
          "data-ocid": `cart.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted rounded-xl w-20 h-20 shrink-0 overflow-hidden", children: item.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.imageUrl,
                alt: item.name,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-8 text-muted-foreground/40" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "font-display font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors truncate block w-full text-left",
                  onClick: () => navigate({
                    to: "/products/$id",
                    params: { id: item.productId.toString() }
                  }),
                  children: item.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-0.5", children: [
                formatPrice(item.price),
                " each"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "size-8 rounded-full",
                  onClick: () => updateQuantity(item.productId, item.quantity - 1),
                  "aria-label": "Decrease quantity",
                  "data-ocid": `cart.decrease_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center font-display font-semibold text-sm text-foreground", children: item.quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "size-8 rounded-full",
                  onClick: () => updateQuantity(item.productId, item.quantity + 1),
                  "aria-label": "Increase quantity",
                  "data-ocid": `cart.increase_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: formatPrice(item.price * BigInt(item.quantity)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeItem(item.productId),
                  className: "text-muted-foreground hover:text-destructive transition-colors",
                  "aria-label": `Remove ${item.name}`,
                  "data-ocid": `cart.delete_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
                }
              )
            ] })
          ]
        },
        item.productId.toString()
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-6 border border-border/50 shadow-card sticky top-20 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-sm", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate min-w-0 mr-2", children: [
                item.name,
                " × ",
                item.quantity
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: formatPrice(item.price * BigInt(item.quantity)) })
            ]
          },
          item.productId.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            className: "w-full rounded-full gap-2 font-body",
            onClick: handleCheckout,
            "data-ocid": "cart.checkout_button",
            children: [
              "Proceed to Checkout",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Secure checkout powered by Stripe" })
      ] }) })
    ] })
  ] }) });
}
export {
  CartPage as default
};
