import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden border-b border-[var(--border)] bg-[var(--background)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px"
        style={{ backgroundImage: "var(--trim-gradient)" }}
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-24 -z-10 hidden h-36 w-px lg:block"
        style={{ backgroundImage: "var(--trim-gradient-vertical-gold)" }}
      />
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-14 -z-10 hidden h-32 w-px lg:block"
        style={{ backgroundImage: "var(--trim-gradient-vertical-navy)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 hidden w-[42%] lg:block"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(22, 52, 92, 0.04) 0%, rgba(22, 52, 92, 0) 62%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-3 pb-20 sm:pt-4 sm:pb-24 lg:px-8 lg:pt-6 lg:pb-24">
        <div className="lg:flex lg:items-start lg:gap-x-10 xl:gap-x-24">
          <div
            dir="rtl"
            className="motion-fade-up motion-fade-up--delay-1 mx-auto max-w-2xl shrink-0 lg:mx-0 lg:max-w-[32rem] xl:max-w-[33rem]"
          >
            <div className="mt-4 sm:mt-6 lg:mt-0">
              <div className="inline-flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[var(--line-gold)] bg-[rgba(200,164,93,0.09)] px-3 py-1 type-body-sm font-semibold text-[var(--accent-deep)]">
                  לא עוד שיווק. מערכת צמיחה מלאה.
                </span>
                <span className="type-link inline-flex items-center gap-1.5 text-[color:rgba(93,108,119,0.96)]">
                  <span>שותף צמיחה לעסקי B2B ושירות בישראל</span>
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
                </span>
              </div>
            </div>

            <h1 className="type-display-hero mt-7 max-w-[13.4ch] text-[var(--accent-deep)] lg:mt-8 lg:max-w-[12.2ch]">
              העסק כבר עובד.
              <span className="mt-3 block text-[var(--accent)]">
                אז למה הצמיחה עדיין תקועה?
              </span>
            </h1>

            <p className="type-body-xl mt-6 max-w-[28.5rem] text-[var(--muted)] lg:mt-7">
              Checkmate היא לא עוד סוכנות שיווק. אנחנו נכנסים לעסקי B2B ושירות
              בישראל כשותף צמיחה חיצוני, ומחברים שיווק, לידים, מכירות ותהליך
              סגירה למערכת אחת שמביאה תוצאות מדידות.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-9">
              <Button href="#cta" variant="gold" size="lg">
                בדיקת התאמה (15 דק׳)
              </Button>
              <a
                href="#qualification"
                className="motion-link type-link inline-flex items-center gap-2 text-[var(--accent-deep)] transition hover:text-[var(--accent)]"
              >
                <span>למי זה מתאים</span>
                <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
              </a>
            </div>
          </div>

          <div className="motion-fade-up motion-fade-up--delay-2 mx-auto mt-10 flex w-full max-w-2xl sm:mt-12 lg:-ml-12 lg:mx-0 lg:mt-0 lg:w-[45rem] lg:max-w-none lg:flex-none xl:-ml-20 xl:w-[51rem]">
            <div className="w-full flex-none">
              <div className="hero-figure">
                <div className="hero-figure__frame">
                  <div className="hero-figure__media h-[22rem] sm:h-[26rem] lg:h-[38rem] xl:h-[42rem]">
                    <Image
                      src="/home-page-hero/Chessboard.png"
                      alt="לוח שחמט באווירה עסקית"
                      fill
                      priority
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 82vw, 48vw"
                      className="hero-figure__image object-cover object-[60%_center] scale-[1.1] brightness-[0.965] contrast-[0.965] saturate-[0.76]"
                    />
                    <div aria-hidden="true" className="hero-figure__edge" />
                    <div aria-hidden="true" className="hero-figure__base" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
