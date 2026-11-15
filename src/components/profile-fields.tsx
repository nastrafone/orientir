"use client";

import { Check, Lock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Segmented } from "@/components/segmented";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REGIONS } from "@/data/regions";
import { SUBJECTS } from "@/data/subjects";
import type { Grade, Profile, RegionId, SubjectId } from "@/data/types";
import { SPRING_SMOOTH, SPRING_SNAPPY } from "@/lib/motion";
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
        "pressable inline-flex items-center rounded-full border px-3.5 py-2 text-sm",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-white text-foreground hover:border-brass hover:bg-paper",
        disabled && "cursor-default opacity-90",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Галочка выезжает пружиной и раздвигает чип, как отметка в списках iOS. */
function ChipCheck({ shown }: { shown: boolean }) {
  return (
    <AnimatePresence initial={false}>
      {shown && (
        <motion.span
          initial={{ width: 0, opacity: 0, scale: 0.4 }}
          animate={{ width: "auto", opacity: 1, scale: 1 }}
          exit={{ width: 0, opacity: 0, scale: 0.4 }}
          transition={SPRING_SNAPPY}
          className="inline-flex overflow-hidden"
        >
          <Check className="mr-1.5 size-3.5 shrink-0" />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function Question({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-3">
      <legend className="flex items-baseline gap-3">
        <span className="font-display text-lg text-brass">0{n}</span>
        <span className="text-[0.95rem] font-semibold text-ink">{title}</span>
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
        <Segmented
          label="Класс"
          size="lg"
          value={draft.grade}
          onChange={(grade: Grade) => onChange({ ...draft, grade })}
          options={[
            { id: 10, label: "10 класс" },
            { id: 11, label: "11 класс" },
          ]}
        />
      </Question>

      <Question n={2} title="Какие экзамены планируешь сдавать?" hint="Выбери минимум два предмета, кроме русского языка.">
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => {
            const active = draft.subjects.includes(s.id);
            return (
              <Chip key={s.id} active={active} disabled={s.id === "rus"} onClick={() => toggleSubject(s.id)}>
                {s.id === "rus" ? <Lock className="mr-1.5 size-3.5" /> : <ChipCheck shown={active} />}
                {s.label}
              </Chip>
            );
          })}
        </div>
      </Question>

      <Question n={3} title="Где ты живёшь?">
        <Segmented
          label="Регион"
          value={capitalOrOther}
          onChange={(v) => {
            if (v === "other") {
              if (capitalOrOther !== "other") onChange({ ...draft, region: "vfd" });
            } else onChange({ ...draft, region: v, city: undefined });
          }}
          options={[
            { id: "msk", label: "Москва и область" },
            { id: "spb", label: "Санкт-Петербург и область" },
            { id: "other", label: "Другой регион" },
          ]}
        />
        <AnimatePresence initial={false}>
        {capitalOrOther === "other" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING_SMOOTH}
            className="-m-1 overflow-hidden"
          >
          <div className="grid gap-2 p-1 pt-2 sm:grid-cols-2">
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
          </motion.div>
        )}
        </AnimatePresence>
      </Question>
    </div>
  );
}
