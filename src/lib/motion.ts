import type { Transition } from "motion/react";

/** Пружины в духе SwiftUI: smooth — без перелёта, snappy — быстрая с лёгким пружинением. */
export const SPRING_SMOOTH: Transition = { type: "spring", visualDuration: 0.55, bounce: 0 };
export const SPRING_SNAPPY: Transition = { type: "spring", visualDuration: 0.38, bounce: 0.18 };
export const SPRING_GENTLE: Transition = { type: "spring", visualDuration: 0.9, bounce: 0.12 };

/** Типы переходов между экранами — по ним `<Screen>` выбирает анимацию. */
export const NAV_FORWARD = ["nav-forward"];
export const NAV_BACK = ["nav-back"];
export const NAV_TAB = ["nav-tab"];
