import {
  BriefcaseBusiness,
  ChevronLeft,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";
import { qualificationCards } from "@/content/landing";

type QualificationIconName = (typeof qualificationCards)[number]["icon"];

function QualificationIcon({ name }: { name: QualificationIconName }) {
  if (name === "briefcase") {
    return <BriefcaseBusiness className="h-5 w-5" strokeWidth={1.7} />;
  }

  if (name === "trend") {
    return <TrendingUp className="h-5 w-5" strokeWidth={1.7} />;
  }

  return <ClipboardCheck className="h-5 w-5" strokeWidth={1.7} />;
}

type HeroQualificationProps = {
  compact?: boolean;
};

export function HeroQualification({
  compact = false,
}: HeroQualificationProps = {}) {
  if (compact) {
    return (
      <div className="mt-8 space-y-4">
        <div className="space-y-2">
          <p className="type-kicker text-[var(--accent)]">
            Qualification
          </p>
          <p className="type-body-sm text-[var(--muted)]">
            בחרו את מה שהכי קרוב למצב שלכם, ונראה אם יש כאן פוטנציאל אמיתי
            לצמיחה.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {qualificationCards.map((card) => (
            <article
              key={card.title}
              className="premium-card px-4 py-4"
            >
              <div className="flex items-start gap-3">
                <div className="premium-icon-shell premium-icon-shell--md">
                  <QualificationIcon name={card.icon} />
                </div>
                <div className="min-w-0 space-y-2">
                  <h3 className="type-display-feature text-[var(--accent-deep)]">
                    {card.title}
                  </h3>
                  <p className="type-body-sm text-[var(--muted)]">
                    {card.description}
                  </p>
                  <a
                    href={card.href}
                    className="type-link inline-flex items-center gap-1 text-[var(--accent-deep)] transition hover:text-[var(--accent)]"
                  >
                    <span>{card.cta}</span>
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[34px] border border-[rgba(22,52,92,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(253,249,241,0.98)_100%)] p-6 shadow-[0_28px_80px_rgba(22,52,92,0.12)] lg:p-7">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.9)_8%,rgba(255,255,255,0.72)_62%,rgba(240,209,138,0.18)_100%)]" />

      <div className="relative space-y-6">
        <div className="space-y-2">
          <p className="type-kicker text-[var(--accent)]">
            Qualification
          </p>
          <h2 className="type-display-section text-[var(--accent-deep)]">
            איפה העסק שלך תקוע היום?
          </h2>
          <p className="type-body-lg text-[var(--muted)]">
            בחרו את מה שהכי קרוב למצב שלכם, ונראה אם יש כאן פוטנציאל אמיתי
            לצמיחה.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {qualificationCards.map((card) => (
            <article
              key={card.title}
              className="premium-card p-5 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="premium-icon-shell premium-icon-shell--lg">
                  <QualificationIcon name={card.icon} />
                </div>
                <div className="min-w-0 space-y-3">
                  <h3 className="type-display-feature text-[var(--accent-deep)]">
                    {card.title}
                  </h3>
                  <p className="type-body-sm text-[var(--muted)]">
                    {card.description}
                  </p>
                  <a
                    href={card.href}
                    className="type-link inline-flex items-center gap-1 text-[var(--accent-deep)] transition hover:text-[var(--accent)]"
                  >
                    <span>{card.cta}</span>
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
