import { useState, useEffect } from "react";
import { fetchCountries } from "@/services/api";
import { Country } from "@/types/country";

interface UseCountriesProp {
  countries: Country[] | null;
  isLoading: boolean;
  error: string | null;
}

export const useCountries = (): UseCountriesProp => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchCountries();

      const validatedData = validateAndTransformData(data);

      setCountries(validatedData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch country data"
      );
      if (!countries) {
        setCountries(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndTransformData = (data: any[]): Country[] => {
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received from API");
    }

    return data.map((country: Country) => ({
      name: {
        common: country.name.common,
        official: country.name.official,
        nativeName: country.name.nativeName || {},
      },
      flags: {
        png: country.flags.png,
        svg: country.flags.svg,
        alt: country.flags.alt || `Flag of ${country.name.common}`,
      },
      capital: Array.isArray(country.capital) ? country.capital : [],
      region: country.region || "Unknown",
      subregion: country.subregion || "",
      languages: country.languages || {},
      currencies: country.currencies || {},
      population:
        typeof country.population === "number" ? country.population : 0,
      borders: Array.isArray(country.borders) ? country.borders : [],
      area: typeof country.area === "number" ? country.area : 0,
      car: {
        side: country.car?.side || "unknown",
      },
      timezones: Array.isArray(country.timezones) ? country.timezones : [],
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    countries,
    isLoading,
    error,
  };
};
