import { findActiveServiceById, findActiveServices } from "@/modules/services/infrastructure/service-repository";
import { getCategoryRepresentatives } from "@/modules/services/domain/service-catalog";

export async function listActiveServices() {
  return findActiveServices();
}

export async function getFeaturedServices() {
  const services = await findActiveServices();
  return getCategoryRepresentatives(services);
}

export async function getServiceById(id: string) {
  return findActiveServiceById(id);
}
