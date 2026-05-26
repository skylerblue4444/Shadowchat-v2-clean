import React, { useState } from 'react';
import { UniversalLayout } from '@/components/UniversalLayout';
import { SovereignCard } from '@/components/SovereignCard';
import { SovereignButton } from '@/components/SovereignButton';
import { AlertCircle, Shield, Lock, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

export const RestrictedZone: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [verified, setVerified] = useState(false);
  const [showContent, setShowContent] = useState(false);

  if (!verified) {
    return (
      <UniversalLayout>
        <div className="min-h-[80vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="space-y-4">
              <div className="h-20 w-20 bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Restricted Zone</h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                This section contains adult content (NSFW) and is restricted to users aged 18 and over. 
                By entering, you confirm that you are of legal age in your jurisdiction.
              </p>
            </div>

            <div className="space-y-4">
              <SovereignButton 
                variant="danger" 
                size="lg" 
                className="w-full py-4"
                onClick={() => setVerified(true)}
              >
                I AM 18+ — ENTER ZONE
              </SovereignButton>
              <SovereignButton 
                variant="ghost" 
                size="lg" 
                className="w-full"
                onClick={() => window.location.href = '/dashboard'}
              >
                EXIT TO DASHBOARD
              </SovereignButton>
            </div>

            <div className="pt-8 border-t border-slate-900 flex items-center justify-center gap-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3" /> SECURE
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-3 w-3" /> PRIVATE
              </div>
              <div className="flex items-center gap-2">
                <EyeOff className="h-3 w-3" /> ANONYMOUS
              </div>
            </div>
          </div>
        </div>
      </UniversalLayout>
    );
  }

  return (
    <UniversalLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-900 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-red-600 tracking-tighter flex items-center gap-3">
              <AlertCircle className="h-8 w-8" /> RESTRICTED ZONE
            </h1>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Adult Content & Private Exploration</p>
          </div>
          
          <div className="flex gap-3">
            <SovereignButton 
              variant={showContent ? "ghost" : "primary"} 
              size="sm"
              onClick={() => setShowContent(!showContent)}
              icon={showContent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            >
              {showContent ? "HIDE CONTENT" : "SHOW CONTENT"}
            </SovereignButton>
            <SovereignButton variant="danger" size="sm" onClick={() => setVerified(false)}>
              LOCK ZONE
            </SovereignButton>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="group relative aspect-[3/4] bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer">
              {!showContent ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <Lock className="h-8 w-8 text-slate-700" />
                  <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Content Hidden</p>
                </div>
              ) : (
                <>
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=800&q=80`} 
                    alt="Restricted" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <p className="text-xs font-bold text-white uppercase">Private Content #{i}</p>
                    <p className="text-[8px] text-slate-400 font-mono mt-1">Uploaded 2h ago</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Privacy Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-900">
          <SovereignCard title="Privacy Mode" accent="red" icon={<Shield className="h-4 w-4" />}>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Incognito Browsing</span>
              <div className="h-5 w-10 bg-red-600 rounded-full relative">
                <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full" />
              </div>
            </div>
          </SovereignCard>
          <SovereignCard title="Data Encryption" accent="blue" icon={<Lock className="h-4 w-4" />}>
            <div className="flex items-center gap-2 text-green-400 text-xs font-mono">
              <CheckCircle2 className="h-4 w-4" /> AES-256 ACTIVE
            </div>
          </SovereignCard>
          <SovereignCard title="Access Logs" accent="amber" icon={<AlertCircle className="h-4 w-4" />}>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono">
              <XCircle className="h-4 w-4" /> NO LOGS STORED
            </div>
          </SovereignCard>
        </div>
      </div>
    </UniversalLayout>
  );
};

export default RestrictedZone;
