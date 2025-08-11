export const currencyFormat = (amount: number, currency = "EUR", locale = "es-ES"): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};