import React, { useState } from 'react';
import { UniversalLayout } from '@/components/UniversalLayout';
import { SovereignCard } from '@/components/SovereignCard';
import { SovereignButton } from '@/components/SovereignButton';
import { Video, Play, Users, Heart, Share2, Search, TrendingUp, Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface VideoItem {
  id: string;
  title: string;
  creator: string;
  views: string;
  time: string;
  thumbnail: string;
  category: string;
  isLive?: boolean;
}

export const VideoHub: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeCategory, setActiveCategory] = useState('All');
  
  const videos: VideoItem[] = [
    { id: '1', title: 'SKY4444: The Future of Sovereign Finance', creator: 'Skyler Blue', views: '1.2M', time: '2h ago', thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80', category: 'Trading', isLive: true },
    { id: '2', title: 'How to Use the Shadow Intelligence Engine', creator: 'ShadowAI', views: '450k', time: '5h ago', thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', category: 'AI' },
    { id: '3', title: 'Hope Campus Fund: Global Impact Report', creator: 'Charity Team', views: '120k', time: '1d ago', thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', category: 'Charity' },
    { id: '4', title: 'Live Trading: BTC/USDT Scalping Session', creator: 'Alpha Trader', views: '85k', time: 'Live', thumbnail: 'https://images.unsplash.com/photo-1611974714024-462cd013228c?w=800&q=80', category: 'Trading', isLive: true },
    { id: '5', title: 'Sovereign Dating: AI Matchmaking Explained', creator: 'Dating Hub', views: '300k', time: '3d ago', thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', category: 'Social' },
    { id: '6', title: 'Casino for Charity: Big Wins Compilation', creator: 'Unhinged Casino', views: '2.1M', time: '1w ago', thumbnail: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80', category: 'Casino' },
  ];

  const categories = ['All', 'Trading', 'AI', 'Charity', 'Social', 'Casino', 'Live'];

  return (
    <UniversalLayout>
      <div className="p-6 space-y-6">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-red-500 tracking-tighter flex items-center gap-3">
              <Video className="h-8 w-8" /> VIDEO HUB
            </h1>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Live Streams & Sovereign Content</p>
          </div>
          
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
            <input
              type="text"
              placeholder="Search videos, creators, streams..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:border-red-500 transition-all"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest border transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Live Stream */}
        <div className="relative aspect-video w-full bg-black border border-slate-800 overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=80" 
            alt="Featured" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <div className="absolute top-6 left-6 flex gap-2">
            <div className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest animate-pulse">
              LIVE
            </div>
            <div className="px-3 py-1 bg-black/80 border border-slate-700 text-white text-[10px] font-mono flex items-center gap-2">
              <Users className="h-3 w-3" /> 12,442 WATCHING
            </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8 space-y-4">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-white tracking-tighter">SKY4444: THE FUTURE OF SOVEREIGN FINANCE</h2>
              <p className="text-slate-300 max-w-2xl text-sm">Join Skyler Blue for an exclusive deep dive into the Shadow Intelligence Engine and the roadmap for the Hope Campus Fund.</p>
            </div>
            <div className="flex gap-4">
              <SovereignButton variant="primary" size="lg" className="bg-red-600 border-red-600 hover:bg-red-700">
                <Play className="h-4 w-4 fill-current" /> WATCH NOW
              </SovereignButton>
              <SovereignButton variant="ghost" size="lg">
                <Share2 className="h-4 w-4" /> SHARE
              </SovereignButton>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <div key={video.id} className="group cursor-pointer space-y-3">
              <div className="relative aspect-video bg-slate-900 border border-slate-800 overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                {video.isLive && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest">
                    LIVE
                  </div>
                )}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[8px] font-mono">
                  {video.isLive ? 'LIVE' : '12:44'}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-12 w-12 bg-red-600 flex items-center justify-center rounded-full shadow-xl">
                    <Play className="h-6 w-6 text-white fill-current ml-1" />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="h-10 w-10 bg-slate-800 border border-slate-700 flex-shrink-0 rounded-none flex items-center justify-center">
                  <Zap className="h-5 w-5 text-amber-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-red-400 transition-colors">{video.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase">
                    <span>{video.creator}</span>
                    <span>•</span>
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UniversalLayout>
  );
};

export default VideoHub;
