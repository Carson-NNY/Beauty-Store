"use client";

import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { getBusinessProfile } from "@/lib/i18n";

export function MobileActionBar() {
  const { language, t } = useLanguage();
  const businessProfile = getBusinessProfile(language);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-card/95 px-4 py-3 shadow-soft backdrop-blur sm:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[1fr_1.4fr] gap-3">
        <Button asChild variant="secondary">
          <a href={`tel:${businessProfile.phone}`}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            {t.common.call}
          </a>
        </Button>
        <Button asChild>
          <Link href="/book">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {t.common.bookNow}
          </Link>
        </Button>
      </div>
    </div>
  );
}
