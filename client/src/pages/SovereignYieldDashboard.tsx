import React, { useState } from 'react';
import { TrendingUp, DollarSign, Zap, Shield, RefreshCw, BarChart3, CheckCircle, Clock, Globe } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const POSITIONS = [
  { protocol: 'Aave V3', asset: 'USDT', amount: '$25,000', apy: '4.2%', earned: '$87.50', chain: 'Ethereum', type: 'Supply', risk: 'LOW' },
  { protocol: 'Compound V3', asset: 'USDC', amount: '$15,000', apy: '3.8%', earned: '$47.50', chain: 'Ethereum', type: 'Supply', risk: 'LOW' },
  { protocol: 'SKY444 Staking', asset: 'SKY444', amount: '100,000', apy: '24%', earned: '2,000 SKY444', chain: 'SKY444', type: 'Stake', risk: 'MED' },
  { protocol: 'Curve 3pool', asset: 'USDT/USDC/DAI', amount: '$10,000', apy: '6.8%', earned: '$56.67', chain: 'Ethereum', type: 'LP', risk: 'LOW' },
];

export default function SovereignYieldDashboard() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'positions' | 'opportunities' | 'history'>('positions');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><TrendingUp className="h-6 w-6 text-green-500" /> YIELD_DASHBOARD</h1>
          <p className="text-slate-500 text-xs mt-1">All yield positions in one view · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-green-400">$191.67</div><div className="text-[10px] text-slate-500">Earned (30d)</div></div>
          <div><div className="text-xl font-black text-blue-400">8.7%</div><div className="text-[10px] text-slate-500">Blended APY</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['positions', 'opportunities', 'history'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-green-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'positions' && (
        <div className="space-y-2">
          {POSITIONS.map(p => (
            <div key={p.protocol+p.asset} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-900/40 border border-green-800 flex items-center justify-center font-black text-green-400 text-xs">{p.protocol.slice(0,2)}</div>
                <div>
                  <div className="text-sm font-bold">{p.protocol}</div>
                  <div className="text-[10px] text-slate-500">{p.asset} · {p.chain} · {p.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <div className="text-center"><div className="font-bold text-white">{p.amount}</div><div className="text-[9px] text-slate-500">Deposited</div></div>
                <div className="text-center"><div className="font-black text-green-400">{p.apy}</div><div className="text-[9px] text-slate-500">APY</div></div>
                <div className="text-center"><div className="font-bold text-amber-400">{p.earned}</div><div className="text-[9px] text-slate-500">Earned</div></div>
                <span className={`text-[9px] px-2 py-0.5 border font-bold ${p.risk === 'LOW' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>{p.risk}</span>
                <button className="border border-slate-700 text-slate-400 text-[10px] font-bold px-3 py-1.5 hover:border-slate-500 transition-all">WITHDRAW</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'opportunities' && (
        <div className="space-y-2">
          {[
            { protocol: 'Venus', asset: 'USDT', apy: '6.8%', tvl: '$2.1B', chain: 'BSC', risk: 'MED' },
            { protocol: 'SKY444 Lend', asset: 'ETH', apy: '4.2%', tvl: '$840M', chain: 'SKY444', risk: 'LOW' },
            { protocol: 'Pendle', asset: 'stETH', apy: '12.4%', tvl: '$1.2B', chain: 'Ethereum', risk: 'MED' },
            { protocol: 'Shadow Yield V5', asset: 'USDC', apy: '8.4%', tvl: '$420M', chain: 'SKY444', risk: 'MED' },
          ].map(o => (
            <div key={o.protocol+o.asset} className="flex items-center justify-between bg-slate-900 border border-slate-800 hover:border-green-800 p-4 transition-all">
              <div>
                <div className="text-sm font-bold">{o.protocol}</div>
                <div className="text-[10px] text-slate-500">{o.asset} · {o.chain} · TVL: {o.tvl}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xl font-black text-green-400">{o.apy}</div>
                <span className={`text-[9px] px-2 py-0.5 border font-bold ${o.risk === 'LOW' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>{o.risk}</span>
                <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 transition-all">DEPOSIT</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-2">
          {[
            { date: 'May 22', action: 'Compound interest claimed', amount: '+$12.40', protocol: 'Aave V3' },
            { date: 'May 20', action: 'Staking rewards', amount: '+500 SKY444', protocol: 'SKY444 Staking' },
            { date: 'May 18', action: 'LP fees collected', amount: '+$8.20', protocol: 'Curve 3pool' },
          ].map((h, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <div><div className="text-xs font-bold">{h.action}</div><div className="text-[10px] text-slate-500">{h.protocol} · {h.date}</div></div>
              <span className="text-xs font-black text-green-400">{h.amount}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
