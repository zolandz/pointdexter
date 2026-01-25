/**
 * ATMOS REWARDS EARNING RULES
 *
 * This file is the single source of truth for earning rates.
 * Both the calculator (index.html) and admin viewer (admin.html) import this file.
 *
 * Source: https://www.alaskaair.com/atmosrewards/content/earn-points/flights
 */

// =============================================================================
// METADATA
// =============================================================================

export const RULES_META = {
  version: '1.0.0',
  lastUpdated: '2025-01-24',
  source: 'https://www.alaskaair.com/atmosrewards/content/earn-points/flights'
};

// =============================================================================
// EARNING PROGRAMS
// =============================================================================

/**
 * KEY RULES:
 * 1. Status Points (EQM) = Base Miles x Total Fare Class Rate (base + bonus %)
 * 2. Redeemable Miles (RDM) = (Base Miles x Total Fare Class Rate) + Elite Bonus
 * 3. Elite bonuses apply ONLY to redeemable miles, NOT to status points
 * 4. Elite bonuses are calculated on BASE miles only (not fare-class-adjusted miles)
 */

export const earningPrograms = {
  alaska: {
    id: 'alaska',
    name: 'Alaska Atmos Rewards',
    currency: 'miles',

    // Elite bonuses apply to BASE MILES for RDM only, NOT to EQM/Status Points
    eliteBonuses: {
      none: 0,
      silver: 0.25,    // 25% bonus on base miles
      gold: 0.50,      // 50% bonus on base miles
      platinum: 1.00,  // 100% bonus on base miles
      titanium: 1.50   // 150% bonus on base miles
    },

    // Elite tier display configuration
    eliteTiers: {
      none: { name: 'Non-Elite', style: 'background: linear-gradient(180deg, #2a2a2e 0%, #1c1c1f 100%)' },
      silver: { name: 'Silver', style: 'background: linear-gradient(180deg, #c0c0c0 0%, #888888 50%, #a8a8a8 100%); color: #1a1a1a' },
      gold: { name: 'Gold', style: 'background: linear-gradient(180deg, #d4a650 0%, #a67c28 50%, #c9a227 100%); color: #1a1400' },
      platinum: { name: 'Platinum', style: 'background: linear-gradient(180deg, #e8e8e8 0%, #a8a8a8 50%, #d0d0d0 100%); color: #1a1a1a' },
      titanium: { name: 'Titanium', style: 'background: linear-gradient(180deg, #5a5a62 0%, #38383e 50%, #4a4a52 100%); color: #fff' }
    },

    // Calculation rules documentation
    calculationRules: {
      eqm: 'Distance x Fare Class Total Rate (no elite bonus)',
      rdm: 'Distance x Fare Class Total Rate + Elite Bonus on base distance'
    },

    airlines: {
      // ============================================
      // ALASKA AIRLINES - booked via alaskaair.com
      // Official rates from alaskaair.com/atmosrewards
      // ============================================
      AS: {
        code: 'AS',
        name: 'Alaska Airlines',
        bookingChannel: 'alaskaair.com',
        fareClasses: {
          // FIRST CLASS
          J: { base: 1.00, bonus: 1.00, total: 2.00, cabin: 'first', name: 'J - First Class (200%)' },
          C: { base: 1.00, bonus: 0.75, total: 1.75, cabin: 'first', name: 'C - First Class (175%)' },
          D: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'D/I - First Class (150%)' },
          I: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'I - First Class (150%)' },
          // ECONOMY - Full fare and premium
          Y: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'economy', name: 'Y - Econ Full Fare (150%)' },
          B: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'economy', name: 'B - Economy (150%)' },
          H: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'economy', name: 'H - Economy (125%)' },
          K: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'economy', name: 'K - Economy (125%)' },
          // ECONOMY - Standard fares (100%)
          M: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'M - Economy (100%)' },
          L: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'L - Economy (100%)' },
          V: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'V - Economy (100%)' },
          S: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'S - Economy (100%)' },
          N: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'N - Economy (100%)' },
          Q: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'Q - Economy (100%)' },
          O: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'O - Economy (100%)' },
          G: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'G - Economy (100%)' },
          // SAVER
          X: { base: 0.30, bonus: 0, total: 0.30, cabin: 'saver', name: 'X - Saver (30%)' }
        }
      },

      // ============================================
      // HAWAIIAN AIRLINES - booked via hawaiianairlines.com
      // Official rates from alaskaair.com/atmosrewards
      // ============================================
      HA: {
        code: 'HA',
        name: 'Hawaiian Airlines',
        bookingChannel: 'hawaiianairlines.com',
        fareClasses: {
          // DOMESTIC FIRST & INTERNATIONAL BUSINESS
          F: { base: 1.00, bonus: 1.00, total: 2.00, cabin: 'first', name: 'F - First/Business (200%)' },
          J: { base: 1.00, bonus: 1.00, total: 2.00, cabin: 'business', name: 'J - Business (200%)' },
          P: { base: 1.00, bonus: 0.75, total: 1.75, cabin: 'business', name: 'P - Business (175%)' },
          C: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'business', name: 'C - Business (150%)' },
          A: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'business', name: 'A - Business (150%)' },
          D: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'business', name: 'D - Business (150%)' },
          // ECONOMY
          Y: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'economy', name: 'Y - Econ Full (150%)' },
          W: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'economy', name: 'W - Economy (150%)' },
          X: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'economy', name: 'X - Economy (150%)' },
          Q: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'economy', name: 'Q - Economy (125%)' },
          V: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'economy', name: 'V - Economy (125%)' },
          B: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'economy', name: 'B - Economy (125%)' },
          S: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'economy', name: 'S - Economy (125%)' },
          // ECONOMY - Standard
          N: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'N - Economy (100%)' },
          M: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'M - Economy (100%)' },
          I: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'I - Economy (100%)' },
          H: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'H - Economy (100%)' },
          G: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'G - Economy (100%)' },
          K: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'K - Economy (100%)' },
          L: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'L - Economy (100%)' },
          Z: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'Z - Economy (100%)' },
          O: { base: 1.00, bonus: 0, total: 1.00, cabin: 'economy', name: 'O - Economy (100%)' },
          // SAVER
          U: { base: 0.30, bonus: 0, total: 0.30, cabin: 'saver', name: 'U - Saver (30%)' }
        }
      },

      // ============================================
      // PARTNER FLIGHTS BOOKED VIA ALASKA
      // These get enhanced earning rates
      // ============================================
      PARTNER_VIA_AS: {
        code: 'PARTNER_VIA_AS',
        name: 'Partners (booked via Alaska)',
        bookingChannel: 'alaskaair.com',
        fareClasses: {
          F_INTL: { base: 1.00, bonus: 2.50, total: 3.50, cabin: 'first', name: 'Int\'l First (350%)' },
          J_INTL: { base: 1.00, bonus: 1.50, total: 2.50, cabin: 'business', name: 'Int\'l Business (250%)' },
          F_DOM:  { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'Domestic First (150%)' },
          W:      { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'premium_economy', name: 'Premium Economy (150%)' },
          Y:      { base: 1.00, bonus: 0,    total: 1.00, cabin: 'economy', name: 'Economy (100%)' },
          Y_DISC: { base: 1.00, bonus: 0,    total: 1.00, cabin: 'economy', name: 'Discount Economy (100%)' }
        }
      },

      // ============================================
      // PARTNER FLIGHTS BOOKED VIA PARTNER SITE
      // Lower earning rates than booking via Alaska
      // ============================================
      AA: {
        code: 'AA',
        name: 'American Airlines (partner site)',
        bookingChannel: 'aa.com',
        fareClasses: {
          F: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'First Class (150%)' },
          J: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'business', name: 'Business (125%)' },
          W: { base: 1.00, bonus: 0,    total: 1.00, cabin: 'premium_economy', name: 'Premium Economy (100%)' },
          Y: { base: 0.50, bonus: 0,    total: 0.50, cabin: 'economy', name: 'Economy (50%)' },
          B: { base: 0.25, bonus: 0,    total: 0.25, cabin: 'economy', name: 'Discount Economy (25%)' }
        }
      },
      BA: {
        code: 'BA',
        name: 'British Airways (partner site)',
        bookingChannel: 'britishairways.com',
        fareClasses: {
          F: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'First Class (150%)' },
          J: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'business', name: 'Club World (125%)' },
          W: { base: 1.00, bonus: 0,    total: 1.00, cabin: 'premium_economy', name: 'World Traveller Plus (100%)' },
          Y: { base: 0.50, bonus: 0,    total: 0.50, cabin: 'economy', name: 'World Traveller (50%)' },
          B: { base: 0.25, bonus: 0,    total: 0.25, cabin: 'economy', name: 'Discount Economy (25%)' }
        }
      },
      CX: {
        code: 'CX',
        name: 'Cathay Pacific (partner site)',
        bookingChannel: 'cathaypacific.com',
        fareClasses: {
          F: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'First Class (150%)' },
          J: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'business', name: 'Business (125%)' },
          W: { base: 1.00, bonus: 0,    total: 1.00, cabin: 'premium_economy', name: 'Premium Economy (100%)' },
          Y: { base: 0.50, bonus: 0,    total: 0.50, cabin: 'economy', name: 'Economy (50%)' },
          B: { base: 0.25, bonus: 0,    total: 0.25, cabin: 'economy', name: 'Discount Economy (25%)' }
        }
      },
      EK: {
        code: 'EK',
        name: 'Emirates (partner site)',
        bookingChannel: 'emirates.com',
        fareClasses: {
          F: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'First Class (150%)' },
          J: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'business', name: 'Business (125%)' },
          W: { base: 1.00, bonus: 0,    total: 1.00, cabin: 'premium_economy', name: 'Premium Economy (100%)' },
          Y: { base: 0.50, bonus: 0,    total: 0.50, cabin: 'economy', name: 'Economy (50%)' },
          B: { base: 0.25, bonus: 0,    total: 0.25, cabin: 'economy', name: 'Discount Economy (25%)' }
        }
      },
      JL: {
        code: 'JL',
        name: 'Japan Airlines (partner site)',
        bookingChannel: 'jal.com',
        fareClasses: {
          F: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'First Class (150%)' },
          J: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'business', name: 'Business (125%)' },
          W: { base: 1.00, bonus: 0,    total: 1.00, cabin: 'premium_economy', name: 'Premium Economy (100%)' },
          Y: { base: 0.50, bonus: 0,    total: 0.50, cabin: 'economy', name: 'Economy (50%)' },
          B: { base: 0.25, bonus: 0,    total: 0.25, cabin: 'economy', name: 'Discount Economy (25%)' }
        }
      },
      QF: {
        code: 'QF',
        name: 'Qantas (partner site)',
        bookingChannel: 'qantas.com',
        fareClasses: {
          F: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'First Class (150%)' },
          J: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'business', name: 'Business (125%)' },
          W: { base: 1.00, bonus: 0,    total: 1.00, cabin: 'premium_economy', name: 'Premium Economy (100%)' },
          Y: { base: 0.50, bonus: 0,    total: 0.50, cabin: 'economy', name: 'Economy (50%)' },
          B: { base: 0.25, bonus: 0,    total: 0.25, cabin: 'economy', name: 'Discount Economy (25%)' }
        }
      },
      KE: {
        code: 'KE',
        name: 'Korean Air (partner site)',
        bookingChannel: 'koreanair.com',
        fareClasses: {
          F: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'First Class (150%)' },
          J: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'business', name: 'Prestige (125%)' },
          W: { base: 1.00, bonus: 0,    total: 1.00, cabin: 'premium_economy', name: 'Premium Economy (100%)' },
          Y: { base: 0.50, bonus: 0,    total: 0.50, cabin: 'economy', name: 'Economy (50%)' },
          B: { base: 0.25, bonus: 0,    total: 0.25, cabin: 'economy', name: 'Discount Economy (25%)' }
        }
      },
      SQ: {
        code: 'SQ',
        name: 'Singapore Airlines (partner site)',
        bookingChannel: 'singaporeair.com',
        fareClasses: {
          F: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'First/Suites (150%)' },
          J: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'business', name: 'Business (125%)' },
          W: { base: 1.00, bonus: 0,    total: 1.00, cabin: 'premium_economy', name: 'Premium Economy (100%)' },
          Y: { base: 0.50, bonus: 0,    total: 0.50, cabin: 'economy', name: 'Economy (50%)' },
          B: { base: 0.25, bonus: 0,    total: 0.25, cabin: 'economy', name: 'Discount Economy (25%)' }
        }
      },
      FJ: {
        code: 'FJ',
        name: 'Fiji Airways (partner site)',
        bookingChannel: 'fijiairways.com',
        fareClasses: {
          F: { base: 1.00, bonus: 0.50, total: 1.50, cabin: 'first', name: 'First Class (150%)' },
          J: { base: 1.00, bonus: 0.25, total: 1.25, cabin: 'business', name: 'Business (125%)' },
          W: { base: 1.00, bonus: 0,    total: 1.00, cabin: 'premium_economy', name: 'Premium Economy (100%)' },
          Y: { base: 0.50, bonus: 0,    total: 0.50, cabin: 'economy', name: 'Economy (50%)' },
          B: { base: 0.25, bonus: 0,    total: 0.25, cabin: 'economy', name: 'Discount Economy (25%)' }
        }
      }
    }
  }
};

