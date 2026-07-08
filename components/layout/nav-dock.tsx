import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavDockItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
};

export function NavDock({ items, className }: { items: NavDockItem[]; className?: string }) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "hidden h-[68px] items-end rounded-2xl bg-[#f4f1eb]/72 px-3 pb-2 shadow-sm ring-1 ring-foreground/5 backdrop-blur md:flex",
        className,
      )}
    >
      <div className="flex items-end gap-2" role="toolbar" aria-label="Site shortcuts">
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-foreground/10 bg-[#120f17] px-2 py-1 text-xs text-white opacity-0 shadow-md transition duration-200 group-hover:translate-y-[-2px] group-hover:opacity-100 group-focus-visible:translate-y-[-2px] group-focus-visible:opacity-100"
              >
                {item.label}
              </span>
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="text-sm">{item.label}</span>
            </>
          );

          const className =
            "group relative inline-flex min-h-11 origin-bottom items-center justify-center gap-2 rounded-full border border-foreground/10 bg-background/80 px-4 text-foreground shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:bg-background focus-visible:-translate-y-1 focus-visible:scale-110";

          if (item.external) {
            return (
              <a key={item.href} href={item.href} className={className}>
                {content}
              </a>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={className}>
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
