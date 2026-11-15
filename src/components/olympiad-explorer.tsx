"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useProfile } from "@/components/profile-provider";
import { Segmented } from "@/components/segmented";
import { OLYMPIADS } from "@/data/olympiads";
import { SUBJECTS, subjectShort } from "@/data/subjects";
import type { SubjectId } from "@/data/types";
import { olympiadMatches } from "@/lib/match";
import { NAV_FORWARD, SPRING_SMOOTH } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function LevelBadge({ level, className }: { level: string; className?: string }) {
  const top = level === "ВсОШ" || level === "I";
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold",
        top ? "bg-cocoa text-white" : "bg-secondary text-cocoa",
        className,
      )}
    >
      {level === "ВсОШ" ? "Высший статус" : `${level} уровень`}
    </span>
  );
}

export function OlympiadExplorer() {
  const { personal } = useProfile();
  const [subject, setSubject] = useState<SubjectId | "mine" | "all">("mine");
  const active = !personal && subject === "mine" ? "all" : subject;

  const list = useMemo(() => {
    if (active === "all") return OLYMPIADS;
    if (active === "mine" && personal) return OLYMPIADS.filter((o) => olympiadMatches(o, personal.subjects));
    return OLYMPIADS.filter((o) => o.subjects.includes(active as SubjectId));
  }, [active, personal]);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <div className="border-y border-border py-5">
        <Segmented
          label="Предмет"
          value={active}
          onChange={setSubject}
          options={[
            ...(personal ? [{ id: "mine" as const, label: "По моим предметам" }] : []),
            { id: "all" as const, label: "Все" },
            ...SUBJECTS.filter((s) => s.id !== "rus").map((s) => ({ id: s.id, label: s.label.replace(" (профиль)", "") })),
          ]}
        />
      </div>

      <ul className="grid gap-5 pt-10 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
        {list.map((o) => {
          const mine = personal ? olympiadMatches(o, personal.subjects) : false;
          return (
            <motion.li
              key={o.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={SPRING_SMOOTH}
            >
              <Link
                href={`/olimpiady/${o.slug}`}
                transitionTypes={NAV_FORWARD}
                className={cn(
                  "pressable group flex h-full flex-col rounded-3xl border p-7 hover:shadow-[0_24px_60px_-34px_rgba(92,68,52,0.45)]",
                  mine ? "border-latte/70 bg-sand" : "border-border bg-white",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <LevelBadge level={o.level} />
                  <ArrowUpRight className="size-5 text-latte transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <h2 className="mt-5 font-display text-[1.8rem] leading-tight text-cocoa">{o.short}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{o.organizer}</p>
                <p className="mt-4 line-clamp-2 text-[0.95rem] leading-relaxed text-cocoa/85">{o.profiles.join(" · ")}</p>
                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
                  {o.subjects
                    .filter((s) => s !== "rus")
                    .slice(0, 7)
                    .map((s) => (
                      <span
                        key={s}
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs",
                          personal?.subjects.includes(s) ? "bg-primary text-white" : "bg-white text-cocoa ring-1 ring-border",
                        )}
                      >
                        {subjectShort(s)}
                      </span>
                    ))}
                  <span className="ml-auto text-xs text-muted-foreground">{o.grades.split(" (")[0]}</span>
                </div>
              </Link>
            </motion.li>
          );
        })}
        </AnimatePresence>
      </ul>
      {list.length === 0 && <p className="py-16 text-center text-muted-foreground">По этому предмету олимпиад в справочнике пока нет.</p>}
    </div>
  );
}
