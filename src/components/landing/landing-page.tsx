import { Building2, TrendingUp, Workflow } from "lucide-react";
import { ctaChecklist } from "@/content/landing";
import { FloatingWhatsApp } from "@/components/landing/floating-whatsapp";
import { HeroQualification } from "@/components/landing/hero-qualification";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingFaq } from "@/components/landing/landing-faq";
import { LandingHeader } from "@/components/landing/landing-header";
import { LazyAccessibilityControls } from "@/components/landing/lazy-accessibility-controls";
import { LeadForm } from "@/components/landing/lead-form";
import { LinkedInProfileCard } from "@/components/landing/linkedin-profile-card";
import { ProcessBento } from "@/components/landing/process-bento";
import { ResultsShowcase } from "@/components/landing/results-showcase";

const ctaDetailIcons = [Building2, Workflow, TrendingUp] as const;
const currentYear = new Date().getFullYear();

export function LandingPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <main id="main-content" className="page-shell relative overflow-x-clip pb-16">
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
        <ResultsShowcase />

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

                  <div className="contact-split__profile">
                    <LinkedInProfileCard />
                  </div>
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

        <LandingFaq />

        <footer className="site-footer px-6 pb-8 pt-2 lg:px-10 lg:pb-10">
          <div className="mx-auto max-w-7xl">
            <p className="site-footer__copy">
              © {currentYear} Checkmate. כל הזכויות שמורות.
            </p>
          </div>
        </footer>

        <FloatingWhatsApp />
        <LazyAccessibilityControls />
      </main>
    </>
  );
}
