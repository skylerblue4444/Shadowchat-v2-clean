import React, { useState } from 'react';
import { Activity, Heart, Zap, TrendingUp, Shield, Star, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const METRICS = [
  { label: 'Steps Today', value: '8,420', goal: '10,000', pct: 84, icon: '👟', reward: '+42 SKY444' },
  { label: 'Sleep', value: '7.2 hrs', goal: '8 hrs', pct: 90, icon: '😴', reward: '+20 SKY444' },
  { label: 'Water', value: '6 glasses', goal: '8 glasses', pct: 75, icon: '💧', reward: '+15 SKY444' },
  { label: 'Workout', value: '45 min', goal: '60 min', pct: 75, icon: '💪', reward: '+50 SKY444' },
];

const CHALLENGES = [
  { name: '10K Steps Daily', duration: '30 days', reward: '1,000 SKY444', participants: 4201, joined: true },
  { name: 'No Sugar Week', duration: '7 days', reward: '200 SKY444', participants: 892, joined: false },
  { name: 'Meditation Streak', duration: '21 days', reward: '500 SKY444', participants: 1847, joined: true },
];

export default function SovereignHealthTracker() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'today' | 'challenges' | 'rewards'>('today');
  const totalEarned = 127;

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Heart className="h-6 w-6 text-red-500" /> HEALTH_TRACKER</h1>
          <p className="text-slate-500 text-xs mt-1">Earn SKY444 tokens for healthy habits · Wave 20</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-green-400">{totalEarned} SKY444</div>
          <div className="text-[10px] text-slate-500">Earned today</div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['today', 'challenges', 'rewards'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'today' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRICS.map(m => (
            <div key={m.label} className="bg-slate-900 border border-slate-800 p-4">
              <div className="text-3xl mb-2">{m.icon}</div>
              <div className="text-[10px] text-slate-500 mb-1">{m.label}</div>
              <div className="text-xl font-black text-white mb-1">{m.value}</div>
              <div className="text-[9px] text-slate-600 mb-2">Goal: {m.goal}</div>
              <div className="bg-slate-800 h-2 mb-2"><div className={`h-full ${m.pct >= 100 ? 'bg-green-500' : m.pct >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width:`${m.pct}%`}} /></div>
              <div className="text-[9px] text-green-400 font-bold">{m.reward}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'challenges' && (
        <div className="space-y-3">
          {CHALLENGES.map(c => (
            <div key={c.name} className={`border p-4 ${c.joined ? 'border-green-800 bg-green-950/10' : 'border-slate-800 bg-slate-900'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold">{c.name}</div>
                <div className="text-sm font-black text-green-400">{c.reward}</div>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-500 mb-3">
                <span><Clock className="h-3 w-3 inline mr-1" />{c.duration}</span>
                <span><Activity className="h-3 w-3 inline mr-1" />{c.participants.toLocaleString()} participants</span>
              </div>
              {c.joined ? (
                <div className="flex items-center gap-2 text-xs text-green-400 font-bold"><CheckCircle className="h-3 w-3" /> Joined! Keep going!</div>
              ) : (
                <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 transition-all">JOIN CHALLENGE</button>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'rewards' && (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 p-4 text-center mb-4">
            <div className="text-4xl font-black text-green-400">2,847</div>
            <div className="text-sm text-slate-500">Total SKY444 Earned from Health</div>
          </div>
          {[
            { date: 'May 22', activity: 'Completed 10K steps', earned: '+100 SKY444' },
            { date: 'May 21', activity: '8hr sleep streak (7 days)', earned: '+200 SKY444' },
            { date: 'May 20', activity: 'Workout completed', earned: '+50 SKY444' },
            { date: 'May 19', activity: 'Daily check-in', earned: '+10 SKY444' },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <div><div className="text-xs font-bold">{r.activity}</div><div className="text-[10px] text-slate-500">{r.date}</div></div>
              <span className="text-xs font-black text-green-400">{r.earned}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
