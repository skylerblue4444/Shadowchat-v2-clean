import React, { useState } from 'react';
import { Lock, Shield, Eye, EyeOff, Camera, Video, DollarSign, Users, Star, Heart, Gift, MessageCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

export default function AdultContentStudio() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [verified, setVerified] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [activeTab, setActiveTab] = useState<'studio' | 'earnings' | 'fans' | 'settings'>('studio');

  if (!verified) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="p-6 bg-pink-600/10 border border-pink-500/30 inline-block mx-auto">
            <Lock className="h-16 w-16 text-pink-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-pink-500">ADULT_STUDIO_v19</h1>
            <p className="text-slate-500 text-sm mt-2">Creator monetization platform · 18+ only · Mock Demo</p>
          </div>
          <div className="bg-yellow-950/40 border border-yellow-800 p-4 text-left">
            <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold mb-2">
              <AlertTriangle className="h-4 w-4" /> DEMO / MOCK ONLY
            </div>
            <p className="text-yellow-600 text-xs">This is a UI demonstration only. No real content, payments, or user data is involved. For presentation purposes only.</p>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-slate-400 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="accent-pink-500" />
              I confirm I am 18+ and understand this is a mock demo
            </label>
            <button
              disabled={!agreed}
              onClick={() => setVerified(true)}
              className={`w-full py-4 font-black text-sm uppercase tracking-widest transition-all ${agreed ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
            >
              ENTER STUDIO
            </button>
          </div>
          <div className="flex justify-center gap-6 text-[10px] text-slate-600">
            <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Encrypted</span>
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> No Logs</span>
            <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Anonymous</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
            <Camera className="h-5 w-5 text-pink-500" /> ADULT_STUDIO_v19
          </h1>
          <p className="text-slate-500 text-xs">Creator Dashboard · MOCK DEMO</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-lg font-black text-pink-400">$12,847</div><div className="text-[10px] text-slate-500">This Month</div></div>
          <div><div className="text-lg font-black text-purple-400">4,203</div><div className="text-[10px] text-slate-500">Subscribers</div></div>
          <div><div className="text-lg font-black text-amber-400">4.9★</div><div className="text-[10px] text-slate-500">Rating</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-4 border-b border-slate-900">
        {(['studio', 'earnings', 'fans', 'settings'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold uppercase transition-all ${activeTab === tab ? 'bg-pink-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'studio' && (
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-700 hover:border-pink-700 transition-all p-12 text-center">
              <Camera className="h-12 w-12 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">Drop content here or click to upload</p>
              <p className="text-slate-700 text-xs mt-1">Supports: MP4, MOV, JPG, PNG · Max 4GB</p>
              <button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-6 py-2 transition-all">
                SELECT FILES
              </button>
            </div>

            {/* Content Grid (blurred mock) */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Recent Content (Mock)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="relative aspect-square bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-purple-900/20" />
                    <Lock className="h-8 w-8 text-slate-700 relative z-10" />
                    <div className="absolute bottom-2 right-2 text-[9px] text-slate-600">
                      {i % 2 === 0 ? '🔒 PPV' : '✓ Free'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Subscriptions', value: '$8,400', icon: Users, color: 'pink' },
                { label: 'Tips', value: '$2,847', icon: Gift, color: 'amber' },
                { label: 'PPV Sales', value: '$1,200', icon: DollarSign, color: 'green' },
                { label: 'Messages', value: '$400', icon: MessageCircle, color: 'blue' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-slate-900 border border-slate-800 p-4">
                  <Icon className={`h-5 w-5 text-${color}-500 mb-2`} />
                  <div className={`text-xl font-black text-${color}-400`}>{value}</div>
                  <div className="text-[10px] text-slate-500">{label}</div>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Payout History (Mock)</h3>
              {[
                { date: 'May 15', amount: '$4,200', method: 'BTC', status: 'PAID' },
                { date: 'May 1', amount: '$3,847', method: 'ETH', status: 'PAID' },
                { date: 'Apr 15', amount: '$5,100', method: 'BTC', status: 'PAID' },
              ].map(p => (
                <div key={p.date} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                  <span className="text-xs text-slate-400">{p.date}</span>
                  <span className="text-xs font-bold text-white">{p.amount}</span>
                  <span className="text-[10px] text-slate-500">{p.method}</span>
                  <span className="text-[10px] text-green-400 font-bold">{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fans' && (
          <div className="space-y-3">
            {[
              { name: 'crypto_king_44', tier: 'VIP', spent: '$840', since: '6mo' },
              { name: 'shadow_fan_x', tier: 'Premium', spent: '$420', since: '3mo' },
              { name: 'anon_supporter', tier: 'Basic', spent: '$120', since: '1mo' },
              { name: 'sky_whale_1', tier: 'VIP', spent: '$1,200', since: '1yr' },
            ].map(fan => (
              <div key={fan.name} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-pink-900/40 border border-pink-700 flex items-center justify-center text-xs font-bold text-pink-400">
                    {fan.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold">@{fan.name}</div>
                    <div className="text-[10px] text-slate-500">Since {fan.since}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[9px] px-2 py-0.5 border font-bold ${fan.tier === 'VIP' ? 'border-amber-700 text-amber-400' : fan.tier === 'Premium' ? 'border-pink-700 text-pink-400' : 'border-slate-700 text-slate-400'}`}>{fan.tier}</span>
                  <span className="text-xs font-bold text-green-400">{fan.spent}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4 max-w-lg">
            {[
              { label: 'Subscription Price', value: '$9.99/mo' },
              { label: 'PPV Default Price', value: '$4.99' },
              { label: 'Message Price', value: '$2.00' },
              { label: 'Payout Method', value: 'BTC' },
              { label: 'Payout Threshold', value: '$500' },
              { label: 'Content Watermark', value: 'Enabled' },
              { label: 'Screenshot Block', value: 'Enabled' },
              { label: 'Geo-Block Countries', value: '12 blocked' },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
                <span className="text-xs text-slate-400">{s.label}</span>
                <span className="text-xs font-bold text-white">{s.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
