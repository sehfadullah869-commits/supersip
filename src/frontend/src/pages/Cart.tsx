import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { EmptyState } from "../components/ui/EmptyState";
import { useAuth } from "../hooks/use-auth";
import { useCart } from "../hooks/use-cart";
import { formatPrice } from "../utils/format";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const { isAuthenticated, login } = useAuth();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add some delicious beverages to get started."
          action={{
            label: "Browse products",
            onClick: () => navigate({ to: "/products", search: {} }),
          }}
        />
      </div>
    );
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.info("Sign in to checkout", {
        description: "You need an account to place an order.",
        action: { label: "Sign in", onClick: login },
      });
      return;
    }
    navigate({ to: "/checkout" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => navigate({ to: "/products", search: {} })}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth group"
            data-ocid="cart.back_button"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-smooth" />
            <span className="text-sm font-medium">Continue shopping</span>
          </button>
        </div>

        <h1 className="text-display-lg text-foreground mb-2">Your Cart</h1>
        <p className="text-muted-foreground mb-8">
          {itemCount} item{itemCount !== 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div
                  key={item.productId.toString()}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl p-4 border border-border/50 shadow-card flex gap-4 items-center"
                  data-ocid={`cart.item.${i + 1}`}
                >
                  {/* Image */}
                  <div className="bg-muted rounded-xl w-20 h-20 shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="size-8 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <button
                      type="button"
                      className="font-display font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors truncate block w-full text-left"
                      onClick={() =>
                        navigate({
                          to: "/products/$id",
                          params: { id: item.productId.toString() },
                        })
                      }
                    >
                      {item.name}
                    </button>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {formatPrice(item.price)} each
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 rounded-full"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                      data-ocid={`cart.decrease_button.${i + 1}`}
                    >
                      <Minus className="size-3" />
                    </Button>
                    <span className="w-6 text-center font-display font-semibold text-sm text-foreground">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 rounded-full"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      data-ocid={`cart.increase_button.${i + 1}`}
                    >
                      <Plus className="size-3" />
                    </Button>
                  </div>

                  {/* Subtotal + remove */}
                  <div className="text-right shrink-0 space-y-1">
                    <p className="font-display font-bold text-foreground text-sm">
                      {formatPrice(item.price * BigInt(item.quantity))}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label={`Remove ${item.name}`}
                      data-ocid={`cart.delete_button.${i + 1}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card sticky top-20 space-y-4">
              <h2 className="font-display font-semibold text-foreground">
                Order Summary
              </h2>
              <Separator />
              <div className="space-y-2 text-sm">
                {items.map((item) => (
                  <div
                    key={item.productId.toString()}
                    className="flex justify-between text-muted-foreground"
                  >
                    <span className="truncate min-w-0 mr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="shrink-0">
                      {formatPrice(item.price * BigInt(item.quantity))}
                    </span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between font-display font-bold text-foreground">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button
                size="lg"
                className="w-full rounded-full gap-2 font-body"
                onClick={handleCheckout}
                data-ocid="cart.checkout_button"
              >
                Proceed to Checkout
                <ArrowRight className="size-4" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
