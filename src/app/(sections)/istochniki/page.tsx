import { PageHero, SectionTitle } from "@/components/page-hero";
import { Screen } from "@/components/screen";
import { PHOTO_CREDITS } from "@/data/credits";
import { RSOSH_SOURCE } from "@/data/olympiads";
import { UNIVERSITIES } from "@/data/universities";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Источники данных и авторы фотографий",
  description: "Откуда взяты сведения о вузах и олимпиадах и кто автор фотографий на сайте «Ориентир».",
  path: "/istochniki",
});

const DATA_SOURCES = [
  { title: `Перечень олимпиад школьников на ${RSOSH_SOURCE.year} учебный год — ${RSOSH_SOURCE.order}`, url: RSOSH_SOURCE.orderUrl },
  { title: "Российский совет олимпиад школьников — перечень, профили и уровни", url: RSOSH_SOURCE.listUrl },
  { title: "Всероссийская олимпиада школьников — официальный сайт", url: "https://vserosolimp.edsoo.ru" },
  { title: "ФИПИ — демоверсии и спецификации ЕГЭ", url: "https://fipi.ru" },
];

export default function SourcesPage() {
  return (
    <Screen>
      <PageHero eyebrow="Источники" title="Источники и авторы фото">
        «Ориентир» — справочный ресурс. Проходные баллы — официальные цифры приёмных комиссий за указанный год (бюджет, общий
        конкурс); если вуз их не публикует, мы так и пишем и не подставляем оценки агрегаторов. Уровни олимпиад — по действующему
        перечню. Правила приёма пересматриваются ежегодно, поэтому перед подачей документов сверяйтесь с сайтом вуза.
      </PageHero>
      <div className="mx-auto max-w-7xl space-y-16 px-5 md:px-10">
        <section>
          <SectionTitle>Данные</SectionTitle>
          <ul className="mt-6 space-y-3 text-ink">
            {DATA_SOURCES.map((s) => (
              <li key={s.title}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    {s.title}
                  </a>
                ) : (
                  s.title
                )}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <SectionTitle>Приёмные комиссии</SectionTitle>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            Ссылка на страницу с конкретной цифрой стоит рядом с каждым проходным баллом на странице вуза.
          </p>
          <ul className="mt-6 grid gap-x-10 gap-y-3 text-sm md:grid-cols-2 lg:grid-cols-3">
            {UNIVERSITIES.map((u) => (
              <li key={u.slug}>
                <a href={u.admissionUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline-offset-4 hover:underline">
                  {u.short}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <SectionTitle>Фотографии</SectionTitle>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            Фотография главного здания МГУ на главной странице предоставлена автором проекта. Остальные фотографии — с Wikimedia
            Commons по свободным лицензиям; фон удалён, изображения уменьшены и сжаты.
          </p>
          <ul className="mt-8 grid gap-x-10 gap-y-4 text-sm md:grid-cols-2">
            {PHOTO_CREDITS.map((c) => (
              <li key={c.source} className="border-b border-border pb-4">
                <span className="font-medium text-ink">{c.subject}</span>
                <span className="block text-muted-foreground">
                  Автор: {c.author || "не указан"} ·{" "}
                  {c.licenseUrl ? (
                    <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline-offset-4 hover:underline">
                      {c.license}
                    </a>
                  ) : (
                    c.license
                  )}{" "}
                  ·{" "}
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    Источник
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Screen>
  );
}
