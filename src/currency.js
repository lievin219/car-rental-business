// Currency handling. Prices are stored in USD everywhere; RWF is a display
// conversion. Swap RATE for a live feed (BNR publishes a daily rate) when you
// have a backend — the rest of the app only ever calls formatPrice.

export const USD_TO_RWF = 1450;

export const CURRENCIES = [
  { id: 'USD', label: 'USD', symbol: '$' },
  { id: 'RWF', label: 'RWF', symbol: 'FRw' },
];

export function convert(amountUsd, currency) {
  return currency === 'RWF' ? amountUsd * USD_TO_RWF : amountUsd;
}

export function formatPrice(amountUsd, currency = 'USD', { compact = false } = {}) {
  const value = convert(amountUsd, currency);

  if (currency === 'RWF') {
    if (compact && value >= 1000) {
      return `FRw ${Math.round(value / 1000).toLocaleString('en-US')}k`;
    }
    return `FRw ${Math.round(value).toLocaleString('en-US')}`;
  }

  const rounded = Math.round(value * 100) / 100;
  const hasCents = rounded % 1 !== 0;
  return `$${rounded.toLocaleString('en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}
