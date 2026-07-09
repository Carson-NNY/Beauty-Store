import { ConfirmationPageContent } from "@/components/customer/confirmation-page-content";

export const metadata = {
  title: "Appointment Confirmation",
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const readParam = (key: string, fallback: string) => {
    const value = params[key];
    return typeof value === "string" && value.trim() ? value : fallback;
  };

  return (
    <ConfirmationPageContent
      service={readParam("service", "")}
      date={readParam("date", "")}
      time={readParam("time", "")}
      visitType={readParam("visitType", "")}
      address={readParam("address", "")}
    />
  );
}
