import { CoursesView } from "@/components/courses-view";
import { PageHero } from "@/components/page-hero";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Курсы для школьников при университетах",
  description:
    "Подготовительные курсы, заочные школы и бесплатные программы МГУ, МФТИ, ВШЭ, Бауманки, ИТМО, НГУ и других вузов, а также «Сириус» и Яндекс Лицей: формат, стоимость и что они дают.",
  path: "/kursy",
});

export default function CoursesPage() {
  return (
    <>
      <PageHero eyebrow="Курсы" title={<>Курсы при университетах <span className="text-primary italic">и что они дают</span></>}>
        Подготовка к ЕГЭ, ДВИ и олимпиадам от самих вузов, заочные школы и бесплатные федеральные программы. Хороший курс —
        это не только баллы, но и возможность заранее познакомиться с университетом.
      </PageHero>
      <CoursesView />
    </>
  );
}
