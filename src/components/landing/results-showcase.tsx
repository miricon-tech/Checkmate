import {
  ArrowUpLeft,
  Building2,
  Dumbbell,
  ChartNoAxesCombined,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { resultStories, resultsShowcase } from "@/content/landing";

const storyIcons = [Building2, ChartNoAxesCombined, Dumbbell] as const;
const highlightedResultPattern = /\d/;

export function ResultsShowcase() {
  return (
    <section
      id="results"
      className="results-showcase-section px-6 py-14 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="results-showcase-shell">
          <header className="results-showcase-header premium-card" dir="rtl">
            <div className="results-showcase-header__top">
              <Badge tone="gold">{resultsShowcase.eyebrow}</Badge>
              <span className="results-showcase-header__count">
                {String(resultStories.length).padStart(2, "0")}
              </span>
            </div>
            <h2 className="type-display-section results-showcase-header__title text-foreground">
              {resultsShowcase.title}
            </h2>
            <div className="results-showcase-header__subtitle">
              {resultsShowcase.subtitle.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </header>

          <div className="results-showcase-grid" dir="rtl">
          {resultStories.map((story, index) => {
            const Icon = storyIcons[index] ?? Building2;
            const caseLabel = `Case ${String(index + 1).padStart(2, "0")}`;
            const quote = "quote" in story ? story.quote : null;

            return (
              <article
                key={story.client}
                className={cn(
                  "results-showcase-story premium-card",
                  "tone" in story &&
                    story.tone === "dark" &&
                    "results-showcase-story--dark"
                )}
              >
                <div className="results-showcase-story__surface" aria-hidden="true" />
                <div className="results-showcase-story__inner">
                  <div className="results-showcase-story__top">
                    <span className="results-showcase-story__case">{caseLabel}</span>
                  </div>

                  <div className="results-showcase-story__client-row">
                    <span className="results-showcase-story__icon">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <p className="results-showcase-story__client">
                      <span>{story.client}</span>
                      <span aria-hidden="true">|</span>
                      <span>{story.descriptor}</span>
                    </p>
                  </div>

                  <h3 className="type-display-feature results-showcase-story__title">
                    {story.title}
                  </h3>

                  <div className="results-showcase-story__sections">
                    <div className="results-showcase-story__section">
                      <p className="results-showcase-story__section-label">
                        האתגר
                      </p>
                      <p className="results-showcase-story__section-copy">
                        {story.challenge}
                      </p>
                    </div>

                    <div className="results-showcase-story__section">
                      <p className="results-showcase-story__section-label">
                        מה עשינו
                      </p>
                      <p className="results-showcase-story__section-copy">
                        {story.whatWeDid}
                      </p>
                    </div>

                    <div className="results-showcase-story__section results-showcase-story__section--results">
                      <p className="results-showcase-story__section-label">
                        התוצאה
                      </p>
                      <ul className="results-showcase-story__results">
                        {story.results.map((result) => (
                          <li
                            key={result}
                            className={cn(
                              "results-showcase-story__result-item",
                              highlightedResultPattern.test(result) &&
                                "results-showcase-story__result-item--highlight"
                            )}
                          >
                            <span className="results-showcase-story__result-bullet">
                              <CheckCircle2 className="h-4 w-4" strokeWidth={1.9} />
                            </span>
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {quote ? (
                    <blockquote className="results-showcase-story__quote">
                      <span
                        className="results-showcase-story__quote-mark"
                        aria-hidden="true"
                      >
                        “
                      </span>
                      <p>{quote}</p>
                    </blockquote>
                  ) : null}

                  <div className="results-showcase-story__footer">
                    <a
                      href={story.site.url}
                      target="_blank"
                      rel="noreferrer"
                      className="motion-link results-showcase-story__link"
                    >
                      <span>{story.site.label}</span>
                      <ArrowUpLeft className="h-4 w-4" strokeWidth={1.8} />
                    </a>
                    <span className="results-showcase-story__domain">
                      {story.site.domain}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
          </div>

          <div className="results-showcase-summary premium-card" dir="rtl">
            <div className="results-showcase-summary__copy">
              <p className="results-showcase-summary__title">
                {resultsShowcase.summaryTitle}
              </p>
              <div className="results-showcase-summary__lines">
                {resultsShowcase.summaryLines.map((line) => (
                  <p key={line} className="results-showcase-summary__line">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <Button
              href="#cta"
              variant="primary"
              size="lg"
              className="results-showcase-summary__cta"
            >
              {resultsShowcase.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
