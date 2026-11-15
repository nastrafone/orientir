import Link from "next/link";
import { Logo } from "@/components/logo";
import { NAV_TAB } from "@/lib/motion";
import { NAV } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Бесплатный навигатор для учеников 10–11 классов. Информация носит справочный характер: правила приёма и проходные баллы
            меняются каждый год — перед подачей документов сверяйтесь с официальными сайтами вузов.
          </p>
        </div>
        <nav aria-label="Разделы в подвале" className="flex flex-col gap-2.5 text-sm">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} transitionTypes={NAV_TAB} className="text-ink/80 transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2.5 text-sm">
          <Link href="/istochniki" transitionTypes={NAV_TAB} className="text-ink/80 transition-colors hover:text-ink">
            Источники и авторы фото
          </Link>
          <a href="https://fipi.ru" target="_blank" rel="noopener noreferrer" className="text-ink/80 transition-colors hover:text-ink">
            ФИПИ — демоверсии ЕГЭ
          </a>
          <a href="https://olimpiada.ru" target="_blank" rel="noopener noreferrer" className="text-ink/80 transition-colors hover:text-ink">
            Олимпиада.ру — календарь олимпиад
          </a>
          <p className="mt-4 text-xs text-muted-foreground">© 2026 Ориентир</p>
        </div>
      </div>
    </footer>
  );
}
