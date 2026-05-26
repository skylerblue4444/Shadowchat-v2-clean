import React, { useState } from 'react';
import { Users, DollarSign, TrendingUp, Copy, CheckCircle, Share2, Zap, Star, Globe, Gift } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const REFERRALS = [
  { user: 'crypto_friend_1', joined: 'May 20', tier: 'Gold', trades: 47, earned: '$284', active: true },
  { user: 'sky_recruit_44', joined: 'May 18', tier: 'Silver', trades: 23, earned: '$142', active: true },
  { user: 'anon_ref_007', joined: 'May 15', tier: 'Bronze', trades: 8, earned: '$48', active: true },
  { user: 'defi_buddy', joined: 'May 10', tier: 'Gold', trades: 89, earned: '$534', active: true },
  { user: 'shadow_recruit', joined: 'Apr 28', tier: 'Silver', trades: 34, earned: '$204', active: false },
];

const MILESTONES = [
  { refs: 5, reward: '$50 bonus', achieved: true },
  { refs: 10, reward: '$150 bonus', achieved: true },
  { refs: 25, reward: '$500 bonus + Gold tier', achieved: false },
  { refs: 50, reward: '$2,000 bonus + Diamond tier', achieved: false },
  { refs: 100, reward: '$10,000 bonus + Equity tokens', achieved: false },
];

export default function SovereignReferralDashboard() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [copied, setCopied] = useState(false);
  const refLink = 'https://sky444.io/ref/SKY4444SOVEREIGN';
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Users className="h-6 w-6 text-green-500" /> REFERRAL_DASHBOARD</h1>
          <p className="text-slate-500 text-xs mt-1">Earn crypto for every referral · Unlimited earnings · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-green-400">$1,212</div><div className="text-[10px] text-slate-500">Total Earned</div></div>
          <div><div className="text-xl font-black text-blue-400">{REFERRALS.length}</div><div className="text-[10px] text-slate-500">Referrals</div></div>
        </div>
      </div>

      {/* Ref Link */}
      <div className="bg-slate-900 border border-green-800 p-4 flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] text-slate-500 mb-1">Your Referral Link</div>
          <div className="text-sm font-mono text-green-400">{refLink}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={copy} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 transition-all">
            {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button className="flex items-center gap-2 border border-slate-700 text-slate-400 text-xs font-bold px-4 py-2 hover:border-slate-500 transition-all">
            <Share2 className="h-3 w-3" /> Share
          </button>
        </div>
      </div>

      {/* Milestones */}
      <div className="mb-6">
        <h3 className="text-[10px] text-slate-500 uppercase mb-3">Milestones</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {MILESTONES.map(m => (
            <div key={m.refs} className={`flex-shrink-0 border p-3 text-center w-36 ${m.achieved ? 'border-green-800 bg-green-950/20' : 'border-slate-800 bg-slate-900'}`}>
              <div className={`text-xl font-black ${m.achieved ? 'text-green-400' : 'text-slate-600'}`}>{m.refs}</div>
              <div className="text-[9px] text-slate-500 mb-1">referrals</div>
              <div className={`text-[10px] font-bold ${m.achieved ? 'text-green-400' : 'text-slate-500'}`}>{m.reward}</div>
              {m.achieved && <CheckCircle className="h-4 w-4 text-green-500 mx-auto mt-1" />}
            </div>
          ))}
        </div>
      </div>

      {/* Referral List */}
      <h3 className="text-[10px] text-slate-500 uppercase mb-3">Your Referrals</h3>
      <div className="space-y-2">
        {REFERRALS.map(ref => (
          <div key={ref.user} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${ref.active ? 'bg-green-500' : 'bg-slate-600'}`} />
              <div>
                <div className="text-xs font-bold">@{ref.user}</div>
                <div className="text-[10px] text-slate-500">Joined {ref.joined} · {ref.trades} trades</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-[9px] font-black px-2 py-0.5 border ${ref.tier === 'Gold' ? 'border-amber-700 text-amber-400' : ref.tier === 'Silver' ? 'border-slate-600 text-slate-400' : 'border-orange-900 text-orange-400'}`}>{ref.tier}</span>
              <span className="text-xs font-black text-green-400">{ref.earned}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
