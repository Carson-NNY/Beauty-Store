"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, Home, Menu, Phone, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { LanguageToggle } from "@/components/i18n/language-toggle";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { getBusinessProfile } from "@/lib/i18n";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, t } = useLanguage();
  const businessProfile = getBusinessProfile(language);
  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/contact", label: t.nav.contact },
  ];
  const menuGroups = [
    {
      label: t.nav.visit,
      bgColor: "#1f3028",
      textColor: "#fffaf3",
      icon: Home,
      links: [
        { href: "/", label: t.nav.home, ariaLabel: t.nav.home },
        { href: "/contact", label: t.nav.contact, ariaLabel: t.nav.contact },
      ],
    },
    {
      label: t.nav.care,
      bgColor: "#352820",
      textColor: "#fffaf3",
      icon: Sparkles,
      links: [
        { href: "/services", label: t.nav.allServices, ariaLabel: t.nav.allServices },
        { href: "/book", label: t.nav.bookNow, ariaLabel: t.nav.bookNow },
      ],
    },
    {
      label: t.nav.connect,
      bgColor: "#28222c",
      textColor: "#fffaf3",
      icon: Phone,
      links: [
        { href: `tel:${businessProfile.phone}`, label: t.nav.callStudio, ariaLabel: t.nav.callStudio },
        { href: "/book/confirmation", label: t.nav.confirmation, ariaLabel: t.nav.confirmation },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-semibold tracking-[0.08em]" onClick={() => setMenuOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm text-primary-foreground">
            ML
          </span>
          <span>{businessProfile.name}</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <Button asChild variant="ghost">
            <a href={`tel:${businessProfile.phone}`}>{t.nav.call}</a>
          </Button>
        </nav>
        <LanguageToggle className="hidden sm:inline-flex" />
        <Button asChild className="hidden sm:inline-flex">
          <Link href="/book">{t.nav.bookNow}</Link>
        </Button>
        <div className="flex items-center gap-2 sm:hidden">
          <Button asChild size="icon" variant="ghost" aria-label={t.nav.callStudio}>
            <a href={`tel:${businessProfile.phone}`}>
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-card-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </Button>
        </div>
      </div>
      <div
        id="mobile-card-navigation"
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out sm:hidden"
        style={{ gridTemplateRows: menuOpen ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <nav
            aria-label="Mobile navigation"
            className="container grid gap-2 border-t border-border/70 pb-4 pt-3"
            aria-hidden={!menuOpen}
          >
            <LanguageToggle className="justify-self-start bg-card/80" />
            {menuGroups.map((group, index) => {
              const Icon = group.icon;

              return (
                <div
                  key={group.label}
                  className="rounded-2xl p-4 text-sm shadow-sm transition duration-300 ease-out"
                  style={{
                    backgroundColor: group.bgColor,
                    color: group.textColor,
                    transitionDelay: menuOpen ? `${index * 55}ms` : "0ms",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
                  }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-base font-medium">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {group.label}
                    </span>
                    <CalendarDays className="h-4 w-4 opacity-50" aria-hidden="true" />
                  </div>
                  <div className="grid gap-2">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-label={link.ariaLabel}
                        tabIndex={menuOpen ? 0 : -1}
                        className="inline-flex min-h-10 items-center justify-between rounded-full bg-white/8 px-3 text-sm transition hover:bg-white/12"
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
