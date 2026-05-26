import React, { useState } from 'react';
import { Gamepad2, Trophy, DollarSign, Zap, Star, TrendingUp, Users, Play, Lock } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const GAMES = [
  { id: 1, name: 'Crypto Clash', genre: 'Strategy', players: 12847, earnings: '$0.50-$50/day', entry: 'FREE', status: 'LIVE', rating: 4.7 },
  { id: 2, name: 'Shadow Trader', genre: 'Simulation', players: 8934, earnings: '$1-$200/day', entry: '10 SKY444', status: 'LIVE', rating: 4.9 },
  { id: 3, name: 'NFT Arena', genre: 'Battle', players: 4201, earnings: '$5-$500/day', entry: '1 NFT', status: 'LIVE', rating: 4.6 },
  { id: 4, name: 'DeFi Dungeon', genre: 'RPG', players: 2103, earnings: '$0.10-$20/day', entry: 'FREE', status: 'BETA', rating: 4.4 },
];

export default function SovereignGameFi() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'games' | 'leaderboard' | 'rewards'>('games');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Gamepad2 className="h-6 w-6 text-purple-500" /> SOVEREIGN_GAMEFI</h1>
          <p className="text-slate-500 text-xs mt-1">Play-to-earn · NFT gaming · Crypto rewards · Wave 19</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-purple-400">$2,847</div><div className="text-[10px] text-slate-500">Earned</div></div>
          <div><div className="text-xl font-black text-amber-400">Level 44</div><div className="text-[10px] text-slate-500">Rank</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['games', 'leaderboard', 'rewards'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'games' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GAMES.map(game => (
            <div key={game.id} className="bg-slate-900 border border-slate-800 hover:border-purple-700 p-4 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-black">{game.name}</div>
                  <div className="text-[10px] text-slate-500">{game.genre} · {game.players.toLocaleString()} players</div>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 border ${game.status === 'LIVE' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>{game.status}</span>
              </div>
              <div className="flex items-center gap-4 mb-3 text-xs">
                <div><span className="text-green-400 font-bold">{game.earnings}</span><span className="text-slate-500 ml-1">earnings</span></div>
                <div><span className="text-amber-400 font-bold">{game.entry}</span><span className="text-slate-500 ml-1">entry</span></div>
                <div className="flex items-center gap-1 text-yellow-400"><Star className="h-3 w-3 fill-yellow-400" /> {game.rating}</div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-2 transition-all flex items-center justify-center gap-2">
                <Play className="h-3 w-3" /> PLAY NOW
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'leaderboard' && (
        <div className="space-y-2">
          {[
            { rank: 1, player: 'sky_champion_44', earnings: '$12,847', games: 284, badge: '👑' },
            { rank: 2, player: 'shadow_gamer_x', earnings: '$8,934', games: 201, badge: '🥈' },
            { rank: 3, player: 'crypto_warrior', earnings: '$6,201', games: 178, badge: '🥉' },
            { rank: 4, player: 'anon_player_1', earnings: '$4,108', games: 134, badge: '' },
            { rank: 5, player: 'defi_gamer', earnings: '$3,847', games: 112, badge: '' },
          ].map(p => (
            <div key={p.rank} className={`flex items-center justify-between p-3 border ${p.rank <= 3 ? 'border-amber-800 bg-amber-950/10' : 'border-slate-800 bg-slate-900'}`}>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black w-8">{p.badge || `#${p.rank}`}</span>
                <div className="text-xs font-bold">@{p.player}</div>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-green-400 font-bold">{p.earnings}</span>
                <span className="text-slate-500">{p.games} games</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'rewards' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Daily Login', reward: '10 SKY444', claimed: true },
            { name: 'Win 5 Games', reward: '50 SKY444', claimed: false },
            { name: 'Refer a Player', reward: '100 SKY444', claimed: false },
            { name: 'Level 50', reward: '500 SKY444', claimed: false },
          ].map(r => (
            <div key={r.name} className={`border p-4 text-center ${r.claimed ? 'border-slate-700 opacity-50' : 'border-purple-800 bg-purple-950/20'}`}>
              <div className="text-2xl mb-2">{r.claimed ? '✅' : '🎁'}</div>
              <div className="text-xs font-bold mb-1">{r.name}</div>
              <div className="text-sm font-black text-amber-400">{r.reward}</div>
              <button disabled={r.claimed} className={`mt-2 w-full text-[10px] font-bold py-1.5 transition-all ${r.claimed ? 'text-slate-600' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
                {r.claimed ? 'CLAIMED' : 'CLAIM'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
