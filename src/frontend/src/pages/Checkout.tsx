import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useCreateCheckoutSession, useCreateOrder } from "../hooks/use-backend";
import { useCart } from "../hooks/use-cart";
import { formatPrice } from "../utils/format";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrder = useCreateOrder();
  const createCheckoutSession = useCreateCheckoutSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }

    setIsProcessing(true);
    try {
      await createOrder.mutateAsync({
        deliveryAddress: address,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: BigInt(item.quantity),
          priceAtPurchase: item.price,
        })),
      });

      const shoppingItems = items.map((item) => ({
        productName: item.name,
        currency: "usd",
        quantity: BigInt(item.quantity),
        priceInCents: item.price,
        productDescription: `SuperSip ${item.category}`,
      }));

      const successUrl = `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/checkout`;

      const sessionUrl = await createCheckoutSession.mutateAsync({
        items: shoppingItems,
        successUrl,
        cancelUrl,
      });

      clearCart();
      window.location.href = sessionUrl;
    } catch (err) {
      toast.error("Checkout failed", {
        description: err instanceof Error ? err.message : "Please try again.",
      });
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate({ to: "/cart" });
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          type="button"
          onClick={() => navigate({ to: "/cart" })}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth mb-8 group"
          data-ocid="checkout.back_button"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-smooth" />
          <span className="text-sm font-medium">Back to cart</span>
        </button>

        <h1 className="text-display-lg text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-card space-y-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary/10 rounded-xl p-2">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  <h2 className="font-display font-semibold text-foreground">
                    Delivery Address
                  </h2>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Full delivery address
                  </Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street, City, State, ZIP"
                    className="resize-none rounded-xl min-h-[80px]"
                    required
                    data-ocid="checkout.address_textarea"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary/10 rounded-xl p-2">
                    <CreditCard className="size-4 text-primary" />
                  </div>
                  <h2 className="font-display font-semibold text-foreground">
                    Payment
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm">
                  You'll be redirected to Stripe's secure checkout to complete
                  your payment. We accept all major credit and debit cards.
                </p>
              </motion.div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full gap-2 font-body"
                disabled={isProcessing}
                data-ocid="checkout.submit_button"
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Processing…
                  </>
                ) : (
                  <>
                    <CreditCard className="size-5" />
                    Pay {formatPrice(total)}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card sticky top-20 space-y-4">
              <h2 className="font-display font-semibold text-foreground">
                Order Summary
              </h2>
              <Separator />
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.productId.toString()}
                    className="flex gap-3 items-center"
                  >
                    <div className="bg-muted rounded-lg w-10 h-10 shrink-0 overflow-hidden">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-foreground shrink-0">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
