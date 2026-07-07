"use client";

import { Renderer, Program, Mesh, Triangle, Color } from "ogl";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SideRaysProps = {
  className?: string;
  origin?: "top-left" | "top-right";
  rayColor1?: string;
  rayColor2?: string;
  speed?: number;
  intensity?: number;
  spread?: number;
  saturation?: number;
  blend?: number;
  falloff?: number;
  opacity?: number;
};

const vertex = /* glsl */ `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uOrigin;
uniform vec3 uRayColor1;
uniform vec3 uRayColor2;
uniform float uIntensity;
uniform float uSpread;
uniform float uSaturation;
uniform float uBlend;
uniform float uFalloff;
uniform float uOpacity;
varying vec2 vUv;

float ray(vec2 uv, float angle, float width, float drift) {
  vec2 direction = normalize(uv - uOrigin);
  float angular = abs(atan(direction.y, direction.x) - angle);
  angular = min(angular, 6.2831853 - angular);
  float beam = smoothstep(width, 0.0, angular);
  float distanceFromOrigin = length((uv - uOrigin) * vec2(uResolution.x / uResolution.y, 1.0));
  float fade = exp(-distanceFromOrigin * uFalloff);
  float shimmer = 0.84 + 0.16 * sin(uTime * 0.55 + drift + uv.y * 8.0);
  return beam * fade * shimmer;
}

void main() {
  vec2 uv = vUv;
  float r1 = ray(uv, 2.46, 0.34 * uSpread, 0.0);
  float r2 = ray(uv, 2.72, 0.22 * uSpread, 1.9);
  float r3 = ray(uv, 2.18, 0.18 * uSpread, 3.4);
  float strength = (r1 + r2 * 0.7 + r3 * 0.45) * uIntensity;
  vec3 color = mix(uRayColor2, uRayColor1, clamp(r1 * uBlend + r2 * 0.35, 0.0, 1.0));
  color = mix(vec3(dot(color, vec3(0.299, 0.587, 0.114))), color, uSaturation);
  gl_FragColor = vec4(color, clamp(strength * uOpacity, 0.0, 0.62));
}
`;

export function SideRays({
  className,
  origin = "top-right",
  rayColor1 = "#D8B879",
  rayColor2 = "#8B6F4E",
  speed = 0.45,
  intensity = 1.4,
  spread = 1.6,
  saturation = 1.1,
  blend = 0.55,
  falloff = 1.4,
  opacity = 0.45,
}: SideRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio, 1.5) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uOrigin: { value: origin === "top-right" ? [0.92, 0.08] : [0.08, 0.08] },
        uRayColor1: { value: new Color(rayColor1) },
        uRayColor2: { value: new Color(rayColor2) },
        uIntensity: { value: intensity },
        uSpread: { value: spread },
        uSaturation: { value: saturation },
        uBlend: { value: blend },
        uFalloff: { value: falloff },
        uOpacity: { value: opacity },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    let frameId = 0;
    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };

    const render = (time: number) => {
      program.uniforms.uTime.value = time * 0.001 * speed;
      renderer.render({ scene: mesh });
      frameId = requestAnimationFrame(render);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      gl.canvas.remove();
    };
  }, [blend, falloff, intensity, opacity, origin, rayColor1, rayColor2, saturation, speed, spread]);

  return (
    <div
      ref={containerRef}
      className={cn("side-rays pointer-events-none absolute inset-0 z-[4] h-full w-full overflow-hidden", className)}
      aria-hidden="true"
    />
  );
}
