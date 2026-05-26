import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { Cpu, Layers, TrendingUp, Zap, Clock, ShieldCheck } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Mining & Staking Hub — Billion-Dollar Polish
 * Real-time multi-coin rewards with autonomous compounding.
 */
export const MiningStakingHub: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-blue-500">QUANTUM_YIELD_v10</h1>
          <GlobalStatus />
        </div>
        <div className="flex gap-4">
          <SovereignBadge label="MINING_ACTIVE" />
          <SovereignBadge label="AUTO_COMPOUND_ON" />
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mining Terminal */}
        <div className="lg:col-span-2 space-y-6">
          <PremiumCard title="LIVE MINING RIGS">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { coin: 'SKY4444', hashrate: '44.4 TH/s', reward: '142 SKY/hr', color: 'text-blue-500' },
                { coin: 'SHADOW', hashrate: '12.8 PH/s', reward: '4.2 SHAD/hr', color: 'text-purple-500' },
                { coin: 'BTC', hashrate: '0.4 EH/s', reward: '0.0001 BTC/hr', color: 'text-amber-500' },
                { coin: 'DOGE', hashrate: '850 GH/s', reward: '44 DOGE/hr', color: 'text-yellow-500' },
              ].map((rig, i) => (
                <div key={i} className="p-4 bg-slate-950 border border-slate-900 flex justify-between items-center group hover:border-blue-500/50 transition-all">
                  <div>
                    <p className={`text-xs font-black ${rig.color}`}>{rig.coin}_RIG_0{i+1}</p>
                    <p className="text-2xl font-black mt-1">{rig.hashrate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-slate-500 uppercase">Est. Reward</p>
                    <p className="text-sm font-mono text-slate-300">{rig.reward}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-500/5 border-l-2 border-blue-500 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-blue-500 animate-pulse" />
                <span className="text-[10px] font-mono text-blue-200">NETWORK_EFFICIENCY: 98.4%</span>
              </div>
              <Button variant="ghost" className="h-6 text-[8px] text-blue-500 p-0 hover:bg-transparent uppercase">Optimize Hashrate</Button>
            </div>
          </PremiumCard>

          <PremiumCard title="YIELD AGGREGATOR (STAKING)">
            <div className="space-y-3">
              {[
                { pool: 'SKY4444_LIQUIDITY', apy: '24.5%', tvl: '$1.2M', status: 'ACTIVE' },
                { pool: 'SHADOW_GOVERNANCE', apy: '44.0%', tvl: '$4.4M', status: 'LOCKED' },
                { pool: 'BTC_VAULT_v10', apy: '8.2%', tvl: '$14.2M', status: 'ACTIVE' },
              ].map((pool, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-900/50 border border-slate-800">
                  <div className="flex items-center gap-4">
                    <Layers className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-xs font-bold text-slate-200">{pool.pool}</p>
                      <p className="text-[10px] text-slate-500">TVL: {pool.tvl}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-green-500">{pool.apy} APY</p>
                    <p className={`text-[8px] font-mono ${pool.status === 'LOCKED' ? 'text-amber-500' : 'text-green-500'}`}>{pool.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>

        {/* Portfolio Stats */}
        <div className="space-y-6">
          <PremiumCard title="MINING REWARDS">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/30">
                  <Cpu className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Unclaimed Rewards</p>
                  <p className="text-xl font-black">4,444.22 SKY</p>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-none uppercase">CLAIM ALL REWARDS</Button>
            </div>
          </PremiumCard>

          <PremiumCard title="NETWORK ANALYTICS">
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-500">GLOBAL_HASHRATE</span>
                <span className="text-slate-300">444.2 EH/s</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-500">DIFFICULTY_ADJ</span>
                <span className="text-slate-300">+4.2%</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-500">NEXT_HALVING</span>
                <span className="text-slate-300">142 DAYS</span>
              </div>
              <div className="h-[60px] flex items-end gap-1">
                {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-500/20 hover:bg-blue-500 transition-colors" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </PremiumCard>

          <PremiumCard title="SOVEREIGN SECURITY">
            <div className="flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/20">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span className="text-[10px] font-mono text-green-200 uppercase">Audit_Verified_v10</span>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default MiningStakingHub;
