import React, { useState } from 'react';
import { RefreshCw, Target, TrendingUp, DollarSign, Zap, CheckCircle, BarChart3, Settings } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const CURRENT = [
  { asset: 'BTC', current: 38, target: 40, value: 113280, color: 'amber' },
  { asset: 'ETH', current: 18, target: 20, value: 52540, color: 'blue' },
  { asset: 'SOL', current: 16, target: 15, value: 48280, color: 'purple' },
  { asset: 'SKY444', current: 9, target: 10, value: 28000, color: 'green' },
  { asset: 'USDT', current: 19, target: 15, value: 55000, color: 'slate' },
];

const STRATEGIES = [
  { name: 'Conservative', desc: 'Low volatility, stable growth', alloc: { BTC: 30, ETH: 20, SOL: 10, SKY444: 5, USDT: 35 } },
  { name: 'Balanced', desc: 'Moderate risk/reward', alloc: { BTC: 40, ETH: 20, SOL: 15, SKY444: 10, USDT: 15 } },
  { name: 'Aggressive', desc: 'High growth potential', alloc: { BTC: 45, ETH: 25, SOL: 20, SKY444: 10, USDT: 0 } },
  { name: 'Custom', desc: 'Set your own targets', alloc: { BTC: 38, ETH: 18, SOL: 16, SKY444: 9, USDT: 19 } },
];

export default function SovereignPortfolioRebalancer() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [strategy, setStrategy] = useState('Balanced');
  const [rebalancing, setRebalancing] = useState(false);
  const [done, setDone] = useState(false);
  const total = CURRENT.reduce((a, c) => a + c.value, 0);

  const rebalance = () => {
    setRebalancing(true);
    setTimeout(() => { setRebalancing(false); setDone(true); }, 2000);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><RefreshCw className="h-6 w-6 text-green-500" /> PORTFOLIO_REBALANCER</h1>
          <p className="text-slate-500 text-xs mt-1">Auto-rebalance to target allocation · Wave 20</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-white">${total.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">Portfolio Value</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {STRATEGIES.map(s => (
          <button key={s.name} onClick={() => setStrategy(s.name)} className={`border p-3 text-left transition-all ${strategy === s.name ? 'border-green-600 bg-green-950/20' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}>
            <div className="text-xs font-black mb-0.5">{s.name}</div>
            <div className="text-[9px] text-slate-500">{s.desc}</div>
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        {CURRENT.map(asset => {
          const strat = STRATEGIES.find(s => s.name === strategy);
          const target = strat ? strat.alloc[asset.asset as keyof typeof strat.alloc] : asset.target;
          const diff = target - asset.current;
          return (
            <div key={asset.asset} className="bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 bg-${asset.color}-900/40 border border-${asset.color}-800 flex items-center justify-center font-black text-${asset.color}-400 text-xs`}>{asset.asset.slice(0,2)}</div>
                  <div>
                    <div className="text-xs font-bold">{asset.asset}</div>
                    <div className="text-[10px] text-slate-500">${asset.value.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-center"><div className="font-bold text-slate-400">{asset.current}%</div><div className="text-[9px] text-slate-600">Current</div></div>
                  <div className="text-slate-600">→</div>
                  <div className="text-center"><div className="font-bold text-green-400">{target}%</div><div className="text-[9px] text-slate-600">Target</div></div>
                  <div className={`text-xs font-black w-12 text-right ${diff > 0 ? 'text-green-400' : diff < 0 ? 'text-red-400' : 'text-slate-500'}`}>{diff > 0 ? '+' : ''}{diff}%</div>
                </div>
              </div>
              <div className="flex gap-1 h-2">
                <div className={`bg-${asset.color}-500 opacity-40 h-full`} style={{width:`${asset.current}%`}} />
                <div className={`bg-${asset.color}-500 h-full`} style={{width:`${Math.abs(diff)}%`, marginLeft: diff < 0 ? 0 : undefined}} />
              </div>
            </div>
          );
        })}
      </div>

      {!done ? (
        <button onClick={rebalance} disabled={rebalancing} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-700 text-white font-black py-4 text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2">
          {rebalancing ? <><RefreshCw className="h-4 w-4 animate-spin" /> Rebalancing...</> : <><Zap className="h-4 w-4" /> EXECUTE REBALANCE</>}
        </button>
      ) : (
        <div className="bg-green-950/30 border border-green-800 p-4 text-center">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-sm font-black text-green-400">REBALANCE COMPLETE</div>
          <div className="text-[10px] text-slate-400 mt-1">Portfolio aligned to {strategy} strategy</div>
          <button onClick={() => setDone(false)} className="mt-2 text-[10px] text-green-400 hover:text-green-300">Rebalance again →</button>
        </div>
      )}
    </div>
  );
}
