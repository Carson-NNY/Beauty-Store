"use client";

import { ContactPanel } from "@/components/customer/contact-panel";
import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import { useLanguage } from "@/components/i18n/language-provider";
import { PendingLinkButton } from "@/components/ui/pending-link-button";
import { getBusinessProfile } from "@/lib/i18n";

export function ContactPageContent() {
  const { language, t } = useLanguage();
  const businessProfile = getBusinessProfile(language);

  return (
    <main className="container space-y-8 py-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">{t.contact.eyebrow}</p>
        <h1 className="text-4xl font-semibold tracking-normal">{t.contact.title}</h1>
        <p className="max-w-2xl leading-7 text-muted-foreground">
          {language === "zh" ? businessProfile.name : `${businessProfile.name} `}
          {t.contact.description}
        </p>
      </div>
      <ContactPanel />
      <div className="grid gap-3 rounded-lg border bg-card p-5 text-sm text-muted-foreground sm:grid-cols-3">
        <p>
          <span className="block font-medium text-foreground">{t.contact.address}</span>
          {businessProfile.address}
        </p>
        <p>
          <span className="block font-medium text-foreground">{t.contact.hours}</span>
          {businessProfile.hoursSummary}
        </p>
        <p>
          <span className="block font-medium text-foreground">{t.contact.phone}</span>
          {businessProfile.phone}
        </p>
      </div>
      <PendingLinkButton href="/book" size="lg" className="w-full sm:w-auto">
        {t.common.bookNow}
      </PendingLinkButton>
      <MobileActionBar />
    </main>
  );
}
