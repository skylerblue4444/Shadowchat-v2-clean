import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowUp, ArrowDown, Share2, TrendingUp, Users, Search, Plus } from 'lucide-center';
import { LucideIcon, MessageCircle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Sovereign Community Hub — Billion-Dollar Polish
 * Reddit-style engagement with communities, upvoting, and multi-coin tipping.
 */
export const SovereignCommunityHub: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-4 border-b border-slate-900 flex justify-between items-center bg-slate-950/50 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-black tracking-tighter text-indigo-500">SOVEREIGN_COMMUNITY_v10</h1>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
            <input 
              className="bg-slate-900 border border-slate-800 text-[10px] pl-10 pr-4 py-2 w-64 rounded-none focus:border-indigo-500 outline-none font-mono"
              placeholder="Search_Sovereign_Mesh..."
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-400 hover:text-indigo-500">
            <TrendingUp className="h-5 w-5" />
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 rounded-none uppercase text-[10px]">
            <Plus className="h-4 w-4 mr-2" /> CREATE_POST
          </Button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Sub-Sovereigns */}
        <div className="space-y-6 hidden lg:block">
          <PremiumCard title="YOUR_COMMUNITIES">
            <div className="space-y-2">
              {['r/ShadowDevs', 'r/Sky4444_Whales', 'r/DegenCasino', 'r/HackerCTF', 'r/CharityImpact'].map((sub, i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-900 cursor-pointer group transition-colors">
                  <div className="h-6 w-6 bg-slate-800 border border-slate-700 group-hover:border-indigo-500" />
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-200">{sub}</span>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-slate-950 border border-slate-900 flex hover:border-slate-700 transition-all">
              {/* Upvote Column */}
              <div className="w-12 bg-slate-900/30 flex flex-col items-center py-4 gap-2">
                <ArrowUp className="h-5 w-5 text-slate-600 hover:text-indigo-500 cursor-pointer" />
                <span className="text-[10px] font-black text-slate-400">4.2K</span>
                <ArrowDown className="h-5 w-5 text-slate-600 hover:text-rose-500 cursor-pointer" />
              </div>
              
              {/* Content Area */}
              <div className="flex-1 p-4 space-y-2">
                <div className="flex items-center gap-2 text-[8px] font-mono text-slate-500">
                  <span className="text-slate-200 font-bold uppercase">r/ShadowDevs</span>
                  <span>• Posted by User_{Math.floor(Math.random() * 999)} 4h ago</span>
                </div>
                <h3 className="text-sm font-bold text-slate-200">New Shadow Kernel mutation detected in Sandbox #4. Anyone else seeing this?</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  The AST mutation engine is rewriting the request structure for all crypto-escrow endpoints. Looks like a polymorphic adaptation to the latest rate limits.
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2 text-[8px] font-mono text-slate-500 hover:text-slate-200 cursor-pointer">
                    <MessageCircle className="h-3 w-3" /> 142 Comments
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-mono text-slate-500 hover:text-slate-200 cursor-pointer">
                    <Share2 className="h-3 w-3" /> Share
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-mono text-slate-500 hover:text-indigo-500 cursor-pointer">
                    <SovereignBadge label="TIP_SKY" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar: Rules & Stats */}
        <div className="space-y-6">
          <PremiumCard title="COMMUNITY_RULES">
            <div className="space-y-4 text-[10px] font-mono text-slate-500">
              <p>1. No unauthorized kernel exposure.</p>
              <p>2. Maintain strategic compliance.</p>
              <p>3. Tip your fellow runners.</p>
            </div>
          </PremiumCard>

          <PremiumCard title="TOP_CONTRIBUTORS">
            <div className="space-y-4">
              {[1, 2, 3].map((rank) => (
                <div key={rank} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-600">#{rank}</span>
                    <span className="text-[10px] font-black text-slate-300 uppercase">Hacker_Zero</span>
                  </div>
                  <span className="text-indigo-500 text-[10px] font-mono">+12.4K XP</span>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default SovereignCommunityHub;
