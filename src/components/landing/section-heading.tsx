type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="eyebrow text-xs font-semibold">{eyebrow}</p>
      <h2 className="font-display text-3xl leading-tight font-semibold text-foreground md:text-5xl">
        {title}
      </h2>
      <p className="muted-copy text-lg leading-8">{description}</p>
    </div>
  );
}
