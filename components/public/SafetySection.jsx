'use client';

import { ShieldCheck, MapPin, Map, Users, HeartHandshake, Phone, ArrowUpRight, Flame, ShieldAlert, AlertTriangle, Lightbulb, CheckCircle2, XCircle } from 'lucide-react';

const CATEGORIES = [
    {
        title: 'Before You Enter',
        icon: MapPin,
        color: '#3b82f6',
        bg: '#eff6ff',
        border: '#bfdbfe',
        tips: [
            { icon: Phone, text: 'Keep your phone charged and share your live location with family.' },
            { icon: Map, text: 'Study the venue map and identify all emergency exits before entering.' },
            { icon: Users, text: 'Arrange a meeting point with friends in case you get separated.' },
            { icon: ShieldCheck, text: 'Wear comfortable shoes — avoid heels or slippers at crowded events.' },
        ],
    },
    {
        title: 'Inside the Venue',
        icon: Users,
        color: '#16a34a',
        bg: '#f0fdf4',
        border: '#86efac',
        tips: [
            { icon: ArrowUpRight, text: 'Move with the crowd, not against it. Keep your arms out for space.' },
            { icon: MapPin, text: 'Know your nearest exit at all times — count the rows to it.' },
            { icon: Phone, text: 'Avoid using your phone while walking in dense areas.' },
            { icon: ShieldCheck, text: 'If caught in a surge, use your arms to protect your chest and breathe.' },
        ],
    },
    {
        title: 'If It Gets Crowded',
        icon: AlertTriangle,
        color: '#d97706',
        bg: '#fffbeb',
        border: '#fde68a',
        tips: [
            { icon: HeartHandshake, text: 'Stay calm — panic is contagious and makes things worse for everyone.' },
            { icon: ArrowUpRight, text: 'Move diagonally to the crowd flow to gradually reach the edge.' },
            { icon: ShieldAlert, text: 'Use your voice to warn others and alert security personnel nearby.' },
            { icon: Users, text: 'Keep children close — carry small children to protect them.' },
        ],
    },
    {
        title: 'Emergency Situation',
        icon: Flame,
        color: '#dc2626',
        bg: '#fef2f2',
        border: '#fca5a5',
        tips: [
            { icon: ArrowUpRight, text: 'If the PA asks you to evacuate, do it calmly and immediately.' },
            { icon: ShieldCheck, text: 'Stay low if there is smoke. Cover your mouth with cloth.' },
            { icon: HeartHandshake, text: 'Help others who have fallen — call for help without adding to panic.' },
            { icon: Phone, text: 'Once safe, call 108 (Ambulance) or alert any event staff member.' },
        ],
    },
];

export default function SafetySection() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>Safety Guide</h2>
                <p style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>Essential knowledge to keep yourself safe at the event</p>
            </div>

            {/* Alert strip */}
            <div style={{ padding: '12px 16px', borderRadius: 12, background: '#fffbeb', border: '1.5px solid #fde68a', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Lightbulb size={24} color="#d97706" style={{ flexShrink: 0 }} />
                <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e', marginBottom: 3 }}>Always follow security instructions</div>
                    <div style={{ fontSize: 12, color: '#78350f', lineHeight: 1.65 }}>
                        The CrowdSense AI system monitors all zones in real time. When alerted, security personnel will guide you. Always cooperate with them — their instructions can save lives.
                    </div>
                </div>
            </div>

            {/* Category cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {CATEGORIES.map(cat => (
                    <div key={cat.title} style={{ background: '#fff', border: `1.5px solid ${cat.border}`, borderRadius: 14, overflow: 'hidden' }}>
                        <div style={{ padding: '14px 18px', background: cat.bg, borderBottom: `1px solid ${cat.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <cat.icon size={22} color={cat.color} />
                            <div style={{ fontSize: 14, fontWeight: 700, color: cat.color }}>{cat.title}</div>
                        </div>
                        <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {cat.tips.map((tip, i) => (
                                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: 6, background: cat.bg, color: cat.color, flexShrink: 0 }}>
                                        <tip.icon size={14} strokeWidth={2.5} />
                                    </div>
                                    <span style={{ fontSize: 12, color: '#475569', lineHeight: 1.7, flex: 1 }}>{tip.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Do's and Don'ts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                    {
                        title: "Do's",
                        icon: CheckCircle2,
                        color: '#16a34a', bg: '#f0fdf4', border: '#86efac',
                        items: ['Stay with your group', 'Follow designated paths', 'Drink water regularly', 'Wear your event wristband', 'Report suspicious activity'],
                    },
                    {
                        title: "Don'ts",
                        icon: XCircle,
                        color: '#dc2626', bg: '#fef2f2', border: '#fca5a5',
                        items: ['Push or shove others', 'Rush emergency exits', 'Block walkways or paths', 'Ignore security announcements', 'Take photos in dense crowds'],
                    },
                ].map(section => (
                    <div key={section.title} style={{ background: '#fff', border: `1.5px solid ${section.border}`, borderRadius: 14, overflow: 'hidden' }}>
                        <div style={{ padding: '12px 16px', background: section.bg, borderBottom: `1px solid ${section.border}`, fontSize: 14, fontWeight: 700, color: section.color, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <section.icon size={16} strokeWidth={2.5} />
                            {section.title}
                        </div>
                        <ul style={{ padding: '14px 18px', margin: 0, display: 'flex', flexDirection: 'column', gap: 9, listStyle: 'none' }}>
                            {section.items.map(item => {
                                const Icon = section.title.includes("Do's") ? CheckCircle2 : XCircle;
                                return (
                                    <li key={item} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                                        <Icon size={16} color={section.color} style={{ flexShrink: 0, marginTop: 1 }} strokeWidth={2.5} />
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
