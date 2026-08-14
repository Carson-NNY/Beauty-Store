"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Falloff = "linear" | "smooth" | "sharp";

export interface LineSidebarProps {
  items: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  activeIndex?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

const falloffCurves: Record<Falloff, (value: number) => number> = {
  linear: (value) => value,
  smooth: (value) => value * value * (3 - 2 * value),
  sharp: (value) => value * value * value,
};

export default function LineSidebar({
  items,
  accentColor = "#8b5e45",
  textColor = "#62584f",
  markerColor = "#b9ab9e",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 18,
  falloff = "smooth",
  markerLength = 52,
  markerGap = 12,
  tickScale = 0.45,
  itemGap = 18,
  fontSize = 1,
  smoothing = 100,
  defaultActive = 0,
  activeIndex: controlledActiveIndex,
  onItemClick,
  className,
}: LineSidebarProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState<number | null>(defaultActive);
  const activeIndex = controlledActiveIndex ?? internalActiveIndex;
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const frameRef = useRef<number | null>(null);
  const previousTimeRef = useRef(0);
  const animateFrameRef = useRef<(time: number) => void>(() => undefined);

  const animate = useCallback((time: number) => {
    const delta = Math.min((time - previousTimeRef.current) / 1000, 0.05);
    const easing = 1 - Math.exp(-delta / Math.max(smoothing / 1000, 0.001));
    previousTimeRef.current = time;
    let moving = false;

    itemRefs.current.forEach((element, index) => {
      if (!element) return;
      const target = Math.max(targetsRef.current[index] ?? 0, activeIndex === index ? 1 : 0);
      const current = currentRef.current[index] ?? 0;
      const next = current + (target - current) * easing;
      const value = Math.abs(target - next) < 0.002 ? target : next;
      currentRef.current[index] = value;
      element.style.setProperty("--effect", value.toFixed(4));
      if (value !== target) moving = true;
    });

    frameRef.current = moving ? requestAnimationFrame((nextTime) => animateFrameRef.current(nextTime)) : null;
  }, [activeIndex, smoothing]);

  const startAnimation = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    previousTimeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    animateFrameRef.current = animate;
  }, [animate]);

  useEffect(() => {
    startAnimation();
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [startAnimation]);

  function handlePointerMove(event: React.PointerEvent<HTMLUListElement>) {
    const list = listRef.current;
    if (!list || event.pointerType === "touch") return;
    const pointerY = event.clientY - list.getBoundingClientRect().top;
    const ease = falloffCurves[falloff];

    itemRefs.current.forEach((element, index) => {
      if (!element) return;
      const distance = Math.abs(pointerY - (element.offsetTop + element.offsetHeight / 2));
      targetsRef.current[index] = ease(Math.max(0, 1 - distance / proximityRadius));
    });
    startAnimation();
  }

  function clearPointerEffects() {
    targetsRef.current = items.map(() => 0);
    startAnimation();
  }

  return (
    <nav
      aria-label="Service categories"
      className={cn("relative", className)}
      style={{
        "--sidebar-accent": accentColor,
        "--sidebar-text": textColor,
        "--sidebar-marker": markerColor,
        "--marker-length": `${markerLength}px`,
        "--marker-gap": `${markerGap}px`,
        "--max-shift": `${maxShift}px`,
        "--tick-scale": tickScale,
        "--item-gap": `${itemGap}px`,
        "--item-font-size": `${fontSize}rem`,
      } as CSSProperties}
    >
      <ul
        ref={listRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={clearPointerEffects}
        className="m-0 flex list-none flex-col gap-[var(--item-gap)] py-3"
      >
        {items.map((label, index) => (
          <li key={label}>
            <button
              ref={(element) => { itemRefs.current[index] = element; }}
              type="button"
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => {
                setInternalActiveIndex(index);
                onItemClick?.(index, label);
              }}
              className={cn(
                "group relative flex min-h-11 w-full cursor-pointer items-center rounded-sm text-left transition-colors",
                showMarker && "pl-[calc(var(--marker-length)+var(--marker-gap))]",
              )}
            >
              {showMarker ? (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-px w-[var(--marker-length)] origin-left bg-[color-mix(in_srgb,var(--sidebar-accent)_calc(var(--effect,0)*100%),var(--sidebar-marker))] [transform:translateY(-50%)_scaleX(calc(var(--tick-scale)+var(--effect,0)*(1-var(--tick-scale))))] motion-reduce:transform-none"
                />
              ) : null}
              <span
                className="inline-flex items-baseline leading-tight text-[color-mix(in_srgb,var(--sidebar-accent)_calc(var(--effect,0)*100%),var(--sidebar-text))] [font-size:var(--item-font-size)] [transform:translateX(calc(var(--effect,0)*var(--max-shift)))] motion-reduce:transform-none"
              >
                {showIndex ? <span className="mr-3 font-mono text-[0.78em] opacity-65">{String(index + 1).padStart(2, "0")}</span> : null}
                <span className="font-medium">{label}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
