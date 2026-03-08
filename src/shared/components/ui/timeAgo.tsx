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
	const safeTimestamp =
		timestamp instanceof Date && !Number.isNaN(timestamp.getTime())
			? timestamp
			: new Date();

	let refreshInterval = 1000;

	const diff = (safeTimestamp.getTime() - now.getTime()) / 1000; // segundos

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

	const formatRelativeTime = () => {
		try {
			const rtf = new Intl.RelativeTimeFormat(i18n.language || "en", {
				numeric: "auto",
			});
			return rtf.format(value, unit);
		} catch {
			try {
				const formatter = new Intl.DateTimeFormat(i18n.language || "en", {
					year: "numeric",
					month: "short",
					day: "numeric",
				});
				return formatter.format(safeTimestamp);
			} catch {
				return safeTimestamp.toISOString().slice(0, 10);
			}
		}
	};

	return <span>{formatRelativeTime()}</span>;
};
