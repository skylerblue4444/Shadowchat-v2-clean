import React, { useState } from 'react';
import { Lock, Zap, DollarSign, Eye, CheckCircle, Star, Users, TrendingUp, Shield, Copy } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const CONTENT = [
  { id: 1, title: 'The Complete Grey Area Trading Playbook 2026', type: 'Guide', price: '0.05 ETH', preview: 'Learn the exact strategies used by sovereign traders to navigate grey-area opportunities...', unlocked: false, rating: 4.9, buyers: 1204 },
  { id: 2, title: 'SKY444 Engineer Mode: Full Technical Deep Dive', type: 'Course', price: '0.1 ETH', preview: 'A 12-hour course covering every aspect of the SKY444 platform from an engineering perspective...', unlocked: true, rating: 5.0, buyers: 847 },
  { id: 3, title: 'Anonymous Wealth Building: The Sovereign Playbook', type: 'eBook', price: '0.02 ETH', preview: 'How to build and protect wealth while maintaining maximum privacy and sovereignty...', unlocked: false, rating: 4.8, buyers: 3201 },
  { id: 4, title: 'DeFi Yield Farming: 100%+ APY Strategies', type: 'Report', price: '0.03 ETH', preview: 'Discover the highest-yielding DeFi protocols and how to safely maximize returns...', unlocked: false, rating: 4.7, buyers: 2847 },
];

export default function ContentPaywall() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [unlocked, setUnlocked] = useState<number[]>([2]);
  const [purchasing, setPurchasing] = useState<number | null>(null);

  const purchase = (id: number) => {
    setPurchasing(id);
    setTimeout(() => { setUnlocked(prev => [...prev, id]); setPurchasing(null); }, 1500);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Lock className="h-6 w-6 text-amber-500" /> CONTENT_PAYWALL</h1>
          <p className="text-slate-500 text-xs mt-1">Premium knowledge · Crypto-gated · Instant access · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-amber-400">{CONTENT.length}</div><div className="text-[10px] text-slate-500">Items</div></div>
          <div><div className="text-xl font-black text-green-400">{unlocked.length}</div><div className="text-[10px] text-slate-500">Unlocked</div></div>
        </div>
      </div>

      <div className="space-y-4">
        {CONTENT.map(item => {
          const isUnlocked = unlocked.includes(item.id);
          return (
            <div key={item.id} className={`border p-4 transition-all ${isUnlocked ? 'border-green-800 bg-green-950/10' : 'border-slate-800 bg-slate-900'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{item.type}</span>
                    {isUnlocked && <span className="text-[9px] border border-green-700 text-green-400 px-1.5 py-0.5 font-bold">✓ UNLOCKED</span>}
                  </div>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-black text-amber-400">{item.price}</div>
                  <div className="flex items-center gap-1 text-[10px] text-yellow-400 justify-end"><Star className="h-3 w-3 fill-yellow-400" />{item.rating}</div>
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                {isUnlocked ? item.preview + ' [Full content unlocked — 47 pages of premium knowledge...]' : item.preview + '...'}
                {!isUnlocked && <span className="text-amber-400 font-bold"> [Unlock to read full content]</span>}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{item.buyers.toLocaleString()} buyers</span>
                </div>
                {!isUnlocked ? (
                  <button
                    onClick={() => purchase(item.id)}
                    disabled={purchasing === item.id}
                    className="bg-amber-600 hover:bg-amber-700 disabled:bg-slate-700 text-white text-xs font-bold px-6 py-2 transition-all flex items-center gap-2"
                  >
                    {purchasing === item.id ? <><Zap className="h-3 w-3 animate-spin" /> Processing...</> : <><Lock className="h-3 w-3" /> Unlock {item.price}</>}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button className="border border-green-700 text-green-400 text-xs font-bold px-4 py-2 hover:bg-green-950/30 transition-all flex items-center gap-1"><Eye className="h-3 w-3" /> Read</button>
                    <button className="border border-slate-700 text-slate-400 text-xs font-bold px-4 py-2 hover:border-slate-500 transition-all flex items-center gap-1"><Copy className="h-3 w-3" /> Share</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-slate-900 border border-slate-800 p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Become a Content Creator</h3>
        <p className="text-xs text-slate-500 mb-3">Publish your own paywalled content and earn crypto instantly when users unlock it.</p>
        <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-6 py-2 transition-all">START PUBLISHING</button>
      </div>
    </div>
  );
}
