import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "surface" | "gold";
};

type LinkButtonProps = SharedButtonProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

type NativeButtonProps = SharedButtonProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses = {
  primary: "ui-button ui-button--primary motion-button",
  secondary: "ui-button ui-button--secondary motion-button",
  surface: "ui-button ui-button--surface motion-button",
  gold: "ui-button ui-button--gold motion-button",
} as const;

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm lg:text-base",
  lg: "px-6 py-3.5 text-base",
} as const;

export function Button(props: ButtonProps) {
  if ("href" in props && typeof props.href === "string") {
    const {
      children,
      className,
      href,
      size = "md",
      variant = "primary",
      ...anchorProps
    } = props;

    return (
      <a
        href={href}
        className={cn(variantClasses[variant], sizeClasses[size], className)}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const {
    children,
    className,
    size = "md",
    type = "button",
    variant = "primary",
    ...buttonProps
  } = props;

  return (
    <button
      type={type}
      className={cn(variantClasses[variant], sizeClasses[size], className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
