"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function LandingHeader() {
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
      const progress = maxScroll > 0 ? currentScroll / maxScroll : 0;
      const rootStyle = documentElement.style;

      setIsScrolled(currentScroll > 24);
      setScrollProgress(progress);

      rootStyle.setProperty("--scroll-progress", progress.toFixed(4));
      rootStyle.setProperty("--scroll-progress-percent", `${progress * 100}%`);
      rootStyle.setProperty(
        "--hero-border-opacity",
        `${0.22 + progress * 0.58}`
      );
      rootStyle.setProperty(
        "--hero-border-glow",
        `${18 + progress * 34}px`
      );
      rootStyle.setProperty(
        "--hero-border-shift",
        `${12 + progress * 76}%`
      );
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "scroll-progress transition-[height,box-shadow,background-color] duration-300",
          isScrolled
            ? "h-1.5 bg-[rgba(22,52,92,0.1)] shadow-[0_6px_18px_rgba(22,52,92,0.14)]"
            : "h-1 bg-[rgba(22,52,92,0.06)]"
        )}
      >
        <span
          className="scroll-progress__bar"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </header>
  );
}
