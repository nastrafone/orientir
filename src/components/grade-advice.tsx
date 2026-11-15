"use client";

import { useProfile } from "@/components/profile-provider";
import type { Grade } from "@/data/types";
import { cn } from "@/lib/utils";

export function GradeAdvice({ advice }: { advice: Record<Grade, string> }) {
  const { personal } = useProfile();
  const grades: Grade[] = [10, 11];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {grades.map((g) => {
        const mine = personal?.grade === g;
        return (
          <div
            key={g}
            className={cn(
              "rounded-3xl p-7 transition-colors",
              mine ? "bg-ink text-white" : "bg-paper text-ink",
              personal && !mine && "opacity-70",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-75">{mine ? `Твой класс · ${g}` : `${g} класс`}</p>
            <p className="mt-3 leading-relaxed">{advice[g]}</p>
          </div>
        );
      })}
    </div>
  );
}
