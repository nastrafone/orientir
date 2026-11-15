"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { SPRING_SNAPPY } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Сегментированный переключатель в духе UISegmentedControl: белая «шайба» переезжает пружиной. */
export function Segmented<T extends string | number>({
  value,
  onChange,
  options,
  label,
  className,
  size = "md",
}: {
  value: T;
  onChange: (value: T) => void;
  options: { id: T; label: React.ReactNode }[];
  label: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const id = useId();
  return (
    <div role="radiogroup" aria-label={label} className={cn("inline-flex flex-wrap gap-1 rounded-[1.15rem] bg-secondary p-1", className)}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={String(o.id)}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.id)}
            className={cn(
              "pressable relative rounded-[0.9rem] text-sm",
              size === "lg" ? "px-5 py-2.5" : "px-4 py-2",
              active ? "text-ink" : "text-ink/65 hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId={`segment-${id}`}
                transition={SPRING_SNAPPY}
                className="absolute inset-0 rounded-[0.9rem] bg-white shadow-[0_1px_2px_rgb(20_30_52/0.08),0_3px_10px_rgb(20_30_52/0.08)]"
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
