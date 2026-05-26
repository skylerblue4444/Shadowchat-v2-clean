import React, { useState } from 'react';
import { Rocket, DollarSign, Users, TrendingUp, Clock, CheckCircle, Star, Zap, Globe, Shield } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const LAUNCHES = [
  { id: 1, name: 'SkyDEX Token', symbol: 'SDEX', raise: '$2M', price: '$0.10', hardcap: '$5M', raised: '$1.4M', pct: 70, participants: 2847, ends: '3 days', tier: 'GOLD', kyc: true, audit: true },
  { id: 2, name: 'GreyChain', symbol: 'GREY', raise: '$500K', price: '$0.05', hardcap: '$1M', raised: '$380K', pct: 76, participants: 1204, ends: '7 days', tier: 'SILVER', kyc: false, audit: true },
  { id: 3, name: 'ShadowAI', symbol: 'SAI', raise: '$10M', price: '$1.00', hardcap: '$20M', raised: '$4.2M', pct: 42, participants: 892, ends: '14 days', tier: 'PLATINUM', kyc: true, audit: true },
];

export default function SovereignTokenLaunchpad() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [invested, setInvested] = useState<Record<number, string>>({});
  const [confirmed, setConfirmed] = useState<number[]>([]);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Rocket className="h-6 w-6 text-green-500" /> TOKEN_LAUNCHPAD</h1>
          <p className="text-slate-500 text-xs mt-1">Vetted token launches · Guaranteed allocation · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-green-400">$6M</div><div className="text-[10px] text-slate-500">Total Raised</div></div>
          <div><div className="text-xl font-black text-blue-400">4,943</div><div className="text-[10px] text-slate-500">Participants</div></div>
        </div>
      </div>

      <div className="space-y-4">
        {LAUNCHES.map(launch => (
          <div key={launch.id} className="bg-slate-900 border border-slate-800 hover:border-green-800 p-4 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-black px-2 py-0.5 border ${launch.tier === 'PLATINUM' ? 'border-purple-700 text-purple-400' : launch.tier === 'GOLD' ? 'border-amber-700 text-amber-400' : 'border-slate-600 text-slate-400'}`}>{launch.tier}</span>
                  {launch.kyc && <span className="text-[9px] border border-green-800 text-green-400 px-1.5 py-0.5">KYC ✓</span>}
                  {launch.audit && <span className="text-[9px] border border-blue-800 text-blue-400 px-1.5 py-0.5">AUDITED ✓</span>}
                </div>
                <div className="text-lg font-black">{launch.name} <span className="text-slate-500 text-sm">({launch.symbol})</span></div>
                <div className="text-[10px] text-slate-500">Price: {launch.price} · Hard Cap: {launch.hardcap}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-green-400">{launch.raised}</div>
                <div className="text-[10px] text-slate-500">raised of {launch.raise}</div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 justify-end"><Clock className="h-3 w-3" />{launch.ends} left</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-[10px] mb-1"><span className="text-slate-500">{launch.participants.toLocaleString()} participants</span><span className="text-green-400 font-bold">{launch.pct}% filled</span></div>
              <div className="bg-slate-800 h-3"><div className="h-full bg-green-500" style={{width:`${launch.pct}%`}} /></div>
            </div>

            {!confirmed.includes(launch.id) ? (
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-slate-800 border border-slate-700 text-white px-3 py-2 text-xs outline-none focus:border-green-600"
                  placeholder={`Min $100 · Price: ${launch.price}`}
                  value={invested[launch.id] || ''}
                  onChange={e => setInvested(prev => ({ ...prev, [launch.id]: e.target.value }))}
                />
                <button onClick={() => setConfirmed(prev => [...prev, launch.id])} className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 transition-all flex items-center gap-1"><Rocket className="h-3 w-3" /> INVEST</button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-green-400 font-bold"><CheckCircle className="h-4 w-4" /> Investment confirmed! Tokens will be distributed at TGE.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
