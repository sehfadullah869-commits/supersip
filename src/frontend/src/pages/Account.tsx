import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Package, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import {
  LoadingSpinner,
  OrderRowSkeleton,
} from "../components/ui/LoadingSpinner";
import { useAuth } from "../hooks/use-auth";
import { useMyOrders } from "../hooks/use-backend";
import { OrderStatus } from "../types";
import {
  formatDate,
  formatOrderStatus,
  formatPrice,
  truncatePrincipal,
} from "../utils/format";

const statusVariant: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "bg-accent/20 text-accent-foreground border-accent/30",
  [OrderStatus.Processing]:
    "bg-secondary/20 text-secondary border-secondary/30",
  [OrderStatus.Shipped]: "bg-primary/15 text-primary border-primary/30",
  [OrderStatus.Delivered]: "bg-primary/10 text-primary border-primary/25",
  [OrderStatus.Cancelled]:
    "bg-destructive/10 text-destructive border-destructive/20",
};

export default function AccountPage() {
  const navigate = useNavigate();
  const { principal, logout } = useAuth();
  const { data: orders = [], isLoading, error, refetch } = useMyOrders(true);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-display-lg text-foreground mb-2">My Account</h1>
        <p className="text-muted-foreground text-sm mb-8 font-mono">
          {principal ? truncatePrincipal(principal) : ""}
        </p>

        {/* Orders section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-display-sm text-foreground">Order History</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full font-body"
              onClick={logout}
              data-ocid="account.logout_button"
            >
              Sign out
            </Button>
          </div>

          {error ? (
            <ErrorMessage onRetry={() => refetch()} />
          ) : isLoading ? (
            <div className="space-y-3">
              {(["a", "b", "c"] as const).map((k) => (
                <OrderRowSkeleton key={`order-sk-${k}`} />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="No orders yet"
              description="Your order history will appear here after your first purchase."
              action={{
                label: "Start shopping",
                onClick: () => navigate({ to: "/products", search: {} }),
              }}
            />
          ) : (
            <div className="space-y-3">
              {orders.map((order, i) => (
                <motion.div
                  key={order.id.toString()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  data-ocid={`account.order.item.${i + 1}`}
                >
                  <button
                    type="button"
                    className="w-full text-left bg-card rounded-2xl p-5 border border-border/50 shadow-card hover:shadow-elevated transition-smooth group"
                    onClick={() =>
                      navigate({
                        to: "/account/orders/$id",
                        params: { id: order.id.toString() },
                      })
                    }
                    data-ocid={`account.order.view_button.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Package className="size-4 text-muted-foreground" />
                          <span className="font-display font-semibold text-foreground text-sm">
                            Order #{order.id.toString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {formatDate(order.createdAt)} · {order.items.length}{" "}
                          item{order.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Badge
                          variant="outline"
                          className={`text-xs rounded-full px-2.5 py-0.5 ${statusVariant[order.status]}`}
                        >
                          {formatOrderStatus(order.status)}
                        </Badge>
                        <span className="font-display font-bold text-foreground text-sm">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      View order details
                      <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-smooth" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
