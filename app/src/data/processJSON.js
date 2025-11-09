/*
 * Copyright (C) 2025 Alexander Sharif
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as 
published
 * by the Free Software Foundation, either version 3 of the 
License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public 
License
 * along with this program. If not, see 
<https://www.gnu.org/licenses/agpl-3.0.en.html>.
 */

// Imports
import { readFile, writeFileSync} from "fs"


// File path to the JSON file
// Configuration -- Violence
// [Political Stability and Absence of Violence/Terrorism: Percentile Rank]
let violenceJsonFilename = "worldbank_violence_data.json"
let violenceConvertedFilename = "Violence"

processJSON(violenceJsonFilename, violenceConvertedFilename);

// File path to the JSON file
// Configuration -- Official Exchange Rate
// [Official exchange rate (LCU per US$, period average)]

let FXJsonFilename = "worldbank_FX_data.json"
let FXConvertedFilename = "FX"

processJSON(FXJsonFilename, FXConvertedFilename);

function processJSON(filePath, jsonFilename) {
    // Asynchronous Reading (recommended)
    readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return; // Stop execution if there's an error
        }

        try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Now you can work with the parsed JSON data
            // console.log('Parsed JSON data:', jsonData[1]);

            // Build the JSON and JSON array for 
            // the map and table respoectively
            let newJSONDataMap = "{\n"
            let newJSONDataTable = "[{\n"
            for ( let j = 0; j < jsonData[1].length; j++){

                // Access the records from the GET request
                let obj = jsonData[1][j];



                    // Build the JSON for use with the Svelte app map component
                    if( j+1 < jsonData[1].length){
                        newJSONDataMap = newJSONDataMap + `"${String(obj.country.id).toLowerCase()}":${obj.value},\n`;
                    }

                    else{
                        newJSONDataMap = newJSONDataMap + `"${String(obj.country.id).toLowerCase()}":${obj.value}\n`;
                    }

                    // Build the JSON for use with the Svelte app tables
                    if( j+1 < jsonData[1].length){
                        newJSONDataTable = newJSONDataTable + `"${String(obj.country.value)}":${obj.value},\n`;
                    }

                    else{
                        newJSONDataTable = newJSONDataTable + `"${String(obj.country.value)}":${obj.value}\n`;
                    }


            }
            newJSONDataMap = newJSONDataMap + "}\n";
            newJSONDataTable = newJSONDataTable + "}]\n"
            // Build the JSON and JSON array for 
            // the map and table respoectively

            writeFileSync(`${jsonFilename}_map.json`, newJSONDataMap, null)
            writeFileSync(`${jsonFilename}_table.json`, newJSONDataTable, null)


        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    })
};
