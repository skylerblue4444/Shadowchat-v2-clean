import React, { useState } from 'react';
import { Bell, TrendingUp, TrendingDown, Zap, Plus, Trash2, CheckCircle, Activity, Settings } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const ALERTS = [
  { id: 1, asset: 'BTC', condition: 'Price Above', value: '$50,000', channel: 'Push + Email', status: 'ACTIVE', triggered: false },
  { id: 2, asset: 'ETH', condition: 'Price Below', value: '$2,500', channel: 'Push', status: 'ACTIVE', triggered: false },
  { id: 3, asset: 'SOL', condition: 'Change > 10%', value: '10% in 1h', channel: 'SMS', status: 'ACTIVE', triggered: true },
  { id: 4, asset: 'SKY444', condition: 'Volume Spike', value: '3x avg volume', channel: 'Push', status: 'PAUSED', triggered: false },
  { id: 5, asset: 'BTC', condition: 'RSI Below', value: '30 (oversold)', channel: 'Push + Email', status: 'ACTIVE', triggered: false },
];

export default function SovereignCryptoAlerts() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [alerts, setAlerts] = useState(ALERTS);
  const [showCreate, setShowCreate] = useState(false);
  const [asset, setAsset] = useState('BTC');
  const [condition, setCondition] = useState('Price Above');
  const [value, setValue] = useState('');

  const deleteAlert = (id: number) => setAlerts(prev => prev.filter(a => a.id !== id));
  const toggleAlert = (id: number) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : a));

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Bell className="h-6 w-6 text-amber-500" /> CRYPTO_ALERTS</h1>
          <p className="text-slate-500 text-xs mt-1">Price, volume & technical alerts · Multi-channel · Wave 20</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 transition-all"><Plus className="h-3 w-3" /> New Alert</button>
      </div>

      {alerts.filter(a => a.triggered).length > 0 && (
        <div className="bg-amber-950/30 border border-amber-800 p-3 mb-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1"><Bell className="h-4 w-4 animate-bounce" /> {alerts.filter(a => a.triggered).length} Alert Triggered!</div>
          {alerts.filter(a => a.triggered).map(a => (
            <div key={a.id} className="text-[10px] text-amber-300">{a.asset}: {a.condition} {a.value}</div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {alerts.map(alert => (
          <div key={alert.id} className={`flex items-center justify-between border p-4 transition-all ${alert.triggered ? 'border-amber-800 bg-amber-950/10' : alert.status === 'PAUSED' ? 'border-slate-800 bg-slate-900 opacity-60' : 'border-slate-800 bg-slate-900'}`}>
            <div className="flex items-center gap-3">
              <div className={`h-8 w-8 bg-amber-900/40 border border-amber-800 flex items-center justify-center font-black text-amber-400 text-xs`}>{alert.asset.slice(0,2)}</div>
              <div>
                <div className="text-xs font-bold">{alert.asset}: {alert.condition} {alert.value}</div>
                <div className="text-[10px] text-slate-500">Via {alert.channel}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {alert.triggered && <span className="text-[9px] border border-amber-700 text-amber-400 px-2 py-0.5 font-bold animate-pulse">TRIGGERED</span>}
              <span className={`text-[9px] font-black px-2 py-0.5 border ${alert.status === 'ACTIVE' ? 'border-green-800 text-green-400' : 'border-slate-700 text-slate-500'}`}>{alert.status}</span>
              <button onClick={() => toggleAlert(alert.id)} className="text-[10px] border border-slate-700 text-slate-400 px-2 py-1 hover:border-slate-500 transition-all">{alert.status === 'ACTIVE' ? 'PAUSE' : 'RESUME'}</button>
              <button onClick={() => deleteAlert(alert.id)} className="p-1.5 border border-red-900 hover:bg-red-950/30 transition-all"><Trash2 className="h-3 w-3 text-red-400" /></button>
            </div>
          </div>
        ))}
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 border border-amber-800 p-6 max-w-sm w-full space-y-4">
            <h2 className="text-lg font-black">Create Alert</h2>
            <div>
              <label className="text-[10px] text-slate-500 block mb-1">Asset</label>
              <select className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm outline-none" value={asset} onChange={e => setAsset(e.target.value)}>
                {['BTC', 'ETH', 'SOL', 'SKY444', 'BNB'].map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-1">Condition</label>
              <select className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm outline-none" value={condition} onChange={e => setCondition(e.target.value)}>
                {['Price Above', 'Price Below', 'Change > 5%', 'Change > 10%', 'Volume Spike', 'RSI Above', 'RSI Below'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-1">Value</label>
              <input className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm outline-none" placeholder="e.g. $50,000" value={value} onChange={e => setValue(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCreate(false)} className="flex-1 border border-slate-700 text-slate-400 py-2 text-xs font-bold">CANCEL</button>
              <button onClick={() => { setAlerts(prev => [...prev, { id: Date.now(), asset, condition, value, channel: 'Push', status: 'ACTIVE', triggered: false }]); setShowCreate(false); }} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 text-xs font-bold">CREATE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
