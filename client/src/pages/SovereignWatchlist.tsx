import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, TrendingDown, Plus, Trash2, Bell, BarChart3, Eye } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const INITIAL = [
  { symbol: 'BTC', name: 'Bitcoin', price: 47200, change: 3.2, vol: '$28.4B', mcap: '$924B', alert: 50000 },
  { symbol: 'ETH', name: 'Ethereum', price: 2840, change: -1.8, vol: '$12.1B', mcap: '$341B', alert: null },
  { symbol: 'SOL', name: 'Solana', price: 142, change: 7.4, vol: '$4.2B', mcap: '$64B', alert: 150 },
  { symbol: 'SKY444', name: 'SKY444 Coin', price: 0.28, change: 12.1, vol: '$84M', mcap: '$280M', alert: 0.50 },
  { symbol: 'BNB', name: 'BNB', price: 580, change: 0.8, vol: '$1.8B', mcap: '$86B', alert: null },
];

export default function SovereignWatchlist() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [assets, setAssets] = useState(INITIAL);
  const [newSymbol, setNewSymbol] = useState('');

  const remove = (symbol: string) => setAssets(prev => prev.filter(a => a.symbol !== symbol));

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Star className="h-6 w-6 text-amber-500" /> WATCHLIST</h1>
          <p className="text-slate-500 text-xs mt-1">Track your favorite assets · Real-time prices · Wave 20</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input className="flex-1 bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none focus:border-amber-600" placeholder="Add symbol (e.g. DOGE)" value={newSymbol} onChange={e => setNewSymbol(e.target.value.toUpperCase())} />
        <button onClick={() => { if (newSymbol) { setAssets(prev => [...prev, { symbol: newSymbol, name: newSymbol, price: Math.random() * 100, change: (Math.random() * 20 - 10), vol: '$1M', mcap: '$10M', alert: null }]); setNewSymbol(''); } }} className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 transition-all flex items-center gap-1"><Plus className="h-3 w-3" /> ADD</button>
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-6 gap-2 text-[10px] text-slate-500 uppercase px-4 mb-1">
          <span className="col-span-2">Asset</span><span className="text-right">Price</span><span className="text-right">24h</span><span className="text-right">Volume</span><span className="text-right">Actions</span>
        </div>
        {assets.map(a => (
          <div key={a.symbol} className="grid grid-cols-6 gap-2 items-center bg-slate-900 border border-slate-800 hover:border-amber-800 p-3 transition-all">
            <div className="col-span-2 flex items-center gap-2">
              <div className="h-8 w-8 bg-amber-900/40 border border-amber-800 flex items-center justify-center font-black text-amber-400 text-xs">{a.symbol.slice(0,2)}</div>
              <div><div className="text-xs font-bold">{a.symbol}</div><div className="text-[9px] text-slate-500">{a.name}</div></div>
            </div>
            <div className="text-right text-xs font-bold">${a.price.toLocaleString()}</div>
            <div className={`text-right text-xs font-bold flex items-center justify-end gap-1 ${a.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {a.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{a.change >= 0 ? '+' : ''}{a.change.toFixed(1)}%
            </div>
            <div className="text-right text-[10px] text-slate-500">{a.vol}</div>
            <div className="flex justify-end gap-1">
              {a.alert && <span className="text-[9px] border border-amber-800 text-amber-400 px-1 py-0.5">🔔${a.alert}</span>}
              <button className="p-1 border border-slate-700 hover:border-slate-500"><BarChart3 className="h-3 w-3 text-slate-500" /></button>
              <button onClick={() => remove(a.symbol)} className="p-1 border border-red-900 hover:bg-red-950/30"><Trash2 className="h-3 w-3 text-red-400" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
