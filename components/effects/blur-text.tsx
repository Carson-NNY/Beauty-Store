"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BlurTextProps = {
  as?: "h1" | "p";
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  className?: string;
};

export function BlurText({
  as,
  text,
  delay = 120,
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  className,
}: BlurTextProps) {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);
  const segments = animateBy === "words" ? text.split(" ") : text.split("");
  const setRef = (node: HTMLHeadingElement | HTMLParagraphElement | null) => {
    ref.current = node;
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const content = (
    <>
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          className="blur-text-segment"
          style={{ transitionDelay: `${index * delay}ms` }}
        >
          {segment}
          {animateBy === "words" && index < segments.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </>
  );

  if (as === "h1") {
    return (
      <h1 ref={setRef} className={cn("blur-text flex flex-wrap", className)} data-in-view={inView} data-direction={direction}>
        {content}
      </h1>
    );
  }

  return (
    <p ref={setRef} className={cn("blur-text flex flex-wrap", className)} data-in-view={inView} data-direction={direction}>
      {content}
    </p>
  );
}
