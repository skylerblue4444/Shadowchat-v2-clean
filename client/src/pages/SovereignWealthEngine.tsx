import React, { useState } from 'react';
import { DollarSign, TrendingUp, Target, Zap, PieChart, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const STRATEGIES = [
  { id: 'aggressive', name: 'Aggressive Growth', risk: 'HIGH', return: '45-120%', allocation: { crypto: 70, defi: 20, cash: 10 }, color: 'red' },
  { id: 'balanced', name: 'Balanced Sovereign', risk: 'MED', return: '20-45%', allocation: { crypto: 40, defi: 30, cash: 30 }, color: 'amber' },
  { id: 'conservative', name: 'Conservative Yield', risk: 'LOW', return: '8-20%', allocation: { crypto: 20, defi: 40, cash: 40 }, color: 'green' },
  { id: 'shadow', name: 'Shadow Economy', risk: 'EXTREME', return: '100-500%', allocation: { crypto: 50, defi: 40, cash: 10 }, color: 'purple' },
];

export default function SovereignWealthEngine() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [strategy, setStrategy] = useState('balanced');
  const [amount, setAmount] = useState('10000');
  const active = STRATEGIES.find(s => s.id === strategy)!;

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><DollarSign className="h-6 w-6 text-amber-500" /> SOVEREIGN_WEALTH_ENGINE</h1>
          <p className="text-slate-500 text-xs mt-1">AI wealth optimization · Wave 19 · Mock projections</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {STRATEGIES.map(s => (
          <button key={s.id} onClick={() => setStrategy(s.id)} className={`border p-4 text-left transition-all ${strategy === s.id ? `border-${s.color}-600 bg-${s.color}-950/20` : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}>
            <div className={`text-[9px] font-black mb-2 text-${s.color}-400`}>{s.risk} RISK</div>
            <div className="text-xs font-bold mb-1">{s.name}</div>
            <div className={`text-sm font-black text-${s.color}-400`}>{s.return}</div>
            <div className="text-[9px] text-slate-600">Annual Return</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Investment Amount (USD)</label>
            <input className="w-full bg-slate-900 border border-slate-700 focus:border-amber-600 text-white px-3 py-2 text-sm outline-none" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4">
            <h3 className="text-[10px] text-slate-500 uppercase mb-3">Allocation ({active.name})</h3>
            {Object.entries(active.allocation).map(([key, val]) => (
              <div key={key} className="flex items-center gap-3 mb-2">
                <span className="text-[10px] text-slate-400 w-16 capitalize">{key}</span>
                <div className="flex-1 bg-slate-800 h-2">
                  <div className={`h-full bg-${active.color}-500`} style={{ width: `${val}%` }} />
                </div>
                <span className="text-[10px] text-white w-8 text-right">{val}%</span>
              </div>
            ))}
          </div>

          <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-4 text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2">
            <Zap className="h-4 w-4" /> ACTIVATE STRATEGY
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-[10px] text-slate-500 uppercase">Projected Returns (Mock)</h3>
          {[1, 2, 3, 5].map(yr => {
            const low = parseFloat(amount) * Math.pow(1 + parseFloat(active.return.split('-')[0]) / 100, yr);
            const high = parseFloat(amount) * Math.pow(1 + parseFloat(active.return.split('-')[1]) / 100, yr);
            return (
              <div key={yr} className="bg-slate-900 border border-slate-800 p-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">{yr} Year{yr > 1 ? 's' : ''}</span>
                <div className="text-right">
                  <div className="text-sm font-black text-green-400">${Math.round(low).toLocaleString()} — ${Math.round(high).toLocaleString()}</div>
                  <div className="text-[9px] text-slate-600">Conservative — Optimistic</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
