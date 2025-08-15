export const dateToYearsAgo = (date: Date): number => {
	const now = new Date();
	const yearsAgo = now.getFullYear() - date.getFullYear();
	return yearsAgo;
};
