import { Plus } from "lucide-react";
import { faqItems, faqSection } from "@/content/landing";

export function LandingFaq() {
  return (
    <section id="faq" className="faq-section px-6 pb-16 pt-6 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="faq-shell" dir="rtl">
          <header className="faq-intro">
            <div className="faq-intro__rail" aria-hidden="true" />
            {faqSection.eyebrow ? (
              <p className="faq-intro__eyebrow">{faqSection.eyebrow}</p>
            ) : null}
            <h2 className="type-display-section faq-intro__title">
              {faqSection.title}
            </h2>
            {faqSection.description ? (
              <p className="type-body-lg faq-intro__description">
                {faqSection.description}
              </p>
            ) : null}
          </header>

          <div className="faq-list">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                className="faq-item"
                open={index === 0}
              >
                <summary className="faq-item__summary">
                  <span className="faq-item__count">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="faq-item__summary-copy">
                    <span className="faq-item__marker" aria-hidden="true" />
                    <span className="faq-item__label">
                      שאלה
                    </span>
                    <h3 className="faq-item__question">{item.question}</h3>
                  </div>
                  <span className="faq-item__icon" aria-hidden="true">
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </span>
                </summary>

                <div className="faq-item__content">
                  <div className="faq-item__content-inner">
                    {item.answer.map((line) => (
                      <p key={line} className="faq-item__answer type-body">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
