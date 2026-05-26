import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import { 
  Zap, 
  TrendingUp, 
  Shield, 
  ShoppingCart, 
  MessageSquare, 
  Gamepad2, 
  Cpu, 
  Wallet, 
  BarChart3, 
  Globe 
} from 'lucide-react';
import { Link } from 'wouter';

/**
 * Unified Billion-Dollar Super App Dashboard
 * The master command center wiring all high-agency sectors.
 */
export const BillionDollarDashboard: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const sectors = [
    { name: 'SOVEREIGN_ENGINEER', icon: Cpu, color: 'text-blue-500', path: '/dashboard/sovereign-engineer', status: 'FREE_WILL_ACTIVE' },
    { name: 'DAY_TRADE_PARTNER', icon: TrendingUp, color: 'text-amber-500', path: '/dashboard/day-trade-partner', status: 'SNIPING_ACTIVE' },
    { name: 'MULTI_COIN_WALLET', icon: Wallet, color: 'text-green-500', path: '/dashboard/wallet', status: 'SKY4444_SYNCED' },
    { name: 'UNHINGED_CASINO', icon: Gamepad2, color: 'text-red-500', path: '/dashboard/casino', status: 'HOUSE_EDGE_MINIMIZED' },
    { name: 'SHADOW_MARKET', icon: ShoppingCart, color: 'text-purple-500', path: '/dashboard/marketplace', status: 'ESCROW_WIRED' },
    { name: 'SOVEREIGN_SOCIAL', icon: MessageSquare, color: 'text-cyan-500', path: '/dashboard/social-feed', status: 'WIRETAP_PROFILING' },
    { name: 'GLOBAL_ANALYTICS', icon: BarChart3, color: 'text-slate-400', path: '/dashboard/analytics', status: 'LIVE_DATA' },
    { name: 'ANTI_SURVEILLANCE', icon: Shield, color: 'text-indigo-500', path: '/dashboard/security', status: 'SHADOW_KERNEL_ACTIVE' },
  ];

  return (
    <div className="p-6 space-y-8 bg-slate-950 text-white min-h-screen font-sans selection:bg-amber-500/30">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 bg-clip-text text-transparent">
            SUPER APP COMMAND
          </h1>
          <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">Sovereign Ecosystem v10.1.0 — Billion Dollar Grade</p>
        </div>
        <div className="flex gap-4">
          <Button className="bg-amber-600 hover:bg-amber-700 text-black font-bold px-8 py-6 text-lg rounded-none skew-x-[-12deg]">
            <Zap className="mr-2 h-5 w-5 fill-current" /> EXECUTE GLOBAL ACTION
          </Button>
        </div>
      </div>

      {/* Main Sector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sectors.map((sector) => (
          <Link key={sector.name} href={sector.path}>
            <Card className="bg-slate-900 border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                <sector.icon className={`h-12 w-12 ${sector.color}`} />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono text-slate-500 tracking-tighter uppercase">{sector.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-slate-800 group-hover:bg-slate-700 transition-colors`}>
                    <sector.icon className={`h-6 w-6 ${sector.color}`} />
                  </div>
                  <p className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                    {sector.name.replace(/_/g, ' ')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-green-500/80 uppercase tracking-widest">{sector.status}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Global Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        <Card className="lg:col-span-2 bg-black border-slate-800 border-l-4 border-l-amber-600">
          <CardHeader>
            <CardTitle className="text-slate-300 flex items-center gap-2 text-sm uppercase font-mono tracking-widest">
              <Globe className="h-4 w-4 text-amber-500" /> Global Ecosystem Velocity
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center border-t border-slate-900 mt-4">
            <div className="text-center space-y-2">
              <p className="text-5xl font-black text-white">$1,240,560,342.00</p>
              <p className="text-amber-500 font-mono text-xs tracking-widest">TOTAL AGGREGATED VALUE LOCKED (TAVL)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-300 text-sm uppercase font-mono tracking-widest">Network Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'BLOCKCHAIN_SYNC', val: '99.9%' },
              { label: 'AI_AGENT_LOAD', val: '14%' },
              { label: 'SHADOW_POOL_DEPTH', val: '$44M' },
            ].map(stat => (
              <div key={stat.label} className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-500 font-mono">{stat.label}</span>
                <span className="text-sm font-bold text-amber-500">{stat.val}</span>
              </div>
            ))}
            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-xs font-mono py-2 mt-4">
              REBOOT SOVEREIGN KERNEL
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
