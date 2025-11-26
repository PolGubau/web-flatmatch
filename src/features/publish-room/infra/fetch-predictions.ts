import { supabaseFn } from "~/shared/utils/edge-functions";
import type { StreetRef } from "../ui/2-location/street-autocomplete";

export const fetchPredictions = async (value: string): Promise<StreetRef[]> => {
	if (value.length < 3) return [];
	const API_URL = supabaseFn("geocode", `q=${encodeURIComponent(value)}`);
	const res = await fetch(API_URL, {
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) return [];
	return res.json();
};

export const getPlaceDetails = async (
	placeId: string,
): Promise<StreetRef | null> => {
	if (!placeId) return null;
	const API_URL = supabaseFn(
		"geocode",
		`place_id=${encodeURIComponent(placeId)}`,
	);
	const res = await fetch(API_URL, {
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) return null;
	return res.json();
};
