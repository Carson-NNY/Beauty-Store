"use client";

import { type CSSProperties, type PointerEvent, type ReactNode, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
};

const gradientPositions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const colorMap = [0, 1, 2, 0, 1, 2, 1];

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers: [number, number, number, number, number, boolean][] = [
    [0, 0, 1, 0, 60, true],
    [0, 0, 6, 0, 35, true],
    [0, 0, 18, 1, 18, true],
    [0, 0, 1, 0, 45, false],
    [0, 0, 12, 0, 20, false],
    [0, 0, 34, 1, 9, false],
  ];

  return layers
    .map(([x, y, blur, spread, alpha, inset]) => {
      const a = Math.min(alpha * intensity, 100);
      return `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
    })
    .join(", ");
}

function buildMeshGradients(colors: string[]): string[] {
  const gradients = gradientPositions.map((position, index) => {
    const color = colors[Math.min(colorMap[index], colors.length - 1)];
    return `radial-gradient(at ${position}, ${color} 0px, transparent 50%)`;
  });
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

export function BorderGlow({
  children,
  className,
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "transparent",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity = 0.5,
}: BorderGlowProps) {
  const [hovered, setHovered] = useState(false);
  const [cursorAngle, setCursorAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(animated ? 0.85 : 0);

  const meshGradients = useMemo(() => buildMeshGradients(colors), [colors]);
  const visible = hovered || animated;
  const colorSensitivity = edgeSensitivity + 20;
  const borderOpacity = visible ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity)) : 0;
  const glowOpacity = visible ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity)) : 0;
  const angleDeg = `${cursorAngle.toFixed(3)}deg`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const kx = dx === 0 ? Infinity : cx / Math.abs(dx);
    const ky = dy === 0 ? Infinity : cy / Math.abs(dy);
    const proximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    const radians = Math.atan2(dy, dx);
    const degrees = (radians * 180) / Math.PI + 90;

    setEdgeProximity(proximity);
    setCursorAngle(degrees < 0 ? degrees + 360 : degrees);
  }

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        if (!animated) setEdgeProximity(0);
      }}
      onPointerMove={handlePointerMove}
      className={cn("relative isolate grid overflow-visible", className)}
      style={
        {
          borderRadius,
          background: backgroundColor,
          "--border-glow-angle": angleDeg,
          "--border-glow-radius": `${glowRadius}px`,
          "--border-glow-cone": `${coneSpread}%`,
          "--border-glow-opacity": borderOpacity,
          "--border-glow-fill-opacity": borderOpacity * fillOpacity,
          "--border-glow-outer-opacity": glowOpacity,
          "--border-glow-shadow": buildBoxShadow(glowColor, glowIntensity),
          "--border-glow-border-bg": [
            `linear-gradient(${backgroundColor} 0 100%) padding-box`,
            "linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box",
            ...meshGradients.map((gradient) => `${gradient} border-box`),
          ].join(", "),
          "--border-glow-fill-bg": meshGradients.map((gradient) => `${gradient} padding-box`).join(", "),
        } as CSSProperties
      }
    >
      <div className="border-glow-mesh pointer-events-none absolute inset-0 -z-[1] rounded-[inherit]" />
      <div className="border-glow-fill pointer-events-none absolute inset-0 -z-[1] rounded-[inherit]" />
      <span className="border-glow-outer pointer-events-none absolute z-[1] rounded-[inherit]">
        <span className="absolute rounded-[inherit]" />
      </span>
      <div className="relative z-[2] flex flex-col overflow-hidden rounded-[inherit]">{children}</div>
    </div>
  );
}

export default BorderGlow;
