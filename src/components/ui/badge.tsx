import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "dark" | "gold";
} & Omit<HTMLAttributes<HTMLSpanElement>, "className">;

const toneClasses = {
  default: "ui-badge",
  dark: "ui-badge ui-badge--dark",
  gold: "ui-badge ui-badge--gold",
} as const;

export function Badge({
  children,
  className,
  tone = "default",
  ...props
}: BadgeProps) {
  return (
    <span className={cn(toneClasses[tone], className)} {...props}>
      {children}
    </span>
  );
}
