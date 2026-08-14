import { z } from "zod";

export const serviceCategorySchema = z.enum(["facial", "scalp", "body", "weight-management", "hair-removal", "package"]);

export const serviceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: serviceCategorySchema,
  description: z.string().min(1),
  durationMinutes: z.number().int().positive(),
  priceCents: z.number().int().nonnegative(),
  imageUrl: z.string().min(1),
  isActive: z.boolean(),
  displayOrder: z.number().int(),
});

export type ServiceCategory = z.infer<typeof serviceCategorySchema>;
export type Service = z.infer<typeof serviceSchema>;
export type PublicService = Pick<
  Service,
  "id" | "name" | "category" | "description" | "durationMinutes" | "priceCents" | "imageUrl"
>;
