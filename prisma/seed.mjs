import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  {
    id: "signature-facial",
    name: "Signature Glow Facial",
    category: "facial",
    description: "Gentle cleansing, steam, massage, mask, and hydration for a fresh everyday glow.",
    durationMinutes: 60,
    priceCents: 8800,
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    displayOrder: 10,
  },
  {
    id: "deep-cleansing-facial",
    name: "Deep Cleansing Facial",
    category: "facial",
    description: "A focused facial for congestion, dullness, and buildup, finished with calming hydration.",
    durationMinutes: 75,
    priceCents: 10800,
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    displayOrder: 20,
  },
  {
    id: "relaxation-massage",
    name: "Relaxation Massage",
    category: "massage",
    description: "A light-to-medium pressure massage for tired shoulders, back tension, and general stress.",
    durationMinutes: 60,
    priceCents: 7800,
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
    displayOrder: 30,
  },
  {
    id: "neck-shoulder-relief",
    name: "Neck & Shoulder Relief",
    category: "body",
    description: "Focused upper-body care for desk tension, screen fatigue, and tight neck and shoulder muscles.",
    durationMinutes: 45,
    priceCents: 6800,
    imageUrl: "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?auto=format&fit=crop&w=900&q=80",
    displayOrder: 40,
  },
  {
    id: "body-oil-massage",
    name: "Body Oil Massage",
    category: "massage",
    description: "A flowing full-body oil massage with steady pressure for deep relaxation and softer movement.",
    durationMinutes: 90,
    priceCents: 12800,
    imageUrl: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80",
    displayOrder: 50,
  },
  {
    id: "gentle-beauty-care",
    name: "Gentle Beauty Care",
    category: "body",
    description: "A soft care session for sensitive days, light refreshment, and a calm reset without intensity.",
    durationMinutes: 50,
    priceCents: 7200,
    imageUrl: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80",
    displayOrder: 60,
  },
];

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: { ...service, isActive: true },
      create: { ...service, isActive: true },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
