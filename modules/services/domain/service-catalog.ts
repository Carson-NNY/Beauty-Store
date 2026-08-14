import type { PublicService, ServiceCategory } from "@/modules/services/domain/service";

export const serviceCategoryOrder: ServiceCategory[] = ["facial", "scalp", "body", "weight-management", "hair-removal", "package"];

export function groupServicesByCategory<T extends PublicService>(services: T[]) {
  return serviceCategoryOrder.map((category) => ({
    category,
    services: services.filter((service) => service.category === category),
  }));
}

export function getCategoryRepresentatives(services: PublicService[]) {
  return groupServicesByCategory(services).flatMap(({ services: categoryServices }) => categoryServices.slice(0, 1));
}
