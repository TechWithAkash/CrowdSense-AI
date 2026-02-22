'use client';

// ─── Event Context ─────────────────────────────────────────────────────────────
export const EVENT_CONTEXT = {
    name: 'Global Monitor System',
    venue: 'Central Monitoring Hub',
    date: 'Current',
    city: 'Global',
    contact: '1800-CROWDSENSE',
};

// ─── Venue Zones (Indian context) ─────────────────────────────────────────────
export const ZONES = [
    { id: 'Z01', name: 'Main Performance Stage', sector: 'Stage', capacity: 5000, crowd: 4620, lat: 19.071, lng: 72.858 },
    { id: 'Z02', name: 'North Entry Gate', sector: 'Gate N', capacity: 2000, crowd: 380, lat: 19.073, lng: 72.857 },
    { id: 'Z03', name: 'Street Food Court', sector: 'F-Blk', capacity: 3000, crowd: 2150, lat: 19.070, lng: 72.860 },
    { id: 'Z04', name: 'South Arena', sector: 'S-Blk', capacity: 4000, crowd: 3720, lat: 19.069, lng: 72.858 },
    { id: 'Z05', name: 'East Pavilion', sector: 'E-Blk', capacity: 2500, crowd: 1100, lat: 19.071, lng: 72.862 },
    { id: 'Z06', name: 'West Gate Entry (BKC)', sector: 'Gate W', capacity: 1500, crowd: 1380, lat: 19.071, lng: 72.854 },
    { id: 'Z07', name: 'VVIP & Press Enclosure', sector: 'VIP', capacity: 500, crowd: 210, lat: 19.072, lng: 72.859 },
    { id: 'Z08', name: 'Parking Bay Alpha', sector: 'P-Blk', capacity: 3000, crowd: 960, lat: 19.068, lng: 72.856 },
    { id: 'Z09', name: 'Arogya Kendra (Medical)', sector: 'Med', capacity: 200, crowd: 45, lat: 19.070, lng: 72.857 },
    { id: 'Z10', name: 'Expo & Sponsor Pavilion', sector: 'Expo', capacity: 3500, crowd: 2940, lat: 19.069, lng: 72.861 },
    { id: 'Z11', name: 'Emergency Exit — East', sector: 'Exit E', capacity: 800, crowd: 620, lat: 19.071, lng: 72.863 },
    { id: 'Z12', name: 'Niyantran Kaksha (SCR)', sector: 'SCR', capacity: 50, crowd: 18, lat: 19.071, lng: 72.856 },
];

export const getZoneStatus = (crowd, capacity) => {
    const pct = crowd / capacity;
    if (pct >= 0.90) return 'critical';
    if (pct >= 0.70) return 'warning';
    if (pct >= 0.45) return 'moderate';
    return 'safe';
};

export const getDensityPct = (crowd, capacity) => Math.round((crowd / capacity) * 100);

// ─── Heatmap Grid (10×8) ─────────────────────────────────────────────────────
export const generateHeatmap = () => {
    const cells = [];
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 10; c++) {
            const density = Math.floor(Math.random() * 100);
            const status = density >= 90 ? 'critical' : density >= 70 ? 'warning' : density >= 45 ? 'moderate' : 'safe';
            cells.push({ id: `${r}-${c}`, row: r, col: c, density, status });
        }
    }
    return cells;
};

