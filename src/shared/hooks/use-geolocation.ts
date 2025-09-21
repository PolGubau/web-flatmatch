import { useEffect, useState } from "react";

export interface Coordinates {
	lat: number;
	lon: number;
}

/**
 * Hook que devuelve las coordenadas actuales del usuario.
 * Por defecto hace una sola lectura. Si `watch` es true,
 * se queda escuchando cambios de posición hasta desmontar.
 *
 * @param watch Si true, usa watchPosition en lugar de getCurrentPosition
 * @returns coordenadas, error y estado de carga
 */
export function useGeolocation(watch: boolean = false) {
	const [coords, setCoords] = useState<Coordinates | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!navigator.geolocation) {
			setError("GeoLocation is not supported by your browser");
			setLoading(false);
			return;
		}

		const onSuccess = (pos: GeolocationPosition) => {
			setCoords({
				lat: pos.coords.latitude,
				lon: pos.coords.longitude,
			});
			setLoading(false);
		};

		const onError = (err: GeolocationPositionError) => {
			setError(err.message);
			setLoading(false);
		};

		if (watch) {
			const watcherId = navigator.geolocation.watchPosition(onSuccess, onError);
			return () => navigator.geolocation.clearWatch(watcherId);
		} else {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}
	}, [watch]);

	return { coords, error, loading };
}
