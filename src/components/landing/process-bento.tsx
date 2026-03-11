import {
  ArrowLeft,
  ChartColumnIncreasing,
  ClipboardCheck,
  Workflow,
} from "lucide-react";
import { processCards } from "@/content/landing";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

const cardIcons = [ClipboardCheck, Workflow, ChartColumnIncreasing] as const;

const diagnosisLabels = [
  "מקורות לידים",
  "איכות פניות",
  "יחס סגירה",
] as const;

const systemSteps = [
  "שיווק",
  "לידים",
  "שיחות",
  "CRM",
] as const;

const metricRows = [
  { label: "פגישות שמתקיימות", value: "72%" },
  { label: "שליטה ב־Pipeline", value: "93%" },
  { label: "ROI", value: "+38%" },
] as const;

function ProcessVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="process-bento-visual process-bento-visual--primary">
        <div className="process-window">
          <div className="process-window__top">
            <span className="process-window__dot" />
            <span className="process-window__dot" />
            <span className="process-window__dot" />
          </div>

          <div className="process-audit-list">
            {diagnosisLabels.map((label, itemIndex) => (
              <div key={label} className="process-audit-item">
                <span className="process-audit-item__index">
                  0{itemIndex + 1}
                </span>
                <span className="process-audit-item__label">{label}</span>
              </div>
            ))}
          </div>

          <div className="process-window__footer">
            <span>נקודת החסימה</span>
            <strong>בין הליד לסגירה</strong>
          </div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="process-bento-visual process-bento-visual--flow">
        <div className="process-flow">
          {systemSteps.map((step, stepIndex) => (
            <div key={step} className="process-flow__step">
              <span className="process-flow__pill">{step}</span>
              {stepIndex < systemSteps.length - 1 ? (
                <ArrowLeft className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.8} />
              ) : null}
            </div>
          ))}
        </div>
        <div className="process-flow__note">בעלים ברורים לכל שלב בתהליך</div>
      </div>
    );
  }

  return (
    <div className="process-bento-visual process-bento-visual--metrics">
      <div className="process-metrics">
        {metricRows.map((row, rowIndex) => (
          <div key={row.label} className="process-metric">
            <div className="process-metric__copy">
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </div>
            <div
              className={cn(
                "process-metric__bar",
                rowIndex === 0 && "process-metric__bar--lg",
                rowIndex === 1 && "process-metric__bar--md",
                rowIndex === 2 && "process-metric__bar--sm"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProcessBento() {
  return (
    <section id="how-it-works" className="process-bento-section px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="gold">איך זה עובד</Badge>
          <h2 className="type-display-section mx-auto mt-5 max-w-[16ch] text-foreground">
            מחברים את כל מה שהעסק מחזיק היום בנפרד למערכת צמיחה אחת.
          </h2>
          <p className="type-body-xl muted-copy mx-auto mt-5 max-w-2xl">
            במקום לנהל שיווק, מכירות, follow-up ו־CRM כגופים נפרדים, Checkmate
            מיישרת את כולם סביב יעד אחד: יותר פגישות שמתקיימות, יותר שליטה ויותר
            הכנסה.
          </p>
        </div>

        <div className="process-bento-grid mt-10 sm:mt-14">
          {processCards.map((card, index) => {
            const Icon = cardIcons[index] ?? ClipboardCheck;

            return (
              <article
                key={card.title}
                className={cn(
                  "process-bento-card",
                  index === 0 && "process-bento-card--primary",
                  index === 1 && "process-bento-card--secondary",
                  index === 2 && "process-bento-card--tertiary"
                )}
              >
                <div className="process-bento-card__surface" />

                <div className="process-bento-card__inner">
                  <div className="process-bento-card__copy">
                    <div className="process-bento-card__eyebrow">
                      <span className="process-bento-card__icon">
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                      <span>{card.eyebrow}</span>
                    </div>

                    <h3 className="type-display-feature process-bento-card__title">
                      {card.title}
                    </h3>
                    <p className="type-body process-bento-card__description">
                      {card.description}
                    </p>
                  </div>

                  <ProcessVisual index={index} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
