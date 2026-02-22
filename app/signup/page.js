'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Eye, EyeOff, ArrowRight, User, Lock, Mail, CheckCircle } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [focusedField, setFocusedField] = useState(null);

    const update = (key, val) => {
        setForm((f) => ({ ...f, [key]: val }));
        setErrors((e) => ({ ...e, [key]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Full name is required';
        if (!form.email.includes('@')) errs.email = 'Enter a valid email';
        if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
        if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        setSuccess(true);
        setTimeout(() => router.push('/login'), 2000);
    };

    const fieldStyle = (key) => ({
        width: '100%', padding: '10px 12px 10px 36px',
        border: `1.5px solid ${errors[key] ? '#fca5a5' : focusedField === key ? '#0ea5e9' : '#e5e7eb'}`,
        borderRadius: 10, fontSize: 13, color: '#111827',
        background: errors[key] ? '#fff8f8' : '#fff', outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: focusedField === key && !errors[key] ? '0 0 0 3px rgba(14,165,233,0.1)' : 'none',
        boxSizing: 'border-box',
    });

    if (success) {
        return (
            <div style={{ minHeight: '100vh', background: '#f8f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif" }}>
                <div style={{ textAlign: 'center', padding: 32 }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <CheckCircle size={32} color="#16a34a" />
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>Account Created!</h2>
                    <p style={{ fontSize: 13, color: '#6b7280' }}>Redirecting you to sign in…</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh', background: '#f8f9fc',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', fontFamily: "'Inter', sans-serif",
        }}>
            <div style={{ width: '100%', maxWidth: 420 }}>

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: 'linear-gradient(135deg, #0ea5e9, #0066cc)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 14px', boxShadow: '0 4px 16px rgba(14,165,233,0.25)',
                    }}>
                        <Shield size={22} color="#fff" />
                    </div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>Create an account</h1>
                    <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>Join CrowdSense AI platform</p>
                </div>

                {/* Card */}
                <div style={{
                    background: '#fff', borderRadius: 18, border: '1px solid #e5e7eb',
                    padding: '32px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
                }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                        {/* Full Name */}
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={15} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => update('name', e.target.value)}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Your full name"
                                    style={fieldStyle('name')}
                                />
                            </div>
                            {errors.name && <p style={{ fontSize: 11, color: '#dc2626', marginTop: 5 }}>{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={15} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => update('email', e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="you@example.com"
                                    style={fieldStyle('email')}
                                />
                            </div>
                            {errors.email && <p style={{ fontSize: 11, color: '#dc2626', marginTop: 5 }}>{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={15} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(e) => update('password', e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Min. 6 characters"
                                    style={{ ...fieldStyle('password'), paddingRight: 40 }}
                                />
                                <button type="button" onClick={() => setShowPassword(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}>
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {errors.password && <p style={{ fontSize: 11, color: '#dc2626', marginTop: 5 }}>{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={15} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={(e) => update('confirmPassword', e.target.value)}
                                    onFocus={() => setFocusedField('confirmPassword')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Re-enter password"
                                    style={fieldStyle('confirmPassword')}
                                />
                            </div>
                            {errors.confirmPassword && <p style={{ fontSize: 11, color: '#dc2626', marginTop: 5 }}>{errors.confirmPassword}</p>}
                        </div>

                        {/* Password strength indicator */}
                        {form.password.length > 0 && (
                            <div>
                                <div style={{ display: 'flex', gap: 4 }}>
                                    {[1, 2, 3, 4].map(i => {
                                        const len = form.password.length;
                                        const filled = i <= (len < 4 ? 1 : len < 6 ? 2 : len < 10 ? 3 : 4);
                                        const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
                                        return (
                                            <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: filled ? colors[Math.min(len < 4 ? 0 : len < 6 ? 1 : len < 10 ? 2 : 3, 3)] : '#f3f4f6', transition: 'background 0.3s' }} />
                                        );
                                    })}
                                </div>
                                <p style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>
                                    {form.password.length < 4 ? 'Weak' : form.password.length < 6 ? 'Fair' : form.password.length < 10 ? 'Good' : 'Strong'} password
                                </p>
                            </div>
                        )}

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
                                boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
                                marginTop: 4, transition: 'opacity 0.2s',
                            }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.92'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                        >
                            {loading ? 'Creating account…' : <> Create Account <ArrowRight size={14} /> </>}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 20, marginBottom: 0 }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: '#0ea5e9', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
                    </p>
                </div>

                <p style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', marginTop: 20 }}>
                    CrowdSense AI · Aarohan 1.0 · RAIT Navi Mumbai
                </p>
            </div>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #c4c9d4; }
      `}</style>
        </div>
    );
}
