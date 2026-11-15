import { ViewTransition } from "react";
import { cn } from "@/lib/utils";

// Push/pop как в навигации iOS; вкладки и кнопка «назад» браузера — мягкое растворение.
const ENTER = { "nav-forward": "push-enter", "nav-back": "pop-enter", "nav-tab": "tab-enter", default: "tab-enter" };
const EXIT = { "nav-forward": "push-exit", "nav-back": "pop-exit", "nav-tab": "tab-exit", default: "tab-exit" };

/** Экран страницы: участвует в анимации перехода. Ставится в каждый page.tsx — layout между переходами не пересоздаётся. */
export function Screen({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ViewTransition enter={ENTER} exit={EXIT} default="none">
      {/* Непрозрачный фон и высота экрана: при push старая страница не просвечивает сквозь новую. */}
      <div className={cn("min-h-[calc(100dvh-4rem)] bg-background md:min-h-[calc(100dvh-5rem)]", className)}>{children}</div>
    </ViewTransition>
  );
}

/**
 * Обёртка layout разделов. При переходе с главной layout монтируется заново, и вложенный `<Screen>` анимацию не получает —
 * тогда въезжает весь раздел целиком. Внутри разделов эта обёртка не меняется и не анимируется.
 */
export function SectionScreen({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={ENTER} exit={EXIT} default="none">
      <div className="flex flex-1 flex-col bg-background">{children}</div>
    </ViewTransition>
  );
}
