'use client';
import { User, Mail, Phone, MapPin, Bell, Shield, Key, LogOut, ChevronRight, CheckCircle2, SwitchCamera, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PROFILE_DATA = {
    name: 'Akash Vishwakarma',
    email: 'user@crowdsense.ai',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    role: 'Public Safety Watcher',
    joinDate: 'Joined Oct 2023',
    initials: 'AK',
};

const SectionData = [
    {
        title: 'Account Settings',
        items: [
            { icon: User, label: 'Edit Profile Information', value: 'Update your display details', action: true },
            { icon: Mail, label: 'Email Address', value: PROFILE_DATA.email, action: false },
            { icon: Phone, label: 'Phone Number', value: PROFILE_DATA.phone, action: false },
            { icon: Key, label: 'Change Password', value: 'Last updated 2 months ago', action: true },
        ],
    },
    {
        title: 'Preferences',
        items: [
            { icon: Bell, label: 'Push Notifications', value: 'Critical alerts only', toggle: true, toggleState: true },
            { icon: MapPin, label: 'Location Tracking', value: 'While using the app', toggle: true, toggleState: true },
            { icon: Moon, label: 'Dark Mode', value: 'System default', toggle: true, toggleState: false },
        ],
    },
];

export default function ProfileSection() {
    const router = useRouter();

    const handleSignOut = () => {
        router.push('/login');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
            {/* Header / Profile Card */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9ecf0', padding: '28px 32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 32, boxShadow: '0 8px 20px rgba(59,130,246,0.25)', border: '4px solid #eff6ff', flexShrink: 0 }}>
                        <span style={{ letterSpacing: '0.05em' }}>{PROFILE_DATA.initials}</span>
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>{PROFILE_DATA.name}</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 99, background: '#f0fdf4', border: '1px solid #86efac', fontSize: 11, fontWeight: 600, color: '#16a34a' }}>
                                <CheckCircle2 size={12} /> Verified
                            </div>
                        </div>
                        <div style={{ fontSize: 14, color: '#64748b', display: 'flex', alignItems: 'center', gap: 16 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Shield size={14} /> {PROFILE_DATA.role}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={14} /> {PROFILE_DATA.location}</span>
                        </div>
                        <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 10 }}>{PROFILE_DATA.joinDate}</div>
                    </div>
                </div>
                <button
                    onClick={handleSignOut}
                    className="styled-button-danger"
                    style={{
                        padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s',
                        background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; }}
                >
                    <LogOut size={16} /> Sign Out
                </button>
            </div>

            {/* Content Grids */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
                {SectionData.map((section, idx) => (
                    <div key={idx} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9ecf0', overflow: 'hidden' }}>
                        <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: 0 }}>{section.title}</h3>
                        </div>
                        <div style={{ padding: '8px 0' }}>
                            {section.items.map((item, i) => (
                                <div key={i} style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i !== section.items.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: item.action ? 'pointer' : 'default', transition: 'background 0.2s' }}
                                    onMouseEnter={e => { if (item.action) e.currentTarget.style.background = '#f8fafc'; }}
                                    onMouseLeave={e => { if (item.action) e.currentTarget.style.background = 'transparent'; }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <item.icon size={16} color="#64748b" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: '#334155' }}>{item.label}</div>
                                            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 3 }}>{item.value}</div>
                                        </div>
                                    </div>

                                    {item.action && (
                                        <ChevronRight size={18} color="#cbd5e1" />
                                    )}

                                    {item.toggle && (
                                        <div style={{ width: 44, height: 24, borderRadius: 99, background: item.toggleState ? '#22c55e' : '#cbd5e1', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
                                            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: item.toggleState ? 22 : 2, transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', padding: '16px 0', borderTop: '1px solid #e9ecf0', marginTop: 8 }}>
                <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>CrowdSense AI Safety Portal · User ID: {PROFILE_DATA.initials}-884920</p>
                <button style={{ marginTop: 12, background: 'none', border: 'none', fontSize: 12, color: '#dc2626', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Delete Account</button>
            </div>
        </div>
    );
}
