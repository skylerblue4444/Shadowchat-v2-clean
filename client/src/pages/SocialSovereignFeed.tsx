import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Share2, TrendingUp, Users, Shield, Send, MoreHorizontal } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Social Sovereign Feed — Billion-Dollar Polish
 * Deep-profiled social engagement with multi-coin tipping and AI curation.
 */
export const SocialSovereignFeed: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/50">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-indigo-500">SOVEREIGN_SOCIAL_v10</h1>
          <GlobalStatus />
        </div>
        <div className="flex gap-4">
          <SovereignBadge label="AI_CURATION_ACTIVE" />
          <SovereignBadge label="TIPPING_ENABLED" />
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Navigation & Trends */}
        <div className="space-y-6">
          <PremiumCard title="TRENDING_NOW">
            <div className="space-y-4">
              {['#SKY4444', '#ShadowKernel', '#UnhingedAI', '#BTC_Long', '#DegenRoulette'].map((tag, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                  <span className="text-xs font-mono text-slate-400 group-hover:text-indigo-500 transition-colors">{tag}</span>
                  <span className="text-[10px] text-slate-600">4.2K posts</span>
                </div>
              ))}
            </div>
          </PremiumCard>

          <PremiumCard title="YOUR_SQUAD">
            <div className="flex -space-x-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 w-8 rounded-none border border-black bg-slate-800 flex items-center justify-center">
                  <Users className="h-4 w-4 text-slate-500" />
                </div>
              ))}
              <div className="h-8 w-8 rounded-none border border-black bg-indigo-600 flex items-center justify-center text-[10px] font-black">+12</div>
            </div>
          </PremiumCard>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <div className="p-6 bg-slate-950 border border-slate-900 space-y-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-slate-800 border border-slate-700 flex-shrink-0" />
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-200 placeholder:text-slate-600 resize-none h-20"
                placeholder="Broadcast to the Sovereign Mesh..."
              />
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-900">
              <div className="flex gap-4">
                <Shield className="h-4 w-4 text-slate-500 cursor-pointer hover:text-indigo-500" />
                <Users className="h-4 w-4 text-slate-500 cursor-pointer hover:text-indigo-500" />
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 rounded-none uppercase text-[10px]">BROADCAST</Button>
            </div>
          </div>

          {/* Feed Items */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6 bg-slate-950 border border-slate-900 space-y-4 group hover:border-indigo-500/30 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="h-10 w-10 bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center">
                    <Users className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-200">User_{Math.floor(Math.random() * 9999)} <SovereignBadge label="VERIFIED" /></p>
                    <p className="text-[10px] text-slate-500 font-mono">14m ago via SHADOW_MESH</p>
                  </div>
                </div>
                <MoreHorizontal className="h-4 w-4 text-slate-700 cursor-pointer" />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Just successfully deployed the v10.4 Shadow Kernel to the production pool. The hashrate is peaking at 44.4 TH/s. #SKY4444 #SovereignEngineering
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-900">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2 text-slate-500 hover:text-indigo-500 cursor-pointer transition-colors">
                    <Heart className="h-4 w-4" /> <span className="text-[10px] font-mono">42</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 hover:text-indigo-500 cursor-pointer transition-colors">
                    <MessageSquare className="h-4 w-4" /> <span className="text-[10px] font-mono">12</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 hover:text-indigo-500 cursor-pointer transition-colors">
                    <Share2 className="h-4 w-4" />
                  </div>
                </div>
                <Button variant="outline" className="border-indigo-500/30 text-indigo-500 hover:bg-indigo-500 hover:text-white text-[8px] font-black h-8 rounded-none uppercase">
                  <Send className="h-3 w-3 mr-2" /> TIP_SKY
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar: Suggestions & AI */}
        <div className="space-y-6">
          <PremiumCard title="AI_SUGGESTIONS">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-slate-900 border border-slate-800" />
                    <span className="text-[10px] font-black text-slate-300 uppercase">Degen_Master</span>
                  </div>
                  <Button variant="ghost" className="h-6 text-[8px] text-indigo-500 p-0 hover:bg-transparent uppercase">Follow</Button>
                </div>
              ))}
            </div>
          </PremiumCard>

          <PremiumCard title="NETWORK_ACTIVITY">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400">MESH_NODES: 4,444 ACTIVE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400">TX_VOLUME: 1.2M SKY/HR</span>
              </div>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default SocialSovereignFeed;
