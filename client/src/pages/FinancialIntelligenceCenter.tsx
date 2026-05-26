import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Globe, Cpu, Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const PORTFOLIO = [
  { asset: 'BTC', amount: 2.4, value: 112320, change: 3.2, alloc: 42 },
  { asset: 'ETH', amount: 18.5, value: 52540, change: -1.8, alloc: 20 },
  { asset: 'SOL', amount: 340, value: 48280, change: 7.4, alloc: 18 },
  { asset: 'SKY444', amount: 100000, value: 28000, change: 12.1, alloc: 10 },
  { asset: 'USDT', amount: 25000, value: 25000, change: 0, alloc: 10 },
];

const SIGNALS = [
  { asset: 'BTC', signal: 'BUY', strength: 87, reason: 'RSI oversold + Golden cross', timeframe: '4H' },
  { asset: 'ETH', signal: 'HOLD', strength: 52, reason: 'Consolidating near support', timeframe: '1D' },
  { asset: 'SOL', signal: 'BUY', strength: 91, reason: 'Breakout confirmed + Volume surge', timeframe: '1H' },
  { asset: 'BNB', signal: 'SELL', strength: 73, reason: 'Bearish divergence on MACD', timeframe: '4H' },
];

export default function FinancialIntelligenceCenter() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'portfolio' | 'signals' | 'macro'>('portfolio');
  const total = PORTFOLIO.reduce((a, p) => a + p.value, 0);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><BarChart3 className="h-6 w-6 text-green-500" /> FINANCIAL_INTEL_CENTER</h1>
          <p className="text-slate-500 text-xs mt-1">AI-powered portfolio intelligence · Wave 19</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-green-400">${total.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">Total Portfolio Value</div>
        </div>
      </div>

      <div className="flex gap-1 mb-6">
        {(['portfolio', 'signals', 'macro'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-green-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'portfolio' && (
        <div className="space-y-3">
          {PORTFOLIO.map(p => (
            <div key={p.asset} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-sm text-amber-400">{p.asset.slice(0, 2)}</div>
                <div>
                  <div className="text-sm font-bold">{p.asset}</div>
                  <div className="text-[10px] text-slate-500">{p.amount.toLocaleString()} units</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm font-bold">${p.value.toLocaleString()}</div>
                  <div className={`text-[10px] font-bold flex items-center gap-1 ${p.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {p.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {p.change >= 0 ? '+' : ''}{p.change}%
                  </div>
                </div>
                <div className="w-20">
                  <div className="text-[10px] text-slate-500 mb-1">{p.alloc}%</div>
                  <div className="bg-slate-800 h-1.5"><div className="h-full bg-green-500" style={{ width: `${p.alloc}%` }} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'signals' && (
        <div className="space-y-3">
          {SIGNALS.map(s => (
            <div key={s.asset} className="bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-white">{s.asset}</span>
                  <span className={`text-xs font-black px-3 py-1 border ${s.signal === 'BUY' ? 'border-green-700 text-green-400 bg-green-950/30' : s.signal === 'SELL' ? 'border-red-700 text-red-400 bg-red-950/30' : 'border-yellow-700 text-yellow-400 bg-yellow-950/30'}`}>{s.signal}</span>
                  <span className="text-[10px] text-slate-500">{s.timeframe}</span>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-black ${s.strength >= 80 ? 'text-green-400' : s.strength >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{s.strength}%</div>
                  <div className="text-[10px] text-slate-500">Signal Strength</div>
                </div>
              </div>
              <div className="bg-slate-800 h-2 mb-2">
                <div className={`h-full ${s.signal === 'BUY' ? 'bg-green-500' : s.signal === 'SELL' ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: `${s.strength}%` }} />
              </div>
              <p className="text-[10px] text-slate-500">{s.reason}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'macro' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Fear & Greed', value: '72 — Greed', color: 'yellow' },
            { label: 'BTC Dominance', value: '52.4%', color: 'amber' },
            { label: 'Total Market Cap', value: '$2.84T', color: 'green' },
            { label: 'DeFi TVL', value: '$98.2B', color: 'blue' },
            { label: 'ETH Gas', value: '18 gwei', color: 'green' },
            { label: 'Fed Rate', value: '5.25%', color: 'red' },
            { label: 'US CPI', value: '3.2% YoY', color: 'yellow' },
            { label: 'Gold', value: '$2,340/oz', color: 'amber' },
            { label: 'S&P 500', value: '5,248 (+0.4%)', color: 'green' },
          ].map(m => (
            <div key={m.label} className="bg-slate-900 border border-slate-800 p-4">
              <div className="text-[10px] text-slate-500 mb-1">{m.label}</div>
              <div className={`text-sm font-black text-${m.color}-400`}>{m.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
