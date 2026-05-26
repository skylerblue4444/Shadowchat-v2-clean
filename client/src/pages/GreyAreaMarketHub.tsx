import React, { useState } from 'react';
import { AlertTriangle, Package, Zap, Globe, Lock, Eye, TrendingUp, DollarSign, Users, Star } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const CATEGORIES = [
  { id: 'digital', label: 'Digital Goods', icon: '💾', count: 2847, desc: 'Software, licenses, accounts, data' },
  { id: 'arbitrage', label: 'Price Arbitrage', icon: '📊', count: 1203, desc: 'Cross-market price gaps & opportunities' },
  { id: 'info', label: 'Info Products', icon: '📚', count: 4521, desc: 'Courses, guides, research, intel' },
  { id: 'freelance', label: 'Off-Grid Freelance', icon: '🛠️', count: 892, desc: 'Skills, services, no-KYC payments' },
  { id: 'crypto', label: 'OTC Crypto', icon: '₿', count: 341, desc: 'Peer-to-peer, no exchange required' },
  { id: 'data', label: 'Data Brokerage', icon: '🔍', count: 1677, desc: 'Leads, analytics, market data' },
];

const LISTINGS = [
  { id: 1, title: 'Premium VPN Accounts Bundle x50', price: '0.012 BTC', seller: 'shadow_vendor_44', rating: 4.9, sales: 312, category: 'digital', badge: 'HOT' },
  { id: 2, title: 'Crypto Arbitrage Bot Script (Python)', price: '0.08 BTC', seller: 'codemaster_x', rating: 4.7, sales: 89, category: 'arbitrage', badge: 'NEW' },
  { id: 3, title: 'Dark Web OSINT Research Guide 2026', price: '0.005 BTC', seller: 'intel_ops', rating: 4.8, sales: 1204, category: 'info', badge: 'BEST' },
  { id: 4, title: 'Anonymous Web Dev Services (No KYC)', price: '0.15 BTC', seller: 'ghost_dev', rating: 5.0, sales: 44, category: 'freelance', badge: 'VERIFIED' },
  { id: 5, title: 'OTC BTC/USDT Large Orders', price: 'Negotiable', seller: 'otc_sky444', rating: 4.9, sales: 28, category: 'crypto', badge: 'TRUSTED' },
  { id: 6, title: 'B2B Lead Database — Finance Sector 10K', price: '0.03 BTC', seller: 'data_broker_1', rating: 4.6, sales: 203, category: 'data', badge: 'HOT' },
];

export default function GreyAreaMarketHub() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeCategory, setActiveCategory] = useState('all');
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const filtered = activeCategory === 'all' ? LISTINGS : LISTINGS.filter(l => l.category === activeCategory);

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans">
      {/* Disclaimer Banner */}
      {showDisclaimer && (
        <div className="bg-yellow-950/50 border-b border-yellow-800 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-yellow-400 text-xs">
            <AlertTriangle className="h-4 w-4" />
            <span><strong>MOCK / DEMO ONLY</strong> — This is a simulated grey-area marketplace for demonstration purposes. No real transactions occur.</span>
          </div>
          <button onClick={() => setShowDisclaimer(false)} className="text-yellow-600 hover:text-yellow-400 text-xs font-bold">DISMISS</button>
        </div>
      )}

      {/* Header */}
      <div className="p-6 border-b border-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Eye className="h-6 w-6 text-purple-500" /> GREY_AREA_MARKET
            </h1>
            <p className="text-slate-500 text-xs mt-1">Sovereign peer-to-peer exchange · No KYC · Encrypted · SKY444 Escrow</p>
          </div>
          <div className="flex gap-4 text-center">
            <div><div className="text-xl font-black text-purple-400">11,481</div><div className="text-[10px] text-slate-500">Listings</div></div>
            <div><div className="text-xl font-black text-green-400">4,203</div><div className="text-[10px] text-slate-500">Sellers</div></div>
            <div><div className="text-xl font-black text-blue-400">98.7%</div><div className="text-[10px] text-slate-500">Dispute-Free</div></div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`p-3 border text-center transition-all ${activeCategory === 'all' ? 'border-purple-600 bg-purple-950/30' : 'border-slate-800 hover:border-slate-600'}`}
          >
            <div className="text-xl mb-1">🌐</div>
            <div className="text-[10px] font-bold">All</div>
            <div className="text-[9px] text-slate-500">11,481</div>
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-3 border text-center transition-all ${activeCategory === cat.id ? 'border-purple-600 bg-purple-950/30' : 'border-slate-800 hover:border-slate-600'}`}
            >
              <div className="text-xl mb-1">{cat.icon}</div>
              <div className="text-[10px] font-bold">{cat.label}</div>
              <div className="text-[9px] text-slate-500">{cat.count.toLocaleString()}</div>
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(listing => (
            <div key={listing.id} className="bg-slate-900 border border-slate-800 hover:border-purple-700 transition-all p-4">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-[9px] font-black px-2 py-0.5 border ${
                  listing.badge === 'HOT' ? 'border-red-700 text-red-400 bg-red-950/30' :
                  listing.badge === 'NEW' ? 'border-blue-700 text-blue-400 bg-blue-950/30' :
                  listing.badge === 'BEST' ? 'border-amber-700 text-amber-400 bg-amber-950/30' :
                  listing.badge === 'TRUSTED' ? 'border-green-700 text-green-400 bg-green-950/30' :
                  'border-purple-700 text-purple-400 bg-purple-950/30'
                }`}>{listing.badge}</span>
                <div className="flex items-center gap-1 text-[10px] text-yellow-400">
                  <Star className="h-3 w-3 fill-yellow-400" /> {listing.rating}
                </div>
              </div>
              <h3 className="text-sm font-bold mb-2 leading-tight">{listing.title}</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-purple-400 font-black text-sm">{listing.price}</span>
                <span className="text-[10px] text-slate-500">{listing.sales} sold</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-600">@{listing.seller}</span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black px-3 py-1.5 transition-all">
                  VIEW
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Lock, title: 'SKY444 Escrow', desc: 'Funds held in smart contract until delivery confirmed' },
            { icon: Eye, title: 'Zero-Knowledge', desc: 'No personal data collected. Anonymous by design.' },
            { icon: Globe, title: 'Crypto Only', desc: 'BTC, ETH, SKY444 coin accepted. No fiat, no chargebacks.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-slate-900 border border-slate-800 p-4 flex gap-3">
              <Icon className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold mb-1">{title}</div>
                <div className="text-[10px] text-slate-500">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
