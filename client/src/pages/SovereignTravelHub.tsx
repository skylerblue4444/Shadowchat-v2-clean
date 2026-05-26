import React, { useState } from 'react';
import { Globe, MapPin, Plane, Hotel, DollarSign, Star, Clock, Shield, Zap, CheckCircle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const DESTINATIONS = [
  { city: 'Dubai', country: 'UAE', flag: '🇦🇪', crypto: 'Very Friendly', tax: '0%', cost: '$$$', vibe: 'Luxury', highlight: 'Tax-free crypto gains' },
  { city: 'Lisbon', country: 'Portugal', flag: '🇵🇹', crypto: 'Friendly', tax: '0%*', cost: '$$', vibe: 'Digital Nomad', highlight: 'NHR tax regime' },
  { city: 'Singapore', country: 'SG', flag: '🇸🇬', crypto: 'Friendly', tax: '0%', cost: '$$$', vibe: 'Finance Hub', highlight: 'No capital gains tax' },
  { city: 'El Salvador', country: 'SV', flag: '🇸🇻', crypto: 'Legal Tender', tax: '0%', cost: '$', vibe: 'Bitcoin Beach', highlight: 'BTC is legal currency' },
  { city: 'Zug', country: 'Switzerland', flag: '🇨🇭', crypto: 'Friendly', tax: 'Low', cost: '$$$$', vibe: 'Crypto Valley', highlight: 'Home of Ethereum' },
  { city: 'Miami', country: 'US', flag: '🇺🇸', crypto: 'Growing', tax: 'State 0%', cost: '$$$', vibe: 'Crypto Hub', highlight: 'No state income tax' },
];

const HOTELS = [
  { name: 'Sky Tower Suites Dubai', location: 'Dubai, UAE', price: '0.05 ETH/night', rating: 4.9, accepts: ['BTC', 'ETH', 'USDT'] },
  { name: 'Crypto Nomad Lisbon', location: 'Lisbon, Portugal', price: '0.01 ETH/night', rating: 4.7, accepts: ['BTC', 'ETH', 'SKY444'] },
  { name: 'Sovereign Hotel Singapore', location: 'Singapore', price: '0.04 ETH/night', rating: 4.8, accepts: ['BTC', 'ETH', 'USDT'] },
];

export default function SovereignTravelHub() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'destinations' | 'hotels' | 'flights'>('destinations');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Globe className="h-6 w-6 text-blue-500" /> TRAVEL_HUB</h1>
          <p className="text-slate-500 text-xs mt-1">Crypto-friendly travel · Pay with BTC/ETH · Tax optimization · Wave 20</p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['destinations', 'hotels', 'flights'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'destinations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DESTINATIONS.map(d => (
            <div key={d.city} className="bg-slate-900 border border-slate-800 hover:border-blue-700 p-4 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{d.flag}</span>
                <div>
                  <div className="text-sm font-black">{d.city}</div>
                  <div className="text-[10px] text-slate-500">{d.country}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="bg-slate-800 p-2"><div className="text-[9px] text-slate-500">Crypto</div><div className="font-bold text-green-400">{d.crypto}</div></div>
                <div className="bg-slate-800 p-2"><div className="text-[9px] text-slate-500">Tax</div><div className="font-bold text-green-400">{d.tax}</div></div>
                <div className="bg-slate-800 p-2"><div className="text-[9px] text-slate-500">Cost</div><div className="font-bold text-white">{d.cost}</div></div>
                <div className="bg-slate-800 p-2"><div className="text-[9px] text-slate-500">Vibe</div><div className="font-bold text-blue-400">{d.vibe}</div></div>
              </div>
              <div className="text-[10px] text-amber-400 bg-amber-950/20 border border-amber-900 px-2 py-1">💡 {d.highlight}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'hotels' && (
        <div className="space-y-3">
          {HOTELS.map(h => (
            <div key={h.name} className="flex items-center justify-between bg-slate-900 border border-slate-800 hover:border-blue-700 p-4 transition-all">
              <div className="flex items-center gap-3">
                <Hotel className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-sm font-bold">{h.name}</div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1"><MapPin className="h-3 w-3" />{h.location}</div>
                  <div className="flex gap-1 mt-1">{h.accepts.map(a => <span key={a} className="text-[8px] border border-slate-700 text-slate-500 px-1 py-0.5">{a}</span>)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-blue-400">{h.price}</div>
                <div className="flex items-center gap-1 text-[10px] text-yellow-400 justify-end"><Star className="h-3 w-3 fill-yellow-400" />{h.rating}</div>
                <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-1.5 transition-all">BOOK</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'flights' && (
        <div className="bg-slate-900 border border-slate-800 p-8 text-center">
          <Plane className="h-12 w-12 text-blue-500 mx-auto mb-3" />
          <div className="text-lg font-black mb-2">Flight Search</div>
          <p className="text-slate-500 text-sm mb-4">Search and book flights with crypto payments</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-lg mx-auto mb-4">
            <input className="bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm outline-none" placeholder="From (e.g. ORD)" />
            <input className="bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm outline-none" placeholder="To (e.g. DXB)" />
            <input className="bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm outline-none" placeholder="Date" />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-3 text-sm transition-all flex items-center gap-2 mx-auto"><Zap className="h-4 w-4" /> SEARCH FLIGHTS</button>
        </div>
      )}
    </div>
  );
}
