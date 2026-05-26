import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { Shield, ShieldAlert, Lock, EyeOff, Globe, Zap, Terminal, Activity } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Security Command Center — Billion-Dollar Polish
 * Anti-surveillance, Mini Tor routing, and metadata stripping dashboard.
 */
export const SecurityCommandCenter: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/50">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-amber-500">SECURITY_COMMAND_v10</h1>
          <GlobalStatus />
        </div>
        <div className="flex gap-4">
          <SovereignBadge label="TOR_CIRCUIT_ACTIVE" />
          <SovereignBadge label="METADATA_STRIPPING_ON" />
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Network Status */}
        <div className="space-y-6">
          <PremiumCard title="TOR_ROUTER_STATUS">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-blue-500" />
                <span className="text-[10px] font-mono text-slate-400">NODES: 50 ACTIVE</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="text-[10px] font-mono text-slate-400">CIRCUIT: SWISS_GER_NL</span>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-[10px] font-mono text-slate-400">LATENCY: 44ms</span>
              </div>
              <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-none uppercase text-[8px]">REBUILD_CIRCUIT</Button>
            </div>
          </PremiumCard>

          <PremiumCard title="METADATA_STRIPPER">
            <div className="space-y-4">
              <p className="text-[10px] text-slate-500 uppercase">Automatic cleaning for all uploads.</p>
              <div className="flex justify-between items-center p-2 bg-slate-900 border border-slate-800">
                <span className="text-[8px] font-mono text-slate-400">EXIF_DATA</span>
                <span className="text-green-500 text-[8px] font-black">STRIPPED</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-900 border border-slate-800">
                <span className="text-[8px] font-mono text-slate-400">GPS_COORDS</span>
                <span className="text-green-500 text-[8px] font-black">STRIPPED</span>
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* Main Security View */}
        <div className="lg:col-span-2 space-y-6">
          <PremiumCard title="LIVE_THREAT_DETECTION">
            <div className="aspect-video bg-slate-950 border border-slate-900 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldAlert className="h-24 w-24 text-slate-900 group-hover:text-amber-500/20 transition-all duration-700" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <div className="flex justify-between text-[8px] font-mono text-slate-600">
                  <span>INTRUSION_ATTEMPTS: 0</span>
                  <span>SYSTEM_INTEGRITY: 100%</span>
                </div>
                <div className="h-1 bg-slate-900 overflow-hidden">
                  <div className="bg-green-500 h-full w-full" />
                </div>
              </div>
            </div>
          </PremiumCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PremiumCard title="I2P_SESSIONS">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Active_Tunnel: 0x4444</span>
                </div>
                <Button variant="outline" className="w-full border-slate-800 text-[10px] font-mono h-10 rounded-none uppercase">Rotate_Tunnel</Button>
              </div>
            </PremiumCard>
            <PremiumCard title="WIRE_PROTOCOL">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Double_Ratchet_Active</span>
                </div>
                <Button variant="outline" className="w-full border-slate-800 text-[10px] font-mono h-10 rounded-none uppercase">Key_Exchange</Button>
              </div>
            </PremiumCard>
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <PremiumCard title="PANIC_BUTTON">
            <div className="space-y-4">
              <p className="text-[10px] text-slate-500 uppercase italic">"Instant termination of all circuits and local data erasure."</p>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-8 rounded-none uppercase text-sm shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                ACTIVATE_PANIC
              </Button>
            </div>
          </PremiumCard>

          <PremiumCard title="WARRANT_CANARY">
            <div className="p-4 bg-green-500/5 border border-green-500/20 text-center">
              <p className="text-[10px] font-mono text-green-500 font-black uppercase">STATUS: ALL_CLEAR</p>
              <p className="text-[8px] text-slate-500 mt-2 uppercase">Last Verified: May 22, 2026</p>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default SecurityCommandCenter;
