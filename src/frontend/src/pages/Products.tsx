import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { ProductCardSkeleton } from "../components/ui/LoadingSpinner";
import { ProductCard } from "../components/ui/ProductCard";
import { useProducts, useSearchProducts } from "../hooks/use-backend";
import { Category } from "../types";
import type { Product } from "../types";

const categoryFilters = [
  { value: null, label: "All" },
  { value: Category.ColdDrink, label: "Cold Drinks" },
  { value: Category.MineralWater, label: "Mineral Water" },
  { value: Category.Juice, label: "Juices" },
] as const;

export default function ProductsPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/products" });
  const rawCategory = (search as Record<string, string | undefined>).category as
    | Category
    | undefined;
  const rawQ = (search as Record<string, string | undefined>).q;

  const [localQ, setLocalQ] = useState(rawQ ?? "");
  const [activeQuery, setActiveQuery] = useState(rawQ ?? "");

  const { data: allProducts = [], isLoading, error, refetch } = useProducts();
  const { data: searchResults = [], isLoading: searchLoading } =
    useSearchProducts(activeQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(localQ);
    navigate({
      to: "/products",
      search: { q: localQ || undefined, category: rawCategory },
    });
  };

  const clearSearch = () => {
    setLocalQ("");
    setActiveQuery("");
    navigate({
      to: "/products",
      search: { category: rawCategory, q: undefined },
    });
  };

  const setCategory = (cat: Category | null) => {
    navigate({
      to: "/products",
      search: { category: cat ?? undefined, q: activeQuery || undefined },
    });
  };

  const isSearching = activeQuery.trim().length > 0;

  let displayProducts: Product[] = isSearching
    ? searchResults
    : rawCategory
      ? allProducts.filter((p) => p.category === rawCategory)
      : allProducts;

  const loading = isLoading || (isSearching && searchLoading);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-display-lg text-foreground">Our Products</h1>
            <p className="text-muted-foreground">
              {displayProducts.length > 0 && !loading
                ? `${displayProducts.length} product${displayProducts.length !== 1 ? "s" : ""} available`
                : "Browse our full range of premium beverages"}
            </p>
          </motion.div>

          {/* Search + Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                value={localQ}
                onChange={(e) => setLocalQ(e.target.value)}
                placeholder="Search beverages…"
                className="pl-9 pr-10 rounded-full bg-background"
                data-ocid="products.search_input"
              />
              {localQ && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </form>

            {/* Category pills */}
            <div className="flex gap-2 flex-wrap">
              {categoryFilters.map((f) => (
                <button
                  key={String(f.value)}
                  type="button"
                  onClick={() => setCategory(f.value)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth",
                    (rawCategory ?? null) === f.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
                  )}
                  data-ocid={`products.filter.${f.label.toLowerCase().replace(/\s+/g, "_")}_tab`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {error ? (
          <ErrorMessage onRetry={() => refetch()} />
        ) : loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {(["a", "b", "c", "d", "e", "f", "g", "h"] as const).map((k) => (
              <ProductCardSkeleton key={`prod-sk-${k}`} />
            ))}
          </div>
        ) : displayProducts.length === 0 ? (
          <EmptyState
            icon={SlidersHorizontal}
            title={isSearching ? "No results found" : "No products yet"}
            description={
              isSearching
                ? `We couldn't find any products matching "${activeQuery}". Try a different search.`
                : "No products are available in this category right now."
            }
            action={
              isSearching
                ? { label: "Clear search", onClick: clearSearch }
                : {
                    label: "Browse all products",
                    onClick: () => setCategory(null),
                  }
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayProducts.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
