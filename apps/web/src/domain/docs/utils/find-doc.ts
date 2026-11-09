import { docs } from '../data/docs';

export const findDoc = (layer: string, slug: string) => docs.find((d) => d.layer === layer && d.slug === slug);
