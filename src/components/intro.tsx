"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { EMPTY_DRAFT, ProfileFields, draftIsValid, type ProfileDraft } from "@/components/profile-fields";
import { useProfile } from "@/components/profile-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HEADER_ROW } from "@/lib/site";
import { SPLASH_KEY } from "@/lib/storage-keys";
import { cn } from "@/lib/utils";

type Phase = "splash" | "name" | "details" | "leaving" | "gone";

const GREETING = "Добро пожаловать!";
const EASE = [0.65, 0, 0.35, 1] as const;

export function Intro() {
  const { profile, ready, save } = useProfile();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("splash");
  const [typed, setTyped] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [draft, setDraft] = useState<ProfileDraft>(EMPTY_DRAFT);
  const profileRef = useRef(profile);
  const readyRef = useRef(ready);

  useEffect(() => {
    profileRef.current = profile;
    readyRef.current = ready;
  }, [profile, ready]);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "skip") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("gone");
    }
  }, []);

  const finish = () => {
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {}
    setPhase("leaving");
  };

  // Печатаем приветствие, затем переходим к знакомству (или сразу на сайт, если профиль уже есть).
  useEffect(() => {
    if (phase !== "splash") return;
    const step = reduce ? 0 : 75;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= GREETING.length; i++) {
      timers.push(setTimeout(() => setTyped(GREETING.slice(0, i)), 700 + i * step));
    }
    const advance = () => {
      if (!readyRef.current) {
        timers.push(setTimeout(advance, 100));
        return;
      }
      if (profileRef.current) finish();
      else setPhase("name");
    };
    timers.push(setTimeout(advance, 700 + GREETING.length * step + 1300));
    return () => timers.forEach(clearTimeout);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase === "gone") return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "gone") return null;

  const submitName = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = name.trim().replace(/\s+/g, " ").slice(0, 30);
    if (!clean) {
      setNameError(true);
      return;
    }
    setName(clean);
    setPhase("details");
  };

  const submitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftIsValid(draft)) return;
    save({ name, ...draft });
    finish();
  };

  const skip = () => {
    save({ name: "", ...EMPTY_DRAFT, skipped: true });
    finish();
  };

  const stepMotion = {
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.15 } },
    exit: { opacity: 0, y: reduce ? 0 : -12, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <AnimatePresence onExitComplete={() => setPhase("gone")}>
      {phase !== "leaving" && (
        <motion.div
          id="intro-overlay"
          key="intro"
          className="fixed inset-0 z-[100] overflow-hidden bg-white"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE } }}
          role="dialog"
          aria-modal="true"
          aria-label="Знакомство с сайтом"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,#f6ede3_0%,rgba(255,255,255,0)_70%)]"
          />

          <div
            className={cn(
              "pointer-events-none absolute z-10 flex",
              phase === "splash"
                ? "inset-0 items-center justify-center pb-24"
                : cn("inset-x-0 top-0 items-center bg-white/90 backdrop-blur-sm", HEADER_ROW),
            )}
          >
            <motion.div layout transition={{ layout: { duration: reduce ? 0 : 1.1, ease: EASE } }}>
              <motion.div
                initial={{ opacity: 0, scale: 1.6 }}
                animate={{ opacity: 1, scale: phase === "splash" ? 1.6 : 1 }}
                transition={{ opacity: { duration: 0.8 }, scale: { duration: reduce ? 0 : 1.1, ease: EASE } }}
                style={{ transformOrigin: "center" }}
              >
                <Logo />
              </motion.div>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {phase === "splash" && (
              <motion.p
                key="greeting"
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                className="typing-caret absolute inset-x-0 top-1/2 mt-6 px-6 text-center font-display text-4xl italic text-cocoa sm:text-5xl"
                aria-live="polite"
              >
                {typed}
              </motion.p>
            )}

            {phase === "name" && (
              <motion.div key="name" {...stepMotion} className="absolute inset-0 overflow-y-auto">
                <form onSubmit={submitName} className="mx-auto flex min-h-full max-w-xl flex-col justify-center px-5 pb-12 pt-24">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-latte">Навигатор для 10–11 классов</p>
                  <h1 className="font-display text-4xl leading-[1.08] text-cocoa sm:text-5xl">
                    Привет! Давай построим твой маршрут после школы
                  </h1>
                  <p className="mt-5 text-[1.02rem] leading-relaxed text-muted-foreground">
                    «Ориентир» — бесплатный справочник для старшеклассников. Подскажем, какие олимпиады писать, на какие курсы при
                    университетах пойти, какие вузы подходят под твои предметы ЕГЭ и регион и какие профессии будут востребованы.
                  </p>
                  <label htmlFor="intro-name" className="mt-9 text-[0.95rem] font-semibold text-cocoa">
                    Как тебя зовут?
                  </label>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="intro-name"
                      autoFocus
                      autoComplete="given-name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameError(false);
                      }}
                      aria-invalid={nameError}
                      placeholder="Например, Аня"
                      className="h-12 rounded-full bg-white px-5 text-base"
                    />
                    <Button type="submit" className="h-12 rounded-full px-7 text-[0.95rem]">
                      Продолжить <ArrowRight data-icon="inline-end" />
                    </Button>
                  </div>
                  {nameError && <p className="mt-2 text-sm text-destructive">Напиши, как к тебе обращаться.</p>}
                  <button
                    type="button"
                    onClick={skip}
                    className="mt-8 self-start text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-cocoa hover:underline"
                  >
                    Пропустить знакомство
                  </button>
                </form>
              </motion.div>
            )}

            {phase === "details" && (
              <motion.div key="details" {...stepMotion} className="absolute inset-0 overflow-y-auto">
                <form onSubmit={submitDetails} className="mx-auto flex min-h-full max-w-2xl flex-col justify-center px-5 pb-12 pt-24">
                  <h2 className="font-display text-4xl leading-tight text-cocoa sm:text-5xl">Приятно познакомиться, {name}!</h2>
                  <p className="mt-3 text-[1.02rem] text-muted-foreground">
                    Ответь на три вопроса — и сайт подберёт олимпиады, курсы и вузы именно для тебя.
                  </p>
                  <div className="mt-9">
                    <ProfileFields draft={draft} onChange={setDraft} />
                  </div>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button type="submit" disabled={!draftIsValid(draft)} className="h-12 rounded-full px-7 text-[0.95rem]">
                      Показать мой маршрут <ArrowRight data-icon="inline-end" />
                    </Button>
                    <button
                      type="button"
                      onClick={() => setPhase("name")}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cocoa"
                    >
                      <ArrowLeft className="size-4" /> Назад
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
