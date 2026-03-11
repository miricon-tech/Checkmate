import { Button } from "@/components/ui/button";
import { HeroQualification } from "@/components/landing/hero-qualification";
import { heroChecklist, heroTrustBullets } from "@/content/landing";

function ChevronRightTiny() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M7 4.5 12.5 10 7 15.5" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden border-b border-[var(--border)] bg-[var(--background)]"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(110%_100%_at_top_right,white,transparent)] stroke-[rgba(22,52,92,0.08)]"
      >
        <defs>
          <pattern
            id="checkmate-hero-grid"
            width={180}
            height={180}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 180V.5H180" fill="none" />
          </pattern>
        </defs>
        <rect
          fill="url(#checkmate-hero-grid)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>

      <div
        aria-hidden="true"
        className="absolute -top-28 left-[calc(50%-6rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-16rem)] lg:top-0 lg:left-40"
      >
        <div
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
          className="aspect-[1108/632] w-[34rem] bg-[linear-gradient(90deg,rgba(240,209,138,0.34),rgba(22,52,92,0.26))] opacity-80"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-12 pb-20 lg:grid lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-14 lg:px-10 lg:py-24">
        <div className="max-w-2xl lg:pt-8">
          <div className="inline-flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[rgba(200,164,93,0.28)] bg-[rgba(240,209,138,0.16)] px-3 py-1 text-sm font-semibold text-[var(--accent-deep)]">
              לא עוד שיווק. מערכת צמיחה מלאה.
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
              <span>שותף צמיחה לעסקי B2B ושירות בישראל</span>
              <ChevronRightTiny />
            </span>
          </div>

          <h1 className="mt-10 font-display text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-[var(--accent-deep)] md:text-7xl">
            העסק כבר עובד.
            <span className="mt-3 block text-[var(--accent)]">
              אז למה הצמיחה עדיין תקועה?
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
            Checkmate היא לא עוד סוכנות שיווק. אנחנו נכנסים לעסקי B2B ושירות
            בישראל כשותף צמיחה חיצוני, ומחברים שיווק, לידים, מכירות ותהליך
            סגירה למערכת אחת שמביאה תוצאות מדידות.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {heroChecklist.map((item) => (
              <div
                key={item}
                className="inline-flex items-start gap-3 rounded-[24px] border border-[rgba(22,52,92,0.08)] bg-white/88 px-4 py-4 text-right text-base font-medium text-[var(--accent-deep)] shadow-[0_10px_24px_rgba(22,52,92,0.05)]"
              >
                <span className="mt-1 text-[var(--accent)]">●</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {heroTrustBullets.map((item) => (
              <div
                key={item}
                className="rounded-full border border-[rgba(22,52,92,0.08)] bg-white/84 px-4 py-2 text-sm font-medium text-[var(--accent-deep)] shadow-[0_8px_18px_rgba(22,52,92,0.04)]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="#cta" variant="gold" size="lg">
              בדיקת התאמה (15 דק׳)
            </Button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-deep)] transition hover:text-[var(--accent)]"
            >
              <span>איך זה עובד</span>
              <ChevronRightTiny />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-14 w-full max-w-4xl lg:mt-0 lg:max-w-none">
          <HeroQualification />
        </div>
      </div>
    </section>
  );
}
