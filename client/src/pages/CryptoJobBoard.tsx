import React, { useState } from 'react';
import { Briefcase, DollarSign, MapPin, Clock, Star, Search, Zap, Globe, CheckCircle, Users } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const JOBS = [
  { id: 1, title: 'Senior Solidity Developer', company: 'SKY444 Labs', salary: '$180K-$240K + tokens', type: 'Full-time', location: 'Remote', skills: ['Solidity', 'Hardhat', 'DeFi'], posted: '1d ago', applicants: 47, urgent: true },
  { id: 2, title: 'Crypto Quant Trader', company: 'Shadow Capital', salary: '$120K + 20% PnL share', type: 'Full-time', location: 'Chicago / Remote', skills: ['Python', 'Trading', 'ML'], posted: '2d ago', applicants: 89, urgent: false },
  { id: 3, title: 'Web3 Frontend Engineer', company: 'DeFi Protocol X', salary: '80K USDT + equity', type: 'Full-time', location: 'Remote', skills: ['React', 'ethers.js', 'TypeScript'], posted: '3d ago', applicants: 124, urgent: false },
  { id: 4, title: 'Blockchain Security Auditor', company: 'CryptoGuard', salary: '$200K-$300K', type: 'Contract', location: 'Remote', skills: ['Audit', 'Solidity', 'Fuzzing'], posted: '5d ago', applicants: 23, urgent: true },
  { id: 5, title: 'Crypto Content Creator', company: 'SKY444 Media', salary: '5K SKY444/mo + rev share', type: 'Part-time', location: 'Remote', skills: ['Writing', 'Video', 'Crypto'], posted: '1d ago', applicants: 312, urgent: false },
];

export default function CryptoJobBoard() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [search, setSearch] = useState('');
  const [applied, setApplied] = useState<number[]>([]);
  const [filter, setFilter] = useState('All');

  const filtered = JOBS.filter(j =>
    (filter === 'All' || j.type === filter) &&
    (j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Briefcase className="h-6 w-6 text-blue-500" /> CRYPTO_JOB_BOARD</h1>
          <p className="text-slate-500 text-xs mt-1">Web3 & crypto jobs · Paid in crypto · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-blue-400">2,847</div><div className="text-[10px] text-slate-500">Open Roles</div></div>
          <div><div className="text-xl font-black text-green-400">$180K</div><div className="text-[10px] text-slate-500">Avg Salary</div></div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-700 px-3">
          <Search className="h-4 w-4 text-slate-500" />
          <input className="flex-1 bg-transparent py-2 text-sm outline-none placeholder-slate-600" placeholder="Search jobs, companies, skills..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {['All', 'Full-time', 'Contract', 'Part-time'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-bold border transition-all ${filter === f ? 'border-blue-600 text-blue-400 bg-blue-950/30' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(job => (
          <div key={job.id} className="bg-slate-900 border border-slate-800 hover:border-blue-700 p-4 transition-all">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {job.urgent && <span className="text-[9px] border border-red-700 text-red-400 px-1.5 py-0.5 font-bold">🔥 URGENT</span>}
                  <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{job.type}</span>
                </div>
                <div className="text-sm font-black">{job.title}</div>
                <div className="text-[10px] text-slate-500">{job.company} · {job.location}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-green-400">{job.salary}</div>
                <div className="text-[10px] text-slate-500">{job.posted}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {job.skills.map(s => <span key={s} className="text-[9px] border border-slate-700 text-slate-500 px-1.5 py-0.5">{s}</span>)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-600 flex items-center gap-1"><Users className="h-3 w-3" />{job.applicants} applicants</span>
              <button
                onClick={() => setApplied(prev => prev.includes(job.id) ? prev : [...prev, job.id])}
                className={`text-xs font-bold px-4 py-2 transition-all ${applied.includes(job.id) ? 'border border-green-700 text-green-400 flex items-center gap-1' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {applied.includes(job.id) ? <><CheckCircle className="h-3 w-3" /> Applied</> : 'APPLY NOW'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
