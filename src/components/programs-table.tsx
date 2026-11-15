"use client";

import { Check, Minus } from "lucide-react";
import { useProfile } from "@/components/profile-provider";
import { subjectShort } from "@/data/subjects";
import type { Program } from "@/data/types";
import { formatScore, programMatches } from "@/lib/match";
import { cn } from "@/lib/utils";

export function ProgramsTable({ programs }: { programs: Program[] }) {
  const { personal } = useProfile();

  return (
    <div className="overflow-hidden rounded-3xl border border-border">
      <div className="hidden grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,0.8fr)_3rem] gap-4 bg-paper px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:grid">
        <span>Направление</span>
        <span>Предметы ЕГЭ</span>
        <span>Проходной ≈</span>
        <span className="sr-only">Подходит</span>
      </div>
      <ul>
        {programs.map((p) => {
          const fits = personal ? programMatches(p, personal.subjects) : null;
          return (
            <li
              key={p.name + p.unit}
              className={cn(
                "grid gap-3 border-t border-border px-6 py-5 first:border-t-0 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,0.8fr)_3rem] md:items-center md:gap-4 md:first:border-t",
                fits && "bg-primary/[0.04]",
              )}
            >
              <div>
                <p className="font-medium text-ink">{p.name}</p>
                {p.unit && <p className="mt-0.5 text-sm text-muted-foreground">{p.unit}</p>}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-sm">
                {p.required.map((s) => (
                  <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-ink">
                    {subjectShort(s)}
                  </span>
                ))}
                {p.choice && (
                  <span className="rounded-full border border-dashed border-brass px-2.5 py-0.5 text-ink/80">
                    {p.choice.map(subjectShort).join(" / ")}
                  </span>
                )}
                {p.dvi && <span className="rounded-full bg-ink px-2.5 py-0.5 text-white">+ ДВИ</span>}
              </div>
              <p className="text-sm text-ink">
                <span className="font-display text-2xl">{formatScore(p)}</span>
                <span className="text-muted-foreground"> / {p.scale}</span>
              </p>
              <div className="flex md:justify-end">
                {fits === true && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-primary md:size-8 md:justify-center md:rounded-full md:bg-primary/10">
                    <Check className="size-4" />
                    <span className="md:sr-only">Подходит под твои ЕГЭ</span>
                  </span>
                )}
                {fits === false && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground md:size-8 md:justify-center">
                    <Minus className="size-4" />
                    <span className="md:sr-only">Не хватает предмета</span>
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
