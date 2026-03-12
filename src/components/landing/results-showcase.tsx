import {
  ArrowUpLeft,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { resultStories, resultsShowcase } from "@/content/landing";

const storyIcons = [Building2, ChartNoAxesCombined] as const;

function ResultVisual({
  bullets,
  index,
}: {
  bullets: readonly string[];
  index: number;
}) {
  const caseLabel = `מקרה ${String(index + 1).padStart(2, "0")}`;

  if (index === 0) {
    return (
      <div className="results-showcase-story__visual results-showcase-story__visual--route">
        <div className="results-showcase-story__visual-meta">
          <span className="results-showcase-story__visual-badge">{caseLabel}</span>
          <div className="results-showcase-story__visual-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="results-showcase-route">
          {bullets.map((bullet) => (
            <div key={bullet} className="results-showcase-route__chip">
              {bullet}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="results-showcase-story__visual results-showcase-story__visual--dashboard">
      <div className="results-showcase-story__visual-meta">
        <span className="results-showcase-story__visual-badge">{caseLabel}</span>
        <div className="results-showcase-story__visual-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="results-showcase-dashboard">
        {bullets.map((bullet, bulletIndex) => (
          <div key={bullet} className="results-showcase-dashboard__row">
            <span className="results-showcase-dashboard__index">
              0{bulletIndex + 1}
            </span>
            <span>{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResultsShowcase() {
  return (
    <section
      id="results"
      className="results-showcase-section px-6 py-14 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="results-showcase-grid" dir="rtl">
          <article className="results-showcase-intro premium-card">
            <div className="results-showcase-intro__surface" aria-hidden="true" />
            <div className="results-showcase-intro__content">
              <div className="results-showcase-intro__scan" aria-hidden="true">
                <span className="results-showcase-intro__scan-count">
                  {String(resultStories.length).padStart(2, "0")}
                </span>
                <div className="results-showcase-intro__scan-rails">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <Badge tone="gold">{resultsShowcase.eyebrow}</Badge>
              <h2 className="type-display-section results-showcase-intro__title text-foreground">
                {resultsShowcase.title}
              </h2>
              <div className="results-showcase-intro__chips">
                {resultsShowcase.chips.map((chip) => (
                  <span key={chip} className="results-showcase-intro__chip">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>

              <div className="results-showcase-intro__note">
                <span>שני מקרים מהשטח</span>
                <ArrowUpLeft className="h-4 w-4" strokeWidth={1.8} />
                <strong>פחות תלות. יותר שליטה בתוצאה.</strong>
              </div>
            </div>
          </article>

          {resultStories.map((story, index) => {
            const Icon = storyIcons[index] ?? Building2;
            const isMetricOutcome = story.outcome.kind === "metric";

            return (
              <article
                key={story.client}
                className={cn(
                  "results-showcase-story premium-card",
                  index === 1 && "results-showcase-story--dark"
                )}
              >
                <ResultVisual bullets={story.bullets} index={index} />

                <div className="results-showcase-story__content">
                  <div className="results-showcase-story__eyebrow">
                    <span className="results-showcase-story__icon">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <span>{story.client}</span>
                  </div>

                  <h3 className="type-display-feature results-showcase-story__title">
                    {story.title}
                  </h3>

                  {isMetricOutcome ? (
                    <div className="results-showcase-story__metric">
                      <span className="results-showcase-story__result-label">
                        תוצאה בפועל
                      </span>
                      <strong>{story.outcome.value}</strong>
                      <span>{story.outcome.caption}</span>
                    </div>
                  ) : (
                    <div className="results-showcase-story__outcome-block">
                      <span className="results-showcase-story__result-label">
                        תוצאה בפועל
                      </span>
                      <p className="results-showcase-story__outcome">
                        {story.outcome.value}
                      </p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
