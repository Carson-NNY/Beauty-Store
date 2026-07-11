import { cookies } from "next/headers";
import { loginAdminAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/layout/admin-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PendingLinkButton } from "@/components/ui/pending-link-button";
import { PendingSubmitButton } from "@/components/ui/pending-submit-button";
import {
  adminSessionCookieName,
  isAdminProtectionConfigured,
  isValidAdminSession,
} from "@/modules/admin/auth";

export const metadata = {
  title: "店主管理",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const protectionConfigured = isAdminProtectionConfigured();
  const cookieStore = await cookies();
  const hasValidSession = isValidAdminSession(cookieStore.get(adminSessionCookieName)?.value);

  if (!hasValidSession) {
    return <AdminLoginScreen protectionConfigured={protectionConfigured} />;
  }

  return <AdminShell protectionConfigured={protectionConfigured}>{children}</AdminShell>;
}

function AdminLoginScreen({ protectionConfigured }: { protectionConfigured: boolean }) {
  return (
    <main className="min-h-dvh bg-muted/40 px-4 py-10">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">店主管理登录</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">请输入临时管理密码，查看预约提交信息。</p>
        </CardHeader>
        <CardContent>
          {!protectionConfigured ? (
            <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
              店主管理密码还没有配置。请先在 <code>.env</code> 中设置 <code>ADMIN_PASSWORD</code>，然后重新启动网站。
            </div>
          ) : null}
          <form action={loginAdminAction} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="admin-password">密码</Label>
              <Input id="admin-password" name="password" type="password" autoComplete="current-password" required />
            </div>
            <PendingSubmitButton className="w-full" pendingLabel="正在登录">
              登录
            </PendingSubmitButton>
          </form>
          <PendingLinkButton href="/" variant="link" className="mt-4 px-0">
            返回网站
          </PendingLinkButton>
        </CardContent>
      </Card>
    </main>
  );
}
