import { HomePageContent } from "@/components/customer/home-page-content";
import { getFeaturedServices } from "@/modules/services/application/service-queries";
import { defaultServices } from "@/modules/services/domain/default-services";
import { getCategoryRepresentatives } from "@/modules/services/domain/service-catalog";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { services, servicesUnavailable } = await loadFeaturedServices();

  return <HomePageContent featuredServices={services} servicesUnavailable={servicesUnavailable} />;
}

async function loadFeaturedServices() {
  try {
    const services = await getFeaturedServices();

    return {
      services: services.length > 0 ? services : getCategoryRepresentatives(defaultServices),
      servicesUnavailable: false,
    };
  } catch {
    return {
      services: getCategoryRepresentatives(defaultServices),
      servicesUnavailable: false,
    };
  }
}
