import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Globe, Cpu, Zap, Eye, Clock } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const METRICS = [
  { label: 'Total Users', value: '2,847,203', delta: '+12.4%', color: 'blue' },
  { label: 'DAU', value: '847,441', delta: '+8.2%', color: 'green' },
  { label: 'Revenue MTD', value: '$4.28M', delta: '+23.1%', color: 'green' },
  { label: 'Transactions', value: '12.8M', delta: '+31.4%', color: 'green' },
  { label: 'Avg Session', value: '14.2 min', delta: '+2.1m', color: 'blue' },
  { label: 'Retention D7', value: '68%', delta: '+4%', color: 'green' },
  { label: 'NPS Score', value: '74', delta: '+6', color: 'green' },
  { label: 'Churn Rate', value: '1.8%', delta: '-0.3%', color: 'green' },
];

const TOP_PAGES = [
  { page: '/dashboard/trading', views: 284201, sessions: 127840, bounce: '12%' },
  { page: '/dashboard/wallet', views: 201847, sessions: 98420, bounce: '8%' },
  { page: '/dashboard/hope-ai', views: 184203, sessions: 84201, bounce: '15%' },
  { page: '/dashboard/social-feed', views: 162847, sessions: 74201, bounce: '22%' },
  { page: '/dashboard/engineer-terminal', views: 48201, sessions: 28420, bounce: '6%' },
];

export default function SovereignAnalyticsCommand() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'overview' | 'pages' | 'funnel' | 'realtime'>('overview');
  const [liveUsers, setLiveUsers] = useState(12847);

  useEffect(() => {
    const t = setInterval(() => setLiveUsers(u => u + Math.floor(Math.random() * 20 - 10)), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><BarChart3 className="h-6 w-6 text-blue-500" /> ANALYTICS_COMMAND</h1>
          <p className="text-slate-500 text-xs mt-1">Sovereign platform analytics · Real-time · Wave 20</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-2xl font-black text-green-400 tabular-nums">{liveUsers.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1"><Activity className="h-3 w-3 text-green-500 animate-pulse" /> Live Users</div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['overview', 'pages', 'funnel', 'realtime'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {METRICS.map(m => (
            <div key={m.label} className="bg-slate-900 border border-slate-800 p-4">
              <div className="text-[10px] text-slate-500 mb-1">{m.label}</div>
              <div className={`text-xl font-black text-${m.color}-400`}>{m.value}</div>
              <div className="text-[10px] text-green-400 font-bold mt-1">{m.delta}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'pages' && (
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2 text-[10px] text-slate-500 uppercase px-4 mb-2">
            <span>Page</span><span className="text-right">Views</span><span className="text-right">Sessions</span><span className="text-right">Bounce</span>
          </div>
          {TOP_PAGES.map((p, i) => (
            <div key={p.page} className="grid grid-cols-4 gap-2 items-center bg-slate-900 border border-slate-800 p-3 text-xs">
              <div className="flex items-center gap-2"><span className="text-slate-600 font-bold">#{i+1}</span><span className="text-blue-400 font-mono truncate">{p.page}</span></div>
              <div className="text-right font-bold">{p.views.toLocaleString()}</div>
              <div className="text-right text-slate-400">{p.sessions.toLocaleString()}</div>
              <div className="text-right text-green-400">{p.bounce}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'funnel' && (
        <div className="space-y-3 max-w-lg">
          {[
            { step: 'Landing Page', users: 100000, pct: 100 },
            { step: 'Sign Up', users: 42000, pct: 42 },
            { step: 'Onboarding', users: 31000, pct: 31 },
            { step: 'First Trade', users: 18000, pct: 18 },
            { step: 'Deposit Made', users: 12000, pct: 12 },
            { step: 'Active User (D30)', users: 8400, pct: 8.4 },
          ].map((s, i) => (
            <div key={s.step} className="flex items-center gap-4">
              <span className="text-[10px] text-slate-500 w-32">{s.step}</span>
              <div className="flex-1 bg-slate-800 h-6 relative">
                <div className="h-full bg-blue-500 flex items-center px-2" style={{width:`${s.pct}%`}}>
                  <span className="text-[10px] font-bold text-white">{s.users.toLocaleString()}</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 w-10 text-right">{s.pct}%</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'realtime' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4">
            <h3 className="text-[10px] text-slate-500 uppercase mb-3 flex items-center gap-2"><Activity className="h-3 w-3 text-green-500 animate-pulse" /> Live Events</h3>
            <div className="space-y-1 text-xs">
              {[
                { event: 'New signup', detail: 'user_4847 joined', time: '1s' },
                { event: 'Trade executed', detail: 'BTC/USDT $47,200', time: '3s' },
                { event: 'Page view', detail: '/dashboard/engineer-terminal', time: '4s' },
                { event: 'Deposit', detail: '0.5 ETH received', time: '7s' },
                { event: 'Bot activated', detail: 'TradeMaster Bot', time: '9s' },
                { event: 'New signup', detail: 'user_4848 joined', time: '12s' },
              ].map((e, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-slate-800 last:border-0">
                  <div><span className="text-green-400 font-bold">{e.event}</span><span className="text-slate-500 ml-2">{e.detail}</span></div>
                  <span className="text-slate-700">{e.time} ago</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4">
            <h3 className="text-[10px] text-slate-500 uppercase mb-3">Active Users by Page</h3>
            {[
              { page: 'Trading', users: 4201 },
              { page: 'Wallet', users: 2847 },
              { page: 'Hope AI', users: 1923 },
              { page: 'Social Feed', users: 1847 },
              { page: 'Engineer Mode', users: 892 },
            ].map(p => (
              <div key={p.page} className="flex items-center gap-3 mb-2">
                <span className="text-[10px] text-slate-400 w-24">{p.page}</span>
                <div className="flex-1 bg-slate-800 h-2"><div className="h-full bg-blue-500" style={{width:`${(p.users/4201)*100}%`}} /></div>
                <span className="text-[10px] text-blue-400 w-12 text-right">{p.users.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
