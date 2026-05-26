import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { Play, SkipForward, SkipBack, Volume2, Maximize, MessageSquare, Heart, Share2 } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Sovereign Media Terminal — Billion-Dollar Polish
 * YouTube-grade live streaming and video-on-demand with multi-coin tips.
 */
export const SovereignMediaTerminal: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/50">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-red-600">SOVEREIGN_MEDIA_v10</h1>
          <GlobalStatus />
        </div>
        <div className="flex gap-4">
          <SovereignBadge label="4K_STREAM_ACTIVE" />
          <SovereignBadge label="LIVE_TIPS_ON" />
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Video Player Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="aspect-video bg-slate-950 border border-slate-900 relative group overflow-hidden">
            {/* Player Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div className="flex gap-6 items-center">
                <Play className="h-6 w-6 text-white cursor-pointer fill-current" />
                <div className="flex gap-4 items-center">
                  <SkipBack className="h-4 w-4 text-slate-400" />
                  <SkipForward className="h-4 w-4 text-slate-400" />
                </div>
                <div className="w-64 bg-slate-800 h-1 rounded-full relative">
                  <div className="bg-red-600 h-full w-[45%]" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[45%] h-3 w-3 bg-red-600 rounded-full" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">14:42 / 32:00</span>
              </div>
              <div className="flex gap-6 items-center">
                <Volume2 className="h-5 w-5 text-slate-400" />
                <Maximize className="h-5 w-5 text-slate-400" />
              </div>
            </div>
            {/* Live Indicator */}
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-tighter">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse" /> LIVE
            </div>
            {/* Visual Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Play className="h-32 w-32" />
            </div>
          </div>

          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tighter">SHADOW_KERNEL_EXPOSURE: Autonomous Logic Mutation v10.4</h2>
              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500">
                <span>14,444 VIEWS</span>
                <span>STREAMED 2H AGO</span>
                <span className="text-red-600">#SOVEREIGN_DEV</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="border-slate-800 text-[10px] font-mono h-10 rounded-none uppercase">
                <Heart className="h-4 w-4 mr-2" /> LIKE
              </Button>
              <Button variant="outline" className="border-slate-800 text-[10px] font-mono h-10 rounded-none uppercase">
                <Share2 className="h-4 w-4 mr-2" /> SHARE
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white font-black px-8 rounded-none uppercase text-[10px]">
                TIP_BTC
              </Button>
            </div>
          </div>

          <div className="p-6 bg-slate-950 border border-slate-900">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-red-600/10 border border-red-500/30 flex items-center justify-center">
                <div className="h-8 w-8 bg-red-600 rounded-none" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-200 uppercase">Shadow_Broadcasting_Network <SovereignBadge label="OFFICIAL" /></p>
                <p className="text-[10px] text-slate-500 font-mono">1.2M SUBSCRIBERS</p>
              </div>
              <Button className="ml-auto bg-white text-black font-black px-8 rounded-none uppercase text-[10px] hover:bg-slate-200">SUBSCRIBE</Button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              In this session, we deep-dive into the Shadow Intelligence Engine and its ability to autonomously mutate logic segments within the active Node.js process. We explore the Master Kill Switch and the traffic mirroring protocols used for live system learning.
            </p>
          </div>
        </div>

        {/* Live Chat Sidebar */}
        <div className="space-y-6">
          <PremiumCard title="LIVE_CHAT">
            <div className="h-[400px] flex flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto mb-4 scrollbar-hide">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex gap-3 text-[10px] font-mono">
                    <span className="text-red-500 font-bold">User_{Math.floor(Math.random() * 999)}:</span>
                    <span className="text-slate-400">Is the Shadow Kernel stable on v10.4?</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  className="flex-1 bg-slate-900 border border-slate-800 text-[10px] px-3 py-2 rounded-none focus:border-red-600 outline-none font-mono"
                  placeholder="Chat_as_Sovereign..."
                />
                <Button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-none">
                  <Play className="h-4 w-4 fill-current" />
                </Button>
              </div>
            </div>
          </PremiumCard>

          <PremiumCard title="UP_NEXT">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-24 aspect-video bg-slate-900 border border-slate-800 flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity">
                      <Play className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-200 line-clamp-2 uppercase">DEVOPS_SPRINT: Autonomous Deployment v10.5</p>
                    <p className="text-[8px] text-slate-500 font-mono mt-1 uppercase">Shadow_Network • 42K Views</p>
                  </div>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default SovereignMediaTerminal;
