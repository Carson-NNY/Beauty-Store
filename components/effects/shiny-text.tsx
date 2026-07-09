"use client";

import { type ElementType } from "react";
import { cn } from "@/lib/utils";

type ShinyTextProps = {
  text: string;
  as?: "span" | "h1" | "h2";
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: "left" | "right";
  delay?: number;
};

export function ShinyText({
  text,
  as = "span",
  disabled = false,
  speed = 2,
  className,
  color = "#dce9f8",
  shineColor = "#ffffff",
  spread = 120,
  direction = "left",
  delay = 0,
}: ShinyTextProps) {
  const Component = as as ElementType;

  return (
    <Component
      className={cn("shiny-text inline-block", disabled && "shiny-text--disabled", className)}
      style={
        {
          "--shiny-color": color,
          "--shiny-shine": shineColor,
          "--shiny-spread": `${spread}deg`,
          "--shiny-duration": `${speed}s`,
          "--shiny-delay": `${delay}s`,
          "--shiny-direction": direction === "left" ? "normal" : "reverse",
        } as React.CSSProperties
      }
    >
      {text}
    </Component>
  );
}
