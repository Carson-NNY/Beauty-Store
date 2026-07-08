import Link from "next/link";
import Image from "next/image";
import { Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CustomerService } from "@/lib/mock-data/customer";

export function ServiceCard({ service, featured = false }: { service: CustomerService; featured?: boolean }) {
  return (
    <article className={cn("group/service", featured && "md:grid md:grid-cols-[1.05fr_0.95fr] md:gap-8 lg:gap-12")}>
      <div className="reveal-image overflow-hidden rounded-[1.1rem] bg-stone-200/50">
        <Image
          src={service.imageUrl}
          alt={`${service.name} treatment room preview`}
          width={900}
          height={620}
          className={cn(
            "w-full object-cover transition duration-700 ease-out group-hover/service:scale-[1.025]",
            featured ? "aspect-[4/3] h-full" : "aspect-[4/3]",
          )}
        />
      </div>

      <div className={cn("reveal-text space-y-4 pt-5", featured && "md:flex md:flex-col md:justify-center md:pt-0")}>
        <div className="space-y-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent/80">{service.category}</p>
          <h2 className="font-serif text-2xl font-semibold leading-tight tracking-normal text-foreground sm:text-3xl">
            {service.name}
          </h2>
          <p className="max-w-xl text-[0.95rem] leading-7 text-muted-foreground">{service.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
          <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-stone-200/55 px-3">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {service.duration}
          </span>
          <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-stone-200/55 px-3">
            <DollarSign className="h-3.5 w-3.5" aria-hidden="true" />
            {service.price}
          </span>
        </div>

        <Button
          asChild
          size="sm"
          className="mt-1 h-11 w-fit rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Link href={`/book?service=${service.id}`}>Book</Link>
        </Button>
      </div>
    </article>
  );
}
