"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/landing/brand-logo";

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const progressBarRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let frameId = 0;

    const updateScrollState = () => {
      frameId = 0;

      const currentScroll = window.scrollY;
      const nextScrolled = currentScroll > 18;

      setIsScrolled((current) =>
        current === nextScrolled ? current : nextScrolled
      );

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        maxScroll > 0 ? Math.min(currentScroll / maxScroll, 1) : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const handleScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <header
      className="site-header"
      data-scrolled={isScrolled ? "true" : "false"}
    >
      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressBarRef} className="scroll-progress__bar" />
      </div>

      <div className="site-header__trim" aria-hidden="true" />

      <div className="site-header__inner mx-auto flex max-w-7xl items-center justify-center px-6 py-4 lg:px-10">
        <div dir="ltr" className="site-header__logo">
          <BrandLogo className="shrink-0" compact />
        </div>
      </div>
    </header>
  );
}
