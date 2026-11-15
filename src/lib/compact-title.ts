import { useSyncExternalStore } from "react";

/** Заголовок, который появляется в шапке, когда большой заголовок страницы уехал под неё (как large title в iOS). */
type State = { title: string; visible: boolean };

const HIDDEN: State = { title: "", visible: false };
let state = HIDDEN;
const listeners = new Set<() => void>();

export function setCompactTitle(next: State) {
  if (next.title === state.title && next.visible === state.visible) return;
  state = next;
  listeners.forEach((l) => l());
}

export function clearCompactTitle() {
  setCompactTitle(HIDDEN);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useCompactTitle() {
  return useSyncExternalStore(subscribe, () => state, () => HIDDEN);
}
