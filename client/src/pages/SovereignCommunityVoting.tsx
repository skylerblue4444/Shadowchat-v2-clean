import React, { useState } from 'react';
import { Vote, Users, TrendingUp, CheckCircle, Clock, MessageCircle, ThumbsUp, ThumbsDown, Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const PROPOSALS = [
  { id: 1, title: 'Add Monero (XMR) to SKY444 wallet', category: 'Product', author: 'privacy_advocate', votes: { up: 8420, down: 1203 }, comments: 284, status: 'VOTING', ends: '3 days', userVote: null as 'up' | 'down' | null },
  { id: 2, title: 'Reduce trading fees by 50% for Gold+ members', category: 'Finance', author: 'whale_44', votes: { up: 12847, down: 2103 }, comments: 847, status: 'VOTING', ends: '5 days', userVote: 'up' as 'up' | 'down' | null },
  { id: 3, title: 'Launch SKY444 mobile app for iOS/Android', category: 'Product', author: 'mobile_dev', votes: { up: 24201, down: 847 }, comments: 1204, status: 'PASSED', ends: 'Ended', userVote: 'up' as 'up' | 'down' | null },
  { id: 4, title: 'Implement zero-knowledge proof login', category: 'Security', author: 'zk_researcher', votes: { up: 6847, down: 1204 }, comments: 312, status: 'VOTING', ends: '8 days', userVote: null as 'up' | 'down' | null },
];

export default function SovereignCommunityVoting() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [proposals, setProposals] = useState(PROPOSALS);

  const vote = (id: number, direction: 'up' | 'down') => {
    setProposals(prev => prev.map(p => {
      if (p.id !== id || p.status !== 'VOTING') return p;
      const wasVoted = p.userVote === direction;
      return {
        ...p,
        userVote: wasVoted ? null : direction,
        votes: {
          up: direction === 'up' ? (wasVoted ? p.votes.up - 1 : p.votes.up + (p.userVote === 'down' ? 1 : 1)) : (p.userVote === 'up' ? p.votes.up - 1 : p.votes.up),
          down: direction === 'down' ? (wasVoted ? p.votes.down - 1 : p.votes.down + (p.userVote === 'up' ? 1 : 1)) : (p.userVote === 'down' ? p.votes.down - 1 : p.votes.down),
        }
      };
    }));
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Vote className="h-6 w-6 text-blue-500" /> COMMUNITY_VOTING</h1>
          <p className="text-slate-500 text-xs mt-1">Shape the platform · Your vote matters · Wave 20</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 transition-all">+ SUBMIT PROPOSAL</button>
      </div>

      <div className="space-y-4">
        {proposals.map(p => {
          const total = p.votes.up + p.votes.down;
          const upPct = total > 0 ? (p.votes.up / total) * 100 : 50;
          return (
            <div key={p.id} className={`border p-4 transition-all ${p.status === 'PASSED' ? 'border-green-800 bg-green-950/10' : 'border-slate-800 bg-slate-900'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{p.category}</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 border ${p.status === 'PASSED' ? 'border-green-700 text-green-400' : 'border-blue-700 text-blue-400'}`}>{p.status}</span>
                    {p.status === 'VOTING' && <span className="text-[9px] text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" />{p.ends} left</span>}
                  </div>
                  <h3 className="text-sm font-bold">{p.title}</h3>
                  <div className="text-[10px] text-slate-500">by @{p.author}</div>
                </div>
              </div>

              <div className="flex h-4 mb-2 overflow-hidden bg-slate-800">
                <div className="bg-green-500 h-full flex items-center justify-center text-[9px] font-black text-white" style={{width:`${upPct}%`}}>{upPct.toFixed(0)}%</div>
                <div className="bg-red-500 h-full flex-1 flex items-center justify-center text-[9px] font-black text-white">{(100-upPct).toFixed(0)}%</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3 text-green-400" />{p.votes.up.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><ThumbsDown className="h-3 w-3 text-red-400" />{p.votes.down.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{p.comments}</span>
                </div>
                {p.status === 'VOTING' && (
                  <div className="flex gap-2">
                    <button onClick={() => vote(p.id, 'up')} className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 border transition-all ${p.userVote === 'up' ? 'border-green-600 bg-green-950/30 text-green-400' : 'border-slate-700 text-slate-400 hover:border-green-700'}`}>
                      <ThumbsUp className="h-3 w-3" /> YES
                    </button>
                    <button onClick={() => vote(p.id, 'down')} className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 border transition-all ${p.userVote === 'down' ? 'border-red-600 bg-red-950/30 text-red-400' : 'border-slate-700 text-slate-400 hover:border-red-700'}`}>
                      <ThumbsDown className="h-3 w-3" /> NO
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
