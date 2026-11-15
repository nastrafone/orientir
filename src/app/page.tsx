import type { Metadata } from "next";
import Image from "next/image";
import { HomePanel } from "@/components/home-panel";
import { QuoteRotator } from "@/components/quote-rotator";
import { Screen } from "@/components/screen";
import { SiteHeader } from "@/components/site-header";
import { SITE, pageMeta } from "@/lib/site";
import heroPhoto from "@/assets/mgu-hero.jpg";

export const metadata: Metadata = {
  ...pageMeta({ title: SITE.title, description: SITE.description, path: "/" }),
  title: { absolute: SITE.title },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: "ru-RU",
};

export default function Home() {
  return (
    <Screen className="grid min-h-dvh [grid-template-areas:'header'_'photo'_'main'] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:[grid-template-areas:'header_photo'_'main_photo']">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="[grid-area:header]">
        <SiteHeader variant="home" />
      </div>

      <aside className="px-3 [grid-area:photo] lg:sticky lg:top-0 lg:h-dvh lg:self-start lg:py-4 lg:pl-0 lg:pr-4">
        <div className="relative h-[52svh] min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-secondary lg:h-full">
          <Image
            src={heroPhoto}
            alt="Главное здание МГУ имени М. В. Ломоносова"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b1e15]/85 via-[#2b1e15]/25 to-transparent" />
          <p className="absolute right-5 top-5 rounded-full bg-white/80 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-cocoa backdrop-blur">
            МГУ, Воробьёвы горы
          </p>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-12">
            <QuoteRotator />
          </div>
        </div>
      </aside>

      <main className="[grid-area:main]">
        <HomePanel />
      </main>
    </Screen>
  );
}
