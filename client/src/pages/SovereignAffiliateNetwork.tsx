import React, { useState } from 'react';
import { Users, DollarSign, TrendingUp, Link, Copy, CheckCircle, Star, Zap, Globe } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const REFERRALS = [
  { user: 'crypto_friend_1', joined: 'May 20', earned: '$84', tier: 'Gold', active: true },
  { user: 'shadow_recruit_x', joined: 'May 18', earned: '$42', tier: 'Silver', active: true },
  { user: 'sky_buddy_44', joined: 'May 15', earned: '$210', tier: 'Gold', active: true },
  { user: 'anon_ref_007', joined: 'May 10', earned: '$28', tier: 'Bronze', active: false },
];

const TIERS = [
  { name: 'Bronze', commission: '5%', requirement: '1-9 referrals', color: 'amber' },
  { name: 'Silver', commission: '10%', requirement: '10-49 referrals', color: 'slate' },
  { name: 'Gold', commission: '15%', requirement: '50-199 referrals', color: 'amber' },
  { name: 'Diamond', commission: '20%', requirement: '200+ referrals', color: 'blue' },
];

export default function SovereignAffiliateNetwork() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [copied, setCopied] = useState(false);
  const refLink = 'https://sky444.io/ref/SKY4444';

  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Users className="h-6 w-6 text-amber-500" /> AFFILIATE_NETWORK</h1>
          <p className="text-slate-500 text-xs mt-1">Sovereign referral program · Crypto commissions · Wave 19</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-amber-400">$364</div><div className="text-[10px] text-slate-500">Total Earned</div></div>
          <div><div className="text-xl font-black text-green-400">4</div><div className="text-[10px] text-slate-500">Referrals</div></div>
          <div><div className="text-xl font-black text-blue-400">Gold</div><div className="text-[10px] text-slate-500">Tier</div></div>
        </div>
      </div>

      {/* Ref Link */}
      <div className="bg-slate-900 border border-amber-800 p-4 flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] text-slate-500 mb-1">Your Referral Link</div>
          <div className="text-sm font-mono text-amber-400">{refLink}</div>
        </div>
        <button onClick={copy} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 transition-all">
          {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Tiers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {TIERS.map(tier => (
          <div key={tier.name} className={`border p-3 text-center ${tier.name === 'Gold' ? 'border-amber-700 bg-amber-950/20' : 'border-slate-800 bg-slate-900'}`}>
            <div className={`text-lg font-black ${tier.name === 'Gold' ? 'text-amber-400' : tier.name === 'Diamond' ? 'text-blue-400' : 'text-slate-400'}`}>{tier.name}</div>
            <div className="text-xl font-black text-green-400">{tier.commission}</div>
            <div className="text-[9px] text-slate-500">{tier.requirement}</div>
          </div>
        ))}
      </div>

      {/* Referrals */}
      <h3 className="text-[10px] text-slate-500 uppercase mb-3">Your Referrals</h3>
      <div className="space-y-2">
        {REFERRALS.map(ref => (
          <div key={ref.user} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${ref.active ? 'bg-green-500' : 'bg-slate-600'}`} />
              <div>
                <div className="text-xs font-bold">@{ref.user}</div>
                <div className="text-[10px] text-slate-500">Joined {ref.joined}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-[9px] font-black px-2 py-0.5 border ${ref.tier === 'Gold' ? 'border-amber-700 text-amber-400' : ref.tier === 'Silver' ? 'border-slate-600 text-slate-400' : 'border-orange-900 text-orange-400'}`}>{ref.tier}</span>
              <span className="text-xs font-bold text-green-400">{ref.earned}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
