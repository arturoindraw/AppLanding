/**
 * Pure calculation logic for TerraIstmo DMC
 * Supports USD and COP currencies, multi-traveler logic, hotel tiers,
 * tax computations (Panama ITBMS 7%, Colombia international tourist 0% VAT exemption),
 * and B2B travel agency commission markups.
 */

export type Currency = 'USD' | 'COP';
export type HotelTier = 'standard' | 'superior' | 'luxury';

export const DEFAULT_COP_EXCHANGE_RATE = 4150; // 1 USD = 4,150 COP

export interface PricingOptions {
  adults: number;
  children: number;
  hotelTier: HotelTier;
  nightsPanama: number;
  nightsColombia: number;
  includeInterCountryFlight: boolean;
  includeTravelInsurance: boolean;
  includePrivateTransfers: boolean;
  agencyCommissionPercent: number; // e.g. 10 for 10%
  isForeignTourist: boolean; // Colombia VAT exemption
  customExchangeRate?: number;
}

export interface SelectedActivity {
  id: string;
  priceUsd: number;
  country: 'panama' | 'colombia' | 'both';
  perPerson: boolean;
}

export interface QuoteBreakdown {
  paxTotal: number;
  roomsCount: number;
  accommodationUsd: number;
  activitiesUsd: number;
  interCountryFlightsUsd: number;
  transfersUsd: number;
  insuranceUsd: number;
  dmcOperationsFeeUsd: number;
  subtotalNetUsd: number;
  panamaTaxesUsd: number;
  colombiaTaxesUsd: number;
  totalTaxesUsd: number;
  agencyCommissionUsd: number;
  grandTotalUsd: number;
  perPersonTotalUsd: number;
  // Converted presentation values
  exchangeRate: number;
  currency: Currency;
  grandTotalFormatted: string;
  perPersonFormatted: string;
  subtotalFormatted: string;
  agencyCommissionFormatted: string;
  taxesFormatted: string;
  accommodationFormatted: string;
  activitiesFormatted: string;
  flightsFormatted: string;
  transfersFormatted: string;
  insuranceFormatted: string;
  dmcOperationsFeeFormatted: string;
  panamaTaxesFormatted: string;
  colombiaTaxesFormatted: string;
}

export const HOTEL_RATES_PER_ROOM_USD: Record<HotelTier, { panama: number; colombia: number }> = {
  standard: { panama: 105, colombia: 85 }, // Boutique 3-4* (Casco Antiguo, Poblado)
  superior: { panama: 195, colombia: 165 }, // 4* Superior (Bristol Panama, Hotel Charleston Santa Teresa CTG)
  luxury: { panama: 380, colombia: 340 },   // 5* Luxury (Waldorf Astoria PTY, Sofitel Legend Santa Clara CTG)
};

export const FLIGHT_PTY_COLOMBIA_USD = 195; // Copa Airlines / Avianca inter-hub route
export const INSURANCE_PER_PERSON_PER_DAY_USD = 8.5;
export const PRIVATE_TRANSFER_FIXED_USD = 90; // Airport-Hotel private VIP van

/**
 * Format currency with proper punctuation and locale standards.
 * Expects amount in USD as base, converts dynamically if currency is COP.
 */
export function formatCurrency(amountUsd: number, currency: Currency, customRate: number = DEFAULT_COP_EXCHANGE_RATE): string {
  if (currency === 'COP') {
    const copValue = Math.round(amountUsd * customRate);
    // Colombian standard: $ 1.250.000 COP
    return `$ ${new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(copValue)} COP`;
  }
  // USD standard: $1,250.00 USD
  return `$${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountUsd)} USD`;
}

/**
 * Convert USD to COP
 */
export function usdToCop(amountUsd: number, rate: number = DEFAULT_COP_EXCHANGE_RATE): number {
  return Math.round(amountUsd * rate);
}

/**
 * Convert COP to USD
 */
export function copToUsd(amountCop: number, rate: number = DEFAULT_COP_EXCHANGE_RATE): number {
  return Number((amountCop / rate).toFixed(2));
}

/**
 * Calculate full quotation breakdown
 */
