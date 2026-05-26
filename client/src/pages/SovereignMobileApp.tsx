import React, { useState } from 'react';
import { Smartphone, Download, Star, Shield, Zap, Globe, CheckCircle, QrCode, Apple, Play } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const FEATURES = [
  { icon: '💰', title: 'Full Wallet', desc: 'BTC, ETH, SKY444 and 100+ coins' },
  { icon: '📊', title: 'Live Trading', desc: 'Trade on the go with real-time charts' },
  { icon: '🔒', title: 'Biometric Auth', desc: 'Face ID & fingerprint unlock' },
  { icon: '🌐', title: 'Built-in VPN', desc: 'Auto-connect to SKY444 mesh' },
  { icon: '🤖', title: 'Hope AI', desc: 'AI assistant in your pocket' },
  { icon: '💬', title: 'Encrypted Chat', desc: 'E2E messaging with all contacts' },
  { icon: '🎮', title: 'GameFi', desc: 'Play-to-earn games anywhere' },
  { icon: '📸', title: 'Creator Studio', desc: 'Create and monetize content' },
];

export default function SovereignMobileApp() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Smartphone className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-black tracking-tight mb-2">SKY444 MOBILE APP</h1>
          <p className="text-slate-500">The sovereign super-app in your pocket · Wave 19</p>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-1 text-amber-400 text-sm"><Star className="h-4 w-4 fill-amber-400" /> 4.9 (12,847 reviews)</div>
            <div className="flex items-center gap-1 text-green-400 text-sm"><Download className="h-4 w-4" /> 2.4M downloads</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 justify-center">
          {(['ios', 'android'] as const).map(p => (
            <button key={p} onClick={() => setPlatform(p)} className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all ${platform === p ? 'bg-blue-600 text-white' : 'border border-slate-700 text-slate-400 hover:border-slate-500'}`}>
              {p === 'ios' ? <Apple className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {p === 'ios' ? 'App Store' : 'Google Play'}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 border border-blue-800 p-6 text-center mb-6">
          <QrCode className="h-24 w-24 text-blue-400 mx-auto mb-3" />
          <p className="text-sm text-slate-400">Scan to download for {platform === 'ios' ? 'iOS' : 'Android'}</p>
          <p className="text-[10px] text-slate-600 mt-1">Or search "SKY444" in the {platform === 'ios' ? 'App Store' : 'Play Store'}</p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm px-8 py-3 transition-all">
            DOWNLOAD FREE
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-slate-900 border border-slate-800 p-3 text-center">
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="text-xs font-bold mb-0.5">{f.title}</div>
              <div className="text-[9px] text-slate-500">{f.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'App Size', value: '48 MB' },
            { label: 'iOS Version', value: '14.0+' },
            { label: 'Android', value: '8.0+' },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 p-3">
              <div className="text-sm font-black text-blue-400">{s.value}</div>
              <div className="text-[10px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
