import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Package, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useProductById } from "../hooks/use-backend";
import { useCart } from "../hooks/use-cart";
import { Category } from "../types";
import { formatPrice } from "../utils/format";

const categoryLabels: Record<Category, string> = {
  [Category.ColdDrink]: "Cold Drink",
  [Category.MineralWater]: "Mineral Water",
  [Category.Juice]: "Juice",
};

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const navigate = useNavigate();
  const { addItem } = useCart();

  const productId = BigInt(id);
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useProductById(productId);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" message="Loading product..." />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage onRetry={() => refetch()} />;
  }

  if (!product) {
    return (
      <EmptyState
        icon={Package}
        title="Product not found"
        description="This product doesn't exist or is no longer available."
        action={{
          label: "Browse products",
          onClick: () => navigate({ to: "/products", search: {} }),
        }}
      />
    );
  }

  const isOutOfStock = product.stock === 0n;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    });
    toast.success(`${product.name} added to cart`, {
      description: formatPrice(product.price),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate({ to: "/products", search: {} })}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth mb-8 group"
          data-ocid="product_detail.back_button"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-smooth" />
          <span className="text-sm font-medium">Back to products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl overflow-hidden aspect-square shadow-elevated border border-border/50"
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <ShoppingCart className="size-20 text-muted-foreground/30" />
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <Badge
                variant="outline"
                className="rounded-full font-body text-xs"
              >
                {categoryLabels[product.category]}
              </Badge>
              <h1 className="font-display text-4xl font-extrabold text-foreground leading-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-display text-4xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {isOutOfStock ? (
                <Badge
                  variant="outline"
                  className="text-muted-foreground rounded-full"
                >
                  Out of stock
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-primary border-primary/40 bg-primary/5 rounded-full"
                >
                  {product.stock.toString()} in stock
                </Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="rounded-full px-8 gap-2 font-body flex-1"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                data-ocid="product_detail.add_to_cart_button"
              >
                <ShoppingCart className="size-5" />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-body flex-1"
                onClick={() => {
                  handleAddToCart();
                  navigate({ to: "/cart" });
                }}
                disabled={isOutOfStock}
                data-ocid="product_detail.buy_now_button"
              >
                Buy Now
              </Button>
            </div>

            {/* Highlights */}
            <div className="bg-muted/30 rounded-2xl p-5 space-y-3 border border-border/50">
              <h3 className="font-display font-semibold text-foreground text-sm">
                Product Highlights
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Natural ingredients,
                  no preservatives
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Available in 350ml
                  bottles
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Fast delivery to your
                  door
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
