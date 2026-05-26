import React, { useState } from 'react';
import { Newspaper, TrendingUp, TrendingDown, Globe, Clock, Eye, Bookmark, Share2, Filter, Search } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const NEWS = [
  { id: 1, title: 'Bitcoin Surges Past $48K as Institutional Demand Hits Record High', source: 'CoinDesk', time: '5m ago', category: 'BTC', sentiment: 'bullish', views: 48201, bookmarked: false, img: '📈' },
  { id: 2, title: 'SEC Approves 3 New Spot Ethereum ETFs — Market Reacts with 8% Pump', source: 'Bloomberg Crypto', time: '22m ago', category: 'ETH', sentiment: 'bullish', views: 84201, bookmarked: true, img: '🏛️' },
  { id: 3, title: 'Solana Ecosystem TVL Reaches $8.4B — New All-Time High', source: 'DeFiLlama', time: '1h ago', category: 'SOL', sentiment: 'bullish', views: 28420, bookmarked: false, img: '🌊' },
  { id: 4, title: 'Major Exchange Hacked: $40M in User Funds Compromised', source: 'CryptoNews', time: '2h ago', category: 'Security', sentiment: 'bearish', views: 124201, bookmarked: false, img: '⚠️' },
  { id: 5, title: 'SKY444 Platform Launches Wave 20: 44 New Features Including AI Portfolio Manager', source: 'SKY444 Blog', time: '3h ago', category: 'SKY444', sentiment: 'bullish', views: 18420, bookmarked: true, img: '🚀' },
  { id: 6, title: 'Fed Minutes Reveal Possible Rate Cut in Q3 2026 — Crypto Markets Rally', source: 'Reuters', time: '4h ago', category: 'Macro', sentiment: 'bullish', views: 92847, bookmarked: false, img: '🏦' },
];

const CATEGORIES = ['All', 'BTC', 'ETH', 'SOL', 'SKY444', 'DeFi', 'Security', 'Macro', 'Regulation'];

export default function SovereignCryptoNews() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [category, setCategory] = useState('All');
  const [bookmarks, setBookmarks] = useState(NEWS.filter(n => n.bookmarked).map(n => n.id));
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('list');

  const filtered = NEWS.filter(n => (category === 'All' || n.category === category) && (n.title.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Newspaper className="h-6 w-6 text-blue-500" /> CRYPTO_NEWS</h1>
          <p className="text-slate-500 text-xs mt-1">Curated crypto intelligence · AI sentiment · Wave 20</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-700 px-3">
          <Search className="h-4 w-4 text-slate-500" />
          <input className="flex-1 bg-transparent py-2 text-sm outline-none placeholder-slate-600" placeholder="Search news..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 text-xs font-bold border transition-all ${category === c ? 'border-blue-600 text-blue-400 bg-blue-950/30' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>{c}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(news => (
          <div key={news.id} className="flex items-start gap-4 bg-slate-900 border border-slate-800 hover:border-blue-700 p-4 transition-all">
            <div className="text-3xl flex-shrink-0">{news.img}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[9px] font-black px-1.5 py-0.5 border ${news.sentiment === 'bullish' ? 'border-green-800 text-green-400' : 'border-red-800 text-red-400'}`}>{news.sentiment.toUpperCase()}</span>
                <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{news.category}</span>
                <span className="text-[10px] text-slate-600">{news.source}</span>
                <span className="text-[10px] text-slate-600 flex items-center gap-1"><Clock className="h-3 w-3" />{news.time}</span>
              </div>
              <h3 className="text-sm font-bold hover:text-blue-400 cursor-pointer">{news.title}</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] text-slate-500 flex items-center gap-1"><Eye className="h-3 w-3" />{news.views.toLocaleString()}</span>
                <button onClick={() => setBookmarks(prev => prev.includes(news.id) ? prev.filter(i => i !== news.id) : [...prev, news.id])} className={`text-[10px] flex items-center gap-1 ${bookmarks.includes(news.id) ? 'text-amber-400' : 'text-slate-500 hover:text-amber-400'}`}>
                  <Bookmark className="h-3 w-3" /> {bookmarks.includes(news.id) ? 'Saved' : 'Save'}
                </button>
                <button className="text-[10px] text-slate-500 hover:text-white flex items-center gap-1"><Share2 className="h-3 w-3" /> Share</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
