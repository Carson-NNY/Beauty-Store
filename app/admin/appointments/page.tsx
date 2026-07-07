import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Admin Appointments",
};

export default function AdminAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Appointments</h1>
        <p className="mt-2 text-muted-foreground">
          Placeholder queue for appointment requests. Booking logic is intentionally not implemented yet.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Today</CardTitle>
        </CardHeader>
        <CardContent className="flex min-h-40 flex-col items-start justify-center gap-3">
          <Badge variant="secondary">Empty state</Badge>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Appointment rows will appear here after the booking workflow and database reads are added.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
