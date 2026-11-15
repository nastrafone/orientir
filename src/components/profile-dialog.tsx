"use client";

import { useState } from "react";
import { EMPTY_DRAFT, ProfileFields, draftIsValid, type ProfileDraft } from "@/components/profile-fields";
import { useProfile } from "@/components/profile-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileDialog() {
  const { editorOpen, setEditorOpen } = useProfile();
  return (
    <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
      <DialogContent className="max-h-[92dvh] overflow-y-auto rounded-3xl p-6 sm:max-w-2xl sm:p-8">
        {editorOpen && <ProfileEditor onDone={() => setEditorOpen(false)} />}
      </DialogContent>
    </Dialog>
  );
}

function ProfileEditor({ onDone }: { onDone: () => void }) {
  const { profile, save } = useProfile();
  const [name, setName] = useState(profile?.name ?? "");
  const [draft, setDraft] = useState<ProfileDraft>(
    profile && !profile.skipped
      ? { grade: profile.grade, subjects: profile.subjects, region: profile.region, city: profile.city }
      : EMPTY_DRAFT,
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftIsValid(draft)) return;
    save({ name: name.trim().slice(0, 30), ...draft });
    onDone();
  };

  return (
    <form onSubmit={submit}>
      <DialogHeader>
        <DialogTitle className="font-display text-3xl font-medium text-cocoa">Твой профиль</DialogTitle>
        <DialogDescription>По этим ответам мы подбираем вузы, олимпиады и курсы. Данные хранятся только в твоём браузере.</DialogDescription>
      </DialogHeader>
      <div className="mt-6 space-y-2">
        <Label htmlFor="profile-name" className="text-[0.95rem] font-semibold text-cocoa">
          Имя
        </Label>
        <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-xl" />
      </div>
      <div className="mt-7">
        <ProfileFields draft={draft} onChange={setDraft} />
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <Button type="button" variant="ghost" className="h-11 rounded-full px-5" onClick={onDone}>
          Отмена
        </Button>
        <Button type="submit" disabled={!draftIsValid(draft)} className="h-11 rounded-full px-6">
          Сохранить
        </Button>
      </div>
    </form>
  );
}
