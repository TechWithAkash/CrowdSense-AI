'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the leaflet map component with ssr disabled
const LeafletMap = dynamic(() => import('./LeafletMap'), {
    ssr: false,
    loading: () => (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: 12 }}>
            <div style={{ color: '#64748b', fontSize: 13, fontWeight: 500 }}>Initializing Interactive Map...</div>
        </div>
    )
});

export default function IndiaMap({ zones }) {
    return <LeafletMap zones={zones} />;
}
