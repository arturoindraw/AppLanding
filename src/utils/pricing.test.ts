import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency,
  usdToCop,
  copToUsd,
  calculateQuote,
  DEFAULT_COP_EXCHANGE_RATE,
  type PricingOptions,
  type SelectedActivity
} from './pricing.ts';

test('formatCurrency formats USD correctly with two decimals', () => {
  const result = formatCurrency(1250.5, 'USD');
  assert.equal(result, '$1,250.50 USD');
});

test('formatCurrency formats COP correctly without decimals and with thousand separators', () => {
  const result = formatCurrency(1000, 'COP', 4150);
  assert.match(result, /\$ 4\.150\.000 COP/);
});

test('usdToCop converts properly at standard rate', () => {
  assert.equal(usdToCop(100, 4150), 415000);
  assert.equal(usdToCop(1, 4000), 4000);
});

test('copToUsd converts properly with rounding', () => {
  assert.equal(copToUsd(415000, 4150), 100);
});

test('calculateQuote calculates base price for 2 pax across Panama and Colombia', () => {
  const options: PricingOptions = {
    adults: 2,
    children: 0,
    hotelTier: 'standard',
    nightsPanama: 3,
    nightsColombia: 4,
    includeInterCountryFlight: true,
    includeTravelInsurance: true,
    includePrivateTransfers: true,
    agencyCommissionPercent: 10,
    isForeignTourist: true,
  };

  const activities: SelectedActivity[] = [
    { id: 'canal-miraflores', priceUsd: 85, country: 'panama', perPerson: true },
    { id: 'cartagena-rosario', priceUsd: 120, country: 'colombia', perPerson: true },
  ];

  const quoteUsd = calculateQuote(options, activities, 'USD');

  assert.equal(quoteUsd.paxTotal, 2);
  assert.equal(quoteUsd.roomsCount, 1);
  // Nights: 3 * 105 (315) + 4 * 85 (340) = 655
  assert.equal(quoteUsd.accommodationUsd, 655);
  // Activities: (85 + 120) * 2 = 410
  assert.equal(quoteUsd.activitiesUsd, 410);
  // Flights: 195 * 2 = 390
  assert.equal(quoteUsd.interCountryFlightsUsd, 390);
  // Transfers: 90 * 2 = 180
  assert.equal(quoteUsd.transfersUsd, 180);
  // Insurance: 8.5 * 2 * 7 = 119
  assert.equal(quoteUsd.insuranceUsd, 119);
  // Foreign tourist Colombia VAT is 0%, Panama ITBMS is 7%
  assert.equal(quoteUsd.colombiaTaxesUsd, 0);
  assert.ok(quoteUsd.panamaTaxesUsd > 0);
  // Grand total must be positive and formatted
  assert.ok(quoteUsd.grandTotalUsd > 1500);
  assert.match(quoteUsd.grandTotalFormatted, /USD/);
  assert.match(quoteUsd.accommodationFormatted, /USD/);
  assert.match(quoteUsd.activitiesFormatted, /USD/);
  assert.match(quoteUsd.flightsFormatted, /USD/);

  // Now test with COP currency
  const quoteCop = calculateQuote(options, activities, 'COP');
  assert.match(quoteCop.grandTotalFormatted, /COP/);
  assert.match(quoteCop.accommodationFormatted, /COP/);
  assert.match(quoteCop.activitiesFormatted, /COP/);
  assert.match(quoteCop.flightsFormatted, /COP/);
  assert.ok(quoteCop.grandTotalFormatted.length > 5);
});

test('calculateQuote applies domestic Colombia VAT when traveler is not foreign', () => {
  const options: PricingOptions = {
    adults: 1,
    children: 0,
    hotelTier: 'standard',
    nightsPanama: 0,
    nightsColombia: 3,
    includeInterCountryFlight: false,
    includeTravelInsurance: false,
    includePrivateTransfers: false,
    agencyCommissionPercent: 0,
    isForeignTourist: false, // Domestic resident, subject to 19% VAT
  };

  const quote = calculateQuote(options, [], 'USD');
  assert.ok(quote.colombiaTaxesUsd > 0);
});
