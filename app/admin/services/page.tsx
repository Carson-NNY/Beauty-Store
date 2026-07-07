import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Admin Services",
};

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal">Service catalog</h1>
          <p className="mt-2 text-muted-foreground">Draft area for the single-store service list.</p>
        </div>
        <Button disabled>Add service</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Catalog setup</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            CRUD flows are intentionally deferred. This page reserves the route and layout for future service management.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
