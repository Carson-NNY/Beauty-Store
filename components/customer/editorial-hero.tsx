import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Phone } from "lucide-react";
import { BorderGlow } from "@/components/effects/border-glow";
import { SideRays } from "@/components/effects/side-rays";
import { Button } from "@/components/ui/button";
import { businessProfile } from "@/lib/mock-data/customer";

const heroImageUrl =
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1600&q=80";

export function EditorialHero() {
  return (
    <section className="bg-[#090806] px-3 py-3 text-[#f8f1e8] sm:px-4 sm:py-5">
      <div className="mx-auto grid max-w-[1400px] gap-4 lg:min-h-[760px] lg:grid-cols-[1.2fr_0.72fr]">
        <div className="relative min-h-[640px] overflow-hidden rounded-[1.75rem] border border-[#d8b879]/15 bg-[#0d0b09] shadow-2xl sm:min-h-[720px] lg:min-h-0">
          <Image
            src={heroImageUrl}
            alt="Dimly lit spa treatment detail with warm towels and botanical care"
            width={1600}
            height={1200}
            priority
            sizes="(min-width: 1024px) 64vw, 100vw"
            className="absolute inset-0 z-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(7,6,5,0.98)_0%,rgba(13,10,8,0.82)_40%,rgba(13,10,8,0.48)_72%,rgba(13,10,8,0.32)_100%)]" />
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_82%_14%,rgba(216,184,121,0.2),transparent_28%),radial-gradient(circle_at_22%_30%,rgba(139,111,78,0.2),transparent_36%),linear-gradient(0deg,rgba(7,6,5,0.94)_0%,transparent_44%)]" />
          <SideRays className="hidden opacity-95 sm:block" />
          <div className="relative z-10 flex min-h-[640px] flex-col justify-between p-6 sm:min-h-[720px] sm:p-10 lg:min-h-full lg:p-14">
            <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-white/70">
              <span>[店名 Placeholder]</span>
              <span className="hidden sm:inline">中文 / English</span>
            </div>
            <div className="max-w-2xl space-y-6 pb-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d8b879]">Premium appointment care</p>
              <h1 className="font-serif text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-7xl lg:text-8xl">
                RELAXATION &amp; BEAUTY CARE
              </h1>
              <p className="max-w-xl text-base leading-8 text-[#c9bbaa] sm:text-lg">
                Personalized massage and beauty treatments designed to help you feel renewed, balanced, and cared for.
              </p>
              <div className="grid gap-3 pt-2 sm:flex">
                <Button asChild size="lg" className="rounded-full bg-[#f8f1e8] px-7 text-[#15110e] hover:bg-[#f8f1e8]/90">
                  <Link href="/book">
                    <CalendarDays className="h-5 w-5" aria-hidden="true" />
                    Book Now
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-[#d8b879]/35 bg-white/5 px-7 text-[#f8f1e8] hover:bg-white/10"
                >
                  <a href={`tel:${businessProfile.phone}`}>
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    Call Us
                  </a>
                </Button>
              </div>
            </div>
            <p className="flex flex-wrap items-center gap-2 text-sm leading-6 text-[#c9bbaa]">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              San Jose, CA <span aria-hidden="true">·</span> By appointment <span aria-hidden="true">·</span> 中文 / English
            </p>
          </div>
        </div>

        <div className="flex items-stretch lg:py-12 lg:pr-4">
          <BorderGlow className="w-full">
            <aside className="relative flex h-full min-h-[380px] overflow-hidden rounded-[calc(2rem-1px)] border border-[#d8b879]/20 bg-[linear-gradient(145deg,#201915_0%,#17120f_48%,#0f0d0b_100%)] p-7 text-[#f8f1e8] shadow-2xl sm:min-h-[460px] sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(216,184,121,0.16),transparent_30%),radial-gradient(circle_at_85%_78%,rgba(139,111,78,0.18),transparent_28%)]" />
              <div className="pointer-events-none absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-[#d8b879]/35 to-transparent" />
              <div className="relative z-10 flex min-h-full w-full flex-col justify-between gap-10">
                <div className="space-y-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b879]">SIGNATURE CARE</p>
                  <h2 className="max-w-md font-serif text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                  Calm treatments, thoughtfully chosen.
                  </h2>
                </div>

                <div className="grid gap-4">
                  <div className="h-24 rounded-[1.25rem] border border-[#d8b879]/15 bg-[linear-gradient(110deg,rgba(216,184,121,0.12),rgba(255,255,255,0.02)_42%,rgba(139,111,78,0.16))]" />
                  <p className="max-w-md text-base leading-8 text-[#c9bbaa]">
                    Explore our most-loved treatments, from relaxing body massage to gentle beauty care.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-fit rounded-full bg-[#f8f1e8] px-8 text-[#15110e] hover:bg-[#f8f1e8]/90"
                  >
                    <Link href="/services">View Services</Link>
                  </Button>
                </div>
              </div>
            </aside>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
