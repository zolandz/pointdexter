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
