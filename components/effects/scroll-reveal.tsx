"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  y?: number;
  durationMs?: number;
  amount?: number;
};

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  y = 24,
  durationMs = 650,
  amount = 0.2,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || revealed) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: amount },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [amount, revealed]);

  return (
    <div
      ref={ref}
      className={cn("reveal-item", className)}
      data-revealed={revealed}
      style={
        {
          "--reveal-delay": `${delayMs}ms`,
          "--reveal-y": `${y}px`,
          "--reveal-duration": `${durationMs}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
