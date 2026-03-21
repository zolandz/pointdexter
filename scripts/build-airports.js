#!/usr/bin/env node

/**
 * Build script: Downloads OurAirports data and generates data/airports.js
 * Source: https://github.com/davidmegginson/ourairports-data (public domain)
 *
 * Usage: node scripts/build-airports.js
 */

const https = require('https');
const path = require('path');
const fs = require('fs');

const CSV_URL = 'https://raw.githubusercontent.com/davidmegginson/ourairports-data/main/airports.csv';
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'airports.js');
const VALID_TYPES = new Set(['large_airport', 'medium_airport']);

// Manual name overrides for airports where auto-generated names read poorly
const NAME_OVERRIDES = {
  ATL: 'Atlanta',
  SEA: 'Seattle-Tacoma',
  DFW: 'Dallas/Fort Worth',
  IAH: 'Houston Intercontinental',
  IAD: 'Washington Dulles',
  DCA: 'Washington Reagan',
  FLL: 'Fort Lauderdale',
  RDU: 'Raleigh-Durham',
  OGG: 'Maui Kahului',
  LIH: 'Lihue, Kauai',
  EWR: 'Newark',
  LGA: 'LaGuardia',
  MSP: 'Minneapolis-St. Paul',
  DTW: 'Detroit Metro',
  BWI: 'Baltimore/Washington',
  CDG: 'Paris Charles de Gaulle',
  ORY: 'Paris Orly',
  AMS: 'Amsterdam Schiphol',
  FCO: 'Rome Fiumicino',
  CIA: 'Rome Ciampino',
  SVO: 'Moscow Sheremetyevo',
  DME: 'Moscow Domodedovo',
  NRT: 'Tokyo Narita',
  HND: 'Tokyo Haneda',
  KIX: 'Osaka Kansai',
  ITM: 'Osaka Itami',
  ICN: 'Seoul Incheon',
  GMP: 'Seoul Gimpo',
  PVG: 'Shanghai Pudong',
  SHA: 'Shanghai Hongqiao',
  PEK: 'Beijing Capital',
  PKX: 'Beijing Daxing',
  SIN: 'Singapore Changi',
  BKK: 'Bangkok Suvarnabhumi',
  DMK: 'Bangkok Don Mueang',
  TPE: 'Taipei Taoyuan',
  TSA: 'Taipei Songshan',
  CGK: 'Jakarta Soekarno-Hatta',
  GRU: 'São Paulo Guarulhos',
  CGH: 'São Paulo Congonhas',
  GIG: 'Rio de Janeiro Galeão',
  SDU: 'Rio de Janeiro Santos Dumont',
  EZE: 'Buenos Aires Ezeiza',
  AEP: 'Buenos Aires Aeroparque',
  MEX: 'Mexico City',
  NBO: 'Nairobi',
  JNB: 'Johannesburg',
  CPT: 'Cape Town',
  CAI: 'Cairo',
  CMN: 'Casablanca',
  STN: 'London Stansted',
  LTN: 'London Luton',
  LCY: 'London City',
  LHR: 'London Heathrow',
  LGW: 'London Gatwick',
  JFK: 'New York JFK',
  SFO: 'San Francisco',
  OAK: 'Oakland',
  SJC: 'San Jose',
  MIA: 'Miami',
  MCO: 'Orlando',
  TPA: 'Tampa',
  SYD: 'Sydney',
  MEL: 'Melbourne',
  BNE: 'Brisbane',
  BOM: 'Mumbai',
  DEL: 'Delhi',
  MAA: 'Chennai',
  BLR: 'Bengaluru',
  HYD: 'Hyderabad',
  CCU: 'Kolkata',
};

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function parseCSV(text) {
  const lines = text.split('\n');
  const headers = parseCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = parseCSVLine(line);
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j] || '';
    }
    rows.push(row);
  }
  return rows;
}

function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        fields.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
  }
  fields.push(current);
  return fields;
}

