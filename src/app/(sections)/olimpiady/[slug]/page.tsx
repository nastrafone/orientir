import { ArrowLeft, ArrowUpRight, Compass, MapPinned } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GradeAdvice } from "@/components/grade-advice";
import { LevelBadge } from "@/components/olympiad-explorer";
import { SectionTitle } from "@/components/page-hero";
import { OLYMPIAD_NOTE, OLYMPIADS, getOlympiad } from "@/data/olympiads";
import { subjectLabel } from "@/data/subjects";
import { UNIVERSITIES } from "@/data/universities";
import { pageMeta } from "@/lib/site";

export function generateStaticParams() {
  return OLYMPIADS.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: PageProps<"/olimpiady/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const o = getOlympiad(slug);
  if (!o) return {};
  return pageMeta({
    title: `${o.short}: профили, этапы и льготы при поступлении`,
    description: `${o.name} (${o.organizer}). Какие направления открывает, сроки этапов и что даёт диплом победителя и призёра.`,
    path: `/olimpiady/${o.slug}`,
  });
}

export default async function OlympiadPage({ params }: PageProps<"/olimpiady/[slug]">) {
  const { slug } = await params;
  const o = getOlympiad(slug);
  if (!o) notFound();
  const hosts = UNIVERSITIES.filter((u) => u.ownOlympiads.includes(o.slug));

  return (
    <article className="mx-auto max-w-7xl px-5 md:px-10">
      <Link href="/olimpiady" className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cocoa">
        <ArrowLeft className="size-4" /> Все олимпиады
      </Link>

      <header className="mt-8 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <LevelBadge level={o.level} />
          <span className="text-sm text-muted-foreground">{o.grades}</span>
        </div>
        <h1 className="mt-5 font-display text-4xl leading-[1.08] text-cocoa sm:text-6xl">{o.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground">Организатор: {o.organizer}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {o.subjects.map((s) => (
            <span key={s} className="rounded-full bg-secondary px-3 py-1 text-sm text-cocoa">
              {subjectLabel(s).replace(" (профиль)", "")}
            </span>
          ))}
        </div>
        <a
          href={o.site}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/85"
        >
          Сайт олимпиады <ArrowUpRight className="size-4" />
        </a>
      </header>

      <section className="mt-16 grid gap-10 lg:grid-cols-2" aria-label="Профили и направления">
        <div>
          <SectionTitle>Профили</SectionTitle>
          <ul className="mt-6 space-y-3">
            {o.profiles.map((p) => (
              <li key={p} className="rounded-2xl border border-border px-5 py-4 text-cocoa">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle>Куда открывает дорогу</SectionTitle>
          <ul className="mt-6 space-y-3">
            {o.directions.map((d) => (
              <li key={d} className="flex gap-3 rounded-2xl bg-sand px-5 py-4 text-cocoa">
                <Compass className="mt-0.5 size-5 shrink-0 text-primary" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="rewards">
        <SectionTitle id="rewards">Что даёт каждое место</SectionTitle>
        <div className="mt-8 overflow-hidden rounded-3xl border border-border">
          {o.rewards.map((r, i) => (
            <div key={r.place} className="grid gap-2 border-t border-border p-6 first:border-t-0 md:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] md:gap-8">
              <p className="flex items-baseline gap-3 font-display text-2xl text-cocoa">
                <span className="text-lg text-latte">0{i + 1}</span>
                {r.place}
              </p>
              <p className="leading-relaxed text-muted-foreground">{r.gives}</p>
            </div>
          ))}
        </div>
        {o.level !== "ВсОШ" && <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{OLYMPIAD_NOTE}</p>}
      </section>

      <section className="mt-20" aria-labelledby="stages">
        <SectionTitle id="stages">Этапы</SectionTitle>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {o.stages.map((s, i) => (
            <li key={s.title} className="relative rounded-3xl border border-border p-6">
              <span className="font-display text-4xl text-latte">{i + 1}</span>
              <p className="mt-3 font-medium text-cocoa">{s.title}</p>
              <p className="mt-1 text-sm text-primary">{s.when}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.format}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">Сроки примерные — точный календарь публикуется на сайте олимпиады в начале учебного года.</p>
      </section>

      <section className="mt-20" aria-labelledby="advice">
        <SectionTitle id="advice">Совет для твоего класса</SectionTitle>
        <div className="mt-8">
          <GradeAdvice advice={o.forGrade} />
        </div>
        <p className="mt-6 flex max-w-3xl gap-3 text-cocoa">
          <MapPinned className="mt-0.5 size-5 shrink-0 text-primary" />
          {o.regionNote}
        </p>
      </section>

      {hosts.length > 0 && (
        <section className="mt-20" aria-labelledby="hosts">
          <SectionTitle id="hosts">Вуз-организатор</SectionTitle>
          <div className="mt-6 flex flex-wrap gap-3">
            {hosts.map((u) => (
              <Link
                key={u.slug}
                href={`/vuzy/${u.slug}`}
                className="rounded-full border border-border px-5 py-2.5 text-cocoa transition-colors hover:border-latte hover:bg-sand"
              >
                {u.short} →
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
