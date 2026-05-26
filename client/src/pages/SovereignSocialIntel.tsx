import React, { useState } from 'react';
import { Users, TrendingUp, Eye, MessageCircle, Heart, Share2, Search, Filter, Zap, Globe } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const TRENDING = [
  { tag: '#SKY444', posts: 12847, growth: '+234%', sentiment: 'bullish', category: 'crypto' },
  { tag: '#Bitcoin', posts: 89203, growth: '+18%', sentiment: 'bullish', category: 'crypto' },
  { tag: '#DeFi', posts: 34120, growth: '+67%', sentiment: 'neutral', category: 'crypto' },
  { tag: '#AITrading', posts: 8934, growth: '+312%', sentiment: 'bullish', category: 'ai' },
  { tag: '#GreyArea', posts: 4201, growth: '+89%', sentiment: 'neutral', category: 'market' },
  { tag: '#SovereignMoney', posts: 7823, growth: '+145%', sentiment: 'bullish', category: 'finance' },
];

const INFLUENCERS = [
  { handle: '@sky_whale_44', followers: '2.4M', engagement: '8.4%', topic: 'Crypto/DeFi', influence: 97 },
  { handle: '@hope_ai_bot', followers: '890K', engagement: '12.1%', topic: 'AI Trading', influence: 91 },
  { handle: '@shadow_trader', followers: '1.2M', engagement: '6.8%', topic: 'OTC/Grey Market', influence: 88 },
  { handle: '@sovereign_dev', followers: '340K', engagement: '15.2%', topic: 'Web3 Dev', influence: 84 },
];

export default function SovereignSocialIntel() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'trending' | 'influencers' | 'sentiment'>('trending');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Eye className="h-6 w-6 text-blue-500" /> SOCIAL_INTEL</h1>
          <p className="text-slate-500 text-xs mt-1">Social signal intelligence · Wave 19 · Real-time monitoring</p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['trending', 'influencers', 'sentiment'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'trending' && (
        <div className="space-y-2">
          {TRENDING.map((t, i) => (
            <div key={t.tag} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <span className="text-slate-600 font-bold w-6">#{i + 1}</span>
                <div>
                  <div className="text-sm font-black text-blue-400">{t.tag}</div>
                  <div className="text-[10px] text-slate-500">{t.posts.toLocaleString()} posts · {t.category}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-green-400">{t.growth}</span>
                <span className={`text-[9px] px-2 py-0.5 border font-bold ${t.sentiment === 'bullish' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>{t.sentiment.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'influencers' && (
        <div className="space-y-3">
          {INFLUENCERS.map(inf => (
            <div key={inf.handle} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-900/40 border border-blue-700 flex items-center justify-center font-black text-blue-400">
                  {inf.handle[1].toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-blue-400">{inf.handle}</div>
                  <div className="text-[10px] text-slate-500">{inf.topic}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <div className="text-center"><div className="font-bold">{inf.followers}</div><div className="text-[9px] text-slate-500">Followers</div></div>
                <div className="text-center"><div className="font-bold text-green-400">{inf.engagement}</div><div className="text-[9px] text-slate-500">Engagement</div></div>
                <div className="text-center"><div className="font-bold text-amber-400">{inf.influence}</div><div className="text-[9px] text-slate-500">Score</div></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'sentiment' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { asset: 'BTC', bull: 72, bear: 28, neutral: 0 },
            { asset: 'ETH', bull: 58, bear: 31, neutral: 11 },
            { asset: 'SOL', bull: 81, bear: 12, neutral: 7 },
            { asset: 'SKY444', bull: 94, bear: 4, neutral: 2 },
          ].map(s => (
            <div key={s.asset} className="bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-black">{s.asset}</span>
                <span className={`text-xs font-black ${s.bull > 60 ? 'text-green-400' : s.bull > 40 ? 'text-yellow-400' : 'text-red-400'}`}>{s.bull > 60 ? 'BULLISH' : s.bull > 40 ? 'NEUTRAL' : 'BEARISH'}</span>
              </div>
              <div className="flex h-4 overflow-hidden">
                <div className="bg-green-500 h-full transition-all" style={{ width: `${s.bull}%` }} />
                <div className="bg-yellow-500 h-full transition-all" style={{ width: `${s.neutral}%` }} />
                <div className="bg-red-500 h-full transition-all" style={{ width: `${s.bear}%` }} />
              </div>
              <div className="flex justify-between mt-1 text-[9px]">
                <span className="text-green-400">Bull {s.bull}%</span>
                <span className="text-red-400">Bear {s.bear}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
