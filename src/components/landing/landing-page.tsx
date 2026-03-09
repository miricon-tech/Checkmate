import {
  architectureCards,
  featureCards,
  launchSteps,
} from "@/content/landing";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { SectionHeading } from "@/components/landing/section-heading";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export function LandingPage() {
  return (
    <main className="page-shell relative overflow-hidden pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-6 -z-10 mx-auto h-64 max-w-5xl rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.16),transparent_74%)] blur-3xl" />
      <LandingHeader />
      <HeroSection />

      <section id="features" className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-20">
        <SectionHeading
          eyebrow="Brand-Led Components"
          title="העמוד נשען על מערכת רכיבים שחיה סביב צבעי הלוגו והשפה היוקרתית של המותג."
          description="במקום לשכפל קלאסים בכל בלוק, בנינו רכיבים בסיסיים שחוזרים על עצמם. זה שומר על consistency, מקל על שינויים, ומשאיר את החוויה חדה ונקייה."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featureCards.map((card) => (
            <article key={card.title}>
              <Panel className="h-full p-6">
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
        id="architecture"
        className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-20"
      >
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <SectionHeading
            eyebrow="Architecture"
            title="הפרויקט בנוי כך שהשפה העיצובית יושבת במקום אחד, והרכיבים ממשיכים אותה באופן עקבי."
            description="הטוקנים נמצאים ב־globals, רכיבי ה־ui מיישמים אותם, ורכיבי ה־landing משתמשים בהם כדי להרכיב את החוויה. זו הדרך הנכונה להגדיל את האתר בלי לאבד איכות."
          />
          <Panel tone="soft" className="p-6">
            <p className="text-sm leading-7 text-foreground">
              הגישה כאן היא להחזיק את הקופי במקום אחד, את ה־layout במקום אחד,
              ואת ה־sections כרכיבים עצמאיים. ככה כל שינוי נשאר ממוקד במקום
              להפוך לבלגן בתוך `page.tsx`.
            </p>
          </Panel>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {architectureCards.map((card) => (
            <article key={card.path}>
              <Panel tone="strong" className="h-full p-6">
                <p className="text-sm font-semibold text-foreground/70">{card.path}</p>
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

      <section id="launch" className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-20">
        <SectionHeading
          eyebrow="Launch Path"
          title="אחרי שהשפה ברורה, כל מה שנשאר הוא לחבר מסר, אינטגרציות והשקה."
          description="המבנה החדש מכין את העמוד לשלב הבא: הכנסת תוכן מדויק, חיבור לטפסים ול־analytics, ועלייה חלקה ל־Vercel."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {launchSteps.map((item) => (
            <article key={item.step}>
              <Panel className="h-full p-6">
                <p className="font-display text-4xl font-semibold text-[var(--accent)]">
                  {item.step}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="muted-copy mt-3 text-base leading-7">
                  {item.description}
                </p>
              </Panel>
            </article>
          ))}
        </div>
      </section>

      <section id="cta" className="px-6 pb-16 pt-10 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl rounded-[40px] bg-[linear-gradient(135deg,#0f2748_0%,#16345c_58%,#294e7f_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(22,52,92,0.24)] md:px-10 md:py-12">
          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                Next Move
              </p>
              <h2 className="font-display text-4xl leading-tight font-semibold md:text-5xl">
                מכאן אפשר לדייק את המסר, לחבר את ההמרות ולהוציא עמוד שנראה כמו
                מותג פרימיום אמיתי.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-white/78 md:text-lg">
                הרקע, הטוקנים והרכיבים כבר עובדים יחד. השלב הבא הוא למלא את
                התוכן הנכון, לחדד את ההצעה ולהפוך את כל השכבות האלה לעמוד
                שממיר.
              </p>
            </div>

            <Panel tone="dark" className="p-6">
              <div className="space-y-4">
                <div className="rounded-3xl border border-white/12 bg-white/8 px-4 py-4">
                  <p className="text-sm font-semibold text-white">
                    מה כדאי לחבר עכשיו
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    קופי מותאם לעסק, טופס או WhatsApp, ו־analytics בסיסי כדי
                    שכל CTA יימדד.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button href="#hero" variant="gold" className="flex-1 justify-center">
                    חוזרים להירו
                  </Button>
                  <Button href="#architecture" variant="secondary" className="flex-1 justify-center">
                    עוברים לרכיבים
                  </Button>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </section>
    </main>
  );
}
