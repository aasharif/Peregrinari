// processCountryData.js
// Utility to convert your JSON format to the format expected by WorldMap component

// Country name to ISO 2-letter code mapping
const countryNameToCode = {
"aruba": "aw",
"angola": "ao",
"albania": "al",
"andorra": "ad",
"united arab emirates": "ae",
"argentina": "ar",
"armenia": "am",
"american samoa": "as",
"antigua and barbuda": "ag",
"australia": "au",
"austria": "at",
"azerbaijan": "az",
"belgium": "be",
"benin": "bj",
"burkina faso": "bf",
"bangladesh": "bd",
"bulgaria": "bg",
"bahrain": "bh",
"bahamas, the": "bs",
"bosnia and herzegovina": "ba",
"belarus": "by",
"belize": "bz",
"bermuda": "bm",
"bolivia": "bo",
"brazil": "br",
"barbados": "bb",
"brunei darussalam": "bn",
"bhutan": "bt",
"botswana": "bw",
"central african republic": "cf",
"canada": "ca",
"switzerland": "ch",
"chile": "cl",
"china": "cn",
"cote d'ivoire": "ci",
"cameroon": "cm",
"congo, rep.": "cg",
"colombia": "co",
"comoros": "km",
"cabo verde": "cv",
"costa rica": "cr",
"cuba": "cu",
"curacao": "cw",
"cayman islands": "ky",
"cyprus": "cy",
"czechia": "cz",
"germany": "de",
"djibouti": "dj",
"dominica": "dm",
"denmark": "dk",
"dominican republic": "do",
"algeria": "dz",
"ecuador": "ec",
"egypt, arab rep.": "eg",
"eritrea": "er",
"spain": "es",
"estonia": "ee",
"ethiopia": "et",
"finland": "fi",
"fiji": "fj",
"france": "fr",
"micronesia, fed. sts.": "fm",
"gabon": "ga",
"united kingdom": "gb",
"georgia": "ge",
"ghana": "gh",
"gibraltar": "gi",
"guinea": "gn",
"gambia, the": "gm",
"guinea-bissau": "gw",
"equatorial guinea": "gq",
"greece": "gr",
"grenada": "gd",
"greenland": "gl",
"guatemala": "gt",
"guam": "gu",
"guyana": "gy",
"hong kong sar, china": "hk",
"honduras": "hn",
"croatia": "hr",
"haiti": "ht",
"hungary": "hu",
"indonesia": "id",
"india": "in",
"ireland": "ie",
"iran, islamic rep.": "ir",
"iraq": "iq",
"iceland": "is",
"israel": "il",
"italy": "it",
"jamaica": "jm",
"jordan": "jo",
"japan": "jp",
"kazakhstan": "kz",
"kenya": "ke",
"kyrgyz republic": "kg",
"cambodia": "kh",
"kiribati": "ki",
"st. kitts and nevis": "kn",
"korea, rep.": "kr",
"kuwait": "kw",
"lao pdr": "la",
"lebanon": "lb",
"liberia": "lr",
"libya": "ly",
"st. lucia": "lc",
"liechtenstein": "li",
"sri lanka": "lk",
"lesotho": "ls",
"lithuania": "lt",
"luxembourg": "lu",
"latvia": "lv",
"macao sar, china": "mo",
"morocco": "ma",
"monaco": "mc",
"moldova": "md",
"madagascar": "mg",
"maldives": "mv",
"mexico": "mx",
"marshall islands": "mh",
"north macedonia": "mk",
"mali": "ml",
"malta": "mt",
"myanmar": "mm",
"montenegro": "me",
"mongolia": "mn",
"northern mariana islands": "mp",
"mozambique": "mz",
"mauritania": "mr",
"mauritius": "mu",
"malawi": "mw",
"malaysia": "my",
"namibia": "na",
"new caledonia": "nc",
"niger": "ne",
"nigeria": "ng",
"nicaragua": "ni",
"netherlands": "nl",
"norway": "no",
"nepal": "np",
"nauru": "nr",
"new zealand": "nz",
"oman": "om",
"pakistan": "pk",
"panama": "pa",
"peru": "pe",
"philippines": "ph",
"palau": "pw",
"papua new guinea": "pg",
"poland": "pl",
"puerto rico": "pr",
"puerto rico (us)": "pr",
"korea, dem. people's rep.": "kp",
"portugal": "pt",
"paraguay": "py",
"french polynesia": "pf",
"qatar": "qa",
"romania": "ro",
"russian federation": "ru",
"rwanda": "rw",
"saudi arabia": "sa",
"sudan": "sd",
"senegal": "sn",
"singapore": "sg",
"solomon islands": "sb",
"sierra leone": "sl",
"el salvador": "sv",
"san marino": "sm",
"somalia": "so",
"serbia": "rs",
"south sudan": "ss",
"sao tome and principe": "st",
"suriname": "sr",
"slovak republic": "sk",
"slovenia": "si",
"sweden": "se",
"eswatini": "sz",
"sint maarten (dutch part)": "sx",
"seychelles": "sc",
"syrian arab republic": "sy",
"turks and caicos islands": "tc",
"chad": "td",
"togo": "tg",
"thailand": "th",
"tajikistan": "tj",
"turkmenistan": "tm",
"timor-leste": "tl",
"tonga": "to",
"trinidad and tobago": "tt",
"tunisia": "tn",
"turkiye": "tr",
"turkey": "tr",
"tuvalu": "tv",
"tanzania": "tz",
"uganda": "ug",
"ukraine": "ua",
"uruguay": "uy",
"united states": "us",
"uzbekistan": "uz",
"st. vincent and the grenadines": "vc",
"venezuela, rb": "ve",
"virgin islands (u.s.)": "vi",
"viet nam": "vn",
"vietnam": "vn",
"vanuatu": "vu",
"samoa": "ws",
"kosovo": "xk",
"yemen, rep.": "ye",
"south africa": "za",
"zambia": "zm",
"zimbabwe": "zw"
};

/**

- Process the raw JSON data into a format suitable for the WorldMap component
- @param {Object} rawData - The raw JSON data with numeric keys
- @returns {Object} Processed data with country codes as keys
  */
  export function processCountryData(rawData) {
  const processed = {};

// Iterate through all numeric keys
Object.values(rawData).forEach(entry => {
if (entry && entry["Country Name"] && entry["2024"]) {
const countryName = entry["Country Name"].toLowerCase();
const countryCode = countryNameToCode[countryName];


  if (countryCode) {
    processed[countryCode] = entry['2024'];
  } else {
    console.warn(`No country code mapping found for: ${entry['Country Name']}`);
  }
}


});

return processed;
}

/**

- Get min and max values from the data
- @param {Object} data - Processed country data
- @returns {Object} Object with min and max values
  */
  export function getDataRange(data) {
  const values = Object.values(data).filter(v => typeof v === "number");

return {
min: Math.min(...values),
max: Math.max(...values)
};
}

/**

- Apply a logarithmic scale to the data (useful for highly skewed data)
- @param {Object} data - Country data object
- @returns {Object} Data with log-transformed values
  */
  export function applyLogScale(data) {
  const logData = {};

Object.entries(data).forEach(([code, value]) => {
if (typeof value === "number" && value > 0) {
logData[code] = Math.log10(value);
}
});

return logData;
}

// Example Svelte usage:
// import rawData from "./data.json";
// import { processCountryData, getDataRange } from "./processCountryData";
//
// const countryData = processCountryData(rawData);
// const { min, max } = getDataRange(countryData);
// console.log("Processed data:", countryData);
// console.log("Range:", min, "to", max);