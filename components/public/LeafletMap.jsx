'use client';
import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, CircleMarker, Tooltip, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getZoneStatus } from '@/lib/mockData';

// Mapping 12 zones to major Indian cities
const ZONE_COORDS = {
    'Z01': [19.0760, 72.8777], // Mumbai (Lat, Lng)
    'Z02': [28.7041, 77.1025], // Delhi
    'Z03': [12.9716, 77.5946], // Bangalore
    'Z04': [13.0827, 80.2707], // Chennai
    'Z05': [22.5726, 88.3639], // Kolkata
    'Z06': [17.3850, 78.4867], // Hyderabad
    'Z07': [18.5204, 73.8567], // Pune
    'Z08': [23.0225, 72.5714], // Ahmedabad
    'Z09': [26.9124, 75.7873], // Jaipur
    'Z10': [21.1702, 72.8311], // Surat
    'Z11': [26.8467, 80.9462], // Lucknow
    'Z12': [25.5941, 85.1376], // Patna
};

const MARKER_COLORS = {
    safe: '#16a34a', // green-600
    moderate: '#d97706', // amber-600
    warning: '#b45309', // amber-700
    critical: '#dc2626', // red-600
};

export default function LeafletMap({ zones }) {
    // Fix leafet default icon path issues
    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    return (
        <MapContainer
            center={[22.5, 79]} // Center of India
            zoom={4.5}
            scrollWheelZoom={true}
            style={{ width: '100%', height: '100%', background: '#f8fafc', borderRadius: 12, zIndex: 1 }}
            zoomControl={false} // Clean UI
        >
            {/* Minimalist CartoDB Positron Basemap */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={20}
            />

            {zones.map((zone) => {
                const coords = ZONE_COORDS[zone.id];
                if (!coords) return null;

                const status = getZoneStatus(zone.crowd, zone.capacity);
                const color = MARKER_COLORS[status];
                const pct = Math.round((zone.crowd / zone.capacity) * 100);

                const isHighRisk = status === 'critical' || status === 'warning';
                const baseRadius = isHighRisk ? 10 : 7;

                return (
                    <LayerGroup key={zone.id}>
                        {/* Outer Glow for Heat Effect (Critical / Warning) */}
                        {isHighRisk && (
                            <CircleMarker
                                center={coords}
                                radius={baseRadius + 8}
                                pathOptions={{
                                    fillColor: color,
                                    fillOpacity: 0.2,
                                    color: 'transparent',
                                }}
                            />
                        )}

                        {/* Core Marker */}
                        <CircleMarker
                            center={coords}
                            radius={baseRadius}
                            pathOptions={{
                                fillColor: color,
                                fillOpacity: 0.9,
                                color: '#fff',
                                weight: 2,
                            }}
                        >
                            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                                <div style={{ textAlign: 'center', padding: '2px 4px' }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>
                                        {zone.name}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 11 }}>
                                        <span style={{ color: '#64748b' }}>
                                            Density: <strong style={{ color: '#0f172a' }}>{pct}%</strong>
                                        </span>
                                        <span style={{ textTransform: 'capitalize', color: MARKER_COLORS[status], fontWeight: 600 }}>
                                            {status}
                                        </span>
                                    </div>
                                </div>
                            </Tooltip>
                        </CircleMarker>
                    </LayerGroup>
                );
            })}
        </MapContainer>
    );
}
