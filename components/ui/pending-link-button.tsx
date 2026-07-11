"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PendingLinkButtonProps = Omit<ButtonProps, "asChild" | "disabled" | "type" | "onClick"> & {
  href: string;
  children: React.ReactNode;
  pendingLabel?: React.ReactNode;
};

export function PendingLinkButton({
  href,
  children,
  pendingLabel,
  className,
  ...buttonProps
}: PendingLinkButtonProps) {
  const pathname = usePathname();
  const [isPending, setIsPending] = React.useState(false);

  React.useEffect(() => {
    const resetId = window.setTimeout(() => setIsPending(false), 0);

    return () => window.clearTimeout(resetId);
  }, [pathname]);

  React.useEffect(() => {
    if (!isPending) return;

    const fallbackId = window.setTimeout(() => setIsPending(false), 4000);

    return () => window.clearTimeout(fallbackId);
  }, [isPending]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    const targetUrl = new URL(event.currentTarget.href);
    const currentUrl = new URL(window.location.href);

    if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search) {
      return;
    }

    setIsPending(true);
  }

  return (
    <Button asChild className={className} {...buttonProps}>
      <Link
        href={href}
        onClick={handleClick}
        aria-disabled={isPending}
        className={cn(isPending && "pointer-events-none opacity-80")}
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {isPending && pendingLabel ? pendingLabel : children}
      </Link>
    </Button>
  );
}
