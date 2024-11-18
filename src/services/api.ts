import { Country } from "@/types/country";

const API_BASE_URL = "https://restcountries.com/v3.1";

const FIELDS = [
  "name",
  "flags",
  "capital",
  "region",
  "subregion",
  "languages",
  "currencies",
  "population",
  "borders",
  "area",
  "car",
  "timezones",
];

export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/all?fields=${FIELDS.join()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch countries: ${error.message}`);
    }
    throw new Error("Failed to fetch countries");
  }
}