export function calculateQuote(
  options: PricingOptions,
  activities: SelectedActivity[] = [],
  currency: Currency = 'USD'
): QuoteBreakdown {
  const adults = Math.max(1, options.adults);
  const children = Math.max(0, options.children);
  const paxTotal = adults + children;
  const rate = options.customExchangeRate && options.customExchangeRate > 0
    ? options.customExchangeRate
    : DEFAULT_COP_EXCHANGE_RATE;

  // Rooms count: 2 persons per room standard
  const roomsCount = Math.ceil(paxTotal / 2);

  // Accommodation
  const hotelRates = HOTEL_RATES_PER_ROOM_USD[options.hotelTier] || HOTEL_RATES_PER_ROOM_USD.standard;
  const accommodationUsd =
    (options.nightsPanama * hotelRates.panama + options.nightsColombia * hotelRates.colombia) * roomsCount;

  // Activities
  const activitiesUsd = activities.reduce((sum, act) => {
    return sum + (act.perPerson ? act.priceUsd * paxTotal : act.priceUsd);
  }, 0);

  // Inter-country flights
  const interCountryFlightsUsd = options.includeInterCountryFlight
    ? FLIGHT_PTY_COLOMBIA_USD * paxTotal
    : 0;

  // Private transfers
  const totalDestinations = (options.nightsPanama > 0 ? 1 : 0) + (options.nightsColombia > 0 ? 1 : 0);
  const transfersUsd = options.includePrivateTransfers
    ? PRIVATE_TRANSFER_FIXED_USD * Math.max(1, totalDestinations)
    : 0;

  // Travel insurance
  const totalDays = Math.max(1, options.nightsPanama + options.nightsColombia);
  const insuranceUsd = options.includeTravelInsurance
    ? INSURANCE_PER_PERSON_PER_DAY_USD * paxTotal * totalDays
    : 0;

  // Operational DMC logistics & concierge fee (4.5% of gross land components)
  const dmcOperationsFeeUsd = Math.round((accommodationUsd + activitiesUsd + transfersUsd) * 0.045);

  const subtotalNetUsd =
    accommodationUsd +
    activitiesUsd +
    interCountryFlightsUsd +
    transfersUsd +
    insuranceUsd +
    dmcOperationsFeeUsd;

  // Taxes
  // Panama ITBMS is 7% on Panama lodging & local services
  const panamaBase = (options.nightsPanama * hotelRates.panama * roomsCount) +
    activities.filter(a => a.country === 'panama').reduce((acc, a) => acc + (a.perPerson ? a.priceUsd * paxTotal : a.priceUsd), 0);
  const panamaTaxesUsd = Number((panamaBase * 0.07).toFixed(2));

  // Colombia VAT is 19% on domestic tourism, but 0% for international foreign tourists with passport/entry stamp (Decreto 297 de 2016)
  const colombiaBase = (options.nightsColombia * hotelRates.colombia * roomsCount) +
    activities.filter(a => a.country === 'colombia').reduce((acc, a) => acc + (a.perPerson ? a.priceUsd * paxTotal : a.priceUsd), 0);
  const colombiaTaxesUsd = options.isForeignTourist ? 0 : Number((colombiaBase * 0.19).toFixed(2));

  const totalTaxesUsd = Number((panamaTaxesUsd + colombiaTaxesUsd).toFixed(2));

  // Agency Commission (B2B Markup)
  const commissionPercent = Math.max(0, Math.min(30, options.agencyCommissionPercent || 0));
  const preCommissionTotal = subtotalNetUsd + totalTaxesUsd;
  const agencyCommissionUsd = Number((preCommissionTotal * (commissionPercent / 100)).toFixed(2));

  const grandTotalUsd = Number((preCommissionTotal + agencyCommissionUsd).toFixed(2));
  const perPersonTotalUsd = Number((grandTotalUsd / paxTotal).toFixed(2));

  // Multi-currency presentation values
  const grandTotalFormatted = formatCurrency(grandTotalUsd, currency, rate);
  const perPersonFormatted = formatCurrency(perPersonTotalUsd, currency, rate);
  const subtotalFormatted = formatCurrency(subtotalNetUsd, currency, rate);
  const agencyCommissionFormatted = formatCurrency(agencyCommissionUsd, currency, rate);
  const taxesFormatted = formatCurrency(totalTaxesUsd, currency, rate);
  const accommodationFormatted = formatCurrency(accommodationUsd, currency, rate);
  const activitiesFormatted = formatCurrency(activitiesUsd, currency, rate);
  const flightsFormatted = formatCurrency(interCountryFlightsUsd, currency, rate);
  const transfersFormatted = formatCurrency(transfersUsd, currency, rate);
  const insuranceFormatted = formatCurrency(insuranceUsd, currency, rate);
  const dmcOperationsFeeFormatted = formatCurrency(dmcOperationsFeeUsd, currency, rate);
  const panamaTaxesFormatted = formatCurrency(panamaTaxesUsd, currency, rate);
  const colombiaTaxesFormatted = formatCurrency(colombiaTaxesUsd, currency, rate);

  return {
    paxTotal,
    roomsCount,
    accommodationUsd,
    activitiesUsd,
    interCountryFlightsUsd,
    transfersUsd,
    insuranceUsd,
    dmcOperationsFeeUsd,
    subtotalNetUsd,
    panamaTaxesUsd,
    colombiaTaxesUsd,
    totalTaxesUsd,
    agencyCommissionUsd,
    grandTotalUsd,
    perPersonTotalUsd,
    exchangeRate: rate,
    currency,
    grandTotalFormatted,
    perPersonFormatted,
    subtotalFormatted,
    agencyCommissionFormatted,
    taxesFormatted,
    accommodationFormatted,
    activitiesFormatted,
    flightsFormatted,
    transfersFormatted,
    insuranceFormatted,
    dmcOperationsFeeFormatted,
    panamaTaxesFormatted,
    colombiaTaxesFormatted,
  };
}
