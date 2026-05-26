import React, { useState } from 'react';
import { Eye, AlertTriangle, Search, Shield, Lock, Globe, Database, Activity, CheckCircle, XCircle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const MOCK_ALERTS = [
  { id: 1, type: 'Email Breach', detail: 'user@sky444.com found in breach database', severity: 'HIGH', source: 'HaveIBeenPwned API', time: '2h ago', resolved: false },
  { id: 2, type: 'Password Leak', detail: 'Hashed credential found on paste site', severity: 'CRIT', source: 'Dark Web Scan', time: '6h ago', resolved: false },
  { id: 3, type: 'Domain Mention', detail: 'sky444.com mentioned in threat forum', severity: 'MED', source: 'Forum Monitor', time: '1d ago', resolved: true },
  { id: 4, type: 'IP Blacklist', detail: 'IP 104.21.44.4 flagged by 2 feeds', severity: 'LOW', source: 'Threat Intel Feed', time: '2d ago', resolved: true },
];

const SCAN_CATEGORIES = [
  { label: 'Email Addresses', icon: '📧', status: 'CLEAN', count: 3 },
  { label: 'Passwords', icon: '🔑', status: 'ALERT', count: 1 },
  { label: 'Credit Cards', icon: '💳', status: 'CLEAN', count: 2 },
  { label: 'Social Security', icon: '🪪', status: 'CLEAN', count: 1 },
  { label: 'Phone Numbers', icon: '📱', status: 'CLEAN', count: 2 },
  { label: 'Crypto Wallets', icon: '₿', status: 'CLEAN', count: 4 },
];

export default function DarkWebIntelMonitor() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [query, setQuery] = useState('');

  const startScan = () => {
    setScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) { clearInterval(interval); setScanning(false); return 100; }
        return p + 5;
      });
    }, 120);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Eye className="h-6 w-6 text-red-500" /> DARK_WEB_INTEL_MONITOR
          </h1>
          <p className="text-slate-500 text-xs mt-1">Identity & breach monitoring · Mock Demo · SKY444 Protect</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-red-400">2</div>
          <div className="text-[10px] text-slate-500">Active Alerts</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-700 px-4">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            className="flex-1 bg-transparent text-sm py-3 outline-none placeholder-slate-600"
            placeholder="Search email, phone, username..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <button onClick={startScan} disabled={scanning} className="bg-red-600 hover:bg-red-700 disabled:bg-slate-800 text-white font-bold text-sm px-6 py-3 transition-all">
          {scanning ? `SCANNING ${scanProgress}%` : 'SCAN NOW'}
        </button>
      </div>

      {scanning && (
        <div className="mb-6 bg-slate-900 border border-red-900 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-red-500 animate-pulse" />
            <span className="text-xs font-bold text-red-400">Scanning dark web sources...</span>
          </div>
          <div className="bg-slate-800 h-2">
            <div className="h-full bg-red-500 transition-all" style={{ width: `${scanProgress}%` }} />
          </div>
          <div className="text-[10px] text-slate-600 mt-1">{scanProgress}% complete · Checking 847 breach databases</div>
        </div>
      )}

      {/* Category Status */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {SCAN_CATEGORIES.map(cat => (
          <div key={cat.label} className={`border p-3 text-center ${cat.status === 'ALERT' ? 'border-red-800 bg-red-950/20' : 'border-slate-800 bg-slate-900'}`}>
            <div className="text-2xl mb-1">{cat.icon}</div>
            <div className="text-[10px] font-bold text-slate-400">{cat.label}</div>
            <div className={`text-[9px] font-black mt-1 ${cat.status === 'ALERT' ? 'text-red-400' : 'text-green-400'}`}>{cat.status}</div>
            <div className="text-[9px] text-slate-600">{cat.count} monitored</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-3">Intelligence Alerts</h3>
      <div className="space-y-2">
        {MOCK_ALERTS.map(alert => (
          <div key={alert.id} className={`flex items-start justify-between p-4 border ${alert.resolved ? 'border-slate-800 bg-slate-900 opacity-60' : alert.severity === 'CRIT' ? 'border-red-800 bg-red-950/20' : alert.severity === 'HIGH' ? 'border-orange-800 bg-orange-950/10' : 'border-slate-800 bg-slate-900'}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className={`h-4 w-4 mt-0.5 ${alert.severity === 'CRIT' ? 'text-red-500' : alert.severity === 'HIGH' ? 'text-orange-500' : alert.severity === 'MED' ? 'text-yellow-500' : 'text-slate-500'}`} />
              <div>
                <div className="text-sm font-bold">{alert.type}</div>
                <div className="text-xs text-slate-400 mt-0.5">{alert.detail}</div>
                <div className="text-[10px] text-slate-600 mt-1">{alert.source} · {alert.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[9px] px-2 py-0.5 border font-bold ${alert.severity === 'CRIT' ? 'border-red-700 text-red-400' : alert.severity === 'HIGH' ? 'border-orange-700 text-orange-400' : alert.severity === 'MED' ? 'border-yellow-700 text-yellow-400' : 'border-slate-700 text-slate-400'}`}>{alert.severity}</span>
              {alert.resolved ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
