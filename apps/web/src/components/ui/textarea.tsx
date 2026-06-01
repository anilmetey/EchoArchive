import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-40 w-full resize-y rounded-md border border-white/70 bg-white/75 px-3 py-3 text-sm text-ink outline-none shadow-sm backdrop-blur transition placeholder:text-black/40 focus:border-tide focus:bg-white focus:ring-2 focus:ring-violet/20",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
