import React, { useState } from 'react';
import { Briefcase, Star, DollarSign, Clock, Shield, Search, Filter, CheckCircle, Users, Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const GIGS = [
  { id: 1, title: 'Smart Contract Development (Solidity)', seller: 'ghost_dev_44', rating: 5.0, reviews: 127, price: '0.5 ETH', delivery: '3 days', category: 'Dev', badge: 'TOP RATED', skills: ['Solidity', 'Hardhat', 'OpenZeppelin'] },
  { id: 2, title: 'Crypto Trading Bot (Python)', seller: 'algo_master_x', rating: 4.9, reviews: 89, price: '0.3 ETH', delivery: '5 days', category: 'Dev', badge: 'VERIFIED', skills: ['Python', 'CCXT', 'ML'] },
  { id: 3, title: 'DeFi Protocol Audit', seller: 'security_pro', rating: 5.0, reviews: 44, price: '2.0 ETH', delivery: '7 days', category: 'Security', badge: 'EXPERT', skills: ['Audit', 'Solidity', 'Fuzzing'] },
  { id: 4, title: 'NFT Collection Design (10K)', seller: 'pixel_artist_44', rating: 4.8, reviews: 203, price: '1.5 ETH', delivery: '14 days', category: 'Design', badge: 'HOT', skills: ['Illustrator', 'Generative', 'IPFS'] },
  { id: 5, title: 'Crypto Tax Report (US)', seller: 'tax_wizard', rating: 4.9, reviews: 312, price: '0.1 ETH', delivery: '2 days', category: 'Finance', badge: 'POPULAR', skills: ['CPA', 'Koinly', '8949'] },
  { id: 6, title: 'Anonymous Web Dev (No KYC)', seller: 'shadow_builder', rating: 4.7, reviews: 67, price: '0.8 ETH', delivery: '10 days', category: 'Dev', badge: 'ANON', skills: ['React', 'Node', 'Crypto Pay'] },
];

const CATEGORIES = ['All', 'Dev', 'Security', 'Design', 'Finance', 'Marketing', 'Writing'];

export default function FreelanceMarketplace() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = GIGS.filter(g => (category === 'All' || g.category === category) && (g.title.toLowerCase().includes(search.toLowerCase()) || g.seller.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Briefcase className="h-6 w-6 text-blue-500" /> FREELANCE_MARKET</h1>
          <p className="text-slate-500 text-xs mt-1">Crypto-paid freelance · No KYC options · SKY444 Escrow · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-blue-400">4,847</div><div className="text-[10px] text-slate-500">Freelancers</div></div>
          <div><div className="text-xl font-black text-green-400">98.2%</div><div className="text-[10px] text-slate-500">Satisfaction</div></div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-700 px-3">
          <Search className="h-4 w-4 text-slate-500" />
          <input className="flex-1 bg-transparent py-2 text-sm outline-none placeholder-slate-600" placeholder="Search skills, services..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="flex items-center gap-2 border border-slate-700 text-slate-400 px-4 text-xs font-bold hover:border-slate-500 transition-all"><Filter className="h-3 w-3" /> Filter</button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 text-xs font-bold border transition-all ${category === c ? 'border-blue-600 text-blue-400 bg-blue-950/30' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(gig => (
          <div key={gig.id} className="bg-slate-900 border border-slate-800 hover:border-blue-700 p-4 transition-all">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-[9px] font-black px-2 py-0.5 border ${gig.badge === 'TOP RATED' ? 'border-amber-700 text-amber-400' : gig.badge === 'EXPERT' ? 'border-purple-700 text-purple-400' : gig.badge === 'HOT' ? 'border-red-700 text-red-400' : gig.badge === 'ANON' ? 'border-green-700 text-green-400' : 'border-blue-700 text-blue-400'}`}>{gig.badge}</span>
              <div className="flex items-center gap-1 text-[10px] text-yellow-400"><Star className="h-3 w-3 fill-yellow-400" />{gig.rating} ({gig.reviews})</div>
            </div>
            <h3 className="text-sm font-bold mb-2 leading-tight">{gig.title}</h3>
            <div className="flex flex-wrap gap-1 mb-3">
              {gig.skills.map(s => <span key={s} className="text-[9px] border border-slate-700 text-slate-500 px-1.5 py-0.5">{s}</span>)}
            </div>
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="text-slate-500">@{gig.seller}</span>
              <div className="flex items-center gap-2"><Clock className="h-3 w-3 text-slate-500" /><span className="text-slate-400">{gig.delivery}</span></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-blue-400">{gig.price}</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 transition-all">HIRE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
