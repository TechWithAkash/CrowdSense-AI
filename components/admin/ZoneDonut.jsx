'use client';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ZONES, getZoneStatus } from '@/lib/mockData';

const CFG = {
    safe: { color: '#22c55e', label: 'Safe' },
    moderate: { color: '#f97316', label: 'Moderate' },
    warning: { color: '#f59e0b', label: 'Warning' },
    critical: { color: '#ef4444', label: 'Critical' },
};

export default function ZoneDonut() {
    const counts = { safe: 0, moderate: 0, warning: 0, critical: 0 };
    ZONES.forEach(z => counts[getZoneStatus(z.crowd, z.capacity)]++);
    const data = Object.entries(counts).filter(([, v]) => v > 0).map(([k, v]) => ({ name: CFG[k].label, value: v, color: CFG[k].color }));

    return (
        <div className="card" style={{ padding: 20 }}>
            <div style={{ marginBottom: 10 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>Zone Distribution</h3>
                <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>{ZONES.length} zones total</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={80} paddingAngle={3} dataKey="value"
                        label={({ percent }) => percent > 0.08 ? `${(percent * 100).toFixed(0)}%` : ''}
                        labelLine={false}
                        style={{ fontSize: 11, fontWeight: 700, fill: '#fff' }}
                    >
                        {data.map((e, i) => <Cell key={i} fill={e.color} fillOpacity={0.85} />)}
                    </Pie>
                    <Tooltip
                        contentStyle={{ background: 'var(--surface-2)', border: '1px solid var(--border-hover)', borderRadius: 9 }}
                        labelStyle={{ color: 'var(--t3)' }} itemStyle={{ color: 'var(--t1)', fontSize: 12 }}
                    />
                    <Legend iconType="circle" iconSize={8} formatter={(v, e) => <span style={{ color: 'var(--t3)', fontSize: 11 }}>{v} ({e.payload.value})</span>} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
