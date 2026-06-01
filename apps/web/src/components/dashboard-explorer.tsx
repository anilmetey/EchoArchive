"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Capsule, CapsuleStatus } from "@/types/capsule";

type FilterMode = "all" | CapsuleStatus;

export function DashboardExplorer({ capsules }: { capsules: Capsule[] }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<FilterMode>("all");
  const [theme, setTheme] = useState("all");

  const themes = useMemo(
    () => Array.from(new Set(capsules.flatMap((capsule) => capsule.aiReport.themes))).sort(),
    [capsules]
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return capsules.filter((capsule) => {
      const matchesMode = mode === "all" || capsule.status === mode;
      const matchesTheme = theme === "all" || capsule.aiReport.themes.includes(theme);
      const searchable = [
        capsule.title,
        capsule.message,
        capsule.aiReport.mood,
        capsule.aiReport.presentSelf,
        capsule.aiReport.futureAdvice,
        capsule.aiReport.themes.join(" ")
      ]
        .join(" ")
        .toLowerCase();

      return matchesMode && matchesTheme && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [capsules, mode, query, theme]);

  return (
    <section>
      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-violet">Interactive explorer</p>
          <h2 className="text-lg font-semibold">Capsules</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-black/35" />
            <Input className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search memories" />
          </div>
          <div className="flex rounded-md border border-white/70 bg-white/60 p-1 backdrop-blur">
            {(["all", "locked", "unlocked"] as FilterMode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`h-9 rounded px-3 text-xs font-medium transition ${
                  mode === item ? "bg-gradient-to-r from-tide to-plum text-white shadow-sm" : "text-black/55 hover:bg-white/70"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="relative">
            <Filter className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-black/35" />
            <select
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              className="h-11 rounded-md border border-white/70 bg-white/75 pl-9 pr-8 text-sm outline-none backdrop-blur focus:ring-2 focus:ring-violet/20"
            >
              <option value="all">All themes</option>
              {themes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2 text-xs text-black/50">
        <SlidersHorizontal className="h-4 w-4" />
        Showing {filtered.length} of {capsules.length} capsules
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {filtered.map((capsule) => (
          <Card key={capsule.id} className="capsule-card group overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle>{capsule.title}</CardTitle>
                <Badge tone={capsule.status === "locked" ? "tide" : "moss"}>{capsule.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 min-h-16 text-sm leading-6 text-black/60 transition group-hover:text-black/75">
                {capsule.aiReport.presentSelf}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {capsule.aiReport.themes.slice(0, 3).map((item) => (
                  <Badge key={item} tone="plum">
                    {item}
                  </Badge>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-xs text-black/50">
                  {capsule.status === "locked"
                    ? `Opens ${formatDistanceToNowStrict(new Date(capsule.unlockAt), { addSuffix: true })}`
                    : `Opened ${format(new Date(capsule.unlockAt), "MMM d, yyyy")}`}
                </span>
                <Button asChild size="sm" variant="secondary">
                  <Link href={`/capsules/${capsule.id}`}>View</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
