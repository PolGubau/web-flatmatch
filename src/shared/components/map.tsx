"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
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
function Recenter({ lat, lon, zoom }: { lat: number; lon: number; zoom: number }) {
	const map = useMap();
	useEffect(() => {
		map.setView([lat, lon], zoom, { animate: true });
	}, [lat, lon, zoom, map]);
	return null;
}
/**
 * Mapa centrado en coordenadas con un pin
 */
export function MapWithMarker({ lat, lon, zoom = 15, interactive = true }: MapProps) {
	return (
		<div className="w-full h-64 rounded-lg overflow-hidden">
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
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[lat, lon]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
				<Recenter lat={lat} lon={lon} zoom={zoom} />
			</MapContainer>
		</div>
	);
}
