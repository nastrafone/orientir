import type { SubjectId } from "./types";

export const SUBJECTS: { id: SubjectId; label: string; short: string }[] = [
  { id: "rus", label: "Русский язык", short: "Рус" },
  { id: "math", label: "Математика (профиль)", short: "Мат" },
  { id: "phys", label: "Физика", short: "Физ" },
  { id: "inf", label: "Информатика", short: "Инф" },
  { id: "chem", label: "Химия", short: "Хим" },
  { id: "bio", label: "Биология", short: "Био" },
  { id: "soc", label: "Обществознание", short: "Общ" },
  { id: "hist", label: "История", short: "Ист" },
  { id: "lit", label: "Литература", short: "Лит" },
  { id: "geo", label: "География", short: "Гео" },
  { id: "eng", label: "Иностранный язык", short: "Ин. яз" },
];

const byId = new Map(SUBJECTS.map((s) => [s.id, s]));

export function subjectLabel(id: SubjectId) {
  return byId.get(id)?.label ?? id;
}

export function subjectShort(id: SubjectId) {
  return byId.get(id)?.short ?? id;
}
