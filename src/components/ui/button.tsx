"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useEffect, useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
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
    const localRef = useRef<HTMLElement | null>(null);

    // merge forwarded ref and localRef
    const setRefs = (node: any) => {
      localRef.current = node;
      if (!ref) return;
      if (typeof ref === "function") ref(node);
      else (ref as any).current = node;
    };

    useEffect(() => {
      const el = localRef.current as HTMLElement | null;
      if (!el) return;

      let gsapAny: any = null;

      const apply = async () => {
        try {
          const gsapModule = await import("gsap");
          gsapAny = gsapModule?.default ?? gsapModule;
          if (!gsapAny) return;

          // choose animation based on variant
          const isOutline = variant === "outline";

          const enterHandler = () => {
            if (isOutline) {
              gsapAny.to(el, {
                scale: 1.03,
                backgroundColor: "rgba(255,255,255,0.95)",
                color: "#000",
                borderColor: "rgba(255,255,255,0.95)",
                duration: 0.18,
              });
            } else {
              gsapAny.to(el, { scale: 1.05, duration: 0.12 });
            }
          };

          const leaveHandler = () => {
            if (isOutline) {
              gsapAny.to(el, {
                scale: 1,
                backgroundColor: "transparent",
                color: "",
                borderColor: "",
                duration: 0.18,
              });
            } else {
              gsapAny.to(el, { scale: 1, duration: 0.12 });
            }
          };

          const focusHandler = () => {
            if (isOutline)
              gsapAny.to(el, {
                scale: 1.03,
                backgroundColor: "rgba(255,255,255,0.95)",
                color: "#000",
                duration: 0.12,
              });
            else gsapAny.to(el, { scale: 1.03, duration: 0.12 });
          };

          const blurHandler = () => {
            if (isOutline)
              gsapAny.to(el, {
                scale: 1,
                backgroundColor: "transparent",
                color: "",
                duration: 0.12,
              });
            else gsapAny.to(el, { scale: 1, duration: 0.12 });
          };

          el.addEventListener("mouseenter", enterHandler);
          el.addEventListener("mouseleave", leaveHandler);
          el.addEventListener("focus", focusHandler);
          el.addEventListener("blur", blurHandler);

          // cleanup
          return () => {
            try {
              el.removeEventListener("mouseenter", enterHandler);
              el.removeEventListener("mouseleave", leaveHandler);
              el.removeEventListener("focus", focusHandler);
              el.removeEventListener("blur", blurHandler);
            } catch {}
          };
        } catch {
          // ignore
        }
      };

      const cleanPromise = apply();

      return () => {
        // if animation import resolved and returned a cleanup, let it run
        try {
          (cleanPromise as any)?.then((fn: any) => fn && fn());
        } catch {}
      };
    }, [variant]);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={setRefs}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
