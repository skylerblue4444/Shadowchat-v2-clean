import React, { useState } from 'react';
import { Award, DollarSign, Users, CheckCircle, Clock, Star, Zap, FileText, Globe } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const GRANTS = [
  { id: 1, title: 'Open Source DeFi Tools', amount: '$25,000', deadline: 'Jun 15', applicants: 47, category: 'Dev', status: 'OPEN', requirements: ['Open source', 'DeFi focus', 'Working prototype'] },
  { id: 2, title: 'Crypto Education Initiative', amount: '$10,000', deadline: 'Jun 30', applicants: 89, category: 'Education', status: 'OPEN', requirements: ['Free content', 'Beginner-friendly', 'Multi-language'] },
  { id: 3, title: 'Privacy Technology Research', amount: '$50,000', deadline: 'Jul 15', applicants: 23, category: 'Research', status: 'OPEN', requirements: ['Academic or indie', 'ZK or MPC focus', 'Publishable results'] },
  { id: 4, title: 'Community Builder Grant', amount: '$5,000', deadline: 'May 31', applicants: 312, category: 'Community', status: 'CLOSING', requirements: ['Active community', '500+ members', 'Regular events'] },
];

export default function SovereignGrantProgram() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [applied, setApplied] = useState<number[]>([]);
  const [showForm, setShowForm] = useState<number | null>(null);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Award className="h-6 w-6 text-amber-500" /> GRANT_PROGRAM</h1>
          <p className="text-slate-500 text-xs mt-1">SKY444 ecosystem grants · Fund your project · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-amber-400">$90K</div><div className="text-[10px] text-slate-500">Available</div></div>
          <div><div className="text-xl font-black text-green-400">4</div><div className="text-[10px] text-slate-500">Open Grants</div></div>
        </div>
      </div>

      <div className="space-y-4">
        {GRANTS.map(grant => (
          <div key={grant.id} className={`border p-4 transition-all ${grant.status === 'CLOSING' ? 'border-red-900 bg-red-950/10' : 'border-slate-800 bg-slate-900 hover:border-amber-800'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{grant.category}</span>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 border ${grant.status === 'CLOSING' ? 'border-red-700 text-red-400' : 'border-green-700 text-green-400'}`}>{grant.status}</span>
                </div>
                <div className="text-sm font-black">{grant.title}</div>
                <div className="text-[10px] text-slate-500">Deadline: {grant.deadline} · {grant.applicants} applicants</div>
              </div>
              <div className="text-xl font-black text-amber-400">{grant.amount}</div>
            </div>

            <div className="mb-3">
              <div className="text-[10px] text-slate-500 mb-1">Requirements:</div>
              <div className="flex flex-wrap gap-1">
                {grant.requirements.map(r => <span key={r} className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{r}</span>)}
              </div>
            </div>

            {showForm === grant.id ? (
              <div className="space-y-2 border-t border-slate-700 pt-3">
                <input className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-xs outline-none" placeholder="Project name" />
                <textarea className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-xs outline-none resize-none" rows={2} placeholder="Brief description..." />
                <input className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-xs outline-none" placeholder="Your wallet address" />
                <div className="flex gap-2">
                  <button onClick={() => { setApplied(prev => [...prev, grant.id]); setShowForm(null); }} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 transition-all">SUBMIT APPLICATION</button>
                  <button onClick={() => setShowForm(null)} className="border border-slate-700 text-slate-400 text-xs font-bold px-4 py-2">CANCEL</button>
                </div>
              </div>
            ) : applied.includes(grant.id) ? (
              <div className="flex items-center gap-2 text-xs text-green-400 font-bold border-t border-slate-700 pt-3"><CheckCircle className="h-4 w-4" /> Application submitted!</div>
            ) : (
              <button onClick={() => setShowForm(grant.id)} className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 transition-all">APPLY FOR GRANT</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
