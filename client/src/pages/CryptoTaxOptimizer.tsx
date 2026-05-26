import React, { useState } from 'react';
import { DollarSign, TrendingDown, FileText, Download, Calculator, CheckCircle, AlertTriangle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const TX_DATA = [
  { date: 'Jan 15', asset: 'BTC', type: 'SELL', amount: 0.5, cost: 18000, proceeds: 23500, gain: 5500, term: 'LONG', tax: 825 },
  { date: 'Feb 20', asset: 'ETH', type: 'SELL', amount: 5, cost: 8000, proceeds: 14000, gain: 6000, term: 'SHORT', tax: 2220 },
  { date: 'Mar 10', asset: 'SOL', type: 'SELL', amount: 100, cost: 5000, proceeds: 13000, gain: 8000, term: 'SHORT', tax: 2960 },
  { date: 'Apr 5', asset: 'BTC', type: 'SELL', amount: 0.2, cost: 9000, proceeds: 9400, gain: 400, term: 'LONG', tax: 60 },
];

export default function CryptoTaxOptimizer() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'summary' | 'transactions' | 'harvest'>('summary');
  const totalGain = TX_DATA.reduce((a, t) => a + t.gain, 0);
  const totalTax = TX_DATA.reduce((a, t) => a + t.tax, 0);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Calculator className="h-6 w-6 text-green-500" /> CRYPTO_TAX_OPTIMIZER</h1>
          <p className="text-slate-500 text-xs mt-1">AI tax optimization · Loss harvesting · Wave 19</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-xs font-bold transition-all">
          <Download className="h-4 w-4" /> Export 8949
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-4 text-center">
          <div className="text-2xl font-black text-green-400">${totalGain.toLocaleString()}</div>
          <div className="text-xs text-slate-500">Total Gains</div>
        </div>
        <div className="bg-red-950/20 border border-red-900 p-4 text-center">
          <div className="text-2xl font-black text-red-400">${totalTax.toLocaleString()}</div>
          <div className="text-xs text-slate-500">Estimated Tax</div>
        </div>
        <div className="bg-green-950/20 border border-green-800 p-4 text-center">
          <div className="text-2xl font-black text-green-400">$1,840</div>
          <div className="text-xs text-slate-500">Potential Savings</div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['summary', 'transactions', 'harvest'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-green-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'transactions' && (
        <div className="space-y-2">
          {TX_DATA.map((tx, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3 text-xs">
              <span className="text-slate-500 w-16">{tx.date}</span>
              <span className="font-bold w-12">{tx.asset}</span>
              <span className={`font-black w-12 ${tx.type === 'SELL' ? 'text-red-400' : 'text-green-400'}`}>{tx.type}</span>
              <span className="text-slate-400 w-16">{tx.amount} units</span>
              <span className="text-slate-500 w-20">Cost: ${tx.cost.toLocaleString()}</span>
              <span className="text-white w-20">Proceeds: ${tx.proceeds.toLocaleString()}</span>
              <span className={`font-bold w-16 ${tx.gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>+${tx.gain.toLocaleString()}</span>
              <span className={`text-[9px] px-1.5 py-0.5 border w-14 text-center ${tx.term === 'LONG' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>{tx.term}</span>
              <span className="text-red-400 font-bold w-16">Tax: ${tx.tax}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'harvest' && (
        <div className="space-y-4">
          <div className="bg-amber-950/30 border border-amber-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-bold text-amber-400">Tax Loss Harvesting Opportunities</span>
            </div>
            <p className="text-xs text-slate-400">Sell these positions to realize losses and offset your gains. Repurchase after 30 days to avoid wash-sale rules.</p>
          </div>
          {[
            { asset: 'DOGE', currentLoss: -$1200, savings: 444, action: 'Sell to harvest' },
            { asset: 'SHIB', currentLoss: -$640, savings: 237, action: 'Sell to harvest' },
          ].map(h => (
            <div key={h.asset} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
              <div>
                <div className="text-sm font-bold">{h.asset}</div>
                <div className="text-[10px] text-red-400">Unrealized loss: ${Math.abs(h.currentLoss).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-400">Save ~${h.savings}</div>
                <div className="text-[10px] text-slate-500">{h.action}</div>
              </div>
              <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 transition-all">HARVEST</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'summary' && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Short-term Gains', value: '$14,000', tax: '$5,180', rate: '37%' },
            { label: 'Long-term Gains', value: '$5,900', tax: '$885', rate: '15%' },
            { label: 'Mining Income', value: '$0', tax: '$0', rate: '—' },
            { label: 'Staking Rewards', value: '$840', tax: '$311', rate: '37%' },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 p-4">
              <div className="text-xs text-slate-500 mb-2">{s.label}</div>
              <div className="text-lg font-black text-white">{s.value}</div>
              <div className="text-xs text-red-400 mt-1">Est. Tax: {s.tax} ({s.rate})</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
