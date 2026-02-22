'use client';
import { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Info, Clock, ChevronRight } from 'lucide-react';
import { INITIAL_ALERTS, RANDOM_ALERTS } from '@/lib/mockData';
import { useInterval } from '@/lib/hooks';

const SEV = {
    critical: { color: 'var(--danger)', icon: ShieldAlert, badge: 'badge-critical', left: 'var(--danger)' },
    warning: { color: 'var(--warn)', icon: AlertTriangle, badge: 'badge-warning', left: 'var(--warn)' },
    moderate: { color: 'var(--mod)', icon: Info, badge: 'badge-moderate', left: 'var(--mod)' },
    safe: { color: 'var(--safe)', icon: CheckCircle, badge: 'badge-safe', left: 'var(--safe)' },
};

let nextId = 200;

export default function AlertFeed({ onAlertCountChange }) {
    const [alerts, setAlerts] = useState(INITIAL_ALERTS);

    useInterval(() => {
        const r = RANDOM_ALERTS[Math.floor(Math.random() * RANDOM_ALERTS.length)];
        const now = new Date();
        const t = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const a = { id: ++nextId, zone: r.zone, severity: r.severity, message: r.message, time: t, action: r.action, resolved: false, isNew: true };
        setAlerts(prev => {
            const list = [a, ...prev.slice(0, 19)];
            onAlertCountChange?.(list.filter(x => !x.resolved && x.severity !== 'safe').length);
            return list;
        });
    }, 8000);

    const resolve = id => setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));

    return (
        <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>Alert Feed</h3>
                    <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>AI-generated · new alert every 8s</p>
                </div>
                <div className="badge badge-critical" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span className="dot dot-danger" /> LIVE
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {alerts.map((alert, i) => {
                    const cfg = SEV[alert.severity];
                    const Icon = cfg.icon;
                    return (
                        <div
                            key={alert.id}
                            className="fade-up"
                            style={{
                                borderRadius: 10, padding: '11px 13px',
                                background: 'var(--surface-2)',
                                border: '1px solid var(--border)',
                                borderLeft: `3px solid ${cfg.left}`,
                                opacity: alert.resolved ? 0.4 : 1,
                                transition: 'opacity 0.3s',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                                <Icon size={14} color={cfg.color} style={{ marginTop: 1, flexShrink: 0 }} strokeWidth={2} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4, flexWrap: 'wrap' }}>
                                        <span className={`badge ${cfg.badge}`}>{alert.severity}</span>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>{alert.zone}</span>
                                        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--t3)', display: 'flex', alignItems: 'center', gap: 3 }}>
                                            <Clock size={10} /> {alert.time}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: 11, color: 'var(--t2)', lineHeight: 1.5, margin: 0 }}>{alert.message}</p>
                                    {!alert.resolved ? (
                                        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ fontSize: 11, color: cfg.color, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <ChevronRight size={11} /> {alert.action}
                                            </div>
                                            <button
                                                onClick={() => resolve(alert.id)}
                                                style={{ fontSize: 10, padding: '2px 9px', borderRadius: 6, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: 'var(--safe)', cursor: 'pointer', fontWeight: 600 }}
                                            >Resolve</button>
                                        </div>
                                    ) : (
                                        <div style={{ marginTop: 5, fontSize: 10, color: 'var(--safe)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <CheckCircle size={10} /> Resolved
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
