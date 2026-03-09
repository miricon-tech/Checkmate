import { cn } from "@/lib/cn";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ className, compact = false }: BrandLogoProps) {
  return (
    <a
      href="#"
      dir="ltr"
      aria-label="Checkmate"
      className={cn("brand-lockup", compact && "brand-lockup--compact", className)}
    >
      <span className="brand-mark brand-lockup__wordmark">
        <span className="brand-mark__main">Check</span>
        <span className="brand-mark__accent">mate</span>
      </span>
      <span className="brand-lockup__line" />
      <span className="brand-lockup__tagline">מנוע הצמיחה של העסק</span>
    </a>
  );
}
