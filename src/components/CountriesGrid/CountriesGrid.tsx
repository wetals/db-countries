import { Country } from "@/types/country";
import type { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo } from "react";

interface CountriesGridProps {
  countries: Country[];
  favorites: string[];
  onToggleFavorite: (countryName: string) => void;
  showFavorites: boolean;
}

export const CountriesGrid = ({ countries }: CountriesGridProps) => {
  let gridApi: GridApi | null = null;

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "flag",
        headerName: "Flag",
        width: 80,
      },
      {
        field: "name.common",
        headerName: "Name",
        flex: 1,
      },
      {
        field: "capital",
        headerName: "Capital",
        flex: 1,
      },
      {
        field: "population",
        headerName: "Population",
        type: "numericColumn",
        flex: 1,
      },
      {
        field: "languages",
        headerName: "Languages",
        flex: 1,
      },
      {
        field: "region",
        headerName: "Region",
        flex: 1,
      },
      {
        field: "currencies",
        headerName: "Currencies",
        flex: 1,
      },
      {
        headerName: "Favorite",
        width: 100,
      },
    ],
    []
  );

  const onGridReady = useCallback((params: GridReadyEvent) => {
    gridApi = params.api;
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  return (
    <div className="ag-theme-alpine w-full h-[600px]">
      <AgGridReact
        rowData={countries}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        detailRowHeight={300}
        detailRowAutoHeight={true}
      />
    </div>
  );
};
