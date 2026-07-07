import { BookingFlow } from "@/components/customer/booking-flow";

export const metadata = {
  title: "Book",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams?: Promise<{ service?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="container max-w-2xl space-y-6 py-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">Book appointment</p>
        <h1 className="text-4xl font-semibold tracking-normal">Request a time</h1>
        <p className="leading-7 text-muted-foreground">
          Five short steps. No account required. This is a mock flow and does not create a real appointment yet.
        </p>
      </div>
      <BookingFlow initialServiceId={params?.service} />
    </main>
  );
}
