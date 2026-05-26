import React, { useState } from 'react';
import { CreditCard, DollarSign, Zap, Shield, Globe, TrendingUp, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const TRANSACTIONS = [
  { merchant: 'Whole Foods Market', amount: '-$84.20', crypto: '-0.029 ETH', date: 'May 22', category: 'Groceries', cashback: '+0.84 SKY444' },
  { merchant: 'Shell Gas Station', amount: '-$62.40', crypto: '-0.022 ETH', date: 'May 21', category: 'Gas', cashback: '+0.62 SKY444' },
  { merchant: 'Amazon.com', amount: '-$147.99', crypto: '-0.052 ETH', date: 'May 20', category: 'Shopping', cashback: '+1.48 SKY444' },
  { merchant: 'Starbucks', amount: '-$8.50', crypto: '-0.003 ETH', date: 'May 19', category: 'Food', cashback: '+0.09 SKY444' },
  { merchant: 'Crypto Deposit', amount: '+$500.00', crypto: '+0.176 ETH', date: 'May 18', category: 'Deposit', cashback: '' },
];

export default function SovereignDebitCard() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [showBalance, setShowBalance] = useState(true);
  const [tab, setTab] = useState<'card' | 'transactions' | 'rewards'>('card');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><CreditCard className="h-6 w-6 text-amber-500" /> SOVEREIGN_DEBIT_CARD</h1>
          <p className="text-slate-500 text-xs mt-1">Spend crypto anywhere · 1% cashback in SKY444 · Wave 20 Mock</p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['card', 'transactions', 'rewards'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'card' && (
        <div className="max-w-sm">
          {/* Card Visual */}
          <div className="relative h-48 bg-gradient-to-br from-slate-800 via-amber-900/40 to-slate-900 border border-amber-700 p-6 mb-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full -translate-y-12 translate-x-12" />
            <div className="flex justify-between items-start mb-8">
              <div className="text-xs font-black text-amber-400 tracking-widest">SKY444</div>
              <div className="text-xs text-slate-500">SOVEREIGN</div>
            </div>
            <div className="text-lg font-mono tracking-widest text-white mb-4">4444 •••• •••• 4444</div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-[9px] text-slate-500">BALANCE</div>
                <div className="text-xl font-black text-amber-400 flex items-center gap-2">
                  {showBalance ? '$2,847.20' : '••••••'}
                  <button onClick={() => setShowBalance(v => !v)}>{showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-slate-500">EXPIRES</div>
                <div className="text-xs font-bold">12/28</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Cashback Rate', value: '1%', icon: TrendingUp },
              { label: 'Monthly Spend', value: '$1,240', icon: DollarSign },
              { label: 'SKY444 Earned', value: '124', icon: Zap },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-slate-900 border border-slate-800 p-3 text-center">
                <Icon className="h-4 w-4 text-amber-500 mx-auto mb-1" />
                <div className="text-sm font-black text-amber-400">{value}</div>
                <div className="text-[9px] text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'transactions' && (
        <div className="space-y-2">
          {TRANSACTIONS.map((t, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-800 border border-slate-700 flex items-center justify-center text-xs">{t.category[0]}</div>
                <div>
                  <div className="text-xs font-bold">{t.merchant}</div>
                  <div className="text-[10px] text-slate-500">{t.date} · {t.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-bold ${t.amount.startsWith('+') ? 'text-green-400' : 'text-white'}`}>{t.amount}</div>
                <div className="text-[9px] text-slate-500">{t.crypto}</div>
                {t.cashback && <div className="text-[9px] text-amber-400">{t.cashback}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'rewards' && (
        <div className="space-y-4">
          <div className="bg-amber-950/20 border border-amber-800 p-4 text-center">
            <div className="text-4xl font-black text-amber-400">1,247</div>
            <div className="text-sm text-slate-500">Total SKY444 Earned from Card Spend</div>
            <div className="text-[10px] text-slate-600 mt-1">≈ $349 value</div>
          </div>
          {[
            { tier: 'Bronze', spend: '$0-$500/mo', cashback: '0.5%', current: false },
            { tier: 'Silver', spend: '$500-$2K/mo', cashback: '1%', current: true },
            { tier: 'Gold', spend: '$2K-$10K/mo', cashback: '2%', current: false },
            { tier: 'Diamond', spend: '$10K+/mo', cashback: '3%', current: false },
          ].map(r => (
            <div key={r.tier} className={`flex items-center justify-between border p-3 ${r.current ? 'border-amber-700 bg-amber-950/20' : 'border-slate-800 bg-slate-900'}`}>
              <div><div className="text-xs font-bold">{r.tier}</div><div className="text-[10px] text-slate-500">{r.spend}</div></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-green-400">{r.cashback}</span>
                {r.current && <CheckCircle className="h-4 w-4 text-amber-500" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
