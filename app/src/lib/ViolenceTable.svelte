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
  import violenceData from "../data/Violence_table.json";

  // Turn the single object into an array of rows
  const rows = Object.entries(violenceData[0]).map(([country, value]) => ({
    country,
    value: Number(value),
  }));

  // Format numbers
  const formatNumber = (n) => {
    if (n < 1) return n.toFixed(3);
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(n);
  };
</script>

{#if rows.length > 0}
  <table>
    <thead>
      <tr>
        <th>Country</th>
        <th>Violence Index</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as { country, value }}
        {#if value !== 0}
          <tr>
            <td>{country}</td>
            <td>{formatNumber(value)}</td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
{:else}
  <p>Error: Violence data is not available or has wrong format</p>
{/if}

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: sans-serif;
    color: black;
    background: white;
  }
  th,
  td {
    text-align: left;
    padding: 0.4rem 0.6rem;
    border-bottom: 1px solid #ddd;
  }
  th {
    background: white;
    font-weight: 600;
  }
  tbody tr:hover {
    background: lightgray;
  }
</style>
