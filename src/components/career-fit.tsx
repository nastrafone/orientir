"use client";

import { Check } from "lucide-react";
import { useProfile } from "@/components/profile-provider";
import type { SubjectId } from "@/data/types";

export function CareerFit({ sets }: { sets: SubjectId[][] }) {
  const { personal } = useProfile();
  if (!personal) return null;
  const fits = sets.some((set) => set.every((s) => s === "rus" || personal.subjects.includes(s)));
  if (!fits) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
      <Check className="size-3.5" /> Подходит под твои предметы
    </span>
  );
}
