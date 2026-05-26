import React, { useState } from 'react';
import { Image, Zap, Star, Heart, Download, Share2, Plus, Cpu, TrendingUp } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const GALLERY = [
  { id: 1, title: 'Sovereign Bitcoin Throne', prompt: 'Bitcoin king on golden throne, cyberpunk city', likes: 2847, creator: 'ai_artist_44', style: 'Cyberpunk', price: '0.1 ETH', minted: true },
  { id: 2, title: 'DeFi Dreamscape', prompt: 'Ethereal DeFi landscape with floating protocols', likes: 1924, creator: 'hope_ai_art', style: 'Surreal', price: '0.05 ETH', minted: false },
  { id: 3, title: 'Shadow Trader Portrait', prompt: 'Anonymous crypto trader in neon-lit room', likes: 3201, creator: 'shadow_gen', style: 'Noir', price: '0.2 ETH', minted: true },
  { id: 4, title: 'SKY444 Genesis Block', prompt: 'Abstract representation of SKY444 blockchain genesis', likes: 4847, creator: 'sky_creative', style: 'Abstract', price: '0.5 ETH', minted: true },
  { id: 5, title: 'Quantum Vault Interior', prompt: 'Inside a quantum-encrypted crypto vault', likes: 1203, creator: 'ai_artist_44', style: 'Sci-Fi', price: '0.08 ETH', minted: false },
  { id: 6, title: 'Grey Area Market', prompt: 'Mysterious underground crypto marketplace', likes: 2104, creator: 'grey_gen', style: 'Dark', price: '0.15 ETH', minted: true },
];

export default function SovereignAIArtGallery() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [liked, setLiked] = useState<number[]>([4]);
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [tab, setTab] = useState<'gallery' | 'generate' | 'my-art'>('gallery');

  const generate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2500);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Image className="h-6 w-6 text-purple-500" /> AI_ART_GALLERY</h1>
          <p className="text-slate-500 text-xs mt-1">AI-generated crypto art · Mint as NFT · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-purple-400">{GALLERY.length}</div><div className="text-[10px] text-slate-500">Artworks</div></div>
          <div><div className="text-xl font-black text-green-400">4</div><div className="text-[10px] text-slate-500">Minted</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['gallery', 'generate', 'my-art'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t.replace('-', ' ')}</button>
        ))}
      </div>

      {tab === 'gallery' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map(art => (
            <div key={art.id} className="bg-slate-900 border border-slate-800 hover:border-purple-700 transition-all overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-purple-900/40 via-slate-800 to-blue-900/40 flex items-center justify-center relative">
                <Image className="h-16 w-16 text-slate-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-xs font-bold text-white">{art.title}</div>
                  <div className="text-[9px] text-slate-400">{art.style}</div>
                </div>
                {art.minted && <div className="absolute top-2 right-2 text-[9px] bg-green-600 text-white px-1.5 py-0.5 font-bold">NFT</div>}
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-500">@{art.creator}</span>
                  <span className="text-xs font-black text-purple-400">{art.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={() => setLiked(prev => prev.includes(art.id) ? prev.filter(i => i !== art.id) : [...prev, art.id])} className="flex items-center gap-1 text-[10px]">
                    <Heart className={`h-3 w-3 ${liked.includes(art.id) ? 'fill-red-500 text-red-500' : 'text-slate-500'}`} />
                    <span className="text-slate-500">{art.likes + (liked.includes(art.id) ? 1 : 0)}</span>
                  </button>
                  <div className="flex gap-1">
                    <button className="p-1 border border-slate-700 hover:border-slate-500"><Download className="h-3 w-3 text-slate-500" /></button>
                    <button className="p-1 border border-purple-800 hover:bg-purple-950/30 text-xs font-bold text-purple-400 px-2">MINT</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'generate' && (
        <div className="max-w-lg space-y-4">
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Describe your artwork</label>
            <textarea className="w-full bg-slate-900 border border-slate-700 focus:border-purple-600 text-white px-3 py-3 text-sm outline-none resize-none" rows={4} placeholder="e.g. Bitcoin king on golden throne, cyberpunk neon city, ultra detailed..." value={prompt} onChange={e => setPrompt(e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['Cyberpunk', 'Surreal', 'Abstract', 'Noir', 'Sci-Fi', 'Dark'].map(s => (
              <button key={s} onClick={() => setPrompt(prev => prev + `, ${s.toLowerCase()} style`)} className="border border-slate-700 text-slate-500 text-[10px] py-1.5 hover:border-purple-700 hover:text-purple-400 transition-all">{s}</button>
            ))}
          </div>
          <button onClick={generate} disabled={generating || !prompt.trim()} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-800 text-white font-black py-4 text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2">
            {generating ? <><Cpu className="h-4 w-4 animate-spin" /> Generating...</> : <><Zap className="h-4 w-4" /> GENERATE ART</>}
          </button>
          {generating && (
            <div className="aspect-square bg-slate-900 border border-purple-800 flex items-center justify-center">
              <div className="text-center">
                <Cpu className="h-12 w-12 text-purple-500 animate-spin mx-auto mb-3" />
                <div className="text-xs text-purple-400 font-bold">Hope AI is creating your artwork...</div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'my-art' && (
        <div className="text-center py-12 text-slate-600">
          <Image className="h-12 w-12 mx-auto mb-3" />
          <div className="text-sm">No artwork yet. Generate your first piece!</div>
          <button onClick={() => setTab('generate')} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-6 py-2 transition-all">GENERATE ART</button>
        </div>
      )}
    </div>
  );
}
