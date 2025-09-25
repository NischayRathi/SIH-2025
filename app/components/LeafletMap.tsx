"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Center {
  id: number;
  name: string;
  price: string;
  lat: number;
  lng: number;
}

export default function LeafletMap({ centers }: { centers: Center[] }) {
  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {centers.map((c) => (
        <Marker key={c.id} position={[c.lat, c.lng]} icon={markerIcon}>
          <Popup>
            <b>{c.name}</b> <br />
            {c.price}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
