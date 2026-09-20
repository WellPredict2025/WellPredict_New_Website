export type SectorSlug =
  | 'healthcare'
  | 'food'
  | 'financial'
  | 'legal'
  | 'education'
  | 'corporate';

/** Paths to assets under public/images/ */
export const SECTOR_IMAGES: Record<
  SectorSlug,
  { src: string; alt: string; width: number; height: number }
> = {
  healthcare: {
    src: '/images/sectors/healthcare.jpg',
    alt: 'Healthcare team in clinical setting',
    width: 800,
    height: 450,
  },
  food: {
    src: '/images/sectors/food.jpg',
    alt: 'Food manufacturing production line',
    width: 800,
    height: 450,
  },
  financial: {
    src: '/images/sectors/financial.jpg',
    alt: 'Financial services office and operations environment',
    width: 800,
    height: 450,
  },
  legal: {
    src: '/images/sectors/legal.jpg',
    alt: 'Legal office and professional services environment',
    width: 800,
    height: 450,
  },
  education: {
    src: '/images/sectors/education.jpg',
    alt: 'Education classroom and learning environment',
    width: 800,
    height: 450,
  },
  corporate: {
    src: '/images/sectors/corporate.jpg',
    alt: 'Corporate office and governance workspace',
    width: 800,
    height: 450,
  },
};
