import React, { useState } from 'react';
import { UniversalLayout } from '@/components/UniversalLayout';
import { SovereignCard } from '@/components/SovereignCard';
import { SovereignButton } from '@/components/SovereignButton';
import { Users, Globe, MessageSquare, Heart, Share2, TrendingUp, Award, Zap, Radio, Flame } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * MEGA UPGRADE v14 - FEATURES 21-30: GLOBAL COMMUNITY
 * 
 * 21. Live Community Chat Rooms
 * 22. User Profiles & Reputation System
 * 23. Community Leaderboards
 * 24. Social Trading Signals
 * 25. Community Events & Tournaments
 * 26. Mentorship Program
 * 27. Community Polls & Voting
 * 28. User-Generated Content Hub
 * 29. Community Rewards & Badges
 * 30. Global Live Streams
 */

export const GlobalCommunityHub: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeTab, setActiveTab] = useState<'chat' | 'leaderboard' | 'events' | 'streams'>('chat');

  const topTraders = [
    { rank: 1, username: 'Skyler_Blue', roi: '+156%', followers: 12400, badge: '🏆' },
    { rank: 2, username: '龙_Dragon', roi: '+142%', followers: 9850, badge: '🥈' },
    { rank: 3, username: 'AlphaTrader', roi: '+138%', followers: 8920, badge: '🥉' },
    { rank: 4, username: 'CryptoNinja', roi: '+125%', followers: 7650, badge: '⭐' },
  ];

  const liveStreams = [
    { title: 'BTC Analysis - Live Trading', streamer: 'Skyler_Blue', viewers: 2840, duration: '1h 23m' },
    { title: 'AI Signals Breakdown', streamer: 'ShadowAI', viewers: 1540, duration: '45m' },
    { title: 'Hope Fund Update', streamer: 'Charity_Team', viewers: 890, duration: '30m' },
  ];

  const communityEvents = [
    { name: 'Trading Tournament', prize: '$50,000', participants: 1240, status: 'LIVE' },
    { name: 'Charity Challenge', prize: 'Hope Fund', participants: 856, status: 'LIVE' },
    { name: 'AI Prediction Contest', prize: 'NFT Rewards', participants: 2100, status: 'UPCOMING' },
  ];

  return (
    <UniversalLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-cyan-400 tracking-tighter flex items-center gap-3">
            <Globe className="h-8 w-8" /> GLOBAL COMMUNITY HUB
          </h1>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Features 21-30: Social Trading Ecosystem</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-900 pb-4">
          {['chat', 'leaderboard', 'events', 'streams'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-[10px] font-mono uppercase border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-500 hover:text-slate-400'
              }`}
            >
              {tab === 'chat' && 'Chat'} {tab === 'leaderboard' && 'Leaderboard'} {tab === 'events' && 'Events'} {tab === 'streams' && 'Streams'}
            </button>
          ))}
        </div>

        {/* Feature 21: Live Chat Rooms */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SovereignCard title="Feature 21: Chat Rooms" accent="blue" icon={<MessageSquare className="h-5 w-5" />}>
              <div className="space-y-2">
                {['Global Alpha', 'Trading Room', 'Charity Hub', 'AI Discussion'].map(room => (
                  <button key={room} className="w-full p-2 bg-slate-800 border border-slate-700 hover:border-blue-500 text-left text-[9px] font-mono uppercase transition-all">
                    {room}
                  </button>
                ))}
              </div>
            </SovereignCard>

            {/* Feature 22: User Profiles */}
            <SovereignCard title="Feature 22: User Profiles" accent="purple" icon={<Users className="h-5 w-5" />}>
              <div className="space-y-2 text-[9px]">
                <div className="p-2 bg-slate-800 border border-slate-700">
                  <p className="font-bold text-purple-400">Your Profile</p>
                  <p className="text-slate-500">Level 42 • 847 trades</p>
                  <p className="text-slate-500">Reputation: 9.2/10</p>
                </div>
              </div>
            </SovereignCard>

            {/* Feature 24: Social Signals */}
            <SovereignCard title="Feature 24: Social Signals" accent="green" icon={<Zap className="h-5 w-5" />}>
              <div className="space-y-1 text-[9px] text-slate-400">
                <p>✓ 12 traders bullish on BTC</p>
                <p>✓ 8 traders bearish on ETH</p>
                <p>✓ Consensus: Bullish (78%)</p>
              </div>
            </SovereignCard>
          </div>
        )}

        {/* Feature 23: Leaderboards */}
        {activeTab === 'leaderboard' && (
          <SovereignCard title="Feature 23: Community Leaderboard" accent="amber" icon={<Award className="h-5 w-5" />}>
            <div className="space-y-2">
              {topTraders.map(trader => (
                <div key={trader.rank} className="flex items-center justify-between p-3 bg-slate-800 border border-slate-700 rounded-none">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{trader.badge}</span>
                    <div>
                      <p className="text-sm font-bold text-white">{trader.username}</p>
                      <p className="text-[9px] text-slate-500">{trader.followers.toLocaleString()} followers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-400">{trader.roi}</p>
                    <p className="text-[9px] text-slate-500">ROI</p>
                  </div>
                </div>
              ))}
            </div>
          </SovereignCard>
        )}

        {/* Feature 25: Events */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityEvents.map(event => (
              <SovereignCard key={event.name} title={`Feature 25: ${event.name}`} accent={event.status === 'LIVE' ? 'red' : 'amber'} icon={<Flame className="h-5 w-5" />}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400">Prize Pool</span>
                    <span className="text-sm font-bold text-yellow-400">{event.prize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400">Participants</span>
                    <span className="text-sm font-bold text-white">{event.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400">Status</span>
                    <span className={`text-[9px] font-bold uppercase ${event.status === 'LIVE' ? 'text-red-400' : 'text-amber-400'}`}>{event.status}</span>
                  </div>
                  <SovereignButton variant="primary" size="sm" className="w-full">
                    JOIN EVENT
                  </SovereignButton>
                </div>
              </SovereignCard>
            ))}
          </div>
        )}

        {/* Feature 30: Live Streams */}
        {activeTab === 'streams' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveStreams.map(stream => (
              <SovereignCard key={stream.title} title={`Feature 30: ${stream.title}`} accent="red" icon={<Radio className="h-5 w-5" />}>
                <div className="space-y-3">
                  <div className="aspect-video bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 flex items-center justify-center rounded-none">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔴</div>
                      <p className="text-[9px] font-mono text-red-400 uppercase">LIVE</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white">{stream.streamer}</p>
                    <p className="text-[8px] text-slate-500">{stream.viewers.toLocaleString()} watching • {stream.duration}</p>
                  </div>
                  <SovereignButton variant="primary" size="sm" className="w-full">
                    WATCH NOW
                  </SovereignButton>
                </div>
              </SovereignCard>
            ))}
          </div>
        )}

        {/* Features 26-29 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Feature 26: Mentorship */}
          <SovereignCard title="Feature 26: Mentorship" accent="blue" icon={<Users className="h-4 w-4" />}>
            <div className="space-y-1 text-[9px] text-slate-400">
              <p>✓ Find Mentor</p>
              <p>✓ Become Mentor</p>
              <p>✓ 1-on-1 Sessions</p>
              <p>✓ Learning Paths</p>
            </div>
          </SovereignCard>

          {/* Feature 27: Polls */}
          <SovereignCard title="Feature 27: Community Polls" accent="purple" icon={<MessageSquare className="h-4 w-4" />}>
            <div className="space-y-2 text-[9px]">
              <p className="text-slate-400">Next Bull Run?</p>
              <div className="space-y-1">
                <div className="flex justify-between"><span>Yes</span><span className="text-green-400">72%</span></div>
                <div className="flex justify-between"><span>No</span><span className="text-red-400">28%</span></div>
              </div>
            </div>
          </SovereignCard>

          {/* Feature 28: UGC Hub */}
          <SovereignCard title="Feature 28: UGC Hub" accent="pink" icon={<Share2 className="h-4 w-4" />}>
            <div className="space-y-1 text-[9px] text-slate-400">
              <p>✓ Share Strategies</p>
              <p>✓ Post Analysis</p>
              <p>✓ Create Guides</p>
              <p>✓ Earn Rewards</p>
            </div>
          </SovereignCard>

          {/* Feature 29: Badges */}
          <SovereignCard title="Feature 29: Rewards & Badges" accent="yellow" icon={<Award className="h-4 w-4" />}>
            <div className="space-y-1 text-[9px]">
              <p className="text-yellow-400">🏆 Platinum Trader</p>
              <p className="text-yellow-400">💎 Community Hero</p>
              <p className="text-yellow-400">🎯 Signal Master</p>
              <p className="text-slate-500">+500 XP earned</p>
            </div>
          </SovereignCard>
        </div>
      </div>
    </UniversalLayout>
  );
};

export default GlobalCommunityHub;
