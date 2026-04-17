import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className,
      )}
      data-ocid="empty_state"
    >
      <div className="bg-muted rounded-full p-5 mb-5">
        <Icon className="size-10 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className="text-display-sm text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-6 leading-relaxed">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} className="rounded-full px-6">
          {action.label}
        </Button>
      )}
    </div>
  );
}
