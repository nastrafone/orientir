import { ArrowLeft, ArrowUpRight, BedDouble, CalendarDays, Globe, MapPin, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cutout } from "@/components/cutout";
import { LargeTitle } from "@/components/large-title";
import { Screen } from "@/components/screen";
import { SectionTitle } from "@/components/page-hero";
import { ProgramsTable } from "@/components/programs-table";
import { COURSE_PROVIDERS } from "@/data/courses";
import { getOlympiad } from "@/data/olympiads";
import { regionLabel } from "@/data/regions";
import { UNIVERSITIES, getUniversity } from "@/data/universities";
import { NAV_BACK, NAV_FORWARD } from "@/lib/motion";
import { SITE, pageMeta } from "@/lib/site";

export function generateStaticParams() {
  return UNIVERSITIES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: PageProps<"/vuzy/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) return {};
  return pageMeta({
    title: `${u.short} — проходные баллы, направления, поступление`,
    description: `${u.name} (${u.city}): ${u.tagline.toLowerCase()}. Проходные баллы, предметы ЕГЭ, особенности конкурса и что даст вуз.`,
    path: `/vuzy/${u.slug}`,
    image: { url: u.image, alt: u.imageAlt },
  });
}

export default async function UniversityPage({ params }: PageProps<"/vuzy/[slug]">) {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) notFound();

  const courses = COURSE_PROVIDERS.find((c) => c.university === u.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: u.name,
    alternateName: u.short,
    url: u.site,
    foundingDate: String(u.founded),
    address: { "@type": "PostalAddress", addressLocality: u.city, addressCountry: "RU" },
    image: `${SITE.url}${u.image}`,
  };

  return (
    <Screen>
    <article className="mx-auto max-w-7xl px-5 md:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link
        href="/vuzy"
        transitionTypes={NAV_BACK}
        className="pressable mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-ink"
      >
        <ArrowLeft className="size-4" /> Все вузы
      </Link>

      <header className="mt-6 grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
        <Cutout src={u.image} alt={u.imageAlt} priority sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[5/4]" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass">{u.short}</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] text-ink sm:text-5xl">{u.name}</h1>
          <LargeTitle title={u.short} />
          <p className="mt-4 font-display text-2xl italic text-brass">{u.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted-foreground">{u.about}</p>
          <dl className="mt-7 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl bg-paper p-4">
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-3.5" /> Город
              </dt>
              <dd className="mt-1 font-medium text-ink">{u.city}</dd>
              <dd className="text-xs text-muted-foreground">{regionLabel(u.area)}</dd>
            </div>
            <div className="rounded-2xl bg-paper p-4">
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-3.5" /> Основан
              </dt>
              <dd className="mt-1 font-medium text-ink">{u.founded} г.</dd>
            </div>
          </dl>
          <a
            href={u.site}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/85"
          >
            <Globe className="size-4" /> Официальный сайт <ArrowUpRight className="size-4" />
          </a>
        </div>
      </header>

      <section className="mt-20" aria-labelledby="opportunities">
        <SectionTitle id="opportunities">Что даст тебе {u.short}</SectionTitle>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {u.opportunities.map((o) => (
            <li key={o} className="flex gap-4 rounded-3xl border border-border p-6">
              <Sparkles className="mt-0.5 size-5 shrink-0 text-brass" />
              <span className="leading-relaxed text-ink">{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="programs">
        <SectionTitle id="programs">Направления и проходные баллы</SectionTitle>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Ориентир для бюджета по последним приёмным кампаниям. В пунктирной рамке — предметы по выбору (нужен один из них).
          {u.programs.some((p) => p.dvi) && " ДВИ — дополнительное вступительное испытание вуза, максимум 100 баллов."}
        </p>
        <div className="mt-8">
          <ProgramsTable programs={u.programs} />
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-2" aria-label="Поступление">
        <div>
          <SectionTitle>Особенности конкурса</SectionTitle>
          <ul className="mt-6 space-y-4">
            {u.admission.map((a) => (
              <li key={a} className="border-l-2 border-brass pl-4 leading-relaxed text-ink">
                {a}
              </li>
            ))}
          </ul>
          {u.ownOlympiads.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-semibold text-ink">Олимпиады вуза</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {u.ownOlympiads.map((o) => {
                  const ol = getOlympiad(o);
                  return ol ? (
                    <Link
                      key={o}
                      href={`/olimpiady/${ol.slug}`}
                      transitionTypes={NAV_FORWARD}
                      className="pressable rounded-full border border-border px-4 py-2 text-sm text-ink hover:border-brass hover:bg-paper"
                    >
                      {ol.short} →
                    </Link>
                  ) : (
                    <span key={o} className="rounded-full border border-border px-4 py-2 text-sm text-ink">
                      {o}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl bg-paper p-7">
            <p className="flex items-center gap-2 font-display text-2xl text-ink">
              <BedDouble className="size-5 text-brass" /> Общежитие
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">{u.dorm}</p>
          </div>
          {courses && (
            <Link
              href={`/kursy#${u.slug}`}
              transitionTypes={NAV_FORWARD}
              className="pressable group block rounded-3xl border border-border p-7 hover:bg-paper"
            >
              <p className="font-display text-2xl text-ink">Курсы для школьников</p>
              <p className="mt-2 text-muted-foreground">
                {courses.courses.map((c) => c.title).join(" · ")}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                Подробнее <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          )}
        </div>
      </section>
    </article>
    </Screen>
  );
}
