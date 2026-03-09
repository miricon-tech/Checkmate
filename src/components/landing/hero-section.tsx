import Image from "next/image";
import { Button } from "@/components/ui/button";
import { heroChecklist, heroProofPoints } from "@/content/landing";

export function HeroSection() {
  return (
    <section id="hero" className="mx-auto max-w-6xl px-6 pb-14 pt-8 md:px-10 md:pb-20">
      <div className="relative isolate overflow-hidden rounded-[42px] border border-[var(--border)] bg-[var(--accent-deep)] shadow-[0_24px_90px_rgba(22,52,92,0.16)]">
        <Image
          src="/home-page-hero/Chessboard.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,17,35,0.22)_0%,rgba(7,17,35,0.48)_34%,rgba(7,17,35,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,164,93,0.26),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,rgba(7,17,35,0.88),transparent)]" />

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-4xl flex-col justify-between px-6 py-14 text-center text-white md:px-10 md:py-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-white md:text-7xl">
                אתה לא צריך עוד לידים.
                <span className="mt-3 block text-[var(--accent-soft)]">
                  אתה צריך מערכת שממירה אותם לעסקאות.
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
                Checkmate מחברת בין שיווק, טיפול בלידים, תיאום פגישות ותהליך
                המכירה. כדי לייצר יותר פגישות שמתקיימות, יותר שליטה, ויותר
                סגירות.
              </p>
            </div>

            <div className="mx-auto flex max-w-xl flex-col items-start gap-3 text-right">
              {heroChecklist.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/8 px-4 py-3 text-base font-medium text-white/92 backdrop-blur"
                >
                  <span className="text-[var(--accent-soft)]">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="#cta" variant="gold" size="lg">
                  בדיקת התאמה (15 דק׳)
                </Button>
              </div>
              <p className="text-sm font-medium text-white/76 md:text-base">
                מיועד לעסקים עם עסקה ממוצעת של 15,000 ₪ ומעלה
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-white/12 pt-8 text-sm font-medium text-white/74 md:text-base">
            {heroProofPoints.map((item, index) => (
              <div key={item} className="inline-flex items-center gap-3">
                <span>{item}</span>
                {index < heroProofPoints.length - 1 ? (
                  <span className="text-[var(--accent-soft)]/80">|</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
