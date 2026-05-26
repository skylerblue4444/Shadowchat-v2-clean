import React, { useState } from 'react';
import { Package, Star, Download, Zap, Shield, TrendingUp, MessageCircle, Camera, Gamepad2, DollarSign, Search, Filter } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const APPS = [
  { id: 1, name: 'TradePilot Pro', category: 'Trading', icon: TrendingUp, color: 'green', rating: 4.9, downloads: '124K', price: 'FREE', desc: 'AI-powered trading signals & automation', badge: 'FEATURED' },
  { id: 2, name: 'VaultGuard', category: 'Security', icon: Shield, color: 'blue', rating: 4.8, downloads: '89K', price: 'FREE', desc: 'Cold wallet & key management', badge: 'TOP' },
  { id: 3, name: 'ShadowChat', category: 'Messaging', icon: MessageCircle, color: 'green', rating: 4.9, downloads: '312K', price: 'FREE', desc: 'E2E encrypted messaging', badge: 'POPULAR' },
  { id: 4, name: 'CreatorPay', category: 'Monetize', icon: Camera, color: 'pink', rating: 4.7, downloads: '44K', price: '$9.99/mo', desc: 'Crypto-native creator monetization', badge: 'NEW' },
  { id: 5, name: 'DeFi Yield', category: 'DeFi', icon: DollarSign, color: 'amber', rating: 4.6, downloads: '67K', price: 'FREE', desc: 'Auto-compound yield farming', badge: 'HOT' },
  { id: 6, name: 'Sky Arcade', category: 'Games', icon: Gamepad2, color: 'purple', rating: 4.5, downloads: '203K', price: 'FREE', desc: 'Play-to-earn crypto games', badge: 'POPULAR' },
  { id: 7, name: 'BotFactory', category: 'Automation', icon: Zap, color: 'amber', rating: 4.8, downloads: '28K', price: '$19.99/mo', desc: 'No-code trading bot builder', badge: 'NEW' },
  { id: 8, name: 'OTC Desk', category: 'Trading', icon: TrendingUp, color: 'green', rating: 4.9, downloads: '12K', price: 'FREE', desc: 'Large-block P2P crypto trades', badge: 'FEATURED' },
];

const CATEGORIES = ['All', 'Trading', 'Security', 'Messaging', 'Monetize', 'DeFi', 'Games', 'Automation'];

export default function Sky444AppStore() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [installed, setInstalled] = useState<number[]>([1, 3]);

  const filtered = APPS.filter(a =>
    (category === 'All' || a.category === category) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase()))
  );

  const toggle = (id: number) => setInstalled(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Package className="h-6 w-6 text-amber-500" /> SKY444_APP_STORE</h1>
          <p className="text-slate-500 text-xs mt-1">Mini-apps & extensions for the SKY444 super-app · Wave 19</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-amber-400">{APPS.length}</div><div className="text-[10px] text-slate-500">Apps</div></div>
          <div><div className="text-xl font-black text-green-400">{installed.length}</div><div className="text-[10px] text-slate-500">Installed</div></div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-700 px-3">
          <Search className="h-4 w-4 text-slate-500" />
          <input className="flex-1 bg-transparent py-2 text-sm outline-none placeholder-slate-600" placeholder="Search apps..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1.5 text-xs font-bold border transition-all ${category === cat ? 'border-amber-600 text-amber-400 bg-amber-950/30' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>{cat}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(app => {
          const Icon = app.icon;
          const isInstalled = installed.includes(app.id);
          return (
            <div key={app.id} className="bg-slate-900 border border-slate-800 hover:border-slate-600 p-4 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 bg-${app.color}-950/40 border border-${app.color}-800`}>
                  <Icon className={`h-6 w-6 text-${app.color}-500`} />
                </div>
                <span className={`text-[9px] font-black px-1.5 py-0.5 border ${
                  app.badge === 'FEATURED' ? 'border-amber-700 text-amber-400' :
                  app.badge === 'TOP' ? 'border-blue-700 text-blue-400' :
                  app.badge === 'NEW' ? 'border-green-700 text-green-400' :
                  app.badge === 'HOT' ? 'border-red-700 text-red-400' :
                  'border-slate-700 text-slate-400'
                }`}>{app.badge}</span>
              </div>
              <div className="text-sm font-bold mb-1">{app.name}</div>
              <div className="text-[10px] text-slate-500 mb-3">{app.desc}</div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-[10px] text-yellow-400">
                  <Star className="h-3 w-3 fill-yellow-400" /> {app.rating}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Download className="h-3 w-3" /> {app.downloads}
                </div>
              </div>
              <button
                onClick={() => toggle(app.id)}
                className={`w-full py-2 text-xs font-bold transition-all ${isInstalled ? 'border border-slate-700 text-slate-400 hover:border-red-800 hover:text-red-400' : 'bg-amber-600 hover:bg-amber-700 text-white'}`}
              >
                {isInstalled ? 'INSTALLED ✓' : app.price === 'FREE' ? 'GET FREE' : app.price}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
