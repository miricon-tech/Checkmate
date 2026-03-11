import { qualificationCards } from "@/content/landing";

type QualificationIconName = (typeof qualificationCards)[number]["icon"];

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

function BriefcaseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M8 7V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7" />
      <path d="M4.8 7h14.4A1.8 1.8 0 0 1 21 8.8v7.4A1.8 1.8 0 0 1 19.2 18H4.8A1.8 1.8 0 0 1 3 16.2V8.8A1.8 1.8 0 0 1 4.8 7Z" />
      <path d="M3 11.5h18" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M4 17.5 9 12.5l3.2 3.2L20 8" />
      <path d="M14.5 8H20v5.5" />
      <path d="M4 20h16" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M9 5.5h6" />
      <path d="M9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7h1.4A1.6 1.6 0 0 1 19 8.6v10.8A1.6 1.6 0 0 1 17.4 21H6.6A1.6 1.6 0 0 1 5 19.4V8.6A1.6 1.6 0 0 1 6.6 7H8V5.8A1.8 1.8 0 0 1 9.8 4Z" />
      <path d="m8.5 14 2.2 2.2L15.5 11.5" />
    </svg>
  );
}

function QualificationIcon({ name }: { name: QualificationIconName }) {
  if (name === "briefcase") {
    return <BriefcaseIcon />;
  }

  if (name === "trend") {
    return <TrendIcon />;
  }

  return <ClipboardIcon />;
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

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {qualificationCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[24px] border border-[rgba(22,52,92,0.08)] bg-white/90 px-4 py-4 shadow-[0_10px_26px_rgba(22,52,92,0.05)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(22,52,92,1)_0%,rgba(33,72,120,1)_100%)] text-white shadow-[0_8px_22px_rgba(22,52,92,0.16)]">
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
                    <ChevronRightTiny />
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
    <div className="relative overflow-hidden rounded-[34px] border border-[rgba(22,52,92,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(253,249,241,0.98)_100%)] p-6 shadow-[0_28px_80px_rgba(22,52,92,0.12)] md:p-7">
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
              className="rounded-[26px] border border-[rgba(22,52,92,0.08)] bg-white/86 p-5 shadow-[0_12px_30px_rgba(22,52,92,0.06)] backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(22,52,92,1)_0%,rgba(33,72,120,1)_100%)] text-white shadow-[0_10px_24px_rgba(22,52,92,0.18)]">
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
                    <ChevronRightTiny />
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
