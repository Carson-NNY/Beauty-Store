import { findActiveServiceById, findActiveServices } from "@/modules/services/infrastructure/service-repository";

export async function listActiveServices() {
  return findActiveServices();
}

export async function getFeaturedServices() {
  const services = await findActiveServices();
  return services.slice(0, 3);
}

export async function getServiceById(id: string) {
  return findActiveServiceById(id);
}
