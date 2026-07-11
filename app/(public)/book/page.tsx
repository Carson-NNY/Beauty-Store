import { BookPageContent } from "@/components/customer/book-page-content";
import { listActiveServices } from "@/modules/services/application/service-queries";
import { defaultServices } from "@/modules/services/domain/default-services";

export const metadata = {
  title: "Book",
};

export const dynamic = "force-dynamic";

export default async function BookPage({
  searchParams,
}: {
  searchParams?: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  const todayIso = formatDateIso(new Date());
  const { services, servicesUnavailable } = await loadActiveServices();

  return (
    <BookPageContent
      initialServiceId={params?.service}
      services={services}
      servicesUnavailable={servicesUnavailable}
      startDateIso={todayIso}
    />
  );
}

async function loadActiveServices() {
  try {
    const services = await listActiveServices();

    return {
      services: services.length > 0 ? services : defaultServices,
      servicesUnavailable: false,
    };
  } catch {
    return {
      services: defaultServices,
      servicesUnavailable: false,
    };
  }
}

function formatDateIso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
