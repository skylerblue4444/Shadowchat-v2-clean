import React, { useState, useEffect } from 'react';
import { Globe, Shield, Lock, Eye, EyeOff, Users, Activity, AlertTriangle, CheckCircle, Zap, Map, Flag, Power, Settings, TrendingUp, DollarSign, Cpu, Radio } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const REGIONS = [
  { id: 'NA', name: 'North America', flag: '🇺🇸', users: 847203, revenue: '$2.1M', status: 'ONLINE', access: 'OPEN', servers: 12, threats: 2 },
  { id: 'EU', name: 'Europe', flag: '🇪🇺', users: 624847, revenue: '$1.4M', status: 'ONLINE', access: 'OPEN', servers: 8, threats: 0 },
  { id: 'ASIA', name: 'Asia Pacific', flag: '🌏', users: 892104, revenue: '$1.8M', status: 'ONLINE', access: 'RESTRICTED', servers: 14, threats: 5 },
  { id: 'LATAM', name: 'Latin America', flag: '🌎', users: 284201, revenue: '$420K', status: 'ONLINE', access: 'OPEN', servers: 4, threats: 1 },
  { id: 'MEA', name: 'Middle East & Africa', flag: '🌍', users: 198847, revenue: '$340K', status: 'DEGRADED', access: 'OPEN', servers: 3, threats: 3 },
  { id: 'SHADOW', name: 'Shadow Network', flag: '👁️', users: 44444, revenue: '$840K', status: 'CLASSIFIED', access: 'CLASSIFIED', servers: 7, threats: 0 },
];

const COUNTRY_CONTROLS = [
  { country: 'United States', flag: '🇺🇸', status: 'ACTIVE', kyc: 'REQUIRED', trading: 'ENABLED', adult: 'ENABLED', grey: 'RESTRICTED' },
  { country: 'China', flag: '🇨🇳', status: 'BLOCKED', kyc: 'N/A', trading: 'BLOCKED', adult: 'BLOCKED', grey: 'BLOCKED' },
  { country: 'Russia', flag: '🇷🇺', status: 'RESTRICTED', kyc: 'REQUIRED', trading: 'LIMITED', adult: 'ENABLED', grey: 'ENABLED' },
  { country: 'Germany', flag: '🇩🇪', status: 'ACTIVE', kyc: 'REQUIRED', trading: 'ENABLED', adult: 'AGE_GATE', grey: 'RESTRICTED' },
  { country: 'El Salvador', flag: '🇸🇻', status: 'ACTIVE', kyc: 'OPTIONAL', trading: 'ENABLED', adult: 'ENABLED', grey: 'ENABLED' },
  { country: 'UAE', flag: '🇦🇪', status: 'ACTIVE', kyc: 'REQUIRED', trading: 'ENABLED', adult: 'BLOCKED', grey: 'RESTRICTED' },
  { country: 'North Korea', flag: '🇰🇵', status: 'BLOCKED', kyc: 'N/A', trading: 'BLOCKED', adult: 'BLOCKED', grey: 'BLOCKED' },
  { country: 'Switzerland', flag: '🇨🇭', status: 'ACTIVE', kyc: 'OPTIONAL', trading: 'ENABLED', adult: 'ENABLED', grey: 'ENABLED' },
];

