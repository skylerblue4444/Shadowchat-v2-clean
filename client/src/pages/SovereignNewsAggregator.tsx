import React, { useState } from 'react';
import { Globe, TrendingUp, Filter, ExternalLink, Clock, Eye, Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const NEWS = [
  { id: 1, title: 'Bitcoin breaks $50K resistance — analysts target $65K next', source: 'CoinDesk', time: '12m ago', category: 'BTC', sentiment: 'bullish', views: 12847 },
  { id: 2, title: 'SEC approves new crypto ETF framework — market reacts positively', source: 'Bloomberg', time: '34m ago', category: 'Regulation', sentiment: 'bullish', views: 8934 },
  { id: 3, title: 'DeFi TVL hits $100B milestone — ETH leads the charge', source: 'DeFiPulse', time: '1h ago', category: 'DeFi', sentiment: 'bullish', views: 6201 },
  { id: 4, title: 'Monero privacy upgrade makes chain analysis impossible', source: 'CryptoPrivacy', time: '2h ago', category: 'Privacy', sentiment: 'neutral', views: 4312 },
  { id: 5, title: 'Grey market crypto OTC volume surges 340% in Q1 2026', source: 'OTCDesk', time: '3h ago', category: 'OTC', sentiment: 'neutral', views: 3108 },
  { id: 6, title: 'SKY444 platform reaches 2.4M users — Wave 19 launches', source: 'SKY444 Blog', time: '4h ago', category: 'SKY444', sentiment: 'bullish', views: 18420 },
  { id: 7, title: 'FBI issues warning on anonymous payment rails usage', source: 'Reuters', time: '5h ago', category: 'Regulation', sentiment: 'bearish', views: 22100 },
  { id: 8, title: 'Ethereum gas fees drop to 8-year low — DeFi summer incoming', source: 'ETHHub', time: '6h ago', category: 'ETH', sentiment: 'bullish', views: 9847 },
];

const CATEGORIES = ['All', 'BTC', 'ETH', 'DeFi', 'Regulation', 'Privacy', 'OTC', 'SKY444'];

export default function SovereignNewsAggregator() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [category, setCategory] = useState('All');
  const filtered = category === 'All' ? NEWS : NEWS.filter(n => n.category === category);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Globe className="h-6 w-6 text-blue-500" /> SOVEREIGN_NEWS</h1>
          <p className="text-slate-500 text-xs mt-1">Curated crypto & grey-area intelligence · Wave 19</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1.5 text-xs font-bold border transition-all ${category === cat ? 'border-blue-600 text-blue-400 bg-blue-950/30' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>{cat}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(news => (
          <div key={news.id} className="flex items-start justify-between bg-slate-900 border border-slate-800 hover:border-slate-600 p-4 transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[9px] font-black px-1.5 py-0.5 border ${news.sentiment === 'bullish' ? 'border-green-800 text-green-400' : news.sentiment === 'bearish' ? 'border-red-800 text-red-400' : 'border-slate-700 text-slate-400'}`}>{news.sentiment.toUpperCase()}</span>
                <span className="text-[9px] text-slate-600 border border-slate-800 px-1.5 py-0.5">{news.category}</span>
              </div>
              <h3 className="text-sm font-bold mb-1 hover:text-blue-400 cursor-pointer">{news.title}</h3>
              <div className="flex items-center gap-3 text-[10px] text-slate-600">
                <span>{news.source}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {news.time}</span>
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {news.views.toLocaleString()}</span>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-slate-600 hover:text-white cursor-pointer ml-3 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
