import React, { useState } from 'react';
import { Image, Zap, DollarSign, Users, TrendingUp, Star, Plus, Eye, Lock, Globe } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const COLLECTION = [
  { id: 1, name: 'SkyBlue #4444', rarity: 'Legendary', price: '2.4 ETH', listed: true, traits: ['Gold Background', 'Diamond Eyes', 'Sky Crown'] },
  { id: 2, name: 'SkyBlue #0001', rarity: 'Rare', price: '0.8 ETH', listed: false, traits: ['Blue Background', 'Laser Eyes', 'Halo'] },
  { id: 3, name: 'SkyBlue #1337', rarity: 'Epic', price: '1.2 ETH', listed: true, traits: ['Purple Background', 'Neon Eyes', 'Wings'] },
  { id: 4, name: 'SkyBlue #0420', rarity: 'Common', price: '0.2 ETH', listed: false, traits: ['White Background', 'Normal Eyes', 'Cap'] },
];

export default function SovereignNFTStudio() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'collection' | 'create' | 'analytics'>('collection');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Image className="h-6 w-6 text-purple-500" /> NFT_STUDIO</h1>
          <p className="text-slate-500 text-xs mt-1">Sovereign NFT creation & trading · Wave 19</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-purple-400">284</div><div className="text-[10px] text-slate-500">NFTs</div></div>
          <div><div className="text-xl font-black text-green-400">12.4 ETH</div><div className="text-[10px] text-slate-500">Total Value</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['collection', 'create', 'analytics'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'collection' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COLLECTION.map(nft => (
            <div key={nft.id} className="bg-slate-900 border border-slate-800 hover:border-purple-700 p-4 transition-all">
              <div className="aspect-square bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-slate-700 flex items-center justify-center mb-3">
                <Image className="h-12 w-12 text-slate-700" />
              </div>
              <div className="text-xs font-bold mb-1">{nft.name}</div>
              <div className={`text-[9px] font-black mb-2 ${nft.rarity === 'Legendary' ? 'text-amber-400' : nft.rarity === 'Epic' ? 'text-purple-400' : nft.rarity === 'Rare' ? 'text-blue-400' : 'text-slate-400'}`}>{nft.rarity}</div>
              <div className="text-xs font-bold text-purple-400 mb-2">{nft.price}</div>
              <div className="flex flex-wrap gap-1 mb-3">
                {nft.traits.map(t => <span key={t} className="text-[8px] border border-slate-700 text-slate-500 px-1 py-0.5">{t}</span>)}
              </div>
              <button className={`w-full text-[10px] font-bold py-1.5 transition-all ${nft.listed ? 'border border-red-800 text-red-400 hover:bg-red-950/30' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
                {nft.listed ? 'DELIST' : 'LIST FOR SALE'}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'create' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">NFT Name</label>
              <input className="w-full bg-slate-900 border border-slate-700 focus:border-purple-600 text-white px-3 py-2 text-sm outline-none" placeholder="SkyBlue #4445" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">Description</label>
              <textarea className="w-full bg-slate-900 border border-slate-700 focus:border-purple-600 text-white px-3 py-2 text-sm outline-none resize-none" rows={3} placeholder="Describe your NFT..." value={desc} onChange={e => setDesc(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">Blockchain</label>
              <select className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none">
                {['Ethereum', 'Polygon', 'Solana', 'SKY444 Chain'].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">Royalty %</label>
              <input className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none" placeholder="5%" />
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2">
              <Zap className="h-4 w-4" /> MINT NFT
            </button>
          </div>
          <div className="border-2 border-dashed border-slate-700 hover:border-purple-700 transition-all flex items-center justify-center p-12 text-center">
            <div>
              <Image className="h-16 w-16 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">Drop artwork here</p>
              <p className="text-slate-700 text-xs mt-1">PNG, GIF, MP4 · Max 100MB</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'analytics' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Floor Price', value: '0.2 ETH', delta: '+12%' },
            { label: 'Total Volume', value: '48.4 ETH', delta: '+34%' },
            { label: 'Unique Holders', value: '284', delta: '+8%' },
            { label: 'Listed %', value: '42%', delta: '-3%' },
            { label: 'Avg Sale Price', value: '0.84 ETH', delta: '+18%' },
            { label: 'Royalties Earned', value: '2.4 ETH', delta: '+67%' },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 p-4">
              <div className="text-[10px] text-slate-500 mb-1">{s.label}</div>
              <div className="text-xl font-black text-purple-400">{s.value}</div>
              <div className="text-[10px] text-green-400 font-bold">{s.delta}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
