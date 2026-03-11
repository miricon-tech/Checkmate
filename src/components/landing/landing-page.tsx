import { Building2, TrendingUp, Workflow } from "lucide-react";
import {
  ctaChecklist,
  differenceCards,
  fitCards,
} from "@/content/landing";
import { AccessibilityControls } from "@/components/landing/accessibility-controls";
import { FloatingWhatsApp } from "@/components/landing/floating-whatsapp";
import { HeroQualification } from "@/components/landing/hero-qualification";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { LeadForm } from "@/components/landing/lead-form";
import { ProcessBento } from "@/components/landing/process-bento";
import { SectionHeading } from "@/components/landing/section-heading";
import { Panel } from "@/components/ui/panel";

const ctaDetailIcons = [Building2, Workflow, TrendingUp] as const;
const currentYear = new Date().getFullYear();

export function LandingPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <main id="main-content" className="page-shell relative overflow-hidden pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto h-px max-w-5xl"
          style={{ backgroundImage: "var(--trim-gradient)" }}
        />
        <LandingHeader />
        <HeroSection />

        <section id="qualification" className="px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <HeroQualification />
          </div>
        </section>

        <ProcessBento />

        <section
          id="fit"
          className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-24"
        >
          <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
            <SectionHeading
              eyebrow="למי זה מתאים"
              title="לעסקים בישראל שכבר הוכיחו שיש שוק, אבל מרגישים שהתקרה קרובה מדי."
              description="זה לא מסלול לעסק בתחילת הדרך. זה מתאים לעסקים שכבר מוכרים, יודעים שהשירות שלהם חזק, אבל נתקעים כי השיווק, המכירות והניהול לא מחוברים למערכת אחת שעובדת."
            />
            <Panel tone="soft" className="p-6 lg:p-7">
              <p className="type-body-lg text-foreground">
                אם רוב הלידים, הפגישות והסגירות עדיין נשענים יותר מדי על בעל
                העסק, או שהשיווק מביא חשיפה בלי ודאות עסקית אמיתית, זה בדרך כלל
                הסימן שהצמיחה נעצרת בגלל המערכת, לא בגלל המוצר.
              </p>
            </Panel>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {fitCards.map((card) => (
              <article key={card.title}>
                <Panel tone="strong" className="h-full p-6 lg:p-7">
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

        <section className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="למה Checkmate"
            title="ההבדל הוא לא רק בביצוע. הוא במודל העבודה."
            description="רוב הספקים עובדים על ריטיינר חודשי או פרויקט. Checkmate בנויה כשותף צמיחה ארוך טווח, עם פוקוס ברור על revenue, ROI ושיפור רציף של התהליך העסקי כולו."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {differenceCards.map((card) => (
              <article key={card.title}>
                <Panel className="h-full p-6 lg:p-7">
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

        <section id="cta" className="px-6 pb-16 pt-6 lg:px-10 lg:pb-24">
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
                  tone="default"
                />
              </div>
            </div>
          </div>
        </section>

        <footer className="site-footer px-6 pb-8 pt-2 lg:px-10 lg:pb-10">
          <div className="mx-auto max-w-7xl">
            <p className="site-footer__copy">
              © {currentYear} Checkmate. כל הזכויות שמורות.
            </p>
          </div>
        </footer>

        <FloatingWhatsApp />
        <AccessibilityControls />
      </main>
    </>
  );
}
