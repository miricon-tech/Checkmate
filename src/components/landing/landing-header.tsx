"use client";

import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/landing/brand-logo";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { navigation } from "@/content/landing";
import { cn } from "@/lib/cn";

type MenuToggleProps = {
  open: boolean;
};

function MenuToggleIcon({ open }: MenuToggleProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("h-5 w-5 transition-transform", open && "rotate-90")}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {open ? (
        <path d="M6 6 18 18M18 6 6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateScrollState = () => {
      frame = 0;

      const { documentElement } = document;
      const maxScroll =
        documentElement.scrollHeight - documentElement.clientHeight;
      const currentScroll = window.scrollY;

      setIsScrolled(currentScroll > 24);
      setScrollProgress(maxScroll > 0 ? currentScroll / maxScroll : 0);
    };

    const handleScroll = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="scroll-progress">
        <span
          className="scroll-progress__bar"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <div
        className={cn(
          "border-b border-[rgba(22,52,92,0.08)] transition-all duration-300",
          isScrolled
            ? "bg-[rgba(255,255,255,0.92)] shadow-[0_18px_44px_rgba(22,52,92,0.08)] backdrop-blur-xl"
            : "bg-[rgba(255,255,255,0.76)] backdrop-blur-md"
        )}
      >
        <div
          className={cn(
            "w-full px-6 transition-[padding] duration-300 md:px-10",
            isScrolled ? "py-3" : "py-5"
          )}
        >
          <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
            <nav className="hidden items-center justify-start gap-7 md:flex">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="ui-nav-link">
                {item.name}
              </a>
            ))}
            </nav>

            <BrandLogo
              className={cn(
                "justify-self-center transition-transform duration-300",
                isScrolled ? "scale-[0.94]" : "scale-100"
              )}
              compact
            />

            <div className="flex items-center justify-end gap-3">
              <div className="hidden md:block">
                <Button href="#cta" size="sm">
                  לשיחת אסטרטגיה
                </Button>
              </div>
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-nav"
                  className="ui-icon-button inline-flex items-center justify-center"
                >
                  <span className="sr-only">פתיחת תפריט</span>
                  <MenuToggleIcon open={mobileMenuOpen} />
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen ? (
            <Panel id="mobile-nav" tone="soft" className="mt-4 p-4 md:hidden">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--accent-deep)] transition hover:bg-[rgba(22,52,92,0.06)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <Button
                href="#cta"
                className="mt-4 w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                לשיחת אסטרטגיה
              </Button>
            </Panel>
          ) : null}
        </div>
      </div>
    </header>
  );
}
