import React, { useState, useEffect } from 'react';
import { Shield, Eye, AlertTriangle, Lock, Wifi, Smartphone, Globe, Activity, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const MOCK_THREATS = [
  { id: 1, type: 'Phishing Attempt', severity: 'HIGH', ip: '185.220.101.47', time: '2m ago', blocked: true },
  { id: 2, type: 'Port Scan', severity: 'MED', ip: '45.33.32.156', time: '7m ago', blocked: true },
  { id: 3, type: 'Brute Force', severity: 'HIGH', ip: '192.168.1.104', time: '12m ago', blocked: true },
  { id: 4, type: 'SQL Injection', severity: 'CRIT', ip: '103.21.244.0', time: '18m ago', blocked: true },
  { id: 5, type: 'DDoS Spike', severity: 'MED', ip: 'Multiple', time: '31m ago', blocked: true },
];

const MOCK_DEVICES = [
  { name: 'iPhone 15 Pro', os: 'iOS 17.4', status: 'protected', location: 'Chicago, IL' },
  { name: 'MacBook Pro', os: 'macOS 14.4', status: 'protected', location: 'Chicago, IL' },
  { name: 'Samsung Galaxy S24', os: 'Android 14', status: 'warning', location: 'Unknown' },
  { name: 'Windows PC', os: 'Win 11', status: 'protected', location: 'Chicago, IL' },
];

export default function ProtectionMonitorDashboard() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [score, setScore] = useState(94);
  const [activeTab, setActiveTab] = useState<'threats' | 'devices' | 'network' | 'vpn'>('threats');
  const [vpnOn, setVpnOn] = useState(true);
  const [firewallOn, setFirewallOn] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setScore(s => Math.min(100, Math.max(80, s + (Math.random() > 0.5 ? 1 : -1)))), 3000);
    return () => clearInterval(t);
  }, []);

  const scoreColor = score >= 90 ? 'text-green-400' : score >= 75 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Shield className="h-7 w-7 text-blue-500" /> PROTECTION_MONITOR
          </h1>
          <p className="text-slate-500 text-xs mt-1">Real-time security & device monitoring — SKY444 Protect v19</p>
        </div>
        <div className="text-center">
          <div className={`text-5xl font-black ${scoreColor}`}>{score}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-widest">Security Score</div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Threats Blocked', value: '1,247', icon: Shield, color: 'green' },
          { label: 'Devices Protected', value: '4', icon: Smartphone, color: 'blue' },
          { label: 'VPN Status', value: vpnOn ? 'ACTIVE' : 'OFF', icon: Globe, color: vpnOn ? 'green' : 'red' },
          { label: 'Firewall', value: firewallOn ? 'ARMED' : 'OFF', icon: Lock, color: firewallOn ? 'green' : 'red' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 p-4 rounded-none">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`h-4 w-4 text-${color}-500`} />
              <span className="text-[10px] text-slate-500 uppercase">{label}</span>
            </div>
            <div className={`text-xl font-black text-${color}-400`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Quick Toggles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'VPN', on: vpnOn, toggle: () => setVpnOn(v => !v) },
          { label: 'Firewall', on: firewallOn, toggle: () => setFirewallOn(v => !v) },
          { label: 'Ad Block', on: true, toggle: () => {} },
          { label: 'Dark Web Scan', on: true, toggle: () => {} },
        ].map(({ label, on, toggle }) => (
          <button
            key={label}
            onClick={toggle}
            className={`flex items-center justify-between p-3 border transition-all ${on ? 'border-green-700 bg-green-950/30' : 'border-red-900 bg-red-950/20'}`}
          >
            <span className="text-xs font-bold">{label}</span>
            <span className={`text-[10px] font-black ${on ? 'text-green-400' : 'text-red-400'}`}>{on ? 'ON' : 'OFF'}</span>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        {(['threats', 'devices', 'network', 'vpn'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold uppercase transition-all ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'threats' && (
        <div className="space-y-2">
          {MOCK_THREATS.map(t => (
            <div key={t.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className={`h-4 w-4 ${t.severity === 'CRIT' ? 'text-red-500' : t.severity === 'HIGH' ? 'text-orange-500' : 'text-yellow-500'}`} />
                <div>
                  <div className="text-xs font-bold">{t.type}</div>
                  <div className="text-[10px] text-slate-500">{t.ip}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[9px] px-2 py-0.5 border font-bold ${t.severity === 'CRIT' ? 'border-red-700 text-red-400' : t.severity === 'HIGH' ? 'border-orange-700 text-orange-400' : 'border-yellow-700 text-yellow-400'}`}>{t.severity}</span>
                <span className="text-[10px] text-slate-600">{t.time}</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'devices' && (
        <div className="space-y-2">
          {MOCK_DEVICES.map(d => (
            <div key={d.name} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <Smartphone className={`h-5 w-5 ${d.status === 'protected' ? 'text-green-500' : 'text-yellow-500'}`} />
                <div>
                  <div className="text-sm font-bold">{d.name}</div>
                  <div className="text-[10px] text-slate-500">{d.os} · {d.location}</div>
                </div>
              </div>
              <span className={`text-[10px] font-black px-3 py-1 border ${d.status === 'protected' ? 'border-green-700 text-green-400 bg-green-950/30' : 'border-yellow-700 text-yellow-400 bg-yellow-950/30'}`}>
                {d.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'network' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Download', value: '847 Mbps', icon: Activity, color: 'blue' },
            { label: 'Upload', value: '312 Mbps', icon: Zap, color: 'green' },
            { label: 'Latency', value: '12ms', icon: Clock, color: 'green' },
            { label: 'DNS Leaks', value: 'NONE', icon: Eye, color: 'green' },
            { label: 'ISP Visible', value: 'NO (VPN)', icon: Globe, color: 'green' },
            { label: 'WebRTC Leak', value: 'BLOCKED', icon: Shield, color: 'green' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-slate-900 border border-slate-800 p-4 flex items-center gap-3">
              <Icon className={`h-5 w-5 text-${color}-500`} />
              <div>
                <div className="text-[10px] text-slate-500">{label}</div>
                <div className={`text-sm font-bold text-${color}-400`}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'vpn' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-green-800 p-6 text-center">
            <Globe className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-black text-green-400 mb-1">VPN ACTIVE</div>
            <div className="text-slate-500 text-sm">Connected via SKY444 Mesh · Chicago Exit Node</div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div><div className="text-lg font-bold text-white">AES-256</div><div className="text-[10px] text-slate-500">Encryption</div></div>
              <div><div className="text-lg font-bold text-white">WireGuard</div><div className="text-[10px] text-slate-500">Protocol</div></div>
              <div><div className="text-lg font-bold text-white">No Logs</div><div className="text-[10px] text-slate-500">Policy</div></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Chicago', 'New York', 'London', 'Tokyo', 'Frankfurt', 'Singapore', 'Sydney', 'Toronto'].map(city => (
              <button key={city} className={`p-3 border text-xs font-bold transition-all ${city === 'Chicago' ? 'border-green-600 text-green-400 bg-green-950/30' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
