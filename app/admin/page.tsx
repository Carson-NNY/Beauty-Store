import { CalendarDays, Scissors, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cards = [
  {
    title: "Appointments",
    description: "Review incoming requests and day-of schedule states once booking is implemented.",
    icon: CalendarDays,
  },
  {
    title: "Services",
    description: "Manage service catalog placeholders for the single store.",
    icon: Scissors,
  },
  {
    title: "Settings",
    description: "Configure studio profile, hours, and operational preferences later.",
    icon: Settings,
  },
];

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Admin dashboard</h1>
        <p className="mt-2 text-muted-foreground">A placeholder overview for the store team.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <card.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
