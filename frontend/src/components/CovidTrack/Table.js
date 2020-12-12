import * as React from 'react';
import numeral from "numeral";
import './Table.css';

function Table({ countries }) {
    return (
        <div className = "table"> 
            {countries.map(({ country,cases }) => (
                <tr>
                    <td><strong>{country}</strong></td>
                    <td>{numeral(cases).format("0,0")}</td>
                </tr>
            ))}
        </div>
    );
}

export default Table;
 