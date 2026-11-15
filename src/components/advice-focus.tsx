"use client";

import { ArrowDown } from "lucide-react";
import { useProfile } from "@/components/profile-provider";
import { isCapital } from "@/data/regions";

export function AdviceFocus() {
  const { personal } = useProfile();
  if (!personal) return null;

  const links = [
    { href: personal.grade === 10 ? "#plan-10" : "#plan-11", label: `План на ${personal.grade} класс` },
    ...(personal.grade === 11 ? [{ href: "#rules", label: "Как устроено поступление" }] : [{ href: "#olympiads-tip", label: "Олимпиады уже в 10 классе" }]),
    ...(!isCapital(personal.region) ? [{ href: "#regions", label: "Если ты не из Москвы и Петербурга" }] : []),
  ];

  return (
    <div className="mx-auto mb-12 max-w-7xl px-5 md:px-10">
      <div className="rounded-3xl bg-cocoa p-6 text-white sm:p-8">
        <p className="font-display text-2xl">{personal.name ? `${personal.name}, начни отсюда` : "Начни отсюда"}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-4 py-2 text-sm transition-colors hover:bg-white/20">
              {l.label} <ArrowDown className="size-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
