import { f as useParams, u as useNavigate, e as useCart, j as jsxRuntimeExports, g as LoadingSpinner, S as ShoppingCart, B as Badge, a as Button, h as ue, C as Category } from "./index-BrhKsGWM.js";
import { E as EmptyState } from "./EmptyState-eYyx-cXz.js";
import { E as ErrorMessage } from "./ErrorMessage-_9pcFNXt.js";
import { b as useProductById } from "./use-backend-C25TRhZ_.js";
import { f as formatPrice } from "./format-DsGgo16x.js";
import { P as Package } from "./package-D8pUBZa-.js";
import { A as ArrowLeft } from "./arrow-left-itSucdJM.js";
import { m as motion } from "./proxy-BvMdA3CJ.js";
const categoryLabels = {
  [Category.ColdDrink]: "Cold Drink",
  [Category.MineralWater]: "Mineral Water",
  [Category.Juice]: "Juice"
};
function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const navigate = useNavigate();
  const { addItem } = useCart();
  const productId = BigInt(id);
  const {
    data: product,
    isLoading,
    error,
    refetch
  } = useProductById(productId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", message: "Loading product..." }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { onRetry: () => refetch() });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Package,
        title: "Product not found",
        description: "This product doesn't exist or is no longer available.",
        action: {
          label: "Browse products",
          onClick: () => navigate({ to: "/products", search: {} })
        }
      }
    );
  }
  const isOutOfStock = product.stock === 0n;
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category
    });
    ue.success(`${product.name} added to cart`, {
      description: formatPrice(product.price)
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/products", search: {} }),
        className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth mb-8 group",
        "data-ocid": "product_detail.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 group-hover:-translate-x-1 transition-smooth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Back to products" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5 },
          className: "bg-card rounded-3xl overflow-hidden aspect-square shadow-elevated border border-border/50",
          children: product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "size-20 text-muted-foreground/30" }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "rounded-full font-body text-xs",
                  children: categoryLabels[product.category]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-extrabold text-foreground leading-tight", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: product.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl font-bold text-foreground", children: formatPrice(product.price) }),
              isOutOfStock ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-muted-foreground rounded-full",
                  children: "Out of stock"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-primary border-primary/40 bg-primary/5 rounded-full",
                  children: [
                    product.stock.toString(),
                    " in stock"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "rounded-full px-8 gap-2 font-body flex-1",
                  onClick: handleAddToCart,
                  disabled: isOutOfStock,
                  "data-ocid": "product_detail.add_to_cart_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "size-5" }),
                    isOutOfStock ? "Out of Stock" : "Add to Cart"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "rounded-full px-8 font-body flex-1",
                  onClick: () => {
                    handleAddToCart();
                    navigate({ to: "/cart" });
                  },
                  disabled: isOutOfStock,
                  "data-ocid": "product_detail.buy_now_button",
                  children: "Buy Now"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-2xl p-5 space-y-3 border border-border/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Product Highlights" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✓" }),
                  " Natural ingredients, no preservatives"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✓" }),
                  " Available in 350ml bottles"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✓" }),
                  " Fast delivery to your door"
                ] })
              ] })
            ] })
          ]
        }
      )
    ] })
  ] }) });
}
export {
  ProductDetailPage as default
};
