import React, { useState } from 'react';
import { Globe, DollarSign, Zap, ArrowRight, Clock, CheckCircle, TrendingDown, Shield } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const CORRIDORS = [
  { from: 'US', to: 'Mexico', flag: '🇺🇸→🇲🇽', rate: '17.82 MXN', fee: '0.1%', time: 'Instant', method: 'USDT→MXN', savings: '94%' },
  { from: 'US', to: 'Philippines', flag: '🇺🇸→🇵🇭', rate: '57.4 PHP', fee: '0.1%', time: 'Instant', method: 'USDT→PHP', savings: '92%' },
  { from: 'US', to: 'India', flag: '🇺🇸→🇮🇳', rate: '83.2 INR', fee: '0.1%', time: 'Instant', method: 'USDT→INR', savings: '96%' },
  { from: 'US', to: 'Nigeria', flag: '🇺🇸→🇳🇬', rate: '1,580 NGN', fee: '0.15%', time: '< 1 min', method: 'BTC→NGN', savings: '88%' },
  { from: 'UK', to: 'Ghana', flag: '🇬🇧→🇬🇭', rate: '15.8 GHS', fee: '0.12%', time: '< 1 min', method: 'ETH→GHS', savings: '91%' },
];

export default function GlobalRemittanceHub() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [amount, setAmount] = useState('500');
  const [corridor, setCorridor] = useState(CORRIDORS[0]);
  const [sent, setSent] = useState(false);

  const received = (parseFloat(amount) * parseFloat(corridor.rate.split(' ')[0])).toFixed(2);
  const fee = (parseFloat(amount) * 0.001).toFixed(2);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Globe className="h-6 w-6 text-blue-500" /> GLOBAL_REMITTANCE</h1>
          <p className="text-slate-500 text-xs mt-1">Send money worldwide via crypto · 90%+ cheaper than banks · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-blue-400">180+</div><div className="text-[10px] text-slate-500">Countries</div></div>
          <div><div className="text-xl font-black text-green-400">0.1%</div><div className="text-[10px] text-slate-500">Avg Fee</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-2">Select Corridor</label>
            <div className="space-y-2">
              {CORRIDORS.map(c => (
                <button key={c.flag} onClick={() => setCorridor(c)} className={`w-full flex items-center justify-between p-3 border transition-all ${corridor.flag === c.flag ? 'border-blue-600 bg-blue-950/20' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{c.flag}</span>
                    <div className="text-left">
                      <div className="text-xs font-bold">{c.from} → {c.to}</div>
                      <div className="text-[10px] text-slate-500">{c.method}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-green-400">{c.savings} cheaper</div>
                    <div className="text-[10px] text-slate-500">{c.time}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">Send Money</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">You Send (USD)</label>
                <input className="w-full bg-slate-800 border border-slate-700 focus:border-blue-600 text-white px-3 py-3 text-lg font-black outline-none" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <div className="flex items-center justify-center"><ArrowRight className="h-5 w-5 text-slate-600" /></div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">They Receive ({corridor.rate.split(' ')[1]})</label>
                <div className="bg-slate-800 border border-slate-700 px-3 py-3 text-lg font-black text-green-400">{parseFloat(received).toLocaleString()}</div>
              </div>
            </div>

            <div className="mt-4 bg-slate-800 p-3 space-y-1 text-[10px]">
              <div className="flex justify-between"><span className="text-slate-500">Exchange Rate</span><span className="text-white">{corridor.rate}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Fee ({corridor.fee})</span><span className="text-white">${fee}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Delivery Time</span><span className="text-green-400">{corridor.time}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">vs Bank Transfer</span><span className="text-green-400">Save {corridor.savings}</span></div>
            </div>

            {!sent ? (
              <button onClick={() => setSent(true)} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                <Zap className="h-4 w-4" /> SEND NOW
              </button>
            ) : (
              <div className="mt-4 bg-green-950/30 border border-green-800 p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-sm font-black text-green-400">TRANSFER SENT!</div>
                <div className="text-[10px] text-slate-400 mt-1">Arriving in {corridor.time}</div>
                <button onClick={() => setSent(false)} className="mt-2 text-[10px] text-blue-400 hover:text-blue-300">Send another →</button>
              </div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4">
            <div className="flex items-center gap-2 mb-2"><TrendingDown className="h-4 w-4 text-green-500" /><span className="text-xs font-bold text-green-400">vs Traditional Banks</span></div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-red-950/20 border border-red-900 p-2 text-center"><div className="font-black text-red-400">$24.99</div><div className="text-[9px] text-slate-500">Bank Wire Fee</div></div>
              <div className="bg-green-950/20 border border-green-800 p-2 text-center"><div className="font-black text-green-400">${fee}</div><div className="text-[9px] text-slate-500">Our Fee</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
