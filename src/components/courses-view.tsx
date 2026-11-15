"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Cutout } from "@/components/cutout";
import { useProfile } from "@/components/profile-provider";
import { FilterChip } from "@/components/university-explorer";
import { COURSE_PROVIDERS, FEDERAL_PROGRAMS } from "@/data/courses";
import { isCapital } from "@/data/regions";
import type { Course } from "@/data/types";
import { getUniversity } from "@/data/universities";
import { cn } from "@/lib/utils";

type Filter = "all" | "free" | "online";

const PRICE: Record<Course["price"], string> = { free: "Бесплатно", paid: "Платно", mixed: "Есть бесплатный формат" };

const isOnline = (c: Course) => /онлайн|заочно/i.test(c.format);
const isFree = (c: Course) => c.price !== "paid";

function CourseCard({ course, highlight }: { course: Course; highlight?: boolean }) {
  return (
    <div className={cn("flex h-full flex-col rounded-3xl border p-6", highlight ? "border-latte/70 bg-sand" : "border-border bg-white")}>
      <div className="flex flex-wrap gap-1.5 text-xs">
        <span className={cn("rounded-full px-2.5 py-1", course.price === "paid" ? "bg-secondary text-cocoa" : "bg-primary text-white")}>
          {PRICE[course.price]}
        </span>
        <span className="rounded-full bg-white px-2.5 py-1 text-cocoa ring-1 ring-border">{course.format}</span>
        <span className="rounded-full bg-white px-2.5 py-1 text-cocoa ring-1 ring-border">{course.grades}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl leading-tight text-cocoa">{course.title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{course.description}</p>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-cocoa">
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
      <div className="flex flex-wrap gap-2 border-y border-border py-5">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          Все курсы
        </FilterChip>
        <FilterChip active={filter === "free"} onClick={() => setFilter("free")}>
          Бесплатные
        </FilterChip>
        <FilterChip active={filter === "online"} onClick={() => setFilter("online")}>
          Онлайн и заочно
        </FilterChip>
      </div>

      {remote && (
        <p className="mt-8 rounded-3xl bg-cocoa p-6 leading-relaxed text-white sm:p-8">
          Ты живёшь не в Москве и не в Петербурге — мы подсветили онлайн- и заочные форматы. Они дают тот же уровень подготовки
          без переезда, а бесплатные программы «Сириуса» и заочных школ МФТИ и НГУ открыты для всех регионов.
        </p>
      )}

      <section aria-labelledby="federal" className="mt-12">
        <h2 id="federal" className="font-display text-3xl text-cocoa sm:text-4xl">
          Бесплатные федеральные программы
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {FEDERAL_PROGRAMS.filter(pass).map((c) => (
            <li key={c.title}>
              <CourseCard course={c} highlight={Boolean(remote && isOnline(c))} />
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 space-y-16">
        {COURSE_PROVIDERS.map((provider) => {
          const u = getUniversity(provider.university);
          const courses = provider.courses.filter(pass);
          if (!u || courses.length === 0) return null;
          return (
            <section
              key={provider.university}
              id={u.slug}
              aria-labelledby={`${u.slug}-title`}
              className="grid scroll-mt-28 gap-8 border-t border-border pt-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:gap-12"
            >
              <Link href={`/vuzy/${u.slug}`} className="group block self-start">
                <Cutout
                  src={u.image}
                  alt={u.imageAlt}
                  sizes="(min-width: 1024px) 28vw, 92vw"
                  className="aspect-[5/4]"
                  imageClassName="transition-transform duration-700 group-hover:-translate-y-1"
                />
                <h2 id={`${u.slug}-title`} className="mt-4 font-display text-3xl text-cocoa transition-colors group-hover:text-primary">
                  {u.short}
                </h2>
                <p className="text-sm text-muted-foreground">{u.city}</p>
              </Link>
              <ul className="grid gap-5 md:grid-cols-2">
                {courses.map((c) => (
                  <li key={c.title}>
                    <CourseCard course={c} highlight={Boolean(remote && isOnline(c))} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
