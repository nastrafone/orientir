import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-9", className)} aria-hidden="true">
      <circle cx="24" cy="24" r="21.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M24 2.5v4M24 41.5v4M2.5 24h4M41.5 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M24 8.5 29.2 24H18.8Z" fill="currentColor" />
      <path d="M18.8 24h10.4L24 39.5Z" fill="currentColor" opacity="0.32" />
      <circle cx="24" cy="24" r="2.2" fill="#fff" />
    </svg>
  );
}

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-primary", className)}>
      <LogoMark className={markClassName} />
      <span className="font-display text-[1.65rem] leading-none font-semibold tracking-tight text-cocoa">Ориентир</span>
    </span>
  );
}
