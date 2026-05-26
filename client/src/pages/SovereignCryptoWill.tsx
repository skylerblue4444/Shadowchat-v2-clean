import React, { useState } from 'react';
import { FileText, Shield, Lock, Users, Clock, CheckCircle, AlertTriangle, Key, Globe } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

export default function SovereignCryptoWill() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [step, setStep] = useState(1);
  const [beneficiaries, setBeneficiaries] = useState([{ name: '', address: '', pct: '' }]);

  const addBeneficiary = () => setBeneficiaries(prev => [...prev, { name: '', address: '', pct: '' }]);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><FileText className="h-6 w-6 text-blue-500" /> CRYPTO_WILL</h1>
          <p className="text-slate-500 text-xs mt-1">Decentralized crypto inheritance · Smart contract executor · Wave 20 Mock</p>
        </div>
      </div>

      <div className="bg-amber-950/30 border border-amber-800 p-3 mb-6 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <span className="text-xs text-amber-400">MOCK DEMO — This is a demonstration of a crypto inheritance planning tool. Not legal advice.</span>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4].map(s => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500'}`}>
              {s}. {s === 1 ? 'Assets' : s === 2 ? 'Beneficiaries' : s === 3 ? 'Conditions' : 'Deploy'}
            </div>
            {s < 4 && <div className="h-px w-4 bg-slate-700" />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="max-w-lg space-y-4">
          <h3 className="text-sm font-bold text-slate-400">Assets to Include</h3>
          {[
            { asset: 'BTC Wallet', address: '0x4444...sky444', value: '$113,280', include: true },
            { asset: 'ETH Wallet', address: '0xABCD...1234', value: '$52,540', include: true },
            { asset: 'SKY444 Tokens', address: '0xDEF0...5678', value: '$28,000', include: false },
          ].map(a => (
            <div key={a.asset} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <div>
                <div className="text-xs font-bold">{a.asset}</div>
                <div className="text-[10px] text-slate-500 font-mono">{a.address}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-400">{a.value}</span>
                <div className={`h-4 w-8 rounded-full transition-all ${a.include ? 'bg-green-600' : 'bg-slate-700'}`} />
              </div>
            </div>
          ))}
          <button onClick={() => setStep(2)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 text-xs uppercase transition-all">NEXT: BENEFICIARIES</button>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-lg space-y-4">
          <h3 className="text-sm font-bold text-slate-400">Beneficiaries</h3>
          {beneficiaries.map((b, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-3 space-y-2">
              <input className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-xs outline-none" placeholder="Name" value={b.name} onChange={e => setBeneficiaries(prev => prev.map((p, j) => j === i ? { ...p, name: e.target.value } : p))} />
              <input className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-xs outline-none font-mono" placeholder="Wallet address" value={b.address} onChange={e => setBeneficiaries(prev => prev.map((p, j) => j === i ? { ...p, address: e.target.value } : p))} />
              <input className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-xs outline-none" placeholder="Percentage %" value={b.pct} onChange={e => setBeneficiaries(prev => prev.map((p, j) => j === i ? { ...p, pct: e.target.value } : p))} />
            </div>
          ))}
          <button onClick={addBeneficiary} className="border border-slate-700 text-slate-400 text-xs font-bold px-4 py-2 hover:border-slate-500 transition-all">+ Add Beneficiary</button>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border border-slate-700 text-slate-400 py-3 text-xs font-bold">BACK</button>
            <button onClick={() => setStep(3)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-xs font-bold">NEXT: CONDITIONS</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-lg space-y-4">
          <h3 className="text-sm font-bold text-slate-400">Execution Conditions</h3>
          {[
            { label: 'Inactivity Period', desc: 'Trigger after X days of wallet inactivity', value: '365 days' },
            { label: 'Multi-sig Confirmation', desc: 'Require N of M trusted contacts to confirm', value: '2 of 3' },
            { label: 'Time Lock', desc: 'Minimum time before execution', value: '30 days' },
          ].map(c => (
            <div key={c.label} className="bg-slate-900 border border-slate-800 p-3">
              <div className="text-xs font-bold mb-0.5">{c.label}</div>
              <div className="text-[10px] text-slate-500 mb-2">{c.desc}</div>
              <input className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-2 text-xs outline-none" defaultValue={c.value} />
            </div>
          ))}
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 border border-slate-700 text-slate-400 py-3 text-xs font-bold">BACK</button>
            <button onClick={() => setStep(4)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-xs font-bold">NEXT: DEPLOY</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="max-w-lg text-center space-y-4">
          <div className="bg-green-950/30 border border-green-800 p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <div className="text-xl font-black text-green-400 mb-2">WILL CONTRACT READY</div>
            <p className="text-slate-400 text-sm">Your crypto will smart contract is configured. Deploy to the blockchain to activate.</p>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 text-sm uppercase tracking-widest transition-all">DEPLOY SMART CONTRACT</button>
          <button onClick={() => setStep(1)} className="text-[10px] text-slate-500 hover:text-white">Start over</button>
        </div>
      )}
    </div>
  );
}
