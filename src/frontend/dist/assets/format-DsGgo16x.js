function formatPrice(cents) {
  const dollars = Number(cents) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(dollars);
}
function formatDate(nanosTimestamp) {
  const ms = Number(nanosTimestamp / 1000000n);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(ms));
}
function formatOrderStatus(status) {
  const labels = {
    Pending: "Pending",
    Processing: "Processing",
    Shipped: "Shipped",
    Delivered: "Delivered",
    Cancelled: "Cancelled"
  };
  return labels[status] ?? status;
}
function truncatePrincipal(principal) {
  if (principal.length <= 16) return principal;
  return `${principal.slice(0, 8)}...${principal.slice(-4)}`;
}
export {
  formatDate as a,
  formatOrderStatus as b,
  formatPrice as f,
  truncatePrincipal as t
};
