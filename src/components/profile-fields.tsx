"use client";

import { Check, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REGIONS } from "@/data/regions";
import { SUBJECTS } from "@/data/subjects";
import type { Grade, Profile, RegionId, SubjectId } from "@/data/types";
import { cn } from "@/lib/utils";

export type ProfileDraft = Omit<Profile, "name">;

export const EMPTY_DRAFT: ProfileDraft = { grade: 10, subjects: ["rus"], region: "msk" };

export function draftIsValid(draft: ProfileDraft) {
  return draft.subjects.filter((s) => s !== "rus").length >= 2;
}

function Chip({
  active,
  disabled,
  onClick,
  children,
  className,
}: {
  active: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors duration-300",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-white text-foreground hover:border-latte hover:bg-sand",
        disabled && "cursor-default opacity-90",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Question({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-3">
      <legend className="flex items-baseline gap-3">
        <span className="font-display text-lg text-latte">0{n}</span>
        <span className="text-[0.95rem] font-semibold text-cocoa">{title}</span>
      </legend>
      {hint && <p className="-mt-1 text-sm text-muted-foreground">{hint}</p>}
      {children}
    </fieldset>
  );
}

export function ProfileFields({ draft, onChange }: { draft: ProfileDraft; onChange: (d: ProfileDraft) => void }) {
  const capitalOrOther: "msk" | "spb" | "other" = draft.region === "msk" || draft.region === "spb" ? draft.region : "other";

  const toggleSubject = (id: SubjectId) => {
    if (id === "rus") return;
    const has = draft.subjects.includes(id);
    onChange({ ...draft, subjects: has ? draft.subjects.filter((s) => s !== id) : [...draft.subjects, id] });
  };

  return (
    <div className="space-y-7">
      <Question n={1} title="В каком ты классе?">
        <div className="flex gap-2">
          {([10, 11] as Grade[]).map((g) => (
            <Chip key={g} active={draft.grade === g} onClick={() => onChange({ ...draft, grade: g })} className="px-5">
              {g} класс
            </Chip>
          ))}
        </div>
      </Question>

      <Question n={2} title="Какие экзамены планируешь сдавать?" hint="Выбери минимум два предмета, кроме русского языка.">
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => {
            const active = draft.subjects.includes(s.id);
            return (
              <Chip key={s.id} active={active} disabled={s.id === "rus"} onClick={() => toggleSubject(s.id)}>
                {s.id === "rus" ? <Lock className="size-3.5" /> : active && <Check className="size-3.5" />}
                {s.label}
              </Chip>
            );
          })}
        </div>
      </Question>

      <Question n={3} title="Где ты живёшь?">
        <div className="flex flex-wrap gap-2">
          <Chip active={capitalOrOther === "msk"} onClick={() => onChange({ ...draft, region: "msk", city: undefined })}>
            Москва и область
          </Chip>
          <Chip active={capitalOrOther === "spb"} onClick={() => onChange({ ...draft, region: "spb", city: undefined })}>
            Санкт-Петербург и область
          </Chip>
          <Chip
            active={capitalOrOther === "other"}
            onClick={() => capitalOrOther !== "other" && onChange({ ...draft, region: "vfd" })}
          >
            Другой регион
          </Chip>
        </div>
        {capitalOrOther === "other" && (
          <div className="grid gap-2 pt-1 sm:grid-cols-2">
            <Select value={draft.region} onValueChange={(v) => onChange({ ...draft, region: v as RegionId })}>
              <SelectTrigger className="h-11 w-full rounded-xl bg-white" aria-label="Федеральный округ">
                <SelectValue placeholder="Федеральный округ" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.filter((r) => r.id !== "msk" && r.id !== "spb").map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={draft.city ?? ""}
              onChange={(e) => onChange({ ...draft, city: e.target.value.slice(0, 40) })}
              placeholder="Город (необязательно)"
              aria-label="Город"
              className="h-11 rounded-xl bg-white"
            />
            <p className="text-xs text-muted-foreground sm:col-span-2">
              {REGIONS.find((r) => r.id === draft.region)?.hint}
            </p>
          </div>
        )}
      </Question>
    </div>
  );
}
