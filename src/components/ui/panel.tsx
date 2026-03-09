import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PanelProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "strong" | "soft" | "dark";
} & Omit<HTMLAttributes<HTMLDivElement>, "className">;

const toneClasses = {
  default: "ui-panel",
  strong: "ui-panel ui-panel--strong",
  soft: "ui-panel ui-panel--soft",
  dark: "ui-panel ui-panel--dark",
} as const;

export function Panel({
  children,
  className,
  tone = "default",
  ...props
}: PanelProps) {
  return (
    <div className={cn(toneClasses[tone], className)} {...props}>
      {children}
    </div>
  );
}
