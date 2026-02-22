'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RESPONSE_TIMES } from '@/lib/mockData';

const Tip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-hover)', borderRadius: 9, padding: '10px 14px', fontSize: 12 }}>
            <p style={{ color: 'var(--t3)', marginBottom: 6, fontSize: 11 }}>{label}</p>
            {payload.map(p => <p key={p.dataKey} style={{ color: p.fill, fontWeight: 600, margin: '2px 0' }}>{p.name}: {p.value} min</p>)}
        </div>
    );
};

export default function ResponseChart() {
    return (
        <div className="card" style={{ padding: 20 }}>
            <div style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>Response Time Improvement</h3>
                <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>CrowdSense AI vs traditional monitoring (minutes)</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={RESPONSE_TIMES} barCategoryGap="35%" barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="incident" tick={{ fill: 'var(--t3)', fontSize: 9 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: 'var(--t3)', fontSize: 10 }} tickLine={false} axisLine={false} unit="m" />
                    <Tooltip content={<Tip />} />
                    <Legend iconType="circle" iconSize={8} formatter={v => <span style={{ color: 'var(--t3)', fontSize: 11 }}>{v}</span>} />
                    <Bar dataKey="before" name="Traditional" fill="#ef4444" fillOpacity={0.55} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="after" name="CrowdSense AI" fill="#3b82f6" fillOpacity={0.8} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
