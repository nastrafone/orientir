import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AppShell, MotionRoot } from "@/components/app-shell";
import { Intro } from "@/components/intro";
import { ProfileDialog } from "@/components/profile-dialog";
import { ProfileProvider } from "@/components/profile-provider";
import { SITE } from "@/lib/site";
import { PROFILE_KEY, SPLASH_KEY } from "@/lib/storage-keys";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "поступление в вуз",
    "олимпиады школьников",
    "проходные баллы",
    "ЕГЭ",
    "10 класс",
    "11 класс",
    "БВИ",
    "подготовительные курсы",
    "профессии будущего",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

// Выполняется до первой отрисовки: повторный визит в той же сессии не показывает заставку.
const introFlagScript = `try{if(sessionStorage.getItem(${JSON.stringify(SPLASH_KEY)})&&localStorage.getItem(${JSON.stringify(PROFILE_KEY)})){document.documentElement.dataset.intro="skip"}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introFlagScript }} />
        <noscript>
          <style>{`#intro-overlay{display:none}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <ProfileProvider>
          <MotionRoot>
            <Intro />
            <AppShell>{children}</AppShell>
            <ProfileDialog />
          </MotionRoot>
        </ProfileProvider>
      </body>
    </html>
  );
}
