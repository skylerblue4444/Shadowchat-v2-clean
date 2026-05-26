import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { Rocket, Coins, PieChart, ShieldCheck, ArrowRight, Timer } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

export const ICOLaunchpad: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/50">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-amber-500">ICO_LAUNCHPAD_v10</h1>
          <GlobalStatus />
        </div>
        <SovereignBadge label="PHASE_4_ACTIVE" />
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PremiumCard title="SKY4444 TOKEN SALE">
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Current Price</p>
                  <p className="text-4xl font-black text-amber-500">$0.4444 <span className="text-xs text-slate-600">USDT</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase">Next Phase</p>
                  <p className="text-xl font-bold text-slate-300">$0.8888</p>
                </div>
              </div>
              <div className="w-full bg-slate-900 h-4 rounded-none overflow-hidden">
                <div className="bg-amber-500 h-full w-[65%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>RAISED: $6.5M</span>
                <span>GOAL: $10M</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-amber-600 hover:bg-amber-700 text-black font-black py-8 rounded-none uppercase">BUY WITH BTC</Button>
                <Button className="bg-slate-800 hover:bg-slate-700 text-white font-black py-8 rounded-none uppercase">BUY WITH USDT</Button>
              </div>
            </div>
          </PremiumCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PremiumCard title="TOKENOMICS">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Total Supply</span>
                  <span className="text-xs font-mono">444,444,444</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Public Sale</span>
                  <span className="text-xs font-mono text-amber-500">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Ecosystem</span>
                  <span className="text-xs font-mono text-blue-500">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Team (Vested)</span>
                  <span className="text-xs font-mono text-purple-500">20%</span>
                </div>
              </div>
            </PremiumCard>
            <PremiumCard title="VESTING SCHEDULE">
              <div className="space-y-4">
                <p className="text-[10px] text-slate-500 italic">"Team and Advisor tokens are locked for 12 months with a 24-month linear release."</p>
                <Button variant="outline" className="w-full border-slate-800 text-[10px] font-mono h-10 rounded-none uppercase">View Whitepaper</Button>
              </div>
            </PremiumCard>
          </div>
        </div>

        <div className="space-y-6">
          <PremiumCard title="PHASE PROGRESS">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((p) => (
                <div key={p} className={`flex items-center justify-between p-3 border ${p <= 4 ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-slate-950 border-slate-900 text-slate-700'}`}>
                  <span className="text-[10px] font-black uppercase">Phase 0{p}</span>
                  {p < 4 ? <ShieldCheck className="h-4 w-4" /> : p === 4 ? <Timer className="h-4 w-4 animate-pulse" /> : <ArrowRight className="h-4 w-4" />}
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default ICOLaunchpad;
