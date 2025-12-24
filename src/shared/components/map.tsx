"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect } from "react";

type MapProps = {
	lat: number;
	lon: number;
	interactive?: boolean;
	zoom?: number;
};

// Custom Airbnb-style marker icon
const CustomIcon = L.divIcon({
	className: "custom-marker",
	html: `
		<div style="
			width: 40px;
			height: 40px;
			background-color: #000;
			border: 2px solid #fff;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 2px 8px rgba(0,0,0,0.3);
		">
			<svg 
				xmlns="http://www.w3.org/2000/svg" 
				width="20" 
				height="20" 
				viewBox="0 0 24 24" 
				fill="none" 
				stroke="#fff" 
				stroke-width="2" 
				stroke-linecap="round" 
				stroke-linejoin="round"
			>
				<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
				<polyline points="9 22 9 12 15 12 15 22"></polyline>
			</svg>
		</div>
	`,
	iconAnchor: [20, 40],
	iconSize: [40, 40],
	popupAnchor: [0, -40],
});

L.Marker.prototype.options.icon = CustomIcon;

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
	return (
		<div className="w-full z-10 h-full min-h-64 rounded-lg overflow-hidden">
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
				{/* Carto Voyager - Modern, clean style similar to Google Maps */}
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
					url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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
