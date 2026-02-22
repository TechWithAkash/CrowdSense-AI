'use client';
import { useState } from 'react';
import LargeMapSection from '@/components/public/LargeMapSection';
import { ZONES } from '@/lib/mockData';
import { useInterval } from '@/lib/hooks';

export default function AdminMapSection() {
    const [zones, setZones] = useState(ZONES);

    // Live zone simulation matching the other admin components
    useInterval(() => {
        setZones(prev => prev.map(z => {
            const crowd = Math.max(0, Math.min(z.capacity, z.crowd + Math.floor((Math.random() - 0.45) * 60)));
            return { ...z, crowd };
        }));
    }, 5000);

    return (
        <div style={{ flex: 1, minHeight: 700, display: 'flex', flexDirection: 'column' }}>
            <LargeMapSection zones={zones} />
        </div>
    );
}
