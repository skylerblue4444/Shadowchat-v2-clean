import React, { useState, useEffect } from 'react';
import { Smartphone, Wifi, Battery, MapPin, Activity, Shield, Eye, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const DEVICES = [
  { id: 1, name: 'My iPhone 15 Pro', os: 'iOS 17.4', battery: 78, signal: 4, location: 'Chicago, IL', status: 'protected', lastSeen: 'Now', apps: 127, threats: 0 },
  { id: 2, name: 'Work MacBook', os: 'macOS 14.4', battery: 92, signal: 5, location: 'Chicago, IL', status: 'protected', lastSeen: '2m ago', apps: 89, threats: 0 },
  { id: 3, name: 'Galaxy S24', os: 'Android 14', battery: 34, signal: 3, location: 'Unknown', status: 'warning', lastSeen: '1h ago', apps: 203, threats: 2 },
];

export default function PhoneMonitorApp() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [selected, setSelected] = useState(DEVICES[0]);
  const [tab, setTab] = useState<'overview' | 'apps' | 'location' | 'threats'>('overview');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Smartphone className="h-6 w-6 text-blue-500" /> PHONE_MONITOR_APP</h1>
          <p className="text-slate-500 text-xs mt-1">Device monitoring & protection · Cheap & quick · Wave 19 Mock</p>
        </div>
      </div>

      {/* Device List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {DEVICES.map(d => (
          <div key={d.id} onClick={() => setSelected(d)} className={`border p-4 cursor-pointer transition-all ${selected.id === d.id ? 'border-blue-600 bg-blue-950/20' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}>
            <div className="flex items-center justify-between mb-2">
              <Smartphone className={`h-5 w-5 ${d.status === 'protected' ? 'text-green-500' : 'text-yellow-500'}`} />
              <span className={`text-[9px] font-black px-2 py-0.5 border ${d.status === 'protected' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>{d.status.toUpperCase()}</span>
            </div>
            <div className="text-sm font-bold mb-1">{d.name}</div>
            <div className="text-[10px] text-slate-500">{d.os}</div>
            <div className="flex items-center gap-3 mt-2 text-[10px]">
              <span className="flex items-center gap-1 text-green-400"><Battery className="h-3 w-3" /> {d.battery}%</span>
              <span className="flex items-center gap-1 text-blue-400"><Wifi className="h-3 w-3" /> {d.signal}/5</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Tabs */}
      <div className="flex gap-1 mb-4">
        {(['overview', 'apps', 'location', 'threats'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Battery', value: `${selected.battery}%`, icon: Battery, color: selected.battery > 50 ? 'green' : selected.battery > 20 ? 'yellow' : 'red' },
            { label: 'Signal', value: `${selected.signal}/5`, icon: Wifi, color: 'blue' },
            { label: 'Apps', value: selected.apps.toString(), icon: Activity, color: 'purple' },
            { label: 'Threats', value: selected.threats.toString(), icon: AlertTriangle, color: selected.threats > 0 ? 'red' : 'green' },
            { label: 'Location', value: selected.location, icon: MapPin, color: 'amber' },
            { label: 'Last Seen', value: selected.lastSeen, icon: Eye, color: 'blue' },
            { label: 'OS', value: selected.os, icon: Smartphone, color: 'slate' },
            { label: 'Protection', value: selected.status === 'protected' ? 'ACTIVE' : 'WARN', icon: Shield, color: selected.status === 'protected' ? 'green' : 'yellow' },
          ].map(m => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="bg-slate-900 border border-slate-800 p-4">
                <Icon className={`h-4 w-4 text-${m.color}-500 mb-2`} />
                <div className="text-[10px] text-slate-500">{m.label}</div>
                <div className={`text-sm font-bold text-${m.color}-400`}>{m.value}</div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'apps' && (
        <div className="space-y-2">
          {['WhatsApp', 'Instagram', 'Chrome', 'Gmail', 'Spotify', 'TikTok', 'Telegram', 'Signal'].map((app, i) => (
            <div key={app} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold">{app[0]}</div>
                <div>
                  <div className="text-xs font-bold">{app}</div>
                  <div className="text-[10px] text-slate-500">Last used: {i < 3 ? 'Today' : `${i}d ago`}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] px-2 py-0.5 border font-bold ${i === 5 ? 'border-yellow-800 text-yellow-400' : 'border-green-800 text-green-400'}`}>{i === 5 ? 'MONITOR' : 'SAFE'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'location' && (
        <div className="bg-slate-900 border border-slate-800 p-6 text-center">
          <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-3" />
          <div className="text-xl font-black mb-1">{selected.location}</div>
          <div className="text-slate-500 text-sm mb-4">Last updated: {selected.lastSeen}</div>
          <div className="bg-slate-800 h-48 flex items-center justify-center text-slate-600 text-xs">
            [Map View — Requires Google Maps API in production]
          </div>
        </div>
      )}

      {tab === 'threats' && (
        <div>
          {selected.threats === 0 ? (
            <div className="bg-green-950/30 border border-green-800 p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <div className="text-xl font-black text-green-400">No Threats Detected</div>
              <div className="text-slate-500 text-sm mt-1">Device is clean and protected</div>
            </div>
          ) : (
            <div className="space-y-2">
              {[{ type: 'Spyware Detected', app: 'Unknown App', action: 'Quarantined' }].map(t => (
                <div key={t.type} className="bg-red-950/20 border border-red-800 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="text-sm font-bold text-red-400">{t.type}</div>
                      <div className="text-[10px] text-slate-500">Source: {t.app}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">{t.action}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
