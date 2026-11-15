import { OlympiadExplorer } from "@/components/olympiad-explorer";
import { PageHero } from "@/components/page-hero";
import { OLYMPIAD_NOTE } from "@/data/olympiads";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Олимпиады школьников с льготами при поступлении",
  description:
    "ВсОШ и олимпиады из перечня РСОШ: «Физтех», «Ломоносов», «Высшая проба», олимпиада СПбГУ, НТО и другие. Какие профили, этапы и что даёт диплом победителя и призёра.",
  path: "/olimpiady",
});

export default function OlympiadsPage() {
  return (
    <>
      <PageHero eyebrow="Олимпиады" title={<>Олимпиады, которые <span className="text-primary italic">открывают двери</span></>}>
        Диплом олимпиады может дать поступление без экзаменов (БВИ) или 100 баллов ЕГЭ. Выбери предмет и нажми на олимпиаду —
        покажем направления и что даёт каждое место.
      </PageHero>
      <div className="mx-auto mb-8 max-w-7xl px-5 md:px-10">
        <div className="grid gap-4 rounded-3xl bg-sand p-6 text-sm leading-relaxed text-cocoa sm:grid-cols-3 sm:p-8">
          <p>
            <span className="block font-display text-2xl">ВсОШ</span>
            Всероссийская олимпиада: победители и призёры финала поступают без экзаменов в любой вуз по профилю.
          </p>
          <p>
            <span className="block font-display text-2xl">Перечень РСОШ</span>
            Олимпиады I, II и III уровня. Чем выше уровень, тем весомее льготы — их устанавливает каждый вуз.
          </p>
          <p>
            <span className="block font-display text-2xl">Важно</span>
            {OLYMPIAD_NOTE}
          </p>
        </div>
      </div>
      <OlympiadExplorer />
      <p className="mx-auto mt-14 max-w-7xl px-5 text-xs leading-relaxed text-muted-foreground md:px-10">
        Уровни олимпиад ежегодно пересматриваются и различаются по профилям. Актуальный перечень — на сайте Российского
        совета олимпиад школьников (rsr-olymp.ru), календарь — на olimpiada.ru.
      </p>
    </>
  );
}
