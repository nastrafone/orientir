"use client";

import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useProfile } from "@/components/profile-provider";
import { Segmented } from "@/components/segmented";
import { SUBJECTS } from "@/data/subjects";
import type { SubjectId } from "@/data/types";
import { UNIVERSITIES, getUniversity } from "@/data/universities";
import { EDGE, VERDICT_LABEL, type Verdict, chance, hasScores, saveScores, useScores } from "@/lib/chances";
import { programMatches } from "@/lib/match";
import { NAV_FORWARD, SPRING_SMOOTH } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ORDER: Record<Verdict, number> = { pass: 0, edge: 1, short: 2 };

function ScoreInput({
  label,
  hint,
  value,
  max,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number | undefined;
  max: number;
  onChange: (value: number | undefined) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-2.5 ring-1 ring-border transition-shadow focus-within:ring-2 focus-within:ring-brass">
      <span className="min-w-0 text-sm text-ink">
        {label}
        {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
      </span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={max}
        placeholder="—"
        value={value ?? ""}
        onChange={(e) => {
          const raw = e.target.value;
          onChange(raw === "" ? undefined : Math.min(max, Math.max(0, Math.round(Number(raw)))));
        }}
        className="w-16 bg-transparent text-right font-display text-2xl text-ink outline-none placeholder:text-ink/25 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </label>
  );
}

export function VerdictBadge({ verdict, gap, className }: { verdict: Verdict; gap: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold tabular-nums",
        verdict === "pass" && "bg-ink text-white",
        verdict === "edge" && "bg-brass/15 text-brass",
        verdict === "short" && "bg-secondary text-muted-foreground",
        className,
      )}
    >
      {VERDICT_LABEL[verdict]}
      <span className="font-normal opacity-80">{verdict === "short" ? -gap : gap >= 0 ? `+${gap}` : `−${-gap}`}</span>
    </span>
  );
}

