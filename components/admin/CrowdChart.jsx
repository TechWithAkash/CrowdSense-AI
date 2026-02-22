'use client';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { CROWD_TREND, CROWD_THRESHOLD } from '@/lib/mockData';
import { useInterval } from '@/lib/hooks';

const Tip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-hover)', borderRadius: 9, padding: '10px 14px', fontSize: 12 }}>
            <p style={{ color: 'var(--t3)', marginBottom: 6, fontSize: 11 }}>{label}</p>
            {payload.map(p => (
                <p key={p.dataKey} style={{ color: p.color, fontWeight: 600, margin: '2px 0' }}>
                    {p.name}: {p.value.toLocaleString('en-IN')}
                </p>
            ))}
        </div>
    );
};

export default function CrowdChart() {
    const [data, setData] = useState(CROWD_TREND);

    useInterval(() => {
        setData(prev => {
            const last = prev[prev.length - 1];
            const total = Math.max(5000, Math.min(22000, last.total + Math.floor((Math.random() - 0.4) * 280)));
            const [h, m] = last.time.split(':').map(Number);
            const nm = m + 5, nh = h + Math.floor(nm / 60);
            const time = `${String(nh).padStart(2, '0')}:${String(nm % 60).padStart(2, '0')}`;
            return [...prev.slice(-14), { time, total, mainStage: Math.round(total * 0.25), foodCourt: Math.round(total * 0.14), southPlaza: Math.round(total * 0.55) }];
        });
    }, 5000);

    return (
        <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>Crowd Flow</h3>
                    <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>Live attendance trend · 5s intervals</p>
                </div>
                <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--t3)' }}>
                    {[['var(--blue)', 'Total'], ['var(--danger)', 'Main Stage'], ['var(--warn)', 'S.Plaza']].map(([c, l]) => (
                        <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <div style={{ width: 16, height: 2, borderRadius: 99, background: c }} />
                            {l}
                        </div>
                    ))}
                </div>
            </div>
            <ResponsiveContainer width="100%" height={190}>
                <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="gTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#3b82f6" stopOpacity={0.18} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" tick={{ fill: 'var(--t3)', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: 'var(--t3)', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip content={<Tip />} />
                    <ReferenceLine y={CROWD_THRESHOLD} stroke="var(--danger)" strokeDasharray="5 3" strokeWidth={1} strokeOpacity={0.6} />
                    <Area type="monotone" dataKey="total" name="Total" stroke="#3b82f6" strokeWidth={2} fill="url(#gTotal)" dot={false} />
                    <Area type="monotone" dataKey="mainStage" name="Main Stage" stroke="var(--danger)" strokeWidth={1.5} fill="none" dot={false} strokeOpacity={0.7} />
                    <Area type="monotone" dataKey="southPlaza" name="S. Plaza" stroke="var(--warn)" strokeWidth={1.5} fill="none" dot={false} strokeDasharray="4 2" strokeOpacity={0.7} />
                </AreaChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 8, fontSize: 10, color: 'var(--t3)', textAlign: 'right' }}>
                Dashed red line = surge threshold ({CROWD_THRESHOLD.toLocaleString()})
            </div>
        </div>
    );
}
