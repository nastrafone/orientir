import { PageHero } from "@/components/page-hero";
import { Screen } from "@/components/screen";
import { UniversityExplorer } from "@/components/university-explorer";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Вузы России: проходные баллы, программы, возможности",
  description:
    "Ведущие университеты Москвы, Санкт-Петербурга и регионов: проходные баллы на бюджет, нужные предметы ЕГЭ, дополнительные испытания, собственные олимпиады и что даёт вуз студенту.",
  path: "/vuzy",
});

export default function UniversitiesPage() {
  return (
    <Screen>
      <PageHero eyebrow="Вузы" title={<>Университеты, в которые <span className="text-brass italic">стоит целиться</span></>}>
        Столичные и региональные вузы с проходными баллами и нужными предметами ЕГЭ. Нажми на университет, чтобы увидеть
        направления, особенности конкурса и возможности для студентов.
      </PageHero>
      <UniversityExplorer />
      <p className="mx-auto mt-14 max-w-7xl px-5 text-xs leading-relaxed text-muted-foreground md:px-10">
        Проходные баллы — официальные данные приёмных комиссий на бюджет по общему конкурсу (сумма трёх ЕГЭ и индивидуальных
        достижений, у МГУ — вместе с ДВИ) за год, указанный на странице вуза. Если вуз не публикует проходные, мы так и пишем.
      </p>
    </Screen>
  );
}
