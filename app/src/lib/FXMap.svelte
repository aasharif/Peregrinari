<!-- /*
 * Copyright (C) 2025 Alexander Sharif
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as 
 * published
 * by the Free Software Foundation, either version 3 of the 
 * License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public 
 * License
 * along with this program. If not, see 
 * <https://www.gnu.org/licenses/agpl-3.0.en.html>.
 */ -->
<script>
  // Imports
  import { onMount } from "svelte";
  import data from "../data/FX_map.json";
  import svgPath from "../assets/World Map.svg";

  // Properties for the SVG file's behavior
  export let colorScheme = "green";
  export let minValue = 0;
  export let maxValue = 255;
  export let noDataColor = "#f0f0f0";
  export let strokeColor = "#000000";
  export let strokeWidth = "0.5";

  let svgContainer;
  let tooltip = { show: false, x: 0, y: 0, country: "", value: null };
  let dynamicStyles = "";

  // Color scheme configurations
  const colorSchemes = {
    blue: { hue: 200, saturation: 70 },
    green: { hue: 120, saturation: 100 },
    red: { hue: 0, saturation: 100 },
    orange: { hue: 30, saturation: 80 },
    purple: { hue: 300, saturation: 70 },
  };

  // Define the color of countries on the SVG map
  function getColor(value) {
    if (!value && value !== 0) return noDataColor;

    // Normalize the values to color the countries easily
    const range = maxValue - minValue;
    const normalized = Math.min(Math.max((value - minValue) / range, 0), 1);
    // const normalized = value/range;

    const scheme = colorSchemes[colorScheme];
    const lightness = 90 - normalized * 50;

    // Return the HSL value
    return `hsl(${scheme.hue}, ${scheme.saturation}%, ${lightness}%)`;
  }

  // Generate the dynamic CSS styles for coloring of each country
  function generateDynamicStyles() {
    let styles = "";

    // Generate CSS rules for each country
    Object.entries(data).forEach(([countryCode, value]) => {
      // console.log([countryCode, value])
      const color = getColor(value);
      const code = countryCode.toLowerCase();

      // Fill based on country codes
      styles += `
        .${code}, #${code} {
          fill: ${color} !important;
          stroke: ${strokeColor};
          stroke-width: ${strokeWidth};
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .${code}:hover, #${code}:hover {
          opacity: 0.8;
        }
      `;

      // Add default styling for countries without data
      styles += `
      .${code}, #${code} {
        fill: ${noDataColor};
        stroke: ${strokeColor};
        stroke-width: ${strokeWidth};
      }
    `;
    });
    dynamicStyles = styles;
    // console.log(dynamicStyles)
  }

  // Load the map from the SVG file
  async function loadMap() {
    if (!svgPath) {
      console.error("No SVG path provided");
      return;
    }

    try {
      let svgContent;

      if (svgPath.trim().startsWith("<svg")) {
        svgContent = svgPath;
      } else {
        const response = await fetch(svgPath);
        svgContent = await response.text();
      }

      svgContainer.innerHTML = svgContent;
    } catch (error) {
      console.error("Error loading SVG:", error);
    }
  }

  onMount(() => {
    generateDynamicStyles();
    loadMap();
  });

  // Regenerate styles when props change
  $: {
    colorScheme;
    minValue;
    maxValue;
    noDataColor;
    strokeColor;
    strokeWidth;
    if (svgContainer) {
      generateDynamicStyles();
    }
  }
</script>

<div class="world-map-container">
  <div bind:this={svgContainer} class="svg-wrapper"></div>
</div>

<!-- Dynamic styles injected here -->
{@html `<style>${dynamicStyles}</style>`}
