import Link from "next/link";
import { Logo } from "@/components/logo";
import { NAV_BACK } from "@/lib/motion";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <Logo />
      <p className="mt-10 font-display text-7xl text-brass">404</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Такой страницы нет</h1>
      <p className="mt-3 max-w-md text-muted-foreground">Похоже, мы сбились с курса. Вернись на главную — там весь маршрут.</p>
      <Link
        href="/"
        transitionTypes={NAV_BACK}
        className="pressable mt-8 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-white hover:bg-primary/85"
      >
        На главную
      </Link>
    </main>
  );
}
