import Image from "next/image";
import { cn } from "@/lib/utils";

/** Вырезанное фото (PNG/WebP с прозрачным фоном) на мягкой подложке с тенью. */
export function Cutout({
  src,
  alt,
  sizes,
  priority,
  className,
  imageClassName,
  round,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  round?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-[linear-gradient(180deg,#faf8f3_0%,#ebe7dc_100%)]",
        round ? "rounded-full" : "rounded-[1.75rem]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-1/2 -z-10 -translate-x-1/2 rounded-[100%] bg-[#1e2a44]/20 blur-2xl",
          round ? "bottom-[4%] h-[14%] w-[60%]" : "bottom-[5%] h-[10%] w-[70%]",
        )}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-contain object-bottom", round ? "px-[10%] pt-[12%]" : "px-[7%] pb-[6%] pt-[9%]", imageClassName)}
      />
    </div>
  );
}
