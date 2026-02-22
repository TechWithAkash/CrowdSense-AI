'use client';

import { Phone, MessageSquare, Navigation, Clock, RadioTower, ShieldAlert, Ambulance, Flame, Tent, Hospital, ShieldCheck, HeartPulse, Search, Bell, Activity, UserPlus } from 'lucide-react';

const CONTACTS = [
    { label: 'Police', number: '100', icon: ShieldAlert, color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', note: 'National emergency' },
    { label: 'Ambulance', number: '108', icon: Ambulance, color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', note: 'Medical emergency' },
    { label: 'Fire Department', number: '101', icon: Flame, color: '#d97706', bg: '#fffbeb', border: '#fde68a', note: 'Fire emergency' },
    { label: 'Event Helpdesk', number: '1800-CROWD', icon: Tent, color: '#16a34a', bg: '#f0fdf4', border: '#86efac', note: 'Event assistance' },
    { label: 'Medical Bay', number: 'Zone E', icon: Hospital, color: '#7c3aed', bg: '#f5f3ff', border: '#c4b5fd', note: 'On-site medical' },
    { label: 'Security Control', number: 'Zone F', icon: ShieldCheck, color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', note: 'Command room' },
];

const STEPS = [
    { num: 1, icon: HeartPulse, title: 'Stay Calm', desc: 'Take deep breaths. Panic spreads fast. Your calm behaviour helps others.' },
    { num: 2, icon: Search, title: 'Assess Safety', desc: 'Check if you are in immediate danger. Look for the clearest exit.' },
    { num: 3, icon: Bell, title: 'Alert Security', desc: 'Call out to the nearest security personnel or use your phone to dial 100.' },
    { num: 4, icon: Activity, title: 'Move Carefully', desc: 'Move diagonally to the crowd flow. Do not run — walk steadily.' },
    { num: 5, icon: Hospital, title: 'Seek Medical Aid', desc: 'If anyone is injured, call 108 or guide them to Medical Bay in Zone E.' },
    { num: 6, icon: UserPlus, title: 'Contact Family', desc: 'Once safe, call your emergency contact and confirm your status.' },
];

export default function EmergencySection() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>Emergency</h2>
                <p style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>Contacts and step-by-step emergency procedures</p>
            </div>

            {/* Critical banner */}
            <div style={{ padding: '14px 18px', borderRadius: 12, background: '#fef2f2', border: '1.5px solid #fca5a5', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <ShieldAlert size={28} color="#dc2626" style={{ flexShrink: 0 }} />
                <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#dc2626', marginBottom: 4 }}>In a life-threatening emergency, call 100 or 108 immediately.</div>
                    <div style={{ fontSize: 12, color: '#b91c1c', lineHeight: 1.65 }}>
                        Do not wait. Move away from the danger zone first, then call. Event staff are trained to assist — find one if you cannot call.
                    </div>
                </div>
            </div>

            {/* Contact grid */}
            <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>📞 Emergency Contacts</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                    {CONTACTS.map(c => (
                        <div key={c.label} style={{ background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                            <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <c.icon size={20} color={c.color} />
                            </div>
                            <div>
                                <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.note}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{c.label}</div>
                                <div style={{ fontSize: 18, fontWeight: 800, color: c.color, letterSpacing: '-0.01em', marginTop: 2 }}>{c.number}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step-by-step procedure */}
            <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>🪜 Emergency Procedure — Step by Step</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {STEPS.map((s, i) => (
                        <div key={s.num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 16px', background: '#fff', border: '1px solid #e9ecf0', borderRadius: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexShrink: 0 }}>
                                <s.icon size={18} strokeWidth={2.5} />
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 99, background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe' }}>Step {s.num}</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{s.title}</span>
                                </div>
                                <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div style={{ marginLeft: 'auto', flexShrink: 0, color: '#d1d5db', fontSize: 18 }}>›</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Location reminder */}
            <div style={{ padding: '14px 18px', borderRadius: 12, background: '#f0fdf4', border: '1.5px solid #86efac', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Navigation size={18} color="#16a34a" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#166534', marginBottom: 3 }}>Medical Bay is in Zone E · Security Control is in Zone F</div>
                    <div style={{ fontSize: 12, color: '#14532d', lineHeight: 1.65 }}>
                        Both are staffed 24/7 during the event. If you can't reach either — flag down any CrowdSense security vest wearing personnel.
                    </div>
                </div>
            </div>
        </div>
    );
}
