'use client';
import { useState } from 'react';
import { Shield, Bell, RefreshCw, Clock } from 'lucide-react';
import UserSidebar from '@/components/public/UserSidebar';
import OverviewSection from '@/components/public/OverviewSection';
import ZonesSection from '@/components/public/ZonesSection';
import AlertsSection from '@/components/public/AlertsSection';
import SafetySection from '@/components/public/SafetySection';
import EmergencySection from '@/components/public/EmergencySection';
import LargeMapSection from '@/components/public/LargeMapSection';
import ProfileSection from '@/components/public/ProfileSection';
import { ZONES, getZoneStatus } from '@/lib/mockData';
import { useInterval, useClock } from '@/lib/hooks';

const PAGE_TITLES = {
    overview: { title: 'Overview', sub: 'Current event status at a glance' },
    map: { title: 'Live Map', sub: 'Interactive Pan-India congestion tracking' },
    zones: { title: 'Zone Status', sub: 'All zones with real-time crowd density' },
    alerts: { title: 'Safety Alerts', sub: 'AI-generated alerts and notices for attendees' },
    safety: { title: 'Safety Guide', sub: 'Essential safety tips and crowd behaviour' },
    emergency: { title: 'Emergency', sub: 'Contacts and emergency procedures' },
    profile: { title: 'My Profile', sub: 'Manage your settings and preferences' },
};

export default function PublicDashboard() {
    const [activeSection, setActiveSection] = useState('overview');
    const [zones, setZones] = useState(ZONES);
    const { time } = useClock();

    // Live zone simulation
    useInterval(() => {
        setZones(prev => prev.map(z => ({
            ...z,
            crowd: Math.max(0, Math.min(z.capacity, z.crowd + Math.floor((Math.random() - 0.45) * 60))),
        })));
    }, 8000);

    const critCount = zones.filter(z => getZoneStatus(z.crowd, z.capacity) === 'critical').length;
    const warnCount = zones.filter(z => getZoneStatus(z.crowd, z.capacity) === 'warning').length;
    const overallStatus = critCount >= 2 ? 'critical' : critCount >= 1 ? 'warning' : warnCount >= 2 ? 'moderate' : 'safe';
    const { title, sub } = PAGE_TITLES[activeSection];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f9', fontFamily: "'Inter', -apple-system, sans-serif", overflowX: 'hidden' }}>

            {/* Sidebar */}
            <UserSidebar active={activeSection} onNav={setActiveSection} overallStatus={overallStatus} />

            {/* Main content area — offset left by sidebar width */}
            <div style={{ flex: 1, marginLeft: 230, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: 'calc(100vw - 230px)' }}>

                {/* Top bar */}
                <header style={{
                    height: 56, background: '#fff', borderBottom: '1px solid #e9ecf0',
                    display: 'flex', alignItems: 'center', padding: '0 28px', gap: 16,
                    position: 'sticky', top: 0, zIndex: 50,
                }}>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>{title}</h1>
                        <p style={{ fontSize: 11, color: '#94a3b8' }}>{sub}</p>
                    </div>

                    {/* Right side status strip */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {/* Live indicator */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 99, background: '#fef2f2', border: '1px solid #fca5a5' }}>
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'blink 1.4s ease-in-out infinite' }} />
                            <span style={{ fontSize: 11, fontWeight: 700, color: '#dc2626' }}>LIVE</span>
                        </div>

                        {/* Alert count */}
                        {(critCount + warnCount) > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 99, background: '#fff7ed', border: '1px solid #fdba74' }}>
                                <Bell size={12} color="#d97706" />
                                <span style={{ fontSize: 11, fontWeight: 600, color: '#d97706' }}>{critCount + warnCount} Alerts</span>
                            </div>
                        )}

                        {/* Clock */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 99, background: '#f8fafc', border: '1px solid #e9ecf0' }}>
                            <Clock size={12} color="#64748b" />
                            <span style={{ fontSize: 11, fontWeight: 600, color: '#475569', fontVariantNumeric: 'tabular-nums' }}>{time}</span>
                        </div>

                        {/* Aarohan badge */}
                        <div style={{ padding: '5px 11px', borderRadius: 99, background: '#f0f4ff', border: '1px solid #c7d2fe', fontSize: 11, fontWeight: 600, color: '#4338ca' }}>
                            Aarohan 1.0
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main style={{ flex: 1, padding: '24px 28px', maxWidth: 1100, width: '100%' }}>
                    {activeSection === 'overview' && <OverviewSection zones={zones} onGoZones={() => setActiveSection('zones')} onGoAlerts={() => setActiveSection('alerts')} />}
                    {activeSection === 'map' && <LargeMapSection zones={zones} />}
                    {activeSection === 'zones' && <ZonesSection zones={zones} />}
                    {activeSection === 'alerts' && <AlertsSection />}
                    {activeSection === 'safety' && <SafetySection />}
                    {activeSection === 'emergency' && <EmergencySection />}
                    {activeSection === 'profile' && <ProfileSection />}
                </main>

                {/* Footer */}
                <footer style={{ padding: '14px 28px', borderTop: '1px solid #e9ecf0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>Powered by CrowdSense AI · YOLOv8 + LSTM · RAIT, Navi Mumbai</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#94a3b8' }}>
                        <RefreshCw size={10} />
                        Data refreshes every 8s
                    </div>
                </footer>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
        </div>
    );
}
