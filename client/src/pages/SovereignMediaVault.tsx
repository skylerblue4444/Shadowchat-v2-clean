import React, { useState } from 'react';
import { Play, Music, Image, FileText, Lock, Eye, Upload, Download, Star, Clock, Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const MEDIA = [
  { id: 1, title: 'BTC Bull Run Analysis 2026', type: 'video', duration: '24:18', size: '840 MB', access: 'public', views: 12847, date: 'May 20' },
  { id: 2, title: 'Sovereign Wealth Strategy', type: 'video', duration: '47:32', size: '1.8 GB', access: 'premium', views: 4201, date: 'May 18' },
  { id: 3, title: 'Grey Area Market Deep Dive', type: 'video', duration: '1:12:44', size: '2.4 GB', access: 'vip', views: 892, date: 'May 15' },
  { id: 4, title: 'SKY444 Platform Walkthrough', type: 'video', duration: '18:22', size: '620 MB', access: 'public', views: 28420, date: 'May 10' },
  { id: 5, title: 'Crypto Tax Masterclass', type: 'audio', duration: '1:08:00', size: '94 MB', access: 'premium', views: 3108, date: 'May 8' },
  { id: 6, title: 'Engineering Mode Tutorial', type: 'video', duration: '32:15', size: '1.1 GB', access: 'public', views: 6420, date: 'May 5' },
];

export default function SovereignMediaVault() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? MEDIA : MEDIA.filter(m => m.access === filter || m.type === filter);

  const accessColor = (access: string) => access === 'public' ? 'text-green-400 border-green-800' : access === 'premium' ? 'text-amber-400 border-amber-800' : 'text-purple-400 border-purple-800';

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Play className="h-6 w-6 text-red-500" /> MEDIA_VAULT</h1>
          <p className="text-slate-500 text-xs mt-1">Sovereign content library · Encrypted · Wave 19</p>
        </div>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 transition-all">
          <Upload className="h-3 w-3" /> Upload
        </button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'public', 'premium', 'vip', 'video', 'audio'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-bold border transition-all ${filter === f ? 'border-red-600 text-red-400 bg-red-950/30' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>{f.toUpperCase()}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(media => (
          <div key={media.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 hover:border-slate-600 p-4 transition-all">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${media.type === 'video' ? 'bg-red-950/40 border border-red-900' : 'bg-blue-950/40 border border-blue-900'}`}>
                {media.type === 'video' ? <Play className="h-4 w-4 text-red-400" /> : <Music className="h-4 w-4 text-blue-400" />}
              </div>
              <div>
                <div className="text-sm font-bold">{media.title}</div>
                <div className="text-[10px] text-slate-500">{media.duration} · {media.size} · {media.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-[10px] text-slate-500 flex items-center gap-1"><Eye className="h-3 w-3" /> {media.views.toLocaleString()}</div>
              <span className={`text-[9px] font-black px-2 py-0.5 border ${accessColor(media.access)}`}>{media.access.toUpperCase()}</span>
              <button className="text-slate-600 hover:text-white"><Download className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
