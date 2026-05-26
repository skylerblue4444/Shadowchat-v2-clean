import React, { useState } from 'react';
import { User, Shield, Key, Globe, CheckCircle, Lock, Eye, Fingerprint, QrCode, Copy } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const DID = 'did:sky444:4444xShadowSovereignIdentity9a2f8c3e';
const VERIFICATIONS = [
  { type: 'Email', status: 'verified', date: 'May 1', icon: '📧' },
  { type: 'Phone', status: 'verified', date: 'May 3', icon: '📱' },
  { type: 'Government ID', status: 'optional', date: '—', icon: '🪪' },
  { type: 'Biometric', status: 'optional', date: '—', icon: '🖐️' },
  { type: 'Crypto Wallet', status: 'verified', date: 'May 5', icon: '₿' },
  { type: 'Social Account', status: 'verified', date: 'May 8', icon: '🌐' },
];

export default function SovereignIdentitySystem() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'identity' | 'credentials' | 'privacy'>('identity');
  const [copied, setCopied] = useState(false);

  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Fingerprint className="h-6 w-6 text-blue-500" /> SOVEREIGN_IDENTITY</h1>
          <p className="text-slate-500 text-xs mt-1">Decentralized identity · Self-sovereign · Wave 19</p>
        </div>
      </div>

      <div className="flex gap-1 mb-6">
        {(['identity', 'credentials', 'privacy'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'identity' && (
        <div className="space-y-4 max-w-2xl">
          <div className="bg-slate-900 border border-blue-800 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 bg-blue-900/40 border border-blue-700 flex items-center justify-center">
                <User className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <div className="text-xl font-black">SkyBlue_4444</div>
                <div className="text-slate-500 text-sm">Sovereign Identity · Level 3</div>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-[10px] text-green-400">VERIFIED IDENTITY</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 p-3 flex items-center justify-between">
              <div>
                <div className="text-[9px] text-slate-500 mb-0.5">Decentralized Identifier (DID)</div>
                <div className="text-[10px] font-mono text-blue-400">{DID}</div>
              </div>
              <button onClick={copy} className="text-slate-500 hover:text-white">
                {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {VERIFICATIONS.map(v => (
              <div key={v.type} className={`border p-3 ${v.status === 'verified' ? 'border-green-800 bg-green-950/20' : 'border-slate-800 bg-slate-900'}`}>
                <div className="text-xl mb-1">{v.icon}</div>
                <div className="text-xs font-bold">{v.type}</div>
                <div className={`text-[10px] font-black mt-1 ${v.status === 'verified' ? 'text-green-400' : 'text-slate-600'}`}>{v.status.toUpperCase()}</div>
                <div className="text-[9px] text-slate-600">{v.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'credentials' && (
        <div className="space-y-3 max-w-2xl">
          {[
            { name: 'KYC Level 1', issuer: 'SKY444 Platform', issued: 'May 1', expires: 'May 1, 2027', type: 'Identity' },
            { name: 'Accredited Investor', issuer: 'SKY444 Finance', issued: 'May 5', expires: 'May 5, 2027', type: 'Finance' },
            { name: 'Age Verification 18+', issuer: 'SKY444 Trust', issued: 'May 3', expires: 'Never', type: 'Age' },
            { name: 'Wallet Ownership Proof', issuer: 'Self-signed', issued: 'May 8', expires: 'Never', type: 'Crypto' },
          ].map(cred => (
            <div key={cred.name} className="bg-slate-900 border border-slate-800 p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">{cred.name}</div>
                <div className="text-[10px] text-slate-500">Issued by {cred.issuer} · {cred.issued}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] border border-blue-800 text-blue-400 px-2 py-0.5 font-bold">{cred.type}</span>
                <span className="text-[10px] text-green-400 font-bold">VALID</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'privacy' && (
        <div className="space-y-4 max-w-lg">
          {[
            { label: 'Share Real Name', value: false },
            { label: 'Share Email', value: false },
            { label: 'Share Location', value: false },
            { label: 'Allow Analytics', value: true },
            { label: 'Public Profile', value: true },
            { label: 'Searchable by Username', value: true },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <span className="text-xs text-slate-400">{s.label}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 border ${s.value ? 'border-green-800 text-green-400' : 'border-red-900 text-red-400'}`}>{s.value ? 'ON' : 'OFF'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
