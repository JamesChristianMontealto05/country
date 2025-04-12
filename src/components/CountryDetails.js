import React from "react";
import BorderButton from "./BorderButton";

const CountryDetails = ({ country, onBorderClick }) => {
  return (
    <div className="country-details">
      <h2>{country.name}</h2>
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        style={{ width: "300px", borderRadius: "10px" }}
      />
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
      <p><strong>Coordinates:</strong> Lat {country.coordinates.latitude}, Lng {country.coordinates.longitude}</p>
      <p><strong>Timezones:</strong> {country.timezones.join(", ")}</p>
      <p><strong>Currency:</strong> {country.currency}</p>
      <p><strong>Languages:</strong> {country.languages.join(", ")}</p>
      <p><strong>Borders:</strong></p>
      <BorderButton borders={country.borders} onClick={onBorderClick} />
    </div>
  );
};

export default CountryDetails;
