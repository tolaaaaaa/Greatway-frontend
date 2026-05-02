"use client";

import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  count?: number;
  icon?: ReactNode;
}

interface TabsProps<T extends string> {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  variant?: "default" | "pill" | "underline";
  size?: "sm" | "md" | "lg";
  className?: string;
  showCount?: boolean;
}

export function Tabs<T extends string>({
  options,
  value,
  onChange,
  variant = "default",
  size = "md",
  className,
  showCount = true,
}: TabsProps<T>) {
  const variantStyles = {
    default: {
      container: "bg-[#181818] rounded-xl px-8 pt-4 pb-0 flex items-center gap-10",
      tab: (isActive: boolean) => cn(
        "flex flex-col items-center gap-3 cursor-pointer transition-colors duration-200",
        isActive 
          ? "text-[#06CD70]" 
          : "text-white/70 hover:text-white"
      ),
      indicator: (isActive: boolean) => cn(
        "h-0.5 w-full rounded-full transition-all duration-200",
        isActive ? "bg-[#06CD70]" : "bg-transparent"
      ),
    },
    pill: {
      container: "flex gap-2",
      tab: (isActive: boolean) => cn(
        "px-6 py-2.5 rounded-full transition-all duration-200",
        isActive 
          ? "bg-[#06CD70] text-white" 
          : "text-white/70 hover:text-white bg-white/5 hover:bg-white/10"
      ),
      indicator: () => "",
    },
    underline: {
      container: "flex gap-6 border-b border-white/10",
      tab: (isActive: boolean) => cn(
        "px-1 py-3 relative -mb-px transition-all duration-200",
        isActive 
          ? "text-[#06CD70]" 
          : "text-white/70 hover:text-white"
      ),
      indicator: (isActive: boolean) => cn(
        "absolute bottom-0 left-0 h-0.5 w-full rounded-full transition-all duration-200",
        isActive ? "bg-[#06CD70]" : "bg-transparent"
      ),
    },
  };

  const sizeStyles = {
    sm: "text-sm font-semibold tracking-normal",
    md: "text-base font-bold tracking-[0.01em]", // Your original styles
    lg: "text-lg font-bold tracking-[0.015em]",
  };

  const styles = variantStyles[variant];

  return (
    <div className={cn(styles.container, className)}>
      {options.map((option) => {
        const isActive = value === option.id;
        
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              styles.tab(isActive),
              sizeStyles[size],
              "group"
            )}
          >
            <div className="flex items-center gap-2">
              {option.icon}
              <span>{option.label}</span>
              {showCount && option.count !== undefined && (
                <span
                  className={cn(
                    "ml-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-muted-foreground"
                  )}
                >
                  {option.count}
                </span>
              )}
            </div>

            {/* Active indicator for default and underline variants */}
            {variant !== "pill" && (
              <span className={styles.indicator(isActive)} />
            )}
          </button>
        );
      })}
    </div>
  );
}