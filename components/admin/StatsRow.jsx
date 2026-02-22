'use client';
import { Users, AlertTriangle, ShieldAlert, UserCheck, Activity } from 'lucide-react';

const STATS = [
    { key: 'totalCrowd', label: 'Total Crowd', icon: Users, color: 'var(--blue)', fmt: v => v.toLocaleString('en-IN'), sub: (s) => `${Math.round((s.totalCrowd / s.totalCapacity) * 100)}% of venue capacity` },
    { key: 'criticalZones', label: 'Critical Zones', icon: ShieldAlert, color: 'var(--danger)', fmt: v => v, sub: () => 'Require immediate action' },
    { key: 'warningZones', label: 'Warning Zones', icon: AlertTriangle, color: 'var(--warn)', fmt: v => v, sub: () => 'Approaching threshold' },
    { key: 'activeAlerts', label: 'Active Alerts', icon: AlertTriangle, color: 'var(--mod)', fmt: v => v, sub: () => 'Unresolved incidents' },
    { key: 'officersDeployed', label: 'Officers Deployed', icon: UserCheck, color: 'var(--safe)', fmt: v => v, sub: () => 'Across all zones' },
    { key: 'incidentsPrevented', label: 'Prevented Today', icon: Activity, color: 'var(--purple)', fmt: v => v, sub: () => 'AI early warnings' },
];

export default function StatsRow({ stats }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: 12 }}>
            {STATS.map(({ key, label, icon: Icon, color, fmt, sub }) => (
                <div key={key} className="card" style={{ padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span className="label">{label}</span>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={14} color={color} strokeWidth={2} />
                        </div>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: '-0.03em', lineHeight: 1 }}>
                        {fmt(stats[key] ?? 0)}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 6 }}>{sub(stats)}</div>
                </div>
            ))}
        </div>
    );
}
