"use client";

import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "outline";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:  "bg-surface-secondary text-foreground border-border",
  success:  "bg-success/10 text-success border-success/20",
  warning:  "bg-warning/10 text-warning border-warning/20",
  danger:   "bg-danger/10 text-danger border-danger/20",
  info:     "bg-[#069BD6]/10 text-[#069BD6] border-[#069BD6]/20",
  outline:  "bg-transparent text-foreground border-border",
};

const dotVariantStyles: Record<BadgeVariant, string> = {
  default:  "bg-foreground",
  success:  "bg-success",
  warning:  "bg-warning",
  danger:   "bg-danger",
  info:     "bg-[#069BD6]",
  outline:  "bg-foreground",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-0.5",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotVariantStyles[variant])}
        />
      )}
      {children}
    </span>
  );
}

// Chip is an alias with optional remove button
interface ChipProps extends BadgeProps {
  onRemove?: () => void;
}

export function Chip({ onRemove, children, ...props }: ChipProps) {
  return (
    <Badge {...props} className={cn("pr-1", props.className)}>
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 transition-colors"
          aria-label="Remove"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </Badge>
  );
}