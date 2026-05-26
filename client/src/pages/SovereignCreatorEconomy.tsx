import React, { useState } from 'react';
import { Camera, DollarSign, Users, TrendingUp, Star, Gift, Lock, Zap, BarChart3, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const CREATOR_STATS = [
  { label: 'Total Earnings', value: '$48,240', icon: DollarSign, color: 'green' },
  { label: 'Subscribers', value: '12,847', icon: Users, color: 'blue' },
  { label: 'Content Pieces', value: '284', icon: Camera, color: 'purple' },
  { label: 'Avg Rating', value: '4.94★', icon: Star, color: 'amber' },
];

const MONETIZATION = [
  { type: 'Subscriptions', monthly: '$8,400', percent: 62, color: 'blue' },
  { type: 'Tips & Gifts', monthly: '$3,200', percent: 24, color: 'pink' },
  { type: 'PPV Content', monthly: '$1,840', percent: 14, color: 'purple' },
];

export default function SovereignCreatorEconomy() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'dashboard' | 'content' | 'monetize' | 'analytics'>('dashboard');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Camera className="h-6 w-6 text-pink-500" /> CREATOR_ECONOMY</h1>
          <p className="text-slate-500 text-xs mt-1">Sovereign creator monetization · Crypto-native · Wave 19</p>
        </div>
        <button className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-4 py-2 transition-all flex items-center gap-2">
          <Zap className="h-3 w-3" /> Go Live
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {CREATOR_STATS.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-slate-900 border border-slate-800 p-4">
              <Icon className={`h-5 w-5 text-${s.color}-500 mb-2`} />
              <div className={`text-xl font-black text-${s.color}-400`}>{s.value}</div>
              <div className="text-[10px] text-slate-500">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-1 mb-4">
        {(['dashboard', 'content', 'monetize', 'analytics'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-pink-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4">
            <h3 className="text-[10px] text-slate-500 uppercase mb-3">Revenue Breakdown</h3>
            {MONETIZATION.map(m => (
              <div key={m.type} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{m.type}</span>
                  <span className="font-bold text-white">{m.monthly}</span>
                </div>
                <div className="bg-slate-800 h-2">
                  <div className={`h-full bg-${m.color}-500`} style={{ width: `${m.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4">
            <h3 className="text-[10px] text-slate-500 uppercase mb-3">Top Content (Mock)</h3>
            {[
              { title: 'Crypto Trading Masterclass', views: 12847, earnings: '$2,400' },
              { title: 'DeFi Yield Farming Guide', views: 8934, earnings: '$1,800' },
              { title: 'Grey Area Market Tutorial', views: 6201, earnings: '$1,200' },
            ].map(c => (
              <div key={c.title} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                <div>
                  <div className="text-xs font-bold">{c.title}</div>
                  <div className="text-[10px] text-slate-500">{c.views.toLocaleString()} views</div>
                </div>
                <span className="text-xs font-bold text-green-400">{c.earnings}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'monetize' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Subscription Tiers', icon: Users, options: ['Basic $4.99/mo', 'Premium $14.99/mo', 'VIP $49.99/mo'] },
            { title: 'PPV Pricing', icon: Lock, options: ['Photo: $2-$20', 'Video: $5-$50', 'Live: $10-$100'] },
            { title: 'Tip Menu', icon: Gift, options: ['Coffee ☕ $5', 'Lunch 🍕 $20', 'VIP Night 🌟 $100'] },
          ].map(m => {
            const Icon = m.icon;
            return (
              <div key={m.title} className="bg-slate-900 border border-slate-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="h-4 w-4 text-pink-500" />
                  <h3 className="text-xs font-bold">{m.title}</h3>
                </div>
                {m.options.map(opt => (
                  <div key={opt} className="text-[10px] text-slate-400 py-1.5 border-b border-slate-800 last:border-0">{opt}</div>
                ))}
                <button className="w-full mt-3 border border-pink-800 text-pink-400 text-[10px] font-bold py-2 hover:bg-pink-950/30 transition-all">EDIT</button>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'content' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-3">
              <div className="aspect-video bg-slate-800 flex items-center justify-center mb-2">
                <Camera className="h-6 w-6 text-slate-700" />
              </div>
              <div className="text-[10px] font-bold">Content #{i + 1}</div>
              <div className="flex items-center gap-2 mt-1 text-[9px] text-slate-500">
                <span className="flex items-center gap-0.5"><Heart className="h-2.5 w-2.5" /> {(Math.random() * 1000 | 0)}</span>
                <span className="flex items-center gap-0.5"><MessageCircle className="h-2.5 w-2.5" /> {(Math.random() * 100 | 0)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'analytics' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Profile Views', value: '48,200', delta: '+18%' },
            { label: 'New Subs (30d)', value: '1,204', delta: '+34%' },
            { label: 'Churn Rate', value: '2.1%', delta: '-0.4%' },
            { label: 'Avg Session', value: '8.4 min', delta: '+1.2m' },
            { label: 'Tips Received', value: '847', delta: '+67%' },
            { label: 'PPV Opens', value: '2,341', delta: '+23%' },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 p-4">
              <div className="text-[10px] text-slate-500 mb-1">{s.label}</div>
              <div className="text-xl font-black text-white">{s.value}</div>
              <div className="text-[10px] text-green-400 font-bold">{s.delta}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
