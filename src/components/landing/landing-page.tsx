import { Building2, TrendingUp, Workflow } from "lucide-react";
import {
  ctaChecklist,
  differenceCards,
  fitCards,
  processCards,
} from "@/content/landing";
import { AccessibilityControls } from "@/components/landing/accessibility-controls";
import { FloatingWhatsApp } from "@/components/landing/floating-whatsapp";
import { HeroQualification } from "@/components/landing/hero-qualification";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { LeadForm } from "@/components/landing/lead-form";
import { SectionHeading } from "@/components/landing/section-heading";
import { Panel } from "@/components/ui/panel";

const ctaDetailIcons = [Building2, Workflow, TrendingUp] as const;

export function LandingPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <main id="main-content" className="page-shell relative overflow-hidden pb-16">
        <div className="pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto h-64 max-w-5xl rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.16),transparent_74%)] blur-3xl" />
        <LandingHeader />
        <HeroSection />

        <section id="qualification" className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <HeroQualification />
          </div>
        </section>

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
                  <p className="eyebrow type-kicker">{card.eyebrow}</p>
                  <h3 className="type-display-feature mt-4 text-foreground">
                    {card.title}
                  </h3>
                  <p className="type-body muted-copy mt-4">
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
              <p className="type-body-lg text-foreground">
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
                  <h3 className="type-display-feature text-foreground">
                    {card.title}
                  </h3>
                  <p className="type-body muted-copy mt-4">
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
                  <h3 className="type-display-feature text-foreground">
                    {card.title}
                  </h3>
                  <p className="type-body muted-copy mt-4">
                    {card.description}
                  </p>
                </Panel>
              </article>
            ))}
          </div>
        </section>

        <section id="cta" className="px-6 pb-16 pt-6 md:px-10 md:pb-24">
          <div className="contact-split mx-auto max-w-7xl">
            <div className="contact-split__grid" dir="ltr">
              <div className="contact-split__aside" dir="rtl">
                <div className="contact-split__surface" aria-hidden="true">
                  <div className="contact-split__pattern" />
                  <div className="contact-split__glow" />
                </div>

                <div className="contact-split__content">
                  <p className="type-kicker text-[var(--accent)]">
                    בדיקת התאמה
                  </p>
                  <h2 className="type-display-section text-[var(--accent-deep)]">
                    השיחה הראשונה לא נועדה למכור בלחץ. היא נועדה לבדוק אם יש כאן
                    פוטנציאל צמיחה אמיתי.
                  </h2>
                  <p className="type-body-lg mt-6 max-w-[32rem] text-[var(--muted)]">
                    בבדיקת ההתאמה נבחן איפה העסק תקוע, מה כרגע נשען יותר מדי על
                    הבעלים, האם יש בסיס נכון להגדלת מחזור, והאם מודל העבודה של
                    Checkmate מתאים לשלב הבא.
                  </p>

                  <dl className="contact-detail-list">
                    {ctaChecklist.map((item, index) => {
                      const Icon = ctaDetailIcons[index] ?? Building2;

                      return (
                        <div key={item} className="contact-detail">
                          <dt className="contact-detail__icon">
                            <span className="sr-only">{item}</span>
                            <Icon className="h-5 w-5" strokeWidth={1.75} />
                          </dt>
                          <dd className="type-body text-[var(--accent-deep)]">
                            {item}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>

              <div className="contact-split__form-wrap" dir="rtl">
                <LeadForm
                  className="contact-form-panel"
                  submitLabel="לקביעת בדיקת התאמה"
                />
              </div>
            </div>
          </div>
        </section>

        <FloatingWhatsApp />
        <AccessibilityControls />
      </main>
    </>
  );
}