function extractShortName(fullName) {
  // Strip common suffixes to get a short identifier for disambiguation
  return fullName
    .replace(/\s*(International|Regional|Municipal|Metropolitan|Memorial)\s*/gi, ' ')
    .replace(/\s*(Airport|Aeropuerto|Aéroport|Flughafen|Aeroporto)\s*/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateDisplayName(row, localCounts, globalCounts) {
  const iata = row.iata_code;

  // Use manual override if available
  if (NAME_OVERRIDES[iata]) {
    return NAME_OVERRIDES[iata];
  }

  const municipality = (row.municipality || '').trim();
  const airportName = (row.name || '').trim();
  const country = (row.iso_country || '').trim();

  // If no municipality, use cleaned airport name
  if (!municipality) {
    return extractShortName(airportName) || iata;
  }

  // localKey: same municipality + same country (need airport-level disambiguation)
  const localKey = `${municipality}|${country}`;
  const localCount = localCounts.get(localKey) || 0;
  const globalCount = globalCounts.get(municipality) || 0;

  // Only one airport with this city name worldwide — use municipality as-is
  if (globalCount <= 1) {
    return municipality;
  }

  // Multiple airports in same city/country — disambiguate by airport name
  if (localCount > 1) {
    const shortName = extractShortName(airportName);
    const escaped = municipality.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const distinguisher = shortName.replace(new RegExp(escaped, 'gi'), '').trim();
    if (distinguisher && distinguisher !== shortName) {
      return `${municipality} ${distinguisher}`;
    }
    return `${municipality} ${iata}`;
  }

  // Same city name exists in different countries — just use municipality
  // (most users know "Albany" GA vs "Albany" NY from context, and the IATA code is shown)
  return municipality;
}

async function main() {
  console.log('Downloading OurAirports data...');
  const csv = await fetch(CSV_URL);
  console.log(`Downloaded ${(csv.length / 1024).toFixed(0)} KB`);

  const rows = parseCSV(csv);
  console.log(`Parsed ${rows.length} total airport records`);

  // Filter to commercial airports with IATA codes
  const filtered = rows.filter(row => {
    if (!row.iata_code || row.iata_code.length !== 3) return false;
    if (!VALID_TYPES.has(row.type)) return false;
    if (row.scheduled_service === 'no') return false;
    const lat = parseFloat(row.latitude_deg);
    const lon = parseFloat(row.longitude_deg);
    if (isNaN(lat) || isNaN(lon)) return false;
    return true;
  });

  console.log(`Filtered to ${filtered.length} commercial airports`);

  // Count municipalities for disambiguation
  // localCounts: same city + same country (multiple airports in one city)
  // globalCounts: same city name worldwide (e.g., Aberdeen in US vs UK)
  const localCounts = new Map();
  const globalCounts = new Map();
  for (const row of filtered) {
    const m = (row.municipality || '').trim();
    if (!m) continue;
    const country = (row.iso_country || '').trim();
    const localKey = `${m}|${country}`;
    localCounts.set(localKey, (localCounts.get(localKey) || 0) + 1);
    globalCounts.set(m, (globalCounts.get(m) || 0) + 1);
  }

  // Build airports object, preferring large_airport if duplicate IATA codes
  const airportsMap = new Map();
  for (const row of filtered) {
    const code = row.iata_code.toUpperCase();
    const existing = airportsMap.get(code);
    if (existing && existing._type === 'large_airport' && row.type !== 'large_airport') {
      continue; // Keep the large_airport version
    }
    airportsMap.set(code, {
      lat: Math.round(parseFloat(row.latitude_deg) * 10000) / 10000,
      lon: Math.round(parseFloat(row.longitude_deg) * 10000) / 10000,
      name: generateDisplayName(row, localCounts, globalCounts),
      _type: row.type,
    });
  }

  // Sort by IATA code for consistent output
  const sortedCodes = [...airportsMap.keys()].sort();

  // Generate JS file
  let js = `// Auto-generated from OurAirports data (public domain)\n`;
  js += `// Source: https://github.com/davidmegginson/ourairports-data\n`;
  js += `// Generated: ${new Date().toISOString().split('T')[0]}\n`;
  js += `// Rebuild: node scripts/build-airports.js\n`;
  js += `//\n`;
  js += `// ${sortedCodes.length} commercial airports (large + medium with scheduled service)\n\n`;
  js += `export const airports = {\n`;

  for (const code of sortedCodes) {
    const a = airportsMap.get(code);
    const name = a.name.replace(/'/g, "\\'");
    js += `  ${code}: { lat: ${a.lat}, lon: ${a.lon}, name: '${name}' },\n`;
  }

  js += `};\n`;

  fs.writeFileSync(OUTPUT_PATH, js, 'utf-8');
  const sizeKB = (fs.statSync(OUTPUT_PATH).size / 1024).toFixed(0);
  console.log(`\nWrote ${OUTPUT_PATH}`);
  console.log(`${sortedCodes.length} airports, ${sizeKB} KB`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
