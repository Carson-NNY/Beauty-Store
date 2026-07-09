"use client";

import { BookingFlow } from "@/components/customer/booking-flow";
import { useLanguage } from "@/components/i18n/language-provider";

export function BookPageContent({
  initialServiceId,
  startDateIso,
}: {
  initialServiceId?: string;
  startDateIso: string;
}) {
  const { t } = useLanguage();

  return (
    <main className="container max-w-2xl space-y-6 py-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">{t.booking.pageEyebrow}</p>
        <h1 className="text-4xl font-semibold tracking-normal">{t.booking.pageTitle}</h1>
        <p className="leading-7 text-muted-foreground">{t.booking.pageDescription}</p>
      </div>
      <BookingFlow initialServiceId={initialServiceId} startDateIso={startDateIso} />
    </main>
  );
}
