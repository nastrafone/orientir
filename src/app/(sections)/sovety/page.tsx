import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { AdviceFocus } from "@/components/advice-focus";
import { PageHero, SectionTitle } from "@/components/page-hero";
import { Screen } from "@/components/screen";
import { ACHIEVEMENTS, ADMISSION_RULES, EXAM_TIPS, PLAN_10, PLAN_11, REGIONAL_TIPS, RESOURCES } from "@/data/advice";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Советы: план на 10 и 11 класс и как устроено поступление",
  description:
    "Пошаговый план для 10 и 11 класса: олимпиады, итоговое сочинение, ЕГЭ, подача документов, приоритеты и зачисление. Советы для поступающих из регионов.",
  path: "/sovety",
});

function Timeline({ items }: { items: { when: string; title: string; text: string }[] }) {
  return (
    <ol className="relative mt-10 space-y-10 border-l border-brass/60 pl-8">
      {items.map((s) => (
        <li key={s.title} className="relative">
          <span className="absolute -left-[2.35rem] top-1.5 size-3 rounded-full border-2 border-white bg-primary ring-1 ring-brass" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">{s.when}</p>
          <p className="mt-1.5 font-display text-2xl text-ink">{s.title}</p>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export default function AdvicePage() {
  return (
    <Screen>
      <PageHero eyebrow="Советы" title={<>План, сроки и <span className="text-brass italic">правила поступления</span></>}>
        Что делать в 10 и 11 классе, чтобы к лету у тебя были высокие баллы, дипломы олимпиад и понятный список вузов.
      </PageHero>
      <AdviceFocus />

      <div className="mx-auto max-w-7xl space-y-24 px-5 md:px-10">
        <section className="grid gap-12 lg:grid-cols-2" aria-label="Планы по классам">
          <div id="plan-10" className="scroll-mt-28">
            <SectionTitle>10 класс: время пробовать</SectionTitle>
            <Timeline items={PLAN_10} />
          </div>
          <div id="plan-11" className="scroll-mt-28">
            <SectionTitle>11 класс: время действовать</SectionTitle>
            <Timeline items={PLAN_11} />
          </div>
        </section>

        <section id="olympiads-tip" className="scroll-mt-28 rounded-[2rem] bg-paper p-8 sm:p-12" aria-label="Олимпиады в 10 классе">
          <p className="max-w-3xl font-display text-3xl leading-snug text-ink sm:text-4xl">
            Дипломы олимпиад, полученные в 10 классе, действуют 4 года — значит, на льготу можно заработать уже сейчас, а в 11
            классе спокойно готовиться к ЕГЭ.
          </p>
        </section>

        <section id="rules" className="scroll-mt-28" aria-labelledby="rules-title">
          <SectionTitle id="rules-title">Как устроено поступление</SectionTitle>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ADMISSION_RULES.map((r) => (
              <li key={r.title} className="rounded-3xl border border-border p-7">
                <p className="font-display text-2xl text-ink">{r.title}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{r.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-12 lg:grid-cols-2" aria-label="Достижения и подготовка">
          <div>
            <SectionTitle>До 10 баллов за достижения</SectionTitle>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Вузы добавляют к сумме ЕГЭ баллы за индивидуальные достижения — в сумме не больше 10. Список и «цена» каждого
              достижения у каждого вуза свои. Чаще всего учитывают:
            </p>
            <ul className="mt-6 space-y-3">
              {ACHIEVEMENTS.map((a) => (
                <li key={a} className="flex gap-3 text-ink">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brass" /> {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle>Как готовиться к ЕГЭ</SectionTitle>
            <ul className="mt-6 space-y-4">
              {EXAM_TIPS.map((t, i) => (
                <li key={t} className="flex gap-4 leading-relaxed text-ink">
                  <span className="font-display text-2xl leading-none text-brass">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="regions" className="scroll-mt-28" aria-labelledby="regions-title">
          <SectionTitle id="regions-title">Если ты не из Москвы и Петербурга</SectionTitle>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REGIONAL_TIPS.map((t) => (
              <li key={t.title} className="rounded-3xl bg-paper p-7">
                <p className="font-display text-2xl text-ink">{t.title}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="resources-title">
          <SectionTitle id="resources-title">Полезные ресурсы</SectionTitle>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {RESOURCES.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-5 transition-colors hover:bg-paper sm:px-3"
                >
                  <span>
                    <span className="font-display text-2xl text-ink">{r.title}</span>
                    <span className="ml-3 text-sm text-muted-foreground">{r.text}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-brass transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Screen>
  );
}
