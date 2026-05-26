import React, { useState } from 'react';
import { Shield, DollarSign, Clock, CheckCircle, AlertTriangle, Users, Lock, Zap, FileText } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const ESCROWS = [
  { id: 1, title: 'Web Dev Project Payment', buyer: 'sky_client_44', seller: 'ghost_dev', amount: '0.5 ETH', status: 'ACTIVE', created: 'May 20', milestone: 'Frontend complete', dispute: false },
  { id: 2, title: 'NFT Collection Purchase', buyer: 'nft_whale_x', seller: 'pixel_artist', amount: '2.4 ETH', status: 'PENDING_RELEASE', created: 'May 18', milestone: 'Delivery confirmed', dispute: false },
  { id: 3, title: 'OTC BTC Trade', buyer: 'otc_buyer_1', seller: 'otc_seller_44', amount: '1.0 BTC', status: 'DISPUTE', created: 'May 15', milestone: 'Awaiting bank transfer', dispute: true },
  { id: 4, title: 'Consulting Services', buyer: 'corp_client', seller: 'sky_consultant', amount: '0.2 ETH', status: 'COMPLETED', created: 'May 10', milestone: 'All deliverables received', dispute: false },
];

export default function SovereignEscrowService() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'active' | 'create' | 'history'>('active');

  const statusColor = (s: string) => s === 'COMPLETED' ? 'text-green-400 border-green-800' : s === 'ACTIVE' ? 'text-blue-400 border-blue-800' : s === 'DISPUTE' ? 'text-red-400 border-red-800' : 'text-amber-400 border-amber-800';

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Shield className="h-6 w-6 text-green-500" /> ESCROW_SERVICE</h1>
          <p className="text-slate-500 text-xs mt-1">Smart contract escrow · Trustless · SKY444 · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-green-400">$2.4M</div><div className="text-[10px] text-slate-500">In Escrow</div></div>
          <div><div className="text-xl font-black text-blue-400">99.1%</div><div className="text-[10px] text-slate-500">Dispute-Free</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['active', 'create', 'history'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-green-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'active' && (
        <div className="space-y-3">
          {ESCROWS.map(e => (
            <div key={e.id} className={`border p-4 ${e.dispute ? 'border-red-800 bg-red-950/10' : 'border-slate-800 bg-slate-900'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold">{e.title}</div>
                <span className={`text-[9px] font-black px-2 py-0.5 border ${statusColor(e.status)}`}>{e.status}</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-[10px] mb-3">
                <div><span className="text-slate-500">Buyer: </span><span className="text-white">@{e.buyer}</span></div>
                <div><span className="text-slate-500">Seller: </span><span className="text-white">@{e.seller}</span></div>
                <div><span className="text-slate-500">Amount: </span><span className="text-amber-400 font-bold">{e.amount}</span></div>
                <div><span className="text-slate-500">Created: </span><span className="text-white">{e.created}</span></div>
              </div>
              <div className="bg-slate-800 p-2 text-[10px] text-slate-400 mb-3">📋 Milestone: {e.milestone}</div>
              <div className="flex gap-2">
                {e.status === 'PENDING_RELEASE' && <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 transition-all">RELEASE FUNDS</button>}
                {e.status === 'ACTIVE' && <button className="border border-slate-700 text-slate-400 text-xs font-bold px-4 py-2 hover:border-slate-500 transition-all">VIEW DETAILS</button>}
                {e.dispute && <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 transition-all">RESOLVE DISPUTE</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'create' && (
        <div className="max-w-md space-y-4">
          {[
            { label: 'Title / Description', placeholder: 'Web development project...' },
            { label: 'Seller Address / Username', placeholder: '@seller or 0x...' },
            { label: 'Amount', placeholder: '0.5 ETH' },
            { label: 'Milestone Description', placeholder: 'What triggers fund release?' },
            { label: 'Deadline', placeholder: 'Jun 15, 2026' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">{f.label}</label>
              <input className="w-full bg-slate-900 border border-slate-700 focus:border-green-600 text-white px-3 py-2 text-sm outline-none" placeholder={f.placeholder} />
            </div>
          ))}
          <div className="bg-slate-900 border border-slate-800 p-3 text-[10px] space-y-1">
            <div className="flex justify-between"><span className="text-slate-500">Escrow Fee</span><span className="text-white">0.5%</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Dispute Resolution</span><span className="text-green-400">SKY444 Arbitration</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Smart Contract</span><span className="text-blue-400">Audited ✓</span></div>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 text-sm uppercase tracking-widest transition-all">CREATE ESCROW</button>
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-2">
          {ESCROWS.filter(e => e.status === 'COMPLETED').map(e => (
            <div key={e.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <div><div className="text-xs font-bold">{e.title}</div><div className="text-[10px] text-slate-500">{e.created}</div></div>
              <div className="flex items-center gap-3"><span className="text-xs font-bold text-amber-400">{e.amount}</span><CheckCircle className="h-4 w-4 text-green-500" /></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
