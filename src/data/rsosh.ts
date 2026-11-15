// Сгенерировано из официального перечня олимпиад школьников на 2026/27 учебный год (rsr-olymp.ru).
// Приказ Минобрнауки России № 521 от 31.08.2026. Не редактировать вручную — данные обновляются генератором.

export const RSOSH_SOURCE = {
  year: "2026/27",
  order: "Приказ Минобрнауки России № 521 от 31.08.2026",
  orderUrl: "http://publication.pravo.gov.ru/document/0001202609300016",
  listUrl: "https://rsr-olymp.ru",
};

export interface RsoshOlympiad {
  n: number;
  name: string;
  short: string;
  slug: string;
  organizer: string;
  site: string;
  profiles: { name: string; level: 1 | 2 | 3 }[];
}

export const RSOSH: RsoshOlympiad[] = [
  {
    "n": 1,
    "name": "XIX Южно-Российская межрегиональная олимпиада школьников «Архитектура и искусство» по комплексу предметов (рисунок, живопись, композиция, черчение)",
    "short": "«Архитектура и искусство»",
    "slug": "arhitektura-i-iskusstvo",
    "organizer": "Южный федеральный университет",
    "site": "http://www.raai.sfedu.ru/",
    "profiles": [
      {
        "name": "рисунок, живопись, композиция, черчение",
        "level": 1
      }
    ]
  },
  {
    "n": 2,
    "name": "Всероссийская академическая олимпиада школьников имени В.И. Вернадского",
    "short": "Олимпиада им. Вернадского",
    "slug": "vernadskiy",
    "organizer": "",
    "site": "https://vernadsky.online",
    "profiles": [
      {
        "name": "гуманитарные и социальные науки",
        "level": 1
      },
      {
        "name": "экономика",
        "level": 1
      }
    ]
  },
  {
    "n": 3,
    "name": "Всероссийская междисциплинарная олимпиада школьников 8–11 классов «Национальная технологическая олимпиада»",
    "short": "НТО",
    "slug": "nto",
    "organizer": "Кружковое движение НТИ и вузы-партнёры",
    "site": "http://ntcontest.ru",
    "profiles": [
      {
        "name": "инфохимия",
        "level": 3
      },
      {
        "name": "летающая робототехника",
        "level": 3
      },
      {
        "name": "беспилотные авиационные системы",
        "level": 3
      },
      {
        "name": "информационная безопасность",
        "level": 3
      },
      {
        "name": "виртуальная реальность: разработка компьютерных игр, технологии виртуальной реальности, технологии дополненной реальности",
        "level": 3
      },
      {
        "name": "разработка мобильных приложений",
        "level": 3
      },
      {
        "name": "технологии беспроводной связи",
        "level": 2
      },
      {
        "name": "интеллектуальные робототехнические системы",
        "level": 2
      },
      {
        "name": "большие данные и машинное обучение",
        "level": 3
      },
      {
        "name": "автономные транспортные системы",
        "level": 2
      },
      {
        "name": "искусственный интеллект",
        "level": 2
      },
      {
        "name": "автоматизация бизнес-процессов",
        "level": 2
      },
      {
        "name": "программная инженерия в финансовых технологиях",
        "level": 3
      },
      {
        "name": "интеллектуальные энергетические системы",
        "level": 3
      },
      {
        "name": "инженерные биологические системы",
        "level": 3
      },
      {
        "name": "анализ космических снимков и геопространственных данных",
        "level": 2
      },
      {
        "name": "квантовый инжиниринг",
        "level": 3
      },
      {
        "name": "ядерные технологии",
        "level": 2
      },
      {
        "name": "геномное редактирование",
        "level": 3
      },
      {
        "name": "спутниковые и аэрокосмические системы",
        "level": 3
      },
      {
        "name": "наносистемы и химический инжиниринг",
        "level": 3
      }
    ]
  },
  {
    "n": 4,
    "name": "Всероссийская олимпиада по агрогенетике «Иннагрика»",
    "short": "«Иннагрика»",
    "slug": "innagrika",
    "organizer": "",
    "site": "https://innagrika.ru",
    "profiles": [
      {
        "name": "аграрная генетика",
        "level": 1
      }
    ]
  },
  {
    "n": 5,
    "name": "Всероссийская олимпиада по искусственному интеллекту (с возможностью участия иностранных обучающихся)",
    "short": "Олимпиада по искусственному интеллекту",
    "slug": "iskusstvennyy-intellekt",
    "organizer": "",
    "site": "https://ai.edu.gov.ru/",
    "profiles": [
      {
        "name": "искусственный интеллект",
        "level": 2
      }
    ]
  },
  {
    "n": 6,
    "name": "Всероссийская олимпиада школьников «Высшая проба»",
    "short": "Высшая проба",
    "slug": "vysshaya-proba",
    "organizer": "НИУ ВШЭ",
    "site": "http://olymp.hse.ru/mmo",
    "profiles": [
      {
        "name": "биология",
        "level": 2
      },
      {
        "name": "востоковедение",
        "level": 2
      },
      {
        "name": "дизайн",
        "level": 1
      },
      {
        "name": "восточные языки",
        "level": 2
      },
      {
        "name": "иностранный язык",
        "level": 1
      },
      {
        "name": "информатика",
        "level": 1
      },
      {
        "name": "инженерные науки",
        "level": 2
      },
      {
        "name": "история искусств",
        "level": 2
      },
      {
        "name": "история",
        "level": 1
      },
      {
        "name": "промышленное программирование",
        "level": 2
      },
      {
        "name": "культурология",
        "level": 1
      },
      {
        "name": "математика",
        "level": 1
      },
      {
        "name": "обществознание",
        "level": 1
      },
      {
        "name": "международные отношения",
        "level": 2
      },
      {
        "name": "право",
        "level": 1
      },
      {
        "name": "психология",
        "level": 2
      },
      {
        "name": "русский язык",
        "level": 1
      },
      {
        "name": "социология",
        "level": 1
      },
      {
        "name": "журналистика",
        "level": 1
      },
      {
        "name": "философия",
        "level": 2
      },
      {
        "name": "химия",
        "level": 1
      },
      {
        "name": "финансовая грамотность",
        "level": 1
      },
      {
        "name": "экономика",
        "level": 1
      },
      {
        "name": "основы бизнеса",
        "level": 2
      },
      {
        "name": "филология",
        "level": 1
      }
    ]
  },
  {
    "n": 7,
    "name": "Всероссийская олимпиада школьников «Миссия выполнима Твое призвание - финансист!»",
    "short": "Миссия выполнима",
    "slug": "finansist",
    "organizer": "Финансовый университет при Правительстве РФ",
    "site": "https://www.fa.ru/for-applicants/olympiads/mission/",
    "profiles": [
      {
        "name": "иностранный язык",
        "level": 3
      },
      {
        "name": "история",
        "level": 3
      },
      {
        "name": "обществознание",
        "level": 3
      },
      {
        "name": "финансовая грамотность",
        "level": 2
      },
      {
        "name": "экономика",
        "level": 2
      }
    ]
  },
  {
    "n": 8,
    "name": "Всероссийская олимпиада школьников «Юридические высоты!»",
    "short": "«Юридические высоты!»",
    "slug": "yuridicheskie-vysoty",
    "organizer": "Уральский государственный юридический университет",
    "site": "https://usla.ru/",
    "profiles": [
      {
        "name": "право",
        "level": 2
      }
    ]
  },
  {
    "n": 9,
    "name": "Всероссийская Сеченовская олимпиада школьников",
    "short": "Сеченовская олимпиада",
    "slug": "sechenovskaya",
    "organizer": "Сеченовский университет",
    "site": "https://www.sechenov.ru/univers/structure/facultie/dovuz/olimpiady/",
    "profiles": [
      {
        "name": "биология",
        "level": 2
      },
      {
        "name": "химия",
        "level": 2
      }
    ]
  },
  {
    "n": 10,
    "name": "Всероссийская Толстовская олимпиада",
    "short": "Толстовская олимпиада",
    "slug": "tolstovskaya",
    "organizer": "ТГПУ им. Л. Н. Толстого",
    "site": "https://olymp.tsput.ru/",
    "profiles": [
      {
        "name": "история",
        "level": 3
      },
      {
        "name": "литература",
        "level": 3
      },
      {
        "name": "обществознание",
        "level": 3
      },
      {
        "name": "право",
        "level": 3
      }
    ]
  },
  {
    "n": 11,
    "name": "Всесибирская открытая олимпиада школьников",
    "short": "Всесиб",
    "slug": "vsesib",
    "organizer": "Новосибирский государственный университет",
    "site": "https://sesc.nsu.ru/olymp-vsesib/",
    "profiles": [
      {
        "name": "биология",
        "level": 2
      },
      {
        "name": "информатика",
        "level": 1
      },
      {
        "name": "математика",
        "level": 2
      },
      {
        "name": "физика",
        "level": 2
      },
      {
        "name": "химия",
        "level": 1
      }
    ]
  },
  {
    "n": 12,
    "name": "Герценовская олимпиада школьников",
    "short": "Герценовская олимпиада",
    "slug": "gertsenovskaya",
    "organizer": "РГПУ им. А. И. Герцена",
    "site": "https://www.herzen.spb.ru/abiturients/olimpiady/olimp-rsosh/",
    "profiles": [
      {
        "name": "география",
        "level": 2
      },
      {
        "name": "иностранный язык",
        "level": 2
      },
      {
        "name": "образование и педагогика",
        "level": 3
      }
    ]
  },
  {
    "n": 13,
    "name": "Инженерная олимпиада школьников",
    "short": "Инженерная олимпиада школьников",
    "slug": "inzhenernaya",
    "organizer": "НИЯУ МИФИ и вузы-партнёры",
    "site": "https://olymp.mephi.ru/engineering/about",
    "profiles": [
      {
        "name": "физика",
        "level": 1
      }
    ]
  },
  {
    "n": 14,
    "name": "Интернет-олимпиада школьников по физике",
    "short": "Интернет-олимпиада по физике",
    "slug": "internet-olimpiada-fizika",
    "organizer": "СПбГУ",
    "site": "https://distolymp2.spbu.ru/",
    "profiles": [
      {
        "name": "физика",
        "level": 2
      }
    ]
  },
  {
    "n": 15,
    "name": "Кутафинская олимпиада школьников по праву",
    "short": "Кутафинская олимпиада",
    "slug": "kutafinskaya",
    "organizer": "МГЮА им. О. Е. Кутафина",
    "site": "https://msal.ru/content/abiturientam/olimpiady-i-konkursy/kutafinskaya-olimpiada-shkolnikov-po-pravu/",
    "profiles": [
      {
        "name": "право",
        "level": 1
      }
    ]
  },
  {
    "n": 16,
    "name": "Международная олимпиада Иннополиса",
    "short": "Innopolis Open",
    "slug": "innopolis-open",
    "organizer": "Университет Иннополис",
    "site": "https://dovuz.innopolis.university/innopolis-open",
    "profiles": [
      {
        "name": "информатика",
        "level": 2
      },
      {
        "name": "информационная безопасность",
        "level": 2
      },
      {
        "name": "искусственный интеллект",
        "level": 3
      },
      {
        "name": "робототехника",
        "level": 3
      },
      {
        "name": "математика",
        "level": 2
      }
    ]
  },
  {
    "n": 17,
    "name": "Международная олимпиада по финансовой безопасности",
    "short": "Олимпиада по финансовой безопасности",
    "slug": "finansovaya-bezopasnost",
    "organizer": "",
    "site": "https://rosfinolymp.ru",
    "profiles": [
      {
        "name": "финансовая безопасность",
        "level": 1
      }
    ]
  },
  {
    "n": 18,
    "name": "Международная олимпиада школьников «Евразийская лингвистическая олимпиада»",
    "short": "Евразийская лингвистическая олимпиада",
    "slug": "evraziyskaya-lingvisticheskaya",
    "organizer": "МГЛУ",
    "site": "https://elo.linguanet.ru",
    "profiles": [
      {
        "name": "иностранный язык",
        "level": 2
      }
    ]
  },
  {
    "n": 19,
    "name": "Международная олимпиада школьников Уральского федерального университета «Изумруд»",
    "short": "«Изумруд»",
    "slug": "izumrud",
    "organizer": "Уральский федеральный университет",
    "site": "https://dovuz.urfu.ru/olymps/izumrud",
    "profiles": [
      {
        "name": "информатика",
        "level": 2
      },
      {
        "name": "история",
        "level": 3
      },
      {
        "name": "математика",
        "level": 3
      },
      {
        "name": "обществознание",
        "level": 3
      },
      {
        "name": "русский язык",
        "level": 3
      },
      {
        "name": "химия",
        "level": 3
      }
    ]
  },
  {
    "n": 20,
    "name": "Межрегиональная олимпиада школьников «Будущие исследователи - будущее науки»",
    "short": "Будущие исследователи",
    "slug": "budushchie-issledovateli",
    "organizer": "ННГУ им. Н. И. Лобачевского",
    "site": "https://bibn.unn.ru",
    "profiles": [
      {
        "name": "биология",
        "level": 2
      },
      {
        "name": "история",
        "level": 2
      },
      {
        "name": "математика",
        "level": 3
      },
      {
        "name": "русский язык",
        "level": 3
      },
      {
        "name": "физика",
        "level": 3
      },
      {
        "name": "химия",
        "level": 2
      }
    ]
  },
  {
    "n": 21,
    "name": "Межрегиональная олимпиада школьников имени И.Я. Верченко",
    "short": "Олимпиада им. Верченко",
    "slug": "verchenko",
    "organizer": "",
    "site": "https://v-olymp.ru/",
    "profiles": [
      {
        "name": "компьютерная безопасность",
        "level": 2
      },
      {
        "name": "математика и криптография",
        "level": 2
      }
    ]
  },
  {
    "n": 22,
    "name": "Межрегиональная олимпиада школьников на базе ведомственных образовательных организаций",
    "short": "Олимпиада ведомственных вузов",
    "slug": "vedomstvennye-vuzy",
    "organizer": "",
    "site": "https://v-olymp.ru/",
    "profiles": [
      {
        "name": "биология",
        "level": 3
      },
      {
        "name": "иностранный язык",
        "level": 2
      },
      {
        "name": "обществознание",
        "level": 3
      },
      {
        "name": "русский язык",
        "level": 3
      },
      {
        "name": "физика",
        "level": 3
      }
    ]
  },
  {
    "n": 23,
    "name": "Межрегиональные предметные олимпиады федерального государственного автономного образовательного учреждения высшего образования «Казанский (Приволжский) федеральный университет»",
    "short": "Олимпиады КФУ",
    "slug": "kfu",
    "organizer": "Казанский федеральный университет",
    "site": "https://malun.kpfu.ru/mpo",
    "profiles": [
      {
        "name": "биология",
        "level": 3
      },
      {
        "name": "дизайн",
        "level": 1
      },
      {
        "name": "иностранный язык",
        "level": 2
      },
      {
        "name": "история",
        "level": 3
      },
      {
        "name": "право",
        "level": 3
      },
      {
        "name": "русский язык",
        "level": 2
      },
      {
        "name": "физика",
        "level": 2
      },
      {
        "name": "химия",
        "level": 1
      }
    ]
  },
  {
    "n": 24,
    "name": "Многопредметная олимпиада «Юные таланты»",
    "short": "«Юные таланты»",
    "slug": "yunye-talanty",
    "organizer": "Пермский государственный национальный исследовательский университет",
    "site": "https://psu.ru/for-applicants/olymp/",
    "profiles": [
      {
        "name": "география",
        "level": 1
      },
      {
        "name": "геология",
        "level": 3
      },
      {
        "name": "химия",
        "level": 1
      }
    ]
  },
  {
    "n": 25,
    "name": "Многопрофильная инженерная олимпиада «Звезда»",
    "short": "«Звезда»",
    "slug": "zvezda",
    "organizer": "Южно-Уральский государственный университет",
    "site": "http://zv.susu.ru/",
    "profiles": [
      {
        "name": "естественные науки",
        "level": 2
      },
      {
        "name": "техника и технологии",
        "level": 1
      }
    ]
  },
  {
    "n": 26,
    "name": "Московская олимпиада школьников",
    "short": "МОШ",
    "slug": "mosh",
    "organizer": "Департамент образования и науки Москвы",
    "site": "https://мош.цпм.рф",
    "profiles": [
      {
        "name": "астрономия",
        "level": 1
      },
      {
        "name": "генетика",
        "level": 2
      },
      {
        "name": "география",
        "level": 1
      },
      {
        "name": "лингвистика",
        "level": 1
      },
      {
        "name": "информатика",
        "level": 1
      },
      {
        "name": "предпрофессиональная",
        "level": 3
      },
      {
        "name": "изобразительное искусство",
        "level": 1
      },
      {
        "name": "история искусств",
        "level": 1
      },
      {
        "name": "история",
        "level": 2
      },
      {
        "name": "вероятность и статистика",
        "level": 2
      },
      {
        "name": "математика",
        "level": 1
      },
      {
        "name": "робототехника",
        "level": 2
      },
      {
        "name": "экология",
        "level": 3
      },
      {
        "name": "обществознание",
        "level": 2
      },
      {
        "name": "право",
        "level": 3
      },
      {
        "name": "физика",
        "level": 1
      },
      {
        "name": "химия",
        "level": 1
      },
      {
        "name": "финансовая грамотность",
        "level": 3
      },
      {
        "name": "экономика",
        "level": 3
      }
    ]
  },
  {
    "n": 27,
    "name": "Московская открытая олимпиада школьников по геологии",
    "short": "Олимпиада по геологии",
    "slug": "geologiya",
    "organizer": "",
    "site": "http://geoschool.web.ru/olympiad/",
    "profiles": [
      {
        "name": "геология",
        "level": 1
      }
    ]
  },
  {
    "n": 28,
    "name": "Общероссийская олимпиада школьников «Основы православной культуры»",
    "short": "«Основы православной культуры»",
    "slug": "opk",
    "organizer": "",
    "site": "http://www.pravolimp.ru",
    "profiles": [
      {
        "name": "основы православной культуры",
        "level": 3
      }
    ]
  },
  {
    "n": 29,
    "name": "Объединенная межвузовская олимпиада школьников",
    "short": "ОММО",
    "slug": "ommo",
    "organizer": "вузы Москвы",
    "site": "https://olympiads.mccme.ru/omo/",
    "profiles": [
      {
        "name": "математика",
        "level": 2
      },
      {
        "name": "физика",
        "level": 3
      }
    ]
  },
  {
    "n": 30,
    "name": "Олимпиада Курчатов",
    "short": "Курчатов",
    "slug": "kurchatov",
    "organizer": "НИЦ «Курчатовский институт»",
    "site": "https://olimpiadakurchatov.ru",
    "profiles": [
      {
        "name": "математика",
        "level": 2
      },
      {
        "name": "физика",
        "level": 2
      }
    ]
  },
  {
    "n": 31,
    "name": "Олимпиада МГИМО МИД России для школьников",
    "short": "Олимпиада МГИМО",
    "slug": "mgimo",
    "organizer": "МГИМО МИД России",
    "site": "https://olymp.mgimo.ru",
    "profiles": [
      {
        "name": "гуманитарные и социальные науки",
        "level": 2
      }
    ]
  },
  {
    "n": 32,
    "name": "Олимпиада по комплексу предметов «Культура и искусство»",
    "short": "«Культура и искусство»",
    "slug": "kultura-i-iskusstvo",
    "organizer": "",
    "site": "http://olimp.prouniver.ru",
    "profiles": [
      {
        "name": "технический рисунок и декоративная композиция",
        "level": 1
      },
      {
        "name": "академический рисунок, живопись, композиция, история искусства и культуры",
        "level": 1
      }
    ]
  },
  {
    "n": 33,
    "name": "Олимпиада РГГУ для школьников",
    "short": "Олимпиада РГГУ",
    "slug": "rggu",
    "organizer": "РГГУ",
    "site": "https://www.rggu.ru",
    "profiles": [
      {
        "name": "иностранный язык",
        "level": 2
      },
      {
        "name": "история",
        "level": 2
      },
      {
        "name": "литература",
        "level": 1
      },
      {
        "name": "обществознание",
        "level": 2
      },
      {
        "name": "русский язык",
        "level": 2
      }
    ]
  },
  {
    "n": 34,
    "name": "Олимпиада школьников «Гранит науки»",
    "short": "«Гранит науки»",
    "slug": "granit-nauki",
    "organizer": "Санкт-Петербургский горный университет",
    "site": "http://ogn.spmi.ru",
    "profiles": [
      {
        "name": "информатика",
        "level": 2
      },
      {
        "name": "естественные науки",
        "level": 3
      }
    ]
  },
  {
    "n": 35,
    "name": "Олимпиада школьников «Ломоносов»",
    "short": "Ломоносов",
    "slug": "lomonosov",
    "organizer": "МГУ имени М. В. Ломоносова",
    "site": "https://olymp.msu.ru",
    "profiles": [
      {
        "name": "генетика",
        "level": 2
      },
      {
        "name": "экология",
        "level": 2
      },
      {
        "name": "биология",
        "level": 1
      },
      {
        "name": "география",
        "level": 1
      },
      {
        "name": "геология",
        "level": 1
      },
      {
        "name": "иностранный язык",
        "level": 2
      },
      {
        "name": "информатика",
        "level": 2
      },
      {
        "name": "международные отношения и глобалистика",
        "level": 1
      },
      {
        "name": "политология",
        "level": 2
      },
      {
        "name": "история",
        "level": 1
      },
      {
        "name": "основы российской государственности",
        "level": 1
      },
      {
        "name": "литература",
        "level": 1
      },
      {
        "name": "математика",
        "level": 1
      },
      {
        "name": "космонавтика",
        "level": 2
      },
      {
        "name": "механика и математическое моделирование",
        "level": 2
      },
      {
        "name": "робототехника",
        "level": 2
      },
      {
        "name": "высокие технологии",
        "level": 2
      },
      {
        "name": "обществознание",
        "level": 1
      },
      {
        "name": "психология",
        "level": 1
      },
      {
        "name": "русский язык",
        "level": 1
      },
      {
        "name": "журналистика",
        "level": 1
      },
      {
        "name": "физика",
        "level": 1
      },
      {
        "name": "религиоведение",
        "level": 2
      },
      {
        "name": "философия",
        "level": 1
      },
      {
        "name": "фундаментальная медицина",
        "level": 2
      },
      {
        "name": "химия",
        "level": 1
      },
      {
        "name": "право",
        "level": 1
      }
    ]
  },
  {
    "n": 36,
    "name": "Олимпиада школьников «Надежда энергетики»",
    "short": "«Надежда энергетики»",
    "slug": "nadezhda-energetiki",
    "organizer": "НИУ «МЭИ»",
    "site": "http://www.energy-hope.ru",
    "profiles": [
      {
        "name": "физика",
        "level": 3
      }
    ]
  },
  {
    "n": 37,
    "name": "Олимпиада школьников «Покори Воробьевы горы!»",
    "short": "ПВГ",
    "slug": "pvg",
    "organizer": "МГУ имени М. В. Ломоносова и ИД «Московский комсомолец»",
    "site": "https://pvg.mk.ru",
    "profiles": [
      {
        "name": "география",
        "level": 2
      },
      {
        "name": "иностранный язык",
        "level": 1
      },
      {
        "name": "история",
        "level": 1
      },
      {
        "name": "литература",
        "level": 1
      },
      {
        "name": "математика",
        "level": 1
      },
      {
        "name": "обществознание",
        "level": 1
      },
      {
        "name": "журналистика",
        "level": 1
      },
      {
        "name": "физика",
        "level": 1
      }
    ]
  },
  {
    "n": 38,
    "name": "Олимпиада школьников «Физтех»",
    "short": "Физтех",
    "slug": "fiztekh",
    "organizer": "МФТИ",
    "site": "https://olymp-online.mipt.ru",
    "profiles": [
      {
        "name": "биология",
        "level": 2
      },
      {
        "name": "информатика и программирование",
        "level": 2
      },
      {
        "name": "математика",
        "level": 1
      },
      {
        "name": "научно-технический",
        "level": 2
      },
      {
        "name": "инженерное дело",
        "level": 2
      },
      {
        "name": "физика",
        "level": 1
      },
      {
        "name": "химия",
        "level": 3
      }
    ]
  },
  {
    "n": 39,
    "name": "Олимпиада школьников «Шаг в будущее»",
    "short": "Шаг в будущее",
    "slug": "shag-v-budushchee",
    "organizer": "МГТУ им. Н. Э. Баумана",
    "site": "https://olymp.bmstu.ru",
    "profiles": [
      {
        "name": "информатика",
        "level": 3
      },
      {
        "name": "инженерное дело",
        "level": 2
      },
      {
        "name": "компьютерное моделирование и графика",
        "level": 3
      },
      {
        "name": "математика",
        "level": 3
      },
      {
        "name": "физика",
        "level": 2
      },
      {
        "name": "химия",
        "level": 3
      }
    ]
  },
  {
    "n": 40,
    "name": "Олимпиада школьников по информатике и программированию",
    "short": "Олимпиада ИТМО по информатике",
    "slug": "itmo-informatika",
    "organizer": "Университет ИТМО",
    "site": "https://nerc.itmo.ru/school",
    "profiles": [
      {
        "name": "информатика",
        "level": 1
      }
    ]
  },
  {
    "n": 41,
    "name": "Олимпиада школьников по программированию «ТехноКубок»",
    "short": "ТехноКубок",
    "slug": "tekhnokubok",
    "organizer": "МФТИ и VK",
    "site": "https://techno-cup.ru/",
    "profiles": [
      {
        "name": "информатика",
        "level": 1
      }
    ]
  },
  {
    "n": 42,
    "name": "Олимпиада школьников Российской академии народного хозяйства и государственной службы при Президенте Российской Федерации",
    "short": "Олимпиада РАНХиГС",
    "slug": "ranhigs",
    "organizer": "РАНХиГС",
    "site": "https://www.ranepa.ru/olymp/",
    "profiles": [
      {
        "name": "иностранный язык",
        "level": 3
      },
      {
        "name": "история",
        "level": 2
      },
      {
        "name": "обществознание",
        "level": 2
      },
      {
        "name": "политология",
        "level": 2
      },
      {
        "name": "журналистика",
        "level": 2
      },
      {
        "name": "финансовая грамотность",
        "level": 2
      },
      {
        "name": "экономика",
        "level": 3
      }
    ]
  },
  {
    "n": 43,
    "name": "Олимпиада школьников Санкт-Петербургского государственного университета",
    "short": "Олимпиада СПбГУ",
    "slug": "spbgu",
    "organizer": "СПбГУ",
    "site": "http://www.olympiada.spbu.ru/ ",
    "profiles": [
      {
        "name": "биология",
        "level": 1
      },
      {
        "name": "география",
        "level": 1
      },
      {
        "name": "иностранный язык",
        "level": 1
      },
      {
        "name": "филология",
        "level": 1
      },
      {
        "name": "информатика",
        "level": 1
      },
      {
        "name": "математическое моделирование и искусственный интеллект",
        "level": 3
      },
      {
        "name": "история",
        "level": 1
      },
      {
        "name": "медицина",
        "level": 2
      },
      {
        "name": "математика",
        "level": 1
      },
      {
        "name": "инженерные системы",
        "level": 3
      },
      {
        "name": "обществознание",
        "level": 1
      },
      {
        "name": "гуманитарные и социальные науки",
        "level": 1
      },
      {
        "name": "международные отношения",
        "level": 2
      },
      {
        "name": "политология",
        "level": 2
      },
      {
        "name": "право",
        "level": 1
      },
      {
        "name": "психология",
        "level": 3
      },
      {
        "name": "журналистика",
        "level": 1
      },
      {
        "name": "физика",
        "level": 2
      },
      {
        "name": "философия",
        "level": 2
      },
      {
        "name": "химия",
        "level": 2
      },
      {
        "name": "экономика",
        "level": 2
      }
    ]
  },
  {
    "n": 44,
    "name": "Олимпиада школьников федерального государственного бюджетного образовательного учреждения высшего образования «Всероссийский государственный университет юстиции (РПА Минюста России)» «В мир права»",
    "short": "«В мир права»",
    "slug": "v-mir-prava",
    "organizer": "Всероссийский государственный университет юстиции",
    "site": "https://olimp.rpa-mu.ru/",
    "profiles": [
      {
        "name": "право",
        "level": 2
      }
    ]
  },
  {
    "n": 45,
    "name": "Олимпиада Юношеской математической школы",
    "short": "Олимпиада ЮМШ",
    "slug": "yumsh",
    "organizer": "СПбГУ",
    "site": "http://yumsh.spbu.ru",
    "profiles": [
      {
        "name": "математика",
        "level": 2
      }
    ]
  },
  {
    "n": 46,
    "name": "Открытая межвузовская олимпиада школьников «Будущее Сибири»",
    "short": "«Будущее Сибири»",
    "slug": "budushchee-sibiri",
    "organizer": "Новосибирский государственный технический университет",
    "site": "https://olymp-sibir.nstu.ru/",
    "profiles": [
      {
        "name": "физика",
        "level": 3
      },
      {
        "name": "химия",
        "level": 2
      }
    ]
  },
  {
    "n": 47,
    "name": "Открытая олимпиада школьников",
    "short": "Открытая олимпиада",
    "slug": "otkrytaya",
    "organizer": "Университет ИТМО",
    "site": "https://olymp.itmo.ru/",
    "profiles": [
      {
        "name": "информатика",
        "level": 1
      },
      {
        "name": "математика",
        "level": 3
      },
      {
        "name": "физика",
        "level": 3
      }
    ]
  },
  {
    "n": 48,
    "name": "Открытая олимпиада школьников по программированию",
    "short": "Открытая олимпиада по программированию",
    "slug": "otkrytaya-programmirovanie",
    "organizer": "",
    "site": "http://www.olympiads.ru/zaoch/",
    "profiles": [
      {
        "name": "информатика",
        "level": 1
      }
    ]
  },
  {
    "n": 49,
    "name": "Открытая региональная межвузовская олимпиада школьников (ОРМО) с международным участием",
    "short": "ОРМО",
    "slug": "ormo",
    "organizer": "Томский государственный университет",
    "site": "http://abiturient.tsu.ru/ru/content/ormo",
    "profiles": [
      {
        "name": "география",
        "level": 3
      },
      {
        "name": "история",
        "level": 3
      },
      {
        "name": "литература",
        "level": 2
      },
      {
        "name": "русский язык",
        "level": 2
      },
      {
        "name": "физика",
        "level": 3
      },
      {
        "name": "химия",
        "level": 3
      }
    ]
  },
  {
    "n": 50,
    "name": "Открытая химическая олимпиада",
    "short": "Открытая химическая олимпиада",
    "slug": "himicheskaya",
    "organizer": "НИТУ МИСИС",
    "site": "https://oho.misis.ru",
    "profiles": [
      {
        "name": "химия",
        "level": 3
      }
    ]
  },
  {
    "n": 51,
    "name": "Отраслевая олимпиада школьников «Газпром»",
    "short": "«Газпром»",
    "slug": "gazprom",
    "organizer": "ПАО «Газпром» и вузы-партнёры",
    "site": "https://olympiad.gazprom.ru",
    "profiles": [
      {
        "name": "инженерное дело",
        "level": 3
      },
      {
        "name": "информационные и коммуникационные технологии",
        "level": 3
      },
      {
        "name": "физика",
        "level": 3
      }
    ]
  },
  {
    "n": 52,
    "name": "Отраслевая физико-математическая олимпиада школьников «Росатом»",
    "short": "Росатом",
    "slug": "rosatom",
    "organizer": "НИЯУ МИФИ и госкорпорация «Росатом»",
    "site": "https://olymp.mephi.ru/rosatom_it/",
    "profiles": [
      {
        "name": "математика",
        "level": 2
      },
      {
        "name": "физика",
        "level": 1
      },
      {
        "name": "информатика",
        "level": 1
      }
    ]
  },
  {
    "n": 53,
    "name": "Плехановская олимпиада школьников",
    "short": "Плехановская олимпиада",
    "slug": "plekhanovskaya",
    "organizer": "РЭУ им. Г. В. Плеханова",
    "site": "https://www.rea.ru/pk/entrant/posh",
    "profiles": [
      {
        "name": "иностранный язык",
        "level": 2
      },
      {
        "name": "финансовая грамотность",
        "level": 3
      },
      {
        "name": "экономика",
        "level": 2
      },
      {
        "name": "русский язык",
        "level": 2
      }
    ]
  },
  {
    "n": 54,
    "name": "Региональный конкурс школьников Челябинского университетского образовательного округа",
    "short": "Конкурс Челябинского университетского округа",
    "slug": "chelyabinskiy-okrug",
    "organizer": "Челябинский государственный университет",
    "site": "https://www.csu.ru/",
    "profiles": [
      {
        "name": "иностранный язык",
        "level": 3
      },
      {
        "name": "обществознание",
        "level": 3
      }
    ]
  },
  {
    "n": 55,
    "name": "Санкт-Петербургская олимпиада школьников",
    "short": "СПб олимпиада",
    "slug": "spb-olimpiada",
    "organizer": "Комитет по образованию Санкт-Петербурга",
    "site": "https://www.pdmi.ras.ru/~olymp",
    "profiles": [
      {
        "name": "математика",
        "level": 1
      },
      {
        "name": "физика",
        "level": 2
      },
      {
        "name": "химия",
        "level": 1
      }
    ]
  },
  {
    "n": 56,
    "name": "Северо-Восточная олимпиада школьников",
    "short": "Северо-Восточная олимпиада",
    "slug": "severo-vostochnaya",
    "organizer": "Северо-Восточный федеральный университет",
    "site": "https://olympiadsvosh.s-vfu.ru/",
    "profiles": [
      {
        "name": "родные языки",
        "level": 3
      }
    ]
  },
  {
    "n": 57,
    "name": "Телевизионная гуманитарная олимпиада школьников «Умницы и умники»",
    "short": "«Умницы и умники»",
    "slug": "umnitsy-i-umniki",
    "organizer": "МГИМО МИД России",
    "site": "https://abiturient.mgimo.ru/olimpiady/umniki",
    "profiles": [
      {
        "name": "гуманитарные и социальные науки",
        "level": 1
      }
    ]
  },
  {
    "n": 58,
    "name": "Турнир городов",
    "short": "Турнир городов",
    "slug": "turnir-gorodov",
    "organizer": "МЦНМО",
    "site": "http://www.turgor.ru/",
    "profiles": [
      {
        "name": "математика",
        "level": 1
      }
    ]
  },
  {
    "n": 59,
    "name": "Турнир имени М.В. Ломоносова",
    "short": "Турнир Ломоносова",
    "slug": "turnir-lomonosova",
    "organizer": "МЦНМО",
    "site": "http://turlom.olimpiada.ru/",
    "profiles": [
      {
        "name": "астрономия и науки о Земле",
        "level": 3
      },
      {
        "name": "биология",
        "level": 3
      },
      {
        "name": "лингвистика",
        "level": 2
      },
      {
        "name": "история",
        "level": 2
      },
      {
        "name": "литература",
        "level": 2
      },
      {
        "name": "математика",
        "level": 2
      },
      {
        "name": "физика",
        "level": 1
      },
      {
        "name": "химия",
        "level": 3
      }
    ]
  },
  {
    "n": 60,
    "name": "Университетская олимпиада школьников «Бельчонок»",
    "short": "«Бельчонок»",
    "slug": "belchonok",
    "organizer": "Сибирский федеральный университет",
    "site": "https://dovuz.sfu-kras.ru/abiturientu-sfu/olimpiady/belchonok/",
    "profiles": [
      {
        "name": "информатика",
        "level": 3
      },
      {
        "name": "математика",
        "level": 3
      },
      {
        "name": "физика",
        "level": 3
      },
      {
        "name": "химия",
        "level": 2
      }
    ]
  }
];
