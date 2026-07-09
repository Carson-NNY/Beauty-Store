"use client";

import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessProfile } from "@/lib/i18n";

export function ContactPanel() {
  const { language, t } = useLanguage();
  const businessProfile = getBusinessProfile(language);

  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle>{t.contact.visitStudio}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span>{businessProfile.address}</span>
            </p>
            <p>{businessProfile.hoursSummary}</p>
            <p>{businessProfile.wechat}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild>
              <a href={`tel:${businessProfile.phone}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t.common.call} {businessProfile.phone}
              </a>
            </Button>
            <Button variant="secondary" disabled>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t.contact.wechatPlaceholder}
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="min-h-64 rounded-lg border bg-secondary/40 p-5">
        <div className="flex h-full min-h-56 flex-col justify-between rounded-md border border-dashed border-primary/30 bg-card/70 p-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">{t.contact.map}</p>
            <p className="mt-3 text-2xl font-semibold tracking-normal">{businessProfile.mapLabel}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t.contact.mapDescription}
            </p>
          </div>
          <Button variant="outline" disabled className="mt-6 w-full">
            <Navigation className="h-4 w-4" aria-hidden="true" />
            {t.contact.directions}
          </Button>
        </div>
      </div>
    </section>
  );
}
