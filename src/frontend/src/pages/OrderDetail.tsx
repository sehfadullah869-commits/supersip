import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Package } from "lucide-react";
import { motion } from "motion/react";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useOrderById } from "../hooks/use-backend";
import { OrderStatus } from "../types";
import { formatDate, formatOrderStatus, formatPrice } from "../utils/format";

const statusVariant: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "bg-accent/20 text-accent-foreground border-accent/30",
  [OrderStatus.Processing]:
    "bg-secondary/20 text-secondary border-secondary/30",
  [OrderStatus.Shipped]: "bg-primary/15 text-primary border-primary/30",
  [OrderStatus.Delivered]: "bg-primary/10 text-primary border-primary/25",
  [OrderStatus.Cancelled]:
    "bg-destructive/10 text-destructive border-destructive/20",
};

const statusSteps = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Shipped,
  OrderStatus.Delivered,
];

export default function OrderDetailPage() {
  const { id } = useParams({ from: "/account/orders/$id" });
  const navigate = useNavigate();
  const orderId = BigInt(id);
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useOrderById(orderId, true);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" message="Loading order..." />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage onRetry={() => refetch()} />;
  }

  if (!order) {
    return (
      <EmptyState
        icon={Package}
        title="Order not found"
        description="This order doesn't exist or doesn't belong to your account."
        action={{
          label: "My orders",
          onClick: () => navigate({ to: "/account" }),
        }}
      />
    );
  }

  const currentStep =
    order.status === OrderStatus.Cancelled
      ? -1
      : statusSteps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <button
          type="button"
          onClick={() => navigate({ to: "/account" })}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth mb-8 group"
          data-ocid="order_detail.back_button"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-smooth" />
          <span className="text-sm font-medium">Back to orders</span>
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="font-display font-bold text-foreground text-xl">
                  Order #{order.id.toString()}
                </h1>
                <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <Badge
                variant="outline"
                className={`text-sm rounded-full px-3 py-1 shrink-0 ${statusVariant[order.status]}`}
              >
                {formatOrderStatus(order.status)}
              </Badge>
            </div>

            {/* Progress tracker */}
            {order.status !== OrderStatus.Cancelled && (
              <div className="flex items-center gap-1 mt-4">
                {statusSteps.map((step, i) => (
                  <div key={step} className="flex items-center flex-1">
                    <div
                      className={`w-full h-1.5 rounded-full transition-smooth ${
                        i <= currentStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                    {i < statusSteps.length - 1 && null}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delivery Address */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border/50 shadow-card"
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="size-4 text-muted-foreground" />
              <h2 className="font-display font-semibold text-foreground text-sm">
                Delivery Address
              </h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {order.deliveryAddress}
            </p>
          </motion.div>

          {/* Items */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-card rounded-2xl p-6 border border-border/50 shadow-card space-y-4"
          >
            <h2 className="font-display font-semibold text-foreground text-sm">
              Items Ordered
            </h2>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div
                  key={`item-${item.productId.toString()}`}
                  className="flex justify-between items-center text-sm"
                  data-ocid={`order_detail.item.${i + 1}`}
                >
                  <div>
                    <p className="font-medium text-foreground">
                      Item #{String(i + 1)}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {item.quantity.toString()} ×{" "}
                      {formatPrice(item.priceAtPurchase)}
                    </p>
                  </div>
                  <span className="font-display font-semibold text-foreground">
                    {formatPrice(item.priceAtPurchase * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between font-display font-bold text-foreground">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </motion.div>

          <Button
            variant="outline"
            className="w-full rounded-full font-body"
            onClick={() => navigate({ to: "/products", search: {} })}
            data-ocid="order_detail.shop_again_button"
          >
            Order Again
          </Button>
        </div>
      </div>
    </div>
  );
}
