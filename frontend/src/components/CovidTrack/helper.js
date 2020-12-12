import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColour = {
    cases: {
      fill : {fillColor: 'blue', color: 'blue'},
      multiplier: 300,
    },
    recovered: {
      fill : {fillColor: 'green', color: 'green'},
      multiplier: 300,
    },
    deaths: {
      fill : {fillColor: 'red', color: 'red'},
      multiplier: 300,
    },
};

export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a,b) => {
      if (a.cases > b.cases) {
        return -1;
      }else{
        return 1;
      }
    });
    return sortedData;
};

export const printStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showData = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.6}
      pathOptions={
        casesTypeColour[casesType].fill
      }
      radius={
        Math.sqrt(country[casesType]) * casesTypeColour[casesType].multiplier
      }>

      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-cases">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
          <div>
            <h5>Some country new cases, recover, deaths may appear zero, because the database haven't receive update today.</h5>
          </div>
        </div>
      </Popup>
    </Circle>
  ));
