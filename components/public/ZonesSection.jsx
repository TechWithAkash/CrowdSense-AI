'use client';
import { useState } from 'react';
import { MapPin, Users, ChevronDown, ChevronUp, Navigation, CheckCircle, Activity, AlertTriangle, ShieldAlert, Map } from 'lucide-react';
import { getZoneStatus, getDensityPct } from '@/lib/mockData';

const STATUS_CFG = {
    safe: { label: 'Open', icon: CheckCircle, color: '#16a34a', bg: '#f0fdf4', border: '#86efac', recommendation: 'This zone is safe to enter. Enjoy your time here!' },
    moderate: { label: 'Busy', icon: Activity, color: '#d97706', bg: '#fffbeb', border: '#fde68a', recommendation: 'Slightly busy. You can still enter but stay aware of your surroundings.' },
    warning: { label: 'Crowded', icon: AlertTriangle, color: '#b45309', bg: '#fff7ed', border: '#fdba74', recommendation: 'This zone is getting crowded. Consider visiting a safer zone nearby.' },
    critical: { label: 'Avoid', icon: ShieldAlert, color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', recommendation: 'Do not enter this zone. It is dangerously overcrowded. Please move to a safe zone immediately.' },
};

export default function ZonesSection({ zones }) {
    const [expanded, setExpanded] = useState(null);
    const [filter, setFilter] = useState('all');

    const icons = { all: Map, safe: CheckCircle, moderate: Activity, warning: AlertTriangle, critical: ShieldAlert };

    const displayed = filter === 'all' ? zones : zones.filter(z => getZoneStatus(z.crowd, z.capacity) === filter);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Header */}
            <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>Zone Status</h2>
                <p style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>Tap a zone for recommendations and details</p>
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[['all', 'All Zones'], ['safe', 'Open'], ['moderate', 'Busy'], ['warning', 'Crowded'], ['critical', 'Avoid']].map(([k, l]) => {
                    const Icon = icons[k];
                    return (
                        <button key={k} onClick={() => setFilter(k)}
                            style={{
                                padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                                border: filter === k ? '1.5px solid #3b82f6' : '1.5px solid #e2e8f0',
                                background: filter === k ? '#eff6ff' : '#fff',
                                color: filter === k ? '#1d4ed8' : '#64748b',
                                transition: 'all 0.15s',
                                display: 'flex', alignItems: 'center', gap: 6
                            }}
                        >
                            <Icon size={14} strokeWidth={2.5} /> {l} {k !== 'all' && `(${zones.filter(z => getZoneStatus(z.crowd, z.capacity) === k).length})`}
                        </button>
                    );
                })}
            </div>

            {/* Zone cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                {displayed.map(z => {
                    const status = getZoneStatus(z.crowd, z.capacity);
                    const pct = getDensityPct(z.crowd, z.capacity);
                    const cfg = STATUS_CFG[status];
                    const isOpen = expanded === z.id;

                    return (
                        <div
                            key={z.id}
                            style={{ background: '#fff', border: `1.5px solid ${isOpen ? cfg.color + '44' : '#e9ecf0'}`, borderRadius: 14, overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }}
                            onClick={() => setExpanded(isOpen ? null : z.id)}
                        >
                            {/* Card top strip */}
                            <div style={{ height: 4, background: cfg.color, opacity: 0.7 }} />

                            <div style={{ padding: '14px 16px' }}>
                                {/* Header row */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: 10, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <cfg.icon size={16} color={cfg.color} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{z.name}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#94a3b8', marginTop: 1 }}>
                                                    <MapPin size={9} /> Sector {z.sector}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>{cfg.label}</span>
                                        {isOpen ? <ChevronUp size={14} color="#94a3b8" /> : <ChevronDown size={14} color="#94a3b8" />}
                                    </div>
                                </div>

                                {/* Density bar */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                    <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                                        <div style={{ width: `${pct}%`, height: '100%', background: cfg.color, borderRadius: 99, transition: 'width 0.6s ease', opacity: 0.85 }} />
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 800, color: cfg.color, width: 36, textAlign: 'right' }}>{pct}%</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8' }}>
                                    <span>{z.crowd.toLocaleString('en-IN')} people</span>
                                    <span>Capacity: {z.capacity.toLocaleString('en-IN')}</span>
                                </div>

                                {/* Expanded detail */}
                                {isOpen && (
                                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
                                        <div style={{ padding: '10px 12px', borderRadius: 10, background: cfg.bg, border: `1px solid ${cfg.border}`, marginBottom: 12 }}>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: cfg.color, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                                                <Navigation size={11} /> Recommendation
                                            </div>
                                            <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.6 }}>{cfg.recommendation}</div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                            {[
                                                ['Zone ID', z.id],
                                                ['Capacity', z.capacity.toLocaleString('en-IN')],
                                                ['Current', z.crowd.toLocaleString('en-IN')],
                                                ['Available', (z.capacity - z.crowd).toLocaleString('en-IN')],
                                            ].map(([l, v]) => (
                                                <div key={l} style={{ padding: '7px 10px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                                    <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
                                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#334155', marginTop: 2 }}>{v}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            {displayed.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontSize: 14 }}>No zones match this filter.</div>
            )}
        </div>
    );
}
