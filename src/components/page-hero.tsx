import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-7xl px-5 pb-10 pt-12 md:px-10 md:pt-16", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-latte">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-[2.6rem] leading-[1.05] text-cocoa sm:text-6xl">{title}</h1>
      {children && <div className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground">{children}</div>}
    </section>
  );
}

export function SectionTitle({ children, id, className }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <h2 id={id} className={cn("scroll-mt-28 font-display text-3xl leading-tight text-cocoa sm:text-4xl", className)}>
      {children}
    </h2>
  );
}
