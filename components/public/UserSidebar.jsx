'use client';
import { Shield, LayoutDashboard, Map, MapPin, Bell, BookOpen, Phone, ChevronRight, AlertTriangle, ShieldAlert, Globe, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NAV = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, desc: 'Event at a glance' },
    { id: 'map', label: 'Live Map', icon: Globe, desc: 'Interactive Tracking' },
    { id: 'zones', label: 'Zone Status', icon: MapPin, desc: 'All 12 zone details' },
    { id: 'alerts', label: 'Public Alerts', icon: Bell, desc: 'Active safety notices' },
    { id: 'safety', label: 'Safety Guide', icon: BookOpen, desc: 'Tips & guidelines' },
    { id: 'emergency', label: 'Emergency', icon: Phone, desc: 'Contacts & procedures' },
];

const STATUS_META = {
    safe: { label: 'All Clear', color: '#16a34a', bg: '#f0fdf4', dot: '#22c55e' },
    moderate: { label: 'Moderate', color: '#d97706', bg: '#fffbeb', dot: '#f59e0b' },
    warning: { label: 'Watch Out', color: '#b45309', bg: '#fff7ed', dot: '#f97316' },
    critical: { label: 'High Risk', color: '#dc2626', bg: '#fef2f2', dot: '#ef4444' },
};

export default function UserSidebar({ active, onNav, overallStatus }) {
    const sm = STATUS_META[overallStatus] || STATUS_META.safe;
    const router = useRouter();

    return (
        <aside style={{
            width: 230, flexShrink: 0,
            background: '#fff',
            borderRight: '1px solid #e9ecf0',
            display: 'flex', flexDirection: 'column',
            position: 'fixed', top: 0, left: 0, bottom: 0,
            zIndex: 100,
        }}>
            {/* Brand */}
            <div style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Shield size={16} color="#fff" />
                </div>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>CrowdSense AI</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>Public Safety Portal</div>
                </div>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '0 8px', marginBottom: 8 }}>Navigation</div>
                {NAV.map(({ id, label, icon: Icon, desc }) => {
                    const isActive = active === id;
                    return (
                        <button
                            key={id}
                            onClick={() => onNav(id)}
                            style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                                padding: '9px 10px', borderRadius: 10, marginBottom: 2,
                                background: isActive ? '#eff6ff' : 'transparent',
                                border: 'none', cursor: 'pointer', textAlign: 'left',
                                transition: 'all 0.15s',
                                borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                            }}
                            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f8fafc'; }}
                            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                        >
                            <div style={{ width: 30, height: 30, borderRadius: 8, background: isActive ? '#dbeafe' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon size={14} color={isActive ? '#3b82f6' : '#64748b'} strokeWidth={2} />
                            </div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? '#1d4ed8' : '#334155' }}>{label}</div>
                                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>{desc}</div>
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* Status widget at bottom */}
            <div style={{ margin: '0 10px 16px', padding: '12px 14px', borderRadius: 12, background: sm.bg, border: `1px solid ${sm.dot}33` }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>Event Status</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: sm.dot, display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: sm.color }}>{sm.label}</span>
                </div>
                <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>Aarohan 1.0 · RAIT, Navi Mumbai</div>
            </div>

            {/* Profile & Sign Out cursor pointer to make it clickable overall */}
            <div style={{ padding: '16px 18px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc' }}>
                <div
                    onClick={() => onNav('profile')}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8', fontWeight: 700, fontSize: 14, border: '1.5px solid #93c5fd', boxShadow: '0 2px 8px rgba(59,130,246,0.15)' }}>
                        <span style={{ letterSpacing: '0.05em' }}>AK</span>
                    </div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Akash</div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>Public User</div>
                    </div>
                </div>
                <button
                    onClick={() => router.push('/login')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, color: '#94a3b8', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = '#fef2f2'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent'; }}
                    title="Sign Out"
                >
                    <LogOut size={18} />
                </button>
            </div>
        </aside>
    );
}