// ─── Alert Feed ───────────────────────────────────────────────────────────────
export const INITIAL_ALERTS = [
    { id: 1, zone: 'Main Performance Stage', sector: 'Stage', severity: 'critical', message: 'Bheed 92% — agle 5 minute mein surge expected. Gate A-1 par 8 jawaan bhejo.', time: '11:32', action: 'Turant 8 policewale Gate Stage-1 par bhejo.', resolved: false },
    { id: 2, zone: 'South Arena', sector: 'S-Blk', severity: 'warning', message: 'Crowd 93% capacity par — South Exit route jam ho rahi hai.', time: '11:28', action: 'Auxiliary exit S-3 kholo, crowd flow redirect karo.', resolved: false },
    { id: 3, zone: 'West Gate Entry (BKC)', sector: 'Gate W', severity: 'critical', message: 'Counter-flow detected — BKC side se panic movement identified.', time: '11:25', action: 'Gate W temporarily band karo, PA announcement chalao.', resolved: false },
    { id: 4, zone: 'Expo & Sponsor Pavilion', sector: 'Expo', severity: 'warning', message: 'Density 84% — AI predicts critical in ~6 min (ML model v2.1).', time: '11:21', action: 'Overflow ko East Pavilion mein route karo via Corridor E-2.', resolved: true },
    { id: 5, zone: 'Emergency Exit — East', sector: 'Exit E', severity: 'warning', message: 'Emergency corridor insufficient — 620 log detected.', time: '11:18', action: 'Emergency corridor clear rakho, 2 security jawaan bhejo.', resolved: false },
    { id: 6, zone: 'Street Food Court', sector: 'F-Blk', severity: 'moderate', message: 'Queue buildup at Stall Row 3 — chaupati section mein jamav.', time: '11:14', action: 'Additional serving counters kholo.', resolved: true },
    { id: 7, zone: 'North Entry Gate', sector: 'Gate N', severity: 'safe', message: 'Inflow normal ho rahi hai — north gate par bheed  kam hui.', time: '11:09', action: 'Koi action nahi chahiye.', resolved: true },
    { id: 8, zone: 'Parking Bay Alpha', sector: 'P-Blk', severity: 'moderate', message: 'Vehicle congestion at Row P-4 — BEST bus bays blocked.', time: '11:05', action: 'Overflow signage activate karo for Parking Bay B.', resolved: false },
];

export const RANDOM_ALERTS = [
    { zone: 'Main Performance Stage', severity: 'critical', message: 'Achanak crowd surge — 200 logon ka ek hi direction mein movement within 30s.', action: 'Turant jawaan bhejo Zone A mein.' },
    { zone: 'South Arena', severity: 'warning', message: 'Flow velocity abnormally high — stampede precursor AI ne detect kiya.', action: 'Gate S-1 se entry slow karo.' },
    { zone: 'Street Food Court', severity: 'moderate', message: 'Queue length safe limit se zyada — chaupati section.', action: 'Counter F-7 par temporary stall kholo.' },
    { zone: 'Expo & Sponsor Pavilion', severity: 'warning', message: 'AI model 78% probability detect karta hai overcrowding in 8 min.', action: 'Hall exit se controlled exit shuru karo.' },
    { zone: 'East Pavilion', severity: 'safe', message: 'Crowd dispersal successful — East Pavilion normal status par wapas.', action: 'Abhi koi action nahi chahiye.' },
    { zone: 'West Gate Entry (BKC)', severity: 'critical', message: 'Bidirectional block — ingress/egress conflict at BKC entry point.', action: 'Entry temporary halt, 4 jawaan bhejo.' },
    { zone: 'North Entry Gate', severity: 'moderate', message: 'Ticketing bottleneck causing rear crowd surge at Gate N scanner.', action: 'Fast-track lane 3 kholo.' },
];

// ─── Crowd Trend ──────────────────────────────────────────────────────────────
export const CROWD_TREND = [
    { time: '09:00', total: 1200, stage: 400, food: 300, south: 500 },
    { time: '09:30', total: 3800, stage: 1400, food: 900, south: 1500 },
    { time: '10:00', total: 7200, stage: 2900, food: 1800, south: 2500 },
    { time: '10:30', total: 10800, stage: 3800, food: 2400, south: 4600 },
    { time: '11:00', total: 14200, stage: 4100, food: 2700, south: 7400 },
    { time: '11:10', total: 15600, stage: 4300, food: 2900, south: 8400 },
    { time: '11:20', total: 16800, stage: 4500, food: 3000, south: 9300 },
    { time: '11:30', total: 17400, stage: 4580, food: 2950, south: 9870 },
    { time: '11:40', total: 18100, stage: 4620, food: 2800, south: 10680 },
    { time: '11:50', total: 18576, stage: 4620, food: 2150, south: 11806 },
];

const THRESHOLD = 16000;
export const CROWD_THRESHOLD = THRESHOLD;

// ─── Response Time Chart ──────────────────────────────────────────────────────
export const RESPONSE_TIMES = [
    { incident: 'Stampede Alert', before: 8.2, after: 1.4 },
    { incident: 'Gate Surge', before: 6.5, after: 0.9 },
    { incident: 'Queue Block', before: 5.1, after: 1.2 },
    { incident: 'Counter-Flow', before: 9.0, after: 1.6 },
    { incident: 'Panic Pattern', before: 11.3, after: 2.1 },
];

