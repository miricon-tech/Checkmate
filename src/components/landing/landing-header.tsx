import { BrandLogo } from "@/components/landing/brand-logo";

export function LandingHeader() {
  return (
    <header className="w-full border-b border-[var(--border)] bg-[rgba(255,255,255,0.94)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-4 md:px-10">
        <div dir="ltr">
          <BrandLogo className="shrink-0" compact />
        </div>
      </div>
    </header>
  );
}
