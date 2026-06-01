export type CapsuleStatus = "locked" | "unlocked";
export type CapsuleVisibility = "private" | "anonymous_public";

export type AiReport = {
  mood: string;
  themes: string[];
  presentSelf: string;
  futureAdvice: string;
  revealSummary: string;
};

export type Capsule = {
  id: string;
  userId?: string;
  userName?: string;
  title: string;
  message: string;
  unlockAt: string;
  createdAt: string;
  status: CapsuleStatus;
  visibility: CapsuleVisibility;
  mediaType?: "photo" | "audio" | "video";
  mediaUrl?: string;
  mediaName?: string;
  aiReport: AiReport;
};