// ─── AI Predictions ───────────────────────────────────────────────────────────
export const AI_PREDICTIONS = [
    { zone: 'Main Performance Stage', currentDensity: 92, plus5: 97, plus10: 100, plus15: 104, riskLevel: 'Critical', confidence: 94, recommendation: 'Gate Stage-1 band karo — entry turant rokna zaroori hai.' },
    { zone: 'South Arena', currentDensity: 93, plus5: 96, plus10: 99, plus15: 102, riskLevel: 'Critical', confidence: 89, recommendation: 'Emergency Exit S-4 kholo, 6 Mumbai Police jawaan bhejo.' },
    { zone: 'Expo & Sponsor Pavilion', currentDensity: 84, plus5: 88, plus10: 93, plus15: 97, riskLevel: 'High', confidence: 82, recommendation: 'Hall entrance par 3 jawaan pre-position karo.' },
    { zone: 'West Gate Entry (BKC)', currentDensity: 92, plus5: 89, plus10: 83, plus15: 76, riskLevel: 'Medium', confidence: 78, recommendation: 'Current dispersion strategy jaari rakho — improving.' },
    { zone: 'Street Food Court', currentDensity: 72, plus5: 74, plus10: 71, plus15: 68, riskLevel: 'Medium', confidence: 85, recommendation: 'Chaupati section mein queue monitor karo.' },
    { zone: 'East Pavilion', currentDensity: 44, plus5: 46, plus10: 49, plus15: 52, riskLevel: 'Low', confidence: 91, recommendation: 'Zone stable hai — abhi koi action nahi chahiye.' },
];

// ─── Resources (Indian context) ───────────────────────────────────────────────
export const RESOURCES = [
    { id: 'R01', type: 'Security Officer', name: 'Mumbai Police — Alpha', zone: 'Main Performance Stage', count: 8, status: 'active' },
    { id: 'R02', type: 'Security Officer', name: 'Mumbai Police — Bravo', zone: 'South Arena', count: 6, status: 'active' },
    { id: 'R03', type: 'Security Officer', name: 'Event Security — Charlie', zone: 'West Gate Entry (BKC)', count: 4, status: 'active' },
    { id: 'R04', type: 'Security Officer', name: 'CISF Reserve — Delta', zone: 'North Entry Gate', count: 3, status: 'standby' },
    { id: 'R05', type: 'Medical Unit', name: 'Red Cross Unit — MED-01', zone: 'Arogya Kendra (Medical)', count: 4, status: 'active' },
    { id: 'R06', type: 'Medical Unit', name: 'Govt. AMB — MED-02', zone: 'Expo & Sponsor Pavilion', count: 2, status: 'standby' },
    { id: 'R07', type: 'Fire Safety', name: 'Mumbai Fire Brigade — FS1', zone: 'Main Performance Stage', count: 3, status: 'active' },
    { id: 'R08', type: 'Crowd Control', name: 'RAF Unit — CC-01', zone: 'Street Food Court', count: 2, status: 'standby' },
];

// ─── Camera Feeds ─────────────────────────────────────────────────────────────
export const CAMERAS = [
    { id: 'CAM-01', zone: 'Main Performance Stage', sector: 'Stage', fps: 30, density: 92, status: 'critical', resolution: '4K' },
    { id: 'CAM-02', zone: 'South Arena', sector: 'S-Blk', fps: 30, density: 93, status: 'critical', resolution: '4K' },
    { id: 'CAM-03', zone: 'West Gate Entry (BKC)', sector: 'Gate W', fps: 25, density: 92, status: 'critical', resolution: '1080p' },
    { id: 'CAM-04', zone: 'Expo & Sponsor Pavilion', sector: 'Expo', fps: 30, density: 84, status: 'warning', resolution: '4K' },
    { id: 'CAM-05', zone: 'Street Food Court', sector: 'F-Blk', fps: 25, density: 72, status: 'moderate', resolution: '1080p' },
    { id: 'CAM-06', zone: 'North Entry Gate', sector: 'Gate N', fps: 30, density: 19, status: 'safe', resolution: '4K' },
];

// ─── Overall Stats ────────────────────────────────────────────────────────────
export const INITIAL_STATS = {
    totalCrowd: 18576,
    totalCapacity: 26050,
    criticalZones: 3,
    warningZones: 3,
    activeAlerts: 5,
    officersDeployed: 32,
    incidentsPrevented: 9,
    avgResponseTime: '1.4 min',
};
