import React, { useState } from 'react';
import { Vote, Shield, Users, DollarSign, TrendingUp, CheckCircle, Clock, Globe, Zap, FileText } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const TREASURY = { total: '$4.2M', allocated: '$1.8M', available: '$2.4M', proposals: 12 };

const PROPOSALS = [
  { id: 1, title: 'Q3 2026 Development Budget Allocation', amount: '$500K', votes: { for: 8420, against: 1203, abstain: 847 }, quorum: 85, status: 'ACTIVE', type: 'Budget', proposer: 'sky_core_team' },
  { id: 2, title: 'Add New Exchange Listing (Binance)', amount: '$200K', votes: { for: 12847, against: 2103, abstain: 1204 }, quorum: 92, status: 'PASSED', type: 'Listing', proposer: 'community_vote' },
  { id: 3, title: 'Security Audit Fund — $100K Reserve', amount: '$100K', votes: { for: 6847, against: 847, abstain: 312 }, quorum: 78, status: 'ACTIVE', type: 'Security', proposer: 'security_committee' },
];

export default function SovereignGovernancePortal() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'overview' | 'proposals' | 'treasury'>('overview');
  const [voted, setVoted] = useState<Record<number, string>>({});

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Vote className="h-6 w-6 text-blue-500" /> GOVERNANCE_PORTAL</h1>
          <p className="text-slate-500 text-xs mt-1">On-chain governance · Treasury management · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-blue-400">847K</div><div className="text-[10px] text-slate-500">Voting Power</div></div>
          <div><div className="text-xl font-black text-green-400">{TREASURY.total}</div><div className="text-[10px] text-slate-500">Treasury</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['overview', 'proposals', 'treasury'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Your Voting Power', value: '847K SKY444', color: 'blue' },
              { label: 'Active Proposals', value: '2', color: 'amber' },
              { label: 'Votes Cast', value: '14', color: 'green' },
              { label: 'Proposals Created', value: '1', color: 'purple' },
            ].map(s => (
              <div key={s.label} className="bg-slate-900 border border-slate-800 p-4 text-center">
                <div className={`text-xl font-black text-${s.color}-400`}>{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-blue-950/20 border border-blue-800 p-4">
            <div className="text-sm font-bold text-blue-400 mb-1">Your Governance Rights</div>
            <p className="text-xs text-slate-400">As a SKY444 token holder, you have the right to vote on platform decisions, treasury allocations, and protocol upgrades. 1 SKY444 = 1 vote.</p>
          </div>
        </div>
      )}

      {tab === 'proposals' && (
        <div className="space-y-4">
          {PROPOSALS.map(p => {
            const total = p.votes.for + p.votes.against + p.votes.abstain;
            const forPct = (p.votes.for / total) * 100;
            return (
              <div key={p.id} className={`border p-4 ${p.status === 'PASSED' ? 'border-green-800 bg-green-950/10' : 'border-slate-800 bg-slate-900'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{p.type}</span>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 border ${p.status === 'PASSED' ? 'border-green-700 text-green-400' : 'border-blue-700 text-blue-400'}`}>{p.status}</span>
                    </div>
                    <div className="text-sm font-bold">{p.title}</div>
                    <div className="text-[10px] text-slate-500">by @{p.proposer} · Amount: {p.amount}</div>
                  </div>
                  <div className="text-center"><div className="text-lg font-black text-blue-400">{p.quorum}%</div><div className="text-[9px] text-slate-500">Quorum</div></div>
                </div>
                <div className="flex h-3 mb-2 overflow-hidden bg-slate-800">
                  <div className="bg-green-500 h-full" style={{width:`${forPct}%`}} />
                  <div className="bg-red-500 h-full" style={{width:`${(p.votes.against/total)*100}%`}} />
                  <div className="bg-slate-600 h-full flex-1" />
                </div>
                <div className="flex justify-between text-[10px] mb-3">
                  <span className="text-green-400">For: {p.votes.for.toLocaleString()}</span>
                  <span className="text-red-400">Against: {p.votes.against.toLocaleString()}</span>
                  <span className="text-slate-500">Abstain: {p.votes.abstain.toLocaleString()}</span>
                </div>
                {p.status === 'ACTIVE' && !voted[p.id] && (
                  <div className="flex gap-2">
                    {['FOR', 'AGAINST', 'ABSTAIN'].map(v => (
                      <button key={v} onClick={() => setVoted(prev => ({ ...prev, [p.id]: v }))} className={`flex-1 py-2 text-xs font-bold transition-all ${v === 'FOR' ? 'bg-green-600 hover:bg-green-700' : v === 'AGAINST' ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-700 hover:bg-slate-600'} text-white`}>{v}</button>
                    ))}
                  </div>
                )}
                {voted[p.id] && <div className="flex items-center gap-2 text-xs text-green-400 font-bold"><CheckCircle className="h-3 w-3" /> Voted {voted[p.id]}</div>}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'treasury' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 text-center"><div className="text-2xl font-black text-white">{TREASURY.total}</div><div className="text-xs text-slate-500">Total Treasury</div></div>
            <div className="bg-amber-950/20 border border-amber-800 p-4 text-center"><div className="text-2xl font-black text-amber-400">{TREASURY.allocated}</div><div className="text-xs text-slate-500">Allocated</div></div>
            <div className="bg-green-950/20 border border-green-800 p-4 text-center"><div className="text-2xl font-black text-green-400">{TREASURY.available}</div><div className="text-xs text-slate-500">Available</div></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4">
            <h3 className="text-[10px] text-slate-500 uppercase mb-3">Treasury Allocation</h3>
            {[
              { category: 'Development', amount: '$800K', pct: 44 },
              { category: 'Marketing', amount: '$400K', pct: 22 },
              { category: 'Security Audits', amount: '$300K', pct: 17 },
              { category: 'Community Grants', amount: '$200K', pct: 11 },
              { category: 'Operations', amount: '$100K', pct: 6 },
            ].map(a => (
              <div key={a.category} className="flex items-center gap-3 mb-2">
                <span className="text-[10px] text-slate-400 w-32">{a.category}</span>
                <div className="flex-1 bg-slate-800 h-2"><div className="h-full bg-blue-500" style={{width:`${a.pct}%`}} /></div>
                <span className="text-[10px] text-white w-16 text-right">{a.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
