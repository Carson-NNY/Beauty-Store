"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Phone } from "lucide-react";
import BorderGlow from "@/components/effects/border-glow";
import { ShinyText } from "@/components/effects/shiny-text";
import SideRays from "@/components/effects/side-rays";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { getBusinessProfile } from "@/lib/i18n";

const heroImageUrl =
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1600&q=80";

export function EditorialHero() {
  const { language, t } = useLanguage();
  const businessProfile = getBusinessProfile(language);

  return (
    <section className="bg-[linear-gradient(180deg,hsl(var(--background))_0%,#17110d_16%,#090806_100%)] px-0 pb-3 pt-0 text-[#f8f1e8] sm:px-4 sm:py-5">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative min-h-[640px] overflow-hidden bg-[#0d0b09] shadow-none sm:min-h-[720px] sm:rounded-[1.75rem] sm:border sm:border-[#d8b879]/10 sm:shadow-2xl lg:min-h-[760px]">
          <Image
            src={heroImageUrl}
            alt={t.hero.imageAlt}
            width={1600}
            height={1200}
            priority
            sizes="(min-width: 1024px) 64vw, 100vw"
            className="absolute inset-0 z-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(7,6,5,0.98)_0%,rgba(13,10,8,0.82)_40%,rgba(13,10,8,0.48)_72%,rgba(13,10,8,0.32)_100%)]" />
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_82%_14%,rgba(216,184,121,0.2),transparent_28%),radial-gradient(circle_at_22%_30%,rgba(139,111,78,0.2),transparent_36%),linear-gradient(0deg,rgba(7,6,5,0.94)_0%,transparent_44%)]" />
          <div className="pointer-events-none absolute inset-0 z-[4] h-full w-full overflow-hidden opacity-40 mix-blend-screen sm:opacity-70">
            <SideRays
              speed={2.5}
              rayColor1="#e2b014"
              rayColor2="#6fa7e6"
              intensity={2}
              spread={2}
              origin="top-right"
              tilt={0}
              saturation={1.5}
              blend={0.75}
              falloff={1.6}
              opacity={1}
            />
          </div>
          <div className="relative z-10 flex min-h-[640px] flex-col justify-between p-6 sm:min-h-[720px] sm:p-10 lg:min-h-full lg:p-14">
            <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-white/70">
              <span>{t.hero.brandPlaceholder}</span>
              <span className="hidden sm:inline">{t.hero.languageNote}</span>
            </div>
            <div className="max-w-2xl space-y-6 pb-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d8b879]">{t.hero.eyebrow}</p>
              <ShinyText
                as="h1"
                text={t.hero.headline}
                speed={2.8}
                delay={0.4}
                color="#dbeafe"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                className="font-serif text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-7xl lg:text-8xl"
              />
              <p className="max-w-xl text-base leading-8 text-[#c9bbaa] sm:text-lg">
                {t.hero.subheadline}
              </p>
              <div className="grid gap-3 pt-2 sm:flex">
                <Button asChild size="lg" className="rounded-full bg-[#f8f1e8] px-7 text-[#15110e] hover:bg-[#f8f1e8]/90">
                  <Link href="/book">
                    <CalendarDays className="h-5 w-5" aria-hidden="true" />
                    {t.common.bookNow}
                  </Link>
                </Button>
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="rgba(18, 15, 23, 0.42)"
                  borderRadius={999}
                  glowRadius={34}
                  glowIntensity={0.72}
                  coneSpread={25}
                  animated={false}
                  colors={["#d8b879", "#f472b6", "#6fa7e6"]}
                  fillOpacity={0.28}
                  className="rounded-full"
                >
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full rounded-full border-[#d8b879]/20 bg-white/5 px-7 text-[#f8f1e8] hover:bg-white/10 sm:w-auto"
                  >
                    <a href={`tel:${businessProfile.phone}`}>
                      <Phone className="h-5 w-5" aria-hidden="true" />
                      {t.nav.call}
                    </a>
                  </Button>
                </BorderGlow>
              </div>
            </div>
            <p className="flex flex-wrap items-center gap-2 text-sm leading-6 text-[#c9bbaa]">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {t.hero.locationLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
