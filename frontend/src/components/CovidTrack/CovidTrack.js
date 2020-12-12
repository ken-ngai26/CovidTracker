import * as React from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import InfomationBox from './InformationBox';
import Map from './Map';
import Table from './Table';
import {sortData, printStat} from "./helper";
import LineGraph from "./LineGraph"
import numeral from "numeral"
import './CovidTrack.css';
// import Nav from '../Nav'; 
import "leaflet/dist/leaflet.css";


export default function CovidTrack(){
  // const [user,setUser] = React.setState("");
  const [countries, setCountries] = React.useState([]);
  const [country, setCountry] = React.useState(['world']);
  const [countryInfo, setCountryInfo] = React.useState({});
  const [caseTable, setCaseTable] = React.useState([]);
  const [casesType, setCasesType] = React.useState("cases");
  const [mapCenter, setMapCenter] = React.useState({ lat: 34.80757, lng: -40.4736})
  const [mapZoom, setMapZoom] = React.useState(3);
  const [mapCountries, setMapCountries] = React.useState([]);


  React.useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);


  React.useEffect(() => {
    //run once as componet loads and not again
    // async -> send requent and wait for it then do something with it
    const getData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        // it give back a big json
        const countries = data.map((country) => (
          { 
            // go through each country
            name : country.country, 
            value: country.countryInfo.iso3,
          }
        ));
        let sorted = sortData(data);
        //
        setCountries(countries);
        setMapCountries(data);
        setCaseTable(sorted);
        
      });
    };
    getData();
  }, []);

  const onDropChange = async (event) => {
    const countryCode = event.target.value;
    // setCountry(countryCode);
    // get info for ww
    // get info for country

    const url =
      countryCode === "world"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        setCountry(countryCode);

        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
    });
  };
  return (
    <div className="app"> 
    <div className="app_left">
      <div className="app_header">
        <h1>Covid-19 Live tracing</h1>
        
        <FormControl className = "app_dropdown">
          <Select variant = "outlined" onChange={onDropChange} value={country}>
            <MenuItem value = "world">WorldWide</MenuItem>
            {/* loop through all country and show drop down*/}
            {countries.map((country) => (
              <MenuItem value = {country.value}>{country.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      
      <div className="app_stat">
        <InfomationBox 
          onClick={(e) => setCasesType("cases")}
          title="Covid 19 Cases"
          cases={printStat(countryInfo.todayCases)}
          total={numeral(countryInfo.cases).format("0.0a")}>
        </InfomationBox>
        <InfomationBox 
          onClick={(e) => setCasesType("recovered")}
          title="Recovered"
          cases={printStat(countryInfo.todayRecovered)}
          total={numeral(countryInfo.recovered).format("0.0a")}>
        </InfomationBox>
        <InfomationBox
          onClick={(e) => setCasesType("deaths")}
          title="Deaths"
          cases={printStat(countryInfo.todayDeaths)}
          total={numeral(countryInfo.deaths).format("0.0a")}>
        </InfomationBox>
      </div>       
      <Map 
        countries = {mapCountries} 
        casesType={casesType} 
        center={mapCenter} 
        zoom ={mapZoom}/>
    </div>

     <Card className="app_right">
       <CardContent>
         <div className = "app_tableAndChart">
          <h3><strong>Total Cases by Country</strong></h3>
          <Table countries = {caseTable}></Table>
          <h3>Worldwide Graph by {casesType}</h3>
            <LineGraph casesType={casesType} />
         </div>
         
       </CardContent>
     </Card>
    </div>
  )
}
// export default CovidTrack;
