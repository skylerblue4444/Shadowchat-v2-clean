import React, { useState } from 'react';
import { Users, Vote, DollarSign, Zap, CheckCircle, Clock, Globe, Shield, Plus, TrendingUp } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const DAOS = [
  { id: 1, name: 'SKY444 DAO', members: 12847, treasury: '$2.4M', proposals: 34, token: 'SKY444', status: 'ACTIVE', apy: '12%' },
  { id: 2, name: 'Shadow Protocol', members: 4201, treasury: '$840K', proposals: 12, token: 'SHDW', status: 'ACTIVE', apy: '18%' },
  { id: 3, name: 'Grey Market Guild', members: 892, treasury: '$120K', proposals: 7, token: 'GMG', status: 'ACTIVE', apy: '24%' },
];

const PROPOSALS = [
  { id: 1, title: 'Increase trading fee revenue share to 40%', dao: 'SKY444 DAO', votes: { for: 8420, against: 1203 }, status: 'ACTIVE', ends: '2d 4h', type: 'Finance' },
  { id: 2, title: 'Add XMR as accepted payment method', dao: 'SKY444 DAO', votes: { for: 6847, against: 3201 }, status: 'ACTIVE', ends: '5d 12h', type: 'Product' },
  { id: 3, title: 'Launch Wave 20 development fund $500K', dao: 'SKY444 DAO', votes: { for: 9103, against: 847 }, status: 'PASSED', ends: 'Ended', type: 'Treasury' },
];

export default function SovereignDAOLaunchpad() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'daos' | 'proposals' | 'launch'>('daos');
  const [voted, setVoted] = useState<Record<number, 'for' | 'against'>>({});

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Vote className="h-6 w-6 text-blue-500" /> DAO_LAUNCHPAD</h1>
          <p className="text-slate-500 text-xs mt-1">Sovereign governance · On-chain voting · Wave 19</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 transition-all">
          <Plus className="h-3 w-3" /> Launch DAO
        </button>
      </div>

      <div className="flex gap-1 mb-4">
        {(['daos', 'proposals', 'launch'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'daos' && (
        <div className="space-y-3">
          {DAOS.map(dao => (
            <div key={dao.id} className="bg-slate-900 border border-slate-800 hover:border-blue-800 p-4 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-black">{dao.name}</div>
                  <div className="text-[10px] text-slate-500">Token: {dao.token}</div>
                </div>
                <span className="text-[9px] border border-green-800 text-green-400 px-2 py-0.5 font-bold">{dao.status}</span>
              </div>
              <div className="grid grid-cols-4 gap-3 text-xs">
                <div className="text-center"><div className="font-black text-blue-400">{dao.members.toLocaleString()}</div><div className="text-[9px] text-slate-500">Members</div></div>
                <div className="text-center"><div className="font-black text-green-400">{dao.treasury}</div><div className="text-[9px] text-slate-500">Treasury</div></div>
                <div className="text-center"><div className="font-black text-white">{dao.proposals}</div><div className="text-[9px] text-slate-500">Proposals</div></div>
                <div className="text-center"><div className="font-black text-amber-400">{dao.apy}</div><div className="text-[9px] text-slate-500">Staking APY</div></div>
              </div>
              <button className="mt-3 w-full border border-blue-800 text-blue-400 text-xs font-bold py-2 hover:bg-blue-950/30 transition-all">JOIN DAO</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'proposals' && (
        <div className="space-y-3">
          {PROPOSALS.map(prop => {
            const total = prop.votes.for + prop.votes.against;
            const forPct = (prop.votes.for / total) * 100;
            return (
              <div key={prop.id} className="bg-slate-900 border border-slate-800 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-bold mb-1">{prop.title}</div>
                    <div className="text-[10px] text-slate-500">{prop.dao} · {prop.type}</div>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 border ${prop.status === 'ACTIVE' ? 'border-blue-800 text-blue-400' : 'border-green-800 text-green-400'}`}>{prop.status}</span>
                </div>
                <div className="flex h-2 mb-2 overflow-hidden bg-slate-800">
                  <div className="bg-green-500 h-full" style={{ width: `${forPct}%` }} />
                  <div className="bg-red-500 h-full flex-1" />
                </div>
                <div className="flex justify-between text-[10px] mb-3">
                  <span className="text-green-400">For: {prop.votes.for.toLocaleString()} ({forPct.toFixed(1)}%)</span>
                  <span className="text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> {prop.ends}</span>
                  <span className="text-red-400">Against: {prop.votes.against.toLocaleString()}</span>
                </div>
                {prop.status === 'ACTIVE' && !voted[prop.id] && (
                  <div className="flex gap-2">
                    <button onClick={() => setVoted(prev => ({ ...prev, [prop.id]: 'for' }))} className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 transition-all">VOTE FOR</button>
                    <button onClick={() => setVoted(prev => ({ ...prev, [prop.id]: 'against' }))} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 transition-all">VOTE AGAINST</button>
                  </div>
                )}
                {voted[prop.id] && (
                  <div className="flex items-center gap-2 text-xs text-green-400 font-bold">
                    <CheckCircle className="h-4 w-4" /> Voted {voted[prop.id]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'launch' && (
        <div className="max-w-md space-y-4">
          {[
            { label: 'DAO Name', placeholder: 'My Sovereign DAO' },
            { label: 'Token Symbol', placeholder: 'SDAO' },
            { label: 'Initial Supply', placeholder: '1,000,000' },
            { label: 'Treasury Seed (USD)', placeholder: '$10,000' },
            { label: 'Quorum %', placeholder: '10%' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">{f.label}</label>
              <input className="w-full bg-slate-900 border border-slate-700 focus:border-blue-600 text-white px-3 py-2 text-sm outline-none" placeholder={f.placeholder} />
            </div>
          ))}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 text-sm uppercase tracking-widest transition-all">LAUNCH DAO</button>
        </div>
      )}
    </div>
  );
}
