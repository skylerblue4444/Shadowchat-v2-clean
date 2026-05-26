import React, { useState } from 'react';
import { DollarSign, TrendingUp, Shield, Users, Clock, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const LOANS = [
  { id: 1, borrower: 'sky_trader_44', amount: '$5,000', collateral: '0.15 BTC', rate: '8%/yr', term: '30 days', ltv: '65%', status: 'OPEN', risk: 'LOW' },
  { id: 2, borrower: 'defi_whale_x', amount: '$25,000', collateral: '10 ETH', rate: '12%/yr', term: '90 days', ltv: '72%', status: 'OPEN', risk: 'MED' },
  { id: 3, borrower: 'anon_biz_1', amount: '$2,500', collateral: '500 SOL', rate: '15%/yr', term: '14 days', ltv: '58%', status: 'FUNDED', risk: 'LOW' },
  { id: 4, borrower: 'shadow_fund', amount: '$100,000', collateral: '3.0 BTC', rate: '6%/yr', term: '180 days', ltv: '70%', status: 'OPEN', risk: 'MED' },
];

export default function SovereignP2PLending() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'borrow' | 'lend' | 'portfolio'>('lend');
  const [amount, setAmount] = useState('');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><DollarSign className="h-6 w-6 text-green-500" /> P2P_LENDING</h1>
          <p className="text-slate-500 text-xs mt-1">Sovereign peer-to-peer crypto lending · No banks · Wave 19</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-green-400">$2.4M</div><div className="text-[10px] text-slate-500">Total Lent</div></div>
          <div><div className="text-xl font-black text-amber-400">9.2%</div><div className="text-[10px] text-slate-500">Avg APY</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['borrow', 'lend', 'portfolio'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-green-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'lend' && (
        <div className="space-y-3">
          {LOANS.map(loan => (
            <div key={loan.id} className={`flex items-center justify-between p-4 border transition-all ${loan.status === 'OPEN' ? 'border-slate-800 bg-slate-900 hover:border-green-800' : 'border-slate-800 bg-slate-900 opacity-60'}`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-900/40 border border-green-800 flex items-center justify-center font-black text-green-400 text-sm">
                  {loan.borrower[0].toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold">@{loan.borrower}</div>
                  <div className="text-[10px] text-slate-500">Collateral: {loan.collateral} · LTV: {loan.ltv}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <div className="text-center"><div className="font-black text-white">{loan.amount}</div><div className="text-[9px] text-slate-500">Amount</div></div>
                <div className="text-center"><div className="font-black text-green-400">{loan.rate}</div><div className="text-[9px] text-slate-500">Rate</div></div>
                <div className="text-center"><div className="font-bold text-white">{loan.term}</div><div className="text-[9px] text-slate-500">Term</div></div>
                <span className={`text-[9px] px-2 py-0.5 border font-bold ${loan.risk === 'LOW' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>{loan.risk}</span>
                {loan.status === 'OPEN' ? (
                  <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 transition-all">FUND</button>
                ) : (
                  <span className="text-[10px] text-slate-500 font-bold">FUNDED</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'borrow' && (
        <div className="max-w-md space-y-4">
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Borrow Amount (USD)</label>
            <input className="w-full bg-slate-900 border border-slate-700 focus:border-green-600 text-white px-3 py-2 text-sm outline-none" placeholder="$1,000 minimum" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Collateral Asset</label>
            <select className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none">
              {['BTC', 'ETH', 'SOL', 'BNB'].map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Loan Term</label>
            <select className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none">
              {['7 days', '14 days', '30 days', '90 days', '180 days'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3 text-[10px] space-y-1">
            <div className="flex justify-between"><span className="text-slate-500">Max LTV</span><span className="text-white">75%</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Est. Rate</span><span className="text-green-400">8-15% APY</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Liquidation at</span><span className="text-red-400">85% LTV</span></div>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 text-sm uppercase tracking-widest transition-all">REQUEST LOAN</button>
        </div>
      )}

      {tab === 'portfolio' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-900 border border-slate-800 p-4 text-center">
              <div className="text-xl font-black text-green-400">$12,500</div>
              <div className="text-xs text-slate-500">Active Loans</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 text-center">
              <div className="text-xl font-black text-amber-400">$847</div>
              <div className="text-xs text-slate-500">Interest Earned</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 text-center">
              <div className="text-xl font-black text-blue-400">9.8%</div>
              <div className="text-xs text-slate-500">Portfolio APY</div>
            </div>
          </div>
          <div className="text-xs text-slate-600 text-center py-4">No active loans in portfolio. Fund a loan to get started.</div>
        </div>
      )}
    </div>
  );
}
