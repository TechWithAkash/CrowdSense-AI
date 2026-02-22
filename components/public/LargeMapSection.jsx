'use client';
import { ShieldAlert, Users, TrendingUp } from 'lucide-react';
import IndiaMap from './IndiaMap';
import { getZoneStatus } from '@/lib/mockData';

export default function LargeMapSection({ zones }) {
    const critCount = zones.filter(z => getZoneStatus(z.crowd, z.capacity) === 'critical').length;
    const warnCount = zones.filter(z => getZoneStatus(z.crowd, z.capacity) === 'warning').length;
    const totalCrowd = zones.reduce((sum, z) => sum + z.crowd, 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
            {/* Top Stats Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <div style={{ background: '#fff', padding: '16px 20px', borderRadius: 14, border: '1px solid #e9ecf0', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={20} color="#3b82f6" />
                    </div>
                    <div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Pan-India Crowd</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{totalCrowd.toLocaleString()}</div>
                    </div>
                </div>

                <div style={{ background: '#fff', padding: '16px 20px', borderRadius: 14, border: '1px solid #e9ecf0', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUp size={20} color="#d97706" />
                    </div>
                    <div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Zones on Watch</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: '#b45309' }}>{warnCount}</div>
                    </div>
                </div>

                <div style={{ background: '#fff', padding: '16px 20px', borderRadius: 14, border: '1px solid #e9ecf0', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldAlert size={20} color="#ef4444" />
                    </div>
                    <div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Critical Zones</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: '#dc2626' }}>{critCount}</div>
                    </div>
                </div>
            </div>

            {/* Large Interactive Map Wrapper */}
            <div style={{ flex: 1, minHeight: 600, display: 'flex', flexDirection: 'column' }}>
                <IndiaMap zones={zones} />
            </div>
        </div>
    );
}
