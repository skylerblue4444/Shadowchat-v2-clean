import React, { useState } from 'react';
import { Gift, Zap, Clock, CheckCircle, Star, DollarSign, AlertTriangle, Globe, Users } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const AIRDROPS = [
  { id: 1, project: 'SKY444 v20 Launch', token: 'SKY444', amount: '1,000 SKY444', value: '$280', deadline: 'May 30', tasks: ['Hold 100 SKY444', 'Follow on X', 'Join Discord'], completed: 2, total: 3, status: 'ACTIVE', tier: 'GOLD' },
  { id: 2, project: 'ShadowDEX Launch', token: 'SHDX', amount: '500 SHDX', value: '$150', deadline: 'Jun 5', tasks: ['Trade on platform', 'Refer 1 friend'], completed: 1, total: 2, status: 'ACTIVE', tier: 'SILVER' },
  { id: 3, project: 'GreyChain Mainnet', token: 'GREY', amount: '2,500 GREY', value: '$500', deadline: 'Jun 15', tasks: ['Bridge assets', 'Stake 30 days', 'Vote on proposal', 'Complete KYC-lite'], completed: 0, total: 4, status: 'ACTIVE', tier: 'PLATINUM' },
  { id: 4, project: 'QuantumVault Protocol', token: 'QVT', amount: '10,000 QVT', value: '$1,200', deadline: 'Ended', tasks: ['All completed'], completed: 3, total: 3, status: 'CLAIMED', tier: 'DIAMOND' },
];

export default function SovereignAirdropCenter() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [claimed, setClaimed] = useState<number[]>([4]);

  const tierColor = (t: string) => t === 'DIAMOND' ? 'text-blue-400 border-blue-800' : t === 'PLATINUM' ? 'text-purple-400 border-purple-800' : t === 'GOLD' ? 'text-amber-400 border-amber-800' : 'text-slate-400 border-slate-700';

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Gift className="h-6 w-6 text-pink-500" /> AIRDROP_CENTER</h1>
          <p className="text-slate-500 text-xs mt-1">Curated airdrops · Task-based rewards · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-pink-400">$2,130</div><div className="text-[10px] text-slate-500">Available</div></div>
          <div><div className="text-xl font-black text-green-400">$1,200</div><div className="text-[10px] text-slate-500">Claimed</div></div>
        </div>
      </div>

      <div className="space-y-4">
        {AIRDROPS.map(drop => (
          <div key={drop.id} className={`border p-4 transition-all ${drop.status === 'CLAIMED' ? 'border-slate-800 bg-slate-900 opacity-70' : 'border-slate-800 bg-slate-900 hover:border-pink-800'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-black px-2 py-0.5 border ${tierColor(drop.tier)}`}>{drop.tier}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 border ${drop.status === 'CLAIMED' ? 'border-green-700 text-green-400' : 'border-blue-700 text-blue-400'}`}>{drop.status}</span>
                </div>
                <div className="text-sm font-black">{drop.project}</div>
                <div className="text-[10px] text-slate-500">{drop.token} · Deadline: {drop.deadline}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-pink-400">{drop.amount}</div>
                <div className="text-xs text-green-400 font-bold">~{drop.value}</div>
              </div>
            </div>

            <div className="space-y-1 mb-3">
              {drop.tasks.map((task, i) => (
                <div key={task} className={`flex items-center gap-2 text-xs ${i < drop.completed ? 'text-green-400' : 'text-slate-500'}`}>
                  {i < drop.completed ? <CheckCircle className="h-3 w-3 flex-shrink-0" /> : <div className="h-3 w-3 border border-slate-600 rounded-full flex-shrink-0" />}
                  {task}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 mb-1">{drop.completed}/{drop.total} tasks complete</div>
                <div className="bg-slate-800 h-1.5 w-32"><div className="h-full bg-pink-500" style={{width:`${(drop.completed/drop.total)*100}%`}} /></div>
              </div>
              {drop.status !== 'CLAIMED' ? (
                drop.completed === drop.total ? (
                  <button onClick={() => setClaimed(prev => [...prev, drop.id])} className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-4 py-2 transition-all flex items-center gap-1"><Gift className="h-3 w-3" /> CLAIM</button>
                ) : (
                  <button className="border border-slate-700 text-slate-400 text-xs font-bold px-4 py-2 hover:border-slate-500 transition-all">COMPLETE TASKS</button>
                )
              ) : (
                <span className="text-xs text-green-400 font-bold flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Claimed!</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
