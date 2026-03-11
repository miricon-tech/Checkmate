import {
  ctaChecklist,
  differenceCards,
  fitCards,
  processCards,
} from "@/content/landing";
import { FloatingWhatsApp } from "@/components/landing/floating-whatsapp";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { LeadForm } from "@/components/landing/lead-form";
import { SectionHeading } from "@/components/landing/section-heading";
import { Panel } from "@/components/ui/panel";

export function LandingPage() {
  return (
    <main className="page-shell relative overflow-hidden pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto h-64 max-w-5xl rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.16),transparent_74%)] blur-3xl" />
      <LandingHeader />
      <HeroSection />

      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-24"
      >
        <SectionHeading
          eyebrow="איך זה עובד"
          title="מחברים את כל מה שהעסק מחזיק היום בנפרד למערכת צמיחה אחת."
          description="במקום לנהל שיווק, מכירות, follow-up ו־CRM כגופים נפרדים, Checkmate מיישרת את כולם סביב יעד אחד: יותר פגישות שמתקיימות, יותר שליטה ויותר הכנסה."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {processCards.map((card) => (
            <article key={card.title}>
              <Panel className="h-full p-6 md:p-7">
                <p className="eyebrow text-xs font-semibold">{card.eyebrow}</p>
                <h3 className="font-display mt-4 text-2xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="muted-copy mt-4 text-base leading-7">
                  {card.description}
                </p>
              </Panel>
            </article>
          ))}
        </div>
      </section>

      <section
        id="fit"
        className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-24"
      >
        <div className="grid gap-8 md:grid-cols-[0.94fr_1.06fr] md:items-end">
          <SectionHeading
            eyebrow="למי זה מתאים"
            title="לעסקים בישראל שכבר הוכיחו שיש שוק, אבל מרגישים שהתקרה קרובה מדי."
            description="זה לא מסלול לעסק בתחילת הדרך. זה מתאים לעסקים שכבר מוכרים, יודעים שהשירות שלהם חזק, אבל נתקעים כי השיווק, המכירות והניהול לא מחוברים למערכת אחת שעובדת."
          />
          <Panel tone="soft" className="p-6 md:p-7">
            <p className="text-base leading-8 text-foreground">
              אם רוב הלידים, הפגישות והסגירות עדיין נשענים יותר מדי על בעל
              העסק, או שהשיווק מביא חשיפה בלי ודאות עסקית אמיתית, זה בדרך כלל
              הסימן שהצמיחה נעצרת בגלל המערכת, לא בגלל המוצר.
            </p>
          </Panel>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {fitCards.map((card) => (
            <article key={card.title}>
              <Panel tone="strong" className="h-full p-6 md:p-7">
                <h3 className="font-display text-2xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="muted-copy mt-4 text-base leading-7">
                  {card.description}
                </p>
              </Panel>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-24">
        <SectionHeading
          eyebrow="למה Checkmate"
          title="ההבדל הוא לא רק בביצוע. הוא במודל העבודה."
          description="רוב הספקים עובדים על ריטיינר חודשי או פרויקט. Checkmate בנויה כשותף צמיחה ארוך טווח, עם פוקוס ברור על revenue, ROI ושיפור רציף של התהליך העסקי כולו."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {differenceCards.map((card) => (
            <article key={card.title}>
              <Panel className="h-full p-6 md:p-7">
                <h3 className="font-display text-2xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="muted-copy mt-4 text-base leading-7">
                  {card.description}
                </p>
              </Panel>
            </article>
          ))}
        </div>
      </section>

      <section id="cta" className="px-6 pb-16 pt-6 md:px-10 md:pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-[rgba(22,52,92,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(252,248,239,0.96)_100%)] px-6 py-8 text-[var(--accent-deep)] shadow-[0_28px_90px_rgba(22,52,92,0.08)] md:px-10 md:py-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(200,164,93,0.18),transparent_72%)]" />
          <div className="pointer-events-none absolute -left-12 top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(22,52,92,0.08),transparent_72%)] blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.16),transparent_74%)] blur-3xl" />

          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="relative space-y-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                בדיקת התאמה
              </p>
              <h2 className="font-display text-4xl leading-tight font-semibold text-[var(--accent-deep)] md:text-5xl">
                השיחה הראשונה לא נועדה למכור בלחץ. היא נועדה לבדוק אם יש כאן
                פוטנציאל צמיחה אמיתי.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
                בבדיקת ההתאמה נבחן איפה העסק תקוע, מה כרגע נשען יותר מדי על
                הבעלים, האם יש בסיס נכון להגדלת מחזור, והאם מודל העבודה של
                Checkmate מתאים לשלב הבא.
              </p>

              <div className="grid gap-3">
                {ctaChecklist.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-start gap-3 rounded-[24px] border border-[rgba(22,52,92,0.08)] bg-white/72 px-4 py-4 text-right text-base font-medium text-[var(--accent-deep)]"
                  >
                    <span className="mt-1 text-[var(--accent)]">●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <LeadForm submitLabel="לקביעת בדיקת התאמה" />
          </div>
        </div>
      </section>

      <FloatingWhatsApp />
    </main>
  );
}
