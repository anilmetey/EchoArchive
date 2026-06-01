import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "moss" | "clay" | "tide" | "plum";
};

const tones = {
  neutral: "bg-white/70 text-ink ring-1 ring-white/70",
  moss: "bg-moss/15 text-[#047857] ring-1 ring-moss/20",
  clay: "bg-clay/15 text-[#be185d] ring-1 ring-clay/20",
  tide: "bg-tide/15 text-[#0369a1] ring-1 ring-tide/20",
  plum: "bg-plum/15 text-[#6d28d9] ring-1 ring-plum/20"
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tones[tone], className)}
      {...props}
    />
  );
}