// =============================================================================
// AIRPORTS DATABASE
// =============================================================================

export const airports = {
  SEA: { lat: 47.4502, lon: -122.3088, name: 'Seattle-Tacoma' },
  SFO: { lat: 37.6213, lon: -122.3790, name: 'San Francisco' },
  LAX: { lat: 33.9425, lon: -118.4081, name: 'Los Angeles' },
  JFK: { lat: 40.6413, lon: -73.7781, name: 'New York JFK' },
  EWR: { lat: 40.6895, lon: -74.1745, name: 'Newark' },
  LGA: { lat: 40.7769, lon: -73.8740, name: 'LaGuardia' },
  ORD: { lat: 41.9742, lon: -87.9073, name: "Chicago O'Hare" },
  DFW: { lat: 32.8998, lon: -97.0403, name: 'Dallas/Fort Worth' },
  IAH: { lat: 29.9902, lon: -95.3368, name: 'Houston Intercontinental' },
  MIA: { lat: 25.7959, lon: -80.2870, name: 'Miami' },
  ATL: { lat: 33.6407, lon: -84.4277, name: 'Atlanta' },
  DEN: { lat: 39.8561, lon: -104.6737, name: 'Denver' },
  PHX: { lat: 33.4373, lon: -112.0078, name: 'Phoenix' },
  LAS: { lat: 36.0840, lon: -115.1537, name: 'Las Vegas' },
  PDX: { lat: 45.5898, lon: -122.5951, name: 'Portland' },
  SAN: { lat: 32.7338, lon: -117.1933, name: 'San Diego' },
  SJC: { lat: 37.3639, lon: -121.9289, name: 'San Jose' },
  BOS: { lat: 42.3656, lon: -71.0096, name: 'Boston' },
  IAD: { lat: 38.9531, lon: -77.4565, name: 'Washington Dulles' },
  DCA: { lat: 38.8512, lon: -77.0402, name: 'Washington Reagan' },
  MSP: { lat: 44.8848, lon: -93.2223, name: 'Minneapolis' },
  DTW: { lat: 42.2162, lon: -83.3554, name: 'Detroit' },
  PHL: { lat: 39.8729, lon: -75.2437, name: 'Philadelphia' },
  CLT: { lat: 35.2140, lon: -80.9431, name: 'Charlotte' },
  MCO: { lat: 28.4312, lon: -81.3081, name: 'Orlando' },
  TPA: { lat: 27.9756, lon: -82.5333, name: 'Tampa' },
  FLL: { lat: 26.0742, lon: -80.1506, name: 'Fort Lauderdale' },
  AUS: { lat: 30.1975, lon: -97.6664, name: 'Austin' },
  MSY: { lat: 29.9934, lon: -90.2580, name: 'New Orleans' },
  RDU: { lat: 35.8801, lon: -78.7880, name: 'Raleigh-Durham' },
  BWI: { lat: 39.1774, lon: -76.6684, name: 'Baltimore' },
  SLC: { lat: 40.7899, lon: -111.9791, name: 'Salt Lake City' },
  HNL: { lat: 21.3187, lon: -157.9225, name: 'Honolulu' },
  OGG: { lat: 20.8986, lon: -156.4305, name: 'Maui Kahului' },
  KOA: { lat: 19.7388, lon: -156.0456, name: 'Kona' },
  LIH: { lat: 21.9770, lon: -159.3390, name: 'Lihue, Kauai' },
  ANC: { lat: 61.1743, lon: -149.9962, name: 'Anchorage' },
  YVR: { lat: 49.1967, lon: -123.1815, name: 'Vancouver' },
  YYZ: { lat: 43.6777, lon: -79.6248, name: 'Toronto Pearson' },
  YUL: { lat: 45.4706, lon: -73.7408, name: 'Montreal' },
  MEX: { lat: 19.4363, lon: -99.0721, name: 'Mexico City' },
  CUN: { lat: 21.0365, lon: -86.8771, name: 'Cancun' },
  GDL: { lat: 20.5218, lon: -103.3111, name: 'Guadalajara' },
  SJD: { lat: 23.1518, lon: -109.7211, name: 'Los Cabos' },
  PVR: { lat: 20.6801, lon: -105.2544, name: 'Puerto Vallarta' },
  LHR: { lat: 51.4700, lon: -0.4543, name: 'London Heathrow' },
  LGW: { lat: 51.1537, lon: -0.1821, name: 'London Gatwick' },
  CDG: { lat: 49.0097, lon: 2.5479, name: 'Paris Charles de Gaulle' },
  FRA: { lat: 50.0379, lon: 8.5622, name: 'Frankfurt' },
  AMS: { lat: 52.3105, lon: 4.7683, name: 'Amsterdam Schiphol' },
  MUC: { lat: 48.3537, lon: 11.7750, name: 'Munich' },
  FCO: { lat: 41.8003, lon: 12.2389, name: 'Rome Fiumicino' },
  MAD: { lat: 40.4983, lon: -3.5676, name: 'Madrid' },
  BCN: { lat: 41.2974, lon: 2.0833, name: 'Barcelona' },
  ZRH: { lat: 47.4647, lon: 8.5492, name: 'Zurich' },
  VIE: { lat: 48.1103, lon: 16.5697, name: 'Vienna' },
  CPH: { lat: 55.6180, lon: 12.6508, name: 'Copenhagen' },
  ARN: { lat: 59.6498, lon: 17.9238, name: 'Stockholm Arlanda' },
  OSL: { lat: 60.1976, lon: 11.1004, name: 'Oslo' },
  HEL: { lat: 60.3172, lon: 24.9633, name: 'Helsinki' },
  DUB: { lat: 53.4264, lon: -6.2499, name: 'Dublin' },
  EDI: { lat: 55.9508, lon: -3.3615, name: 'Edinburgh' },
  LIS: { lat: 38.7756, lon: -9.1354, name: 'Lisbon' },
  ATH: { lat: 37.9364, lon: 23.9445, name: 'Athens' },
  IST: { lat: 41.2753, lon: 28.7519, name: 'Istanbul' },
  NRT: { lat: 35.7720, lon: 140.3929, name: 'Tokyo Narita' },
  HND: { lat: 35.5494, lon: 139.7798, name: 'Tokyo Haneda' },
  KIX: { lat: 34.4347, lon: 135.2441, name: 'Osaka Kansai' },
  ICN: { lat: 37.4602, lon: 126.4407, name: 'Seoul Incheon' },
  HKG: { lat: 22.3080, lon: 113.9185, name: 'Hong Kong' },
  SIN: { lat: 1.3644, lon: 103.9915, name: 'Singapore Changi' },
  BKK: { lat: 13.6900, lon: 100.7501, name: 'Bangkok' },
  TPE: { lat: 25.0797, lon: 121.2342, name: 'Taipei Taoyuan' },
  PVG: { lat: 31.1443, lon: 121.8083, name: 'Shanghai Pudong' },
  PEK: { lat: 40.0799, lon: 116.6031, name: 'Beijing Capital' },
  DEL: { lat: 28.5562, lon: 77.1000, name: 'Delhi' },
  BOM: { lat: 19.0896, lon: 72.8656, name: 'Mumbai' },
  SYD: { lat: -33.9399, lon: 151.1753, name: 'Sydney' },
  MEL: { lat: -37.6690, lon: 144.8410, name: 'Melbourne' },
  BNE: { lat: -27.3942, lon: 153.1218, name: 'Brisbane' },
  AKL: { lat: -37.0082, lon: 174.7850, name: 'Auckland' },
  NAN: { lat: -17.7554, lon: 177.4431, name: 'Nadi, Fiji' },
  MNL: { lat: 14.5086, lon: 121.0194, name: 'Manila' },
  KUL: { lat: 2.7456, lon: 101.7099, name: 'Kuala Lumpur' },
  CGK: { lat: -6.1256, lon: 106.6559, name: 'Jakarta' },
  DXB: { lat: 25.2532, lon: 55.3657, name: 'Dubai' },
  AUH: { lat: 24.4330, lon: 54.6511, name: 'Abu Dhabi' },
  DOH: { lat: 25.2609, lon: 51.6138, name: 'Doha' },
  TLV: { lat: 32.0055, lon: 34.8854, name: 'Tel Aviv' },
  GRU: { lat: -23.4356, lon: -46.4731, name: 'Sao Paulo' },
  EZE: { lat: -34.8222, lon: -58.5358, name: 'Buenos Aires' },
  SCL: { lat: -33.3930, lon: -70.7858, name: 'Santiago' },
  BOG: { lat: 4.7016, lon: -74.1469, name: 'Bogota' },
  LIM: { lat: -12.0219, lon: -77.1143, name: 'Lima' },
  JNB: { lat: -26.1367, lon: 28.2411, name: 'Johannesburg' },
  CPT: { lat: -33.9715, lon: 18.6021, name: 'Cape Town' },
  CAI: { lat: 30.1219, lon: 31.4056, name: 'Cairo' },
  CMN: { lat: 33.3675, lon: -7.5898, name: 'Casablanca' }
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get cabin display name
 */
export function getCabinDisplayName(cabin) {
  const cabinNames = {
    first: 'First Class',
    business: 'Business Class',
    premium_economy: 'Premium Economy',
    economy: 'Economy',
    saver: 'Saver'
  };
  return cabinNames[cabin] || cabin;
}

/**
 * Get all unique cabin types for an airline
 */
export function getCabinsForAirline(programId, airlineCode) {
  const airline = earningPrograms[programId]?.airlines[airlineCode];
  if (!airline) return [];

  const cabins = new Set();
  Object.values(airline.fareClasses).forEach(fc => cabins.add(fc.cabin));

  // Return in logical order
  const order = ['first', 'business', 'premium_economy', 'economy', 'saver'];
  return order.filter(c => cabins.has(c));
}

/**
 * Get fare classes grouped by cabin
 */
export function getFareClassesByCabin(programId, airlineCode) {
  const airline = earningPrograms[programId]?.airlines[airlineCode];
  if (!airline) return {};

  const grouped = {};
  Object.entries(airline.fareClasses).forEach(([code, fc]) => {
    if (!grouped[fc.cabin]) grouped[fc.cabin] = [];
    grouped[fc.cabin].push({ code, ...fc });
  });

  return grouped;
}
