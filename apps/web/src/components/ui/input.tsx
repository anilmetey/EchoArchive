import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md border border-white/70 bg-white/75 px-3 text-sm text-ink outline-none shadow-sm backdrop-blur transition placeholder:text-black/40 focus:border-tide focus:bg-white focus:ring-2 focus:ring-violet/20",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