export default function WorldLeaderRegionControl() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [tab, setTab] = useState<'regions' | 'countries' | 'emergency' | 'broadcast'>('regions');
  const [killSwitches, setKillSwitches] = useState<Record<string, boolean>>({});
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [liveUsers, setLiveUsers] = useState(2847203);

  useEffect(() => {
    if (!authenticated) return;
    const t = setInterval(() => setLiveUsers(u => u + Math.floor(Math.random() * 100 - 50)), 2000);
    return () => clearInterval(t);
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="p-6 bg-red-600/10 border border-red-500/30 inline-block mx-auto">
            <Globe className="h-16 w-16 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-red-500">WORLD_LEADER_ACCESS</h1>
            <p className="text-slate-500 text-sm mt-2">Global Region Control · Classified Level 10 · SKY444 Command</p>
          </div>
          <div className="bg-red-950/30 border border-red-800 p-4 text-left">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold mb-2">
              <AlertTriangle className="h-4 w-4" /> RESTRICTED ACCESS
            </div>
            <p className="text-red-600 text-xs">This panel controls global platform access, regional restrictions, and emergency protocols. Authorized personnel only.</p>
          </div>
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              className="w-full bg-slate-900 border border-red-800 focus:border-red-500 text-white text-center text-2xl tracking-widest py-4 outline-none"
              placeholder="• • • • • • • •"
              value={pin}
              onChange={e => setPin(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && pin.length >= 4 && setAuthenticated(true)}
              maxLength={8}
            />
            <button onClick={() => setShowPin(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <button
            onClick={() => pin.length >= 4 && setAuthenticated(true)}
            disabled={pin.length < 4}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-800 text-white font-black py-4 text-sm uppercase tracking-widest transition-all"
          >
            AUTHENTICATE
          </button>
          <p className="text-slate-700 text-[10px]">Demo: any 4+ character PIN · Mock interface only</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans">
      {/* Header */}
      <div className="bg-red-950/20 border-b border-red-900 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="h-6 w-6 text-red-500" />
          <div>
            <h1 className="text-lg font-black text-red-400">WORLD_LEADER_CONTROL_v20</h1>
            <p className="text-slate-500 text-xs">Global Region Management · SKY444 Command Authority</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-xl font-black text-green-400 tabular-nums">{liveUsers.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1"><Activity className="h-3 w-3 text-green-500 animate-pulse" /> Live Users</div>
          </div>
          <button onClick={() => setAuthenticated(false)} className="flex items-center gap-2 border border-red-800 text-red-400 text-xs font-bold px-3 py-2 hover:bg-red-950/30 transition-all">
            <Power className="h-3 w-3" /> LOGOUT
          </button>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 p-4 border-b border-slate-900">
        {[
          { label: 'Total Users', value: '2.85M', color: 'blue' },
          { label: 'Active Regions', value: '5/6', color: 'green' },
          { label: 'Global Revenue', value: '$7.1M', color: 'green' },
          { label: 'Active Threats', value: '11', color: 'red' },
          { label: 'Servers Online', value: '48/48', color: 'green' },
          { label: 'Uptime', value: '99.97%', color: 'green' },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 p-3 text-center">
            <div className={`text-lg font-black text-${s.color}-400`}>{s.value}</div>
            <div className="text-[9px] text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-4 border-b border-slate-900">
        {(['regions', 'countries', 'emergency', 'broadcast'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      <div className="p-4">
        {tab === 'regions' && (
          <div className="space-y-3">
            {REGIONS.map(region => (
              <div key={region.id} className={`border p-4 ${region.status === 'CLASSIFIED' ? 'border-purple-800 bg-purple-950/10' : region.status === 'DEGRADED' ? 'border-yellow-800 bg-yellow-950/10' : 'border-slate-800 bg-slate-900'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{region.flag}</span>
                    <div>
                      <div className="text-sm font-black">{region.name}</div>
                      <div className="text-[10px] text-slate-500">{region.servers} servers · {region.users.toLocaleString()} users</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {region.threats > 0 && (
                      <span className="text-[9px] border border-red-800 text-red-400 px-2 py-0.5 font-bold animate-pulse">{region.threats} THREATS</span>
                    )}
                    <span className={`text-[9px] font-black px-2 py-0.5 border ${region.status === 'ONLINE' ? 'border-green-800 text-green-400' : region.status === 'CLASSIFIED' ? 'border-purple-800 text-purple-400' : 'border-yellow-800 text-yellow-400'}`}>{region.status}</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 border ${region.access === 'OPEN' ? 'border-green-800 text-green-400' : region.access === 'CLASSIFIED' ? 'border-purple-800 text-purple-400' : 'border-amber-800 text-amber-400'}`}>{region.access}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-800 p-2 text-center"><div className="font-bold text-green-400">{region.revenue}</div><div className="text-[9px] text-slate-500">Revenue</div></div>
                  <div className="bg-slate-800 p-2 text-center"><div className="font-bold text-blue-400">{region.users.toLocaleString()}</div><div className="text-[9px] text-slate-500">Users</div></div>
                  <div className="bg-slate-800 p-2 text-center"><div className="font-bold text-white">{region.servers}</div><div className="text-[9px] text-slate-500">Servers</div></div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="border border-slate-700 text-slate-400 text-[10px] font-bold px-3 py-1.5 hover:border-slate-500 transition-all">MANAGE</button>
                  <button
                    onClick={() => setKillSwitches(prev => ({ ...prev, [region.id]: !prev[region.id] }))}
                    className={`text-[10px] font-bold px-3 py-1.5 border transition-all ${killSwitches[region.id] ? 'border-green-700 text-green-400 bg-green-950/30' : 'border-red-800 text-red-400 hover:bg-red-950/30'}`}
                  >
                    {killSwitches[region.id] ? '✓ RESTORED' : '⚡ KILL SWITCH'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'countries' && (
          <div className="space-y-2">
            <div className="grid grid-cols-6 gap-2 text-[9px] text-slate-500 uppercase px-3 mb-2">
              <span className="col-span-2">Country</span><span>Status</span><span>KYC</span><span>Trading</span><span>Grey Area</span>
            </div>
            {COUNTRY_CONTROLS.map(c => (
              <div key={c.country} className={`grid grid-cols-6 gap-2 items-center border p-3 ${c.status === 'BLOCKED' ? 'border-red-900 bg-red-950/10' : c.status === 'RESTRICTED' ? 'border-yellow-900 bg-yellow-950/10' : 'border-slate-800 bg-slate-900'}`}>
                <div className="col-span-2 flex items-center gap-2">
                  <span className="text-lg">{c.flag}</span>
                  <span className="text-xs font-bold">{c.country}</span>
                </div>
                <span className={`text-[9px] font-black px-1.5 py-0.5 border ${c.status === 'ACTIVE' ? 'border-green-800 text-green-400' : c.status === 'BLOCKED' ? 'border-red-800 text-red-400' : 'border-yellow-800 text-yellow-400'}`}>{c.status}</span>
                <span className="text-[9px] text-slate-400">{c.kyc}</span>
                <span className={`text-[9px] font-bold ${c.trading === 'ENABLED' ? 'text-green-400' : c.trading === 'BLOCKED' ? 'text-red-400' : 'text-yellow-400'}`}>{c.trading}</span>
                <span className={`text-[9px] font-bold ${c.grey === 'ENABLED' ? 'text-green-400' : c.grey === 'BLOCKED' ? 'text-red-400' : 'text-yellow-400'}`}>{c.grey}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'emergency' && (
          <div className="space-y-4">
            <div className="bg-red-950/30 border border-red-800 p-4">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-2"><AlertTriangle className="h-5 w-5" /> EMERGENCY CONTROLS</div>
              <p className="text-xs text-slate-400">These controls affect all users globally. Use with extreme caution.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Global Trading Halt', desc: 'Pause all trading activity platform-wide', color: 'red', icon: Power },
                { label: 'Withdrawal Freeze', desc: 'Block all withdrawals temporarily', color: 'red', icon: Lock },
                { label: 'Maintenance Mode', desc: 'Show maintenance page to all users', color: 'amber', icon: Settings },
                { label: 'DDoS Protection MAX', desc: 'Enable maximum DDoS mitigation', color: 'blue', icon: Shield },
                { label: 'Force 2FA All Users', desc: 'Require 2FA for all active sessions', color: 'amber', icon: Shield },
                { label: 'Shadow Network Offline', desc: 'Take shadow network offline', color: 'purple', icon: Eye },
              ].map(({ label, desc, color, icon: Icon }) => (
                <div key={label} className={`border border-${color}-900 bg-${color}-950/10 p-4 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 text-${color}-500`} />
                    <div>
                      <div className="text-xs font-bold">{label}</div>
                      <div className="text-[10px] text-slate-500">{desc}</div>
                    </div>
                  </div>
                  <button className={`text-[10px] font-black px-3 py-2 border border-${color}-800 text-${color}-400 hover:bg-${color}-950/30 transition-all`}>ACTIVATE</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'broadcast' && (
          <div className="max-w-lg space-y-4">
            <h3 className="text-sm font-bold text-slate-400">Global Broadcast Message</h3>
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">Target Audience</label>
              <select className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none">
                {['All Users (2.85M)', 'Premium Members', 'Traders Only', 'Specific Region', 'Admin Team'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">Message Type</label>
              <div className="flex gap-2">
                {['Info', 'Warning', 'Critical', 'Maintenance'].map(t => (
                  <button key={t} className={`flex-1 py-2 text-xs font-bold border transition-all ${t === 'Info' ? 'border-blue-700 text-blue-400 bg-blue-950/30' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">Message</label>
              <textarea
                className="w-full bg-slate-900 border border-slate-700 focus:border-red-600 text-white px-3 py-3 text-sm outline-none resize-none"
                rows={4}
                placeholder="Enter broadcast message to all users..."
                value={broadcastMsg}
                onChange={e => setBroadcastMsg(e.target.value)}
              />
            </div>
            {!broadcastSent ? (
              <button onClick={() => { if (broadcastMsg.trim()) setBroadcastSent(true); }} className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                <Radio className="h-4 w-4" /> BROADCAST TO ALL USERS
              </button>
            ) : (
              <div className="bg-green-950/30 border border-green-800 p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-sm font-black text-green-400">BROADCAST SENT</div>
                <div className="text-[10px] text-slate-400 mt-1">Message delivered to 2.85M users</div>
                <button onClick={() => { setBroadcastSent(false); setBroadcastMsg(''); }} className="mt-2 text-[10px] text-red-400 hover:text-red-300">Send another →</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
