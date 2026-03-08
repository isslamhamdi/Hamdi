export const TRAILERS = {
  MARUCH: { weight: 26500, label: '26.5T', desc: 'MARUCH' },
  TIRSAM: { weight: 28000, label: '28.0T', desc: 'PLATEAU' },
  MAN_TGL: { weight: 12000, label: '12.0T', desc: 'MAN TGL' },
};

export const PALETTES = {
  EURO: { max: 33, weightMult: 1.0 },
  ISO: { max: 26, weightMult: 1.25 },
  DOUBLE: { max: 66, weightMult: 1.0 },
};

export const PRODUCTS = {
  CARTON_05L: { label: '0.5L', weight: 720 },
  CARTON_1L: { label: '1L', weight: 750 },
  CARTON_5L: { label: '5L', weight: 780 },
  BIDON_20L: { label: '20L', weight: 100 },
  FUT_200L: { label: 'Fûts 200L', weight: 880 },
};

export type TrailerKey = keyof typeof TRAILERS;
export type PaletteKey = keyof typeof PALETTES;
export type ProductKey = keyof typeof PRODUCTS;

export type Mission = {
  id: string;
  date: string;
  trailerType: TrailerKey;
  paletteType: PaletteKey;
  items: Record<ProductKey, number>;
  notes: string;
  uid: string;
};
