import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Activity, Globe, Zap, Shield, TrendingUp, BarChart3 } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

export const GlobalAnalyticsCommand: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/50">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-green-500">GLOBAL_COMMAND_v10</h1>
          <GlobalStatus />
        </div>
        <SovereignBadge label="NETWORK_SYNC_100%" />
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PremiumCard title="TOTAL_VOLUME">
          <div className="text-3xl font-black text-green-500">$44.2M</div>
          <p className="text-[10px] text-slate-500 mt-2 uppercase">24h Aggregated Across All Coins</p>
        </PremiumCard>
        <PremiumCard title="ACTIVE_NODES">
          <div className="text-3xl font-black text-blue-500">4,444</div>
          <p className="text-[10px] text-slate-500 mt-2 uppercase">Sovereign Mesh Distribution</p>
        </PremiumCard>
        <PremiumCard title="AI_AGENCY">
          <div className="text-3xl font-black text-purple-500">98.2%</div>
          <p className="text-[10px] text-slate-500 mt-2 uppercase">Autonomous Decision Accuracy</p>
        </PremiumCard>
        <PremiumCard title="SECURITY_HEALTH">
          <div className="text-3xl font-black text-amber-500">OPTIMAL</div>
          <p className="text-[10px] text-slate-500 mt-2 uppercase">Shadow Kernel v10.4 Active</p>
        </PremiumCard>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PremiumCard title="NETWORK_LATENCY_HEATMAP">
          <div className="aspect-video bg-slate-950 border border-slate-900 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/5 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe className="h-32 w-32 text-slate-900 group-hover:text-green-500/20 transition-all duration-700" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[8px] font-mono text-slate-600">
              <span>EU_WEST: 12ms</span>
              <span>US_EAST: 42ms</span>
              <span>ASIA_SOUTH: 88ms</span>
            </div>
          </div>
        </PremiumCard>
        <PremiumCard title="ECOSYSTEM_GROWTH">
          <div className="aspect-video flex items-end gap-2 p-4">
            {[30, 45, 35, 60, 50, 80, 70, 95, 85, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-600/20 hover:bg-blue-600 transition-all cursor-crosshair group relative" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[8px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">+{h}%</div>
              </div>
            ))}
          </div>
        </PremiumCard>
      </div>
    </div>
  );
};

export default GlobalAnalyticsCommand;
