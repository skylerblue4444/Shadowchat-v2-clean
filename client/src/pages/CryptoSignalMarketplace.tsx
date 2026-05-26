import React, { useState } from 'react';
import { TrendingUp, Star, Users, DollarSign, Bell, CheckCircle, Zap, BarChart3 } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const SIGNALS = [
  { id: 1, provider: 'SkyWhale_Signals', asset: 'BTC/USDT', type: 'LONG', entry: '$46,800', target: '$52,000', stop: '$44,500', rr: '2.4:1', confidence: 91, subscribers: 12847, winRate: '78%', price: 'FREE' },
  { id: 2, provider: 'ShadowTrader_X', asset: 'ETH/USDT', type: 'SHORT', entry: '$2,840', target: '$2,400', stop: '$3,000', rr: '2.8:1', confidence: 84, subscribers: 8934, winRate: '71%', price: '$29/mo' },
  { id: 3, provider: 'HopeAI_Quant', asset: 'SOL/USDT', type: 'LONG', entry: '$142', target: '$180', stop: '$128', rr: '2.7:1', confidence: 96, subscribers: 4201, winRate: '84%', price: '$49/mo' },
  { id: 4, provider: 'GreyArea_Alpha', asset: 'BNB/USDT', type: 'SHORT', entry: '$580', target: '$520', stop: '$610', rr: '2.0:1', confidence: 77, subscribers: 2103, winRate: '68%', price: '$19/mo' },
];

export default function CryptoSignalMarketplace() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [subscribed, setSubscribed] = useState<number[]>([1]);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Zap className="h-6 w-6 text-amber-500" /> SIGNAL_MARKETPLACE</h1>
          <p className="text-slate-500 text-xs mt-1">Premium trading signals · AI + human analysts · Wave 19</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-amber-400">847</div><div className="text-[10px] text-slate-500">Active Signals</div></div>
          <div><div className="text-xl font-black text-green-400">74%</div><div className="text-[10px] text-slate-500">Avg Win Rate</div></div>
        </div>
      </div>

      <div className="space-y-4">
        {SIGNALS.map(signal => (
          <div key={signal.id} className="bg-slate-900 border border-slate-800 hover:border-amber-800 p-4 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-black">{signal.provider}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 border ${signal.type === 'LONG' ? 'border-green-700 text-green-400 bg-green-950/30' : 'border-red-700 text-red-400 bg-red-950/30'}`}>{signal.type}</span>
                  <span className="text-xs font-bold text-white">{signal.asset}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {signal.subscribers.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" /> {signal.winRate} win rate</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-black ${signal.confidence >= 90 ? 'text-green-400' : signal.confidence >= 80 ? 'text-amber-400' : 'text-yellow-400'}`}>{signal.confidence}%</div>
                <div className="text-[10px] text-slate-500">Confidence</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-3 text-xs">
              <div className="bg-slate-800 p-2 text-center"><div className="text-slate-500 text-[9px]">Entry</div><div className="font-bold">{signal.entry}</div></div>
              <div className="bg-green-950/30 border border-green-900 p-2 text-center"><div className="text-slate-500 text-[9px]">Target</div><div className="font-bold text-green-400">{signal.target}</div></div>
              <div className="bg-red-950/20 border border-red-900 p-2 text-center"><div className="text-slate-500 text-[9px]">Stop</div><div className="font-bold text-red-400">{signal.stop}</div></div>
              <div className="bg-slate-800 p-2 text-center"><div className="text-slate-500 text-[9px]">R:R</div><div className="font-bold text-amber-400">{signal.rr}</div></div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs font-black ${signal.price === 'FREE' ? 'text-green-400' : 'text-amber-400'}`}>{signal.price}</span>
              <button
                onClick={() => setSubscribed(prev => prev.includes(signal.id) ? prev.filter(i => i !== signal.id) : [...prev, signal.id])}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2 transition-all ${subscribed.includes(signal.id) ? 'border border-green-700 text-green-400' : 'bg-amber-600 hover:bg-amber-700 text-white'}`}
              >
                {subscribed.includes(signal.id) ? <><CheckCircle className="h-3 w-3" /> SUBSCRIBED</> : <><Bell className="h-3 w-3" /> SUBSCRIBE</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
