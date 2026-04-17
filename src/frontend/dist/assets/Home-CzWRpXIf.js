import { c as createLucideIcon, u as useNavigate, j as jsxRuntimeExports, B as Badge, a as Button, C as Category, L as Link, P as ProductCardSkeleton, D as Droplets } from "./index-BrhKsGWM.js";
import { E as ErrorMessage } from "./ErrorMessage-_9pcFNXt.js";
import { P as ProductCard } from "./ProductCard-BaSaVavL.js";
import { u as useProducts } from "./use-backend-C25TRhZ_.js";
import { m as motion } from "./proxy-BvMdA3CJ.js";
import { A as ArrowRight } from "./arrow-right-ULP5D10Z.js";
import "./format-DsGgo16x.js";
import "./plus-DgJIIz4S.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const features = [
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description: "Every sip is crafted from the finest natural ingredients, no artificial additives."
  },
  {
    icon: Zap,
    title: "Energizing Blends",
    description: "Cold brews and juices designed to refresh and energize your day."
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Rigorously tested to ensure premium quality in every bottle."
  },
  {
    icon: Droplets,
    title: "Pure Hydration",
    description: "Mountain-sourced mineral water for the purest hydration experience."
  }
];
const categories = [
  {
    value: Category.ColdDrink,
    label: "Cold Drinks",
    emoji: "🧃",
    color: "bg-secondary/10 border-secondary/20"
  },
  {
    value: Category.MineralWater,
    label: "Mineral Water",
    emoji: "💧",
    color: "bg-primary/10 border-primary/20"
  },
  {
    value: Category.Juice,
    label: "Fresh Juices",
    emoji: "🍊",
    color: "bg-accent/10 border-accent/20"
  }
];
function HomePage() {
  const navigate = useNavigate();
  const { data: products = [], isLoading, error, refetch } = useProducts();
  const featured = products.slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-card overflow-hidden min-h-[70vh] flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/15 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -30 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
            className: "space-y-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-primary border-primary/40 bg-primary/5 font-body px-3 py-1 rounded-full",
                  children: "🌿 100% Natural Beverages"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight", children: [
                "Refreshingly ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Bright." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Everyday."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-md", children: "Experience vibrant flavors crafted from natural ingredients. From icy cold drinks to pure mineral water — SuperSip has your perfect sip." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "rounded-full px-8 gap-2 font-body text-base shadow-elevated",
                    onClick: () => navigate({ to: "/products", search: {} }),
                    "data-ocid": "hero.shop_button",
                    children: [
                      "Shop All Drinks",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    className: "rounded-full px-8 font-body text-base",
                    onClick: () => {
                      var _a;
                      (_a = document.getElementById("categories")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    "data-ocid": "hero.explore_button",
                    children: "Explore Categories"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: {
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94]
            },
            className: "flex justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/hero-beverages.dim_800x800.png",
                alt: "SuperSip premium beverages collection",
                className: "w-full max-w-lg rounded-3xl shadow-elevated object-cover aspect-square",
                onError: (e) => {
                  e.target.style.display = "none";
                }
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "categories", className: "bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-3", children: "Browse by Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Pick your favorite type of refreshment" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: categories.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/products",
              search: { category: cat.value, q: void 0 },
              className: `flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 ${cat.color} hover:shadow-elevated transition-smooth group`,
              "data-ocid": `category.${cat.value.toLowerCase()}_link`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl group-hover:scale-110 transition-smooth", children: cat.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: cat.label })
              ]
            }
          )
        },
        cat.value
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-1", children: "Featured Drinks" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Our most-loved refreshments" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            className: "rounded-full gap-1.5 font-body hidden sm:flex",
            onClick: () => navigate({ to: "/products" }),
            "data-ocid": "featured.view_all_button",
            children: [
              "View all ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
            ]
          }
        )
      ] }),
      error ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { onRetry: () => refetch() }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {}, `home-sk-${k}`)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: featured.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductCard,
        {
          product,
          index: i
        },
        product.id.toString()
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "rounded-full px-8 font-body",
          onClick: () => navigate({ to: "/products" }),
          "data-ocid": "featured.view_all_mobile_button",
          children: "View all products"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-3", children: "Why SuperSip?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md mx-auto", children: "We believe every drink should be an experience worth savoring." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: features.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.1 },
          className: "bg-card rounded-2xl p-6 shadow-card border border-border/50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 rounded-xl p-3 w-fit mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(feat.icon, { className: "size-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: feat.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: feat.description })
          ]
        },
        feat.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "space-y-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-extrabold text-primary-foreground leading-tight", children: "Ready to sip something amazing?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-lg", children: "Discover our full range of natural beverages and find your perfect drink." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              variant: "secondary",
              className: "rounded-full px-10 font-body text-base shadow-elevated",
              onClick: () => navigate({ to: "/products" }),
              "data-ocid": "cta.shop_button",
              children: "Shop Now"
            }
          )
        ]
      }
    ) }) })
  ] });
}
export {
  HomePage as default
};
