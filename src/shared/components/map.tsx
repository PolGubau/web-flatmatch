"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import { useEffect } from "react";

type MapProps = {
	lat: number;
	lon: number;
	interactive?: boolean;
	zoom?: number;
};
/**
 * Hook que mueve el mapa cuando cambian las coords
 */
function Recenter({
	lat,
	lon,
	zoom,
}: {
	lat: number;
	lon: number;
	zoom: number;
}) {
	const map = useMap();
	useEffect(() => {
		map.setView([lat, lon], zoom, { animate: true });
	}, [lat, lon, zoom, map]);
	return null;
}
/**
 * Mapa centrado en coordenadas con un pin
 */
export function MapWithMarker({
	lat,
	lon,
	zoom = 15,
	interactive = true,
}: MapProps) {
	// const customDivIcon = divIcon({
	// 	className:
	// 		"bg-red-500 text-white rounded-full flex items-center justify-center",
	// 	html: "<div style='width:24px;height:24px;border-radius:50%;background:#09f'></div>",
	// 	iconAnchor: [12, 24],
	// 	iconSize: [24, 24],
	// });

	return (
		<div className="w-full h-full min-h-64 rounded-lg overflow-hidden">
			<MapContainer
				center={[lat, lon]}
				className="w-full h-full min-h-64"
				doubleClickZoom={interactive}
				dragging={interactive}
				fadeAnimation={interactive}
				scrollWheelZoom={interactive}
				zoom={zoom}
				zoomAnimation={interactive}
				zoomControl={interactive}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[lat, lon]}>
					<Popup>
						<span>
							📍 {lat}, {lon}
						</span>
					</Popup>
				</Marker>
				<Recenter lat={lat} lon={lon} zoom={zoom} />
			</MapContainer>
		</div>
	);
}
