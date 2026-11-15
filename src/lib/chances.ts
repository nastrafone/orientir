import { useSyncExternalStore } from "react";
import { SUBJECTS } from "@/data/subjects";
import type { Program, SubjectId } from "@/data/types";
import { SCORES_KEY } from "@/lib/storage-keys";

export interface Scores {
  exams: Partial<Record<SubjectId, number>>;
  /** Индивидуальные достижения, 0–10. */
  achievements: number;
  /** Ожидаемый балл ДВИ МГУ, 0–100. */
  dvi: number;
}

const EMPTY: Scores = { exams: {}, achievements: 0, dvi: 0 };

const clamp = (v: unknown, max: number) => (typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(0, Math.round(v))) : 0);

function parse(raw: string | null): Scores {
  if (!raw) return EMPTY;
  try {
    const s = JSON.parse(raw) as Partial<Scores>;
    const exams: Scores["exams"] = {};
    for (const { id } of SUBJECTS) {
      const v = s.exams?.[id];
      if (typeof v === "number") exams[id] = clamp(v, 100);
    }
    return { exams, achievements: clamp(s.achievements, 10), dvi: clamp(s.dvi, 100) };
  } catch {
    return EMPTY;
  }
}

/* Баллы хранятся в localStorage; useSyncExternalStore держит все компоненты в синхроне. */
let cache: { raw: string | null; value: Scores } = { raw: null, value: EMPTY };
const listeners = new Set<() => void>();

function read() {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(SCORES_KEY);
  } catch {
    return cache.value;
  }
  if (raw !== cache.raw) cache = { raw, value: parse(raw) };
  return cache.value;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function saveScores(next: Scores) {
  const raw = JSON.stringify(next);
  cache = { raw, value: next };
  try {
    localStorage.setItem(SCORES_KEY, raw);
  } catch {
    // приватный режим — баллы живут до перезагрузки
  }
  listeners.forEach((l) => l());
}

export function useScores() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function hasScores(s: Scores) {
  return Object.keys(s.exams).length > 0;
}

/** Сумма абитуриента в той же шкале, что и проходной балл программы; null — не хватает баллов по нужным предметам. */
export function programTotal(p: Program, s: Scores) {
  let sum = 0;
  for (const id of p.required) {
    const v = s.exams[id];
    if (v === undefined) return null;
    sum += v;
  }
  if (p.choice) {
    const options = p.choice.map((id) => s.exams[id]).filter((v): v is number => v !== undefined);
    if (!options.length) return null;
    sum += Math.max(...options);
  }
  if (p.dvi) {
    if (!s.dvi) return null;
    sum += s.dvi;
  }
  return sum + s.achievements;
}

export type Verdict = "pass" | "edge" | "short";

/** «На грани» — до 10 баллов ниже прошлогоднего проходного: проходные заметно колеблются от года к году. */
export const EDGE = 10;

export function chance(p: Program, s: Scores) {
  if (p.score === null) return null;
  const total = programTotal(p, s);
  if (total === null) return null;
  const gap = total - p.score;
  const verdict: Verdict = gap >= 0 ? "pass" : gap >= -EDGE ? "edge" : "short";
  return { total, gap, verdict };
}

export const VERDICT_LABEL: Record<Verdict, string> = {
  pass: "Проходишь",
  edge: "На грани",
  short: "Не хватает",
};
