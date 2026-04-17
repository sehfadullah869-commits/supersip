import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Plus, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../../hooks/use-cart";
import { Category } from "../../types";
import type { Product } from "../../types";
import { formatPrice } from "../../utils/format";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const categoryLabels: Record<Category, string> = {
  [Category.ColdDrink]: "Cold Drink",
  [Category.MineralWater]: "Mineral Water",
  [Category.Juice]: "Juice",
};

const categoryColors: Record<Category, string> = {
  [Category.ColdDrink]: "bg-secondary/20 text-secondary border-secondary/30",
  [Category.MineralWater]: "bg-primary/10 text-primary border-primary/20",
  [Category.Juice]: "bg-accent/20 text-accent-foreground border-accent/30",
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    });
  };

  const handleClick = () => {
    navigate({ to: "/products/$id", params: { id: product.id.toString() } });
  };

  const isOutOfStock = product.stock === 0n;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group"
      data-ocid={`product.item.${index + 1}`}
    >
      <button
        type="button"
        className={cn(
          "bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-smooth cursor-pointer border border-border/50",
          "flex flex-col w-full text-left",
        )}
        onClick={handleClick}
        aria-label={`View ${product.name}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-muted/30 aspect-square">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ShoppingCart className="size-12 text-muted-foreground/40" />
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="bg-card text-muted-foreground text-xs font-medium px-3 py-1 rounded-full border">
                Out of stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <Badge
            variant="outline"
            className={cn(
              "text-xs px-2 py-0.5 w-fit font-body font-medium rounded-full",
              categoryColors[product.category],
            )}
          >
            {categoryLabels[product.category]}
          </Badge>
          <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 min-w-0">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 min-w-0 flex-1">
            {product.description}
          </p>
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="font-display font-bold text-foreground text-lg">
              {formatPrice(product.price)}
            </span>
            <Button
              size="sm"
              className="rounded-full gap-1.5 shrink-0 font-body text-xs px-3"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              data-ocid={`product.add_button.${index + 1}`}
            >
              <Plus className="size-3.5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
