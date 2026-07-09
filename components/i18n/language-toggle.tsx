"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/i18n/language-provider";
import { languageLabels } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { language, toggleLanguage, t } = useLanguage();
  const nextLanguage = language === "zh" ? "en" : "zh";

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={toggleLanguage}
      aria-label={t.nav.switchLanguage}
      className={cn("min-h-11 rounded-full px-3 text-sm font-medium", className)}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span>{languageLabels[nextLanguage]}</span>
    </Button>
  );
}
