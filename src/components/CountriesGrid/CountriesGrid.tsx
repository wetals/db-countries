import { useCountries } from "@/hooks/useCountries";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { getColumnDefs } from "./GridColumns";

const paginationOptions = [10, 20, 50];

export const CountriesGrid = () => {
  const { countries, isLoading, error } = useCountries();

  const columnDefs = useMemo(() => {
    return getColumnDefs();
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
    }),
    []
  );

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
        rowData={countries}
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
