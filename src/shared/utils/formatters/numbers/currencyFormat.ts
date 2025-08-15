export const currencyFormat = (amount: number, currency = "EUR", locale = "es-ES"): string => {
	return new Intl.NumberFormat(locale, {
		currency,
		minimumFractionDigits: 0,
		style: "currency",
	}).format(amount);
};
