import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type TimeAgoProps = {
	timestamp: Date;
	realTime?: boolean;
};

/**
 * Componente que muestra un "time ago" relativo y se actualiza automáticamente.
 */
export const TimeAgo = ({ timestamp, realTime = true }: TimeAgoProps) => {
	const { i18n } = useTranslation();
	const [now, setNow] = useState(() => new Date());

	let refreshInterval = 1000;

	const diff = (timestamp.getTime() - now.getTime()) / 1000; // segundos
	const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: "auto" });

	let value: number;
	let unit: Intl.RelativeTimeFormatUnit;

	if (Math.abs(diff) < 60) {
		value = Math.round(diff);
		unit = "second";
	} else if (Math.abs(diff) < 3600) {
		value = Math.round(diff / 60);
		unit = "minute";
		refreshInterval = 60000; // 1 minute
	} else if (Math.abs(diff) < 86400) {
		value = Math.round(diff / 3600);
		unit = "hour";
		refreshInterval = 3600000; // 1 hour
	} else {
		value = Math.round(diff / 86400);
		unit = "day";
		refreshInterval = 86400000; // 1 day
	}

	useEffect(() => {
		if (!realTime) return;
		const interval = setInterval(() => setNow(new Date()), refreshInterval);
		return () => clearInterval(interval);
	}, [refreshInterval, realTime]);

	return <span>{rtf.format(value, unit)}</span>;
};
