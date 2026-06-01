import Link from "next/link";
import { notFound } from "next/navigation";
import { format, formatDistanceToNowStrict } from "date-fns";
import { ArrowLeft, LockKeyhole, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublishControls } from "@/components/publish-controls";
import { listCapsules, resolveMediaUrl } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CapsulePage({ params }: Props) {
  const { id } = await params;
  const capsule = (await listCapsules()).find((item) => item.id === id);

  if (!capsule) {
    notFound();
  }

  const locked = capsule.status === "locked";
  const mediaUrl = resolveMediaUrl(capsule.mediaUrl);

  return (
    <SiteShell>
      <div className="mb-5">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <section className="aurora-panel animate-rise rounded-lg px-5 py-8 text-white shadow-glow">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Badge tone={locked ? "tide" : "moss"} className="bg-white/10 text-white">
              {locked ? "Locked" : "Unlocked"}
            </Badge>
            <h1 className="mt-4 text-3xl font-semibold">{capsule.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
              {locked
                ? `This capsule opens ${formatDistanceToNowStrict(new Date(capsule.unlockAt), { addSuffix: true })}.`
                : `Opened on ${format(new Date(capsule.unlockAt), "MMMM d, yyyy")}.`}
            </p>
          </div>
          <div className="pulse-icon flex h-20 w-20 items-center justify-center rounded-md bg-white/10">
            {locked ? <LockKeyhole className="h-8 w-8" /> : <Sparkles className="h-8 w-8" />}
          </div>
        </div>
        {!locked ? (
          <div className="mt-6">
            <PublishControls id={capsule.id} visibility={capsule.visibility} />
          </div>
        ) : null}
      </section>

      <div className="animate-rise-delay mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="reveal-frame">
          <CardHeader>
            <CardTitle>{locked ? "Sealed message" : "Original message"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-base leading-8 text-black/70">
              {locked
                ? "The message is encrypted from the experience layer until the unlock date arrives."
                : capsule.message}
            </p>
            {mediaUrl ? (
              <div className="rounded-md border border-white/70 bg-white/55 p-3">
                <p className="mb-2 text-xs font-medium uppercase text-black/40">{capsule.mediaName ?? capsule.mediaType}</p>
                {capsule.mediaType === "photo" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={mediaUrl} alt={capsule.mediaName ?? capsule.title} className="max-h-96 w-full rounded-md object-cover" />
                ) : capsule.mediaType === "audio" ? (
                  <audio controls src={mediaUrl} className="w-full" />
                ) : capsule.mediaType === "video" ? (
                  <video controls src={mediaUrl} className="max-h-96 w-full rounded-md" />
                ) : (
                  <a href={mediaUrl} className="text-sm font-medium text-tide">
                    Open media
                  </a>
                )}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="capsule-card">
          <CardHeader>
            <CardTitle>AI memory report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-black/65">
            <div>
              <p className="text-xs font-semibold uppercase text-black/40">Mood</p>
              <p className="mt-1 text-ink">{capsule.aiReport.mood}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-black/40">Themes</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {capsule.aiReport.themes.map((theme) => (
                  <Badge key={theme} tone="plum">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-black/40">Future advice</p>
              <p className="mt-1 text-ink">{capsule.aiReport.futureAdvice}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  );
}
