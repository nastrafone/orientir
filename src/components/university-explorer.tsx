"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Cutout } from "@/components/cutout";
import { useProfile } from "@/components/profile-provider";
import { Segmented } from "@/components/segmented";
import { Badge } from "@/components/ui/badge";
import type { University } from "@/data/types";
import { UNIVERSITIES } from "@/data/universities";
import { lowestScore, matchingPrograms, proximity, universityRank } from "@/lib/match";
import { NAV_FORWARD, SPRING_SMOOTH } from "@/lib/motion";

type Place = "all" | "msk" | "spb" | "regions";
type Fit = "mine" | "all";

const PLACES: { id: Place; label: string }[] = [
  { id: "all", label: "Все города" },
  { id: "msk", label: "Москва" },
  { id: "spb", label: "Санкт-Петербург" },
  { id: "regions", label: "Регионы" },
];

const FITS: { id: Fit; label: string }[] = [
  { id: "mine", label: "Подходят под мои ЕГЭ" },
  { id: "all", label: "Все вузы" },
];

function minScore(u: University) {
  const p = lowestScore(u);
  return p ? `проходной от ${p.score} / ${p.scale}` : "проходной: нет офиц. данных";
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
        <Segmented label="Город" value={place} onChange={setPlace} options={PLACES} className="self-start" />
        {personal && <Segmented label="Подбор" value={fit} onChange={setFit} options={FITS} className="self-start" />}
      </div>

      {list.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          В этой выборке нет вузов с направлениями под твой набор ЕГЭ. Попробуй «Все вузы» или другой город.
        </p>
      ) : (
        <ul className="grid gap-x-6 gap-y-12 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
          {list.map((u, i) => {
            const matches = personal ? matchingPrograms(u, personal.subjects).length : null;
            const near = personal ? proximity(u, personal) : null;
            return (
              <motion.li
                key={u.slug}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={SPRING_SMOOTH}
              >
                <Link href={`/vuzy/${u.slug}`} transitionTypes={NAV_FORWARD} className="pressable group block">
                  <Cutout
                    src={u.image}
                    alt={u.imageAlt}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    priority={i < 3}
                    className="aspect-[5/4] transition-shadow duration-700 group-hover:shadow-[0_24px_60px_-30px_rgba(20,30,52,0.35)]"
                    imageClassName="transition-transform duration-700 ease-[var(--ease-spring)] group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
                  />
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="font-display text-[1.75rem] leading-tight text-ink transition-colors group-hover:text-brass">
                        {u.short}
                      </h2>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{u.tagline}</p>
                    </div>
                    <ArrowUpRight className="mt-2 size-5 shrink-0 text-brass transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass" />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink/80">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-brass" />
                      {u.city}
                    </span>
                    <span>с {u.founded} г.</span>
                    <span>{minScore(u)}</span>
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
                      {near === "home" && <Badge className="h-6 bg-secondary px-2.5 text-ink">В твоём регионе</Badge>}
                      {near === "district" && <Badge className="h-6 bg-secondary px-2.5 text-ink">В твоём федеральном округе</Badge>}
                    </div>
                  )}
                </Link>
              </motion.li>
            );
          })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
