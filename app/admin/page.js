'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminTopBar from '@/components/admin/TopBar';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminMapSection from '@/components/admin/AdminMapSection';
import HeatmapGrid from '@/components/admin/HeatmapGrid';
import ZoneTable from '@/components/admin/ZoneTable';
import AlertFeed from '@/components/admin/AlertFeed';
import CrowdChart from '@/components/admin/CrowdChart';
import ZoneDonut from '@/components/admin/ZoneDonut';
import ResponseChart from '@/components/admin/ResponseChart';
import PredictionPanel from '@/components/admin/PredictionPanel';
import ResourcePanel from '@/components/admin/ResourcePanel';
import CameraGrid from '@/components/admin/CameraGrid';
import { INITIAL_STATS, ZONES, getZoneStatus } from '@/lib/mockData';
import { useInterval } from '@/lib/hooks';

const SECTION_META = {
    overview: { title: 'Command Overview', sub: 'Live summary — Aarohan Music Fest 2026 · MMRDA, BKC, Mumbai' },
    map: { title: 'Live Map', sub: 'Interactive pan-India congestion tracking' },
    zones: { title: 'Zone Monitor', sub: 'Heatmap and zone-level density management' },
    alerts: { title: 'Alert Console', sub: 'Real-time AI-generated incidents and resolution' },
    analytics: { title: 'Analytics', sub: 'Crowd flow, response time, and zone distribution charts' },
    forecast: { title: 'AI Forecast', sub: 'LSTM predictive model — 5/10/15 min ahead projections' },
    resources: { title: 'Resource Management', sub: 'Mumbai Police · CISF · Red Cross · Mumbai Fire Brigade' },
    cameras: { title: 'Camera Feed', sub: 'Live YOLOv8 feed — all 6 camera nodes' },
};

