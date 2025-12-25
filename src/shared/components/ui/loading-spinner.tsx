import { Loader2 } from "lucide-react";
import { cn } from "~/shared/utils/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

const sizeMap = {
  lg: "w-8 h-8",
  md: "w-6 h-6",
  sm: "w-4 h-4",
  xl: "w-12 h-12",
};

export const LoadingSpinner = ({
  size = "md",
  className,
  text,
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        className={cn("animate-spin text-primary", sizeMap[size], className)}
      />
      {text && (
        <p className="text-sm text-foreground/70 animate-pulse">{text}</p>
      )}
    </div>
  );
};
