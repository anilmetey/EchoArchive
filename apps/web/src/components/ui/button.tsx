import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-tide via-violet to-plum text-white shadow-[0_12px_34px_rgba(124,58,237,0.28)] hover:brightness-110 hover:shadow-[0_16px_44px_rgba(14,165,233,0.32)] focus-visible:outline-tide",
        secondary:
          "bg-white/80 text-ink ring-1 ring-white/70 backdrop-blur hover:bg-white hover:shadow-[0_10px_30px_rgba(14,165,233,0.16)]",
        ghost: "text-ink hover:bg-white/55 hover:text-violet",
        accent:
          "bg-gradient-to-r from-mint via-cyan to-tide text-ink shadow-[0_12px_34px_rgba(34,211,238,0.24)] hover:brightness-105 focus-visible:outline-tide"
      },
      size: {
        default: "h-10 px-4",
        icon: "h-10 w-10 px-0",
        sm: "h-9 px-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
