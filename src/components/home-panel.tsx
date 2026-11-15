"use client";

import { ArrowUpRight, PencilLine } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useProfile } from "@/components/profile-provider";
import { CAREERS } from "@/data/careers";
import { COURSE_PROVIDERS, FEDERAL_PROGRAMS } from "@/data/courses";
import { OLYMPIADS } from "@/data/olympiads";
import { isCapital, regionLabel } from "@/data/regions";
import { subjectLabel } from "@/data/subjects";
import type { Profile } from "@/data/types";
import { UNIVERSITIES } from "@/data/universities";
import { matchingPrograms, olympiadMatches, proximity } from "@/lib/match";
import { NAV_FORWARD, NAV_TAB, SPRING_SMOOTH } from "@/lib/motion";
import { NAV } from "@/lib/site";

function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

function personalMeta(href: string, p: Profile): string {
  switch (href) {
    case "/vuzy": {
      const fit = UNIVERSITIES.filter((u) => matchingPrograms(u, p.subjects).length > 0);
      const near = fit.filter((u) => proximity(u, p) !== "far").length;
      return `${fit.length} ${plural(fit.length, "вуз подходит", "вуза подходят", "вузов подходят")} по предметам${near ? `, ${near} — рядом с тобой` : ""}`;
    }
    case "/olimpiady": {
      const n = OLYMPIADS.filter((o) => olympiadMatches(o, p.subjects)).length;
      return `${n} ${plural(n, "олимпиада", "олимпиады", "олимпиад")} по твоим предметам`;
    }
    case "/kursy": {
      const n = COURSE_PROVIDERS.length;
      return `Курсы ${n} вузов и ${FEDERAL_PROGRAMS.length} бесплатные федеральные программы`;
    }
    case "/sovety":
      return `План на ${p.grade} класс${isCapital(p.region) ? "" : " и советы для поступающих из регионов"}`;
    case "/napravleniya": {
      const n = CAREERS.filter((c) => c.subjects.some((set) => set.every((s) => s === "rus" || p.subjects.includes(s)))).length;
      return `${n} ${plural(n, "профессия подходит", "профессии подходят", "профессий подходят")} под твои предметы`;
    }
    default:
      return "";
  }
}

function joinRu(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} и ${items[items.length - 1]}`;
}

export function HomePanel() {
  const { personal, setEditorOpen } = useProfile();
  const reduce = useReducedMotion();
  const subjects = personal?.subjects.filter((s) => s !== "rus").map((s) => subjectLabel(s).toLowerCase().replace(" (профиль)", ""));

  return (
    <div className="px-5 pb-16 pt-8 md:px-10 lg:pt-10 xl:pr-14">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-latte">Навигатор для 10–11 классов</p>
      <h1 className="mt-4 font-display text-[2.6rem] leading-[1.04] text-cocoa sm:text-5xl xl:text-[3.6rem]">
        {personal?.name ? (
          <>
            Привет, {personal.name}!
            <br />
            <span className="text-primary italic">Вот твой маршрут</span>
          </>
        ) : (
          <>
            Куда двигаться
            <br />
            <span className="text-primary italic">после школы</span>
          </>
        )}
      </h1>

      {personal ? (
        <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-muted-foreground">
          Ты в {personal.grade} классе, сдаёшь русский{subjects?.length ? `, ${joinRu(subjects)}` : ""}, живёшь:{" "}
          {personal.city ? `${personal.city}, ` : ""}
          {regionLabel(personal.region)}.{" "}
          <button
            type="button"
            onClick={() => setEditorOpen(true)}
            className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
          >
            <PencilLine className="size-3.5" /> изменить
          </button>
        </p>
      ) : (
        <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-muted-foreground">
          Олимпиады с льготами, курсы при университетах, вузы с проходными баллами и востребованные профессии — в одном месте.{" "}
          <button type="button" onClick={() => setEditorOpen(true)} className="text-primary underline-offset-4 hover:underline">
            Заполни профиль
          </button>
          , и мы подберём варианты под твои предметы и регион.
        </p>
      )}

      <nav aria-label="Разделы" className="mt-10 border-t border-border">
        {NAV.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_SMOOTH, delay: 0.08 + i * 0.06 }}
          >
            <Link
              href={item.href}
              transitionTypes={NAV_FORWARD}
              className="pressable group flex items-start gap-5 rounded-2xl border-b border-border py-5 hover:bg-sand sm:px-3"
            >
              <span className="mt-1.5 font-display text-lg text-latte">0{i + 1}</span>
              <span className="flex-1">
                <span className="block font-display text-[1.9rem] leading-tight text-cocoa transition-colors duration-500 group-hover:text-primary">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {personal ? personalMeta(item.href, personal) : item.description}
                </span>
              </span>
              <ArrowUpRight className="mt-2.5 size-5 shrink-0 text-latte transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </Link>
          </motion.div>
        ))}
      </nav>

      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
        Данные о вузах и олимпиадах — ориентир. Правила приёма меняются ежегодно, сверяйтесь с официальными сайтами.{" "}
        <Link href="/istochniki" transitionTypes={NAV_TAB} className="underline underline-offset-4 hover:text-cocoa">
          Источники
        </Link>
      </p>
    </div>
  );
}
