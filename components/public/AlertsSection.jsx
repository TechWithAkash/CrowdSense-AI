'use client';
import { useState } from 'react';
import { ShieldAlert, AlertTriangle, Info, CheckCircle, Clock, Filter } from 'lucide-react';
import { INITIAL_ALERTS, RANDOM_ALERTS } from '@/lib/mockData';
import { useInterval } from '@/lib/hooks';

const SEV_CFG = {
    critical: { color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', icon: ShieldAlert, label: 'Critical', userMsg: 'Immediate danger detected. If you are in this area, leave calmly using the nearest emergency exit.', badge: '#fef2f2' },
    warning: { color: '#b45309', bg: '#fff7ed', border: '#fdba74', icon: AlertTriangle, label: 'Warning', userMsg: 'This zone is becoming dangerous. Please avoid the area and find an alternative route.', badge: '#fff7ed' },
    moderate: { color: '#d97706', bg: '#fffbeb', border: '#fde68a', icon: Info, label: 'Moderate', userMsg: 'High crowd density noted. Be cautious and keep space around you.', badge: '#fffbeb' },
    safe: { color: '#16a34a', bg: '#f0fdf4', border: '#86efac', icon: CheckCircle, label: 'Safe', userMsg: 'This zone has returned to safe levels. Normal entry allowed.', badge: '#f0fdf4' },
};

let nextId = 300;

export default function AlertsSection() {
    const [alerts, setAlerts] = useState(INITIAL_ALERTS.map(a => ({ ...a, expanded: false })));
    const [filter, setFilter] = useState('all');

    useInterval(() => {
        const r = RANDOM_ALERTS[Math.floor(Math.random() * RANDOM_ALERTS.length)];
        const now = new Date();
        const t = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setAlerts(prev => [{ id: ++nextId, zone: r.zone, severity: r.severity, message: r.message, time: t, action: r.action, resolved: false, expanded: false, isNew: true }, ...prev.slice(0, 19)]);
    }, 10000);

    const toggle = id => setAlerts(prev => prev.map(a => a.id === id ? { ...a, expanded: !a.expanded } : a));

    const displayed = filter === 'all' ? alerts : filter === 'active' ? alerts.filter(a => !a.resolved) : alerts.filter(a => a.severity === filter);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>Safety Alerts</h2>
                <p style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>Real-time notices from the CrowdSense AI system</p>
            </div>

            {/* Active count */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[['all', 'All'], ['active', 'Active only'], ['critical', 'Critical'], ['warning', 'Warning'], ['moderate', 'Moderate']].map(([k, l]) => (
                    <button key={k} onClick={() => setFilter(k)}
                        style={{ padding: '5px 13px', borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: filter === k ? '1.5px solid #3b82f6' : '1.5px solid #e2e8f0', background: filter === k ? '#eff6ff' : '#fff', color: filter === k ? '#1d4ed8' : '#64748b', transition: 'all 0.15s' }}
                    >{l}</button>
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a3b8' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', animation: 'blink 1.4s ease-in-out infinite' }} />
                    Live · updates every 10s
                </div>
            </div>

            {/* Alert list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {displayed.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontSize: 14 }}>No alerts match this filter.</div>}
                {displayed.map(a => {
                    const cfg = SEV_CFG[a.severity] || SEV_CFG.safe;
                    const Icon = cfg.icon;
                    return (
                        <div
                            key={a.id}
                            onClick={() => toggle(a.id)}
                            style={{
                                background: a.resolved ? '#f8fafc' : '#fff',
                                border: `1.5px solid ${a.resolved ? '#e9ecf0' : cfg.border}`,
                                borderLeft: `4px solid ${a.resolved ? '#e9ecf0' : cfg.color}`,
                                borderRadius: 12, padding: '14px 16px', cursor: 'pointer',
                                opacity: a.resolved ? 0.55 : 1, transition: 'all 0.2s',
                            }}
                        >
                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <div style={{ width: 32, height: 32, borderRadius: 9, background: cfg.bg, border: `1px solid ${cfg.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Icon size={15} color={cfg.color} strokeWidth={2} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 5 }}>
                                        <span style={{ padding: '2px 9px', borderRadius: 99, fontSize: 10, fontWeight: 700, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>{cfg.label}</span>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{a.zone}</span>
                                        {a.resolved && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac', fontWeight: 600 }}>Resolved</span>}
                                        {a.isNew && !a.resolved && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe', fontWeight: 600 }}>New</span>}
                                        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}><Clock size={10} />{a.time}</span>
                                    </div>

                                    {/* User-friendly message */}
                                    <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.6, margin: 0 }}>{cfg.userMsg}</p>

                                    {/* Expanded: what to do */}
                                    {a.expanded && !a.resolved && (
                                        <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 9, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: cfg.color, marginBottom: 4 }}>What should you do?</div>
                                            <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.6 }}>{a.action}</div>
                                        </div>
                                    )}

                                    <div style={{ marginTop: 8, fontSize: 11, color: '#94a3b8' }}>
                                        {a.expanded ? '▲ Tap to collapse' : '▼ Tap for guidance'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
