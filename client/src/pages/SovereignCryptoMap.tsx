import React, { useState } from 'react';
import { Globe, MapPin, DollarSign, TrendingUp, Users, Search, Star, CheckCircle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const BUSINESSES = [
  { id: 1, name: 'Sky Coffee Chicago', type: 'Coffee', accepts: ['BTC', 'ETH', 'SKY444'], location: 'Chicago, IL', rating: 4.8, distance: '0.3 mi', discount: '5% crypto discount' },
  { id: 2, name: 'Crypto Burger Bar', type: 'Restaurant', accepts: ['BTC', 'USDT'], location: 'Chicago, IL', rating: 4.6, distance: '0.7 mi', discount: null },
  { id: 3, name: 'SkyBlue IT Services', type: 'Tech', accepts: ['BTC', 'ETH', 'SKY444', 'USDT'], location: 'Chicago, IL', rating: 5.0, distance: '1.2 mi', discount: '10% crypto discount' },
  { id: 4, name: 'Sovereign Gym', type: 'Fitness', accepts: ['BTC', 'SKY444'], location: 'Chicago, IL', rating: 4.7, distance: '1.8 mi', discount: 'Free month for SKY444 holders' },
  { id: 5, name: 'Anonymous Barber', type: 'Services', accepts: ['BTC', 'XMR'], location: 'Chicago, IL', rating: 4.9, distance: '2.1 mi', discount: null },
];

const COUNTRIES = [
  { country: 'El Salvador', flag: '🇸🇻', status: 'Legal Tender', businesses: '8,420', adoption: 95 },
  { country: 'Switzerland', flag: '🇨🇭', status: 'Regulated', businesses: '12,847', adoption: 78 },
  { country: 'UAE', flag: '🇦🇪', status: 'Friendly', businesses: '9,201', adoption: 72 },
  { country: 'USA', flag: '🇺🇸', status: 'Regulated', businesses: '84,201', adoption: 45 },
  { country: 'Germany', flag: '🇩🇪', status: 'Regulated', businesses: '24,847', adoption: 62 },
];

export default function SovereignCryptoMap() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'nearby' | 'global' | 'add'>('nearby');
  const [search, setSearch] = useState('');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Globe className="h-6 w-6 text-blue-500" /> CRYPTO_MAP</h1>
          <p className="text-slate-500 text-xs mt-1">Find crypto-accepting businesses worldwide · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-blue-400">140K+</div><div className="text-[10px] text-slate-500">Businesses</div></div>
          <div><div className="text-xl font-black text-green-400">180+</div><div className="text-[10px] text-slate-500">Countries</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['nearby', 'global', 'add'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'nearby' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3">
            <Search className="h-4 w-4 text-slate-500" />
            <input className="flex-1 bg-transparent py-2 text-sm outline-none placeholder-slate-600" placeholder="Search businesses..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {BUSINESSES.filter(b => b.name.toLowerCase().includes(search.toLowerCase())).map(b => (
            <div key={b.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 hover:border-blue-700 p-4 transition-all">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm font-bold">{b.name}</div>
                  <div className="text-[10px] text-slate-500">{b.type} · {b.distance} · {b.location}</div>
                  <div className="flex gap-1 mt-1">{b.accepts.map(a => <span key={a} className="text-[8px] border border-slate-700 text-slate-500 px-1 py-0.5">{a}</span>)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-[10px] text-yellow-400 justify-end mb-1"><Star className="h-3 w-3 fill-yellow-400" />{b.rating}</div>
                {b.discount && <div className="text-[9px] text-green-400 border border-green-800 px-1.5 py-0.5">{b.discount}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'global' && (
        <div className="space-y-2">
          {COUNTRIES.map(c => (
            <div key={c.country} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.flag}</span>
                <div>
                  <div className="text-sm font-bold">{c.country}</div>
                  <div className="text-[10px] text-slate-500">{c.businesses} businesses · {c.status}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24">
                  <div className="flex justify-between text-[9px] mb-0.5"><span className="text-slate-500">Adoption</span><span className="text-blue-400">{c.adoption}%</span></div>
                  <div className="bg-slate-800 h-1.5"><div className="h-full bg-blue-500" style={{width:`${c.adoption}%`}} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'add' && (
        <div className="max-w-md space-y-4">
          <h3 className="text-sm font-bold text-slate-400">Add a Crypto-Accepting Business</h3>
          {[
            { label: 'Business Name', placeholder: 'My Coffee Shop' },
            { label: 'Address', placeholder: '123 Main St, Chicago, IL' },
            { label: 'Business Type', placeholder: 'Restaurant, Retail, Services...' },
            { label: 'Website', placeholder: 'https://...' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">{f.label}</label>
              <input className="w-full bg-slate-900 border border-slate-700 focus:border-blue-600 text-white px-3 py-2 text-sm outline-none" placeholder={f.placeholder} />
            </div>
          ))}
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Accepted Cryptocurrencies</label>
            <div className="flex flex-wrap gap-2">
              {['BTC', 'ETH', 'USDT', 'SOL', 'SKY444', 'XMR', 'BNB'].map(c => (
                <button key={c} className="border border-slate-700 text-slate-500 text-[10px] px-2 py-1 hover:border-blue-700 hover:text-blue-400 transition-all">{c}</button>
              ))}
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 text-xs uppercase transition-all">SUBMIT BUSINESS</button>
        </div>
      )}
    </div>
  );
}
