import React from "react";
import { Country } from "@/types/country";

export const CountryDetails: React.FC<Country> = ({
  name,
  region,
  subregion,
  borders,
  area,
  car,
  timezones,
}) => {
  return (
    <div className="p-4 bg-gray-50">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div>
            <p>
              <strong>Official Name: </strong>
            </p>
            <span>{name.official}</span>
          </div>

          <div>
            <p>
              <strong>Region: </strong>
            </p>
            <span>{region}</span>
          </div>

          <div>
            <p>
              <strong>Subregion: </strong>
            </p>
            <span>{subregion || "N/A"}</span>
          </div>

          <div>
            <p>
              <strong>Area: </strong>
            </p>
            <span>{area} km</span>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <p>
              <strong>Car Side: </strong>
            </p>
            <span className="capitalize">{car?.side || "N/A"}</span>
          </div>

          <div>
            <p>
              <strong>Timezones: </strong>
            </p>
            <ul className="list-disc list-inside pl-2">
              {Array.isArray(timezones) ? (
                timezones.map((timezone, i) => <li key={i}>{timezone}</li>)
              ) : (
                <li>timezones</li>
              )}
            </ul>
          </div>

          <div className="col-span-2">
            <p>
              <strong>Borders: </strong>
            </p>
            <ul className="list-disc list-inside pl-2">
              {Array.isArray(borders) ? (
                borders.map((border, i) => <li key={i}>{border}</li>)
              ) : (
                <li>borders</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
