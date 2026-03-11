import Image from "next/image";
import { Button } from "@/components/ui/button";

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
          className="aspect-[1108/632] w-[30rem] bg-[linear-gradient(90deg,rgba(240,209,138,0.28),rgba(22,52,92,0.18))] opacity-80"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-12 pb-28 sm:pb-32 lg:px-10 lg:py-40">
        <div
          dir="ltr"
          className="lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start lg:gap-18 xl:gap-24"
        >
          <div
            dir="rtl"
            className="mx-auto max-w-2xl lg:col-start-2 lg:row-start-1 lg:mx-0 lg:max-w-[34rem] lg:justify-self-end lg:pt-10"
          >
            <div className="mt-8 sm:mt-12 lg:mt-10">
              <div className="inline-flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[rgba(200,164,93,0.28)] bg-[rgba(240,209,138,0.16)] px-3 py-1 text-sm font-semibold text-[var(--accent-deep)]">
                  לא עוד שיווק. מערכת צמיחה מלאה.
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
                  <span>שותף צמיחה לעסקי B2B ושירות בישראל</span>
                  <ChevronRightTiny />
                </span>
              </div>
            </div>

            <h1 className="mt-10 text-pretty font-display text-5xl leading-[0.93] font-semibold tracking-[-0.045em] text-[var(--accent-deep)] sm:text-6xl lg:text-[5.35rem]">
              העסק כבר עובד.
              <span className="mt-3 block text-[var(--accent)]">
                אז למה הצמיחה עדיין תקועה?
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              Checkmate היא לא עוד סוכנות שיווק. אנחנו נכנסים לעסקי B2B ושירות
              בישראל כשותף צמיחה חיצוני, ומחברים שיווק, לידים, מכירות ותהליך
              סגירה למערכת אחת שמביאה תוצאות מדידות.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href="#cta" variant="gold" size="lg">
                בדיקת התאמה (15 דק׳)
              </Button>
              <a
                href="#qualification"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-deep)] transition hover:text-[var(--accent)]"
              >
                <span>למי זה מתאים</span>
                <ChevronRightTiny />
              </a>
            </div>
          </div>

          <div className="mx-auto mt-16 flex w-full max-w-2xl justify-center sm:mt-20 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:max-w-none lg:justify-self-start lg:pt-6">
            <div className="w-full max-w-3xl sm:max-w-5xl lg:max-w-[44rem] xl:max-w-[47rem]">
              <div className="relative overflow-hidden rounded-[34px] bg-[rgba(255,255,255,0.94)] p-2 shadow-[0_32px_90px_rgba(22,52,92,0.14)] ring-1 ring-[rgba(22,52,92,0.08)]">
                <Image
                  src="/home-page-hero/Chessboard.png"
                  alt="לוח שחמט באווירה עסקית"
                  width={1536}
                  height={1024}
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="w-full rounded-[30px] bg-[rgba(255,255,255,0.7)] shadow-[0_24px_50px_rgba(22,52,92,0.12)] ring-1 ring-[rgba(22,52,92,0.07)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
