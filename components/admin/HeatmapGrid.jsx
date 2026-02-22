'use client';
import { useState } from 'react';
import { generateHeatmap } from '@/lib/mockData';
import { useInterval } from '@/lib/hooks';

const STATUS_COLOR = {
    safe: { text: 'var(--safe)', bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)' },
    moderate: { text: 'var(--mod)', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)' },
    warning: { text: 'var(--warn)', bg: 'rgba(245,158,11,0.18)', border: 'rgba(245,158,11,0.35)' },
    critical: { text: 'var(--danger)', bg: 'rgba(239,68,68,0.2)', border: 'rgba(239,68,68,0.4)' },
};

export default function HeatmapGrid() {
    const [cells, setCells] = useState(() => generateHeatmap());
    const [hovered, setHovered] = useState(null);

    useInterval(() => {
        setCells(prev => prev.map(c => {
            const d = Math.max(0, Math.min(100, c.density + (Math.random() - 0.46) * 12));
            const density = Math.round(d);
            const status = density >= 90 ? 'critical' : density >= 70 ? 'warning' : density >= 45 ? 'moderate' : 'safe';
            return { ...c, density, status };
        }));
    }, 3000);

    return (
        <div className="card" style={{ padding: 20, maxWidth: 650, margin: '0 auto', width: '100%' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>Crowd Density Heatmap</h3>
                    <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>Live · updates every 3s · hover for density</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    {[['var(--safe)', 'Safe'], ['var(--mod)', 'Moderate'], ['var(--warn)', 'Warning'], ['var(--danger)', 'Critical']].map(([c, l]) => (
                        <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--t3)' }}>
                            <div style={{ width: 8, height: 8, borderRadius: 2, background: c, opacity: 0.8 }} />
                            {l}
                        </div>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(8, 1fr)', gap: 3, aspectRatio: '10/8' }}>
                {cells.map(cell => {
                    const cfg = STATUS_COLOR[cell.status];
                    const isH = hovered?.id === cell.id;
                    return (
                        <div
                            key={cell.id}
                            onMouseEnter={() => setHovered(cell)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                background: cfg.bg, border: `1px solid ${cfg.border}`,
                                borderRadius: 4, cursor: 'default', position: 'relative',
                                transition: 'all 0.4s ease',
                                transform: isH ? 'scale(1.1)' : 'scale(1)',
                                zIndex: isH ? 5 : 1,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            {isH && (
                                <div style={{
                                    position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                                    background: 'var(--surface-2)', border: '1px solid var(--border-hover)',
                                    borderRadius: 7, padding: '5px 9px', whiteSpace: 'nowrap', zIndex: 20, pointerEvents: 'none',
                                }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: cfg.text }}>{cell.density}%</div>
                                    <div style={{ fontSize: 10, color: 'var(--t3)', textTransform: 'capitalize' }}>{cell.status}</div>
                                </div>
                            )}
                            <span style={{ fontSize: 8, fontWeight: 600, color: cfg.text, opacity: 0.85 }}>{cell.density}</span>
                        </div>
                    );
                })}
            </div>

            {/* Gradient legend */}
            <div style={{ marginTop: 10, height: 4, borderRadius: 99, background: 'linear-gradient(to right, var(--safe), var(--mod), var(--warn), var(--danger))', opacity: 0.6 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                {['0%', '45%', '70%', '90%', '100%'].map(v => <span key={v} style={{ fontSize: 9, color: 'var(--t3)' }}>{v}</span>)}
            </div>
        </div>
    );
}
