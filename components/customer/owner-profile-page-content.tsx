"use client";

import Image from "next/image";
import { Award, HeartHandshake, Leaf, Sparkles } from "lucide-react";
import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import { useLanguage } from "@/components/i18n/language-provider";
import { PendingLinkButton } from "@/components/ui/pending-link-button";
import { getBusinessProfile } from "@/lib/i18n";

const ownerImageUrl =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80";

const content = {
  zh: {
    eyebrow: "店主介绍",
    title: "用细致护理，留住一段安静放松的时间",
    intro:
      "美兰养生美容馆由一位重视细节、沟通和舒适体验的本地护理师经营。每一次服务都希望让顾客在忙碌生活里慢下来，被认真倾听，也被温柔照顾。",
    quote: "护理不只是完成一个项目，而是让人重新感觉轻松、干净、被照顾。",
    imageAlt: "温暖自然光下的美容护理工作室氛围",
    approachTitle: "护理理念",
    approach:
      "店主相信好的护理应该简单、清楚、舒服。预约前会尽量了解顾客需求，服务中注重力度、节奏和卫生细节，结束后也会给出容易理解的日常护理建议。",
    cta: "预约护理",
    contact: "联系店里",
    highlights: [
      { title: "细致沟通", description: "先了解你的状态和需求，再安排适合的护理方式。", icon: HeartHandshake },
      { title: "安静舒适", description: "用稳定节奏和温和手法，帮助身体与情绪慢慢放松。", icon: Leaf },
      { title: "干净专业", description: "重视护理前后的清洁、用品整理和空间舒适度。", icon: Sparkles },
      { title: "长期照顾", description: "不追求复杂流程，更重视每次护理后的真实感受。", icon: Award },
    ],
    values: ["预约制接待", "中英双语友好", "面部护理", "按摩放松", "上门护理可咨询"],
  },
  en: {
    eyebrow: "Meet the Owner",
    title: "Thoughtful care for a quieter, more relaxed pause",
    intro:
      "Mei Lan Wellness Spa is led by a local care provider who values detail, clear communication, and a calm client experience. Each visit is designed to help you slow down and feel genuinely looked after.",
    quote: "Care is not only a service. It is a moment to feel lighter, cleaner, and thoughtfully supported.",
    imageAlt: "Warm natural-light beauty studio atmosphere",
    approachTitle: "Care Philosophy",
    approach:
      "Good care should feel simple, clear, and comfortable. Before each visit, we listen to your needs; during treatment, we pay attention to pressure, rhythm, cleanliness, and comfort.",
    cta: "Book care",
    contact: "Contact studio",
    highlights: [
      { title: "Careful Listening", description: "We start with your needs and choose a suitable treatment path.", icon: HeartHandshake },
      { title: "Calm Comfort", description: "A steady rhythm and gentle touch help the body settle.", icon: Leaf },
      { title: "Clean Detail", description: "Clean tools, tidy rooms, and thoughtful preparation matter.", icon: Sparkles },
      { title: "Long-Term Care", description: "Simple, consistent care matters more than a complicated process.", icon: Award },
    ],
    values: ["By appointment", "Chinese / English friendly", "Facial care", "Relaxing massage", "Home visits by request"],
  },
} as const;

export function OwnerProfilePageContent() {
  const { language } = useLanguage();
  const businessProfile = getBusinessProfile(language);
  const page = content[language];

  return (
    <main className="bg-[#f7f3ec]">
      <section className="relative overflow-hidden bg-[#14100d] text-[#fff8ed]">
        <Image
          src={ownerImageUrl}
          alt={page.imageAlt}
          width={1400}
          height={980}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,8,0.96)_0%,rgba(13,10,8,0.76)_48%,rgba(13,10,8,0.38)_100%)]" />
        <div className="container relative grid min-h-[560px] items-end py-12 sm:py-16 lg:min-h-[660px]">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8b879]">{page.eyebrow}</p>
            <h1 className="font-serif text-5xl font-semibold leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
              {page.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[#dfd0be] sm:text-lg">{page.intro}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <PendingLinkButton href="/book" size="lg" className="rounded-full bg-[#fff8ed] px-7 text-[#14100d] hover:bg-[#fff8ed]/90">
                {page.cta}
              </PendingLinkButton>
              <PendingLinkButton
                href="/contact"
                size="lg"
                variant="outline"
                className="rounded-full border-[#fff8ed]/25 bg-white/5 px-7 text-[#fff8ed] hover:bg-white/10"
              >
                {page.contact}
              </PendingLinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 sm:py-24">
        <div className="grid gap-12 border-y border-foreground/10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-16">
          <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/80">{businessProfile.name}</p>
              <blockquote className="mt-5 max-w-xl font-serif text-4xl font-semibold leading-[1.08] tracking-normal text-foreground sm:text-5xl">
                “{page.quote}”
              </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 border-t border-foreground/10 pt-6 text-sm font-medium text-primary sm:grid-cols-3 lg:grid-cols-2">
              {page.values.map((value) => (
                <span key={value} className="leading-6">
                  {value}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <div className="grid gap-6 lg:grid-cols-[0.42fr_1fr]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">{page.approachTitle}</p>
              <div className="space-y-5">
                <h2 className="font-serif text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                  {language === "zh" ? "温柔、清楚、不过度复杂" : "Gentle, clear, never overcomplicated"}
                </h2>
                <p className="max-w-3xl text-base leading-8 text-muted-foreground">{page.approach}</p>
              </div>
            </div>

            <div className="divide-y divide-foreground/10">
              {page.highlights.map((item, index) => (
                <div key={item.title} className="grid gap-4 py-7 first:pt-0 sm:grid-cols-[5rem_1fr] sm:gap-8">
                  <div className="flex items-center gap-3 text-primary">
                    <span className="font-serif text-3xl leading-none text-accent/70">{String(index + 1).padStart(2, "0")}</span>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-[0.45fr_1fr] sm:gap-8">
                    <h3 className="text-xl font-semibold tracking-normal">{item.title}</h3>
                    <p className="leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MobileActionBar />
    </main>
  );
}
