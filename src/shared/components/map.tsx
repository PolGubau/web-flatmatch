"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Corrige el problema de icono de Leaflet en Vite/Next
const markerIcon = new L.Icon({
	iconAnchor: [12, 41],
	iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
	iconSize: [25, 41],
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type MapProps = {
	lat: number;
	lon: number;
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
export function MapWithMarker({ lat, lon, zoom = 15 }: MapProps) {
	return (
		<div className="w-full h-64 rounded-lg overflow-hidden">
			<MapContainer
				center={[lat, lon]}
				className="w-full h-full min-h-64"
				doubleClickZoom={true}
				fadeAnimation={true}
				scrollWheelZoom={true}
				zoom={zoom}
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
