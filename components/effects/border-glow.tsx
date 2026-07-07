"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  animated?: boolean;
};

export function BorderGlow({ children, className, animated = false }: BorderGlowProps) {
  return (
    <div className={cn("border-glow relative rounded-[2rem] p-px", animated && "border-glow--animated", className)}>
      <div className="relative z-10 h-full rounded-[calc(2rem-1px)]">{children}</div>
    </div>
  );
}
