import { Archive, Search } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { listArchive } from "@/lib/api";

const filters = [
  "1 year",
  "3 years",
  "5 years",
  "10 years",
  "love",
  "family",
  "career",
  "travel",
  "healing",
  "letters",
  "audio",
  "video"
];

export default async function ArchivePage() {
  const archiveEntries = await listArchive();
  const allThemes = archiveEntries.flatMap((entry) => entry.aiReport.themes);
  const dominantTheme = topItem(allThemes) ?? "memory";
  const mediaCount = archiveEntries.filter((entry) => entry.mediaType).length;

  return (
    <SiteShell>
      <section className="animate-rise mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-clay">Anonymous archive</p>
          <h1 className="gradient-text mt-1 text-3xl font-semibold">Opened capsules from other lives.</h1>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-black/35" />
          <Input className="pl-9" placeholder="Search themes" />
        </div>
      </section>

      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Badge key={filter}>{filter}</Badge>
        ))}
      </div>

      <section className="mb-5 grid gap-3 md:grid-cols-4">
        <ArchiveStat label="Opened capsules" value={archiveEntries.length.toString()} />
        <ArchiveStat label="Oldest message" value="10 years" />
        <ArchiveStat label="Dominant theme" value={dominantTheme} />
        <ArchiveStat label="Media memories" value={mediaCount.toString()} />
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {archiveEntries.map((entry) => (
          <Card key={entry.id} className="capsule-card animate-rise-delay">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{entry.title}</CardTitle>
                <Archive className="h-4 w-4 text-black/35" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-black/65">{entry.message}</p>
              <div className="rounded-md bg-gradient-to-br from-mint/15 via-white/65 to-plum/15 p-4 text-sm leading-6 text-black/65">
                {entry.aiReport.revealSummary}
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.aiReport.themes.map((theme) => (
                  <Badge key={theme} tone="tide">
                    {theme}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SiteShell>
  );
}

function topItem(items: string[]) {
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
}

function ArchiveStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-lg px-4 py-3">
      <p className="text-xs text-black/45">{label}</p>
      <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}
