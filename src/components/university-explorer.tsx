"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Cutout } from "@/components/cutout";
import { useProfile } from "@/components/profile-provider";
import { Badge } from "@/components/ui/badge";
import type { University } from "@/data/types";
import { UNIVERSITIES } from "@/data/universities";
import { matchingPrograms, proximity, universityRank } from "@/lib/match";
import { cn } from "@/lib/utils";

type Place = "all" | "msk" | "spb" | "regions";
type Fit = "mine" | "all";

const PLACES: { id: Place; label: string }[] = [
  { id: "all", label: "Все города" },
  { id: "msk", label: "Москва" },
  { id: "spb", label: "Санкт-Петербург" },
  { id: "regions", label: "Регионы" },
];

export function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-colors duration-300",
        active ? "border-cocoa bg-cocoa text-white" : "border-border bg-white text-cocoa hover:border-latte",
      )}
    >
      {children}
    </button>
  );
}

function minScore(u: University) {
  const p = u.programs.reduce((a, b) => (b.score[0] < a.score[0] ? b : a));
  return `${p.score[0]} / ${p.scale}`;
}

export function UniversityExplorer() {
  const { personal } = useProfile();
  const [place, setPlace] = useState<Place>("all");
  const [fit, setFit] = useState<Fit>("mine");
  const onlyMine = personal && fit === "mine";

  const list = useMemo(() => {
    let items = [...UNIVERSITIES];
    if (place === "regions") items = items.filter((u) => u.area !== "msk" && u.area !== "spb");
    else if (place !== "all") items = items.filter((u) => u.area === place);
    if (personal) {
      if (onlyMine) items = items.filter((u) => matchingPrograms(u, personal.subjects).length > 0);
      items.sort((a, b) => universityRank(b, personal) - universityRank(a, personal));
    }
    return items;
  }, [place, personal, onlyMine]);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <div className="flex flex-col gap-4 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {PLACES.map((p) => (
            <FilterChip key={p.id} active={place === p.id} onClick={() => setPlace(p.id)}>
              {p.label}
            </FilterChip>
          ))}
        </div>
        {personal && (
          <div className="flex flex-wrap gap-2">
            <FilterChip active={fit === "mine"} onClick={() => setFit("mine")}>
              Подходят под мои ЕГЭ
            </FilterChip>
            <FilterChip active={fit === "all"} onClick={() => setFit("all")}>
              Все вузы
            </FilterChip>
          </div>
        )}
      </div>

      {list.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          В этой выборке нет вузов с направлениями под твой набор ЕГЭ. Попробуй «Все вузы» или другой город.
        </p>
      ) : (
        <ul className="grid gap-x-6 gap-y-12 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((u, i) => {
            const matches = personal ? matchingPrograms(u, personal.subjects).length : null;
            const near = personal ? proximity(u, personal) : null;
            return (
              <li key={u.slug}>
                <Link href={`/vuzy/${u.slug}`} className="group block">
                  <Cutout
                    src={u.image}
                    alt={u.imageAlt}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    priority={i < 3}
                    className="aspect-[5/4] transition-shadow duration-700 group-hover:shadow-[0_24px_60px_-30px_rgba(92,68,52,0.45)]"
                    imageClassName="transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
                  />
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="font-display text-[1.75rem] leading-tight text-cocoa transition-colors group-hover:text-primary">
                        {u.short}
                      </h2>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{u.tagline}</p>
                    </div>
                    <ArrowUpRight className="mt-2 size-5 shrink-0 text-latte transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-cocoa/80">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-latte" />
                      {u.city}
                    </span>
                    <span>с {u.founded} г.</span>
                    <span>проходной от ≈ {minScore(u)}</span>
                  </div>
                  {personal && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {matches ? (
                        <Badge className="h-6 bg-primary/12 px-2.5 text-primary">
                          {matches} {matches === 1 ? "направление" : matches < 5 ? "направления" : "направлений"} под твои ЕГЭ
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="h-6 px-2.5 text-muted-foreground">
                          Нет направлений под твои ЕГЭ
                        </Badge>
                      )}
                      {near === "home" && <Badge className="h-6 bg-secondary px-2.5 text-cocoa">В твоём регионе</Badge>}
                      {near === "district" && <Badge className="h-6 bg-secondary px-2.5 text-cocoa">В твоём федеральном округе</Badge>}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
