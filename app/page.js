'use client';
import Link from 'next/link';
import { Shield, ArrowRight, Activity, Zap, Brain, BarChart2, ChevronRight, Users } from 'lucide-react';
import { useCountUp } from '@/lib/hooks';

const Feature = ({ icon: Icon, title, desc }) => (
  <div style={{ display: 'flex', gap: 14, padding: '16px 0', borderTop: '1px solid #e9ecf0' }}>
    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
      <Icon size={17} color="#3b82f6" strokeWidth={2} />
    </div>
    <div>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{desc}</div>
    </div>
  </div>
);

const Stat = ({ value, suffix, label }) => {
  const count = useCountUp(value, 1600);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 34, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 3 }}>{label}</div>
    </div>
  );
};

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e9ecf0', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={15} color="#fff" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>CrowdSense AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'blink 1.4s ease-in-out infinite' }} />
            Live · Aarohan 1.0
          </div>
          <Link href="/login" style={{ padding: '7px 16px', borderRadius: 8, background: '#3b82f6', color: '#fff', fontSize: 13, fontWeight: 600 }}>
            Sign In
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '80px 0 60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#eff6ff', border: '1px solid #bfdbfe', padding: '5px 14px', borderRadius: 99, fontSize: 12, color: '#3b82f6', fontWeight: 600, marginBottom: 28 }}>
            <Brain size={13} /> Powered by YOLOv8 + LSTM Neural Network
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 20 }}>
            AI-Powered Smart<br />Crowd Management
          </h1>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.8 }}>
            Real-time crowd intelligence that detects surges, predicts risks, and coordinates response — before incidents happen.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, background: '#3b82f6', color: '#fff', fontWeight: 600, fontSize: 14, transition: 'opacity 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <Shield size={16} /> Admin Dashboard <ArrowRight size={14} />
            </Link>
            <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, background: '#fff', color: '#374151', fontWeight: 600, fontSize: 14, border: '1.5px solid #e2e8f0', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              Public Safety View <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: '#e9ecf0', borderRadius: 16, overflow: 'hidden', marginBottom: 60 }}>
          {[
            [18576, '', 'Live Attendees'],
            [12, '', 'Zones Monitored'],
            [7, '', 'Incidents Prevented'],
            [32, '', 'Officers Deployed'],
            [94, '%', 'AI Accuracy'],
          ].map(([v, s, l]) => (
            <div key={l} style={{ background: '#fff', padding: '22px 16px', textAlign: 'center' }}>
              <Stat value={v} suffix={s} label={l} />
            </div>
          ))}
        </div>

        {/* Two-column layout: features + role cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, marginBottom: 80, alignItems: 'start' }}>
          {/* Features */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Platform Capabilities</div>
            <Feature icon={Activity} title="Real-Time Density Monitoring" desc="YOLOv8 computer vision counts crowd per zone from any IP camera — no new hardware required." />
            <Feature icon={Zap} title="Anomaly & Stampede Detection" desc="Detects panic patterns, counter-flow, and surge events in milliseconds with instant alerts." />
            <Feature icon={Brain} title="AI Surge Prediction (LSTM)" desc="Predicts dangerous crowd buildup 5–15 minutes ahead with 94% confidence." />
            <Feature icon={BarChart2} title="Unified Command Dashboard" desc="Single screen for zones, cameras, alerts, and resource deployment across all agencies." />
          </div>

          {/* Access Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Quick Access</div>
            {[
              { href: '/login', icon: Shield, title: 'Admin Command Center', desc: 'Live heatmaps, alerts, AI forecasts, and resource management.', cta: 'Open Dashboard', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
              { href: '/login', icon: Users, title: 'Public Safety View', desc: 'Zone safety status and emergency guidance for event attendees.', cta: 'View Status', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
            ].map(card => (
              <Link key={card.title} href={card.href} style={{ display: 'block', padding: '20px', borderRadius: 14, background: card.bg, border: `1.5px solid ${card.border}`, textDecoration: 'none', transition: 'transform 0.15s, box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12, background: '#fff', border: `1px solid ${card.border}` }}>
                  <card.icon size={22} color={card.color} strokeWidth={2.5} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{card.title}</div>
                <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, marginBottom: 14 }}>{card.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: card.color }}>
                  {card.cta} <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #e9ecf0', background: '#fff', padding: '18px 24px', textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>
        CrowdSense AI · Built for Aarohan 1.0 Hackathon · RAIT, Navi Mumbai · © 2026
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  );
}
