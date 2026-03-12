import Image from "next/image";
import { ArrowUpLeft, Linkedin } from "lucide-react";
import { linkedinProfileCard } from "@/content/landing";
import ofekLinkedinProfile from "../../../public/ofek-linkedin-profile.jpeg";

export function LinkedInProfileCard() {
  return (
    <a
      href={linkedinProfileCard.url}
      target="_blank"
      rel="noreferrer"
      className="linkedin-profile-card"
      dir="rtl"
      aria-label={`${linkedinProfileCard.ctaLabel} - ${linkedinProfileCard.name}`}
    >
      <div className="linkedin-profile-card__media">
        <Image
          src={ofekLinkedinProfile}
          alt={linkedinProfileCard.alt}
          className="linkedin-profile-card__image"
          sizes="(max-width: 1024px) 6rem, 7rem"
          placeholder="blur"
        />
      </div>

      <div className="linkedin-profile-card__body">
        <div className="linkedin-profile-card__top">
          <span className="linkedin-profile-card__badge">
            <Linkedin className="h-4 w-4" strokeWidth={1.8} />
            <span>{linkedinProfileCard.badge}</span>
          </span>
        </div>

        <div className="linkedin-profile-card__copy">
          <p className="linkedin-profile-card__eyebrow">
            {linkedinProfileCard.eyebrow}
          </p>
          <p className="linkedin-profile-card__name">{linkedinProfileCard.name}</p>
          <p className="linkedin-profile-card__role">{linkedinProfileCard.role}</p>
          <div className="linkedin-profile-card__description">
            {linkedinProfileCard.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="linkedin-profile-card__footer">
          <span>{linkedinProfileCard.ctaLabel}</span>
          <ArrowUpLeft className="h-4 w-4" strokeWidth={1.8} />
        </div>
      </div>
    </a>
  );
}
