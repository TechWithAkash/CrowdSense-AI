'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

// ─── useInterval ──────────────────────────────────────────────────────────────
export function useInterval(callback, delay) {
    const savedCallback = useRef(callback);
    useEffect(() => { savedCallback.current = callback; }, [callback]);
    useEffect(() => {
        if (delay == null) return;
        const id = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(id);
    }, [delay]);
}

// ─── useClock ─────────────────────────────────────────────────────────────────
export function useClock() {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
            setDate(now.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }));
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return { time, date };
}

// ─── useCountUp — animates a number ──────────────────────────────────────────
export function useCountUp(target, duration = 1000) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setValue(target); clearInterval(timer); }
            else { setValue(Math.floor(start)); }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return value;
}
