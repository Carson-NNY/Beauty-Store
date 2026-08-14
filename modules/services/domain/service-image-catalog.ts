function pexelsPhoto(id: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
}

export const serviceImageCatalog: Record<string, string> = {
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

export function getServiceImageUrl(serviceId: string, fallbackUrl: string) {
  return serviceImageCatalog[serviceId] ?? fallbackUrl;
}
