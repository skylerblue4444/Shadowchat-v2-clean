import React, { useState } from 'react';
import { Rocket, DollarSign, Users, Clock, TrendingUp, Star, CheckCircle, Zap, Globe, Target } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const CAMPAIGNS = [
  { id: 1, title: 'SkyBlue Hardware Wallet v2', creator: 'sky_hardware_team', goal: '$500K', raised: '$387K', pct: 77, backers: 2847, days: 12, category: 'Hardware', reward: '1 Wallet + SKY444 tokens', featured: true },
  { id: 2, title: 'Decentralized VPN Protocol', creator: 'shadow_vpn_dev', goal: '$200K', raised: '$201K', pct: 100, backers: 1204, days: 0, category: 'Privacy', reward: 'Lifetime access', featured: false },
  { id: 3, title: 'Crypto Education Platform for Kids', creator: 'edu_crypto_44', goal: '$50K', raised: '$28K', pct: 56, backers: 892, days: 21, category: 'Education', reward: 'Course access + NFT', featured: false },
  { id: 4, title: 'AI Trading Terminal Open Source', creator: 'open_algo_x', goal: '$100K', raised: '$67K', pct: 67, backers: 3201, days: 8, category: 'Dev', reward: 'Early access + equity tokens', featured: true },
];

export default function CrowdfundingPlatform() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [backed, setBacked] = useState<number[]>([2]);
  const [amounts, setAmounts] = useState<Record<number, string>>({});

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Rocket className="h-6 w-6 text-orange-500" /> CROWDFUNDING</h1>
          <p className="text-slate-500 text-xs mt-1">Crypto-native crowdfunding · Instant payouts · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-orange-400">$683K</div><div className="text-[10px] text-slate-500">Total Raised</div></div>
          <div><div className="text-xl font-black text-green-400">8,144</div><div className="text-[10px] text-slate-500">Backers</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CAMPAIGNS.map(c => (
          <div key={c.id} className={`border p-4 transition-all ${c.pct >= 100 ? 'border-green-800 bg-green-950/10' : 'border-slate-800 bg-slate-900 hover:border-orange-800'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {c.featured && <span className="text-[9px] border border-orange-700 text-orange-400 px-1.5 py-0.5 font-bold">⭐ FEATURED</span>}
                  <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{c.category}</span>
                  {c.pct >= 100 && <span className="text-[9px] border border-green-700 text-green-400 px-1.5 py-0.5 font-bold">✓ FUNDED</span>}
                </div>
                <h3 className="text-sm font-bold">{c.title}</h3>
                <div className="text-[10px] text-slate-500 mt-0.5">by @{c.creator}</div>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-black text-white">{c.raised}</span>
                <span className="text-slate-500">of {c.goal} goal</span>
              </div>
              <div className="bg-slate-800 h-3 overflow-hidden">
                <div className={`h-full ${c.pct >= 100 ? 'bg-green-500' : 'bg-orange-500'} transition-all`} style={{width:`${Math.min(c.pct, 100)}%`}} />
              </div>
              <div className="flex justify-between text-[10px] mt-1">
                <span className="text-orange-400 font-bold">{c.pct}% funded</span>
                <span className="text-slate-500">{c.backers.toLocaleString()} backers</span>
                <span className="text-slate-500">{c.days > 0 ? `${c.days} days left` : 'Ended'}</span>
              </div>
            </div>

            <div className="bg-slate-800 p-2 text-[10px] text-slate-400 mb-3">
              🎁 Reward: {c.reward}
            </div>

            {!backed.includes(c.id) && c.days > 0 ? (
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-slate-800 border border-slate-700 text-white px-3 py-2 text-xs outline-none focus:border-orange-600"
                  placeholder="Amount (USDT)"
                  value={amounts[c.id] || ''}
                  onChange={e => setAmounts(prev => ({ ...prev, [c.id]: e.target.value }))}
                />
                <button onClick={() => setBacked(prev => [...prev, c.id])} className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 transition-all">BACK</button>
              </div>
            ) : backed.includes(c.id) ? (
              <div className="flex items-center gap-2 text-xs text-green-400 font-bold"><CheckCircle className="h-4 w-4" /> You backed this project!</div>
            ) : (
              <div className="text-xs text-slate-500">Campaign ended</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-slate-900 border border-orange-800 p-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-orange-400">Launch Your Campaign</div>
          <div className="text-[10px] text-slate-500">0% platform fee · Instant crypto payouts · Global reach</div>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-6 py-2 transition-all">START CAMPAIGN</button>
      </div>
    </div>
  );
}
