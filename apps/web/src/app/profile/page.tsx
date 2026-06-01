import { LineChart, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listCapsules } from "@/lib/api";

export default async function ProfilePage() {
  const capsules = await listCapsules();
  const themeCounts = capsules.flatMap((capsule) => capsule.aiReport.themes);
  const uniqueThemes = Array.from(new Set(themeCounts));
  const locked = capsules.filter((capsule) => capsule.status === "locked").length;
  const unlocked = capsules.length - locked;

  return (
    <SiteShell>
      <section className="animate-rise mb-6">
        <p className="text-sm font-medium text-moss">Memory map</p>
        <h1 className="gradient-text mt-1 text-3xl font-semibold">Patterns across your capsules.</h1>
      </section>

      <div className="animate-rise-delay grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="capsule-card">
          <CardHeader>
            <CardTitle>Dominant themes</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {uniqueThemes.map((theme) => (
              <Badge key={theme} tone="moss">
                {theme}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-tide via-mint to-plum" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Emotional timeline</CardTitle>
              <LineChart className="h-4 w-4 text-black/35" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid min-h-64 grid-cols-6 items-end gap-3 md:grid-cols-9">
              {capsules.map((capsule, index) => (
                <div key={capsule.id} className="space-y-2">
                  <div
                    className="rounded-t-md bg-gradient-to-t from-tide via-mint to-plum shadow-[0_10px_28px_rgba(14,165,233,0.18)]"
                    style={{ height: `${96 + index * 44}px` }}
                    aria-hidden="true"
                  />
                  <p className="line-clamp-2 text-xs text-black/50">{capsule.aiReport.mood}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-plum" />
            <CardTitle>AI profile synthesis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="max-w-3xl text-sm leading-6 text-black/65">
            Your archive currently contains {capsules.length} capsules: {locked} locked and {unlocked} unlocked. The
            strongest signal is built from {uniqueThemes.slice(0, 6).join(", ")}, giving EchoArchive enough texture to
            form a long-term self-portrait as more capsules unlock over time.
          </p>
        </CardContent>
      </Card>
    </SiteShell>
  );
}
