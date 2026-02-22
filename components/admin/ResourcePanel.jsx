'use client';
import { RESOURCES } from '@/lib/mockData';
import { Shield, Heart, Flame, Users } from 'lucide-react';

const TYPE = {
    'Security Officer': { icon: Shield, color: 'var(--blue)', short: 'Security' },
    'Medical Unit': { icon: Heart, color: 'var(--safe)', short: 'Medical' },
    'Fire Safety': { icon: Flame, color: 'var(--mod)', short: 'Fire' },
    'Crowd Control': { icon: Users, color: 'var(--purple)', short: 'Crowd' },
};

export default function ResourcePanel() {
    const active = RESOURCES.filter(r => r.status === 'active').reduce((s, r) => s + r.count, 0);
    const standby = RESOURCES.filter(r => r.status === 'standby').reduce((s, r) => s + r.count, 0);

    return (
        <div className="card" style={{ padding: 20 }} id="resources">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>Resource Deployment</h3>
                    <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>Personnel status and zone assignments</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <span className="badge badge-safe">Active: {active}</span>
                    <span className="badge badge-warning">Standby: {standby}</span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {RESOURCES.map(r => {
                    const t = TYPE[r.type] || TYPE['Security Officer'];
                    const Icon = t.icon;
                    const isActive = r.status === 'active';
                    return (
                        <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: isActive ? `${t.color}0a` : 'var(--surface-2)', border: `1px solid ${isActive ? `${t.color}22` : 'var(--border)'}` }}>
                            <div style={{ width: 30, height: 30, borderRadius: 8, background: `${t.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon size={14} color={t.color} strokeWidth={2} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>{r.name}</div>
                                <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 1 }}>{r.zone} · {t.short}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 15, fontWeight: 800, color: t.color }}>×{r.count}</div>
                                <div style={{ fontSize: 9, color: isActive ? 'var(--safe)' : 'var(--warn)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.status}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
