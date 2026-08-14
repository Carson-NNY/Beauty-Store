import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function pexelsPhoto(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
}

const serviceImages = {
  "custom-facial": "/images/facial-care.png",
  "deep-cleansing-facial": pexelsPhoto(37072271),
  "hydro-oxygen-facial": pexelsPhoto(37240374),
  "calming-barrier-facial": pexelsPhoto(37229282),
  "brightening-facial": pexelsPhoto(37229304),
  "firming-facial": pexelsPhoto(37229299),
  "luxury-vitality-facial": pexelsPhoto(34930099),
  "essential-head-spa": pexelsPhoto(23349902),
  "luxury-head-spa": pexelsPhoto(5659016),
  "custom-scalp-care": pexelsPhoto(3993454),
  "deep-scalp-purifying": pexelsPhoto(6188051),
  "back-relaxation-massage": pexelsPhoto(19641818),
  "full-body-relaxation": pexelsPhoto(3760262),
  "body-firming-contour": "/images/weight-management.png",
  "back-clearing-care": pexelsPhoto(4599405),
  "deep-back-renewal": pexelsPhoto(6560268),
  "cool-comfort-hair-removal": "/images/hair-removal.png",
  "head-spa-back-package": pexelsPhoto(35546242),
  "head-spa-body-package": pexelsPhoto(37229295),
  "head-spa-facial-package": pexelsPhoto(37229283),
  "facial-body-package": pexelsPhoto(30793292),
  "triple-renewal-package": pexelsPhoto(7365434),
  "luxury-complete-package": pexelsPhoto(19242404),
};

const images = {
  facial: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=82",
  facialCleanse: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=82",
  scalp: "https://images.pexels.com/photos/3760270/pexels-photo-3760270.jpeg?auto=compress&cs=tinysrgb&w=1200",
  body: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=82",
  bodyCare: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=82",
  hairRemoval: "https://images.pexels.com/photos/29021129/pexels-photo-29021129.jpeg?auto=compress&cs=tinysrgb&w=1200",
  package: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=82",
};

const services = [
  item("custom-facial", "Custom Essential Facial", "facial", "Personalized gentle cleansing, hydration, and essential barrier care for soft, naturally radiant skin.", 60, 8800, images.facial),
  item("deep-cleansing-facial", "Deep Cleansing Facial", "facial", "A focused cleanse for excess oil and buildup that leaves congested skin feeling clearer, fresher, and refined.", 75, 10800, images.facialCleanse),
  item("hydro-oxygen-facial", "Hydro-Oxygen Facial", "facial", "Intensive hydration, serum infusion, and calming care for skin that feels dry, tight, or short on glow.", 75, 11800, images.facial),
  item("calming-barrier-facial", "Calming Barrier Facial", "facial", "Gentle cleansing and soothing hydration help ease visible redness and support a more settled skin state.", 60, 9800, images.facialCleanse),
  item("brightening-facial", "Brightening & Even-Tone Facial", "facial", "Gentle cleansing, antioxidant care, and brightening serums help improve the look of dull, uneven skin.", 75, 11800, images.facial),
  item("firming-facial", "Firming First-Age Facial", "facial", "Massage, serum care, and firming steps support the look of elasticity, fullness, and a refreshed facial contour.", 90, 13800, images.facialCleanse),
  item("luxury-vitality-facial", "Luxury Total Vitality Facial", "facial", "An extended ritual for face, neck, shoulders, arms, and hands with cleansing, nourishment, massage, and masking.", 120, 18800, images.facial),
  item("essential-head-spa", "Essential Relaxing Head Spa", "scalp", "Scalp cleansing, head and shoulder massage, herbal rinse, and a simple blow-dry for an everyday reset.", 60, 9800, images.scalp),
  item("luxury-head-spa", "Luxury Deep Head Spa", "scalp", "An extended scalp ritual with assessment, deep cleansing, warming care, massage, herbal rinse, and finish.", 90, 13800, images.scalp),
  item("custom-scalp-care", "Custom Scalp Care", "scalp", "Care tailored to scalp oil, dryness, sensitivity, and hair condition to support a fresh, balanced scalp environment.", 75, 11800, images.scalp),
  item("deep-scalp-purifying", "Deep Purifying Scalp Care", "scalp", "Scalp assessment, deep cleansing, and serum care help lift oil and product residue for a cleaner scalp feel.", 75, 11800, images.scalp),
  item("back-relaxation-massage", "Back Relaxation Massage", "body", "Focused massage helps relax tired, tight shoulders and back after long periods of sitting or daily strain.", 45, 6800, images.body),
  item("full-body-relaxation", "Full-Body Relaxation Massage", "body", "A flowing full-body massage designed to ease everyday muscle tension, fatigue, and stress.", 60, 8800, images.bodyCare),
  item("body-firming-contour", "Slimming & Body Contour Care", "weight-management", "A body-management treatment for slimming and contour goals, with massage and firming care focused on the waist, legs, or arms.", 90, 13800, images.bodyCare),
  item("back-clearing-care", "Back Clarifying Care", "body", "Cleansing, exfoliation, calming care, and hydration target oil, congestion, and rough texture on the back.", 60, 9800, images.body),
  item("deep-back-renewal", "Deep Back Renewal Care", "body", "An extended back treatment with cleansing, resurfacing, soothing, and nourishment for roughness and uneven tone.", 75, 11800, images.bodyCare),
  item("cool-comfort-hair-removal", "Cool Comfort Hair Removal", "hair-removal", "Comfort-focused hair removal for selected face and body areas, with single-session and series options available.", 45, 6800, images.hairRemoval),
  item("head-spa-back-package", "Head Spa & Back Relaxation", "package", "A calming head spa and back massage combine to relax the scalp, neck, shoulders, and back in one visit.", 90, 14800, images.package),
  item("head-spa-body-package", "Head Spa & Full-Body Relaxation", "package", "Scalp cleansing and head massage pair with full-body massage for a complete, deeply relaxing experience.", 120, 19800, images.package),
  item("head-spa-facial-package", "Head Spa & Facial Renewal", "package", "A relaxing head spa and custom facial care for scalp comfort and everyday skin maintenance in one visit.", 120, 19800, images.package),
  item("facial-body-package", "Facial Renewal & Full-Body Relaxation", "package", "Facial care and full-body massage combine skin maintenance with a restorative body reset.", 120, 20800, images.package),
  item("triple-renewal-package", "Triple Renewal Care Package", "package", "Head spa, custom facial care, and a focused back massage create a complete three-part renewal ritual.", 150, 24800, images.package),
  item("luxury-complete-package", "Luxury Complete Care Package", "package", "Head spa, custom facial care, and full-body massage offer the studio's most complete relaxation experience.", 180, 29800, images.package),
].map((service, index) => ({ ...service, displayOrder: (index + 1) * 10 }));

function item(id, name, category, description, durationMinutes, priceCents, imageUrl) {
  return { id, name, category, description, durationMinutes, priceCents, imageUrl: serviceImages[id] ?? imageUrl };
}

async function main() {
  await prisma.service.updateMany({ data: { isActive: false } });
  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: { ...service, isActive: true },
      create: { ...service, isActive: true },
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
