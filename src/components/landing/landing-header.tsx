import { BrandLogo } from "@/components/landing/brand-logo";
import { Button } from "@/components/ui/button";
import { navigation } from "@/content/landing";

export function LandingHeader() {
  return (
    <header className="w-full border-b border-[var(--border)] bg-[rgba(255,255,255,0.94)] backdrop-blur-md">
      <div
        className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-4 md:px-10"
        dir="ltr"
      >
        <BrandLogo className="shrink-0" compact />

        <nav className="hidden items-center gap-8 md:flex" dir="rtl">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="ui-nav-link">
              {item.name}
            </a>
          ))}
        </nav>

        <Button href="#cta" size="sm" className="shrink-0">
          בדיקת התאמה (15 דק׳)
        </Button>
      </div>

      <nav className="border-t border-[var(--border)] md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-3 text-sm font-semibold text-[var(--accent-deep)]">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="transition hover:opacity-70">
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
