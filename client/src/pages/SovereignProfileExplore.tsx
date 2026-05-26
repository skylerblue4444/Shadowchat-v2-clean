import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { Search, Users, UserPlus, Shield, Star, Globe, MessageSquare, Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Sovereign Profile Explore — Billion-Dollar Polish
 * Discovery of elite operators, developers, and partners with AI matching.
 */
export const SovereignProfileExplore: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/50">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-indigo-500">PROFILE_EXPLORE_v10</h1>
          <GlobalStatus />
        </div>
        <div className="flex gap-4">
          <SovereignBadge label="AI_MATCHING_ACTIVE" />
          <SovereignBadge label="GLOBAL_NETWORK_SYNC" />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 bg-slate-950 border border-slate-900 p-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
            <input 
              className="w-full bg-slate-900 border border-slate-800 text-xs pl-10 pr-4 py-3 rounded-none focus:border-indigo-500 outline-none font-mono"
              placeholder="Search_Sovereign_Operators (Devs, Traders, Hackers)..."
            />
          </div>
          <div className="flex gap-4">
            <select className="bg-slate-900 border border-slate-800 text-[10px] px-4 py-3 rounded-none focus:border-indigo-500 outline-none font-mono uppercase">
              <option>All_Roles</option>
              <option>Developers</option>
              <option>Traders</option>
              <option>Security_Ops</option>
            </select>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 rounded-none uppercase text-[10px]">SEARCH</Button>
          </div>
        </div>

        {/* Featured Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { name: 'Neo_Shadow', role: 'ELITE_DEV', level: 99, xp: '444K', status: 'ONLINE' },
            { name: 'Skyler_Admin', role: 'SOVEREIGN_OP', level: 100, xp: '1.2M', status: 'ONLINE' },
            { name: 'Degen_Lord', role: 'MASTER_TRADER', level: 88, xp: '320K', status: 'AWAY' },
            { name: 'Cipher_Punk', role: 'SECURITY_OPS', level: 92, xp: '512K', status: 'BUSY' },
            { name: 'Crypto_Queen', role: 'ECOSYSTEM_DEV', level: 85, xp: '280K', status: 'ONLINE' },
            { name: 'Hacker_Zero', role: 'CTF_MASTER', level: 95, xp: '640K', status: 'ONLINE' },
            { name: 'Stable_King', role: 'LIQUIDITY_OP', level: 82, xp: '190K', status: 'OFFLINE' },
            { name: 'Ghost_Runner', role: 'SHADOW_DEV', level: 90, xp: '420K', status: 'ONLINE' },
          ].map((profile, i) => (
            <div key={i} className="bg-slate-950 border border-slate-900 group hover:border-indigo-500/50 transition-all p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="h-16 w-16 bg-slate-900 border border-slate-800 flex items-center justify-center relative">
                  <Users className="h-8 w-8 text-slate-700 group-hover:text-indigo-500 transition-colors" />
                  <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-950 ${profile.status === 'ONLINE' ? 'bg-green-500' : profile.status === 'AWAY' ? 'bg-amber-500' : 'bg-slate-700'}`} />
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-mono text-slate-500 uppercase">Level {profile.level}</p>
                  <p className="text-xs font-black text-indigo-500 uppercase">{profile.role}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-black tracking-tighter text-slate-200">{profile.name}</h3>
                <div className="flex gap-2 mt-2">
                  <SovereignBadge label={`${profile.xp} XP`} />
                  <SovereignBadge label="VERIFIED" />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-900">
                <Button variant="outline" className="flex-1 border-slate-800 text-[8px] font-black h-10 rounded-none uppercase hover:bg-indigo-600 hover:text-white transition-all">
                  <UserPlus className="h-3 w-3 mr-2" /> Follow
                </Button>
                <Button variant="outline" className="flex-1 border-slate-800 text-[8px] font-black h-10 rounded-none uppercase hover:bg-slate-800">
                  <MessageSquare className="h-3 w-3 mr-2" /> Chat
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Network Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PremiumCard title="TOTAL_OPERATORS">
            <div className="text-3xl font-black text-indigo-500">4,444</div>
            <p className="text-[10px] text-slate-500 mt-2 uppercase">Verified Sovereign Profiles</p>
          </PremiumCard>
          <PremiumCard title="ACTIVE_SESSIONS">
            <div className="text-3xl font-black text-green-500">1,242</div>
            <p className="text-[10px] text-slate-500 mt-2 uppercase">Live Global Interactions</p>
          </PremiumCard>
          <PremiumCard title="MATCH_ACCURACY">
            <div className="text-3xl font-black text-amber-500">94.8%</div>
            <p className="text-[10px] text-slate-500 mt-2 uppercase">AI Compatibility Scoring</p>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default SovereignProfileExplore;
