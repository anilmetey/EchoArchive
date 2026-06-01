"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { KeyRound } from "lucide-react";
import type { EchoUser } from "@/lib/api";

export function AccountChip() {
  const [user, setUser] = useState<EchoUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("echoarchive_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem("echoarchive_user");
      }
    }
  }, []);

  return (
    <Link
      href="/auth"
      className="mt-6 flex items-center gap-3 rounded-md border border-white/70 bg-white/50 px-3 py-3 text-sm transition hover:bg-white/80"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-tide to-plum text-white">
        <KeyRound className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-semibold text-ink">{user ? user.name : "Guest mode"}</span>
        <span className="block truncate text-xs text-black/45">{user ? user.email : "Create account"}</span>
      </span>
    </Link>
  );
}
