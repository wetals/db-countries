import {
  ColDef,
  ICellRendererParams,
  ValueGetterParams,
  ValueFormatterParams,
} from "ag-grid-community";
import { Star, ChevronRight } from "lucide-react";
import { Country } from "@/types/country";

interface GridColumnsProps {
  onFavoriteToggle: (countryName: string) => void;
  isFavorite: (countryName: string) => boolean;
}

export const getColumnDefs = ({
  onFavoriteToggle,
  isFavorite,
}: GridColumnsProps): ColDef<Country>[] => {
  return [
    {
      headerName: "",
      width: 50,
      cellRenderer: (params: ICellRendererParams<Country>) => {
        const expanded = params.node.expanded;
        return (
          <button
            className="flex items-center justify-center w-full h-full"
            onClick={() => {
              // console.log("2. ===> params: ", params);

              if (expanded) {
                params.node.setExpanded(false);
              } else {
                params.node.setExpanded(true);
              }
            }}
          >
            <ChevronRight
              className={`w-5 h-5 ${expanded ? "rotate-90" : ""}`}
            />
          </button>
        );
      },
      sortable: false,
      filter: false,
    },
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
      cellRenderer: (params: ICellRendererParams<Country>) => {
        const countryName = params.data?.name.common || "";
        const starred = isFavorite(countryName);

        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(countryName);
              params.api.refreshCells({
                force: true,
                rowNodes: [params.node],
                columns: ["favorite"],
              });
            }}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors
              ${starred ? "text-yellow-500" : "text-gray-400"}`}
          >
            <Star className={`w-5 h-5 ${starred ? "fill-current" : ""}`} />
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
