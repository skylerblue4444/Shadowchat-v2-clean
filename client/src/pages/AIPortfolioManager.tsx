import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Cpu, RefreshCw, Target, PieChart, BarChart3, Zap, Shield } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const HOLDINGS = [
  { asset: 'BTC', qty: 2.4, price: 47200, value: 113280, change: 3.2, alloc: 38, aiScore: 92 },
  { asset: 'ETH', qty: 18.5, price: 2840, value: 52540, change: -1.8, alloc: 18, aiScore: 78 },
  { asset: 'SOL', qty: 340, price: 142, value: 48280, change: 7.4, alloc: 16, aiScore: 95 },
  { asset: 'SKY444', qty: 100000, price: 0.28, value: 28000, change: 12.1, alloc: 9, aiScore: 88 },
  { asset: 'USDT', qty: 55000, price: 1.0, value: 55000, change: 0, alloc: 19, aiScore: 60 },
];

const AI_ACTIONS = [
  { action: 'REBALANCE', detail: 'Reduce USDT 19%→10%, add BTC 38%→45%', impact: '+$2,400 est.', urgency: 'HIGH' },
  { action: 'TAKE PROFIT', detail: 'SOL up 7.4% — partial exit at $148', impact: '+$3,200 est.', urgency: 'MED' },
  { action: 'DCA', detail: 'ETH near support — add $5K at $2,800', impact: '+$840 est.', urgency: 'LOW' },
];

export default function AIPortfolioManager() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'overview' | 'ai-actions' | 'rebalance'>('overview');
  const [autoMode, setAutoMode] = useState(false);
  const total = HOLDINGS.reduce((a, h) => a + h.value, 0);
  const dayPnl = total * 0.032;

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Cpu className="h-6 w-6 text-purple-500" /> AI_PORTFOLIO_MANAGER</h1>
          <p className="text-slate-500 text-xs mt-1">Hope AI autonomous portfolio optimization · Wave 20</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-3xl font-black text-white">${total.toLocaleString()}</div>
            <div className="text-xs text-green-400 font-bold">+${dayPnl.toFixed(0)} today (+3.2%)</div>
          </div>
          <button onClick={() => setAutoMode(v => !v)} className={`px-4 py-2 text-xs font-black border transition-all ${autoMode ? 'border-purple-600 bg-purple-950/40 text-purple-400' : 'border-slate-700 text-slate-500'}`}>
            {autoMode ? '🤖 AUTO ON' : '🤖 AUTO OFF'}
          </button>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['overview', 'ai-actions', 'rebalance'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t.replace('-', ' ')}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-2">
          {HOLDINGS.map(h => (
            <div key={h.asset} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-900/30 border border-purple-800 flex items-center justify-center font-black text-purple-400 text-sm">{h.asset.slice(0,2)}</div>
                <div>
                  <div className="text-sm font-bold">{h.asset}</div>
                  <div className="text-[10px] text-slate-500">{h.qty.toLocaleString()} @ ${h.price.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm font-bold">${h.value.toLocaleString()}</div>
                  <div className={`text-[10px] font-bold ${h.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{h.change >= 0 ? '+' : ''}{h.change}%</div>
                </div>
                <div className="w-20">
                  <div className="flex justify-between text-[9px] mb-0.5"><span className="text-slate-500">{h.alloc}%</span><span className="text-purple-400">AI:{h.aiScore}</span></div>
                  <div className="bg-slate-800 h-1.5"><div className="h-full bg-purple-500" style={{width:`${h.alloc}%`}} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'ai-actions' && (
        <div className="space-y-3">
          {AI_ACTIONS.map(a => (
            <div key={a.action} className={`border p-4 ${a.urgency === 'HIGH' ? 'border-red-800 bg-red-950/10' : a.urgency === 'MED' ? 'border-amber-800 bg-amber-950/10' : 'border-slate-800 bg-slate-900'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black px-2 py-0.5 border ${a.urgency === 'HIGH' ? 'border-red-700 text-red-400' : a.urgency === 'MED' ? 'border-amber-700 text-amber-400' : 'border-slate-700 text-slate-400'}`}>{a.urgency}</span>
                  <span className="text-sm font-black text-white">{a.action}</span>
                </div>
                <span className="text-xs font-bold text-green-400">{a.impact}</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">{a.detail}</p>
              <div className="flex gap-2">
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-1.5 transition-all">EXECUTE</button>
                <button className="border border-slate-700 text-slate-400 text-xs font-bold px-4 py-1.5 hover:border-slate-500 transition-all">SKIP</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'rebalance' && (
        <div className="space-y-4">
          <div className="bg-purple-950/20 border border-purple-800 p-4">
            <div className="flex items-center gap-2 mb-2"><Zap className="h-4 w-4 text-purple-400" /><span className="text-sm font-bold text-purple-400">AI Recommended Allocation</span></div>
            <p className="text-xs text-slate-400">Based on current market conditions, Hope AI suggests the following rebalance to maximize risk-adjusted returns.</p>
          </div>
          {[
            { asset: 'BTC', current: 38, target: 45, change: +7 },
            { asset: 'ETH', current: 18, target: 20, change: +2 },
            { asset: 'SOL', current: 16, target: 15, change: -1 },
            { asset: 'SKY444', current: 9, target: 10, change: +1 },
            { asset: 'USDT', current: 19, target: 10, change: -9 },
          ].map(r => (
            <div key={r.asset} className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-3">
              <span className="text-xs font-bold w-16">{r.asset}</span>
              <div className="flex-1">
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="text-slate-500">Current {r.current}%</span>
                  <span className="text-purple-400">Target {r.target}%</span>
                </div>
                <div className="bg-slate-800 h-2 relative">
                  <div className="h-full bg-slate-600" style={{width:`${r.current}%`}} />
                  <div className="absolute top-0 h-full bg-purple-500 opacity-50" style={{width:`${r.target}%`}} />
                </div>
              </div>
              <span className={`text-xs font-bold w-10 text-right ${r.change > 0 ? 'text-green-400' : r.change < 0 ? 'text-red-400' : 'text-slate-500'}`}>{r.change > 0 ? '+' : ''}{r.change}%</span>
            </div>
          ))}
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 text-sm uppercase tracking-widest transition-all">EXECUTE REBALANCE</button>
        </div>
      )}
    </div>
  );
}
