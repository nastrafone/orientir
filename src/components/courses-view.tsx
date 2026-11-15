"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Cutout } from "@/components/cutout";
import { useProfile } from "@/components/profile-provider";
import { Segmented } from "@/components/segmented";
import { COURSE_PROVIDERS, FEDERAL_PROGRAMS } from "@/data/courses";
import { isCapital } from "@/data/regions";
import type { Course } from "@/data/types";
import { getUniversity } from "@/data/universities";
import { NAV_FORWARD, SPRING_SMOOTH } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Filter = "all" | "free" | "online";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Все курсы" },
  { id: "free", label: "Бесплатные" },
  { id: "online", label: "Онлайн и заочно" },
];

const PRICE: Record<Course["price"], string> = { free: "Бесплатно", paid: "Платно", mixed: "Есть бесплатный формат" };

// Карточки при фильтрации раздвигаются и появляются пружиной, как ячейки списка в iOS.
const appear = {
  layout: true,
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: SPRING_SMOOTH,
} as const;

const isOnline = (c: Course) => /онлайн|заочно/i.test(c.format);
const isFree = (c: Course) => c.price !== "paid";

function CourseCard({ course, highlight }: { course: Course; highlight?: boolean }) {
  return (
    <div className={cn("flex h-full flex-col rounded-3xl border p-6", highlight ? "border-brass/70 bg-paper" : "border-border bg-white")}>
      <div className="flex flex-wrap gap-1.5 text-xs">
        <span className={cn("rounded-full px-2.5 py-1", course.price === "paid" ? "bg-secondary text-ink" : "bg-primary text-white")}>
          {PRICE[course.price]}
        </span>
        <span className="rounded-full bg-white px-2.5 py-1 text-ink ring-1 ring-border">{course.format}</span>
        <span className="rounded-full bg-white px-2.5 py-1 text-ink ring-1 ring-border">{course.grades}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl leading-tight text-ink">{course.title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{course.description}</p>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-ink">
        <span className="font-semibold">Что даст: </span>
        {course.gives}
      </p>
      <a
        href={course.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1 pt-5 text-sm text-primary underline-offset-4 hover:underline"
      >
        Подробнее на сайте <ArrowUpRight className="size-4" />
      </a>
    </div>
  );
}

export function CoursesView() {
  const { personal } = useProfile();
  const [filter, setFilter] = useState<Filter>("all");
  const remote = personal && !isCapital(personal.region);
  const pass = (c: Course) => filter === "all" || (filter === "free" ? isFree(c) : isOnline(c));

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <div className="border-y border-border py-5">
        <Segmented label="Формат" value={filter} onChange={setFilter} options={FILTERS} />
      </div>

      {remote && (
        <p className="mt-8 rounded-3xl bg-ink p-6 leading-relaxed text-white sm:p-8">
          Ты живёшь не в Москве и не в Петербурге — мы подсветили онлайн- и заочные форматы. Они дают тот же уровень подготовки
          без переезда, а бесплатные программы «Сириуса» и заочных школ МФТИ и НГУ открыты для всех регионов.
        </p>
      )}

      <section aria-labelledby="federal" className="mt-12">
        <h2 id="federal" className="font-display text-3xl text-ink sm:text-4xl">
          Бесплатные федеральные программы
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {FEDERAL_PROGRAMS.filter(pass).map((c) => (
              <motion.li key={c.title} {...appear}>
                <CourseCard course={c} highlight={Boolean(remote && isOnline(c))} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>

      <div className="mt-16 space-y-16">
        <AnimatePresence mode="popLayout" initial={false}>
        {COURSE_PROVIDERS.map((provider) => {
          const u = getUniversity(provider.university);
          const courses = provider.courses.filter(pass);
          if (!u || courses.length === 0) return null;
          return (
            <motion.section
              key={provider.university}
              {...appear}
              id={u.slug}
              aria-labelledby={`${u.slug}-title`}
              className="grid scroll-mt-28 gap-8 border-t border-border pt-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:gap-12"
            >
              <Link href={`/vuzy/${u.slug}`} transitionTypes={NAV_FORWARD} className="pressable group block self-start">
                <Cutout
                  src={u.image}
                  alt={u.imageAlt}
                  sizes="(min-width: 1024px) 28vw, 92vw"
                  className="aspect-[5/4]"
                  imageClassName="transition-transform duration-700 group-hover:-translate-y-1"
                />
                <h2 id={`${u.slug}-title`} className="mt-4 font-display text-3xl text-ink transition-colors group-hover:text-brass">
                  {u.short}
                </h2>
                <p className="text-sm text-muted-foreground">{u.city}</p>
              </Link>
              <ul className="grid gap-5 md:grid-cols-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  {courses.map((c) => (
                    <motion.li key={c.title} {...appear}>
                      <CourseCard course={c} highlight={Boolean(remote && isOnline(c))} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </motion.section>
          );
        })}
        </AnimatePresence>
      </div>
    </div>
  );
}
