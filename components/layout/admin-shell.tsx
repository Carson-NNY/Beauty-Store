import Link from "next/link";
import { CalendarDays, Home, LogOut, Scissors, Settings } from "lucide-react";
import { logoutAdminAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { PendingLinkButton } from "@/components/ui/pending-link-button";

const adminNav = [
  { href: "/admin", label: "总览", icon: Home },
  { href: "/admin/appointments", label: "预约记录", icon: CalendarDays },
  { href: "/admin/services", label: "服务项目", icon: Scissors },
  { href: "/admin/settings", label: "设置", icon: Settings },
];

export function AdminShell({
  children,
  protectionConfigured = false,
}: Readonly<{ children: React.ReactNode; protectionConfigured?: boolean }>) {
  return (
    <div className="min-h-dvh bg-muted/40">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between gap-4">
          <PendingLinkButton href="/" variant="secondary" size="sm">
            返回网站
          </PendingLinkButton>
          <div className="flex items-center gap-2">
            <Link href="/admin" className="font-semibold">
              店主管理
            </Link>
            {protectionConfigured ? (
              <form action={logoutAdminAction}>
                <Button type="submit" variant="ghost" size="icon" aria-label="退出登录">
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                </Button>
              </form>
            ) : null}
          </div>
        </div>
      </header>
      <div className="container grid gap-6 py-6 md:grid-cols-[220px_1fr]">
        <nav aria-label="店主管理导航" className="grid gap-2 md:self-start">
          {adminNav.map((item) => (
            <PendingLinkButton key={item.href} href={item.href} variant="ghost" className="justify-start bg-card md:bg-transparent">
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </PendingLinkButton>
          ))}
        </nav>
        <main className="min-w-0 space-y-4">
          {!protectionConfigured ? (
            <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
              店主管理密码还没有配置。分享这个管理入口前，请先在 <code>.env</code> 中设置 <code>ADMIN_PASSWORD</code>。
            </div>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  );
}
