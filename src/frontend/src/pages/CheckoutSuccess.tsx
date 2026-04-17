import { Button } from "@/components/ui/button";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight, CheckCircle, Loader2, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useStripeSessionStatus } from "../hooks/use-backend";

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/checkout/success" });
  const sessionId =
    (search as Record<string, string | undefined>).session_id ?? null;

  const { data: sessionStatus, isLoading } = useStripeSessionStatus(
    sessionId,
    !!sessionId,
  );

  useEffect(() => {
    if (sessionStatus?.__kind__ === "failed") {
      navigate({ to: "/cart" });
    }
  }, [sessionStatus, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            <Loader2 className="size-12 text-primary animate-spin mx-auto" />
            <p className="text-muted-foreground font-body">
              Confirming your order…
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <div className="bg-primary/10 rounded-full p-6">
                <CheckCircle className="size-16 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="font-display text-3xl font-extrabold text-foreground">
                Order Placed!
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Thank you for your order. Your refreshments are on their way!
                You'll receive a confirmation shortly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="rounded-full px-8 gap-2 font-body"
                onClick={() => navigate({ to: "/account" })}
                data-ocid="success.view_orders_button"
              >
                <ShoppingBag className="size-5" />
                View My Orders
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 gap-2 font-body"
                onClick={() => navigate({ to: "/products", search: {} })}
                data-ocid="success.continue_shopping_button"
              >
                Continue Shopping
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
