"use client";

import { Menu, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { useProfile } from "@/components/profile-provider";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HEADER_ROW, NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

function ProfileButton({ className }: { className?: string }) {
  const { personal, ready, setEditorOpen } = useProfile();
  return (
    <button
      type="button"
      onClick={() => setEditorOpen(true)}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-white/80 px-3.5 text-sm text-cocoa backdrop-blur transition-colors hover:border-latte hover:bg-sand",
        !ready && "invisible",
        className,
      )}
    >
      <UserRound className="size-4 text-primary" />
      <span className="max-w-32 truncate">{personal?.name || (personal ? "Мой профиль" : "Заполнить профиль")}</span>
      {personal && <span className="text-muted-foreground">· {personal.grade} кл.</span>}
    </button>
  );
}

export function SiteHeader({ variant = "default" }: { variant?: "default" | "home" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "z-40 w-full",
        variant === "default" && "sticky top-0 border-b border-border/70 bg-white/85 backdrop-blur-md",
      )}
    >
      <div className={cn("flex items-center justify-between gap-6", HEADER_ROW)}>
        <Link href="/" aria-label="Ориентир — на главную" className="shrink-0">
          <Logo />
        </Link>

        {variant === "default" && (
          <nav aria-label="Разделы" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.92rem] transition-colors",
                    active ? "bg-secondary text-cocoa" : "text-muted-foreground hover:text-cocoa",
                  )}
                >
                  {item.label}
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
                className="inline-flex size-10 items-center justify-center rounded-full border border-border text-cocoa lg:hidden"
                aria-label="Открыть меню"
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm bg-white p-6">
                <SheetTitle className="sr-only">Меню</SheetTitle>
                <nav aria-label="Разделы" className="mt-10 flex flex-col">
                  {NAV.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-border py-4"
                    >
                      <span className="font-display text-base text-latte">0{i + 1}</span>
                      <span className="font-display text-2xl text-cocoa">{item.label}</span>
                    </Link>
                  ))}
                </nav>
                <ProfileButton className="mt-8 w-full justify-center" />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
