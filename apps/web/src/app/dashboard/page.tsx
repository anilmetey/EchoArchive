import Link from "next/link";
import { format, formatDistanceToNowStrict } from "date-fns";
import { CalendarClock, HeartPulse, LockKeyhole, Radio, Sparkles, Tags, UnlockKeyhole } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardExplorer } from "@/components/dashboard-explorer";
import { listCapsules } from "@/lib/api";

export default async function DashboardPage() {
  const items = await listCapsules();
  const locked = items.filter((item) => item.status === "locked");
  const unlocked = items.filter((item) => item.status === "unlocked");
  const upcoming = [...locked].sort((a, b) => new Date(a.unlockAt).getTime() - new Date(b.unlockAt).getTime()).slice(0, 4);
  const topThemes = getTopThemes(items).slice(0, 8);
  const archivePreview = unlocked.filter((item) => item.visibility === "anonymous_public").slice(0, 3);
  const timeline = [...items].sort((a, b) => new Date(a.unlockAt).getTime() - new Date(b.unlockAt).getTime()).slice(0, 8);
  const insightFeed = buildInsightFeed(items).slice(0, 5);

  return (
    <SiteShell>
      <div className="flex flex-col gap-6">
        <section className="aurora-panel animate-rise grid gap-6 rounded-lg px-5 py-7 text-white shadow-glow lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-cyan-100">Future self vault</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal sm:text-5xl">Messages from who you are today.</h1>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Lock reflections, media, and AI memory reports until the date they are meant to find you.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <HeroFact label="Total capsules" value={items.length.toString()} />
              <HeroFact label="AI themes" value={topThemes.length.toString()} />
              <HeroFact label="Public echoes" value={archivePreview.length.toString()} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild variant="secondary">
                <Link href="/capsules/new">
                  <Sparkles className="h-4 w-4" />
                  Create capsule
                </Link>
              </Button>
              <span className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs text-white/70 backdrop-blur">
                AI memory report included
              </span>
            </div>
          </div>
          <div className="vault-scene">
            <span className="memory-strip" />
            <span className="memory-strip" />
            <span className="memory-strip" />
            <div className="vault-core">
              <span />
            </div>
          </div>
        </section>

        <section className="animate-rise-delay grid gap-4 md:grid-cols-3">
          <MetricCard label="Locked capsules" value={locked.length.toString()} icon={LockKeyhole} tone="tide" />
          <MetricCard label="Opened memories" value={unlocked.length.toString()} icon={UnlockKeyhole} tone="moss" />
          <MetricCard
            label="Next unlock"
            value={upcoming[0] ? formatDistanceToNowStrict(new Date(upcoming[0].unlockAt)) : "none"}
            icon={CalendarClock}
            tone="clay"
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <Card className="overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-cyan via-mint to-plum" />
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>Upcoming unlocks</CardTitle>
                <Radio className="h-4 w-4 text-violet" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming.map((capsule) => (
                <Link
                  key={capsule.id}
                  href={`/capsules/${capsule.id}`}
                  className="group grid gap-3 rounded-md border border-white/70 bg-white/55 p-3 transition hover:-translate-y-0.5 hover:bg-white/80 sm:grid-cols-[108px_minmax(0,1fr)_auto]"
                >
                  <div className="rounded-md bg-gradient-to-br from-tide/20 via-mint/15 to-plum/20 px-3 py-2 text-center">
                    <span className="block text-xs font-medium text-black/45">{format(new Date(capsule.unlockAt), "MMM")}</span>
                    <span className="block text-2xl font-semibold text-ink">{format(new Date(capsule.unlockAt), "d")}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink group-hover:text-violet">{capsule.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-black/55">{capsule.aiReport.futureAdvice}</p>
                  </div>
                  <Badge tone="tide">{capsule.mediaType ?? "text"}</Badge>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-plum via-clay to-mint" />
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>AI signal map</CardTitle>
                <Tags className="h-4 w-4 text-clay" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {topThemes.map(({ theme, count }) => (
                  <Badge key={theme} tone={count > 1 ? "plum" : "tide"}>
                    {theme} x{count}
                  </Badge>
                ))}
              </div>
              <div className="mt-5 rounded-md bg-gradient-to-br from-white/65 via-cyan/10 to-plum/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <HeartPulse className="h-4 w-4 text-clay" />
                  Current emotional read
                </div>
                <p className="mt-2 text-sm leading-6 text-black/60">
                  Your capsules cluster around courage, self-worth, family, craft, and learning how to move without
                  losing softness.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,1.1fr)]">
          <Card className="overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-mint via-cyan to-plum" />
            <CardHeader>
              <CardTitle>Memory timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timeline.map((capsule, index) => (
                <div key={capsule.id} className="grid grid-cols-[38px_minmax(0,1fr)] gap-3">
                  <div className="flex flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-tide/20 to-plum/20 text-xs font-semibold text-violet">
                      {index + 1}
                    </span>
                    {index < timeline.length - 1 ? <span className="mt-2 h-10 w-px bg-gradient-to-b from-tide/50 to-plum/20" /> : null}
                  </div>
                  <div className="rounded-md border border-white/70 bg-white/55 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-ink">{capsule.title}</p>
                      <Badge tone={capsule.status === "locked" ? "tide" : "moss"}>{format(new Date(capsule.unlockAt), "yyyy")}</Badge>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-black/55">{capsule.aiReport.mood}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-plum via-clay to-tide" />
            <CardHeader>
              <CardTitle>AI insight feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {insightFeed.map((insight) => (
                <div key={insight.title} className="rounded-md border border-white/70 bg-gradient-to-br from-white/70 via-cyan/10 to-plum/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-ink">{insight.title}</p>
                    <Badge tone={insight.tone}>{insight.label}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-black/60">{insight.body}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <DashboardExplorer capsules={items} />

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Public archive highlights</h2>
            <Badge tone="plum">{archivePreview.length} opened echoes</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {archivePreview.map((capsule) => (
              <Card key={capsule.id} className="capsule-card">
                <CardHeader>
                  <CardTitle>{capsule.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="line-clamp-3 text-sm leading-6 text-black/60">{capsule.message}</p>
                  <div className="flex flex-wrap gap-2">
                    {capsule.aiReport.themes.slice(0, 3).map((theme) => (
                      <Badge key={theme} tone="moss">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

function buildInsightFeed(items: Awaited<ReturnType<typeof listCapsules>>) {
  const locked = items.filter((item) => item.status === "locked");
  const unlocked = items.filter((item) => item.status === "unlocked");
  const publicItems = unlocked.filter((item) => item.visibility === "anonymous_public");

  return [
    {
      title: "Recurring emotional pattern",
      label: "pattern",
      tone: "plum" as const,
      body: "Several capsules connect ambition with tenderness: the archive keeps asking future you to stay driven without becoming unreachable."
    },
    {
      title: "Next important reveal",
      label: locked[0]?.mediaType ?? "locked",
      tone: "tide" as const,
      body: locked[0]
        ? `${locked[0].title} opens with a ${locked[0].mediaType ?? "text"} memory and carries this advice: ${locked[0].aiReport.futureAdvice}`
        : "No locked capsules are waiting right now."
    },
    {
      title: "Archive resonance",
      label: "public",
      tone: "moss" as const,
      body: `${publicItems.length} anonymous public echoes are available, with themes around ${Array.from(new Set(publicItems.flatMap((item) => item.aiReport.themes))).slice(0, 5).join(", ")}.`
    },
    {
      title: "Media mix",
      label: "storage",
      tone: "clay" as const,
      body: `The demo archive now includes ${items.filter((item) => item.mediaType === "photo").length} photo capsules, ${items.filter((item) => item.mediaType === "audio").length} audio memories, and ${items.filter((item) => item.mediaType === "video").length} video capsules.`
    },
    {
      title: "AI report depth",
      label: "analysis",
      tone: "plum" as const,
      body: "Each capsule now exposes mood, themes, present-self summary, future advice, and reveal summary so the product feels like a memory system rather than a note list."
    }
  ];
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/15 bg-white/10 px-3 py-2 backdrop-blur">
      <p className="text-xl font-semibold text-white">{value}</p>
      <p className="text-xs text-white/55">{label}</p>
    </div>
  );
}

function getTopThemes(items: Awaited<ReturnType<typeof listCapsules>>) {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const theme of item.aiReport.themes) {
      counts.set(theme, (counts.get(theme) ?? 0) + 1);
    }
  }
  return Array.from(counts, ([theme, count]) => ({ theme, count })).sort((a, b) => b.count - a.count);
}

function MetricCard({
  label,
  value,
  icon: Icon,
  tone
}: {
  label: string;
  value: string;
  icon: typeof LockKeyhole;
  tone: "moss" | "clay" | "tide";
}) {
  const toneClass = {
    moss: "bg-moss/15 text-moss",
    clay: "bg-clay/15 text-clay",
    tide: "bg-tide/15 text-tide"
  }[tone];

  return (
    <div className="glass-card metric-surface noise-sheen rounded-lg p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-black/55">{label}</span>
        <span className={`pulse-icon flex h-9 w-9 items-center justify-center rounded-md ${toneClass}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold">{value}</p>
    </div>
  );
}