import { ShieldAlert, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

const ALERT_TICKER_ITEMS = [
    { type: 'critical', icon: ShieldAlert, color: '#f87171', text: 'CRITICAL: Main Performance Stage — 92% density. 5-min surge predicted. 8 jawaan bhejo Gate A-1 par.' },
    { type: 'warning', icon: AlertTriangle, color: '#fb923c', text: 'WARNING: South Arena — Counter-flow detected. Gate S-3 kholo.' },
    { type: 'moderate', icon: AlertCircle, color: '#facc15', text: 'MODERATE: Expo Pavilion — AI predicts 78% overcrowding in 8 min.' },
    { type: 'safe', icon: CheckCircle2, color: '#4ade80', text: 'RESOLVED: North Entry Gate — Inflow normalising. Density 19%.' }
];

export default function AdminDashboard() {
    const [active, setActive] = useState('overview');
    const [stats, setStats] = useState(INITIAL_STATS);
    const [alertCount, setAlertCount] = useState(5);

    // Lightweight live tick for KPI cards
    useInterval(() => {
        setStats(prev => ({
            ...prev,
            totalCrowd: Math.max(12000, Math.min(24000, prev.totalCrowd + Math.floor((Math.random() - 0.45) * 200))),
            activeAlerts: Math.max(0, Math.min(12, prev.activeAlerts + (Math.random() > 0.75 ? 1 : Math.random() > 0.85 ? -1 : 0))),
            criticalZones: Math.max(0, Math.min(6, prev.criticalZones + (Math.random() > 0.88 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
        }));
    }, 6000);

    const critCount = stats.criticalZones;
    const warnCount = stats.warningZones;
    const overallStatus = critCount >= 3 ? 'critical' : critCount >= 1 ? 'warning' : warnCount >= 2 ? 'moderate' : 'safe';
    const { title, sub } = SECTION_META[active] || SECTION_META.overview;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', fontFamily: "'Inter', -apple-system, sans-serif", overflowX: 'hidden' }}>

            {/* Sidebar */}
            <AdminSidebar active={active} onNav={setActive} overallStatus={overallStatus} />

            {/* Main area */}
            <div style={{ flex: 1, marginLeft: 230, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: 'calc(100vw - 230px)' }}>

                {/* Topbar */}
                <AdminTopBar alertCount={alertCount} title={title} sub={sub} />

                {/* Alert ticker strip */}
                <div style={{
                    background: 'rgba(239,68,68,0.05)', borderBottom: '1px solid rgba(239,68,68,0.12)',
                    padding: '6px 20px', display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden',
                }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--danger)', whiteSpace: 'nowrap', background: 'var(--danger-dim)', padding: '2px 7px', borderRadius: 4, letterSpacing: '0.06em', border: '1px solid rgba(239,68,68,0.2)', flexShrink: 0 }}>
                        LIVE ALERTS
                    </div>
                    <div style={{ overflow: 'hidden', flex: 1 }}>
                        <div className="ticker-inner" style={{ display: 'flex', gap: 24, fontSize: 11 }}>
                            {[...ALERT_TICKER_ITEMS, ...ALERT_TICKER_ITEMS].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: item.type === 'critical' ? '#f87171' : '#f8fafc' }}>
                                    <item.icon size={12} color={item.color} strokeWidth={2.5} />
                                    <span>{item.text}</span>
                                    <span style={{ color: 'rgba(255,255,255,0.2)', marginLeft: 18 }}>·</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section content */}
                <main style={{ flex: 1, padding: '22px 26px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {active === 'overview' && (
                        <AdminOverview stats={stats} onGoZones={() => setActive('zones')} onGoAlerts={() => setActive('alerts')} />
                    )}

                    {active === 'map' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.01em' }}>Live Map</h2>
                                <p style={{ fontSize: 13, color: 'var(--t3)', marginTop: 3 }}>Interactive pan-India node load tracking</p>
                            </div>
                            <AdminMapSection />
                        </div>
                    )}

                    {active === 'zones' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.01em' }}>Zone Monitor</h2>
                                <p style={{ fontSize: 13, color: 'var(--t3)', marginTop: 3 }}>Live heatmap + zone-level density table</p>
                            </div>
                            <HeatmapGrid />
                            <ZoneTable />
                        </div>
                    )}

                    {active === 'alerts' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.01em' }}>Alert Console</h2>
                                <p style={{ fontSize: 13, color: 'var(--t3)', marginTop: 3 }}>AI-generated real-time incidents with resolution actions</p>
                            </div>
                            <AlertFeed onAlertCountChange={setAlertCount} />
                        </div>
                    )}

                    {active === 'analytics' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.01em' }}>Analytics</h2>
                                <p style={{ fontSize: 13, color: 'var(--t3)', marginTop: 3 }}>Crowd flow trends, zone distribution, and response time analysis</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                                <CrowdChart />
                                <ZoneDonut />
                            </div>
                            <ResponseChart />
                        </div>
                    )}

                    {active === 'forecast' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.01em' }}>AI Forecast</h2>
                                <p style={{ fontSize: 13, color: 'var(--t3)', marginTop: 3 }}>LSTM model predictions — 5, 10, and 15 minute crowd surge forecasts</p>
                            </div>
                            <PredictionPanel />
                        </div>
                    )}

                    {active === 'resources' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.01em' }}>Resource Management</h2>
                                <p style={{ fontSize: 13, color: 'var(--t3)', marginTop: 3 }}>Mumbai Police · CISF · Red Cross · Mumbai Fire Brigade deployment status</p>
                            </div>
                            <ResourcePanel />
                        </div>
                    )}

                    {active === 'cameras' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', letterSpacing: '-0.01em' }}>Camera Feed</h2>
                                <p style={{ fontSize: 13, color: 'var(--t3)', marginTop: 3 }}>Live YOLOv8 inference — 6 camera nodes with real-time crowd density overlay</p>
                            </div>
                            <CameraGrid />
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                        <p style={{ fontSize: 11, color: 'var(--t3)' }}>CrowdSense AI · YOLOv8 + LSTM · Aarohan Hackathon 1.0 — RAIT, Navi Mumbai</p>
                    </div>
                </main>
            </div>

            <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .ticker-inner { white-space: nowrap; animation: ticker 38s linear infinite; display: inline-block; }
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>
        </div>
    );
}
