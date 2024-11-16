export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  population: number;
  borders: string[];
  area: number;
  timezones: string[];
}
