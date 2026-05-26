import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Zap, RefreshCw, BarChart3 } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const PRICES: Record<string, number> = { BTC: 47200, ETH: 2840, SOL: 142, SKY444: 0.28, BNB: 580, USDT: 1 };

export default function SovereignCryptoCalculator() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'convert' | 'profit' | 'dca' | 'fees'>('convert');
  const [fromAsset, setFromAsset] = useState('BTC');
  const [toAsset, setToAsset] = useState('USD');
  const [amount, setAmount] = useState('1');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [investment, setInvestment] = useState('');
  const [dcaAmount, setDcaAmount] = useState('100');
  const [dcaFreq, setDcaFreq] = useState('weekly');
  const [dcaMonths, setDcaMonths] = useState('12');

  const convertedValue = toAsset === 'USD'
    ? (parseFloat(amount || '0') * (PRICES[fromAsset] || 1)).toFixed(2)
    : (parseFloat(amount || '0') * (PRICES[fromAsset] || 1) / (PRICES[toAsset] || 1)).toFixed(8);

  const profitCalc = () => {
    const buy = parseFloat(buyPrice || '0');
    const sell = parseFloat(sellPrice || '0');
    const inv = parseFloat(investment || '0');
    if (!buy || !sell || !inv) return null;
    const qty = inv / buy;
    const profit = (sell - buy) * qty;
    const pct = ((sell - buy) / buy) * 100;
    return { qty: qty.toFixed(6), profit: profit.toFixed(2), pct: pct.toFixed(2) };
  };

  const dcaCalc = () => {
    const monthly = dcaFreq === 'weekly' ? parseFloat(dcaAmount) * 4.33 : dcaFreq === 'daily' ? parseFloat(dcaAmount) * 30 : parseFloat(dcaAmount);
    const total = monthly * parseFloat(dcaMonths);
    const avgPrice = PRICES[fromAsset] * 0.95;
    const tokens = total / avgPrice;
    return { total: total.toFixed(0), tokens: tokens.toFixed(6), avgPrice: avgPrice.toFixed(2) };
  };

  const profit = profitCalc();
  const dca = dcaCalc();

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Calculator className="h-6 w-6 text-green-500" /> CRYPTO_CALCULATOR</h1>
          <p className="text-slate-500 text-xs mt-1">Convert, profit calc, DCA planner · Wave 20</p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['convert', 'profit', 'dca', 'fees'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-green-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'convert' && (
        <div className="max-w-sm space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-500 block mb-1">From</label>
              <select className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none" value={fromAsset} onChange={e => setFromAsset(e.target.value)}>
                {Object.keys(PRICES).map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-1">To</label>
              <select className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none" value={toAsset} onChange={e => setToAsset(e.target.value)}>
                {['USD', ...Object.keys(PRICES)].map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-1">Amount</label>
            <input className="w-full bg-slate-900 border border-slate-700 focus:border-green-600 text-white px-3 py-2 text-sm outline-none" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="bg-green-950/20 border border-green-800 p-4 text-center">
            <div className="text-3xl font-black text-green-400">{convertedValue}</div>
            <div className="text-[10px] text-slate-500">{amount} {fromAsset} = {convertedValue} {toAsset}</div>
          </div>
        </div>
      )}

      {tab === 'profit' && (
        <div className="max-w-sm space-y-4">
          {[
            { label: 'Buy Price (USD)', state: buyPrice, set: setBuyPrice },
            { label: 'Sell Price (USD)', state: sellPrice, set: setSellPrice },
            { label: 'Investment Amount (USD)', state: investment, set: setInvestment },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[10px] text-slate-500 block mb-1">{f.label}</label>
              <input className="w-full bg-slate-900 border border-slate-700 focus:border-green-600 text-white px-3 py-2 text-sm outline-none" value={f.state} onChange={e => f.set(e.target.value)} />
            </div>
          ))}
          {profit && (
            <div className={`border p-4 ${parseFloat(profit.profit) >= 0 ? 'border-green-800 bg-green-950/20' : 'border-red-800 bg-red-950/20'}`}>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div><div className="font-black text-white">{profit.qty}</div><div className="text-[9px] text-slate-500">Tokens</div></div>
                <div><div className={`font-black ${parseFloat(profit.profit) >= 0 ? 'text-green-400' : 'text-red-400'}`}>${profit.profit}</div><div className="text-[9px] text-slate-500">P&L</div></div>
                <div><div className={`font-black ${parseFloat(profit.pct) >= 0 ? 'text-green-400' : 'text-red-400'}`}>{profit.pct}%</div><div className="text-[9px] text-slate-500">Return</div></div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'dca' && (
        <div className="max-w-sm space-y-4">
          <div>
            <label className="text-[10px] text-slate-500 block mb-1">Asset</label>
            <select className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none" value={fromAsset} onChange={e => setFromAsset(e.target.value)}>
              {Object.keys(PRICES).map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-1">Amount per period (USD)</label>
            <input className="w-full bg-slate-900 border border-slate-700 focus:border-green-600 text-white px-3 py-2 text-sm outline-none" value={dcaAmount} onChange={e => setDcaAmount(e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-1">Frequency</label>
            <select className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none" value={dcaFreq} onChange={e => setDcaFreq(e.target.value)}>
              {['daily', 'weekly', 'monthly'].map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block mb-1">Duration (months)</label>
            <input className="w-full bg-slate-900 border border-slate-700 focus:border-green-600 text-white px-3 py-2 text-sm outline-none" value={dcaMonths} onChange={e => setDcaMonths(e.target.value)} />
          </div>
          <div className="bg-blue-950/20 border border-blue-800 p-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div><div className="font-black text-white">${parseFloat(dca.total).toLocaleString()}</div><div className="text-[9px] text-slate-500">Total Invested</div></div>
            <div><div className="font-black text-blue-400">{dca.tokens}</div><div className="text-[9px] text-slate-500">{fromAsset} Accumulated</div></div>
            <div><div className="font-black text-green-400">${dca.avgPrice}</div><div className="text-[9px] text-slate-500">Avg Buy Price</div></div>
          </div>
        </div>
      )}

      {tab === 'fees' && (
        <div className="max-w-sm space-y-3">
          {[
            { exchange: 'SKY444', maker: '0.05%', taker: '0.1%', withdrawal: 'Free' },
            { exchange: 'Binance', maker: '0.1%', taker: '0.1%', withdrawal: '$0.50' },
            { exchange: 'Coinbase', maker: '0.4%', taker: '0.6%', withdrawal: '$2.99' },
            { exchange: 'Kraken', maker: '0.16%', taker: '0.26%', withdrawal: '$0.75' },
          ].map(e => (
            <div key={e.exchange} className="bg-slate-900 border border-slate-800 p-3 grid grid-cols-4 gap-2 text-xs">
              <div className="font-bold">{e.exchange}</div>
              <div className="text-center"><div className="text-green-400">{e.maker}</div><div className="text-[9px] text-slate-500">Maker</div></div>
              <div className="text-center"><div className="text-amber-400">{e.taker}</div><div className="text-[9px] text-slate-500">Taker</div></div>
              <div className="text-center"><div className="text-blue-400">{e.withdrawal}</div><div className="text-[9px] text-slate-500">Withdraw</div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
