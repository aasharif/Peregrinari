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
  //Imports
  import { fade } from 'svelte/transition';
  import FXMap from "./lib/FXMap.svelte";
  import ViolenceMap from "./lib/ViolenceMap.svelte";
  import ViolenceTable from "./lib/ViolenceTable.svelte";
  import FXTable from "./lib/FXTable.svelte";
  
  // Set the state to show FX rates by default
  let showFXRates = $state(true);

  
  function toggleView() {
    // Toggle the view to show either FX rates or incidence of violence
    showFXRates = !showFXRates;
  }

</script>
<!-- Header information -->
<header>
<h1><b>Peregrinari</b></h1>
<h2><i>Determine Your Next Move</i></h2>
<p> Use the following single-page-app to determine which country to relocate to.</p>
</header>

<button onclick={toggleView}>
  {showFXRates ? "Switch to Violence and Terrorism Index" : "Switch to USD Foreign Exchange Rates"}
</button>

{#if showFXRates}
<div transition:fade={{ duration: 500 }}>
  <h3>{showFXRates?"Foreign Exchange (to USD, yearly period average)":"Violence and Terrorism Index"}</h3>
  <p> Lighter countries are roughly equivalent to USD </p>
  <div class="map-container">
    <FXMap />
  </div>
  <p>Please find numerical data below:</p>
  <div>
    <FXTable />
  </div>
</div>
{:else}
<div transition:fade={{ duration: 500 }}>
  <h3>{showFXRates?"Foreign Exchange (to USD, yearly period average)":"Violence and Terrorism Index"}</h3>
  <p> Brighter countries are more peaceful </p>
  <div class="map-container">
    <ViolenceMap />
  </div>
  <p>Please find numerical data below:</p>
  <div>
    <ViolenceTable />
  </div>
</div>
{/if}

<style>
  .map-container :global(svg) {
    transform: scale(0.50);
    transform-origin: top left;
  }
  :root{
    font-family: "Arial"
  }
</style>
