import {
  ColDef,
  ICellRendererParams,
  ValueGetterParams,
  ValueFormatterParams,
} from "ag-grid-community";
import { Star } from "lucide-react";
import { Country } from "@/types/country";

export const getColumnDefs = (): ColDef<Country>[] => {
  return [
    {
      field: "flag",
      headerName: "Flag",
      width: 80,
      sortable: false,
      filter: false,
      cellRenderer: (params: ICellRendererParams<Country>) => {
        return params.data?.flags?.svg ? (
          <div className="mt-2">
            <img
              src={params.data.flags.svg}
              alt={
                params.data.flags.alt || `Flag of ${params.data.name.common}`
              }
              className="h-8 w-12 object-cover rounded-sm"
            />
          </div>
        ) : null;
      },
    },
    {
      field: "name.common",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      cellRenderer: (params: ICellRendererParams<Country>) => {
        return <span className="font-medium">{params.value}</span>;
      },
    },
    {
      field: "capital",
      headerName: "Capital",
      flex: 1,
      minWidth: 120,
      valueGetter: (params: ValueGetterParams<Country>) => {
        return params.data?.capital?.join(", ") || "N/A";
      },
    },
    {
      field: "population",
      headerName: "Population",
      flex: 1,
      minWidth: 120,
      type: "numericColumn",
      valueFormatter: (params: ValueFormatterParams<Country, number>) => {
        return params.value?.toLocaleString() || "0";
      },
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      field: "languages",
      headerName: "Languages",
      flex: 1.5,
      minWidth: 200,
      valueGetter: (params: ValueGetterParams<Country>) => {
        const languages = params.data?.languages || {};
        return Object.values(languages).join(", ") || "N/A";
      },
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["contains"],
        trimInput: true,
        caseSensitive: false,
      },
    },
    {
      field: "region",
      headerName: "Continents",
      flex: 1,
      minWidth: 120,
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["equals"],
        trimInput: true,
        caseSensitive: false,
      },
    },
    {
      field: "currencies",
      headerName: "Currencies",
      flex: 1,
      minWidth: 120,
      valueGetter: (params: ValueGetterParams<Country>) => {
        const currencies = params.data?.currencies || {};
        return (
          Object.values(currencies)
            .map((curr) => `${curr.name} (${curr.symbol})`)
            .join(", ") || "N/A"
        );
      },
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["contains"],
        trimInput: true,
        caseSensitive: false,
      },
    },
    {
      field: "favorite",
      headerName: "Favourite",
      width: 100,
      sortable: false,
      filter: false,
      cellRenderer: () => {
        return (
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400">
            <Star className={`w-5 h-5`} />
          </button>
        );
      },
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  ];
};
