import {
  architectureCards,
  checklist,
  featureCards,
  heroMetrics,
  launchSteps,
} from "@/content/landing";
import { SectionHeading } from "@/components/landing/section-heading";

export function LandingPage() {
  return (
    <main className="page-shell relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-56 max-w-4xl rounded-full bg-[radial-gradient(circle,rgba(200,164,93,0.14),transparent_72%)] blur-3xl" />
      <header className="px-6 pt-6 md:px-10">
        <div className="surface-card surface-card-strong mx-auto max-w-6xl rounded-[34px] px-5 py-5 md:px-8 md:py-6">
          <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
            <nav className="hidden items-center justify-start gap-8 text-sm text-foreground/70 md:flex">
            <a href="#features">יכולות</a>
            <a href="#architecture">מבנה</a>
            <a href="#launch">עלייה לאוויר</a>
            </nav>

            <a
              href="#"
              dir="ltr"
              aria-label="Checkmate"
              className="brand-lockup justify-self-center"
            >
              <span className="brand-mark brand-lockup__wordmark">
                <span className="brand-mark__main">Check</span>
                <span className="brand-mark__accent">mate</span>
              </span>
              <span className="brand-lockup__line" />
              <span className="brand-lockup__tagline">מנוע הצמיחה של העסק</span>
            </a>

            <div className="flex justify-center md:justify-end">
              <a
                href="#cta"
                className="rounded-full bg-[var(--accent-deep)] px-5 py-2.5 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#10284a]"
              >
                לצעד הבא
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-14 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pb-16 md:pt-24">
        <div className="space-y-8">
          <div className="surface-card inline-flex rounded-full px-4 py-2 text-xs font-semibold">
            <span className="eyebrow">Landing Page System</span>
          </div>
          <div className="space-y-6">
            <h1 className="font-display max-w-3xl text-5xl leading-[0.95] font-semibold text-foreground md:text-7xl">
              עמוד נחיתה חדש ב־Next.js שמוכן לעלות לאוויר ולא לעצור בגרסה
              הראשונה.
            </h1>
            <p className="muted-copy max-w-2xl text-lg leading-8 md:text-xl">
              הקמתי כאן בסיס נקי לעמוד נחיתה: תשתית מודרנית, חלוקה לרכיבים,
              עיצוב רספונסיבי והטמעת פונט Adobe ברמת המערכת. מכאן אפשר להחליף
              מסרים, לחבר טופס ולהעלות ישירות ל־Vercel.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#cta"
              className="rounded-full bg-[var(--foreground)] px-6 py-3 text-center text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-black"
            >
              לראות את ה־CTA הסופי
            </a>
            <a
              href="#architecture"
              className="surface-card rounded-full px-6 py-3 text-center text-sm font-semibold transition hover:translate-y-[-1px]"
            >
              לראות איפה עורכים כל דבר
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="surface-card rounded-[28px] p-5">
                <p className="font-display text-xl font-semibold text-foreground">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {metric.label}
                </p>
                <p className="muted-copy mt-2 text-sm leading-6">{metric.note}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="surface-card surface-card-strong relative rounded-[36px] p-6 md:p-8">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-l from-transparent via-black/15 to-transparent" />
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow text-xs font-semibold">מה כבר מוכן</p>
                <h2 className="font-display mt-3 text-3xl font-semibold text-foreground">
                  שלד שמותאם לעבודה אמיתית
                </h2>
              </div>
              <div className="rounded-full border border-black/10 bg-white/65 px-3 py-1 text-xs font-semibold">
                Ready
              </div>
            </div>

            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-3xl border border-black/8 bg-white/55 px-4 py-4"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                  <p className="text-sm leading-6 text-foreground">{item}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] bg-[var(--accent-deep)] p-5 text-white">
              <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                Adobe Typekit
              </p>
              <p className="font-display mt-3 text-2xl font-semibold">
                הפונט `avenir-next-world` מחובר גלובלית
              </p>
              <p className="mt-3 text-sm leading-6 text-white/80">
                אפשר להשתמש בו לכותרות, CTA או לכל הממשק דרך ה־layout וה־CSS
                variables שכבר הוגדרו.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-20">
        <SectionHeading
          eyebrow="Core Sections"
          title="המבנה כבר מחלק את העמוד לנקודות שמביאות בהירות, אמון ופעולה."
          description="במקום מסך אחד ארוך ולא מנוהל, כל חלק כאן נותן תפקיד ברור. זה הופך את ההמשך למהיר יותר: קופי, עיצוב, A/B tests וחיבורי מוצר."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featureCards.map((card) => (
            <article key={card.title} className="surface-card rounded-[32px] p-6">
              <p className="eyebrow text-xs font-semibold">{card.eyebrow}</p>
              <h3 className="font-display mt-4 text-2xl font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="muted-copy mt-4 text-base leading-7">
                {card.description}
              </p>
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
            title="הפרויקט בנוי כך שאפשר לערוך תוכן מהר בלי להסתבך עם הקבצים."
            description="הקבצים שמנהלים מראה, תוכן ו־sections מופרדים. זה הבסיס הנכון אם בהמשך תוסיף טפסים, CMS, Analytics או עמודים נוספים."
          />
          <div className="surface-card rounded-[32px] p-6">
            <p className="text-sm leading-7 text-foreground">
              הגישה כאן היא להחזיק את הקופי במקום אחד, את ה־layout במקום אחד,
              ואת ה־sections כרכיבים עצמאיים. ככה כל שינוי נשאר ממוקד במקום
              להפוך לבלגן בתוך `page.tsx`.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {architectureCards.map((card) => (
            <article
              key={card.path}
              className="surface-card surface-card-strong rounded-[32px] p-6"
            >
              <p className="text-sm font-semibold text-foreground/70">{card.path}</p>
              <h3 className="font-display mt-4 text-2xl font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="muted-copy mt-4 text-base leading-7">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="launch" className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-20">
        <SectionHeading
          eyebrow="Launch Path"
          title="שלושה צעדים ברורים מפה ועד עמוד נחיתה שמחובר ל־Vercel."
          description="אחרי שהשלד מוכן, השלב הבא הוא רק התאמה למסר שלך ולחיבורי ה־lead flow שאתה רוצה."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {launchSteps.map((item) => (
            <article key={item.step} className="surface-card rounded-[32px] p-6">
              <p className="font-display text-4xl font-semibold text-[var(--accent)]">
                {item.step}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="muted-copy mt-3 text-base leading-7">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="cta" className="px-6 pb-16 pt-10 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl rounded-[40px] bg-[linear-gradient(135deg,#1a3332_0%,#234640_52%,#37655b_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(17,26,31,0.24)] md:px-10 md:py-12">
          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                Ready For Vercel
              </p>
              <h2 className="font-display text-4xl leading-tight font-semibold md:text-5xl">
                מכאן אפשר לחבר repository, להעלות ל־Vercel ולהתחיל להחליף קופי
                אמיתי.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-white/78 md:text-lg">
                ברגע שיהיה remote זמין, הזרימה הטבעית היא push, חיבור לפרויקט
                ב־Vercel, והמשך איטרציה על התוכן מהבסיס שכבר נבנה כאן.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/8 p-6 backdrop-blur">
              <div className="space-y-4">
                <div className="rounded-3xl border border-white/12 bg-black/12 px-4 py-4">
                  <p className="text-sm font-semibold text-white">
                    מה מומלץ להוסיף עכשיו
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    URL ל־repository, טופס לידים או חיבור ל־WhatsApp, ושכבת
                    analytics בסיסית.
                  </p>
                </div>
                <a
                  href="#architecture"
                  className="block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[#15302f] transition hover:translate-y-[-1px]"
                >
                  לעדכן עכשיו את ה־CTA האמיתי
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
