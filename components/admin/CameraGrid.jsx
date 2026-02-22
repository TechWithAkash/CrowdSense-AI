'use client';
import { useState } from 'react';
import { CAMERAS } from '@/lib/mockData';
import { useInterval } from '@/lib/hooks';
import { Wifi } from 'lucide-react';

const S_COLOR = { safe: 'var(--safe)', moderate: 'var(--mod)', warning: 'var(--warn)', critical: 'var(--danger)' };

export default function CameraGrid() {
    const [cams, setCams] = useState(CAMERAS);

    useInterval(() => {
        setCams(prev => prev.map(c => {
            const density = Math.max(0, Math.min(100, Math.round(c.density + (Math.random() - 0.46) * 8)));
            const status = density >= 90 ? 'critical' : density >= 70 ? 'warning' : density >= 45 ? 'moderate' : 'safe';
            return { ...c, density, status };
        }));
    }, 4000);

    return (
        <div className="card" style={{ padding: 20 }} id="cameras">
            <div style={{ marginBottom: 14 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>Camera Feeds</h3>
                <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>{cams.length} active · AI crowd overlay · updates every 4s</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {cams.map(cam => {
                    const color = S_COLOR[cam.status];
                    return (
                        <div key={cam.id} className="card" style={{ overflow: 'hidden', borderColor: `${color}30`, background: 'var(--surface-2)' }}>
                            {/* Viewport */}
                            <div style={{ position: 'relative', height: 120, background: '#080e19', overflow: 'hidden' }}>
                                {/* Subtle grid */}
                                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                                {/* Dot crowd simulation */}
                                {Array.from({ length: Math.min(Math.floor(cam.density / 8), 20) }).map((_, i) => (
                                    <div key={i} style={{
                                        position: 'absolute', width: 4, height: 4, borderRadius: '50%',
                                        background: color, opacity: 0.6,
                                        left: `${8 + ((i * 37) % 84)}%`,
                                        top: `${15 + ((i * 53) % 70)}%`,
                                        transition: 'all 4s ease',
                                    }} />
                                ))}

                                {/* LIVE badge */}
                                <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(239,68,68,0.75)', padding: '2px 7px', borderRadius: 4, fontSize: 9, fontWeight: 700, color: '#fff' }}>
                                    <span className="dot dot-danger" style={{ width: 5, height: 5 }} />LIVE
                                </div>

                                {/* Density overlay */}
                                <div style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 12, fontWeight: 800, color, background: 'rgba(0,0,0,0.75)', padding: '1px 8px', borderRadius: 5 }}>
                                    {cam.density}%
                                </div>

                                {/* Corner markers */}
                                {[{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }].map((pos, i) => (
                                    <div key={i} style={{
                                        position: 'absolute', width: 10, height: 10, ...pos,
                                        borderTop: (pos.bottom === undefined) ? `1.5px solid ${color}` : undefined,
                                        borderBottom: (pos.bottom !== undefined) ? `1.5px solid ${color}` : undefined,
                                        borderLeft: (pos.right === undefined) ? `1.5px solid ${color}` : undefined,
                                        borderRight: (pos.right !== undefined) ? `1.5px solid ${color}` : undefined,
                                        opacity: 0.7,
                                    }} />
                                ))}
                            </div>

                            {/* Info */}
                            <div style={{ padding: '10px 12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>{cam.zone}</div>
                                        <div style={{ fontSize: 10, color: 'var(--t3)' }}>{cam.id} · Sector {cam.sector}</div>
                                    </div>
                                    <Wifi size={12} color="var(--safe)" />
                                </div>
                                <div className="bar-track">
                                    <div className="bar-fill" style={{ width: `${cam.density}%`, background: color }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
