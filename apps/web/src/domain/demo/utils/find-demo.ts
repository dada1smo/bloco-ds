import { demos } from '../data/demos';

export const findDemo = (folder: string, id: string) => demos[folder]?.find((d) => d.id === id);
