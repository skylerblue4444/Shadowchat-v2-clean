import React, { useState } from 'react';
import { Zap, TrendingUp, Lock, DollarSign, Clock, CheckCircle, BarChart3, Shield } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const POOLS = [
  { id: 1, token: 'SKY444', apy: '24%', tvl: '$12.4M', lockup: 'Flexible', minStake: '100 SKY444', risk: 'LOW', status: 'LIVE' },
  { id: 2, token: 'BTC', apy: '6.5%', tvl: '$84.2M', lockup: '30 days', minStake: '0.01 BTC', risk: 'LOW', status: 'LIVE' },
  { id: 3, token: 'ETH', apy: '8.2%', tvl: '$42.8M', lockup: '14 days', minStake: '0.1 ETH', risk: 'LOW', status: 'LIVE' },
  { id: 4, token: 'SOL', apy: '12.4%', tvl: '$8.4M', lockup: '7 days', minStake: '1 SOL', risk: 'MED', status: 'LIVE' },
  { id: 5, token: 'SHADOW', apy: '48%', tvl: '$2.1M', lockup: '90 days', minStake: '1000 SHDW', risk: 'HIGH', status: 'BETA' },
];

export default function SovereignStakingV19() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [selected, setSelected] = useState(POOLS[0]);
  const [amount, setAmount] = useState('');

  const projected = amount ? (parseFloat(amount) * parseFloat(selected.apy) / 100).toFixed(2) : '0.00';

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Zap className="h-6 w-6 text-amber-500" /> STAKING_V19</h1>
          <p className="text-slate-500 text-xs mt-1">Sovereign yield staking · Wave 19 · Auto-compound</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-amber-400">$847</div><div className="text-[10px] text-slate-500">Staking Rewards</div></div>
          <div><div className="text-xl font-black text-green-400">$12,400</div><div className="text-[10px] text-slate-500">Total Staked</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          {POOLS.map(pool => (
            <div key={pool.id} onClick={() => setSelected(pool)} className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${selected.id === pool.id ? 'border-amber-600 bg-amber-950/20' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-amber-900/40 border border-amber-800 flex items-center justify-center font-black text-amber-400 text-sm">{pool.token.slice(0, 2)}</div>
                <div>
                  <div className="text-sm font-bold">{pool.token}</div>
                  <div className="text-[10px] text-slate-500">{pool.lockup} · Min: {pool.minStake}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <div className="text-center"><div className="font-black text-green-400">{pool.apy}</div><div className="text-[9px] text-slate-500">APY</div></div>
                <div className="text-center"><div className="font-bold text-white">{pool.tvl}</div><div className="text-[9px] text-slate-500">TVL</div></div>
                <span className={`text-[9px] font-black px-2 py-0.5 border ${pool.risk === 'LOW' ? 'border-green-800 text-green-400' : pool.risk === 'MED' ? 'border-yellow-800 text-yellow-400' : 'border-red-800 text-red-400'}`}>{pool.risk}</span>
                <span className={`text-[9px] font-black px-2 py-0.5 border ${pool.status === 'LIVE' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>{pool.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 space-y-4 h-fit">
          <h3 className="text-xs font-bold text-slate-400 uppercase">Stake {selected.token}</h3>
          <div>
            <label className="text-[10px] text-slate-500 block mb-1">Amount</label>
            <input className="w-full bg-slate-800 border border-slate-700 focus:border-amber-600 text-white px-3 py-2 text-sm outline-none" placeholder={`Min: ${selected.minStake}`} value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="bg-slate-800 p-3 space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-500">APY</span><span className="text-green-400 font-bold">{selected.apy}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Lock Period</span><span className="text-white">{selected.lockup}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Est. Annual Yield</span><span className="text-amber-400 font-bold">{projected} {selected.token}</span></div>
          </div>
          <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-3 text-xs uppercase tracking-widest transition-all">STAKE NOW</button>
        </div>
      </div>
    </div>
  );
}
