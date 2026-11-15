"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { QUOTES } from "@/data/quotes";

export function QuoteRotator() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 4000);
    return () => clearInterval(id);
  }, []);

  const quote = QUOTES[index];

  return (
    <figure className="relative min-h-[9.5rem] sm:min-h-[8.5rem]" aria-live="off">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: reduce ? 0 : 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: reduce ? 0 : -8, filter: "blur(4px)" }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          <blockquote className="font-display text-[1.65rem] leading-snug text-white italic sm:text-3xl lg:text-[2.1rem]">
            «{quote.text}»
          </blockquote>
          <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">{quote.author}</figcaption>
        </motion.div>
      </AnimatePresence>
    </figure>
  );
}
