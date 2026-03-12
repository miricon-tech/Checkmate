import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "surface" | "gold";
};

type LinkButtonProps = SharedButtonProps & {
  href: string;
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
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

function isExternalHref(href: string) {
  return /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(href) || href.startsWith("//");
}

function isHashHref(href: string) {
  return href.startsWith("#");
}

export function Button(props: ButtonProps) {
  if ("href" in props && typeof props.href === "string") {
    const {
      children,
      className,
      href,
      prefetch,
      replace,
      scroll,
      size = "md",
      variant = "primary",
      ...anchorProps
    } = props;

    const classes = cn(variantClasses[variant], sizeClasses[size], className);
    const isInternalRoute = !isExternalHref(href) && !isHashHref(href);

    if (isInternalRoute) {
      return (
        <Link
          href={href}
          prefetch={prefetch}
          replace={replace}
          scroll={scroll}
          className={classes}
          {...anchorProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
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
