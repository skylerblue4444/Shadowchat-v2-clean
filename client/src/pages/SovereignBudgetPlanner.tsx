import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart, Target, CheckCircle, AlertTriangle, Zap, BarChart3 } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const CATEGORIES = [
  { name: 'Housing', budget: 2000, spent: 1800, color: 'blue', icon: '🏠' },
  { name: 'Food', budget: 800, spent: 920, color: 'green', icon: '🍕' },
  { name: 'Crypto Investment', budget: 3000, spent: 2800, color: 'amber', icon: '₿' },
  { name: 'Entertainment', budget: 400, spent: 280, color: 'purple', icon: '🎮' },
  { name: 'Transport', budget: 300, spent: 240, color: 'blue', icon: '🚗' },
  { name: 'Subscriptions', budget: 200, spent: 120, color: 'pink', icon: '📱' },
  { name: 'Savings', budget: 1500, spent: 1500, color: 'green', icon: '💰' },
  { name: 'Misc', budget: 500, spent: 380, color: 'slate', icon: '📦' },
];

export default function SovereignBudgetPlanner() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'overview' | 'categories' | 'goals'>('overview');
  const totalBudget = CATEGORIES.reduce((a, c) => a + c.budget, 0);
  const totalSpent = CATEGORIES.reduce((a, c) => a + c.spent, 0);
  const overBudget = CATEGORIES.filter(c => c.spent > c.budget);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><DollarSign className="h-6 w-6 text-green-500" /> BUDGET_PLANNER</h1>
          <p className="text-slate-500 text-xs mt-1">Sovereign financial planning · AI insights · Wave 20</p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-black ${totalSpent > totalBudget ? 'text-red-400' : 'text-green-400'}`}>${totalSpent.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">of ${totalBudget.toLocaleString()} budget</div>
        </div>
      </div>

      {overBudget.length > 0 && (
        <div className="bg-red-950/20 border border-red-800 p-3 mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <span className="text-xs text-red-400 font-bold">{overBudget.length} categories over budget: {overBudget.map(c => c.name).join(', ')}</span>
        </div>
      )}

      <div className="flex gap-1 mb-4">
        {(['overview', 'categories', 'goals'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-green-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 text-center"><div className="text-xl font-black text-white">${totalBudget.toLocaleString()}</div><div className="text-xs text-slate-500">Monthly Budget</div></div>
            <div className={`border p-4 text-center ${totalSpent > totalBudget ? 'bg-red-950/20 border-red-900' : 'bg-green-950/20 border-green-800'}`}><div className={`text-xl font-black ${totalSpent > totalBudget ? 'text-red-400' : 'text-green-400'}`}>${totalSpent.toLocaleString()}</div><div className="text-xs text-slate-500">Spent</div></div>
            <div className="bg-slate-900 border border-slate-800 p-4 text-center"><div className={`text-xl font-black ${totalBudget - totalSpent >= 0 ? 'text-green-400' : 'text-red-400'}`}>${Math.abs(totalBudget - totalSpent).toLocaleString()}</div><div className="text-xs text-slate-500">{totalBudget - totalSpent >= 0 ? 'Remaining' : 'Over Budget'}</div></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4">
            <h3 className="text-[10px] text-slate-500 uppercase mb-3">Spending by Category</h3>
            {CATEGORIES.map(c => (
              <div key={c.name} className="flex items-center gap-3 mb-2">
                <span className="text-sm w-6">{c.icon}</span>
                <span className="text-[10px] text-slate-400 w-28">{c.name}</span>
                <div className="flex-1 bg-slate-800 h-2">
                  <div className={`h-full ${c.spent > c.budget ? 'bg-red-500' : 'bg-green-500'}`} style={{width:`${Math.min((c.spent/c.budget)*100, 100)}%`}} />
                </div>
                <span className={`text-[10px] w-20 text-right font-bold ${c.spent > c.budget ? 'text-red-400' : 'text-white'}`}>${c.spent}/${c.budget}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'categories' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map(c => (
            <div key={c.name} className={`border p-3 ${c.spent > c.budget ? 'border-red-800 bg-red-950/10' : 'border-slate-800 bg-slate-900'}`}>
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="text-xs font-bold mb-1">{c.name}</div>
              <div className={`text-lg font-black ${c.spent > c.budget ? 'text-red-400' : 'text-white'}`}>${c.spent}</div>
              <div className="text-[9px] text-slate-500">of ${c.budget} budget</div>
              <div className="mt-2 bg-slate-800 h-1.5"><div className={`h-full ${c.spent > c.budget ? 'bg-red-500' : 'bg-green-500'}`} style={{width:`${Math.min((c.spent/c.budget)*100,100)}%`}} /></div>
            </div>
          ))}
        </div>
      )}

      {tab === 'goals' && (
        <div className="space-y-3">
          {[
            { goal: 'Emergency Fund 6mo', target: '$24,000', saved: '$18,400', pct: 77 },
            { goal: 'BTC Accumulation 1.0', target: '1.0 BTC', saved: '0.42 BTC', pct: 42 },
            { goal: 'Real Estate Down Payment', target: '$50,000', saved: '$12,800', pct: 26 },
          ].map(g => (
            <div key={g.goal} className="bg-slate-900 border border-slate-800 p-4">
              <div className="flex justify-between mb-2">
                <div className="text-sm font-bold">{g.goal}</div>
                <div className="text-xs font-bold text-green-400">{g.pct}%</div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>Saved: {g.saved}</span><span>Target: {g.target}</span></div>
              <div className="bg-slate-800 h-3"><div className="h-full bg-green-500" style={{width:`${g.pct}%`}} /></div>
            </div>
          ))}
          <button className="flex items-center gap-2 border border-green-800 text-green-400 text-xs font-bold px-4 py-2 hover:bg-green-950/30 transition-all">+ Add Financial Goal</button>
        </div>
      )}
    </div>
  );
}
