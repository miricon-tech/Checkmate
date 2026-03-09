import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "surface" | "gold";
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

const variantClasses = {
  primary: "ui-button ui-button--primary",
  secondary: "ui-button ui-button--secondary",
  surface: "ui-button ui-button--surface",
  gold: "ui-button ui-button--gold",
} as const;

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm md:text-base",
  lg: "px-6 py-3.5 text-base",
} as const;

export function Button({
  children,
  className,
  href,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}
