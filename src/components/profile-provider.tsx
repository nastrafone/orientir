"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { REGIONS } from "@/data/regions";
import { SUBJECTS } from "@/data/subjects";
import type { Profile } from "@/data/types";
import { PROFILE_KEY } from "@/lib/storage-keys";

interface ProfileContextValue {
  profile: Profile | null;
  /** Профиль, по которому можно персонализировать (не пропущенное знакомство). */
  personal: Profile | null;
  ready: boolean;
  save: (profile: Profile) => void;
  editorOpen: boolean;
  setEditorOpen: (open: boolean) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

function parse(raw: string | null): Profile | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as Profile;
    const subjectIds = new Set(SUBJECTS.map((s) => s.id));
    if (
      typeof p.name !== "string" ||
      (p.grade !== 10 && p.grade !== 11) ||
      !Array.isArray(p.subjects) ||
      !REGIONS.some((r) => r.id === p.region)
    ) {
      return null;
    }
    return { ...p, subjects: p.subjects.filter((s) => subjectIds.has(s)) };
  } catch {
    return null;
  }
}

export function readStoredProfile() {
  try {
    return parse(localStorage.getItem(PROFILE_KEY));
  } catch {
    return null;
  }
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    // localStorage доступен только в браузере, поэтому читаем профиль после гидрации.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(readStoredProfile());
    setReady(true);
  }, []);

  const save = useCallback((next: Profile) => {
    setProfile(next);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
    } catch {
      // приватный режим — работаем без сохранения
    }
  }, []);

  const value = useMemo(
    () => ({ profile, personal: profile && !profile.skipped ? profile : null, ready, save, editorOpen, setEditorOpen }),
    [profile, ready, save, editorOpen],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}
