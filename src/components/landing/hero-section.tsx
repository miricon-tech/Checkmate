import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { heroHighlights, heroMetrics } from "@/content/landing";

export function HeroSection() {
  return (
    <section id="hero" className="mx-auto max-w-6xl px-6 pb-14 pt-8 md:px-10 md:pb-20">
      <div className="relative isolate overflow-hidden rounded-[42px] border border-[var(--border)] bg-[var(--accent-deep)] shadow-[0_24px_90px_rgba(22,52,92,0.16)]">
        <Image
          src="/home-page-hero/Chessboard.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,17,35,0.22)_0%,rgba(7,17,35,0.48)_34%,rgba(7,17,35,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,164,93,0.26),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,rgba(7,17,35,0.88),transparent)]" />

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-4xl flex-col justify-between px-6 py-14 text-center text-white md:px-10 md:py-20">
          <div className="space-y-7">
            <div className="flex justify-center">
              <Badge tone="dark">Premium Brand Landing System</Badge>
            </div>

            <div className="space-y-5">
              <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-white md:text-7xl">
                מהלך מדויק שממקם את העסק שלכם בעמדת יתרון כבר מהמסך הראשון.
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
                שפה ויזואלית שנשענת על צבעי הלוגו, היררכיה יוקרתית ורקע שמכניס
                עומק וביטחון. ההירו הזה בנוי להרגיש פרימיום, ממוקד ומוכן להמרה.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#cta" variant="gold" size="lg">
                קובעים שיחת אסטרטגיה
              </Button>
              <Button href="#features" variant="secondary" size="lg">
                צופים במבנה העמוד
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/76">
              {heroHighlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 pt-10 md:grid-cols-3">
            {heroMetrics.map((metric) => (
              <Panel key={metric.label} tone="dark" className="p-5 text-right">
                <p className="font-display text-2xl font-semibold text-white">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm font-semibold text-white/88">
                  {metric.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/68">{metric.note}</p>
              </Panel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
