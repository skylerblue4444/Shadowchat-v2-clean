import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { Lock, Shield, EyeOff, Database, HardDrive, Share2, DollarSign, Key } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Privacy Vault Dashboard — Billion-Dollar Polish
 * Data vaults (10GB), monetizable categories, and Web3 DID monetization.
 */
export const PrivacyVaultDashboard: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/50">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-blue-500">PRIVACY_VAULT_v10</h1>
          <GlobalStatus />
        </div>
        <div className="flex gap-4">
          <SovereignBadge label="DATA_MONETIZATION_ON" />
          <SovereignBadge label="WEB3_DID_ACTIVE" />
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Vault Status */}
        <div className="space-y-6">
          <PremiumCard title="STORAGE_QUOTA">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase">Vault Usage</p>
                  <p className="text-2xl font-black">4.2 GB <span className="text-xs text-slate-600">/ 10 GB</span></p>
                </div>
                <Database className="h-8 w-8 text-blue-500" />
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-none overflow-hidden">
                <div className="bg-blue-500 h-full w-[42%]" />
              </div>
              <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-none uppercase text-[8px]">UPGRADE_STORAGE</Button>
            </div>
          </PremiumCard>

          <PremiumCard title="ENCRYPTION_KEYS">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800">
                <Key className="h-4 w-4 text-blue-500" />
                <span className="text-[10px] font-mono text-slate-400">RSA_4096_ACTIVE</span>
              </div>
              <Button variant="outline" className="w-full border-slate-800 text-[10px] font-mono h-10 rounded-none uppercase">Rotate_Keys</Button>
            </div>
          </PremiumCard>
        </div>

        {/* Monetization Engine */}
        <div className="lg:col-span-2 space-y-6">
          <PremiumCard title="DATA_MONETIZATION_ENGINE">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'BROWSING_HABITS', value: '4.2 SKY / DAY', status: 'ACTIVE' },
                { name: 'PURCHASE_HISTORY', value: '8.8 SKY / DAY', status: 'ACTIVE' },
                { name: 'SOCIAL_INTERACTION', value: '2.4 SKY / DAY', status: 'PAUSED' },
                { name: 'GEOLOCATION_DATA', value: '12.0 SKY / DAY', status: 'LOCKED' },
              ].map((cat, i) => (
                <div key={i} className="p-4 bg-slate-950 border border-slate-900 space-y-3 hover:border-blue-500/30 transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-slate-300 uppercase">{cat.name}</span>
                    <SovereignBadge label={cat.status} />
                  </div>
                  <p className="text-xl font-black text-blue-500">{cat.value}</p>
                  <Button variant="ghost" className="h-6 text-[8px] text-slate-500 p-0 hover:bg-transparent uppercase">Toggle_Monetization</Button>
                </div>
              ))}
            </div>
          </PremiumCard>

          <PremiumCard title="EARNINGS_HISTORY">
            <div className="aspect-video flex items-end gap-2 p-4">
              {[40, 65, 45, 80, 70, 95, 85, 100, 90, 110].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-600/20 hover:bg-blue-600 transition-all cursor-crosshair group relative" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[8px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">+{h} SKY</div>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>

        {/* Web3 DID Panel */}
        <div className="space-y-6">
          <PremiumCard title="WEB3_IDENTITY">
            <div className="space-y-4">
              <div className="p-4 bg-blue-600/5 border border-blue-500/20 text-center space-y-2">
                <p className="text-[10px] font-mono text-blue-500 font-black uppercase">DID: SOVEREIGN:0x4444</p>
                <div className="h-24 w-24 bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center">
                  <Shield className="h-12 w-12 text-blue-500/30" />
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-none uppercase text-[10px]">VERIFY_CREDENTIALS</Button>
            </div>
          </PremiumCard>

          <PremiumCard title="DATA_VAULT_ACTIONS">
            <div className="space-y-2">
              <Button variant="outline" className="w-full border-slate-800 text-[10px] font-mono h-10 rounded-none uppercase flex justify-between">
                <span>Export_Data</span> <HardDrive className="h-3 w-3" />
              </Button>
              <Button variant="outline" className="w-full border-slate-800 text-[10px] font-mono h-10 rounded-none uppercase flex justify-between">
                <span>Share_Access</span> <Share2 className="h-3 w-3" />
              </Button>
              <Button variant="outline" className="w-full border-slate-800 text-[10px] font-mono h-10 rounded-none uppercase flex justify-between">
                <span>Burn_Vault</span> <EyeOff className="h-3 w-3" />
              </Button>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default PrivacyVaultDashboard;
