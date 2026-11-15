import { regionDistrict } from "@/data/regions";
import type { Olympiad } from "@/data/olympiads";
import type { Profile, Program, SubjectId, University } from "@/data/types";

export function programMatches(program: Program, subjects: SubjectId[]) {
  const has = (s: SubjectId) => s === "rus" || subjects.includes(s);
  return program.required.every(has) && (!program.choice || program.choice.some(has));
}

export function matchingPrograms(university: University, subjects: SubjectId[]) {
  return university.programs.filter((p) => programMatches(p, subjects));
}

export type Proximity = "home" | "district" | "far";

export function proximity(university: University, profile: Pick<Profile, "region">): Proximity {
  if (university.area === profile.region) return "home";
  if (regionDistrict(university.area) === regionDistrict(profile.region)) return "district";
  return "far";
}

export function olympiadMatches(olympiad: Olympiad, subjects: SubjectId[]) {
  return olympiad.subjects.some((s) => s !== "rus" && subjects.includes(s));
}

/** Чем выше, тем раньше вуз показывается пользователю. */
export function universityRank(university: University, profile: Profile) {
  const matches = matchingPrograms(university, profile.subjects).length;
  const near = proximity(university, profile);
  return (matches > 0 ? 100 : 0) + (near === "home" ? 40 : near === "district" ? 25 : 0) + matches * 3;
}

/** Самый низкий официальный проходной балл вуза — или null, если ни одного не нашли. */
export function lowestScore(university: University) {
  const scored = university.programs.filter((p) => p.score !== null);
  return scored.length ? scored.reduce((a, b) => (b.score! < a.score! ? b : a)) : null;
}
