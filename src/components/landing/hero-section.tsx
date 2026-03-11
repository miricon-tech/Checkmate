import Image from "next/image";
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
      <div
        aria-hidden="true"
        className="absolute left-[-9rem] top-[-8rem] -z-10 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.2),transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-10rem] right-[-10rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(22,52,92,0.12),transparent_72%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-20rem)] lg:left-28 xl:left-[calc(50%-26rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
          className="aspect-[1108/632] w-[28rem] bg-[linear-gradient(90deg,rgba(240,209,138,0.26),rgba(22,52,92,0.22))] opacity-80"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 lg:px-10 lg:py-24">
        <div dir="ltr" className="lg:flex lg:items-start lg:gap-14 xl:gap-16">
          <div dir="rtl" className="max-w-2xl flex-1 lg:order-2 lg:pt-6">
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

            <HeroQualification compact />

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

          <div className="mx-auto mt-14 flex w-full max-w-2xl flex-none justify-center lg:order-1 lg:mt-3 lg:max-w-[34rem] xl:max-w-[39rem]">
            <div className="relative w-full overflow-hidden rounded-[34px] border border-[rgba(22,52,92,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,243,233,0.96)_100%)] p-3 shadow-[0_30px_80px_rgba(22,52,92,0.14)]">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_35%,rgba(200,164,93,0.12)_100%)]" />
              <div className="absolute left-5 top-5 z-10 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[var(--accent-deep)] shadow-[0_10px_24px_rgba(22,52,92,0.08)]">
                CHECKMATE SYSTEM
              </div>
              <div className="relative overflow-hidden rounded-[28px] bg-[var(--accent-deep)]">
                <Image
                  src="/home-page-hero/Chessboard.png"
                  alt="לוח שחמט באווירה עסקית"
                  width={1536}
                  height={1024}
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,28,52,0.18)_0%,rgba(10,28,52,0)_36%,rgba(200,164,93,0.14)_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
