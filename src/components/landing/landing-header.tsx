"use client";

import { useState } from "react";
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

  return (
    <header className="px-6 pt-6 md:px-10">
      <div className="surface-card surface-card-strong mx-auto max-w-6xl rounded-[34px] px-5 py-5 md:px-8 md:py-6">
        <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
          <nav className="hidden items-center justify-start gap-7 md:flex">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="ui-nav-link">
                {item.name}
              </a>
            ))}
          </nav>

          <BrandLogo className="justify-self-center" compact />

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
    </header>
  );
}
