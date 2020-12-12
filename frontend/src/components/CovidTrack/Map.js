import React from 'react';
import "./Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showData} from "./helper"
// Loop through each country and draw circle representing the number of casesType
// Clicking on the circle display more information with popup
function Map({countries, casesType, center, zoom}) {
    return (
        <div className = "map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {showData(countries, casesType)}
            </LeafletMap>
        </div>
    );
}

export default Map
