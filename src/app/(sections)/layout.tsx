import { SectionScreen } from "@/components/screen";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <SectionScreen>
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </SectionScreen>
    </>
  );
}
