"use client";

import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessProfile } from "@/lib/i18n";

export function ContactPanel() {
  const { language, t } = useLanguage();
  const businessProfile = getBusinessProfile(language);
  const mapQuery = encodeURIComponent(businessProfile.address);
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

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
      <div className="overflow-hidden rounded-lg border bg-secondary/40 p-5">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-primary">{t.contact.map}</p>
            <p className="mt-3 text-2xl font-semibold tracking-normal">{businessProfile.mapLabel}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.contact.mapDescription}</p>
          </div>
          <div className="overflow-hidden rounded-md border bg-card shadow-sm">
            <iframe
              title={`${businessProfile.name} map`}
              src={mapEmbedUrl}
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <Button asChild variant="outline" className="w-full">
            <a href={directionsUrl} target="_blank" rel="noreferrer">
              <Navigation className="h-4 w-4" aria-hidden="true" />
              {t.contact.directions}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
