import React, { useState } from 'react';
import { CreditCard, DollarSign, TrendingDown, CheckCircle, AlertTriangle, Zap, RefreshCw, X, Plus } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const SUBS = [
  { id: 1, name: 'SKY444 Pro', cost: '$29.99/mo', crypto: '0.01 ETH', category: 'Platform', status: 'ACTIVE', nextBill: 'Jun 1', savings: null },
  { id: 2, name: 'VPN Premium', cost: '$9.99/mo', crypto: '0.003 ETH', category: 'Security', status: 'ACTIVE', nextBill: 'Jun 5', savings: null },
  { id: 3, name: 'AI Trading Signals', cost: '$49.99/mo', crypto: '0.017 ETH', category: 'Trading', status: 'ACTIVE', nextBill: 'Jun 8', savings: '$20/mo vs annual' },
  { id: 4, name: 'Cloud Storage 2TB', cost: '$9.99/mo', crypto: '0.003 ETH', category: 'Storage', status: 'PAUSED', nextBill: 'Paused', savings: null },
  { id: 5, name: 'Crypto Tax Software', cost: '$19.99/mo', crypto: '0.007 ETH', category: 'Finance', status: 'ACTIVE', nextBill: 'Jun 15', savings: '$10/mo vs annual' },
];

export default function SovereignSubscriptionManager() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [subs, setSubs] = useState(SUBS);
  const total = subs.filter(s => s.status === 'ACTIVE').reduce((a, s) => a + parseFloat(s.cost.replace('$', '').replace('/mo', '')), 0);

  const toggle = (id: number) => setSubs(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : s));
  const cancel = (id: number) => setSubs(prev => prev.filter(s => s.id !== id));

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><CreditCard className="h-6 w-6 text-blue-500" /> SUBSCRIPTION_MANAGER</h1>
          <p className="text-slate-500 text-xs mt-1">Track & manage all subscriptions · Pay in crypto · Wave 20</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-red-400">${total.toFixed(2)}/mo</div>
          <div className="text-[10px] text-slate-500">Total Monthly Cost</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-4 text-center">
          <div className="text-2xl font-black text-blue-400">{subs.filter(s => s.status === 'ACTIVE').length}</div>
          <div className="text-xs text-slate-500">Active</div>
        </div>
        <div className="bg-red-950/20 border border-red-900 p-4 text-center">
          <div className="text-2xl font-black text-red-400">${total.toFixed(2)}</div>
          <div className="text-xs text-slate-500">Monthly Spend</div>
        </div>
        <div className="bg-green-950/20 border border-green-800 p-4 text-center">
          <div className="text-2xl font-black text-green-400">$30/mo</div>
          <div className="text-xs text-slate-500">Potential Savings</div>
        </div>
      </div>

      <div className="space-y-2">
        {subs.map(sub => (
          <div key={sub.id} className={`flex items-center justify-between border p-4 transition-all ${sub.status === 'PAUSED' ? 'border-slate-800 bg-slate-900 opacity-60' : 'border-slate-800 bg-slate-900'}`}>
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${sub.status === 'ACTIVE' ? 'bg-green-500' : 'bg-slate-600'}`} />
              <div>
                <div className="text-sm font-bold">{sub.name}</div>
                <div className="text-[10px] text-slate-500">{sub.category} · Next: {sub.nextBill}</div>
                {sub.savings && <div className="text-[9px] text-amber-400">💡 Save {sub.savings}</div>}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs font-bold text-red-400">{sub.cost}</div>
                <div className="text-[9px] text-slate-500">{sub.crypto}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => toggle(sub.id)} className={`text-[10px] font-bold px-3 py-1.5 border transition-all ${sub.status === 'ACTIVE' ? 'border-yellow-800 text-yellow-400 hover:bg-yellow-950/30' : 'border-green-800 text-green-400 hover:bg-green-950/30'}`}>
                  {sub.status === 'ACTIVE' ? 'PAUSE' : 'RESUME'}
                </button>
                <button onClick={() => cancel(sub.id)} className="text-[10px] font-bold px-2 py-1.5 border border-red-900 text-red-400 hover:bg-red-950/30 transition-all"><X className="h-3 w-3" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 flex items-center gap-2 border border-blue-800 text-blue-400 text-xs font-bold px-4 py-2 hover:bg-blue-950/30 transition-all">
        <Plus className="h-3 w-3" /> Add Subscription
      </button>
    </div>
  );
}
