import React, { useState, useEffect } from 'react';
import { Zap, Globe, Shield, TrendingUp, Users, DollarSign, Cpu, Activity, MessageCircle, Camera, Music, ShoppingBag, Gamepad2, Heart, Star, ArrowRight, BarChart3 } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const MODULES = [
  { id: 'trading', label: 'Live Trading', icon: TrendingUp, color: 'green', route: '/dashboard/trading', status: 'LIVE', users: '12.4K' },
  { id: 'social', label: 'Social Feed', icon: Users, color: 'blue', route: '/dashboard/feed', status: 'LIVE', users: '89.2K' },
  { id: 'wallet', label: 'Crypto Wallet', icon: DollarSign, color: 'amber', route: '/dashboard/wallet', status: 'LIVE', users: '34.7K' },
  { id: 'ai', label: 'Hope AI', icon: Cpu, color: 'purple', route: '/dashboard/hope-ai', status: 'LIVE', users: '7.8K' },
  { id: 'messages', label: 'Messaging', icon: MessageCircle, color: 'blue', route: '/dashboard/messaging-hub', status: 'LIVE', users: '45.1K' },
  { id: 'creator', label: 'Creator Studio', icon: Camera, color: 'pink', route: '/dashboard/creator-studio', status: 'LIVE', users: '8.3K' },
  { id: 'music', label: 'Music', icon: Music, color: 'green', route: '/dashboard/music', status: 'BETA', users: '3.2K' },
  { id: 'market', label: 'Marketplace', icon: ShoppingBag, color: 'orange', route: '/dashboard/marketplace', status: 'LIVE', users: '22.6K' },
  { id: 'games', label: 'Game Center', icon: Gamepad2, color: 'red', route: '/dashboard/games', status: 'LIVE', users: '15.9K' },
  { id: 'dating', label: 'Dating', icon: Heart, color: 'pink', route: '/dashboard/dating', status: 'LIVE', users: '9.4K' },
  { id: 'protection', label: 'Protection', icon: Shield, color: 'blue', route: '/dashboard/protection-monitor', status: 'NEW', users: '2.1K' },
  { id: 'engineer', label: 'Engineer Mode', icon: Zap, color: 'green', route: '/dashboard/engineer-terminal', status: 'NEW', users: '441' },
];

const STATS = [
  { label: 'Total Users', value: '2.4M', delta: '+12%', color: 'green' },
  { label: 'Daily Active', value: '847K', delta: '+8%', color: 'green' },
  { label: 'Revenue MTD', value: '$4.2M', delta: '+23%', color: 'green' },
  { label: 'Transactions', value: '12.8M', delta: '+31%', color: 'green' },
  { label: 'Uptime', value: '99.97%', delta: '0%', color: 'blue' },
  { label: 'Latency', value: '12ms', delta: '-3ms', color: 'green' },
];

export default function SuperAppCommandCenter() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [time, setTime] = useState(new Date());
  const [activeModule, setActiveModule] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-mono p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-slate-900 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">SKY444_SUPER_APP</h1>
          <p className="text-slate-600 text-xs mt-1">Command Center · Wave 19 · Engineer Mode</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-amber-400 tabular-nums">{time.toLocaleTimeString()}</div>
          <div className="text-[10px] text-slate-600">{time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {STATS.map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 p-3 text-center">
            <div className={`text-lg font-black text-${s.color}-400`}>{s.value}</div>
            <div className="text-[9px] text-slate-500">{s.label}</div>
            <div className={`text-[9px] font-bold text-${s.color}-600`}>{s.delta}</div>
          </div>
        ))}
      </div>

      {/* Module Grid */}
      <h2 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">Active Modules ({MODULES.length})</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {MODULES.map(mod => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              onClick={() => setActiveModule(mod.id === activeModule ? null : mod.id)}
              className={`border p-4 cursor-pointer transition-all ${activeModule === mod.id ? `border-${mod.color}-600 bg-${mod.color}-950/20` : 'border-slate-800 hover:border-slate-600 bg-slate-900'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <Icon className={`h-5 w-5 text-${mod.color}-500`} />
                <span className={`text-[9px] font-black px-1.5 py-0.5 border ${
                  mod.status === 'LIVE' ? 'border-green-800 text-green-500' :
                  mod.status === 'BETA' ? 'border-yellow-800 text-yellow-500' :
                  'border-blue-800 text-blue-400'
                }`}>{mod.status}</span>
              </div>
              <div className="text-xs font-bold mb-1">{mod.label}</div>
              <div className="text-[10px] text-slate-500">{mod.users} users</div>
            </div>
          );
        })}
      </div>

      {/* Live Activity Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
            <Activity className="h-3 w-3 text-green-500" /> Live Activity
          </h3>
          <div className="space-y-2 text-xs">
            {[
              { action: 'Trade executed', detail: 'BTC/USDT $47,200', time: '2s ago', color: 'green' },
              { action: 'New subscriber', detail: 'Creator @sky_art', time: '5s ago', color: 'pink' },
              { action: 'Wallet deposit', detail: '0.5 ETH received', time: '8s ago', color: 'amber' },
              { action: 'AI query', detail: 'Hope AI responded', time: '11s ago', color: 'purple' },
              { action: 'Message sent', detail: 'Encrypted DM', time: '14s ago', color: 'blue' },
              { action: 'NFT minted', detail: 'SkyArt #4444', time: '18s ago', color: 'green' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-slate-800 last:border-0">
                <div>
                  <span className={`text-${item.color}-400 font-bold`}>{item.action}</span>
                  <span className="text-slate-500 ml-2">{item.detail}</span>
                </div>
                <span className="text-slate-700 text-[10px]">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
            <BarChart3 className="h-3 w-3 text-blue-500" /> Module Health
          </h3>
          <div className="space-y-2">
            {MODULES.slice(0, 6).map(mod => (
              <div key={mod.id} className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500 w-24">{mod.label}</span>
                <div className="flex-1 bg-slate-800 h-1.5">
                  <div
                    className={`h-full bg-${mod.color}-500`}
                    style={{ width: `${75 + Math.random() * 25}%` }}
                  />
                </div>
                <span className="text-[10px] text-green-400 w-8 text-right">OK</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
