"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AppointmentInterestInput } from "@/lib/validations/appointment";
import { appointmentInterestSchema } from "@/lib/validations/appointment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AppointmentInterestForm() {
  const {
    register,
    formState: { errors },
  } = useForm<AppointmentInterestInput>({
    resolver: zodResolver(appointmentInterestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  return (
    <Card>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <CardContent className="grid gap-5 pt-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" autoComplete="name" {...register("name")} />
            {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" inputMode="email" {...register("email")} />
            {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" autoComplete="tel" inputMode="tel" {...register("phone")} />
            {errors.phone ? <p className="text-sm text-destructive">{errors.phone.message}</p> : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" rows={4} {...register("notes")} />
            {errors.notes ? <p className="text-sm text-destructive">{errors.notes.message}</p> : null}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <Button type="submit" disabled>
            Booking logic coming later
          </Button>
          <p className="text-sm text-muted-foreground">
            This form validates shape only. No appointment is created yet.
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
