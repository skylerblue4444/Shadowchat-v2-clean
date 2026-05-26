import React, { useState } from 'react';
import { Calendar, Clock, Star, Bell, TrendingUp, Globe, Zap, CheckCircle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const EVENTS = [
  { date: 'May 25', event: 'Bitcoin Halving Anniversary', type: 'Anniversary', impact: 'HIGH', asset: 'BTC', reminder: true },
  { date: 'May 28', event: 'Fed Interest Rate Decision', type: 'Macro', impact: 'HIGH', asset: 'ALL', reminder: true },
  { date: 'Jun 1', event: 'ETH EIP-7702 Upgrade', type: 'Protocol', impact: 'HIGH', asset: 'ETH', reminder: false },
  { date: 'Jun 5', event: 'SKY444 Wave 20 Launch Event', type: 'Platform', impact: 'MED', asset: 'SKY444', reminder: true },
  { date: 'Jun 10', event: 'Binance Quarterly Token Burn', type: 'Tokenomics', impact: 'MED', asset: 'BNB', reminder: false },
  { date: 'Jun 15', event: 'US CPI Data Release', type: 'Macro', impact: 'HIGH', asset: 'ALL', reminder: true },
  { date: 'Jun 20', event: 'Solana Breakpoint Conference', type: 'Conference', impact: 'MED', asset: 'SOL', reminder: false },
  { date: 'Jul 4', event: 'BTC Options Expiry $2.4B', type: 'Options', impact: 'HIGH', asset: 'BTC', reminder: true },
];

export default function SovereignCryptoCalendar() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [reminders, setReminders] = useState(EVENTS.filter(e => e.reminder).map(e => e.date));
  const impactColor = (i: string) => i === 'HIGH' ? 'text-red-400 border-red-800' : 'text-amber-400 border-amber-800';

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Calendar className="h-6 w-6 text-blue-500" /> CRYPTO_CALENDAR</h1>
          <p className="text-slate-500 text-xs mt-1">Upcoming events · Protocol upgrades · Macro data · Wave 20</p>
        </div>
        <div className="text-center"><div className="text-xl font-black text-blue-400">{EVENTS.length}</div><div className="text-[10px] text-slate-500">Events</div></div>
      </div>
      <div className="space-y-2">
        {EVENTS.map(e => (
          <div key={e.date+e.event} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="text-center w-14 bg-slate-800 p-2">
                <div className="text-xs font-black text-blue-400">{e.date.split(' ')[0].toUpperCase()}</div>
                <div className="text-lg font-black">{e.date.split(' ')[1]}</div>
              </div>
              <div>
                <div className="text-sm font-bold">{e.event}</div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span>{e.type}</span>
                  <span className="border border-slate-700 px-1">{e.asset}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[9px] font-black px-2 py-0.5 border ${impactColor(e.impact)}`}>{e.impact}</span>
              <button onClick={() => setReminders(prev => prev.includes(e.date) ? prev.filter(d => d !== e.date) : [...prev, e.date])} className={`p-1.5 border transition-all ${reminders.includes(e.date) ? 'border-amber-700 text-amber-400' : 'border-slate-700 text-slate-600'}`}>
                <Bell className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
