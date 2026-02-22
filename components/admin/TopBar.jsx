'use client';
import { Bell, Wifi, Cpu, Clock } from 'lucide-react';

export default function AdminTopBar({ alertCount = 5, title = 'Overview', sub = 'Live event monitoring' }) {
    return (
        <header style={{
            height: 56, background: 'var(--bg-2)',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center',
            padding: '0 24px', gap: 16,
            position: 'sticky', top: 0, zIndex: 50,
        }}>
            <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)', letterSpacing: '-0.01em' }}>{title}</h1>
                <p style={{ fontSize: 11, color: 'var(--t3)' }}>{sub}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Status pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 99, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <span className="dot dot-danger" />
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--danger)' }}>LIVE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 99, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <Wifi size={12} color="var(--safe)" />
                    <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--t2)' }}>All Systems</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 99, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <Cpu size={12} color="var(--blue)" />
                    <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--t2)' }}>AI Active</span>
                </div>
                {/* Alert bell */}
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bell size={15} color="var(--t2)" />
                    </div>
                    {alertCount > 0 && (
                        <div style={{ position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16, borderRadius: '50%', background: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', padding: '0 3px' }}>
                            {alertCount}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
