import { c as createLucideIcon, u as useNavigate, b as useSearch, r as reactExports, j as jsxRuntimeExports, X, C as Category, d as cn, P as ProductCardSkeleton } from "./index-BrhKsGWM.js";
import { S as Search, I as Input } from "./input-DRpGBKNR.js";
import { E as EmptyState } from "./EmptyState-eYyx-cXz.js";
import { E as ErrorMessage } from "./ErrorMessage-_9pcFNXt.js";
import { P as ProductCard } from "./ProductCard-BaSaVavL.js";
import { u as useProducts, a as useSearchProducts } from "./use-backend-C25TRhZ_.js";
import { m as motion } from "./proxy-BvMdA3CJ.js";
import "./format-DsGgo16x.js";
import "./plus-DgJIIz4S.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const categoryFilters = [
  { value: null, label: "All" },
  { value: Category.ColdDrink, label: "Cold Drinks" },
  { value: Category.MineralWater, label: "Mineral Water" },
  { value: Category.Juice, label: "Juices" }
];
function ProductsPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/products" });
  const rawCategory = search.category;
  const rawQ = search.q;
  const [localQ, setLocalQ] = reactExports.useState(rawQ ?? "");
  const [activeQuery, setActiveQuery] = reactExports.useState(rawQ ?? "");
  const { data: allProducts = [], isLoading, error, refetch } = useProducts();
  const { data: searchResults = [], isLoading: searchLoading } = useSearchProducts(activeQuery);
  const handleSearch = (e) => {
    e.preventDefault();
    setActiveQuery(localQ);
    navigate({
      to: "/products",
      search: { q: localQ || void 0, category: rawCategory }
    });
  };
  const clearSearch = () => {
    setLocalQ("");
    setActiveQuery("");
    navigate({
      to: "/products",
      search: { category: rawCategory, q: void 0 }
    });
  };
  const setCategory = (cat) => {
    navigate({
      to: "/products",
      search: { category: cat ?? void 0, q: activeQuery || void 0 }
    });
  };
  const isSearching = activeQuery.trim().length > 0;
  let displayProducts = isSearching ? searchResults : rawCategory ? allProducts.filter((p) => p.category === rawCategory) : allProducts;
  const loading = isLoading || isSearching && searchLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-lg text-foreground", children: "Our Products" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: displayProducts.length > 0 && !loading ? `${displayProducts.length} product${displayProducts.length !== 1 ? "s" : ""} available` : "Browse our full range of premium beverages" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: localQ,
              onChange: (e) => setLocalQ(e.target.value),
              placeholder: "Search beverages…",
              className: "pl-9 pr-10 rounded-full bg-background",
              "data-ocid": "products.search_input"
            }
          ),
          localQ && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: clearSearch,
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: categoryFilters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setCategory(f.value),
            className: cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth",
              (rawCategory ?? null) === f.value ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            ),
            "data-ocid": `products.filter.${f.label.toLowerCase().replace(/\s+/g, "_")}_tab`,
            children: f.label
          },
          String(f.value)
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: error ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { onRetry: () => refetch() }) : loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {}, `prod-sk-${k}`)) }) : displayProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: SlidersHorizontal,
        title: isSearching ? "No results found" : "No products yet",
        description: isSearching ? `We couldn't find any products matching "${activeQuery}". Try a different search.` : "No products are available in this category right now.",
        action: isSearching ? { label: "Clear search", onClick: clearSearch } : {
          label: "Browse all products",
          onClick: () => setCategory(null)
        }
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: displayProducts.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductCard,
      {
        product,
        index: i
      },
      product.id.toString()
    )) }) })
  ] });
}
export {
  ProductsPage as default
};
