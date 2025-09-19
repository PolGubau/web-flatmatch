import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
	// Responder preflight OPTIONS
	if (req.method === "OPTIONS") {
		return new Response(null, {
			headers: {
				"Access-Control-Allow-Headers": "*",
				"Access-Control-Allow-Methods": "GET,OPTIONS",
				"Access-Control-Allow-Origin": "*",
				Vary: "Origin",
			},
		});
	}

	const url = new URL(req.url);
	const q = url.searchParams.get("q");

	// Validación mínima
	if (!q || q.length < 3) {
		return new Response(JSON.stringify([]), {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
				Vary: "Origin",
			},
		});
	}

	// Llamada a Nominatim
	const res = await fetch(
		`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(q)}`,
		{ headers: { "User-Agent": "Flatmatch/1.0 (flatmatchapp@gmail.com)" } },
	);

	if (!res.ok) {
		return new Response(JSON.stringify({ error: "Nominatim error" }), {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
				Vary: "Origin",
			},
			status: res.status,
		});
	}

	// Mapear resultados
	const data = await res.json();
	const mapped = data.map((item: any) => ({
		city: item.address.city || item.address.county || "",
		country: item.address.country || "",
		lat: Number(item.lat),
		lon: Number(item.lon),
		name: item.display_name,
		postcode: item.address.postcode || "",
	}));

	// Respuesta final con CORS
	return new Response(JSON.stringify(mapped), {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
			Vary: "Origin",
		},
	});
});
