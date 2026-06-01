"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publishCapsule, unpublishCapsule } from "@/lib/api";
import type { CapsuleVisibility } from "@/types/capsule";

export function PublishControls({ id, visibility }: { id: string; visibility: CapsuleVisibility }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const isPublic = visibility === "anonymous_public";

  async function toggle() {
    setSaving(true);
    try {
      if (isPublic) {
        await unpublishCapsule(id);
      } else {
        await publishCapsule(id);
      }
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Button type="button" variant={isPublic ? "secondary" : "accent"} onClick={toggle} disabled={saving}>
      {isPublic ? <LockKeyhole className="h-4 w-4" /> : <Globe2 className="h-4 w-4" />}
      {saving ? "Saving..." : isPublic ? "Make private" : "Publish anonymously"}
    </Button>
  );
}
