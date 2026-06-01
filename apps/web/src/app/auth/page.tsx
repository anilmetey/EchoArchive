"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, LogIn } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginUser, registerUser, type EchoUser } from "@/lib/api";

const STORAGE_KEY = "echoarchive_user";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const user: EchoUser =
        mode === "register" ? await registerUser({ email, password, name }) : await loginUser({ email, password });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      router.push("/capsules/new");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not authenticate");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SiteShell>
      <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <div className="aurora-panel rounded-lg p-8 text-white shadow-glow">
          <p className="text-sm font-medium text-cyan-100">Account vault</p>
          <h1 className="mt-2 text-4xl font-semibold">Create your private memory space.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
            This local MVP stores a user profile, then attaches every capsule you create to that account. Swap this for
            Supabase Auth when production credentials are added.
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-cyan via-mint to-plum" />
          <CardHeader>
            <CardTitle>{mode === "register" ? "Register" : "Login"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={submit}>
              {mode === "register" ? (
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Name</span>
                  <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Anil" />
                </label>
              ) : null}
              <label className="block space-y-2">
                <span className="text-sm font-medium">Email</span>
                <Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">Password</span>
                <Input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
              </label>

              {error ? <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-700">{error}</p> : null}

              <Button type="submit" className="w-full" disabled={saving}>
                {mode === "register" ? <KeyRound className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                {saving ? "Working..." : mode === "register" ? "Create account" : "Login"}
              </Button>
              <button
                type="button"
                onClick={() => setMode(mode === "register" ? "login" : "register")}
                className="w-full text-sm font-medium text-violet"
              >
                {mode === "register" ? "Already have an account? Login" : "Need an account? Register"}
              </button>
            </form>
          </CardContent>
        </Card>
      </section>
    </SiteShell>
  );
}
