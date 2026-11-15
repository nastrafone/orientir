"use client";

import { Menu, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { useProfile } from "@/components/profile-provider";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCompactTitle } from "@/lib/compact-title";
import { NAV_BACK, NAV_TAB, SPRING_SNAPPY } from "@/lib/motion";
import { HEADER_ROW, NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

function ProfileButton({ className, onOpen }: { className?: string; onOpen?: () => void }) {
  const { personal, ready, setEditorOpen } = useProfile();
  return (
    <button
      type="button"
      onClick={() => {
        onOpen?.();
        setEditorOpen(true);
      }}
      className={cn(
        "pressable inline-flex h-10 items-center gap-2 rounded-full border border-border bg-white/80 px-3.5 text-sm text-ink backdrop-blur hover:border-brass hover:bg-paper",
        !ready && "invisible",
        className,
      )}
    >
      <UserRound className="size-4 text-brass" />
      <span className="max-w-32 truncate">{personal?.name || (personal ? "Мой профиль" : "Заполнить профиль")}</span>
      {personal && <span className="text-muted-foreground">· {personal.grade} кл.</span>}
    </button>
  );
}

/** Как навбар в iOS: прозрачный наверху, полупрозрачный «материал» с тонкой линией, когда под ним прокручивается контент. */
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 4));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);
  return scrolled;
}

export function SiteHeader({ variant = "default" }: { variant?: "default" | "home" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const compact = useCompactTitle();
  const showCompact = variant === "default" && compact.visible;

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "z-40 w-full",
        variant === "default" &&
          "sticky top-0 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
        variant === "default" &&
          (scrolled
            ? "border-border/70 bg-white/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-white/0"),
      )}
    >
      <div className={cn("relative flex items-center justify-between gap-6", HEADER_ROW)}>
        <Link href="/" transitionTypes={NAV_BACK} aria-label="Ориентир — на главную" className="pressable shrink-0">
          <Logo compact={showCompact} />
        </Link>

        {/* Компактный заголовок страницы — на телефоне и планшете, когда большой заголовок уехал под шапку. */}
        <AnimatePresence>
          {showCompact && (
            <motion.p
              key={compact.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={SPRING_SNAPPY}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 max-w-[48vw] -translate-x-1/2 truncate text-[0.95rem] font-semibold text-ink lg:hidden"
            >
              {compact.title}
            </motion.p>
          )}
        </AnimatePresence>

        {variant === "default" && (
          <nav aria-label="Разделы" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  transitionTypes={NAV_TAB}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "pressable relative rounded-full px-4 py-2 text-[0.92rem]",
                    active ? "text-ink" : "text-muted-foreground hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={SPRING_SNAPPY}
                      className="absolute inset-0 rounded-full bg-secondary"
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <ProfileButton className="hidden sm:inline-flex" />
          {variant === "default" && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="pressable inline-flex size-10 items-center justify-center rounded-full border border-border bg-white/70 text-ink lg:hidden"
                aria-label="Открыть меню"
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm rounded-l-[28px] bg-white p-6">
                <SheetTitle className="sr-only">Меню</SheetTitle>
                <nav aria-label="Разделы" className="mt-10 flex flex-col">
                  {NAV.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...SPRING_SNAPPY, delay: 0.06 + i * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        transitionTypes={NAV_TAB}
                        onClick={() => setOpen(false)}
                        className="pressable flex items-baseline gap-4 border-b border-border py-4"
                      >
                        <span className="font-display text-base text-brass">0{i + 1}</span>
                        <span className="font-display text-2xl text-ink">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <ProfileButton className="mt-8 w-full justify-center" onOpen={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
