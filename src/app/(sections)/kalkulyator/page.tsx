import { Suspense } from "react";
import { ChanceCalculator } from "@/components/chance-calculator";
import { PageHero } from "@/components/page-hero";
import { Screen } from "@/components/screen";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Калькулятор шансов на бюджет",
  description:
    "Введи баллы ЕГЭ и индивидуальные достижения — сравним сумму с официальными проходными баллами вузов на бюджет и покажем, куда ты проходишь, где на грани и сколько не хватает.",
  path: "/kalkulyator",
});

export default function CalculatorPage() {
  return (
    <Screen>
      <PageHero eyebrow="Шансы" title={<>Хватит ли баллов <span className="text-brass italic">на бюджет</span></>}>
        Введи баллы ЕГЭ — реальные или ожидаемые. Сравним твою сумму с официальными проходными баллами прошлых лет по всем
        направлениям справочника.
      </PageHero>
      <Suspense fallback={<div className="mx-auto h-[32rem] max-w-7xl" />}>
        <ChanceCalculator />
      </Suspense>
    </Screen>
  );
}
