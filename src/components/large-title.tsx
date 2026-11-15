"use client";

import { useEffect, useRef } from "react";
import { clearCompactTitle, setCompactTitle } from "@/lib/compact-title";

/** Невидимая метка под большим заголовком: когда она уходит под шапку, заголовок появляется в шапке. */
export function LargeTitle({ title }: { title: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const header = document.querySelector("header");
    const offset = header?.getBoundingClientRect().height ?? 64;
    const observer = new IntersectionObserver(
      ([entry]) => setCompactTitle({ title, visible: !entry.isIntersecting && entry.boundingClientRect.top < offset }),
      { rootMargin: `-${offset}px 0px 0px 0px` },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearCompactTitle();
    };
  }, [title]);

  return <span ref={ref} aria-hidden="true" className="block h-px" />;
}
