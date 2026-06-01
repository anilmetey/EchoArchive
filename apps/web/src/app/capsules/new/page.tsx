"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Image, LockKeyhole, Mic, Video } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCapsule } from "@/lib/api";

const mediaOptions = [
  { value: "photo", label: "Photo", icon: Image },
  { value: "audio", label: "Audio", icon: Mic },
  { value: "video", label: "Video", icon: Video }
];

export default function NewCapsulePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [unlockAt, setUnlockAt] = useState("");
  const [message, setMessage] = useState("");
  const [mediaType, setMediaType] = useState("photo");
  const [visibility, setVisibility] = useState("private");
  const [media, setMedia] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");
  const wordCount = useMemo(() => message.trim().split(/\s+/).filter(Boolean).length, [message]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setError("");

    try {
      const formData = new FormData();
      const storedUser = localStorage.getItem("echoarchive_user");
      let user = null;
      if (storedUser) {
        try {
          user = JSON.parse(storedUser);
        } catch {
          localStorage.removeItem("echoarchive_user");
        }
      }
      formData.append("title", title);
      formData.append("message", message);
      formData.append("unlockAt", new Date(`${unlockAt}T09:00:00`).toISOString());
      formData.append("visibility", visibility);
      formData.append("mediaType", mediaType);
      formData.append("userId", user?.id ?? "demo-user");
      formData.append("userName", user?.name ?? "Demo User");
      if (media) {
        formData.append("media", media);
      }

      const capsule = await createCapsule(formData);
      router.push(`/capsules/${capsule.id}`);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Capsule could not be created");
      setStatus("error");
    }
  }

  return (
    <SiteShell>
      <div className="animate-rise grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section>
          <div className="mb-5">
            <p className="text-sm font-medium text-violet">New capsule</p>
            <h1 className="gradient-text mt-1 text-3xl font-semibold">Lock today for later.</h1>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Capsule details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Title</span>
                  <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Open when I need courage" required />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Unlock date</span>
                  <Input value={unlockAt} onChange={(event) => setUnlockAt(event.target.value)} type="date" required />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Message</span>
                  <Textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Write to your future self..."
                    required
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Visibility</span>
                  <select
                    value={visibility}
                    onChange={(event) => setVisibility(event.target.value)}
                    className="h-11 w-full rounded-md border border-white/70 bg-white/75 px-3 text-sm text-ink outline-none shadow-sm backdrop-blur focus:border-tide focus:bg-white focus:ring-2 focus:ring-violet/20"
                  >
                    <option value="private">Private</option>
                    <option value="anonymous_public">Anonymous public after unlock</option>
                  </select>
                </label>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Memory media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {mediaOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setMediaType(option.value)}
                      className={`flex h-24 flex-col items-center justify-center gap-2 rounded-md border text-sm font-medium transition hover:-translate-y-0.5 ${
                        mediaType === option.value
                          ? "border-violet bg-gradient-to-br from-tide/15 via-mint/15 to-plum/15 text-violet shadow-[0_12px_32px_rgba(124,58,237,0.16)]"
                          : "border-white/70 bg-white/65 text-black/60 hover:bg-white/90 hover:text-tide"
                      }`}
                    >
                      <option.icon className="h-5 w-5" />
                      {option.label}
                    </button>
                  ))}
                </div>
                <label className="upload-zone mt-3 block cursor-pointer rounded-md border border-dashed border-violet/35 bg-gradient-to-br from-white/50 via-cyan/10 to-plum/10 p-8 text-center text-sm text-black/55 backdrop-blur">
                  <input
                    className="sr-only"
                    type="file"
                    accept={mediaType === "photo" ? "image/*" : mediaType === "audio" ? "audio/*" : "video/*"}
                    onChange={(event) => setMedia(event.target.files?.[0] ?? null)}
                  />
                  {media ? media.name : "Choose a photo, audio, or video file"}
                </label>
              </CardContent>
            </Card>

            {error ? <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-700">{error}</p> : null}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary">
                Save draft
              </Button>
              <Button type="submit" variant="accent" disabled={status === "saving"}>
                <LockKeyhole className="h-4 w-4" />
                {status === "saving" ? "Locking..." : "Lock capsule"}
              </Button>
            </div>
          </form>
        </section>

        <aside className="lg:pt-20">
          <Card className="sticky top-6 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-cyan via-mint to-plum" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI preview</CardTitle>
                <Badge tone="plum">Claude-ready</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-black/65">
              <p>
                EchoArchive will analyze tone, themes, and the version of you captured in this message before the
                capsule is locked.
              </p>
              <div className="rounded-md bg-gradient-to-br from-cyan/15 via-white/65 to-plum/15 p-4">
                <p className="text-xs font-medium uppercase text-black/40">Current signal</p>
                <p className="mt-2 text-ink">
                  {wordCount > 20
                    ? "There is enough texture here to build a useful memory report."
                    : "Write a little more to give the AI a stronger emotional signal."}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-black/45">
                <Calendar className="h-4 w-4" />
                {wordCount} words captured
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </SiteShell>
  );
}
