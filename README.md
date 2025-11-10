<img width="2986" height="1686" alt="image" src="https://github.com/user-attachments/assets/85af4839-cc41-4c6a-a48c-28133acfbc1e" />


# Peregrinari
This is a Svelte single-page application that aims to highlight incidence of violence and foreign exchange rates for countries around the world. 
Data is shown in both map form and tabular form.

# Instructions 
1. Install `npm` and `node`.
2. Clone the repo `git clone https://github.com/aasharif/Peregrinari`.
3. Navigate to the `app/` directory.
4. Run `npm install` inside of the `app/` directory to install dependencies.  
5. Use node to run `app/src/data/getData.js` via `node app/src/data/getData.js` to download the data the app uses.
6. Use node to run `app/src/data/processJSON.js` via `node app/src/data/processJSON.js` to parse data for the app.
7. Run `npm run dev` while in the `app/` directory to start the app.
8. Vite should launch and give the localhost port to access (e.g. http://localhost:5173/)

# Map Credit
The SVG world map used can be located at https://commons.wikimedia.org/wiki/File:BlankMap-World.svg. It was released into
the public domain.

# Creative Commons Attibution

Data from the World Bank is licensed via Creative Commons 4.0 Attribution
https://creativecommons.org/licenses/by/4.0/legalcode.txt

Data can be access via the API at https://data360.worldbank.org/en/api 
and by way of the https://data.worldbank.org search page.

This application is in no way endorsed or sponsored by the World Bank.
Neither this application nor its author is in any way endorsed or 
sponsored by the World Bank.

Official exchange rate (LCU per US$, period average)
International Financial Statistics database, International Monetary Fund ( IMF ): 
https://data.worldbank.org/indicator/PA.NUS.FCRF

Political Stability and Absence of Violence/Terrorism: Percentile Rank
Worldwide Governance Indicators, World Bank ( WB ), uri: govindicators.org, 
note: The Worldwide Governance Indicators ( WGI ) are a product of the staff of 
the World Bank with external contributions.:
https://data.worldbank.org/indicator/PV.PER.RNK

Data can be obtained for the application by following intstructional step number 5 and used by the application .
