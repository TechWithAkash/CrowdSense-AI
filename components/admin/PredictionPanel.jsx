'use client';
import { AI_PREDICTIONS } from '@/lib/mockData';
import { Brain, TrendingUp } from 'lucide-react';

const RISK = {
    Low: { color: 'var(--safe)', bg: 'var(--safe-dim)', badge: 'badge-safe' },
    Medium: { color: 'var(--warn)', bg: 'var(--warn-dim)', badge: 'badge-warning' },
    High: { color: 'var(--mod)', bg: 'var(--mod-dim)', badge: 'badge-moderate' },
    Critical: { color: 'var(--danger)', bg: 'var(--danger-dim)', badge: 'badge-critical' },
};

export default function PredictionPanel() {
    return (
        <div className="card" style={{ padding: 20 }} id="forecast">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Brain size={16} color="var(--purple)" />
                </div>
                <div>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>AI Surge Forecast</h3>
                    <p style={{ fontSize: 11, color: 'var(--t3)' }}>LSTM model · 94% accuracy · predictions at +5/+10/+15 min</p>
                </div>
                <span className="badge badge-blue" style={{ marginLeft: 'auto' }}>LSTM Active</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                {AI_PREDICTIONS.map(p => {
                    const risk = RISK[p.riskLevel] || RISK.Low;
                    const maxPct = Math.max(p.plus5, p.plus10, p.plus15);
                    return (
                        <div key={p.zone} className="card" style={{ padding: '14px 16px', background: 'var(--surface-2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>{p.zone}</div>
                                    <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 2 }}>Confidence: {p.confidence}%</div>
                                </div>
                                <span className={`badge ${risk.badge}`}>{p.riskLevel}</span>
                            </div>

                            {/* Bars */}
                            {[['+ 5 min', p.plus5], ['+ 10 min', p.plus10], ['+ 15 min', p.plus15]].map(([label, val]) => (
                                <div key={label} style={{ marginBottom: 8 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 10 }}>
                                        <span style={{ color: 'var(--t3)' }}>{label}</span>
                                        <span style={{ fontWeight: 700, color: risk.color }}>{val}%</span>
                                    </div>
                                    <div className="bar-track">
                                        <div className="bar-fill" style={{ width: `${val}%`, background: `linear-gradient(to right, var(--blue), ${risk.color})` }} />
                                    </div>
                                </div>
                            ))}

                            <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 8, background: risk.bg, border: `1px solid ${risk.color}22`, display: 'flex', gap: 6 }}>
                                <TrendingUp size={12} color={risk.color} style={{ marginTop: 1, flexShrink: 0 }} />
                                <span style={{ fontSize: 10, color: risk.color, lineHeight: 1.5 }}>{p.recommendation}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
