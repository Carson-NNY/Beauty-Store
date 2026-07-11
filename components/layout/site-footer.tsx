"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/language-provider";
import { getBusinessProfile } from "@/lib/i18n";

export function SiteFooter() {
  const { language, t } = useLanguage();
  const businessProfile = getBusinessProfile(language);

  return (
    <footer className="border-t bg-card pb-24 sm:pb-0">
      <div className="container grid gap-6 py-8 text-sm text-muted-foreground sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-semibold tracking-[0.08em] text-foreground">{businessProfile.name}</p>
          <p className="mt-2 max-w-sm leading-6">{businessProfile.intro}</p>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-foreground">{t.nav.visit}</p>
          <p>{businessProfile.address}</p>
          <p>{businessProfile.hoursSummary}</p>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-foreground">{t.contact.quickLinks}</p>
          <Link href="/services" className="block underline-offset-4 hover:underline">
            {t.nav.services}
          </Link>
          <Link href="/book" className="block underline-offset-4 hover:underline">
            {t.contact.bookAppointment}
          </Link>
          <Link href="/contact" className="block underline-offset-4 hover:underline">
            {t.nav.contact}
          </Link>
          <Link href="/admin" className="block text-xs underline-offset-4 hover:underline">
            {language === "zh" ? "店主管理" : "Admin"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
