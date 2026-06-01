import type { Capsule } from "@/types/capsule";
import { capsules } from "@/lib/mock-data";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function listCapsules(): Promise<Capsule[]> {
  if (!API_URL) {
    return capsules;
  }

  try {
    const response = await fetch(`${API_URL}/capsules`, { cache: "no-store" });
    if (!response.ok) {
      return capsules;
    }
    return response.json();
  } catch {
    return capsules;
  }
}

export async function listArchive(): Promise<Capsule[]> {
  try {
    const response = await fetch(`${API_URL}/archive`, { cache: "no-store" });
    if (!response.ok) {
      return capsules.filter((capsule) => capsule.status === "unlocked" && capsule.visibility === "anonymous_public");
    }
    return response.json();
  } catch {
    return capsules.filter((capsule) => capsule.status === "unlocked" && capsule.visibility === "anonymous_public");
  }
}

export async function createCapsule(formData: FormData): Promise<Capsule> {
  const response = await fetch(`${API_URL}/capsules`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Capsule could not be created");
  }

  return response.json();
}

export async function publishCapsule(id: string): Promise<Capsule> {
  const response = await fetch(`${API_URL}/capsules/${id}/publish`, { method: "POST" });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}

export async function unpublishCapsule(id: string): Promise<Capsule> {
  const response = await fetch(`${API_URL}/capsules/${id}/unpublish`, { method: "POST" });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}

export type EchoUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export async function registerUser(payload: { email: string; password: string; name?: string }): Promise<EchoUser> {
  return authRequest("/auth/register", payload);
}

export async function loginUser(payload: { email: string; password: string }): Promise<EchoUser> {
  return authRequest("/auth/login", payload);
}

async function authRequest(path: string, payload: { email: string; password: string; name?: string }) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  return data.user as EchoUser;
}

export function resolveMediaUrl(mediaUrl?: string) {
  if (!mediaUrl) {
    return undefined;
  }
  if (mediaUrl.startsWith("http")) {
    return mediaUrl;
  }
  return `${API_URL}${mediaUrl}`;
}
