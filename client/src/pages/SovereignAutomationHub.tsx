import React, { useState } from 'react';
import { Bot, Play, Square, Settings, Zap, TrendingUp, MessageCircle, ShoppingBag, Shield, Activity, Plus, CheckCircle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const BOTS = [
  { id: 1, name: 'TradeMaster Bot', type: 'Trading', desc: 'Auto-trades BTC/ETH based on RSI + MACD signals', status: 'running', profit: '+$2,847', trades: 312, icon: TrendingUp, color: 'green' },
  { id: 2, name: 'Social Poster', type: 'Social', desc: 'Auto-posts content to feed at optimal times', status: 'running', profit: '+4.2K reach', trades: 89, icon: MessageCircle, color: 'blue' },
  { id: 3, name: 'Arbitrage Scanner', type: 'Trading', desc: 'Scans 12 exchanges for price gaps', status: 'paused', profit: '+$1,200', trades: 44, icon: Zap, color: 'amber' },
  { id: 4, name: 'NFT Sniper', type: 'NFT', desc: 'Snipes underpriced NFTs on OpenSea & Blur', status: 'running', profit: '+$8,400', trades: 17, icon: ShoppingBag, color: 'purple' },
  { id: 5, name: 'Security Watchdog', type: 'Security', desc: 'Monitors wallet addresses for suspicious activity', status: 'running', profit: '3 alerts', trades: 0, icon: Shield, color: 'red' },
  { id: 6, name: 'Yield Optimizer', type: 'DeFi', desc: 'Auto-moves funds to highest APY pools', status: 'paused', profit: '+$640', trades: 28, icon: Activity, color: 'green' },
];

export default function SovereignAutomationHub() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [bots, setBots] = useState(BOTS);
  const [showCreate, setShowCreate] = useState(false);

  const toggle = (id: number) => {
    setBots(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'running' ? 'paused' : 'running' } : b));
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Bot className="h-6 w-6 text-amber-500" /> AUTOMATION_HUB</h1>
          <p className="text-slate-500 text-xs mt-1">Sovereign bot army · Wave 19 · High-agency automation</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 text-xs font-bold transition-all">
          <Plus className="h-4 w-4" /> New Bot
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-950/30 border border-green-800 p-4 text-center">
          <div className="text-2xl font-black text-green-400">{bots.filter(b => b.status === 'running').length}</div>
          <div className="text-xs text-green-600">Running</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 text-center">
          <div className="text-2xl font-black text-yellow-400">{bots.filter(b => b.status === 'paused').length}</div>
          <div className="text-xs text-slate-500">Paused</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 text-center">
          <div className="text-2xl font-black text-white">{bots.length}</div>
          <div className="text-xs text-slate-500">Total Bots</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bots.map(bot => {
          const Icon = bot.icon;
          return (
            <div key={bot.id} className={`bg-slate-900 border p-4 transition-all ${bot.status === 'running' ? 'border-slate-700' : 'border-slate-800 opacity-70'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 text-${bot.color}-500`} />
                  <div>
                    <div className="text-sm font-bold">{bot.name}</div>
                    <div className="text-[10px] text-slate-500">{bot.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black px-2 py-0.5 border ${bot.status === 'running' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>
                    {bot.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mb-3">{bot.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-xs">
                  <div><span className="text-green-400 font-bold">{bot.profit}</span><span className="text-slate-600 ml-1">profit</span></div>
                  <div><span className="text-white font-bold">{bot.trades}</span><span className="text-slate-600 ml-1">actions</span></div>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 border border-slate-700 hover:border-slate-500 transition-all"><Settings className="h-3 w-3 text-slate-500" /></button>
                  <button onClick={() => toggle(bot.id)} className={`p-1.5 border transition-all ${bot.status === 'running' ? 'border-red-800 hover:bg-red-950/30' : 'border-green-800 hover:bg-green-950/30'}`}>
                    {bot.status === 'running' ? <Square className="h-3 w-3 text-red-400" /> : <Play className="h-3 w-3 text-green-400" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 border border-slate-700 p-6 max-w-md w-full space-y-4">
            <h2 className="text-lg font-black">Create New Bot</h2>
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">Bot Name</label>
              <input className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm outline-none" placeholder="My Awesome Bot" />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">Bot Type</label>
              <select className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm outline-none">
                {['Trading', 'Social', 'NFT', 'DeFi', 'Security', 'Custom'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">Trigger</label>
              <select className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm outline-none">
                {['Price Alert', 'Time Schedule', 'On-Chain Event', 'Social Signal', 'Manual'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCreate(false)} className="flex-1 border border-slate-700 text-slate-400 py-2 text-xs font-bold">CANCEL</button>
              <button onClick={() => setShowCreate(false)} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 text-xs font-bold">CREATE BOT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
