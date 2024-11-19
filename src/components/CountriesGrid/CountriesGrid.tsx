import { useCountries } from "@/hooks/useCountries";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo } from "react";
import { getColumnDefs } from "./GridColumns";

const paginationOptions = [10, 20, 50];

interface CountriesGridProps {
  showFavoritesOnly: boolean;
  onFavoriteToggle: (countryName: string) => void;
  isFavorite: (countryName: string) => boolean;
}

export const CountriesGrid: React.FC<CountriesGridProps> = ({
  showFavoritesOnly,
  onFavoriteToggle,
  isFavorite,
}) => {
  const { countries, isLoading, error } = useCountries();

  const columnDefs = useMemo(() => {
    return getColumnDefs({
      onFavoriteToggle,
      isFavorite,
    });
  }, [onFavoriteToggle, isFavorite]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
    }),
    []
  );

  const filteredCountries = useMemo(() => {
    if (!countries) return [];

    let filtered = countries;

    console.log("3. ===> countries: ", countries);

    if (showFavoritesOnly) {
      filtered = filtered.filter((country) => isFavorite(country.name.common));
    }

    return filtered;
  }, [countries, showFavoritesOnly, isFavorite]);

  if (error) {
    return (
      <div className="error-container">Error loading countries: {error}</div>
    );
  }

  if (isLoading) {
    return <div>Loading countries...</div>;
  }

  return (
    <div className="ag-theme-alpine w-full h-[600px]">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={filteredCountries}
        defaultColDef={defaultColDef}
        rowHeight={48}
        pagination
        paginationPageSize={20}
        paginationPageSizeSelector={paginationOptions}
        masterDetail
        detailRowAutoHeight
        domLayout="autoHeight"
      />
    </div>
  );
};
