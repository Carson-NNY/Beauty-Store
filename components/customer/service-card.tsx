import Link from "next/link";
import Image from "next/image";
import { Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CustomerService } from "@/lib/mock-data/customer";

export function ServiceCard({ service, featured = false }: { service: CustomerService; featured?: boolean }) {
  return (
    <Card className="overflow-hidden">
      <div className={featured ? "grid gap-0 md:grid-cols-[0.95fr_1.05fr]" : undefined}>
        <Image
          src={service.imageUrl}
          alt={`${service.name} treatment room preview`}
          width={900}
          height={560}
          className={featured ? "aspect-[4/3] h-full w-full object-cover" : "aspect-[16/10] w-full object-cover"}
        />
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">{service.category}</p>
            <h2 className="text-2xl font-semibold tracking-normal">{service.name}</h2>
            <p className="leading-7 text-muted-foreground">{service.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="inline-flex min-h-9 items-center gap-1 rounded-full bg-muted px-3">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {service.duration}
            </span>
            <span className="inline-flex min-h-9 items-center gap-1 rounded-full bg-muted px-3">
              <DollarSign className="h-4 w-4" aria-hidden="true" />
              {service.price}
            </span>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href={`/book?service=${service.id}`}>Book</Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
