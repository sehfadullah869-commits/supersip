/**
 * Format a price in cents (bigint) to a localized currency string.
 * e.g., 499n → "$4.99"
 */
export function formatPrice(cents: bigint): string {
  const dollars = Number(cents) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(dollars);
}

/**
 * Format a date from a nanosecond timestamp (bigint) to a readable string.
 */
export function formatDate(nanosTimestamp: bigint): string {
  const ms = Number(nanosTimestamp / 1_000_000n);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(ms));
}

/**
 * Format an order status for display.
 */
export function formatOrderStatus(status: string): string {
  const labels: Record<string, string> = {
    Pending: "Pending",
    Processing: "Processing",
    Shipped: "Shipped",
    Delivered: "Delivered",
    Cancelled: "Cancelled",
  };
  return labels[status] ?? status;
}

/**
 * Truncate a principal string to a readable short form.
 */
export function truncatePrincipal(principal: string): string {
  if (principal.length <= 16) return principal;
  return `${principal.slice(0, 8)}...${principal.slice(-4)}`;
}
