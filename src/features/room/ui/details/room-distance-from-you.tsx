import { t } from "i18next";
import { useGeolocation } from "~/shared/hooks/use-geolocation";
import { getDistanceKm } from "~/shared/utils/get-distance-km/get-distance-km";

type Props = {
	lat: number;
	lng: number;
};
export const RoomDistanceFromYou = ({ lat, lng }: Props) => {
	const { coords, loading, error } = useGeolocation();

	if (loading) {
		return <div>{t("loading_distance")}</div>;
	}

	if (error) {
		console.error("Error getting geolocation:", error);
		return <div />;
	}

	const latitude = coords?.lat || 41.3879;
	const longitude = coords?.lon || 2.16992;

	const kms = getDistanceKm(latitude, longitude, lat, lng).toFixed(1);

	return <div>{t("x_kms_from_you", { count: Number(kms) })}</div>;
};
