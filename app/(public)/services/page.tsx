import { ServicesPageContent } from "@/components/customer/services-page-content";
import { listActiveServices } from "@/modules/services/application/service-queries";
import { defaultServices } from "@/modules/services/domain/default-services";

export const metadata = {
  title: "Services",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const { services, servicesUnavailable } = await loadActiveServices();

  return <ServicesPageContent services={services} servicesUnavailable={servicesUnavailable} />;
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
