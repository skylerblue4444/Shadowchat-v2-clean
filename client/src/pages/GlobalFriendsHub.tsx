import React, { useState } from 'react';
import { UniversalLayout } from '@/components/UniversalLayout';
import { SovereignCard } from '@/components/SovereignCard';
import { SovereignButton } from '@/components/SovereignButton';
import { Users, Globe, Heart, MessageSquare, UserPlus, Search, TrendingUp, Flag } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface Friend {
  id: string;
  username: string;
  region: 'USA' | 'China' | 'Global';
  status: 'online' | 'away' | 'offline';
  level: number;
  interests: string[];
  avatar: string;
}

export const GlobalFriendsHub: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeTab, setActiveTab] = useState<'friends' | 'discover' | 'groups'>('friends');
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'USA' | 'China'>('All');

  const friends: Friend[] = [
    {
      id: '1',
      username: 'Skyler_Blue',
      region: 'USA',
      status: 'online',
      level: 50,
      interests: ['Trading', 'AI', 'Charity'],
      avatar: '🚀',
    },
    {
      id: '2',
      username: '希望_Hope',
      region: 'China',
      status: 'online',
      level: 42,
      interests: ['Trading', 'Community', 'Gaming'],
      avatar: '🌟',
    },
    {
      id: '3',
      username: 'AlphaTrader',
      region: 'USA',
      status: 'away',
      level: 38,
      interests: ['Trading', 'Analysis'],
      avatar: '📈',
    },
    {
      id: '4',
      username: '龙_Dragon',
      region: 'China',
      status: 'online',
      level: 45,
      interests: ['Charity', 'Social', 'Gaming'],
      avatar: '🐉',
    },
  ];

  const discoveredUsers: Friend[] = [
    {
      id: '5',
      username: 'CryptoNinja',
      region: 'USA',
      status: 'online',
      level: 28,
      interests: ['Trading', 'NFTs'],
      avatar: '🥷',
    },
    {
      id: '6',
      username: '凤凰_Phoenix',
      region: 'China',
      status: 'online',
      level: 35,
      interests: ['AI', 'Trading', 'Community'],
      avatar: '🔥',
    },
  ];

  const groups = [
    { name: 'USA Trading Room', members: 1244, region: 'USA', language: 'English' },
    { name: '中文交易室', members: 2156, region: 'China', language: '中文' },
    { name: 'Global Alpha', members: 3421, region: 'Global', language: 'English/中文' },
    { name: 'Hope Campus Fund', members: 856, region: 'Global', language: 'English/中文' },
  ];

  const filteredFriends = friends.filter(f => selectedRegion === 'All' || f.region === selectedRegion);

  return (
    <UniversalLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-cyan-400 tracking-tighter flex items-center gap-3">
              <Users className="h-8 w-8" /> GLOBAL FRIENDS HUB
            </h1>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Connect with traders worldwide 🌍</p>
          </div>

          <div className="w-full md:w-96 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
            <input
              type="text"
              placeholder="Search friends, users..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Region Filter */}
        <div className="flex gap-2">
          {['All', 'USA', 'China'].map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region as 'All' | 'USA' | 'China')}
              className={`px-4 py-2 text-[10px] font-mono uppercase border transition-all ${
                selectedRegion === region
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              {region === 'USA' && '🇺🇸'} {region === 'China' && '🇨🇳'} {region}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-900 pb-4">
          {['friends', 'discover', 'groups'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-[10px] font-mono uppercase border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-500 hover:text-slate-400'
              }`}
            >
              {tab === 'friends' && 'Friends'} {tab === 'discover' && 'Discover'} {tab === 'groups' && 'Groups'}
            </button>
          ))}
        </div>

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFriends.map(friend => (
              <SovereignCard
                key={friend.id}
                title={friend.username}
                subtitle={`Level ${friend.level}`}
                accent={friend.region === 'USA' ? 'blue' : friend.region === 'China' ? 'red' : 'cyan'}
              >
                <div className="space-y-4">
                  <div className="text-center text-4xl">{friend.avatar}</div>

                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        friend.status === 'online'
                          ? 'bg-green-500'
                          : friend.status === 'away'
                          ? 'bg-yellow-500'
                          : 'bg-slate-600'
                      }`}
                    />
                    <span className="text-[9px] font-mono uppercase text-slate-400">{friend.status}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-center">
                    {friend.interests.map(interest => (
                      <span
                        key={interest}
                        className="text-[8px] font-mono px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-400"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <SovereignButton variant="primary" size="sm" className="flex-1">
                      <MessageSquare className="h-3 w-3" />
                    </SovereignButton>
                    <SovereignButton variant="ghost" size="sm" className="flex-1">
                      <Heart className="h-3 w-3" />
                    </SovereignButton>
                  </div>
                </div>
              </SovereignCard>
            ))}
          </div>
        )}

        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoveredUsers.map(user => (
              <SovereignCard
                key={user.id}
                title={user.username}
                subtitle={`Level ${user.level}`}
                accent="purple"
              >
                <div className="space-y-4">
                  <div className="text-center text-4xl">{user.avatar}</div>

                  <div className="flex items-center justify-center gap-2">
                    <Flag className="h-3 w-3 text-slate-500" />
                    <span className="text-[9px] font-mono uppercase text-slate-400">
                      {user.region === 'USA' ? '🇺🇸 USA' : '🇨🇳 China'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-center">
                    {user.interests.map(interest => (
                      <span
                        key={interest}
                        className="text-[8px] font-mono px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-400"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <SovereignButton variant="primary" size="sm" className="w-full">
                    <UserPlus className="h-3 w-3" /> Add Friend
                  </SovereignButton>
                </div>
              </SovereignCard>
            ))}
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === 'groups' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map(group => (
              <SovereignCard
                key={group.name}
                title={group.name}
                subtitle={`${group.members.toLocaleString()} members`}
                accent="green"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-green-400" />
                      <span className="text-[9px] font-mono text-slate-400">{group.region}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">{group.language}</span>
                  </div>

                  <div className="flex gap-2">
                    <SovereignButton variant="primary" size="sm" className="flex-1">
                      JOIN
                    </SovereignButton>
                    <SovereignButton variant="ghost" size="sm" className="flex-1">
                      INFO
                    </SovereignButton>
                  </div>
                </div>
              </SovereignCard>
            ))}
          </div>
        )}
      </div>
    </UniversalLayout>
  );
};

export default GlobalFriendsHub;
