"use client";

import { MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PendingLinkButton } from "@/components/ui/pending-link-button";
import { getBusinessProfile } from "@/lib/i18n";

export function ConfirmationPageContent({
  service,
  preferredStartTime,
  customerName,
  emailSent,
}: {
  service?: string;
  preferredStartTime?: string;
  customerName?: string;
  emailSent?: boolean;
}) {
  const { language, t } = useLanguage();
  const businessProfile = getBusinessProfile(language);
  const appointmentTime = preferredStartTime ? formatConfirmationDateTime(preferredStartTime, language) : "";

  return (
    <main className="container max-w-2xl space-y-6 py-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">{t.confirmation.eyebrow}</p>
        <h1 className="text-4xl font-semibold tracking-normal">{t.confirmation.title}</h1>
        <p className="leading-7 text-muted-foreground">{t.confirmation.description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{service || t.confirmation.fallbackService}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 rounded-md bg-muted p-4 text-sm">
            <SummaryRow label={t.confirmation.date} value={appointmentTime || t.confirmation.fallbackDate} />
            {customerName ? <SummaryRow label={t.confirmation.customer} value={customerName} /> : null}
            <SummaryRow label={t.confirmation.address} value={businessProfile.address} />
            <SummaryRow label={t.contact.phone} value={businessProfile.phone} />
          </div>
          <p className="rounded-md border border-primary/15 bg-secondary/40 p-4 text-sm leading-6 text-muted-foreground">
            {emailSent ? t.confirmation.emailNotice : t.confirmation.description}
          </p>
          <div className="grid gap-3">
            <Button asChild>
              <a href={`tel:${businessProfile.phone}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t.confirmation.callStudio}
              </a>
            </Button>
          </div>
          <div className="rounded-md border border-dashed p-4">
            <p className="flex gap-2 text-sm leading-6 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{t.confirmation.mapNote}</span>
            </p>
          </div>
        </CardContent>
      </Card>
      <PendingLinkButton href="/book" variant="outline" className="w-full">
        {t.confirmation.bookAnother}
      </PendingLinkButton>
    </main>
  );
}

function formatConfirmationDateTime(value: string, language: "zh" | "en") {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  );
}
