import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LanguageProvider } from "@/components/i18n/language-provider";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <div className="min-h-dvh">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </LanguageProvider>
  );
}
