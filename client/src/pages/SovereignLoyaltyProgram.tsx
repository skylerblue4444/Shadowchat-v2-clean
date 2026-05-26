import React, { useState } from 'react';
import { Star, Gift, Zap, TrendingUp, Crown, DollarSign, CheckCircle, Lock, Users } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const TIERS = [
  { name: 'Bronze', min: 0, max: 999, color: 'amber', perks: ['1% cashback', 'Basic support', 'Monthly rewards'] },
  { name: 'Silver', min: 1000, max: 4999, color: 'slate', perks: ['2% cashback', 'Priority support', 'Weekly rewards', 'Fee discounts'] },
  { name: 'Gold', min: 5000, max: 19999, color: 'amber', perks: ['3% cashback', '24/7 VIP support', 'Daily rewards', '50% fee discount', 'Early access'] },
  { name: 'Diamond', min: 20000, max: Infinity, color: 'blue', perks: ['5% cashback', 'Dedicated manager', 'Instant rewards', 'Zero fees', 'Exclusive events', 'Governance votes'] },
];

const REWARDS = [
  { id: 1, name: 'Trading Fee Rebate', points: 500, value: '$25', category: 'Trading', available: true },
  { id: 2, name: 'SKY444 Token Bonus', points: 1000, value: '100 SKY444', category: 'Tokens', available: true },
  { id: 3, name: 'VIP Event Access', points: 2500, value: 'Exclusive', category: 'Events', available: false },
  { id: 4, name: 'Hardware Wallet', points: 5000, value: '$120', category: 'Hardware', available: true },
  { id: 5, name: 'Premium Subscription 1yr', points: 3000, value: '$120', category: 'Subscription', available: true },
];

export default function SovereignLoyaltyProgram() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'status' | 'rewards' | 'history'>('status');
  const userPoints = 7840;
  const userTier = TIERS.find(t => userPoints >= t.min && userPoints <= t.max) || TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(userTier) + 1];
  const [redeemed, setRedeemed] = useState<number[]>([]);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Crown className="h-6 w-6 text-amber-500" /> LOYALTY_PROGRAM</h1>
          <p className="text-slate-500 text-xs mt-1">Earn points · Unlock perks · Sovereign rewards · Wave 20</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-amber-400">{userPoints.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">SKY Points</div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['status', 'rewards', 'history'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'status' && (
        <div className="space-y-4">
          <div className={`border p-6 border-amber-700 bg-amber-950/20`}>
            <div className="flex items-center gap-3 mb-4">
              <Crown className="h-8 w-8 text-amber-500" />
              <div>
                <div className="text-2xl font-black text-amber-400">{userTier.name} Member</div>
                <div className="text-slate-500 text-sm">{userPoints.toLocaleString()} points · {nextTier ? `${(nextTier.min - userPoints).toLocaleString()} to ${nextTier.name}` : 'Max tier reached'}</div>
              </div>
            </div>
            {nextTier && (
              <div>
                <div className="flex justify-between text-[10px] mb-1"><span className="text-slate-500">{userTier.name}</span><span className="text-amber-400">{nextTier.name}</span></div>
                <div className="bg-slate-800 h-3"><div className="h-full bg-amber-500" style={{width:`${((userPoints - userTier.min) / (nextTier.min - userTier.min)) * 100}%`}} /></div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIERS.map(tier => (
              <div key={tier.name} className={`border p-3 ${tier.name === userTier.name ? 'border-amber-700 bg-amber-950/20' : 'border-slate-800 bg-slate-900'}`}>
                <div className={`text-sm font-black mb-2 ${tier.name === 'Diamond' ? 'text-blue-400' : 'text-amber-400'}`}>{tier.name}</div>
                {tier.perks.map(p => <div key={p} className="text-[9px] text-slate-500 flex items-center gap-1 mb-0.5"><CheckCircle className="h-2.5 w-2.5 text-green-500" />{p}</div>)}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REWARDS.map(r => (
            <div key={r.id} className={`border p-4 ${!r.available ? 'border-slate-800 bg-slate-900 opacity-50' : 'border-slate-800 bg-slate-900 hover:border-amber-700'} transition-all`}>
              <div className="flex items-start justify-between mb-2">
                <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{r.category}</span>
                {!r.available && <Lock className="h-3 w-3 text-slate-600" />}
              </div>
              <div className="text-sm font-bold mb-1">{r.name}</div>
              <div className="text-lg font-black text-amber-400 mb-1">{r.value}</div>
              <div className="text-[10px] text-slate-500 mb-3">{r.points.toLocaleString()} points</div>
              <button
                disabled={!r.available || redeemed.includes(r.id) || userPoints < r.points}
                onClick={() => setRedeemed(prev => [...prev, r.id])}
                className={`w-full py-2 text-xs font-bold transition-all ${redeemed.includes(r.id) ? 'border border-green-700 text-green-400' : r.available && userPoints >= r.points ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
              >
                {redeemed.includes(r.id) ? '✓ REDEEMED' : r.available && userPoints >= r.points ? 'REDEEM' : `Need ${r.points.toLocaleString()} pts`}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-2">
          {[
            { action: 'Trade executed', points: '+120', date: 'May 22', type: 'earn' },
            { action: 'Referral bonus', points: '+500', date: 'May 20', type: 'earn' },
            { action: 'Daily login streak', points: '+50', date: 'May 19', type: 'earn' },
            { action: 'Redeemed: Fee Rebate', points: '-500', date: 'May 15', type: 'spend' },
            { action: 'Deposit bonus', points: '+1000', date: 'May 10', type: 'earn' },
          ].map((h, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <div><div className="text-xs font-bold">{h.action}</div><div className="text-[10px] text-slate-500">{h.date}</div></div>
              <span className={`text-sm font-black ${h.type === 'earn' ? 'text-green-400' : 'text-red-400'}`}>{h.points}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
