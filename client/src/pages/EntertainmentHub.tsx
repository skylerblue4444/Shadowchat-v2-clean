import React, { useState } from 'react';
import { UniversalLayout } from '@/components/UniversalLayout';
import { SovereignCard } from '@/components/SovereignCard';
import { SovereignButton } from '@/components/SovereignButton';
import { Gamepad2, Music, Film, Zap, Gift, Star, Trophy, Users, Radio, Sparkles } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * MEGA UPGRADE v14 - FEATURES 31-40: MULTIMEDIA & ENTERTAINMENT
 * 
 * 31. Gaming Arcade (Mini Games)
 * 32. Music Streaming Integration
 * 33. Podcast Hub
 * 34. NFT Gallery & Marketplace
 * 35. Video Streaming Platform
 * 36. Interactive Webinars
 * 37. AR/VR Trading Experience
 * 38. Gamification & Achievements
 * 39. Content Recommendation Engine
 * 40. Social Media Integration
 */

export const EntertainmentHub: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeTab, setActiveTab] = useState<'games' | 'music' | 'nft' | 'video'>('games');

  const games = [
    { name: 'Crypto Clicker', plays: 12400, rating: 4.8, reward: '100 SKY' },
    { name: 'Trading Tycoon', plays: 8900, rating: 4.6, reward: '150 SKY' },
    { name: 'Market Master', plays: 15600, rating: 4.9, reward: '200 SKY' },
    { name: 'Hope Quest', plays: 6700, rating: 4.7, reward: '120 SKY' },
  ];

  const playlists = [
    { name: 'Trading Vibes', songs: 42, duration: '3h 24m', plays: 8900 },
    { name: 'Crypto Beats', songs: 38, duration: '2h 56m', plays: 6200 },
    { name: 'Focus Flow', songs: 50, duration: '4h 12m', plays: 12100 },
  ];

  const nfts = [
    { name: 'Trader Elite #001', owner: 'Skyler_Blue', value: '5 ETH', rarity: 'Legendary' },
    { name: 'Hope Avatar', owner: 'You', value: '2 ETH', rarity: 'Rare' },
    { name: 'Market Master', owner: 'Dragon_龙', value: '3.5 ETH', rarity: 'Epic' },
  ];

  return (
    <UniversalLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-purple-500 tracking-tighter flex items-center gap-3">
            <Sparkles className="h-8 w-8" /> ENTERTAINMENT HUB
          </h1>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Features 31-40: Multimedia & Gamification</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-900 pb-4 overflow-x-auto">
          {['games', 'music', 'nft', 'video'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-[10px] font-mono uppercase border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-500 hover:text-slate-400'
              }`}
            >
              {tab === 'games' && 'Games'} {tab === 'music' && 'Music'} {tab === 'nft' && 'NFTs'} {tab === 'video' && 'Video'}
            </button>
          ))}
        </div>

        {/* Feature 31: Gaming Arcade */}
        {activeTab === 'games' && (
          <div className="space-y-6">
            <SovereignCard title="Feature 31: Gaming Arcade" accent="purple" icon={<Gamepad2 className="h-5 w-5" />}>
              <p className="text-[9px] text-slate-400 mb-4">Play mini games and earn rewards while trading</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {games.map(game => (
                  <div key={game.name} className="p-4 bg-slate-800 border border-slate-700 rounded-none space-y-3">
                    <div className="h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-slate-700 flex items-center justify-center rounded-none">
                      <Gamepad2 className="h-8 w-8 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-white">{game.name}</p>
                      <div className="flex justify-between text-[8px] text-slate-500 mt-1">
                        <span>⭐ {game.rating}</span>
                        <span>{game.plays.toLocaleString()} plays</span>
                      </div>
                      <p className="text-[9px] text-yellow-400 font-bold mt-2">Reward: {game.reward}</p>
                    </div>
                    <SovereignButton variant="primary" size="sm" className="w-full">
                      PLAY
                    </SovereignButton>
                  </div>
                ))}
              </div>
            </SovereignCard>

            {/* Feature 38: Gamification */}
            <SovereignCard title="Feature 38: Achievements & Gamification" accent="yellow" icon={<Trophy className="h-5 w-5" />}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['🏆 Platinum Trader', '💎 Whale Watcher', '🎯 Signal Master', '🚀 Moon Lambo'].map(badge => (
                  <div key={badge} className="p-3 bg-yellow-500/10 border border-yellow-500/30 text-center rounded-none">
                    <p className="text-[9px] font-bold text-yellow-400">{badge}</p>
                  </div>
                ))}
              </div>
            </SovereignCard>
          </div>
        )}

        {/* Feature 32: Music Streaming */}
        {activeTab === 'music' && (
          <div className="space-y-6">
            <SovereignCard title="Feature 32: Music Streaming" accent="pink" icon={<Music className="h-5 w-5" />}>
              <p className="text-[9px] text-slate-400 mb-4">Trading playlists curated for focus and energy</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {playlists.map(playlist => (
                  <div key={playlist.name} className="p-4 bg-slate-800 border border-slate-700 rounded-none space-y-3">
                    <div className="h-24 bg-gradient-to-br from-pink-500/20 to-red-500/20 border border-slate-700 flex items-center justify-center rounded-none">
                      <Music className="h-8 w-8 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-white">{playlist.name}</p>
                      <p className="text-[8px] text-slate-500 mt-1">{playlist.songs} songs • {playlist.duration}</p>
                      <p className="text-[8px] text-slate-500">{playlist.plays.toLocaleString()} plays</p>
                    </div>
                    <SovereignButton variant="primary" size="sm" className="w-full">
                      PLAY
                    </SovereignButton>
                  </div>
                ))}
              </div>
            </SovereignCard>

            {/* Feature 33: Podcast Hub */}
            <SovereignCard title="Feature 33: Podcast Hub" accent="orange" icon={<Radio className="h-5 w-5" />}>
              <div className="space-y-2">
                {['Trading Secrets Podcast', 'Crypto Daily News', 'Hope Campus Stories'].map(podcast => (
                  <button key={podcast} className="w-full p-3 bg-slate-800 border border-slate-700 hover:border-orange-500 text-left text-[9px] font-mono uppercase transition-all">
                    {podcast}
                  </button>
                ))}
              </div>
            </SovereignCard>
          </div>
        )}

        {/* Feature 34: NFT Gallery */}
        {activeTab === 'nft' && (
          <div className="space-y-6">
            <SovereignCard title="Feature 34: NFT Gallery & Marketplace" accent="cyan" icon={<Star className="h-5 w-5" />}>
              <p className="text-[9px] text-slate-400 mb-4">Collect and trade exclusive NFTs</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {nfts.map(nft => (
                  <div key={nft.name} className="p-4 bg-slate-800 border border-slate-700 rounded-none space-y-3">
                    <div className="h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-slate-700 flex items-center justify-center rounded-none">
                      <Star className="h-10 w-10 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-white">{nft.name}</p>
                      <div className="flex justify-between text-[8px] text-slate-500 mt-2">
                        <span>{nft.owner}</span>
                        <span className="text-cyan-400">{nft.rarity}</span>
                      </div>
                      <p className="text-[9px] text-yellow-400 font-bold mt-2">{nft.value}</p>
                    </div>
                    <SovereignButton variant="primary" size="sm" className="w-full">
                      VIEW
                    </SovereignButton>
                  </div>
                ))}
              </div>
            </SovereignCard>
          </div>
        )}

        {/* Feature 35: Video Streaming */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            <SovereignCard title="Feature 35: Video Streaming Platform" accent="red" icon={<Film className="h-5 w-5" />}>
              <p className="text-[9px] text-slate-400 mb-4">Watch exclusive trading and entertainment content</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Trading Masterclass', 'Hope Campus Documentary', 'AI Explained', 'Crypto Comedy'].map(video => (
                  <div key={video} className="aspect-video bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-slate-700 flex items-center justify-center rounded-none cursor-pointer hover:border-red-500 transition-all">
                    <div className="text-center">
                      <Film className="h-8 w-8 text-red-400 mx-auto mb-2" />
                      <p className="text-[9px] font-mono text-red-400 uppercase">{video}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SovereignCard>

            {/* Features 36, 37, 39, 40 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SovereignCard title="Feature 36: Webinars" accent="blue" icon={<Users className="h-4 w-4" />}>
                <div className="space-y-1 text-[9px] text-slate-400">
                  <p>✓ Live Sessions</p>
                  <p>✓ Q&A with Experts</p>
                  <p>✓ Recordings</p>
                  <p>✓ Certificates</p>
                </div>
              </SovereignCard>

              <SovereignCard title="Feature 37: AR/VR Trading" accent="purple" icon={<Sparkles className="h-4 w-4" />}>
                <div className="space-y-1 text-[9px] text-slate-400">
                  <p>✓ 3D Charts</p>
                  <p>✓ VR Trading Desk</p>
                  <p>✓ Immersive Data</p>
                  <p>✓ Future Tech</p>
                </div>
              </SovereignCard>

              <SovereignCard title="Feature 39: Recommendations" accent="green" icon={<Zap className="h-4 w-4" />}>
                <div className="space-y-1 text-[9px] text-slate-400">
                  <p>✓ AI Suggestions</p>
                  <p>✓ Personalized</p>
                  <p>✓ Trending</p>
                  <p>✓ Curated</p>
                </div>
              </SovereignCard>

              <SovereignCard title="Feature 40: Social Media" accent="blue" icon={<Users className="h-4 w-4" />}>
                <div className="space-y-1 text-[9px] text-slate-400">
                  <p>✓ Twitter Sync</p>
                  <p>✓ Discord Bot</p>
                  <p>✓ Telegram</p>
                  <p>✓ Cross-Platform</p>
                </div>
              </SovereignCard>
            </div>
          </div>
        )}
      </div>
    </UniversalLayout>
  );
};

export default EntertainmentHub;
