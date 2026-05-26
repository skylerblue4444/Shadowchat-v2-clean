import React from 'react';
import { UniversalLayout } from '@/components/UniversalLayout';
import { SovereignCard } from '@/components/SovereignCard';
import { Compass, TrendingUp, Zap, Heart, Users, ShoppingCart, Cpu, Star, Globe, Search } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

export const Explore: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const trending = [
    { tag: '#SKY4444', count: '12.4k trades' },
    { tag: '#HopeFund', count: '$1.2M raised' },
    { tag: '#ShadowAI', count: '85% accuracy' },
    { tag: '#DeFiSummer', count: '2.1k posts' },
  ];

  const categories = [
    { name: 'Trading', icon: <TrendingUp className="h-5 w-5" />, color: 'green', count: '42 pages' },
    { name: 'Intelligence', icon: <Cpu className="h-5 w-5" />, color: 'purple', count: '12 pages' },
    { name: 'Charity', icon: <Heart className="h-5 w-5" />, color: 'pink', count: '8 pages' },
    { name: 'Social', icon: <Users className="h-5 w-5" />, color: 'blue', count: '24 pages' },
    { name: 'Casino', icon: <Star className="h-5 w-5" />, color: 'amber', count: '15 pages' },
    { name: 'Marketplace', icon: <ShoppingCart className="h-5 w-5" />, color: 'orange', count: '31 pages' },
  ];

  return (
    <UniversalLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-cyan-400 tracking-tighter flex items-center gap-3">
            <Compass className="h-10 w-10" /> EXPLORE
          </h1>
          <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">Discover the Shadow Platform Ecosystem</p>
        </div>

        {/* Search & Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-600" />
              <input
                type="text"
                placeholder="Search anything on the platform..."
                className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 text-white text-sm outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SovereignCard title="Featured Discovery" accent="cyan" icon={<Globe className="h-5 w-5" />}>
                <div className="aspect-video bg-black border border-slate-800 relative overflow-hidden group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" 
                    alt="Discovery" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-black text-cyan-400 uppercase tracking-widest">New Feature</p>
                    <h3 className="text-lg font-bold text-white">Quantum Vault V2 is Live</h3>
                  </div>
                </div>
              </SovereignCard>

              <SovereignCard title="Trending Now" accent="amber" icon={<TrendingUp className="h-5 w-5" />}>
                <div className="space-y-4">
                  {trending.map(item => (
                    <div key={item.tag} className="flex justify-between items-center group cursor-pointer">
                      <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{item.tag}</span>
                      <span className="text-[10px] font-mono text-slate-500">{item.count}</span>
                    </div>
                  ))}
                </div>
              </SovereignCard>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <SovereignCard title="Categories" accent="blue" icon={<Zap className="h-5 w-5" />}>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    className="w-full flex items-center justify-between p-3 bg-black/30 border border-slate-800 hover:border-cyan-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-slate-500 group-hover:text-cyan-400 transition-colors">{cat.icon}</div>
                      <span className="text-[10px] font-black uppercase text-white">{cat.name}</span>
                    </div>
                    <span className="text-[8px] font-mono text-slate-600">{cat.count}</span>
                  </button>
                ))}
              </div>
            </SovereignCard>
          </div>
        </div>

        {/* Global Activity Feed */}
        <SovereignCard title="Global Activity" accent="purple" icon={<Activity className="h-5 w-5" />}>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-start gap-4 p-4 bg-black/30 border border-slate-800">
                <div className="h-10 w-10 bg-slate-900 border border-slate-800 flex-shrink-0 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-white">
                    <span className="font-bold text-blue-400">User_{i}444</span> joined the <span className="font-bold text-green-400">Trade Room</span>
                  </p>
                  <p className="text-[9px] text-slate-500 font-mono uppercase">2 minutes ago • Global Alpha Room</p>
                </div>
                <SovereignButton variant="ghost" size="sm">VIEW</SovereignButton>
              </div>
            ))}
          </div>
        </SovereignCard>
      </div>
    </UniversalLayout>
  );
};

import { Activity } from 'lucide-react';

export default Explore;
