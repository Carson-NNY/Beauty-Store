"use client";

import type * as React from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

type PendingSubmitButtonProps = Omit<ButtonProps, "type" | "disabled"> & {
  pendingLabel?: React.ReactNode;
};

export function PendingSubmitButton({ children, pendingLabel, ...props }: PendingSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      {pending && pendingLabel ? pendingLabel : children}
    </Button>
  );
}
