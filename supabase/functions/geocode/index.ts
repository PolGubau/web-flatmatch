// @ts-ignore Deno types
import { serve } from "https://deno.land/std/http/server.ts";

// @ts-ignore Deno types
const allowedOrigins = Deno.env.get("ALLOWED_ORIGINS")?.split(",") ?? [];

function getCorsHeaders(origin: string | null): HeadersInit {
	const allowedOrigin = allowedOrigins.includes(origin ?? "")
		? origin
		: (allowedOrigins[0] ?? "*");
	return {
		"Access-Control-Allow-Headers":
			"authorization, apikey, x-client-info, content-type",
		"Access-Control-Allow-Methods": "GET,OPTIONS",
		"Access-Control-Allow-Origin": allowedOrigin ?? "",
		Vary: "Origin",
	};
}
// @ts-ignore Deno types

serve(async (req) => {
	const corsHeaders: HeadersInit = getCorsHeaders(req.headers.get("origin"));

	if (req.method === "OPTIONS") {
		return new Response(null, { headers: corsHeaders });
	}

	const url = new URL(req.url);
	const q = url.searchParams.get("q");

	if (!q || q.length < 3) {
		return new Response(JSON.stringify([]), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
		});
	}

	const res = await fetch(
		`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(q)}`,
		{ headers: { "User-Agent": "Flatmatch/1.0 (flatmatchapp@gmail.com)" } },
	);

	if (!res.ok) {
		return new Response(JSON.stringify({ error: "Nominatim error" }), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: res.status,
		});
	}

	const data = await res.json();
	const mapped = data.map((item: any) => ({
		city: item.address.city || item.address.county || "",
		country: item.address.country || "",
		lat: Number(item.lat),
		lon: Number(item.lon),
		name: item.display_name,
		postcode: item.address.postcode || "",
	}));

	console.info(`Geocode "${q}" -> ${mapped.length} results`);

	return new Response(JSON.stringify(mapped), {
		headers: {
			...corsHeaders,
			"Content-Type": "application/json",
			"X-Count": String(mapped.length),
			"X-Request": JSON.stringify({ q }),
		},
	});
});
