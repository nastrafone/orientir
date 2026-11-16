import type { Metadata } from "next";

export const SITE = {
  name: "Ориентир",
  title: "Ориентир — навигатор для старшеклассников",
  description:
    "Бесплатный справочник для учеников 10–11 классов: олимпиады с льготами, курсы при университетах, вузы с проходными баллами и востребованные профессии — с учётом твоих предметов ЕГЭ и региона.",
  // На Vercel адрес берётся из системной переменной проекта, если SITE_URL не задан явно.
  url: (
    process.env.SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  locale: "ru_RU",
};

/** Метаданные страницы: Next заменяет openGraph целиком, поэтому картинку и тип задаём каждый раз. */
export function pageMeta({
  title,
  description,
  path,
  image = { url: "/og.png", width: 1200, height: 630, alt: SITE.title },
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt: string };
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: SITE.locale, siteName: SITE.name, title, description, url: path, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/** Общая геометрия строки с логотипом: интро и шапка совпадают пиксель в пиксель. */
export const HEADER_ROW = "h-16 px-5 md:h-20 md:px-10";

export const NAV = [
  { href: "/vuzy", label: "Вузы", description: "Проходные баллы, программы и что даст университет" },
  { href: "/kalkulyator", label: "Шансы", description: "Калькулятор: хватит ли твоих баллов на бюджет" },
  { href: "/olimpiady", label: "Олимпиады", description: "Какие писать и что даёт каждое место" },
  { href: "/kursy", label: "Курсы", description: "Подготовка при университетах и бесплатные программы" },
  { href: "/sovety", label: "Советы", description: "План на 10 и 11 класс, сроки и поступление" },
  { href: "/napravleniya", label: "Направления", description: "Профессии будущего и как к ним прийти" },
] as const;
