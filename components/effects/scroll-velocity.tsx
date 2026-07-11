"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ScrollVelocityProps = {
  items?: { image: string; text: string }[];
  velocity?: number;
  className?: string;
  numCopies?: number;
};

export function ScrollVelocity({ items = [], velocity = 46, className, numCopies = 4 }: ScrollVelocityProps) {
  return (
    <section className="overflow-hidden bg-[#fbf8f1] py-10 sm:py-14" aria-label="Treatment photo showcase">
      <VelocityPhotos items={items} velocity={velocity} className={className} numCopies={numCopies} />
    </section>
  );
}

function VelocityPhotos({
  items,
  velocity,
  className,
  numCopies,
}: {
  items?: { image: string; text: string }[];
  velocity: number;
  className?: string;
  numCopies: number;
}) {
  const safeItems = items ?? [];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleScroll = () => {
      scrollVelocityRef.current = window.scrollY - lastScrollYRef.current;
      lastScrollYRef.current = window.scrollY;
    };

    const tick = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!paused && scrollerRef.current) {
        const firstChild = scrollerRef.current.firstElementChild as HTMLElement | null;
        const copyWidth = firstChild?.offsetWidth ?? 1;
        const directionBoost = Math.max(Math.min(scrollVelocityRef.current * 0.55, 180), -180);
        xRef.current += (velocity + directionBoost) * delta;
        xRef.current = ((xRef.current % copyWidth) + copyWidth) % copyWidth;
        scrollerRef.current.style.transform = `translate3d(${-xRef.current}px, 0, 0)`;
        scrollVelocityRef.current *= 0.88;
      }

      frameId = requestAnimationFrame(tick);
    };

    let frameId = requestAnimationFrame(tick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [paused, velocity]);

  return (
    <div className="relative overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        ref={scrollerRef}
        className={cn(
          "flex w-max items-center gap-4 will-change-transform sm:gap-5",
          className,
        )}
        aria-hidden="true"
      >
        {Array.from({ length: numCopies }).map((_, index) => (
          <div key={index} className="flex shrink-0 items-center gap-4 sm:gap-5">
            {safeItems.map((item) => (
              <figure
                key={`${item.text}-${index}`}
                className="group relative h-56 w-80 shrink-0 overflow-hidden rounded-2xl bg-muted sm:h-80 sm:w-[34rem]"
              >
                <Image
                  src={item.image}
                  alt=""
                  width={1088}
                  height={640}
                  sizes="(min-width: 640px) 34rem, 20rem"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-5 pt-16 font-serif text-2xl font-semibold text-white sm:text-3xl">
                  {item.text}
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">Treatment photo showcase with facial, massage, and body care examples.</span>
    </div>
  );
}
