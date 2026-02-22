'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Eye, EyeOff, ArrowRight, User, Lock, ShieldCheck, Users } from 'lucide-react';

const DEMO_ACCOUNTS = [
    {
        role: 'Admin',
        email: 'admin@crowdsense.ai',
        password: 'admin123',
        description: 'Full command center access',
        redirect: '/admin',
        icon: ShieldCheck,
        color: '#00d4ff',
    },
    {
        role: 'Public User',
        email: 'user@crowdsense.ai',
        password: 'user123',
        description: 'Public safety dashboard',
        redirect: '/public',
        icon: Users,
        color: '#22c55e',
    },
];

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [focusedField, setFocusedField] = useState(null);

    const fillDemo = (account) => {
        setEmail(account.email);
        setPassword(account.password);
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        await new Promise((r) => setTimeout(r, 800));

        const match = DEMO_ACCOUNTS.find(
            (a) => a.email === email && a.password === password
        );

        if (match) {
            router.push(match.redirect);
        } else {
            setLoading(false);
            setError('Invalid credentials. Use a demo account below or check your details.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8f9fc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            fontFamily: "'Inter', sans-serif",
        }}>
            <div style={{ width: '100%', maxWidth: 420 }}>

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: 'linear-gradient(135deg, #0ea5e9, #0066cc)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 14px', boxShadow: '0 4px 16px rgba(14,165,233,0.25)',
                    }}>
                        <Shield size={22} color="#fff" />
                    </div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
                        CrowdSense AI
                    </h1>
                    <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
                        Sign in to continue
                    </p>
                </div>

                {/* Card */}
                <div style={{
                    background: '#fff',
                    borderRadius: 18,
                    border: '1px solid #e5e7eb',
                    padding: '32px 28px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
                }}>
                    {/* Error */}
                    {error && (
                        <div style={{
                            background: '#fef2f2', border: '1px solid #fecaca',
                            borderRadius: 10, padding: '11px 14px', marginBottom: 20,
                            fontSize: 12, color: '#dc2626', lineHeight: 1.5,
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* Email */}
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                                Email address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={15} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="you@example.com"
                                    required
                                    style={{
                                        width: '100%', padding: '10px 12px 10px 36px',
                                        border: `1.5px solid ${focusedField === 'email' ? '#0ea5e9' : '#e5e7eb'}`,
                                        borderRadius: 10, fontSize: 13, color: '#111827',
                                        background: '#fff', outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(14,165,233,0.1)' : 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Password</label>
                                <Link href="#" style={{ fontSize: 12, color: '#0ea5e9', textDecoration: 'none' }}>
                                    Forgot password?
                                </Link>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock size={15} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="••••••••"
                                    required
                                    style={{
                                        width: '100%', padding: '10px 40px 10px 36px',
                                        border: `1.5px solid ${focusedField === 'password' ? '#0ea5e9' : '#e5e7eb'}`,
                                        borderRadius: 10, fontSize: 13, color: '#111827',
                                        background: '#fff', outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxShadow: focusedField === 'password' ? '0 0 0 3px rgba(14,165,233,0.1)' : 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    style={{
                                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0,
                                    }}
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%', padding: '11px',
                                background: loading ? '#93c5fd' : 'linear-gradient(135deg, #0ea5e9, #0066cc)',
                                border: 'none', borderRadius: 10, color: '#fff',
                                fontSize: 13, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                transition: 'opacity 0.2s, transform 0.15s',
                                boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
                                marginTop: 4,
                            }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.92'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                        >
                            {loading ? (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                <>Sign in <ArrowRight size={14} /></>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '22px 0 18px' }}>
                        <div style={{ flex: 1, height: 1, background: '#f3f4f6' }} />
                        <span style={{ fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap', fontWeight: 500 }}>Demo Accounts</span>
                        <div style={{ flex: 1, height: 1, background: '#f3f4f6' }} />
                    </div>

                    {/* Demo account cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {DEMO_ACCOUNTS.map((account) => (
                            <button
                                key={account.role}
                                type="button"
                                onClick={() => fillDemo(account)}
                                style={{
                                    width: '100%', padding: '12px 14px',
                                    background: '#f9fafb',
                                    border: '1.5px solid #f3f4f6',
                                    borderRadius: 12, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
                                    transition: 'all 0.18s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = '#f0f9ff';
                                    e.currentTarget.style.borderColor = `${account.color}44`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = '#f9fafb';
                                    e.currentTarget.style.borderColor = '#f3f4f6';
                                }}
                            >
                                <div style={{
                                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                    background: `${account.color}14`,
                                    border: `1.5px solid ${account.color}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <account.icon size={18} color={account.color} strokeWidth={2.5} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{account.role}</div>
                                    <div style={{ fontSize: 11, color: '#6b7280', marginTop: 1 }}>{account.description}</div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>{account.email}</div>
                                    <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>{'•'.repeat(account.password.length)}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 20, marginBottom: 0 }}>
                        Don't have an account?{' '}
                        <Link href="/signup" style={{ color: '#0ea5e9', fontWeight: 600, textDecoration: 'none' }}>
                            Create one
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <p style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', marginTop: 20 }}>
                    CrowdSense AI · Aarohan 1.0 · RAIT Navi Mumbai
                </p>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        input::placeholder { color: #c4c9d4; }
      `}</style>
        </div>
    );
}
