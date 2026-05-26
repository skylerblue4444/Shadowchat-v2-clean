import React, { useState } from 'react';
import { Mic, Play, Pause, Download, Users, Clock, Star, TrendingUp, Radio, Headphones } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const EPISODES = [
  { id: 1, title: 'Wave 20: The Future of Sovereign Finance', duration: '1:12:44', plays: 12847, date: 'May 22', rating: 4.9, topic: 'Platform' },
  { id: 2, title: 'Grey Area Markets: Opportunity or Risk?', duration: '48:32', plays: 8934, date: 'May 18', rating: 4.8, topic: 'Markets' },
  { id: 3, title: 'Engineer Mode Deep Dive with the Dev Team', duration: '1:24:18', plays: 6201, date: 'May 15', rating: 5.0, topic: 'Tech' },
  { id: 4, title: 'Bitcoin at $100K: When and How', duration: '52:17', plays: 24201, date: 'May 10', rating: 4.9, topic: 'Trading' },
  { id: 5, title: 'Privacy in the Age of CBDCs', duration: '38:44', plays: 9847, date: 'May 5', rating: 4.7, topic: 'Privacy' },
];

export default function SovereignPodcastStudio() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [playing, setPlaying] = useState<number | null>(null);
  const [tab, setTab] = useState<'episodes' | 'record' | 'stats'>('episodes');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Radio className="h-6 w-6 text-red-500" /> PODCAST_STUDIO</h1>
          <p className="text-slate-500 text-xs mt-1">Sovereign crypto podcast · Record & monetize · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-red-400">62K</div><div className="text-[10px] text-slate-500">Total Plays</div></div>
          <div><div className="text-xl font-black text-green-400">4.9★</div><div className="text-[10px] text-slate-500">Avg Rating</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['episodes', 'record', 'stats'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'episodes' && (
        <div className="space-y-2">
          {EPISODES.map(ep => (
            <div key={ep.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 hover:border-red-800 p-4 transition-all">
              <div className="flex items-center gap-3">
                <button onClick={() => setPlaying(playing === ep.id ? null : ep.id)} className={`h-10 w-10 flex items-center justify-center border transition-all ${playing === ep.id ? 'border-red-600 bg-red-950/40 text-red-400' : 'border-slate-700 text-slate-400 hover:border-red-700'}`}>
                  {playing === ep.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <div>
                  <div className="text-sm font-bold">{ep.title}</div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-2">
                    <span className="border border-slate-700 px-1">{ep.topic}</span>
                    <span>{ep.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{ep.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xs font-bold">{ep.plays.toLocaleString()}</div>
                  <div className="text-[9px] text-slate-500">plays</div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-yellow-400"><Star className="h-3 w-3 fill-yellow-400" />{ep.rating}</div>
                <button className="p-1.5 border border-slate-700 hover:border-slate-500 transition-all"><Download className="h-3 w-3 text-slate-500" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'record' && (
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="bg-slate-900 border border-red-900 p-12">
            <Mic className="h-20 w-20 text-red-500 mx-auto mb-4" />
            <div className="text-lg font-black mb-2">RECORDING STUDIO</div>
            <p className="text-slate-500 text-sm mb-6">Record, edit, and publish your podcast directly from the platform</p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 text-sm uppercase tracking-widest transition-all flex items-center gap-2 mx-auto">
              <Mic className="h-4 w-4" /> START RECORDING
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-slate-900 border border-slate-800 p-3"><div className="font-bold text-white">HD Audio</div><div className="text-slate-500">320kbps</div></div>
            <div className="bg-slate-900 border border-slate-800 p-3"><div className="font-bold text-white">AI Edit</div><div className="text-slate-500">Auto-remove silence</div></div>
            <div className="bg-slate-900 border border-slate-800 p-3"><div className="font-bold text-white">Monetize</div><div className="text-slate-500">Crypto subscriptions</div></div>
          </div>
        </div>
      )}

      {tab === 'stats' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Episodes', value: '24', color: 'red' },
            { label: 'Total Plays', value: '62K', color: 'blue' },
            { label: 'Subscribers', value: '8,420', color: 'green' },
            { label: 'Revenue', value: '$2,847', color: 'amber' },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 p-4 text-center">
              <div className={`text-2xl font-black text-${s.color}-400`}>{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
