import { prisma } from "@/lib/db/prisma";
import { serviceSchema, type PublicService, type Service } from "@/modules/services/domain/service";

const serviceSelect = {
  id: true,
  name: true,
  category: true,
  description: true,
  durationMinutes: true,
  priceCents: true,
  imageUrl: true,
  isActive: true,
  displayOrder: true,
} as const;

function toService(record: unknown): Service {
  return serviceSchema.parse(record);
}

function toPublicService(service: Service): PublicService {
  return {
    id: service.id,
    name: service.name,
    category: service.category,
    description: service.description,
    durationMinutes: service.durationMinutes,
    priceCents: service.priceCents,
    imageUrl: service.imageUrl,
  };
}

export async function findActiveServices(): Promise<PublicService[]> {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    select: serviceSelect,
  });

  return services.map((service) => toPublicService(toService(service)));
}

export async function findActiveServiceById(id: string): Promise<PublicService | null> {
  const service = await prisma.service.findFirst({
    where: { id, isActive: true },
    select: serviceSelect,
  });

  return service ? toPublicService(toService(service)) : null;
}
