import Image from "next/image";
import { LeadForm } from "@/components/landing/lead-form";
import { heroChecklist, heroMetrics } from "@/content/landing";

export function HeroSection() {
  return (
    <section id="hero" className="w-full">
      <div className="relative isolate overflow-hidden border-b border-[var(--border)] bg-[var(--accent-deep)]">
        <Image
          src="/home-page-hero/Chessboard.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(7,17,35,0.88)_12%,rgba(7,17,35,0.76)_40%,rgba(7,17,35,0.52)_68%,rgba(7,17,35,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,164,93,0.22),transparent_32%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(to_left,rgba(255,255,255,0.08),transparent)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
            <div className="space-y-8 text-white">
              <div className="inline-flex items-center rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm font-semibold tracking-[0.04em] text-white/90 backdrop-blur">
                לא עוד סוכנות. שותף צמיחה.
              </div>

              <div className="max-w-3xl space-y-5">
                <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-white md:text-7xl">
                  העסק כבר עובד.
                  <span className="mt-3 block text-[var(--accent-soft)]">
                    אז למה הצמיחה עדיין תקועה?
                  </span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
                  Checkmate היא לא עוד סוכנות שיווק. אנחנו נכנסים לעסקי B2B
                  ושירות בישראל כשותף צמיחה חיצוני, ומחברים שיווק, לידים,
                  מכירות ותהליך סגירה למערכת אחת שמביאה תוצאות מדידות.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {heroChecklist.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-start gap-3 rounded-[24px] border border-white/12 bg-white/10 px-4 py-4 text-right text-base font-medium text-white/92 backdrop-blur"
                  >
                    <span className="mt-1 text-[var(--accent-soft)]">●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 text-sm font-medium text-white/78">
                <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 backdrop-blur">
                  עסקים בישראל עם עסקה ממוצעת של 15,000 ש&quot;ח ומעלה
                </div>
                <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 backdrop-blur">
                  B2B / שירות / SME בשלב צמיחה
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.06)_100%)] p-5 backdrop-blur"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/52">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-lg leading-7 font-semibold text-white">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div id="hero-lead-form" className="lg:justify-self-end">
              <LeadForm
                className="w-full max-w-xl border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,250,241,0.96)_100%)] shadow-[0_30px_80px_rgba(7,17,35,0.28)]"
                description="שיחה קצרה כדי לבדוק אם יש כאן פוטנציאל צמיחה אמיתי."
                note="אם יש התאמה, נמשיך לפגישת אבחון ממוקדת סביב המערכת העסקית והשלב הבא בצמיחה."
                title="בדיקת התאמה לעסק"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
