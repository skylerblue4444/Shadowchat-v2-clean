import React, { useState, useEffect } from 'react';
import { Newspaper, TrendingUp, TrendingDown, Zap, Activity, Clock, AlertTriangle, CheckCircle, Bot } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const NEWS_SIGNALS = [
  { id: 1, headline: 'SEC approves Bitcoin spot ETF expansion — 3 new funds approved', sentiment: 'BULLISH', impact: 'HIGH', asset: 'BTC', action: 'BUY', confidence: 94, time: '2m ago', priceMove: '+2.4%' },
  { id: 2, headline: 'Ethereum developer conference announces major L2 scaling upgrade', sentiment: 'BULLISH', impact: 'MED', asset: 'ETH', action: 'BUY', confidence: 78, time: '8m ago', priceMove: '+1.1%' },
  { id: 3, headline: 'Major exchange reports security breach — $40M affected', sentiment: 'BEARISH', impact: 'HIGH', asset: 'BTC', action: 'HEDGE', confidence: 87, time: '15m ago', priceMove: '-1.8%' },
  { id: 4, headline: 'US inflation data comes in lower than expected at 2.8%', sentiment: 'BULLISH', impact: 'HIGH', asset: 'ALL', action: 'BUY', confidence: 82, time: '32m ago', priceMove: '+3.2%' },
  { id: 5, headline: 'Solana network upgrade reduces fees by 90%', sentiment: 'BULLISH', impact: 'MED', asset: 'SOL', action: 'BUY', confidence: 89, time: '1h ago', priceMove: '+4.7%' },
];

export default function AINewsTrader() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [autoTrade, setAutoTrade] = useState(false);
  const [executed, setExecuted] = useState<number[]>([]);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Newspaper className="h-6 w-6 text-blue-500" /> AI_NEWS_TRADER</h1>
          <p className="text-slate-500 text-xs mt-1">Real-time news sentiment → trade signals · Hope AI · Wave 20</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setAutoTrade(v => !v)} className={`flex items-center gap-2 px-4 py-2 text-xs font-black border transition-all ${autoTrade ? 'border-green-600 bg-green-950/30 text-green-400' : 'border-slate-700 text-slate-500'}`}>
            <Bot className="h-3 w-3" /> {autoTrade ? 'AUTO-TRADE ON' : 'AUTO-TRADE OFF'}
          </button>
        </div>
      </div>

      {autoTrade && (
        <div className="bg-green-950/20 border border-green-800 p-3 mb-4 flex items-center gap-2">
          <Activity className="h-4 w-4 text-green-500 animate-pulse" />
          <span className="text-xs text-green-400 font-bold">Hope AI is monitoring news and executing trades automatically based on signal confidence &gt;85%</span>
        </div>
      )}

      <div className="space-y-3">
        {NEWS_SIGNALS.map(signal => (
          <div key={signal.id} className={`border p-4 transition-all ${signal.sentiment === 'BULLISH' ? 'border-green-900 bg-green-950/10' : 'border-red-900 bg-red-950/10'}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-black px-2 py-0.5 border ${signal.sentiment === 'BULLISH' ? 'border-green-700 text-green-400' : 'border-red-700 text-red-400'}`}>{signal.sentiment}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 border ${signal.impact === 'HIGH' ? 'border-red-700 text-red-400' : 'border-yellow-700 text-yellow-400'}`}>{signal.impact} IMPACT</span>
                  <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{signal.asset}</span>
                  <span className="text-[10px] text-slate-600">{signal.time}</span>
                </div>
                <p className="text-sm font-bold">{signal.headline}</p>
              </div>
              <div className={`text-lg font-black ml-4 ${signal.sentiment === 'BULLISH' ? 'text-green-400' : 'text-red-400'}`}>{signal.priceMove}</div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-4 text-xs">
                <div><span className="text-slate-500">Signal: </span><span className={`font-black ${signal.action === 'BUY' ? 'text-green-400' : signal.action === 'SELL' ? 'text-red-400' : 'text-amber-400'}`}>{signal.action}</span></div>
                <div><span className="text-slate-500">Confidence: </span><span className={`font-black ${signal.confidence >= 85 ? 'text-green-400' : 'text-yellow-400'}`}>{signal.confidence}%</span></div>
              </div>
              {!executed.includes(signal.id) ? (
                <button onClick={() => setExecuted(prev => [...prev, signal.id])} className={`text-xs font-bold px-4 py-2 transition-all ${signal.action === 'BUY' ? 'bg-green-600 hover:bg-green-700' : signal.action === 'SELL' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'} text-white`}>
                  EXECUTE {signal.action}
                </button>
              ) : (
                <span className="text-xs text-green-400 font-bold flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Executed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
