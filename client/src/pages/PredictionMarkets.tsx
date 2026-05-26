import React, { useState } from 'react';
import { Target, TrendingUp, Users, DollarSign, Clock, CheckCircle, Zap, BarChart3 } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const MARKETS = [
  { id: 1, question: 'Will BTC reach $60K before July 1, 2026?', yes: 68, no: 32, volume: '$284K', liquidity: '$48K', closes: '9 days', category: 'Crypto', trending: true },
  { id: 2, question: 'Will ETH 2.0 staking APY exceed 8% in Q3 2026?', yes: 42, no: 58, volume: '$127K', liquidity: '$22K', closes: '41 days', category: 'DeFi', trending: false },
  { id: 3, question: 'Will SKY444 platform reach 5M users by Dec 2026?', yes: 81, no: 19, volume: '$89K', liquidity: '$14K', closes: '224 days', category: 'SKY444', trending: true },
  { id: 4, question: 'Will the US pass crypto regulation by end of 2026?', yes: 55, no: 45, volume: '$420K', liquidity: '$84K', closes: '224 days', category: 'Regulation', trending: true },
  { id: 5, question: 'Will SOL flip ETH in market cap by 2027?', yes: 34, no: 66, volume: '$203K', liquidity: '$41K', closes: '589 days', category: 'Crypto', trending: false },
];

export default function PredictionMarkets() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [bets, setBets] = useState<Record<number, { side: 'yes' | 'no'; amount: string }>>({});
  const [filter, setFilter] = useState('All');

  const placeBet = (id: number, side: 'yes' | 'no') => {
    setBets(prev => ({ ...prev, [id]: { side, amount: prev[id]?.amount || '' } }));
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Target className="h-6 w-6 text-amber-500" /> PREDICTION_MARKETS</h1>
          <p className="text-slate-500 text-xs mt-1">Decentralized prediction markets · Crypto stakes · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-amber-400">$1.1M</div><div className="text-[10px] text-slate-500">Total Volume</div></div>
          <div><div className="text-xl font-black text-green-400">{MARKETS.length}</div><div className="text-[10px] text-slate-500">Active Markets</div></div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['All', 'Crypto', 'DeFi', 'SKY444', 'Regulation'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-bold border transition-all ${filter === f ? 'border-amber-600 text-amber-400 bg-amber-950/30' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-4">
        {MARKETS.filter(m => filter === 'All' || m.category === filter).map(market => (
          <div key={market.id} className="bg-slate-900 border border-slate-800 hover:border-amber-800 p-4 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {market.trending && <span className="text-[9px] border border-red-700 text-red-400 px-1.5 py-0.5 font-bold">🔥 TRENDING</span>}
                  <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{market.category}</span>
                </div>
                <h3 className="text-sm font-bold">{market.question}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 bg-slate-800 h-4 overflow-hidden flex">
                <div className="bg-green-500 h-full flex items-center justify-center text-[9px] font-black text-white" style={{width:`${market.yes}%`}}>{market.yes}%</div>
                <div className="bg-red-500 h-full flex items-center justify-center text-[9px] font-black text-white flex-1">{market.no}%</div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> Vol: {market.volume}</span>
              <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3" /> Liq: {market.liquidity}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Closes in {market.closes}</span>
            </div>

            {bets[market.id] ? (
              <div className="flex items-center gap-2">
                <input
                  className="flex-1 bg-slate-800 border border-slate-700 text-white px-3 py-2 text-xs outline-none focus:border-amber-600"
                  placeholder="Amount in USDT"
                  value={bets[market.id].amount}
                  onChange={e => setBets(prev => ({ ...prev, [market.id]: { ...prev[market.id], amount: e.target.value } }))}
                />
                <span className={`text-xs font-black px-3 py-2 ${bets[market.id].side === 'yes' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                  {bets[market.id].side.toUpperCase()}
                </span>
                <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 transition-all">PLACE BET</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => placeBet(market.id, 'yes')} className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 transition-all">YES ({market.yes}%)</button>
                <button onClick={() => placeBet(market.id, 'no')} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 transition-all">NO ({market.no}%)</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
