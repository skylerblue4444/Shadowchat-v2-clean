import React, { useState } from 'react';
import { Settings, Cpu, Shield, Eye, Zap, Database, Globe, Lock, Bell, Code2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const SECTIONS = [
  {
    title: 'Engineer Mode',
    icon: Cpu,
    settings: [
      { key: 'engineer_mode', label: 'Engineer Mode Active', type: 'toggle', value: true, desc: 'Unlocks advanced developer features' },
      { key: 'debug_overlay', label: 'Debug Overlay', type: 'toggle', value: false, desc: 'Show performance metrics on all pages' },
      { key: 'api_logs', label: 'API Request Logs', type: 'toggle', value: true, desc: 'Log all API calls to console' },
      { key: 'feature_flags', label: 'Experimental Features', type: 'toggle', value: false, desc: 'Enable unreleased features (unstable)' },
    ],
  },
  {
    title: 'Grey Area Mode',
    icon: Eye,
    settings: [
      { key: 'grey_market', label: 'Grey Area Market Access', type: 'toggle', value: true, desc: 'Enable sovereign P2P marketplace' },
      { key: 'anon_payments', label: 'Anonymous Payment Rails', type: 'toggle', value: true, desc: 'XMR, ZCash, Shadow Rail' },
      { key: 'otc_desk', label: 'OTC Trading Desk', type: 'toggle', value: true, desc: 'Large-block P2P crypto trades' },
      { key: 'no_kyc_mode', label: 'No-KYC Mode', type: 'toggle', value: false, desc: 'Skip identity verification (limited features)' },
    ],
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    settings: [
      { key: 'vpn_auto', label: 'Auto-Connect VPN', type: 'toggle', value: true, desc: 'Always connect VPN on launch' },
      { key: 'zero_logs', label: 'Zero-Log Mode', type: 'toggle', value: true, desc: 'Never store activity logs' },
      { key: 'ghost_mode', label: 'Ghost Mode', type: 'toggle', value: false, desc: 'Appear offline to all contacts' },
      { key: 'quantum_encrypt', label: 'Quantum Encryption', type: 'toggle', value: true, desc: 'Use post-quantum cryptography' },
    ],
  },
  {
    title: 'Performance',
    icon: Zap,
    settings: [
      { key: 'turbo_mode', label: 'Turbo Mode', type: 'toggle', value: false, desc: 'Aggressive caching & prefetch' },
      { key: 'lazy_load', label: 'Lazy Loading', type: 'toggle', value: true, desc: 'Load pages on demand' },
      { key: 'ws_reconnect', label: 'Auto WebSocket Reconnect', type: 'toggle', value: true, desc: 'Reconnect on connection drop' },
    ],
  },
];

export default function EngineerModeSettings() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [settings, setSettings] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    SECTIONS.forEach(s => s.settings.forEach(setting => { init[setting.key] = setting.value; }));
    return init;
  });

  const toggle = (key: string) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Settings className="h-6 w-6 text-green-500" /> ENGINEER_SETTINGS</h1>
          <p className="text-slate-500 text-xs mt-1">Advanced configuration · Wave 19 · Super App</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-green-400 border border-green-800 px-3 py-1.5">
          <Cpu className="h-3 w-3" /> ENGINEER MODE ACTIVE
        </div>
      </div>

      <div className="space-y-6">
        {SECTIONS.map(section => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2 p-4 border-b border-slate-800">
                <Icon className="h-4 w-4 text-green-500" />
                <h2 className="text-xs font-bold uppercase tracking-widest">{section.title}</h2>
              </div>
              <div className="divide-y divide-slate-800">
                {section.settings.map(s => (
                  <div key={s.key} className="flex items-center justify-between p-4">
                    <div>
                      <div className="text-sm font-bold">{s.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{s.desc}</div>
                    </div>
                    <button
                      onClick={() => toggle(s.key)}
                      className={`relative w-10 h-5 rounded-full transition-all ${settings[s.key] ? 'bg-green-600' : 'bg-slate-700'}`}
                    >
                      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${settings[s.key] ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-3">
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black py-3 text-xs uppercase tracking-widest transition-all">
          SAVE SETTINGS
        </button>
        <button className="border border-slate-700 text-slate-400 hover:border-slate-500 px-6 py-3 text-xs font-bold transition-all">
          RESET DEFAULTS
        </button>
      </div>
    </div>
  );
}
