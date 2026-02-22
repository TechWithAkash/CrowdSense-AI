'use client';
import { useState } from 'react';
import { ZONES, getZoneStatus, getDensityPct } from '@/lib/mockData';
import { useInterval } from '@/lib/hooks';

const S_COLOR = { safe: 'var(--safe)', moderate: 'var(--mod)', warning: 'var(--warn)', critical: 'var(--danger)' };
const S_BADGE = { safe: 'badge-safe', moderate: 'badge-moderate', warning: 'badge-warning', critical: 'badge-critical' };

export default function ZoneTable() {
    const [zones, setZones] = useState(ZONES);

    useInterval(() => {
        setZones(prev => prev.map(z => {
            const crowd = Math.max(0, Math.min(z.capacity, z.crowd + Math.floor((Math.random() - 0.45) * 60)));
            return { ...z, crowd };
        }));
    }, 5000);

    return (
        <div className="card" style={{ padding: 20 }}>
            <div style={{ marginBottom: 14 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>Zone Overview</h3>
                <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>{zones.length} monitored zones · updates every 5s</p>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                        <tr>
                            {['Zone', 'Sector', 'Count / Cap', 'Density', 'Status', 'Updated'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '6px 10px', borderBottom: '1px solid var(--border)' }} className="label">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {zones.map(z => {
                            const pct = getDensityPct(z.crowd, z.capacity);
                            const status = getZoneStatus(z.crowd, z.capacity);
                            const color = S_COLOR[status];
                            return (
                                <tr
                                    key={z.id}
                                    style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s', cursor: 'default' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '10px 10px', fontWeight: 600, color: 'var(--t1)' }}>{z.name}</td>
                                    <td style={{ padding: '10px 10px', color: 'var(--t3)' }}>Sector {z.sector}</td>
                                    <td style={{ padding: '10px 10px', color: 'var(--t2)', fontVariantNumeric: 'tabular-nums', fontSize: 11 }}>
                                        {z.crowd.toLocaleString()} / {z.capacity.toLocaleString()}
                                    </td>
                                    <td style={{ padding: '10px 10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div className="bar-track" style={{ width: 72 }}>
                                                <div className="bar-fill" style={{ width: `${pct}%`, background: color }} />
                                            </div>
                                            <span style={{ fontSize: 11, fontWeight: 700, color, width: 28 }}>{pct}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '10px 10px' }}>
                                        <span className={`badge ${S_BADGE[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                                    </td>
                                    <td style={{ padding: '10px 10px', color: 'var(--t3)', fontSize: 11 }}>Just now</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
