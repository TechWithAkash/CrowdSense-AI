'use client';
import { Users, ShieldAlert, AlertTriangle, CheckCircle, TrendingUp, Clock, ChevronRight, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { ZONES, INITIAL_ALERTS, getZoneStatus, getDensityPct } from '@/lib/mockData';
import IndiaMap from './IndiaMap';

const STATUS_CFG = {
    safe: { label: 'Open', icon: CheckCircle2, color: '#16a34a', bg: '#f0fdf4', border: '#86efac' },
    moderate: { label: 'Busy', icon: AlertCircle, color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
    warning: { label: 'Crowded', icon: AlertTriangle, color: '#b45309', bg: '#fff7ed', border: '#fdba74' },
    critical: { label: 'Avoid', icon: ShieldAlert, color: '#dc2626', bg: '#fef2f2', border: '#fca5a5' },
};

const OVERALL_META = {
    safe: { label: 'All Clear', sub: 'The event is proceeding safely. Enjoy your experience!', color: '#16a34a', bg: '#f0fdf4', border: '#86efac', icon: CheckCircle2 },
    moderate: { label: 'Moderate', sub: 'Some zones are busy. Check zone status before moving.', color: '#d97706', bg: '#fffbeb', border: '#fde68a', icon: AlertCircle },
    warning: { label: 'Stay Alert', sub: 'Multiple zones approaching capacity. Follow safety guidelines.', color: '#b45309', bg: '#fff7ed', border: '#fdba74', icon: AlertTriangle },
    critical: { label: 'High Risk', sub: 'Critical crowd conditions detected. Follow security instructions.', color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', icon: ShieldAlert },
};

const QuickStat = ({ icon: Icon, label, value, color, bg }) => (
    <div style={{ background: '#fff', border: '1px solid #e9ecf0', borderRadius: 12, padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={14} color={color} strokeWidth={2} />
            </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: '-0.03em' }}>{value}</div>
    </div>
);

export default function OverviewSection({ zones, onGoZones, onGoAlerts }) {
    const critCount = zones.filter(z => getZoneStatus(z.crowd, z.capacity) === 'critical').length;
    const warnCount = zones.filter(z => getZoneStatus(z.crowd, z.capacity) === 'warning').length;
    const safeCount = zones.filter(z => getZoneStatus(z.crowd, z.capacity) === 'safe').length;
    const overallStatus = critCount >= 2 ? 'critical' : critCount >= 1 ? 'warning' : warnCount >= 2 ? 'moderate' : 'safe';
    const ov = OVERALL_META[overallStatus];

    const totalCrowd = zones.reduce((s, z) => s + z.crowd, 0);
    const totalCap = zones.reduce((s, z) => s + z.capacity, 0);

    // Recent public alerts (simplified)
    const publicAlerts = INITIAL_ALERTS.filter(a => !a.resolved).slice(0, 3);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Big status banner */}
            <div style={{ background: ov.bg, border: `1.5px solid ${ov.border}`, borderRadius: 16, padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 16, background: '#fff', border: `2px solid ${ov.border}` }}>
                    <ov.icon size={36} color={ov.color} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>Current Event Status</div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: ov.color, letterSpacing: '-0.02em' }}>{ov.label}</div>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 5 }}>{ov.sub}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {critCount > 0 && <span style={{ padding: '4px 11px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fca5a5', fontSize: 12, fontWeight: 700, color: '#dc2626' }}>{critCount} Critical</span>}
                    {warnCount > 0 && <span style={{ padding: '4px 11px', borderRadius: 8, background: '#fff7ed', border: '1px solid #fdba74', fontSize: 12, fontWeight: 700, color: '#b45309' }}>{warnCount} Warning</span>}
                    {safeCount > 0 && <span style={{ padding: '4px 11px', borderRadius: 8, background: '#f0fdf4', border: '1px solid #86efac', fontSize: 12, fontWeight: 700, color: '#16a34a' }}>{safeCount} Safe</span>}
                </div>
            </div>

            {/* Quick stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
                <QuickStat icon={Users} label="Live Crowd" value={totalCrowd.toLocaleString('en-IN')} color="#3b82f6" bg="#eff6ff" />
                <QuickStat icon={CheckCircle} label="Safe Zones" value={safeCount} color="#16a34a" bg="#f0fdf4" />
                <QuickStat icon={AlertTriangle} label="Warning Zones" value={warnCount} color="#d97706" bg="#fffbeb" />
                <QuickStat icon={ShieldAlert} label="Critical Zones" value={critCount} color="#dc2626" bg="#fef2f2" />
            </div>

            {/* Three columns: India map + zone snapshot + live alerts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 16, alignItems: 'start' }}>

                {/* India Map Visualization */}
                <IndiaMap zones={zones} />

                {/* Zone quick view */}
                <div style={{ background: '#fff', border: '1px solid #e9ecf0', borderRadius: 14, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Zone Snapshot</div>
                            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>All {zones.length} zones at a glance</div>
                        </div>
                        <button onClick={onGoZones} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#3b82f6', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                            View all <ArrowUpRight size={13} />
                        </button>
                    </div>
                    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {zones.map(z => {
                            const status = getZoneStatus(z.crowd, z.capacity);
                            const pct = getDensityPct(z.crowd, z.capacity);
                            const cfg = STATUS_CFG[status];
                            return (
                                <div key={z.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, flexShrink: 0 }}>
                                        <cfg.icon size={16} color={cfg.color} strokeWidth={2.5} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{z.name}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, flexShrink: 0, marginLeft: 6 }}>{pct}%</span>
                                        </div>
                                        <div style={{ height: 4, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                                            <div style={{ width: `${pct}%`, height: '100%', background: cfg.color, borderRadius: 99, transition: 'width 0.6s ease' }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Live alerts for public */}
                <div style={{ background: '#fff', border: '1px solid #e9ecf0', borderRadius: 14, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Safety Alerts</div>
                            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>Important notices for you</div>
                        </div>
                        <button onClick={onGoAlerts} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#3b82f6', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                            View all <ArrowUpRight size={13} />
                        </button>
                    </div>
                    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {publicAlerts.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '20px 0', fontSize: 13, color: '#94a3b8' }}>No active alerts</div>
                        ) : publicAlerts.map(a => {
                            const isCritical = a.severity === 'critical';
                            const isWarning = a.severity === 'warning';
                            const color = isCritical ? '#dc2626' : isWarning ? '#b45309' : '#d97706';
                            const bg = isCritical ? '#fef2f2' : isWarning ? '#fff7ed' : '#fffbeb';
                            const Icon = isCritical ? ShieldAlert : AlertTriangle;
                            return (
                                <div key={a.id} style={{ padding: '10px 12px', borderRadius: 10, background: bg, border: `1px solid ${color}22`, borderLeft: `3px solid ${color}` }}>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                        <Icon size={14} color={color} style={{ marginTop: 1, flexShrink: 0 }} />
                                        <div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{a.zone}</div>
                                            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2, lineHeight: 1.5 }}>{
                                                // Simplify message for public
                                                a.severity === 'critical' ? 'Dangerously overcrowded. Avoid this zone.' :
                                                    a.severity === 'warning' ? 'High crowd density. Consider alternatives.' :
                                                        'Busy area. Use with caution.'
                                            }</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 10, color: '#94a3b8' }}>
                                                <Clock size={10} /> {a.time}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div style={{ padding: '8px 0', fontSize: 11, color: '#94a3b8', textAlign: 'center', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                            <TrendingUp size={11} /> AI-generated alerts update in real time
                        </div>
                    </div>
                </div>
            </div>

            {/* Capacity gauge */}
            <div style={{ background: '#fff', border: '1px solid #e9ecf0', borderRadius: 14, padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Venue Capacity</div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>Total occupancy across all zones</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{totalCrowd.toLocaleString('en-IN')}</span>
                        <span style={{ fontSize: 13, color: '#94a3b8' }}> / {totalCap.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <div style={{ height: 10, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden', marginBottom: 8 }}>
                    <div style={{
                        width: `${Math.round((totalCrowd / totalCap) * 100)}%`, height: '100%', borderRadius: 99,
                        background: `linear-gradient(to right, #22c55e, ${critCount > 0 ? '#ef4444' : warnCount > 0 ? '#f59e0b' : '#22c55e'})`,
                        transition: 'width 0.8s ease',
                    }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8' }}>
                    <span>0%</span>
                    <span style={{ fontWeight: 600, color: '#374151' }}>{Math.round((totalCrowd / totalCap) * 100)}% full</span>
                    <span>100%</span>
                </div>
            </div>
        </div>
    );
}
