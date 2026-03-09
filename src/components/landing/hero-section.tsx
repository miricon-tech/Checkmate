import Image from "next/image";
import { BrandLogo } from "@/components/landing/brand-logo";

export function HeroSection() {
  return (
    <section id="hero" className="w-full pb-10 pt-0 md:pb-14">
      <div className="hero-scroll-frame relative isolate min-h-[76vh] overflow-hidden bg-[var(--accent-deep)]">
        <div className="sr-only">
          <h1>Checkmate - מערכת לטיפול בלידים, תיאום פגישות ושיפור מכירות</h1>
          <p>
            Checkmate מחברת בין שיווק, טיפול בלידים, תיאום פגישות ותהליך
            המכירה כדי לייצר יותר פגישות שמתקיימות, יותר שליטה ויותר סגירות.
          </p>
        </div>
        <Image
          src="/home-page-hero/Chessboard.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,17,35,0.18)_0%,rgba(7,17,35,0.44)_34%,rgba(7,17,35,0.84)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(61,111,178,0.18),transparent_32%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(7,17,35,0.72),transparent)]" />

        <div className="relative z-10 flex min-h-[76vh] items-center justify-center px-6 py-24 md:px-10 md:py-28">
          <div className="hero-brand-shell">
            <BrandLogo className="hero-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