export function ChanceCalculator() {
  const { personal } = useProfile();
  const scores = useScores();
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<"all" | Verdict>("all");
  const [onlyVuz, setOnlyVuz] = useState(useSearchParams().get("vuz"));
  const focus = onlyVuz ? getUniversity(onlyVuz) : undefined;

  const subjects = SUBJECTS.filter(
    (s) => showAll || !personal || s.id === "rus" || personal.subjects.includes(s.id) || scores.exams[s.id] !== undefined,
  );

  const setExam = (id: SubjectId, value: number | undefined) => {
    const exams = { ...scores.exams };
    if (value === undefined) delete exams[id];
    else exams[id] = value;
    saveScores({ ...scores, exams });
  };

  const { rows, counts, unknown } = useMemo(() => {
    const scope = focus ? [focus] : UNIVERSITIES;
    const taken = Object.keys(scores.exams) as SubjectId[];
    const all = scope.flatMap((u) => u.programs.map((p) => ({ u, p, c: chance(p, scores) })));
    const rated = all.flatMap((r) => (r.c ? [{ ...r, c: r.c }] : []));
    rated.sort((a, b) => ORDER[a.c.verdict] - ORDER[b.c.verdict] || (b.p.score ?? 0) - (a.p.score ?? 0));
    const counts: Record<Verdict, number> = { pass: 0, edge: 0, short: 0 };
    for (const r of rated) counts[r.c.verdict]++;
    return {
      rows: rated,
      counts,
      unknown: all.filter((r) => r.p.score === null && taken.length > 1 && programMatches(r.p, taken)).length,
    };
  }, [scores, focus]);

  const count = (v: Verdict) => counts[v];
  const visible = filter === "all" ? rows : rows.filter((r) => r.c.verdict === filter);

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] lg:gap-14">
      <section aria-labelledby="my-scores" className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl bg-paper p-5 sm:p-6">
          <h2 id="my-scores" className="font-display text-2xl text-ink">
            Твои баллы
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Реальные или ожидаемые. Сохраняются только в этом браузере.</p>
          <div className="mt-5 grid gap-2">
            {subjects.map((s) => (
              <ScoreInput
                key={s.id}
                label={s.label.replace(" (профиль)", "")}
                value={scores.exams[s.id]}
                max={100}
                onChange={(v) => setExam(s.id, v)}
              />
            ))}
          </div>
          {personal && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-3 text-sm text-primary underline-offset-4 hover:underline"
            >
              {showAll ? "Только мои предметы" : "Показать все предметы"}
            </button>
          )}
          <div className="mt-5 grid gap-2 border-t border-border pt-5">
            <ScoreInput
              label="Индивидуальные достижения"
              hint="Аттестат с отличием, ГТО, волонтёрство — до 10"
              value={scores.achievements || undefined}
              max={10}
              onChange={(v) => saveScores({ ...scores, achievements: v ?? 0 })}
            />
            <ScoreInput
              label="ДВИ МГУ"
              hint="Экзамен МГУ — нужен только для МГУ"
              value={scores.dvi || undefined}
              max={100}
              onChange={(v) => saveScores({ ...scores, dvi: v ?? 0 })}
            />
          </div>
        </div>
      </section>

      <section aria-label="Результат" className="min-w-0">
        <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <Segmented
            label="Показать"
            value={filter}
            onChange={setFilter}
            options={[
              { id: "all", label: "Все" },
              { id: "pass", label: `Проходишь · ${count("pass")}` },
              { id: "edge", label: `На грани · ${count("edge")}` },
              { id: "short", label: `Не хватает · ${count("short")}` },
            ]}
          />
          {focus && (
            <button
              type="button"
              onClick={() => setOnlyVuz(null)}
              className="pressable inline-flex h-9 items-center gap-1.5 self-start rounded-full bg-ink px-4 text-sm text-white"
            >
              Только {focus.short} <X className="size-3.5" aria-label="Показать все вузы" />
            </button>
          )}
        </div>

        {!hasScores(scores) ? (
          <p className="py-16 text-center text-muted-foreground">
            Введи баллы по русскому языку и профильным предметам — покажем, на какие направления их хватало в прошлые годы.
          </p>
        ) : visible.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            {rows.length === 0
              ? "Пока не с чем сравнить: проверь, что введены русский язык и предметы нужных направлений (для МГУ — ещё и ДВИ)."
              : "В этой группе направлений нет."}
          </p>
        ) : (
          <ul className="grid gap-3 pt-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map(({ u, p, c }) => (
                <motion.li
                  key={u.slug + p.name + p.unit}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={SPRING_SMOOTH}
                  className={cn(
                    "grid gap-3 rounded-3xl border p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6",
                    c.verdict === "pass" ? "border-ink/25 bg-white" : "border-border bg-white",
                  )}
                >
                  <div className="min-w-0">
                    <Link
                      href={`/vuzy/${u.slug}`}
                      transitionTypes={NAV_FORWARD}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brass hover:underline"
                    >
                      {u.short} <span className="font-normal text-muted-foreground">· {u.city}</span>
                    </Link>
                    <p className="mt-1 font-medium text-ink">{p.name}</p>
                    {p.unit && <p className="text-sm text-muted-foreground">{p.unit}</p>}
                    <p className="mt-2 text-sm text-muted-foreground">
                      Твоя сумма <span className="font-semibold text-ink tabular-nums">{c.total}</span> · проходной{" "}
                      <span className="tabular-nums">{p.score}</span> в {p.year} г. ·{" "}
                      <a
                        href={p.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-brass underline-offset-2 hover:underline"
                      >
                        источник <ArrowUpRight className="size-3" />
                      </a>
                    </p>
                  </div>
                  <VerdictBadge verdict={c.verdict} gap={c.gap} className="justify-self-start sm:justify-self-end" />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        {unknown > 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            Ещё {unknown} подходящих направлений не попали в расчёт: вузы не опубликовали по ним официальный проходной балл.
          </p>
        )}

        <div className="mt-10 rounded-3xl border border-border p-6 text-sm leading-relaxed text-muted-foreground">
          <p className="font-medium text-ink">Как считаем</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>
              Сумма = баллы ЕГЭ по предметам направления (из предметов по выбору берём лучший) + индивидуальные достижения, у МГУ — ещё
              и ДВИ.
            </li>
            <li>
              Сравниваем с официальным проходным баллом на бюджет по общему конкурсу за указанный год. «На грани» — до {EDGE} баллов
              ниже: проходные заметно колеблются от года к году.
            </li>
            <li>
              Это ориентир, а не гарантия: часть мест занимают олимпиадники, квоты и целевое обучение, а конкурс каждый год другой.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
