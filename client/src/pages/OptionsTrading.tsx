import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign, Zap, BarChart3, Clock, AlertTriangle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const CHAIN = [
  { strike: 44000, calls: { bid: 3240, ask: 3280, iv: 68, delta: 0.82, oi: 1204 }, puts: { bid: 180, ask: 195, iv: 71, delta: -0.18, oi: 892 } },
  { strike: 46000, calls: { bid: 1840, ask: 1870, iv: 65, delta: 0.64, oi: 3847 }, puts: { bid: 620, ask: 640, iv: 67, delta: -0.36, oi: 2103 } },
  { strike: 47000, calls: { bid: 1240, ask: 1260, iv: 63, delta: 0.54, oi: 8420 }, puts: { bid: 980, ask: 1000, iv: 64, delta: -0.46, oi: 6201 }, atm: true },
  { strike: 48000, calls: { bid: 780, ask: 800, iv: 62, delta: 0.42, oi: 4103 }, puts: { bid: 1480, ask: 1510, iv: 65, delta: -0.58, oi: 3847 } },
  { strike: 50000, calls: { bid: 320, ask: 335, iv: 64, delta: 0.28, oi: 2847 }, puts: { bid: 2840, ask: 2880, iv: 68, delta: -0.72, oi: 1204 } },
];

export default function OptionsTrading() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [selected, setSelected] = useState<any>(null);
  const [orderType, setOrderType] = useState<'call' | 'put'>('call');
  const [qty, setQty] = useState('1');
  const [expiry, setExpiry] = useState('Jun 27');
  const [btcPrice] = useState(47200);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-4 font-sans">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-black flex items-center gap-2"><Activity className="h-5 w-5 text-green-500" /> OPTIONS_TERMINAL</h1>
          <p className="text-slate-500 text-xs">BTC Options · Wave 20 · Mock Data</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-black text-white">${btcPrice.toLocaleString()}</div>
            <div className="text-[10px] text-green-400">BTC/USD · +3.2%</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-black text-amber-400">63%</div>
            <div className="text-[10px] text-slate-500">IV Index</div>
          </div>
        </div>
      </div>

      {/* Expiry Selector */}
      <div className="flex gap-2 mb-4">
        {['Jun 27', 'Jul 4', 'Jul 25', 'Sep 26'].map(e => (
          <button key={e} onClick={() => setExpiry(e)} className={`px-3 py-1.5 text-xs font-bold border transition-all ${expiry === e ? 'border-green-600 text-green-400 bg-green-950/30' : 'border-slate-700 text-slate-500'}`}>{e}</button>
        ))}
      </div>

      {/* Options Chain */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[10px] text-slate-500 border-b border-slate-800">
              <th className="text-left py-2 px-2">CALL BID</th>
              <th className="text-left py-2 px-2">CALL ASK</th>
              <th className="text-left py-2 px-2">CALL IV</th>
              <th className="text-left py-2 px-2">CALL Δ</th>
              <th className="text-center py-2 px-4 text-white font-bold">STRIKE</th>
              <th className="text-right py-2 px-2">PUT Δ</th>
              <th className="text-right py-2 px-2">PUT IV</th>
              <th className="text-right py-2 px-2">PUT BID</th>
              <th className="text-right py-2 px-2">PUT ASK</th>
            </tr>
          </thead>
          <tbody>
            {CHAIN.map(row => (
              <tr key={row.strike} className={`border-b border-slate-900 hover:bg-slate-900 cursor-pointer ${row.atm ? 'bg-amber-950/20' : ''}`}
                onClick={() => setSelected(row)}>
                <td className="py-2 px-2 text-green-400 font-bold">{row.calls.bid.toLocaleString()}</td>
                <td className="py-2 px-2 text-green-300">{row.calls.ask.toLocaleString()}</td>
                <td className="py-2 px-2 text-slate-400">{row.calls.iv}%</td>
                <td className="py-2 px-2 text-blue-400">{row.calls.delta}</td>
                <td className={`py-2 px-4 text-center font-black ${row.atm ? 'text-amber-400' : 'text-white'}`}>${row.strike.toLocaleString()}{row.atm ? ' ◆' : ''}</td>
                <td className="py-2 px-2 text-right text-red-400">{row.puts.delta}</td>
                <td className="py-2 px-2 text-right text-slate-400">{row.puts.iv}%</td>
                <td className="py-2 px-2 text-right text-red-400 font-bold">{row.puts.bid.toLocaleString()}</td>
                <td className="py-2 px-2 text-right text-red-300">{row.puts.ask.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Panel */}
      {selected && (
        <div className="bg-slate-900 border border-slate-700 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Place Order — ${selected.strike.toLocaleString()} Strike · {expiry}</h3>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setOrderType('call')} className={`flex-1 py-2 font-black text-xs transition-all ${orderType === 'call' ? 'bg-green-600 text-white' : 'border border-slate-700 text-slate-500'}`}>CALL</button>
              <button onClick={() => setOrderType('put')} className={`flex-1 py-2 font-black text-xs transition-all ${orderType === 'put' ? 'bg-red-600 text-white' : 'border border-slate-700 text-slate-500'}`}>PUT</button>
            </div>
            <div className="space-y-2">
              <div><label className="text-[10px] text-slate-500 block mb-1">Contracts</label>
                <input className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm outline-none" value={qty} onChange={e => setQty(e.target.value)} /></div>
              <div className="bg-slate-800 p-3 text-[10px] space-y-1">
                <div className="flex justify-between"><span className="text-slate-500">Premium</span><span className="text-white font-bold">${orderType === 'call' ? selected.calls.ask : selected.puts.ask}/contract</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Total Cost</span><span className="text-amber-400 font-bold">${((orderType === 'call' ? selected.calls.ask : selected.puts.ask) * parseInt(qty || '1')).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Max Loss</span><span className="text-red-400 font-bold">Premium paid</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Delta</span><span className="text-blue-400 font-bold">{orderType === 'call' ? selected.calls.delta : selected.puts.delta}</span></div>
              </div>
              <button className={`w-full py-3 font-black text-xs uppercase tracking-widest transition-all ${orderType === 'call' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}>
                BUY {orderType.toUpperCase()}
              </button>
            </div>
          </div>
          <div className="bg-slate-800 p-4">
            <h3 className="text-[10px] text-slate-500 uppercase mb-3">Greeks</h3>
            {[
              { label: 'Delta (Δ)', value: orderType === 'call' ? selected.calls.delta : selected.puts.delta },
              { label: 'IV', value: `${orderType === 'call' ? selected.calls.iv : selected.puts.iv}%` },
              { label: 'Open Interest', value: (orderType === 'call' ? selected.calls.oi : selected.puts.oi).toLocaleString() },
              { label: 'Expiry', value: expiry },
            ].map(g => (
              <div key={g.label} className="flex justify-between py-1.5 border-b border-slate-700 last:border-0 text-xs">
                <span className="text-slate-500">{g.label}</span>
                <span className="font-bold text-white">{g.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
