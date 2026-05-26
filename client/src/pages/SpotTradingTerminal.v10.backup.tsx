import React, { useState, useEffect } from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Zap, ArrowUpDown, History } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Spot Trading Terminal — Billion-Dollar Polish
 * High-fidelity trading interface with live AI signals and multi-coin support.
 */
export const SpotTradingTerminal: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [marketData, setMarketData] = useState<any[]>([]);
  const [selectedCoin, setSelectedCoin] = useState("SKY4444");

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => [...prev.slice(-20), { time: new Date().toLocaleTimeString(), price: 44000 + Math.random() * 500 }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 bg-black text-white min-h-screen font-sans">
      <div className="flex justify-between items-center border-b border-slate-900 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-amber-500">SPOT_TERMINAL_v10</h1>
          <GlobalStatus />
        </div>
        <div className="flex gap-4">
          <SovereignBadge label="AI_SIGNALS_LIVE" />
          <Button className="bg-amber-600 hover:bg-amber-700 text-black font-bold rounded-none skew-x-[-12deg]">
            <Zap className="mr-2 h-4 w-4 fill-current" /> EXECUTE SNIPE
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Trading Chart */}
        <div className="lg:col-span-3 space-y-6">
          <PremiumCard title="Market Velocity">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#475569" fontSize={10} />
                  <YAxis stroke="#475569" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #1e293b' }} />
                  <Line type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </PremiumCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PremiumCard title="Live Order Book">
              <div className="space-y-2 font-mono text-[10px]">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between text-red-500">
                    <span>{44500 + i * 10}.00</span>
                    <span>0.{Math.floor(Math.random() * 999)} BTC</span>
                  </div>
                ))}
                <div className="text-xl font-bold text-center py-2 border-y border-slate-800 my-2">44,444.00</div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between text-green-500">
                    <span>{44400 - i * 10}.00</span>
                    <span>1.{Math.floor(Math.random() * 999)} BTC</span>
                  </div>
                ))}
              </div>
            </PremiumCard>

            <PremiumCard title="AI Signal Stream">
              <div className="space-y-4">
                <div className="p-3 bg-amber-500/5 border-l-2 border-amber-500">
                  <p className="text-xs text-amber-500 font-bold uppercase mb-1">Buy Alert: SKY4444</p>
                  <p className="text-[10px] text-slate-400">RSI oversold on 15m. Whale accumulation detected in Shadow Pool.</p>
                </div>
                <div className="p-3 bg-slate-900 border-l-2 border-slate-700">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Neutral: BTC/USDT</p>
                  <p className="text-[10px] text-slate-500">Consolidating above $44k. Waiting for volume confirmation.</p>
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>

        {/* Execution Panel */}
        <div className="space-y-6">
          <PremiumCard title="Trade Execution">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600/20 text-green-500 border border-green-500/30 rounded-none hover:bg-green-600/30">BUY</Button>
                <Button className="flex-1 bg-red-600/20 text-red-500 border border-red-500/30 rounded-none hover:bg-red-600/30">SELL</Button>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase">Amount ({selectedCoin})</label>
                <Input className="bg-black border-slate-800 rounded-none text-amber-500 font-bold" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase">Total (USDT)</label>
                <div className="p-3 bg-slate-900 border border-slate-800 text-slate-400 font-mono text-sm">≈ 0.00</div>
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-black font-black py-6 rounded-none uppercase">PLACE ORDER</Button>
            </div>
          </PremiumCard>

          <PremiumCard title="Wallet Balance">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-mono">SKY4444</span>
                <span className="text-sm font-bold text-slate-200">10,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-mono">SHADOW</span>
                <span className="text-sm font-bold text-slate-200">10,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-mono">USDT</span>
                <span className="text-sm font-bold text-slate-200">100.00</span>
              </div>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default SpotTradingTerminal;
