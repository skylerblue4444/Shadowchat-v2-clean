import React, { useState } from 'react';
import { DollarSign, TrendingUp, Shield, Zap, BarChart3, ArrowRightLeft, CheckCircle, Globe } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const PROTOCOLS = [
  { name: 'Aave V3', chain: 'Ethereum', supplyAPY: { USDT: 4.2, USDC: 3.8, ETH: 2.1, BTC: 1.8 }, borrowAPY: { USDT: 5.8, USDC: 5.2, ETH: 3.4, BTC: 2.9 }, tvl: '$12.4B', safety: 'AAA' },
  { name: 'Compound V3', chain: 'Ethereum', supplyAPY: { USDT: 3.9, USDC: 3.5, ETH: 1.8, BTC: 1.5 }, borrowAPY: { USDT: 5.4, USDC: 4.9, ETH: 3.1, BTC: 2.6 }, tvl: '$8.2B', safety: 'AA' },
  { name: 'Venus', chain: 'BSC', supplyAPY: { USDT: 6.8, USDC: 6.2, ETH: 3.4, BTC: 2.8 }, borrowAPY: { USDT: 9.2, USDC: 8.4, ETH: 5.1, BTC: 4.2 }, tvl: '$2.1B', safety: 'A' },
  { name: 'SKY444 Lend', chain: 'SKY444', supplyAPY: { USDT: 8.4, USDC: 7.9, ETH: 4.2, BTC: 3.6 }, borrowAPY: { USDT: 11.2, USDC: 10.4, ETH: 6.8, BTC: 5.4 }, tvl: '$840M', safety: 'A' },
];

const ASSETS = ['USDT', 'USDC', 'ETH', 'BTC'];

export default function CryptoLendingAggregator() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [mode, setMode] = useState<'supply' | 'borrow'>('supply');
  const [asset, setAsset] = useState('USDT');
  const [amount, setAmount] = useState('');

  const best = [...PROTOCOLS].sort((a, b) => {
    const aRate = mode === 'supply' ? a.supplyAPY[asset as keyof typeof a.supplyAPY] : a.borrowAPY[asset as keyof typeof a.borrowAPY];
    const bRate = mode === 'supply' ? b.supplyAPY[asset as keyof typeof b.supplyAPY] : b.borrowAPY[asset as keyof typeof b.borrowAPY];
    return mode === 'supply' ? bRate - aRate : aRate - bRate;
  });

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><ArrowRightLeft className="h-6 w-6 text-green-500" /> LENDING_AGGREGATOR</h1>
          <p className="text-slate-500 text-xs mt-1">Best rates across DeFi protocols · Auto-routing · Wave 20</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-1 space-y-4">
          <div className="flex gap-2">
            <button onClick={() => setMode('supply')} className={`flex-1 py-3 font-black text-xs transition-all ${mode === 'supply' ? 'bg-green-600 text-white' : 'border border-slate-700 text-slate-500'}`}>SUPPLY</button>
            <button onClick={() => setMode('borrow')} className={`flex-1 py-3 font-black text-xs transition-all ${mode === 'borrow' ? 'bg-red-600 text-white' : 'border border-slate-700 text-slate-500'}`}>BORROW</button>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Asset</label>
            <div className="grid grid-cols-4 gap-1">
              {ASSETS.map(a => (
                <button key={a} onClick={() => setAsset(a)} className={`py-2 text-xs font-bold border transition-all ${asset === a ? 'border-green-600 text-green-400 bg-green-950/30' : 'border-slate-700 text-slate-500'}`}>{a}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Amount</label>
            <input className="w-full bg-slate-900 border border-slate-700 focus:border-green-600 text-white px-3 py-2 text-sm outline-none" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          {amount && (
            <div className="bg-green-950/20 border border-green-800 p-3 text-xs">
              <div className="font-bold text-green-400 mb-1">Best Rate: {mode === 'supply' ? best[0].supplyAPY[asset as keyof typeof best[0].supplyAPY] : best[0].borrowAPY[asset as keyof typeof best[0].borrowAPY]}% APY</div>
              <div className="text-slate-400">via {best[0].name} on {best[0].chain}</div>
              <div className="text-green-400 mt-1">Est. {mode === 'supply' ? 'earnings' : 'cost'}: ${(parseFloat(amount) * (mode === 'supply' ? best[0].supplyAPY[asset as keyof typeof best[0].supplyAPY] : best[0].borrowAPY[asset as keyof typeof best[0].borrowAPY]) / 100).toFixed(2)}/yr</div>
            </div>
          )}
          <button className={`w-full py-3 font-black text-xs uppercase tracking-widest transition-all ${mode === 'supply' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}>
            {mode === 'supply' ? 'SUPPLY' : 'BORROW'} {asset}
          </button>
        </div>

        <div className="md:col-span-2 space-y-2">
          <div className="text-[10px] text-slate-500 uppercase mb-2">Rates Comparison — {asset} {mode === 'supply' ? 'Supply' : 'Borrow'} APY</div>
          {best.map((p, i) => {
            const rate = mode === 'supply' ? p.supplyAPY[asset as keyof typeof p.supplyAPY] : p.borrowAPY[asset as keyof typeof p.borrowAPY];
            return (
              <div key={p.name} className={`flex items-center justify-between p-4 border transition-all ${i === 0 ? 'border-green-700 bg-green-950/20' : 'border-slate-800 bg-slate-900'}`}>
                <div className="flex items-center gap-3">
                  {i === 0 && <Zap className="h-4 w-4 text-green-500" />}
                  <div>
                    <div className="text-sm font-bold">{p.name}</div>
                    <div className="text-[10px] text-slate-500">{p.chain} · TVL: {p.tvl} · Safety: {p.safety}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-lg font-black ${mode === 'supply' ? 'text-green-400' : 'text-red-400'}`}>{rate}%</div>
                    <div className="text-[9px] text-slate-500">APY</div>
                  </div>
                  {i === 0 && <span className="text-[9px] border border-green-700 text-green-400 px-2 py-0.5 font-bold">BEST</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
