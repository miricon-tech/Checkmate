import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PanelProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "strong" | "soft" | "dark";
} & Omit<HTMLAttributes<HTMLDivElement>, "className">;

const toneClasses = {
  default: "ui-panel motion-panel",
  strong: "ui-panel ui-panel--strong motion-panel",
  soft: "ui-panel ui-panel--soft motion-panel",
  dark: "ui-panel ui-panel--dark motion-panel",
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
