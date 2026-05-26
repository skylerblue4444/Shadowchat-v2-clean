import React, { useState } from 'react';
import { Image, Zap, Download, Share2, TrendingUp, Star, Copy, CheckCircle, Laugh } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const TEMPLATES = [
  { id: 1, name: 'When BTC Pumps', emoji: '🚀', topText: 'ME AT 3AM', bottomText: 'CHECKING PORTFOLIO', category: 'Trading' },
  { id: 2, name: 'Diamond Hands', emoji: '💎🙌', topText: 'PAPER HANDS:', bottomText: 'SOLD AT $40K', category: 'HODL' },
  { id: 3, name: 'This is Fine', emoji: '🔥', topText: 'MY PORTFOLIO', bottomText: 'DOWN 20%', category: 'Degen' },
  { id: 4, name: 'Distracted Boyfriend', emoji: '👀', topText: 'ME', bottomText: 'NEW ALTCOIN', category: 'Altcoins' },
  { id: 5, name: 'We Are So Back', emoji: '📈', topText: 'BTC BREAKS $50K', bottomText: 'WE ARE SO BACK', category: 'Bullish' },
  { id: 6, name: 'Wen Moon', emoji: '🌙', topText: 'INVESTOR:', bottomText: 'WEN MOON???', category: 'Classic' },
];

export default function SovereignMemeGenerator() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [selected, setSelected] = useState(TEMPLATES[0]);
  const [topText, setTopText] = useState(TEMPLATES[0].topText);
  const [bottomText, setBottomText] = useState(TEMPLATES[0].bottomText);
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const selectTemplate = (t: typeof TEMPLATES[0]) => { setSelected(t); setTopText(t.topText); setBottomText(t.bottomText); };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Laugh className="h-6 w-6 text-yellow-500" /> MEME_GENERATOR</h1>
          <p className="text-slate-500 text-xs mt-1">Create & share crypto memes · Earn SKY444 for viral memes · Wave 20</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase">Templates</h3>
          <div className="grid grid-cols-3 gap-2">
            {TEMPLATES.map(t => (
              <button key={t.id} onClick={() => selectTemplate(t)} className={`border p-3 text-center transition-all ${selected.id === t.id ? 'border-yellow-600 bg-yellow-950/20' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}>
                <div className="text-2xl mb-1">{t.emoji}</div>
                <div className="text-[9px] text-slate-400">{t.name}</div>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">Top Text</label>
              <input className="w-full bg-slate-900 border border-slate-700 focus:border-yellow-600 text-white px-3 py-2 text-sm outline-none uppercase font-black" value={topText} onChange={e => setTopText(e.target.value.toUpperCase())} />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">Bottom Text</label>
              <input className="w-full bg-slate-900 border border-slate-700 focus:border-yellow-600 text-white px-3 py-2 text-sm outline-none uppercase font-black" value={bottomText} onChange={e => setBottomText(e.target.value.toUpperCase())} />
            </div>
            <button onClick={() => setGenerated(true)} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-black py-3 text-sm uppercase transition-all flex items-center justify-center gap-2">
              <Zap className="h-4 w-4" /> GENERATE MEME
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase">Preview</h3>
          <div className="bg-slate-900 border border-slate-800 aspect-square flex flex-col items-center justify-between p-6 relative overflow-hidden">
            <div className="text-center">
              <p className="text-2xl font-black text-white uppercase tracking-wide" style={{textShadow: '2px 2px 0 #000, -2px -2px 0 #000'}}>{topText}</p>
            </div>
            <div className="text-8xl my-4">{selected.emoji}</div>
            <div className="text-center">
              <p className="text-2xl font-black text-white uppercase tracking-wide" style={{textShadow: '2px 2px 0 #000, -2px -2px 0 #000'}}>{bottomText}</p>
            </div>
            {generated && (
              <div className="absolute top-2 right-2 text-[9px] border border-green-700 text-green-400 px-2 py-0.5 bg-slate-950">SKY444 MEME</div>
            )}
          </div>

          {generated && (
            <div className="flex gap-2">
              <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 transition-all flex items-center justify-center gap-1"><Download className="h-3 w-3" /> Download</button>
              <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 transition-all flex items-center justify-center gap-1">
                {copied ? <CheckCircle className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />} {copied ? 'Copied!' : 'Copy'}
              </button>
              <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-bold py-2 transition-all flex items-center justify-center gap-1"><Share2 className="h-3 w-3" /> Share</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
