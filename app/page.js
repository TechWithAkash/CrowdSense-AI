'use client';
import Link from 'next/link';
import { Shield, ArrowRight, Activity, Zap, Brain, ChevronRight, Users, Globe, BarChart2 } from 'lucide-react';
import { useCountUp } from '@/lib/hooks';
import { useEffect, useState } from 'react';

const Stat = ({ value, suffix, label }) => {
  const count = useCountUp(value, 2000);
  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: 44, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600, letterSpacing: '0.02em' }}>{label}</div>
    </div>
  );
};

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif", overflowX: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>

      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vh', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '-20%', width: '60vw', height: '60vh', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #3b82f6, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.25)' }}>
            <Shield size={18} color="#fff" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>CrowdSense<span style={{ color: '#3b82f6' }}>.ai</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#334155', background: '#f1f5f9', padding: '6px 14px', borderRadius: 99, border: '1px solid #e2e8f0', fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 10px rgba(16,185,129,0.5)', animation: 'pulse 2s infinite' }} />
            System Live
          </div>
          <Link href="/login" style={{ padding: '9px 22px', borderRadius: 10, background: '#0f172a', color: '#fff', fontSize: 14, fontWeight: 600, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(15,23,42,0.15)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(15,23,42,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(15,23,42,0.15)'; }}
          >
            Access Portal
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '140px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, width: '100%' }}>

        {/* Hero Section */}
        <div className={`fade-up ${mounted ? 'visible' : ''}`} style={{ textAlign: 'center', maxWidth: 860, marginBottom: 80, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 99, background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em', marginBottom: 32, boxShadow: '0 4px 12px rgba(59,130,246,0.1)' }}>
            <Brain size={16} strokeWidth={2.5} /> Powered by YOLOv8 & LSTM Networks
          </div>

          <h1 style={{ fontSize: 'clamp(44px, 7vw, 76px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 24, padding: '0 20px', color: '#0f172a' }}>
            Predictive Crowd Intelligence. <br />
            <span style={{ color: '#3b82f6' }}>Master the Chaos.</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#475569', lineHeight: 1.6, maxWidth: 640, marginBottom: 44, fontWeight: 500 }}>
            Stop incidents before they happen with real-time density tracking, 15-minute predictive modeling, and absolute zone control.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 14, background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff', fontWeight: 600, fontSize: 16, transition: 'all 0.3s', boxShadow: '0 8px 24px rgba(59,130,246,0.3)', border: '1px solid #60a5fa' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(59,130,246,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,130,246,0.3)'; }}
            >
              Command Center <ArrowRight size={18} />
            </Link>
            <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 14, background: '#fff', color: '#0f172a', fontWeight: 600, fontSize: 16, border: '2px solid #e2e8f0', transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Public Watch <Users size={18} />
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`fade-up delay-1 ${mounted ? 'visible' : ''}`} style={{ width: '100%', maxWidth: 1000, display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '30px 0', marginBottom: 100, flexWrap: 'wrap', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.7), transparent)' }}>
          <Stat value={125000} suffix="+" label="Daily Scans" />
          <div style={{ width: 1, background: '#e2e8f0', margin: '20px 0' }} />
          <Stat value={94} suffix="%" label="AI Accuracy Rate" />
          <div style={{ width: 1, background: '#e2e8f0', margin: '20px 0' }} />
          <Stat value={15} suffix="m" label="Predictive Lead Time" />
          <div style={{ width: 1, background: '#e2e8f0', margin: '20px 0' }} />
          <Stat value={12} suffix="" label="Live Security Zones" />
        </div>

        {/* Bento Grid */}
        <div style={{ width: '100%', marginBottom: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16, color: '#0f172a' }}>Absolute Awareness. Total Control.</h2>
            <p style={{ color: '#64748b', fontSize: 18, maxWidth: 550, margin: '0 auto', lineHeight: 1.6 }}>An entire event's safety telemetry, processed in real-time and delivered flawlessly.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24, gridAutoRows: 'minmax(280px, auto)' }}>

            {/* Bento Card 1: Admin Dashboard (Large) */}
            <div className={`bento-card fade-up delay-2 ${mounted ? 'visible' : ''}`} style={{ gridColumn: 'span 8', gridRow: 'span 2', background: '#fff', borderRadius: 28, border: '1px solid #e2e8f0', padding: 48, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'radial-gradient(circle at top right, rgba(59,130,246,0.05), transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 4px 12px rgba(59,130,246,0.15)' }}>
                  <BarChart2 size={28} color="#2563eb" strokeWidth={2.5} />
                </div>
                <h3 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em', color: '#0f172a' }}>Unified Command Console</h3>
                <p style={{ color: '#475569', fontSize: 18, maxWidth: 460, lineHeight: 1.6, fontWeight: 500 }}>The ultimate nerve center. Monitor zone densities, active incident alerts, and resource allocation across your entire venue map.</p>
              </div>

              {/* Decorative mockup element */}
              <div style={{ position: 'absolute', right: -50, top: 40, width: 450, height: 320, background: '#f8fafc', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '-20px 20px 60px rgba(0,0,0,0.08)', padding: 24, display: 'flex', flexDirection: 'column', gap: 16, opacity: 0.95, transform: 'rotate(-3deg)' }}>
                <div style={{ height: 24, width: 140, background: '#e2e8f0', borderRadius: 6 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 10 }}>
                  <div style={{ height: 120, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12 }} />
                  <div style={{ height: 120, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12 }} />
                </div>
                <div style={{ height: 80, width: '100%', background: '#f1f5f9', borderRadius: 12, border: '1px solid #e2e8f0' }} />
              </div>
            </div>

            {/* Bento Card 2: AI Prediction */}
            <div className={`bento-card fade-up delay-3 ${mounted ? 'visible' : ''}`} style={{ gridColumn: 'span 4', gridRow: 'span 1', background: '#fff', borderRadius: 28, border: '1px solid #e2e8f0', padding: 40, position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at bottom left, rgba(168,85,247,0.05), transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#faf5ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 4px 12px rgba(168,85,247,0.1)' }}>
                <Brain size={24} color="#9333ea" strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: '#0f172a' }}>LSTM Surge Prediction</h3>
              <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.6, fontWeight: 500 }}>Know about the bottleneck before it happens. AI forecasts 15 minutes into the future based on live inflow data.</p>
            </div>

            {/* Bento Card 3: Live Mapping */}
            <div className={`bento-card fade-up delay-4 ${mounted ? 'visible' : ''}`} style={{ gridColumn: 'span 4', gridRow: 'span 1', background: '#fff', borderRadius: 28, border: '1px solid #e2e8f0', padding: 40, position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 4px 12px rgba(34,197,94,0.1)' }}>
                <Globe size={24} color="#16a34a" strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: '#0f172a' }}>Interactive Maps</h3>
              <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.6, fontWeight: 500 }}>Visualise geographical load with real-time zone color-coding. Spot the highest density areas instantly.</p>
            </div>

          </div>
        </div>

        {/* C2A Section */}
        <div className={`fade-up delay-5 ${mounted ? 'visible' : ''}`} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 32, padding: '70px 40px', textAlign: 'center', width: '100%', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 20, letterSpacing: '-0.02em', color: '#0f172a' }}>Ready to secure your event?</h2>
            <p style={{ color: '#64748b', fontSize: 18, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px', fontWeight: 500 }}>Access the full suite of CrowdSense AI tools, live monitoring, and public safety portals.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '18px 48px', borderRadius: 16, background: '#0f172a', color: '#fff', fontWeight: 700, fontSize: 18, transition: 'all 0.2s', boxShadow: '0 10px 25px rgba(15,23,42,0.2)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(15,23,42,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(15,23,42,0.2)'; }}
              >
                Access Platform <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', background: '#fff', padding: '36px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: 14, fontWeight: 500, width: '100%', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={12} color="#fff" />
          </div>
          CrowdSense AI System
        </div>
        <div>Built as a personal project.</div>
      </footer>

      {/* Global CSS for animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        .delay-5 { transition-delay: 0.5s; }

        .bento-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .bento-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.08) !important;
          border-color: #cbd5e1 !important;
        }

        /* Adjust scrollbar for light theme */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f8fafc; 
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
}
