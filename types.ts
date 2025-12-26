
export enum Hairstyle {
  BUZZ_CUT = 'Buzz Cut',
  LONG_WAVY = 'Long Wavy',
  POMPADOUR = 'Pompadour',
  BALD = 'Bald',
  DREADLOCKS = 'Dreadlocks'
}

export enum BeardStyle {
  CLEAN_SHAVEN = 'Clean Shaven',
  FULL_BEARD = 'Full Beard',
  GOATEE = 'Goatee',
  STUBBLE = 'Stubble'
}

export interface StylingOptions {
  hairstyle: Hairstyle;
  beardStyle: BeardStyle;
  color: string;
}

export interface StylistState {
  originalImage: string | null;
  styledImage: string | null;
  isLoading: boolean;
  error: string | null;
}
