import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  message,
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "size-4 border-2",
    md: "size-8 border-2",
    lg: "size-12 border-[3px]",
  };

  return (
    <div
      className={cn("flex flex-col items-center gap-3", className)}
      data-ocid="loading_state"
    >
      <div
        className={cn(
          "rounded-full border-border border-t-primary animate-spin",
          sizeClasses[size],
        )}
        role="status"
        aria-label={message ?? "Loading"}
      />
      {message && (
        <p className="text-sm text-muted-foreground font-body">{message}</p>
      )}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden animate-pulse shadow-card">
      <div className="bg-muted h-52 w-full" />
      <div className="p-4 space-y-2">
        <div className="bg-muted h-4 rounded w-16" />
        <div className="bg-muted h-5 rounded w-3/4" />
        <div className="bg-muted h-4 rounded w-1/2" />
        <div className="flex items-center justify-between pt-1">
          <div className="bg-muted h-6 rounded w-16" />
          <div className="bg-muted h-9 rounded-full w-28" />
        </div>
      </div>
    </div>
  );
}

export function OrderRowSkeleton() {
  return (
    <div className="bg-card rounded-xl p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="bg-muted h-4 rounded w-24" />
          <div className="bg-muted h-3 rounded w-32" />
        </div>
        <div className="bg-muted h-6 rounded-full w-20" />
      </div>
    </div>
  );
}
