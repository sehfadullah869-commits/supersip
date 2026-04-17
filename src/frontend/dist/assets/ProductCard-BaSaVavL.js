import { e as useCart, u as useNavigate, j as jsxRuntimeExports, S as ShoppingCart, B as Badge, d as cn, a as Button, C as Category } from "./index-BrhKsGWM.js";
import { f as formatPrice } from "./format-DsGgo16x.js";
import { m as motion } from "./proxy-BvMdA3CJ.js";
import { P as Plus } from "./plus-DgJIIz4S.js";
const categoryLabels = {
  [Category.ColdDrink]: "Cold Drink",
  [Category.MineralWater]: "Mineral Water",
  [Category.Juice]: "Juice"
};
const categoryColors = {
  [Category.ColdDrink]: "bg-secondary/20 text-secondary border-secondary/30",
  [Category.MineralWater]: "bg-primary/10 text-primary border-primary/20",
  [Category.Juice]: "bg-accent/20 text-accent-foreground border-accent/30"
};
function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category
    });
  };
  const handleClick = () => {
    navigate({ to: "/products/$id", params: { id: product.id.toString() } });
  };
  const isOutOfStock = product.stock === 0n;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
      className: "group",
      "data-ocid": `product.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: cn(
            "bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-smooth cursor-pointer border border-border/50",
            "flex flex-col w-full text-left"
          ),
          onClick: handleClick,
          "aria-label": `View ${product.name}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-muted/30 aspect-square", children: [
              product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl,
                  alt: product.name,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                  loading: "lazy"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "size-12 text-muted-foreground/40" }) }),
              isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card text-muted-foreground text-xs font-medium px-3 py-1 rounded-full border", children: "Out of stock" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col flex-1 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: cn(
                    "text-xs px-2 py-0.5 w-fit font-body font-medium rounded-full",
                    categoryColors[product.category]
                  ),
                  children: categoryLabels[product.category]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 min-w-0", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed line-clamp-2 min-w-0 flex-1", children: product.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-lg", children: formatPrice(product.price) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "rounded-full gap-1.5 shrink-0 font-body text-xs px-3",
                    onClick: handleAddToCart,
                    disabled: isOutOfStock,
                    "data-ocid": `product.add_button.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3.5" }),
                      "Add to Cart"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
export {
  ProductCard as P
};
