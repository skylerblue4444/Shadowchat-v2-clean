import React, { useState } from 'react';
import { Lock, Shield, Eye, EyeOff, Key, FileText, Image, Database, Trash2, Download, Upload, CheckCircle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const VAULT_ITEMS = [
  { id: 1, name: 'Seed Phrases.enc', type: 'key', size: '2 KB', date: 'May 20', encrypted: true },
  { id: 2, name: 'KYC Documents.zip', type: 'file', size: '4.2 MB', date: 'May 18', encrypted: true },
  { id: 3, name: 'Private Keys Backup', type: 'key', size: '1 KB', date: 'May 15', encrypted: true },
  { id: 4, name: 'Tax Records 2025.pdf', type: 'file', size: '890 KB', date: 'Apr 30', encrypted: true },
  { id: 5, name: 'ID Photos.zip', type: 'image', size: '8.1 MB', date: 'Apr 22', encrypted: true },
  { id: 6, name: 'Wallet Addresses.csv', type: 'data', size: '12 KB', date: 'Apr 10', encrypted: true },
];

export default function SovereignPrivacyVault() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const unlock = () => { if (pin.length >= 4) setUnlocked(true); };

  const typeIcon = (type: string) => {
    if (type === 'key') return <Key className="h-4 w-4 text-amber-500" />;
    if (type === 'image') return <Image className="h-4 w-4 text-blue-500" />;
    if (type === 'data') return <Database className="h-4 w-4 text-purple-500" />;
    return <FileText className="h-4 w-4 text-green-500" />;
  };

  if (!unlocked) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
        <div className="max-w-sm w-full space-y-6 text-center">
          <div className="p-6 bg-amber-500/10 border border-amber-500/30 inline-block mx-auto">
            <Lock className="h-16 w-16 text-amber-500" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter">SOVEREIGN_VAULT</h1>
          <p className="text-slate-500 text-sm">AES-256 encrypted personal vault · Zero-knowledge · SKY444</p>
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              className="w-full bg-slate-900 border border-slate-700 focus:border-amber-600 text-white text-center text-2xl tracking-widest py-4 outline-none"
              placeholder="• • • • • •"
              value={pin}
              onChange={e => setPin(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && unlock()}
              maxLength={8}
            />
            <button onClick={() => setShowPin(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <button onClick={unlock} disabled={pin.length < 4} className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-slate-800 text-white font-black py-4 text-sm uppercase tracking-widest transition-all">
            UNLOCK VAULT
          </button>
          <p className="text-slate-700 text-[10px]">Demo: any 4+ character PIN works</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black flex items-center gap-2"><Shield className="h-5 w-5 text-amber-500" /> SOVEREIGN_VAULT · UNLOCKED</h1>
          <p className="text-slate-500 text-xs mt-1">AES-256 · Zero-knowledge · {VAULT_ITEMS.length} items · 13.2 MB used</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs font-bold transition-all">
            <Upload className="h-3 w-3" /> Upload
          </button>
          <button onClick={() => setUnlocked(false)} className="flex items-center gap-2 bg-red-950/30 border border-red-900 hover:bg-red-950/50 text-red-400 px-3 py-2 text-xs font-bold transition-all">
            <Lock className="h-3 w-3" /> Lock
          </button>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="flex items-center gap-3 mb-4 bg-amber-950/30 border border-amber-800 p-3">
          <span className="text-xs text-amber-400 font-bold">{selected.length} selected</span>
          <button className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white"><Download className="h-3 w-3" /> Download</button>
          <button onClick={() => setSelected([])} className="flex items-center gap-1 text-[10px] text-red-400 hover:text-red-300"><Trash2 className="h-3 w-3" /> Delete</button>
        </div>
      )}

      <div className="space-y-2">
        {VAULT_ITEMS.map(item => (
          <div
            key={item.id}
            onClick={() => setSelected(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])}
            className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${selected.includes(item.id) ? 'border-amber-700 bg-amber-950/20' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`h-4 w-4 border rounded-sm flex items-center justify-center ${selected.includes(item.id) ? 'border-amber-600 bg-amber-600' : 'border-slate-600'}`}>
                {selected.includes(item.id) && <CheckCircle className="h-3 w-3 text-white" />}
              </div>
              {typeIcon(item.type)}
              <div>
                <div className="text-sm font-bold">{item.name}</div>
                <div className="text-[10px] text-slate-500">{item.size} · {item.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {item.encrypted && <span className="text-[9px] border border-green-800 text-green-500 px-2 py-0.5 font-bold">ENCRYPTED</span>}
              <button className="text-slate-600 hover:text-white"><Download className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { label: 'Encryption', value: 'AES-256-GCM' },
          { label: 'Key Derivation', value: 'Argon2id' },
          { label: 'Zero-Knowledge', value: 'Enabled' },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 p-3 text-center">
            <div className="text-xs font-bold text-amber-400">{s.value}</div>
            <div className="text-[10px] text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
