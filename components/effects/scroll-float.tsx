"use client";

import { type ElementType, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ScrollFloatProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "p";
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  stagger?: number;
};

export function ScrollFloat({
  children,
  as = "h2",
  containerClassName,
  textClassName,
  animationDuration = 1,
  stagger = 0.03,
}: ScrollFloatProps) {
  const Component = as as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const text = typeof children === "string" ? children : "";

  const characters = useMemo(
    () =>
      text.split("").map((character, index) => ({
        character: character === " " ? "\u00A0" : character,
        index,
      })),
    [text],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 0.2 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={cn("scroll-float overflow-hidden", containerClassName)}
      data-visible={visible}
      style={
        {
          "--scroll-float-duration": `${animationDuration}s`,
          "--scroll-float-stagger": `${stagger}s`,
        } as React.CSSProperties
      }
    >
      <span className={cn("inline-block", textClassName)} aria-label={text}>
        {characters.map(({ character, index }) => (
          <span
            key={`${character}-${index}`}
            className="scroll-float-char inline-block"
            style={{ transitionDelay: `calc(${index} * var(--scroll-float-stagger))` }}
            aria-hidden="true"
          >
            {character}
          </span>
        ))}
      </span>
    </Component>
  );
}
