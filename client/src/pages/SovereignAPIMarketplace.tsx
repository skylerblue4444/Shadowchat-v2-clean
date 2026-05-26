import React, { useState } from 'react';
import { Code2, Zap, DollarSign, Star, Users, Copy, CheckCircle, Globe, Shield, Key } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const APIS = [
  { id: 1, name: 'SKY444 Trading API', category: 'Trading', calls: '10M/mo', price: 'FREE', rating: 4.9, users: 12847, desc: 'Real-time crypto prices, order execution, portfolio data' },
  { id: 2, name: 'Hope AI API', category: 'AI', calls: '1M/mo', price: '$49/mo', rating: 4.8, users: 4201, desc: 'AI market analysis, trade signals, sentiment scoring' },
  { id: 3, name: 'Shadow Identity API', category: 'Auth', calls: '5M/mo', price: 'FREE', rating: 4.7, users: 8934, desc: 'Anonymous auth, DID verification, zero-knowledge proofs' },
  { id: 4, name: 'Crypto OTC API', category: 'Trading', calls: '100K/mo', price: '$99/mo', rating: 4.9, users: 892, desc: 'Large-block OTC order matching and escrow' },
  { id: 5, name: 'Protection Monitor API', category: 'Security', calls: '2M/mo', price: '$19/mo', rating: 4.8, users: 3108, desc: 'Threat detection, breach alerts, device monitoring' },
];

export default function SovereignAPIMarketplace() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [copied, setCopied] = useState<number | null>(null);
  const [subscribed, setSubscribed] = useState<number[]>([1]);

  const copy = (id: number) => { setCopied(id); setTimeout(() => setCopied(null), 2000); };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Code2 className="h-6 w-6 text-green-500" /> API_MARKETPLACE</h1>
          <p className="text-slate-500 text-xs mt-1">Developer APIs · SKY444 platform · Wave 19</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-green-400">{APIS.length}</div><div className="text-[10px] text-slate-500">APIs</div></div>
          <div><div className="text-xl font-black text-blue-400">2</div><div className="text-[10px] text-slate-500">Active Keys</div></div>
        </div>
      </div>

      <div className="space-y-4">
        {APIS.map(api => (
          <div key={api.id} className="bg-slate-900 border border-slate-800 hover:border-green-800 p-4 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-black">{api.name}</span>
                  <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{api.category}</span>
                </div>
                <p className="text-[10px] text-slate-500">{api.desc}</p>
              </div>
              <div className="text-right">
                <div className={`text-sm font-black ${api.price === 'FREE' ? 'text-green-400' : 'text-amber-400'}`}>{api.price}</div>
                <div className="text-[10px] text-slate-500">{api.calls}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" /> {api.rating}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {api.users.toLocaleString()} devs</span>
              </div>
              <div className="flex gap-2">
                {subscribed.includes(api.id) && (
                  <button onClick={() => copy(api.id)} className="flex items-center gap-1 border border-slate-700 text-slate-400 hover:text-white text-[10px] font-bold px-3 py-1.5 transition-all">
                    {copied === api.id ? <CheckCircle className="h-3 w-3 text-green-500" /> : <Key className="h-3 w-3" />}
                    {copied === api.id ? 'Copied!' : 'Get Key'}
                  </button>
                )}
                <button
                  onClick={() => setSubscribed(prev => prev.includes(api.id) ? prev.filter(i => i !== api.id) : [...prev, api.id])}
                  className={`text-[10px] font-bold px-3 py-1.5 transition-all ${subscribed.includes(api.id) ? 'border border-green-700 text-green-400' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                  {subscribed.includes(api.id) ? 'SUBSCRIBED ✓' : 'SUBSCRIBE'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
