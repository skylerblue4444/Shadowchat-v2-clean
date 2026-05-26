import React, { useState } from 'react';
import { Lock, Shield, Key, HardDrive, Zap, AlertTriangle, CheckCircle, Eye, EyeOff, Download, Upload } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const VAULTS = [
  { id: 1, name: 'Primary Cold Vault', assets: ['2.4 BTC', '18.5 ETH', '100K SKY444'], value: '$164,860', type: 'Hardware', status: 'SEALED', lastAccess: '30 days ago' },
  { id: 2, name: 'Emergency Backup', assets: ['0.5 BTC', '5 ETH'], value: '$37,600', type: 'Paper', status: 'SEALED', lastAccess: '90 days ago' },
  { id: 3, name: 'Hot Wallet', assets: ['0.1 BTC', '2 ETH', '5K USDT'], value: '$16,280', type: 'Software', status: 'ACTIVE', lastAccess: 'Today' },
];

export default function SovereignColdStorage() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [showValues, setShowValues] = useState(false);
  const [unlocking, setUnlocking] = useState<number | null>(null);

  return (
    <div className="bg-black text-white min-h-screen p-6 font-mono">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2"><HardDrive className="h-6 w-6 text-amber-500" /> COLD_STORAGE_v19</h1>
          <p className="text-slate-600 text-xs mt-1">Air-gapped vault management · Wave 19 · Hardware + Paper</p>
        </div>
        <button onClick={() => setShowValues(v => !v)} className="flex items-center gap-2 border border-slate-800 px-3 py-2 text-xs font-bold text-slate-500 hover:text-white transition-all">
          {showValues ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {showValues ? 'Hide' : 'Show'} Values
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-amber-950/20 border border-amber-800 p-4 text-center">
          <div className="text-2xl font-black text-amber-400">{showValues ? '$218,740' : '••••••'}</div>
          <div className="text-xs text-amber-600">Total Cold Storage</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 text-center">
          <div className="text-2xl font-black text-white">{VAULTS.length}</div>
          <div className="text-xs text-slate-500">Vaults</div>
        </div>
        <div className="bg-green-950/20 border border-green-800 p-4 text-center">
          <div className="text-2xl font-black text-green-400">AES-256</div>
          <div className="text-xs text-green-600">Encryption</div>
        </div>
      </div>

      <div className="space-y-4">
        {VAULTS.map(vault => (
          <div key={vault.id} className={`border p-4 ${vault.status === 'SEALED' ? 'border-amber-900 bg-amber-950/10' : 'border-green-900 bg-green-950/10'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {vault.type === 'Hardware' ? <HardDrive className="h-5 w-5 text-amber-500" /> : vault.type === 'Paper' ? <Key className="h-5 w-5 text-blue-500" /> : <Zap className="h-5 w-5 text-green-500" />}
                <div>
                  <div className="text-sm font-black">{vault.name}</div>
                  <div className="text-[10px] text-slate-600">{vault.type} · Last access: {vault.lastAccess}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[9px] font-black px-2 py-0.5 border ${vault.status === 'SEALED' ? 'border-amber-800 text-amber-400' : 'border-green-800 text-green-400'}`}>{vault.status}</span>
                {vault.status === 'SEALED' && (
                  <button onClick={() => setUnlocking(vault.id)} className="border border-amber-800 text-amber-400 hover:bg-amber-950/30 text-[10px] font-bold px-3 py-1.5 transition-all">
                    UNLOCK
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {vault.assets.map(asset => (
                <span key={asset} className="text-[10px] border border-slate-800 text-slate-400 px-2 py-1">
                  {showValues ? asset : '••••'}
                </span>
              ))}
            </div>
            <div className="mt-2 text-xs font-bold text-amber-400">
              {showValues ? vault.value : '••••••'}
            </div>
          </div>
        ))}
      </div>

      {unlocking && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 border border-amber-800 p-6 max-w-sm w-full text-center space-y-4">
            <Lock className="h-12 w-12 text-amber-500 mx-auto" />
            <h2 className="text-lg font-black">Unlock Vault</h2>
            <p className="text-slate-500 text-xs">Enter your vault PIN to unlock</p>
            <input type="password" className="w-full bg-slate-800 border border-slate-700 text-white text-center text-2xl tracking-widest py-3 outline-none" placeholder="• • • • • •" maxLength={8} />
            <div className="flex gap-3">
              <button onClick={() => setUnlocking(null)} className="flex-1 border border-slate-700 text-slate-400 py-2 text-xs font-bold">CANCEL</button>
              <button onClick={() => setUnlocking(null)} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 text-xs font-bold">UNLOCK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
