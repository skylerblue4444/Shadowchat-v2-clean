import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Users, Shield, Clock, CheckCircle, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const OTC_ORDERS = [
  { id: 1, type: 'BUY', asset: 'BTC', amount: '10.0', price: '$46,800', total: '$468,000', trader: 'whale_44', rating: 5.0, trades: 847, time: '2m ago' },
  { id: 2, type: 'SELL', asset: 'ETH', amount: '500', price: '$2,840', total: '$1,420,000', trader: 'otc_pro_x', rating: 4.9, trades: 312, time: '5m ago' },
  { id: 3, type: 'BUY', asset: 'USDT', amount: '500,000', price: '$1.00', total: '$500,000', trader: 'sky_fund_1', rating: 4.8, trades: 1204, time: '8m ago' },
  { id: 4, type: 'SELL', asset: 'BTC', amount: '5.5', price: '$46,750', total: '$257,125', trader: 'anon_trader', rating: 4.7, trades: 89, time: '12m ago' },
  { id: 5, type: 'BUY', asset: 'SOL', amount: '2,000', price: '$142', total: '$284,000', trader: 'defi_desk', rating: 4.9, trades: 203, time: '18m ago' },
];

export default function CryptoOTCDesk() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'orders' | 'place' | 'history'>('orders');
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [asset, setAsset] = useState('BTC');
  const [amount, setAmount] = useState('');

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><ArrowRightLeft className="h-6 w-6 text-amber-500" /> CRYPTO_OTC_DESK</h1>
          <p className="text-slate-500 text-xs mt-1">Large-block peer-to-peer trades · No slippage · SKY444 Escrow</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-amber-400">$2.4B</div><div className="text-[10px] text-slate-500">Volume 24h</div></div>
          <div><div className="text-xl font-black text-green-400">847</div><div className="text-[10px] text-slate-500">Active Traders</div></div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {(['orders', 'place', 'history'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'orders' && (
        <div className="space-y-2">
          {OTC_ORDERS.map(order => (
            <div key={order.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 hover:border-slate-600 p-4 transition-all">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-black px-2 py-1 border ${order.type === 'BUY' ? 'border-green-700 text-green-400 bg-green-950/30' : 'border-red-700 text-red-400 bg-red-950/30'}`}>{order.type}</span>
                <div>
                  <div className="text-sm font-bold">{order.amount} {order.asset} @ {order.price}</div>
                  <div className="text-[10px] text-slate-500">Total: {order.total} · @{order.trader} · ⭐{order.rating} ({order.trades} trades)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-600">{order.time}</span>
                <button className={`text-xs font-bold px-4 py-2 transition-all ${order.type === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}>
                  {order.type === 'BUY' ? 'SELL TO' : 'BUY FROM'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'place' && (
        <div className="max-w-md space-y-4">
          <div className="flex gap-2">
            {(['BUY', 'SELL'] as const).map(t => (
              <button key={t} onClick={() => setOrderType(t)} className={`flex-1 py-3 font-black text-sm transition-all ${orderType === t ? (t === 'BUY' ? 'bg-green-600 text-white' : 'bg-red-600 text-white') : 'bg-slate-900 text-slate-500'}`}>{t}</button>
            ))}
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Asset</label>
            <select className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none" value={asset} onChange={e => setAsset(e.target.value)}>
              {['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'SKY444'].map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Amount</label>
            <input className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none focus:border-amber-600" placeholder="Min $10,000" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Your Price</label>
            <input className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none focus:border-amber-600" placeholder="Market price or custom" />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase block mb-1">Payment Method</label>
            <select className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none">
              {['USDT (TRC20)', 'USDC (ERC20)', 'Bank Wire', 'SKY444 Coin'].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <button className={`w-full py-4 font-black text-sm uppercase tracking-widest transition-all ${orderType === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}>
            PLACE {orderType} ORDER
          </button>
          <div className="flex items-center gap-2 text-[10px] text-slate-600">
            <Shield className="h-3 w-3" /> SKY444 Escrow protects both parties
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-2">
          {[
            { date: 'May 22', type: 'BUY', asset: 'BTC', amount: '2.0', total: '$93,600', status: 'COMPLETED' },
            { date: 'May 20', type: 'SELL', asset: 'ETH', amount: '50', total: '$142,000', status: 'COMPLETED' },
            { date: 'May 18', type: 'BUY', asset: 'USDT', amount: '100,000', total: '$100,000', status: 'COMPLETED' },
          ].map((h, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3">
              <div className="text-xs text-slate-400">{h.date}</div>
              <span className={`text-[10px] font-black px-2 py-0.5 border ${h.type === 'BUY' ? 'border-green-700 text-green-400' : 'border-red-700 text-red-400'}`}>{h.type}</span>
              <div className="text-xs font-bold">{h.amount} {h.asset}</div>
              <div className="text-xs text-amber-400 font-bold">{h.total}</div>
              <span className="text-[10px] text-green-400 font-bold">{h.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
