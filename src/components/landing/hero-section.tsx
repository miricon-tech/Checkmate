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

      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:px-8 lg:py-40">
        <div className="lg:flex lg:items-start lg:gap-x-10 xl:gap-x-24">
          <div
            dir="rtl"
            className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:max-w-[35rem] lg:pt-8"
          >
            <div className="mt-10 sm:mt-14 lg:mt-8">
              <div className="inline-flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[rgba(200,164,93,0.28)] bg-[rgba(240,209,138,0.15)] px-3 py-1 type-body-sm font-semibold text-[var(--accent-deep)]">
                  לא עוד שיווק. מערכת צמיחה מלאה.
                </span>
                <span className="type-link inline-flex items-center gap-1.5 text-[color:rgba(93,108,119,0.96)]">
                  <span>שותף צמיחה לעסקי B2B ושירות בישראל</span>
                  <ChevronRightTiny />
                </span>
              </div>
            </div>

            <h1 className="type-display-hero mt-9 max-w-[11ch] text-[var(--accent-deep)] lg:max-w-[10.5ch]">
              העסק כבר עובד.
              <span className="mt-3 block text-[var(--accent)]">
                אז למה הצמיחה עדיין תקועה?
              </span>
            </h1>

            <p className="type-body-xl mt-7 max-w-[32rem] text-[var(--muted)]">
              Checkmate היא לא עוד סוכנות שיווק. אנחנו נכנסים לעסקי B2B ושירות
              בישראל כשותף צמיחה חיצוני, ומחברים שיווק, לידים, מכירות ותהליך
              סגירה למערכת אחת שמביאה תוצאות מדידות.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href="#cta" variant="gold" size="lg">
                בדיקת התאמה (15 דק׳)
              </Button>
              <a
                href="#qualification"
                className="type-link inline-flex items-center gap-2 text-[var(--accent-deep)] transition hover:text-[var(--accent)]"
              >
                <span>למי זה מתאים</span>
                <ChevronRightTiny />
              </a>
            </div>
          </div>

          <div className="mx-auto mt-16 flex w-full max-w-2xl sm:mt-24 lg:mx-0 lg:mt-0 lg:w-[42rem] lg:max-w-none lg:flex-none xl:w-[47rem]">
            <div className="w-full flex-none">
              <div className="relative overflow-hidden rounded-[36px] bg-[rgba(255,255,255,0.95)] p-2 shadow-[0_34px_96px_rgba(22,52,92,0.14)] ring-1 ring-[rgba(22,52,92,0.08)]">
                <div className="relative h-[22rem] overflow-hidden rounded-[32px] bg-[rgba(255,255,255,0.7)] shadow-[0_24px_50px_rgba(22,52,92,0.12)] ring-1 ring-[rgba(22,52,92,0.06)] sm:h-[26rem] lg:h-[38rem] xl:h-[42rem]">
                  <Image
                    src="/home-page-hero/Chessboard.png"
                    alt="לוח שחמט באווירה עסקית"
                    fill
                    priority
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 82vw, 48vw"
                    className="object-cover object-[52%_center] scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,18,34,0.26)_0%,rgba(8,18,34,0.08)_32%,rgba(255,255,255,0)_58%,rgba(200,164,93,0.22)_100%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0)_100%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,rgba(8,18,34,0)_0%,rgba(8,18,34,0.2)_100%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-4 rounded-[26px] border border-[rgba(255,255,255,0.18)] shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
