import React, { useState } from 'react';
import { Building2, DollarSign, TrendingUp, Users, MapPin, Star, Lock, Zap, CheckCircle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const PROPERTIES = [
  { id: 1, name: 'Sky Tower Chicago', type: 'Commercial', location: 'Chicago, IL', value: '$4.2M', tokenPrice: '$420', yield: '8.4%', funded: 78, investors: 284, tokens: 10000, available: 2200, img: '🏢' },
  { id: 2, name: 'Miami Beach Condo', type: 'Residential', location: 'Miami, FL', value: '$1.8M', tokenPrice: '$180', yield: '6.2%', funded: 45, investors: 127, tokens: 10000, available: 5500, img: '🏖️' },
  { id: 3, name: 'NYC Office Complex', type: 'Commercial', location: 'New York, NY', value: '$12.4M', tokenPrice: '$1,240', yield: '9.1%', funded: 92, investors: 847, tokens: 10000, available: 800, img: '🏙️' },
  { id: 4, name: 'Austin Tech Campus', type: 'Industrial', location: 'Austin, TX', value: '$6.8M', tokenPrice: '$680', yield: '11.2%', funded: 34, investors: 89, tokens: 10000, available: 6600, img: '🏗️' },
];

export default function RealEstateTokenHub() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [selected, setSelected] = useState<number | null>(null);
  const [investAmount, setInvestAmount] = useState('');
  const [tab, setTab] = useState<'listings' | 'portfolio' | 'income'>('listings');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Building2 className="h-6 w-6 text-amber-500" /> REAL_ESTATE_TOKENS</h1>
          <p className="text-slate-500 text-xs mt-1">Fractional real estate investing · On-chain ownership · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-amber-400">$24.2M</div><div className="text-[10px] text-slate-500">Total Listed</div></div>
          <div><div className="text-xl font-black text-green-400">8.7%</div><div className="text-[10px] text-slate-500">Avg Yield</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['listings', 'portfolio', 'income'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'listings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROPERTIES.map(p => (
            <div key={p.id} className={`border p-4 transition-all cursor-pointer ${selected === p.id ? 'border-amber-600 bg-amber-950/20' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`} onClick={() => setSelected(selected === p.id ? null : p.id)}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{p.img}</div>
                  <div>
                    <div className="text-sm font-black">{p.name}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</div>
                  </div>
                </div>
                <span className="text-[9px] border border-amber-800 text-amber-400 px-1.5 py-0.5 font-bold">{p.type}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                <div className="bg-slate-800 p-2 text-center"><div className="font-black text-amber-400">{p.value}</div><div className="text-[9px] text-slate-500">Value</div></div>
                <div className="bg-slate-800 p-2 text-center"><div className="font-black text-green-400">{p.yield}</div><div className="text-[9px] text-slate-500">Yield</div></div>
                <div className="bg-slate-800 p-2 text-center"><div className="font-black text-blue-400">{p.tokenPrice}</div><div className="text-[9px] text-slate-500">/Token</div></div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-[10px] mb-1"><span className="text-slate-500">Funded</span><span className="text-white">{p.funded}%</span></div>
                <div className="bg-slate-800 h-2"><div className="h-full bg-amber-500" style={{width:`${p.funded}%`}} /></div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-3">
                <span><Users className="h-3 w-3 inline mr-1" />{p.investors} investors</span>
                <span>{p.available.toLocaleString()} tokens left</span>
              </div>
              {selected === p.id && (
                <div className="mt-3 space-y-2 border-t border-slate-700 pt-3">
                  <input className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm outline-none focus:border-amber-600" placeholder={`Min 1 token (${p.tokenPrice})`} value={investAmount} onChange={e => setInvestAmount(e.target.value)} />
                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-2 text-xs uppercase transition-all">INVEST NOW</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'portfolio' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-900 border border-slate-800 p-4 text-center"><div className="text-2xl font-black text-amber-400">$24,800</div><div className="text-xs text-slate-500">Portfolio Value</div></div>
            <div className="bg-slate-900 border border-slate-800 p-4 text-center"><div className="text-2xl font-black text-green-400">$2,040</div><div className="text-xs text-slate-500">Annual Income</div></div>
            <div className="bg-slate-900 border border-slate-800 p-4 text-center"><div className="text-2xl font-black text-blue-400">3</div><div className="text-xs text-slate-500">Properties</div></div>
          </div>
          {PROPERTIES.slice(0, 3).map(p => (
            <div key={p.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <div className="flex items-center gap-2"><span className="text-xl">{p.img}</span><div><div className="text-xs font-bold">{p.name}</div><div className="text-[10px] text-slate-500">{p.location}</div></div></div>
              <div className="flex gap-4 text-xs text-right">
                <div><div className="font-bold text-amber-400">${(Math.random() * 10000 + 2000 | 0).toLocaleString()}</div><div className="text-[9px] text-slate-500">Value</div></div>
                <div><div className="font-bold text-green-400">{p.yield}</div><div className="text-[9px] text-slate-500">Yield</div></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'income' && (
        <div className="space-y-3">
          {[
            { month: 'May 2026', amount: '$170', properties: 3, status: 'PAID' },
            { month: 'Apr 2026', amount: '$165', properties: 3, status: 'PAID' },
            { month: 'Mar 2026', amount: '$158', properties: 2, status: 'PAID' },
          ].map(i => (
            <div key={i.month} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <div><div className="text-xs font-bold">{i.month}</div><div className="text-[10px] text-slate-500">{i.properties} properties</div></div>
              <div className="flex items-center gap-3"><span className="text-sm font-black text-green-400">{i.amount}</span><span className="text-[9px] text-green-400 border border-green-800 px-2 py-0.5 font-bold">{i.status}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
