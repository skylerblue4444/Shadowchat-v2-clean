import React, { useState } from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { Terminal, ShieldAlert, Cpu, Trophy, Lock, Unlock, Code, Send } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Hacker Puzzle Terminal — Billion-Dollar Polish
 * 10 hacker CTF challenges with leaderboard and token rewards.
 */
export const HackerPuzzleTerminal: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeChallenge, setActiveChallenge] = useState(0);

  const challenges = [
    { id: 1, title: 'SHADOW_KERNEL_BYPASS', difficulty: 'HARD', reward: '500 SKY', status: 'UNLOCKED' },
    { id: 2, title: 'WIRE_PROTOCOL_CRACK', difficulty: 'INSANE', reward: '1000 SKY', status: 'LOCKED' },
    { id: 3, title: 'SQL_INJECTION_WARRIOR', difficulty: 'MEDIUM', reward: '250 SKY', status: 'UNLOCKED' },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-mono">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/50">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-green-500 flex items-center gap-3">
            <Terminal className="h-8 w-8" /> CTF_TERMINAL_v10
          </h1>
          <GlobalStatus />
        </div>
        <div className="flex gap-4">
          <SovereignBadge label="ENCRYPTION_ACTIVE" />
          <SovereignBadge label="VPN_CIRCUIT_ON" />
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Challenge List */}
        <div className="space-y-4">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest px-2">Active Challenges</p>
          {challenges.map((c, i) => (
            <div 
              key={i} 
              onClick={() => c.status === 'UNLOCKED' && setActiveChallenge(i)}
              className={`p-4 border cursor-pointer transition-all ${i === activeChallenge ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-slate-950 border-slate-900 text-slate-500 hover:border-slate-700'} ${c.status === 'LOCKED' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black">CHALLENGE_0{c.id}</span>
                {c.status === 'LOCKED' ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
              </div>
              <p className="text-[10px] font-bold truncate">{c.title}</p>
              <div className="flex justify-between items-center mt-4 text-[8px] uppercase">
                <span>{c.difficulty}</span>
                <span className="text-amber-500">{c.reward}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Interface */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-950 border border-slate-900 h-[500px] flex flex-col">
            <div className="p-3 border-b border-slate-900 flex justify-between items-center bg-slate-900/50">
              <span className="text-[10px] text-slate-400">SESSION: {challenges[activeChallenge].title}</span>
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="text-green-500/80 text-xs leading-relaxed">
                <p className="mb-4">System vulnerability detected in Shadow Kernel v10.4.2.</p>
                <p className="mb-4">Target: 0x4444_VULN_ENDPOINT</p>
                <p className="mb-4">Objective: Inject a polymorphic payload to bypass the Double-Ratchet encryption layer and retrieve the hidden FLAG.</p>
                <div className="p-4 bg-slate-900 border border-slate-800 text-slate-400 italic">
                  "Hint: Look into the AST mutation engine for structural vulnerabilities."
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-900 flex gap-4">
              <div className="flex-1 bg-black border border-slate-800 flex items-center px-4">
                <span className="text-green-500 mr-2">$</span>
                <input 
                  type="text" 
                  className="bg-transparent border-none focus:ring-0 text-xs text-green-500 w-full font-mono"
                  placeholder="Enter FLAG{...}"
                />
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-black font-black px-8 rounded-none uppercase text-[10px]">
                <Send className="h-3 w-3 mr-2" /> SUBMIT
              </Button>
            </div>
          </div>
        </div>

        {/* Leaderboard & Stats */}
        <div className="space-y-6">
          <PremiumCard title="HACKER_LEADERBOARD">
            <div className="space-y-3">
              {[
                { user: 'Neo_Shadow', score: '44,400', rank: 1 },
                { user: 'Degen_Lord', score: '32,100', rank: 2 },
                { user: 'Skyler_Admin', score: '28,500', rank: 3 },
              ].map((h, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-900/50 border border-slate-800 text-[10px]">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-600">#{h.rank}</span>
                    <span className="text-slate-300 uppercase">{h.user}</span>
                  </div>
                  <span className="text-green-500 font-bold">{h.score} XP</span>
                </div>
              ))}
            </div>
          </PremiumCard>

          <PremiumCard title="YOUR_STATS">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 border border-green-500/30">
                  <Trophy className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Challenges Solved</p>
                  <p className="text-xl font-black">4 / 10</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30">
                  <Cpu className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Rank Tier</p>
                  <p className="text-xl font-black text-amber-500">ELITE_HACKER</p>
                </div>
              </div>
            </div>
          </PremiumCard>

          <PremiumCard title="THREAT_MAP">
            <div className="aspect-square bg-slate-900 border border-slate-800 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldAlert className="h-16 w-16 text-slate-800 group-hover:text-green-500/50 transition-colors" />
              </div>
              <p className="absolute bottom-4 left-0 w-full text-center text-[8px] text-slate-600 uppercase">Live Global Intrusions: 42</p>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default HackerPuzzleTerminal;
