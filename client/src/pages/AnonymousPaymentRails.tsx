import React, { useState } from 'react';
import { Shield, Eye, EyeOff, ArrowRight, Copy, CheckCircle, Zap, Lock, Globe, DollarSign } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const RAILS = [
  { id: 'monero', name: 'Monero (XMR)', desc: 'Ring signatures · Stealth addresses · Untraceable', icon: '🔒', fee: '0.001 XMR', time: '~2 min', privacy: 'MAX' },
  { id: 'zcash', name: 'Zcash (ZEC)', desc: 'zk-SNARKs shielded transactions', icon: '🛡️', fee: '0.0001 ZEC', time: '~1 min', privacy: 'HIGH' },
  { id: 'lightning', name: 'Lightning Network', desc: 'Off-chain BTC · No on-chain trace', icon: '⚡', fee: '1 sat', time: 'Instant', privacy: 'MED' },
  { id: 'tornado', name: 'Mixer Protocol', desc: 'Smart contract mixing · Break chain analysis', icon: '🌀', fee: '0.1%', time: '~10 min', privacy: 'HIGH' },
  { id: 'sky444', name: 'SKY444 Shadow Rail', desc: 'Proprietary zero-knowledge payment layer', icon: '👁️', fee: '0.05%', time: 'Instant', privacy: 'MAX' },
];

export default function AnonymousPaymentRails() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [selected, setSelected] = useState('sky444');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const mockTxId = '0x4444...shadow...sky444...anon';

  return (
    <div className="bg-black text-white min-h-screen p-6 font-mono">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <Eye className="h-6 w-6 text-purple-500" /> ANON_PAYMENT_RAILS
        </h1>
        <p className="text-slate-600 text-xs mt-1">Zero-knowledge · Untraceable · SKY444 Shadow Mesh · MOCK DEMO</p>
      </div>

      {/* Rail Selection */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-6">
        {RAILS.map(rail => (
          <button
            key={rail.id}
            onClick={() => setSelected(rail.id)}
            className={`p-3 border text-left transition-all ${selected === rail.id ? 'border-purple-600 bg-purple-950/30' : 'border-slate-800 hover:border-slate-600'}`}
          >
            <div className="text-xl mb-1">{rail.icon}</div>
            <div className="text-[10px] font-bold">{rail.name}</div>
            <div className="text-[9px] text-slate-600 mb-2">{rail.desc}</div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-500">{rail.fee}</span>
              <span className={`text-[9px] font-black ${rail.privacy === 'MAX' ? 'text-purple-400' : rail.privacy === 'HIGH' ? 'text-blue-400' : 'text-yellow-400'}`}>{rail.privacy}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Send Form */}
      <div className="max-w-md space-y-4">
        <div>
          <label className="text-[10px] text-slate-600 uppercase block mb-1">Recipient Address</label>
          <input
            className="w-full bg-slate-900 border border-slate-800 focus:border-purple-600 text-white px-3 py-2 text-sm outline-none font-mono"
            placeholder="0x... or XMR address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="text-[10px] text-slate-600 uppercase block mb-1">Amount</label>
          <input
            className="w-full bg-slate-900 border border-slate-800 focus:border-purple-600 text-white px-3 py-2 text-sm outline-none"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3 space-y-1 text-[10px]">
          <div className="flex justify-between"><span className="text-slate-600">Rail</span><span className="text-purple-400 font-bold">{RAILS.find(r => r.id === selected)?.name}</span></div>
          <div className="flex justify-between"><span className="text-slate-600">Privacy Level</span><span className="text-purple-400 font-bold">{RAILS.find(r => r.id === selected)?.privacy}</span></div>
          <div className="flex justify-between"><span className="text-slate-600">Est. Time</span><span className="text-white">{RAILS.find(r => r.id === selected)?.time}</span></div>
          <div className="flex justify-between"><span className="text-slate-600">Fee</span><span className="text-white">{RAILS.find(r => r.id === selected)?.fee}</span></div>
        </div>
        {step === 1 ? (
          <button onClick={() => setStep(2)} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" /> SEND ANONYMOUS
          </button>
        ) : (
          <div className="bg-green-950/30 border border-green-800 p-4 space-y-2">
            <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
              <CheckCircle className="h-5 w-5" /> TRANSACTION BROADCAST
            </div>
            <div className="text-[10px] text-slate-500">TX ID: {mockTxId}</div>
            <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white">
              {copied ? <CheckCircle className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />} Copy TX
            </button>
            <button onClick={() => setStep(1)} className="text-[10px] text-purple-400 hover:text-purple-300">Send another →</button>
          </div>
        )}
      </div>
    </div>
  );
}
