import Link from "next/link";
import { CareerFit } from "@/components/career-fit";
import { Cutout } from "@/components/cutout";
import { PageHero } from "@/components/page-hero";
import { Screen } from "@/components/screen";
import { CAREERS } from "@/data/careers";
import { subjectLabel } from "@/data/subjects";
import { getUniversity } from "@/data/universities";
import { NAV_FORWARD } from "@/lib/motion";
import { pageMeta } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = pageMeta({
  title: "Востребованные профессии будущего и как к ним прийти",
  description:
    "Инженер машинного обучения, разработчик, специалист по кибербезопасности, биоинженер, врач, инженер космической отрасли и другие профессии: какие ЕГЭ сдавать, где учиться и что делать уже в школе.",
  path: "/napravleniya",
});

export default function CareersPage() {
  return (
    <Screen>
      <PageHero eyebrow="Направления" title={<>Профессии будущего <span className="text-brass italic">и путь к ним</span></>}>
        Чем занимаются специалисты, почему они будут нужны, какие экзамены сдавать и где учиться. Рядом — люди, которые
        прославили эти профессии.
      </PageHero>

      <nav aria-label="Профессии" className="mx-auto max-w-7xl px-5 md:px-10">
        <ul className="flex flex-wrap gap-2 border-y border-border py-5">
          {CAREERS.map((c) => (
            <li key={c.slug}>
              <a href={`#${c.slug}`} className="block rounded-full border border-border px-4 py-2 text-sm text-ink transition-colors hover:border-brass hover:bg-paper">
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {CAREERS.map((c, i) => (
          <section
            key={c.slug}
            id={c.slug}
            aria-labelledby={`${c.slug}-title`}
            className={cn(
              "grid scroll-mt-28 items-start gap-10 border-b border-border py-16 last:border-b-0 lg:gap-16",
              i % 2 === 1 ? "lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)]" : "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]",
            )}
          >
            <figure className={cn("mx-auto w-full max-w-sm lg:sticky lg:top-28", i % 2 === 1 && "lg:order-2")}>
              <Cutout src={c.person.image} alt={c.person.name} sizes="(min-width: 1024px) 26vw, 80vw" className="aspect-square" round />
              <figcaption className="mt-5 text-center">
                <span className="block font-display text-2xl text-ink">{c.person.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{c.person.role}</span>
              </figcaption>
            </figure>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-lg text-brass">{String(i + 1).padStart(2, "0")}</span>
                <CareerFit sets={c.subjects} />
              </div>
              <h2 id={`${c.slug}-title`} className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                {c.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/90">{c.summary}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                <span className="font-semibold text-ink">Почему востребована: </span>
                {c.why}
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl bg-paper p-6">
                  <p className="text-sm font-semibold text-ink">Чем занимается</p>
                  <ul className="mt-3 space-y-2 text-[0.95rem] text-muted-foreground">
                    {c.tasks.map((t) => (
                      <li key={t}>— {t}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl bg-paper p-6">
                  <p className="text-sm font-semibold text-ink">ЕГЭ</p>
                  <ul className="mt-3 space-y-2 text-[0.95rem] text-muted-foreground">
                    {c.subjects.map((set) => (
                      <li key={set.join()}>Русский + {set.filter((s) => s !== "rus").map((s) => subjectLabel(s).toLowerCase().replace(" (профиль)", "")).join(" + ")}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold text-ink">Где учиться</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {c.studyAt.map((s) => {
                    const u = getUniversity(s.university);
                    if (!u) return null;
                    return (
                      <li key={s.university + s.program}>
                        <Link
                          href={`/vuzy/${u.slug}`}
                          transitionTypes={NAV_FORWARD}
                          className="pressable block rounded-2xl border border-border px-4 py-2.5 text-sm hover:border-brass hover:bg-paper"
                        >
                          <span className="font-medium text-ink">{u.short}</span>
                          <span className="text-muted-foreground"> · {s.program}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold text-ink">Что делать уже в школе</p>
                <ol className="mt-3 space-y-2.5">
                  {c.steps.map((s, k) => (
                    <li key={s} className="flex gap-3 leading-relaxed text-ink/90">
                      <span className="font-display text-xl leading-6 text-brass">{k + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        ))}
      </div>
    </Screen>
  );
}
