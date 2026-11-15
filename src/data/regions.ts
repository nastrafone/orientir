import type { DistrictId, RegionId } from "./types";

export const REGIONS: { id: RegionId; label: string; hint: string }[] = [
  { id: "msk", label: "Москва и область", hint: "Москва, Подмосковье" },
  { id: "spb", label: "Санкт-Петербург и область", hint: "Петербург, Ленобласть" },
  { id: "cfd", label: "Центральный ФО", hint: "Воронеж, Ярославль, Тула, Белгород…" },
  { id: "nwfd", label: "Северо-Западный ФО", hint: "Калининград, Архангельск, Мурманск…" },
  { id: "sfd", label: "Южный ФО", hint: "Ростов-на-Дону, Краснодар, Волгоград…" },
  { id: "ncfd", label: "Северо-Кавказский ФО", hint: "Ставрополь, Махачкала, Нальчик…" },
  { id: "vfd", label: "Приволжский ФО", hint: "Казань, Нижний Новгород, Самара, Уфа…" },
  { id: "ufd", label: "Уральский ФО", hint: "Екатеринбург, Челябинск, Тюмень…" },
  { id: "sibfd", label: "Сибирский ФО", hint: "Новосибирск, Томск, Красноярск, Омск…" },
  { id: "fefd", label: "Дальневосточный ФО", hint: "Владивосток, Хабаровск, Якутск…" },
];

const byId = new Map(REGIONS.map((r) => [r.id, r]));

export function regionLabel(id: RegionId) {
  return byId.get(id)?.label ?? id;
}

/** Федеральный округ, к которому относится регион пользователя. */
export function regionDistrict(id: RegionId): DistrictId {
  if (id === "msk") return "cfd";
  if (id === "spb") return "nwfd";
  return id;
}

export function isCapital(id: RegionId) {
  return id === "msk" || id === "spb";
}

export const CAPITAL_CITY: Partial<Record<RegionId, string>> = {
  msk: "Москва",
  spb: "Санкт-Петербург",
};
