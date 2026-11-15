"use client";

import { MotionConfig } from "motion/react";
import { useEffect, useRef } from "react";
import { useProfile } from "@/components/profile-provider";
import { SPRING_SMOOTH } from "@/lib/motion";

export function MotionRoot({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={SPRING_SMOOTH}>
      {children}
    </MotionConfig>
  );
}

/** Обёртка страницы. На телефоне, пока открыта шторка профиля, страница уменьшается и скругляется, как в iOS. */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { editorOpen } = useProfile();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;

    if (editorOpen && window.matchMedia("(max-width: 639px)").matches) {
      // Масштабируем вокруг видимой части страницы и скругляем именно её углы.
      const y = window.scrollY;
      const vh = window.innerHeight;
      el.style.setProperty("--recede-origin", `${y + vh / 2}px`);
      el.style.setProperty("--clip-top", `${y}px`);
      el.style.setProperty("--clip-bottom", `${Math.max(0, el.offsetHeight - y - vh)}px`);
      el.dataset.recede = "off";
      root.dataset.recede = "";
      const frame = requestAnimationFrame(() => requestAnimationFrame(() => (el.dataset.recede = "on")));
      return () => cancelAnimationFrame(frame);
    }

    if (!editorOpen && el.dataset.recede) {
      el.dataset.recede = "off";
      const timer = setTimeout(() => {
        delete el.dataset.recede;
        delete root.dataset.recede;
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [editorOpen]);

  return (
    <div id="app-shell" ref={ref} className="flex min-h-full flex-1 flex-col">
      {children}
    </div>
  );
}
