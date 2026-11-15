export type SubjectId =
  | "rus"
  | "math"
  | "phys"
  | "inf"
  | "chem"
  | "bio"
  | "soc"
  | "hist"
  | "lit"
  | "geo"
  | "eng";

/** Федеральные округа + две столицы отдельно. */
export type RegionId =
  | "msk"
  | "spb"
  | "cfd"
  | "nwfd"
  | "sfd"
  | "ncfd"
  | "vfd"
  | "ufd"
  | "sibfd"
  | "fefd";

/** Федеральный округ, в котором находится вуз. */
export type DistrictId = Exclude<RegionId, "msk" | "spb">;

export type Grade = 10 | 11;

export interface Profile {
  name: string;
  grade: Grade;
  subjects: SubjectId[];
  region: RegionId;
  city?: string;
  skipped?: boolean;
}

export interface PhotoCredit {
  author: string;
  license: string;
  source: string;
}

export interface Program {
  name: string;
  unit?: string;
  /** Все предметы из required обязательны. */
  required: SubjectId[];
  /** Если задано — нужен хотя бы один предмет по выбору. */
  choice?: SubjectId[];
  /** Ориентир проходного балла на бюджет (сумма ЕГЭ + ИД, а для вузов с ДВИ — вместе с ДВИ). */
  score: [number, number];
  scale: 310 | 410;
  dvi?: boolean;
}

export interface University {
  slug: string;
  short: string;
  name: string;
  city: string;
  /** "msk"/"spb" для столичных вузов, иначе федеральный округ. */
  area: RegionId;
  founded: number;
  site: string;
  image: string;
  imageAlt: string;
  tagline: string;
  about: string;
  opportunities: string[];
  admission: string[];
  ownOlympiads: string[];
  dorm: string;
  programs: Program[];
}

export type OlympiadLevel = "ВсОШ" | "I" | "I–II" | "I–III" | "II–III" | "III";

export interface Olympiad {
  slug: string;
  name: string;
  short: string;
  organizer: string;
  level: OlympiadLevel;
  grades: string;
  subjects: SubjectId[];
  profiles: string[];
  directions: string[];
  stages: { title: string; when: string; format: string }[];
  rewards: { place: string; gives: string }[];
  forGrade: Record<Grade, string>;
  regionNote: string;
  site: string;
}

export interface Course {
  title: string;
  format: string;
  price: "free" | "paid" | "mixed";
  grades: string;
  description: string;
  gives: string;
  url: string;
}

export interface CourseProvider {
  university: string;
  courses: Course[];
}

export interface Career {
  slug: string;
  title: string;
  summary: string;
  why: string;
  tasks: string[];
  subjects: SubjectId[][];
  studyAt: { university: string; program: string }[];
  steps: string[];
  person: { name: string; role: string; image: string };
}
