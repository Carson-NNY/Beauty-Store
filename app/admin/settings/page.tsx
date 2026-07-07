import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Admin Settings",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Settings</h1>
        <p className="mt-2 text-muted-foreground">Studio profile and admin preferences will be configured here.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Store profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            Supabase-backed settings will be added after the foundational schema and authentication decisions are finalized.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
