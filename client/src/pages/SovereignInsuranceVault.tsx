import React, { useState } from 'react';
import { Shield, DollarSign, CheckCircle, AlertTriangle, FileText, Zap, Lock, TrendingUp } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const POLICIES = [
  { id: 1, type: 'Crypto Wallet Insurance', coverage: '$50,000', premium: '$9.99/mo', status: 'ACTIVE', deductible: '$500', provider: 'SKY444 Protect' },
  { id: 2, type: 'Smart Contract Coverage', coverage: '$25,000', premium: '$19.99/mo', status: 'ACTIVE', deductible: '$1,000', provider: 'DeFi Shield' },
  { id: 3, type: 'Exchange Hack Coverage', coverage: '$100,000', premium: '$29.99/mo', status: 'INACTIVE', deductible: '$2,500', provider: 'CryptoGuard' },
];

const AVAILABLE = [
  { type: 'Rug Pull Protection', coverage: 'Up to $10K', from: '$4.99/mo', desc: 'Covers losses from DeFi rug pulls' },
  { type: 'NFT Theft Coverage', coverage: 'Up to $50K', from: '$14.99/mo', desc: 'Covers stolen or lost NFTs' },
  { type: 'Seed Phrase Loss', coverage: 'Up to $25K', from: '$9.99/mo', desc: 'Recovery assistance for lost keys' },
  { type: 'Phishing Attack', coverage: 'Up to $20K', from: '$7.99/mo', desc: 'Covers phishing-related losses' },
];

export default function SovereignInsuranceVault() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'policies' | 'claims' | 'shop'>('policies');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Shield className="h-6 w-6 text-blue-500" /> CRYPTO_INSURANCE</h1>
          <p className="text-slate-500 text-xs mt-1">Decentralized crypto insurance · Wave 19 Mock</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-blue-400">$75K</div><div className="text-[10px] text-slate-500">Total Coverage</div></div>
          <div><div className="text-xl font-black text-green-400">$29.98</div><div className="text-[10px] text-slate-500">Monthly Premium</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['policies', 'claims', 'shop'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'policies' && (
        <div className="space-y-3">
          {POLICIES.map(p => (
            <div key={p.id} className={`border p-4 ${p.status === 'ACTIVE' ? 'border-slate-800 bg-slate-900' : 'border-slate-800 bg-slate-900 opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-black">{p.type}</div>
                <span className={`text-[9px] font-black px-2 py-0.5 border ${p.status === 'ACTIVE' ? 'border-green-800 text-green-400' : 'border-slate-700 text-slate-500'}`}>{p.status}</span>
              </div>
              <div className="grid grid-cols-4 gap-3 text-xs">
                <div><div className="text-slate-500 text-[9px]">Coverage</div><div className="font-bold text-blue-400">{p.coverage}</div></div>
                <div><div className="text-slate-500 text-[9px]">Premium</div><div className="font-bold text-amber-400">{p.premium}</div></div>
                <div><div className="text-slate-500 text-[9px]">Deductible</div><div className="font-bold">{p.deductible}</div></div>
                <div><div className="text-slate-500 text-[9px]">Provider</div><div className="font-bold text-slate-300">{p.provider}</div></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'claims' && (
        <div className="text-center py-12">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <div className="text-lg font-black text-green-400">No Active Claims</div>
          <div className="text-slate-500 text-sm mt-1">Your coverage is clean. File a claim if you experience a covered loss.</div>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 transition-all">FILE A CLAIM</button>
        </div>
      )}

      {tab === 'shop' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AVAILABLE.map(a => (
            <div key={a.type} className="bg-slate-900 border border-slate-800 hover:border-blue-800 p-4 transition-all">
              <div className="text-sm font-black mb-1">{a.type}</div>
              <div className="text-[10px] text-slate-500 mb-3">{a.desc}</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-blue-400">{a.coverage}</div>
                  <div className="text-[10px] text-slate-500">from {a.from}</div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 transition-all">GET COVERED</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
