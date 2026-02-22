'use client';
import { useState } from 'react';
import { Users, ShieldAlert, AlertTriangle, CheckCircle, TrendingUp, ArrowUpRight, Clock, Activity, Zap, BarChart2 } from 'lucide-react';
import { ZONES, INITIAL_ALERTS, INITIAL_STATS, CROWD_THRESHOLD, getZoneStatus, getDensityPct } from '@/lib/mockData';
import CrowdChart from './CrowdChart';

const S_CFG = {
    safe: { color: '#22c55e', bg: 'var(--safe-dim)', label: 'Open', icon: CheckCircle },
    moderate: { color: '#f59e0b', bg: 'var(--warn-dim)', label: 'Busy', icon: Activity },
    warning: { color: '#f97316', bg: 'var(--mod-dim)', label: 'Crowded', icon: AlertTriangle },
    critical: { color: '#ef4444', bg: 'var(--danger-dim)', label: 'Avoid', icon: ShieldAlert },
};

const KPIS = (stats) => [
    { key: 'totalCrowd', label: 'Live Crowd', icon: Users, color: 'var(--blue)', fmt: v => v.toLocaleString('en-IN'), note: `of ${(26050).toLocaleString('en-IN')} capacity` },
    { key: 'criticalZones', label: 'Critical Zones', icon: ShieldAlert, color: 'var(--danger)', fmt: v => v, note: 'Need immediate action' },
    { key: 'warningZones', label: 'Warning Zones', icon: AlertTriangle, color: 'var(--mod)', fmt: v => v, note: 'Approaching threshold' },
    { key: 'activeAlerts', label: 'Active Alerts', icon: Activity, color: 'var(--warn)', fmt: v => v, note: 'Unresolved incidents' },
    { key: 'officersDeployed', label: 'Officers Deployed', icon: Users, color: '#8b5cf6', fmt: v => v, note: 'Mumbai Police + CISF' },
    { key: 'incidentsPrevented', label: 'Incidents Averted', icon: CheckCircle, color: 'var(--safe)', fmt: v => v, note: 'AI early warnings' },
];

export default function AdminOverview({ stats, onGoZones, onGoAlerts }) {
    const critCount = ZONES.filter(z => getZoneStatus(z.crowd, z.capacity) === 'critical').length;
    const warnCount = ZONES.filter(z => getZoneStatus(z.crowd, z.capacity) === 'warning').length;
    const overallStatus = critCount >= 2 ? 'critical' : critCount >= 1 ? 'warning' : warnCount >= 2 ? 'moderate' : 'safe';

    const bannerCfg = {
        safe: { label: 'All Clear', sub: 'Event proceeding within safe limits.', color: 'var(--safe)', bg: 'var(--safe-dim)', border: 'rgba(34,197,94,0.25)' },
        moderate: { label: 'Moderate', sub: 'Some zones nearing boundaries. Monitor closely.', color: 'var(--warn)', bg: 'var(--warn-dim)', border: 'rgba(245,158,11,0.25)' },
        warning: { label: 'Alert', sub: 'Multiple zones at warning. Deploy resources now.', color: 'var(--mod)', bg: 'var(--mod-dim)', border: 'rgba(249,115,22,0.25)' },
        critical: { label: 'HIGH RISK', sub: 'Critical crowd conditions at MMRDA Grounds. Follow standing orders.', color: 'var(--danger)', bg: 'var(--danger-dim)', border: 'rgba(239,68,68,0.3)' },
    };
    const bCfg = bannerCfg[overallStatus];

    const recentAlerts = INITIAL_ALERTS.filter(a => !a.resolved).slice(0, 4);
    const kpis = KPIS(stats);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Status banner */}
            <div style={{ padding: '18px 22px', borderRadius: 14, background: bCfg.bg, border: `1.5px solid ${bCfg.border}`, display: 'flex', alignItems: 'center', gap: 20 }}>
                <ShieldAlert size={44} color={bCfg.color} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Overall Event Status</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: bCfg.color, letterSpacing: '-0.02em' }}>{bCfg.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--t2)', marginTop: 4 }}>{bCfg.sub}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end', flexShrink: 0 }}>
                    {critCount > 0 && <span style={{ padding: '4px 11px', borderRadius: 8, background: 'var(--danger-dim)', border: '1px solid rgba(239,68,68,0.3)', fontSize: 12, fontWeight: 700, color: 'var(--danger)' }}>{critCount} Critical</span>}
                    {warnCount > 0 && <span style={{ padding: '4px 11px', borderRadius: 8, background: 'var(--mod-dim)', border: '1px solid rgba(249,115,22,0.3)', fontSize: 12, fontWeight: 700, color: 'var(--mod)' }}>{warnCount} Warning</span>}
                </div>
            </div>

            {/* KPI grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
                {kpis.map(({ key, label, icon: Icon, color, fmt, note }) => (
                    <div key={key} className="card" style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                            <div style={{ width: 26, height: 26, borderRadius: 7, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon size={13} color={color} strokeWidth={2} />
                            </div>
                        </div>
                        <div style={{ fontSize: 26, fontWeight: 800, color, letterSpacing: '-0.03em' }}>{fmt(stats[key] ?? 0)}</div>
                        <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 5 }}>{note}</div>
                    </div>
                ))}
            </div>

            {/* Crowd chart + zone snapshot */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <CrowdChart />

                {/* Zone snapshot */}
                <div className="card" style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>Zone Snapshot</div>
                            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 1 }}>Live density — all 12 zones</div>
                        </div>
                        <button onClick={onGoZones} style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', gap: 3, alignItems: 'center' }}>
                            View all <ArrowUpRight size={12} />
                        </button>
                    </div>
                    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
                        {ZONES.map(z => {
                            const status = getZoneStatus(z.crowd, z.capacity);
                            const pct = getDensityPct(z.crowd, z.capacity);
                            const cfg = S_CFG[status];
                            return (
                                <div key={z.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: 6, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <cfg.icon size={14} color={cfg.color} strokeWidth={2.5} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{z.name}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, flexShrink: 0, marginLeft: 4 }}>{pct}%</span>
                                        </div>
                                        <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 99, overflow: 'hidden' }}>
                                            <div style={{ width: `${pct}%`, height: '100%', background: cfg.color, borderRadius: 99, transition: 'width 0.6s ease' }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recent incidents */}
            <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>Active Incidents</div>
                        <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 1 }}>Recent unresolved alerts</div>
                    </div>
                    <button onClick={onGoAlerts} style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', gap: 3, alignItems: 'center' }}>
                        Manage alerts <ArrowUpRight size={12} />
                    </button>
                </div>
                <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                    {recentAlerts.map(a => {
                        const isCrit = a.severity === 'critical';
                        const c = isCrit ? 'var(--danger)' : 'var(--mod)';
                        const bg = isCrit ? 'var(--danger-dim)' : 'var(--mod-dim)';
                        const Icon = isCrit ? ShieldAlert : AlertTriangle;
                        return (
                            <div key={a.id} style={{ padding: '11px 13px', borderRadius: 10, background: bg, border: `1px solid ${c}22`, borderLeft: `3px solid ${c}` }}>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <Icon size={14} color={c} style={{ marginTop: 1, flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t1)' }}>{a.zone}</div>
                                        <div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 2, lineHeight: 1.5 }}>→ {a.action}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, fontSize: 10, color: 'var(--t3)' }}>
                                            <Clock size={10} /> {a.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
