'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard, MapPin, Bell, BarChart2, Globe,
    Brain, Video, Users, Shield, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { useClock } from '@/lib/hooks';

const NAV = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, desc: 'Command summary' },
    { id: 'map', label: 'Live Map', icon: Globe, desc: 'Pan-India Tracking' },
    { id: 'zones', label: 'Zone Monitor', icon: MapPin, desc: 'Heatmap & tables' },
    { id: 'alerts', label: 'Alert Console', icon: Bell, desc: 'Active incidents' },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, desc: 'Charts & trends' },
    { id: 'forecast', label: 'AI Forecast', icon: Brain, desc: 'LSTM predictions' },
    { id: 'resources', label: 'Resources', icon: Users, desc: 'Personnel status' },
    { id: 'cameras', label: 'Camera Feed', icon: Video, desc: 'Live CCTV feeds' },
];

const STATUS_META = {
    safe: { label: 'All Clear', color: 'var(--safe)', dot: 'var(--safe)' },
    moderate: { label: 'Moderate', color: 'var(--warn)', dot: 'var(--warn)' },
    warning: { label: 'Watch Out', color: 'var(--mod)', dot: 'var(--mod)' },
    critical: { label: 'High Risk', color: 'var(--danger)', dot: 'var(--danger)' },
};

export default function AdminSidebar({ active, onNav, overallStatus = 'critical' }) {
    const { time, date } = useClock();
    const sm = STATUS_META[overallStatus] || STATUS_META.safe;

    return (
        <aside style={{
            width: 230, flexShrink: 0,
            background: 'var(--bg-2)',
            borderRight: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column',
            position: 'fixed', top: 0, left: 0, bottom: 0,
            zIndex: 100, overflowY: 'auto',
        }}>
            {/* Brand */}
            <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Shield size={16} color="#fff" />
                </div>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', letterSpacing: '-0.01em' }}>CrowdSense AI</div>
                    <div style={{ fontSize: 10, color: 'var(--t3)' }}>Admin Control Panel</div>
                </div>
            </div>

            {/* Clock */}
            <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--t1)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em' }}>{time}</div>
                <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 2 }}>{date} · MMRDA Grounds, BKC</div>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '10px 8px' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--t3)', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '0 10px', marginBottom: 8 }}>Navigation</div>
                {NAV.map(({ id, label, icon: Icon, desc }) => {
                    const isActive = active === id;
                    return (
                        <button
                            key={id}
                            onClick={() => onNav(id)}
                            style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                                padding: '9px 10px', borderRadius: 10, marginBottom: 2,
                                background: isActive ? 'var(--blue-dim)' : 'transparent',
                                border: 'none', cursor: 'pointer', textAlign: 'left',
                                borderLeft: `3px solid ${isActive ? 'var(--blue)' : 'transparent'}`,
                                transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--surface)'; }}
                            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                        >
                            <div style={{ width: 30, height: 30, borderRadius: 8, background: isActive ? 'rgba(59,130,246,0.2)' : 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${isActive ? 'rgba(59,130,246,0.3)' : 'var(--border)'}` }}>
                                <Icon size={14} color={isActive ? 'var(--blue)' : 'var(--t3)'} strokeWidth={2} />
                            </div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--blue)' : 'var(--t2)' }}>{label}</div>
                                <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 1 }}>{desc}</div>
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* Status widget */}
            <div style={{ margin: '0 10px 12px', padding: '12px 14px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>Event Status</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: sm.dot, display: 'inline-block', flexShrink: 0, animation: overallStatus === 'critical' ? 'blink 1.4s ease-in-out infinite' : 'none' }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: sm.color }}>{sm.label}</span>
                </div>
                <div style={{ fontSize: 10, color: 'var(--t3)' }}>Global AI Monitoring</div>
            </div>

            {/* Sign out */}
            <div style={{ padding: '0 10px 14px' }}>
                <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--t3)', padding: '8px 10px', borderRadius: 9, background: 'var(--surface)', border: '1px solid var(--border)', textDecoration: 'none' }}>
                    <LogOut size={13} /> Sign out
                </Link>
            </div>
        </aside>
    );
}
