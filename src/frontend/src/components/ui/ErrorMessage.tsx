import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-6",
        className,
      )}
      data-ocid="error_state"
    >
      <div className="bg-destructive/10 rounded-full p-4 mb-4">
        <AlertCircle className="size-8 text-destructive" />
      </div>
      <h3 className="text-display-sm text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="gap-2 rounded-full"
        >
          <RefreshCw className="size-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
