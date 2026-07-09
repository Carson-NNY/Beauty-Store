"use client";

import Link from "next/link";
import { CalendarPlus, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessProfile } from "@/lib/i18n";

export function ConfirmationPageContent({
  service,
  date,
  time,
  visitType,
  address,
}: {
  service?: string;
  date?: string;
  time?: string;
  visitType?: string;
  address?: string;
}) {
  const { language, t } = useLanguage();
  const businessProfile = getBusinessProfile(language);
  const appointmentAddress = address || businessProfile.address;

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
            {visitType ? <SummaryRow label={t.booking.visitType} value={visitType} /> : null}
            <SummaryRow label={t.confirmation.date} value={date || t.confirmation.fallbackDate} />
            <SummaryRow label={t.confirmation.time} value={time || "11:30 AM"} />
            <SummaryRow label={t.confirmation.address} value={appointmentAddress} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild>
              <a href={`tel:${businessProfile.phone}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t.confirmation.callStudio}
              </a>
            </Button>
            <Button variant="secondary" disabled>
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              {t.confirmation.addCalendar}
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
      <Button asChild variant="outline" className="w-full">
        <Link href="/book">{t.confirmation.bookAnother}</Link>
      </Button>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  );
}
