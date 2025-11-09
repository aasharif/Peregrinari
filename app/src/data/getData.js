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

//Imports
import { get } from "https";
import { writeFileSync } from "fs";


// Get the data from the World Bank

/*
 * Data from the World Bank is licensed via Creative Commons 4.0 Attribution
 * https://creativecommons.org/licenses/by/4.0/legalcode.txt
 * 
 * Data can be access via the API at https://data360.worldbank.org/en/api 
 * and by way of the https://data.worldbank.org search page.
 * 
 * This application is in no way endorsed or sponsored by the World Bank.
 * 
 * Official exchange rate (LCU per US$, period average)
 * International Financial Statistics database, International Monetary Fund ( IMF ): 
 * https://data.worldbank.org/indicator/PA.NUS.FCRF
 * 
 * Political Stability and Absence of Violence/Terrorism: Percentile Rank
 * Worldwide Governance Indicators, World Bank ( WB ), uri: govindicators.org, 
 * note: The Worldwide Governance Indicators ( WGI ) are a product of the staff of 
 * the World Bank with external contributions.:
 * https://data.worldbank.org/indicator/PV.PER.RNK
 */

function getData(indicator, year, perPage, jsonFilename) {
  // Build the URL
  const url = `https://api.worldbank.org/v2/country/all/indicator/${indicator}?format=json&date=${year}:${year}&per_page=${perPage}`;

  // Fetch the data
  console.log("Fetching data from World Bank API...");
  console.log("URL:", url);

  get(url, (response) => {
    let data = "";

    // Collect data chunks
    response.on("data", (chunk) => {
      data += chunk;
    });

    // Process complete response
    response.on("end", () => {
      try {
        const jsonData = JSON.parse(data);


        // The API returns an array [metadata, data]
        const metadata = jsonData[0];
        const records = jsonData[1];

        // Log output to the nodejs console.
        console.log(`\nReceived ${records.length} records`);
        console.log(`Total records available: ${metadata.total}`);
        console.log(`Pages: ${metadata.page} of ${metadata.pages}`);

        // Save as JSON;
        writeFileSync(jsonFilename, JSON.stringify(jsonData, null, 2));
        console.log(`\nSaved JSON to: ${jsonFilename}`);

        // Show sample data
        console.log('\nSample records:');
        records.slice(0, 3).forEach(record => {
          console.log(`  ${record.country.value} (${record.countryiso3code}): ${record.value} [${record.date}]`);
        });

      } catch (error) {
        console.error('Error parsing JSON:', error.message);
      }


    });

  }).on("error", (error) => {
    console.error("Error fetching data:", error.message);
  });
}

// Configuration -- Violence
// [Political Stability and Absence of Violence/Terrorism: Percentile Rank]

let violenceIndicator = "PV.PER.RNK";
let violenceYear = "2023"
let violencePerPage = 1000;
let violenceJsonFilename = "worldbank_violence_data.json"

getData(violenceIndicator, violenceYear, violencePerPage, violenceJsonFilename);

// Configuration -- Official Exchange Rate
// [Official exchange rate (LCU per US$, period average)]

let FXIndicator = "PA.NUS.FCRF";
let FXYear = "2024"
let FXPerPage = 1000;
let FXJsonFilename = "worldbank_FX_data.json"

getData(FXIndicator, FXYear, FXPerPage, FXJsonFilename);
