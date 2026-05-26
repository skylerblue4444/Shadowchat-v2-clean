import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Zap, Radio, AlertTriangle, ChevronUp, ChevronDown,
} from 'lucide-react';
import {
  ShadowIntelligenceEngine,
} from '../lib/shadowIntelligence/ShadowIntelligenceEngine';

const COINS = [
  { symbol: 'SKY4444', name: 'Sky Blue',   basePrice: 4.44,   color: '#f59e0b' },
  { symbol: 'SHADOW',  name: 'Shadow',     basePrice: 0.0444, color: '#8b5cf6' },
  { symbol: 'USDT',    name: 'Tether',     basePrice: 1.00,   color: '#22c55e' },
  { symbol: 'BTC',     name: 'Bitcoin',    basePrice: 104000, color: '#f97316' },
  { symbol: 'ETH',     name: 'Ethereum',   basePrice: 3800,   color: '#6366f1' },
  { symbol: 'SOL',     name: 'Solana',     basePrice: 185,    color: '#14b8a6' },
];
const WALLETS: Record<string, number> = {
  SKY4444: 444444.44, SHADOW: 88888.88, USDT: 12500.00, BTC: 0.444, ETH: 4.44, SOL: 44.4,
};
const TIMEFRAMES = ['1m', '5m', '15m', '1h', '4h', '1D'];

interface Candle { time: string; open: number; high: number; low: number; close: number; volume: number; }
interface OBEntry { price: number; size: number; total: number; depth: number; }
interface Trade { id: string; ts: number; side: 'BUY'|'SELL'; price: number; amount: number; asset: string; status: string; }

function genCandle(prev: Candle|null, base: number): Candle {
  const open  = prev ? prev.close : base;
  const drift = (Math.random() - 0.48) * base * 0.004;
  const close = Math.max(open + drift, base * 0.5);
  return { time: new Date().toLocaleTimeString('en-US',{hour12:false}), open: +open.toFixed(4), high: +(Math.max(open,close)*(1+Math.random()*0.003)).toFixed(4), low: +(Math.min(open,close)*(1-Math.random()*0.003)).toFixed(4), close: +close.toFixed(4), volume: Math.floor(1000+Math.random()*50000) };
}
function genOB(mid: number, side: 'ask'|'bid', n=10): OBEntry[] {
  const entries: OBEntry[] = [];
  let cum = 0;
  for (let i=0;i<n;i++) {
    const offset = (i+1)*mid*0.0002;
    const price  = side==='ask' ? mid+offset : mid-offset;
    const size   = +(0.1+Math.random()*5).toFixed(3);
    cum += size;
    entries.push({price:+price.toFixed(4),size,total:+cum.toFixed(3),depth:0});
  }
  const max = entries[entries.length-1].total;
  entries.forEach(e=>{e.depth=(e.total/max)*100;});
  return entries;
}

const Dot: React.FC<{color?:string}> = ({color='bg-green-500'}) => (
  <span className={`inline-block h-1.5 w-1.5 rounded-full ${color} animate-pulse`} />
);

export const SpotTradingTerminal: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [coin,    setCoin]    = useState(COINS[0]);
  const [tf,      setTf]      = useState('15m');
  const [candles, setCandles] = useState<Candle[]>([]);
  const [asks,    setAsks]    = useState<OBEntry[]>([]);
  const [bids,    setBids]    = useState<OBEntry[]>([]);
  const [signals, setSignals] = useState(ShadowIntelligenceEngine.signalBroadcaster.getSignals(10));
  const [trades,  setTrades]  = useState<Trade[]>([]);
  const [otype,   setOtype]   = useState<'MARKET'|'LIMIT'|'STOP'>('MARKET');
  const [oside,   setOside]   = useState<'BUY'|'SELL'>('BUY');
  const [amount,  setAmount]  = useState('');
  const [limitPx, setLimitPx] = useState('');
  const [tab,     setTab]     = useState<'chart'|'depth'|'history'>('chart');
  const [pnl,     setPnl]     = useState({total:44444,today:0,pct:0});
  const [killed,  setKilled]  = useState(false);

  const price = candles.length>0 ? candles[candles.length-1].close : coin.basePrice;
  const pctChg = candles.length>1 ? ((price-candles[0].close)/candles[0].close)*100 : 0;

  useEffect(()=>{
    const seed:Candle[]=[];let prev:Candle|null=null;
    for(let i=0;i<60;i++){const c=genCandle(prev,coin.basePrice);seed.push(c);prev=c;}
    setCandles(seed);
  },[coin]);

  useEffect(()=>{
    const id=setInterval(()=>{
      if(!ShadowIntelligenceEngine.killSwitch.isKilled('ai-trade-executor'))
        setCandles(p=>{const last=p[p.length-1]??null;return[...p.slice(-99),genCandle(last,coin.basePrice)];});
    },2000);
    return()=>clearInterval(id);
  },[coin]);

  useEffect(()=>{
    const id=setInterval(()=>{
      const mid=candles.length>0?candles[candles.length-1].close:coin.basePrice;
      setAsks(genOB(mid,'ask'));setBids(genOB(mid,'bid'));
    },1000);
    return()=>clearInterval(id);
  },[candles,coin]);

  useEffect(()=>{
    const unsub=ShadowIntelligenceEngine.signalBroadcaster.subscribe(sig=>{
      setSignals(p=>[sig,...p].slice(0,10));
    });
    return unsub;
  },[]);

  useEffect(()=>{
    const unsub=ShadowIntelligenceEngine.killSwitch.subscribe(s=>{setKilled(s.masterKill);});
    return unsub;
  },[]);

  useEffect(()=>{
    const id=setInterval(()=>{
      setPnl({total:44444+(Math.random()-0.4)*500,today:(Math.random()-0.4)*1200,pct:(Math.random()-0.4)*8});
    },3000);
    return()=>clearInterval(id);
  },[]);

  const execute=useCallback(()=>{
    const amt=parseFloat(amount);if(!amt||amt<=0)return;
    const px=otype==='MARKET'?price:parseFloat(limitPx)||price;
    const t:Trade={id:`TRD-${Date.now()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`,ts:Date.now(),side:oside,price:px,amount:amt,asset:coin.symbol,status:'FILLED'};
    setTrades(p=>[t,...p].slice(0,50));
    ShadowIntelligenceEngine.hopeFundRouter.route('spot-terminal',px*amt*0.05,coin.symbol);
    setAmount('');setLimitPx('');
  },[amount,limitPx,otype,oside,price,coin]);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {killed&&(
        <div className="bg-red-950/70 border-b border-red-900 px-6 py-2 flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse"/>
          <p className="text-red-400 font-mono text-xs uppercase tracking-widest">MASTER KILL SWITCH ACTIVE — Trading suspended.</p>
        </div>
      )}

      {/* Header */}
      <div className="p-4 border-b border-slate-900 flex flex-wrap gap-4 justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tighter text-amber-500">SPOT_TERMINAL</h1>
            <span className="text-[9px] font-mono border border-slate-800 px-2 py-0.5 text-slate-600">v11.0</span>
          </div>
          <div className="flex gap-4 text-[9px] font-mono text-slate-600 uppercase tracking-widest mt-1">
            <span className="flex items-center gap-1"><Dot/> LIVE_FEED</span>
            <span className="flex items-center gap-1"><Dot color="bg-amber-500"/> AI_SIGNALS</span>
            <span className="flex items-center gap-1"><Dot color="bg-pink-500"/> HOPE_FUND</span>
          </div>
        </div>
        <div className="flex gap-1 flex-wrap">
          {COINS.map(c=>(
            <button key={c.symbol} onClick={()=>setCoin(c)}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase font-bold transition-all rounded-none border ${coin.symbol===c.symbol?'bg-amber-500 text-black border-amber-500':'border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'}`}>
              {c.symbol}
            </button>
          ))}
        </div>
        <div className="text-right">
          <p className="text-3xl font-black tracking-tighter" style={{color:coin.color}}>
            ${price.toLocaleString('en-US',{maximumFractionDigits:4})}
          </p>
          <p className={`text-[10px] font-mono ${pctChg>=0?'text-green-400':'text-red-400'}`}>
            {pctChg>=0?'+':''}{pctChg.toFixed(2)}% 24H
          </p>
        </div>
      </div>

      {/* PnL Strip */}
      <div className="grid grid-cols-3 md:grid-cols-6 border-b border-slate-900">
        {[
          {label:'PORTFOLIO PnL',value:`$${pnl.total.toFixed(0)}`,color:pnl.total>0?'text-green-400':'text-red-400'},
          {label:'TODAY',value:`${pnl.today>=0?'+':''}$${pnl.today.toFixed(0)}`,color:pnl.today>=0?'text-green-400':'text-red-400'},
          {label:'RETURN',value:`${pnl.pct>=0?'+':''}${pnl.pct.toFixed(2)}%`,color:pnl.pct>=0?'text-green-400':'text-red-400'},
          {label:`${coin.symbol} BAL`,value:(WALLETS[coin.symbol]??0).toLocaleString(),color:'text-amber-400'},
          {label:'USDT BAL',value:WALLETS['USDT'].toLocaleString(),color:'text-green-400'},
          {label:'HOPE FUND',value:`$${ShadowIntelligenceEngine.hopeFundRouter.getTotal().toFixed(0)}`,color:'text-pink-400'},
        ].map((k,i)=>(
          <div key={i} className="p-3 border-r border-slate-900 last:border-r-0">
            <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-0.5">{k.label}</p>
            <p className={`text-sm font-black tracking-tight ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-0 border-b border-slate-900">

        {/* Chart */}
        <div className="xl:col-span-7 border-r border-slate-900">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-900">
            <div className="flex gap-1">
              {TIMEFRAMES.map(t=>(
                <button key={t} onClick={()=>setTf(t)}
                  className={`px-3 py-1 text-[9px] font-mono uppercase transition-all ${tf===t?'text-amber-500 bg-amber-500/10 border border-amber-500/30':'text-slate-600 hover:text-slate-400'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {(['chart','depth','history'] as const).map(t=>(
                <button key={t} onClick={()=>setTab(t)}
                  className={`px-3 py-1 text-[9px] font-mono uppercase transition-all ${tab===t?'text-amber-500 border-b border-amber-500':'text-slate-600 hover:text-slate-400'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4">
            {tab==='chart'&&(
              <div className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={candles} margin={{top:4,right:4,bottom:0,left:0}}>
                    <defs>
                      <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={coin.color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={coin.color} stopOpacity={0.02}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
                    <XAxis dataKey="time" stroke="#334155" fontSize={9} tick={{fill:'#475569'}} interval={10}/>
                    <YAxis stroke="#334155" fontSize={9} tick={{fill:'#475569'}} domain={['auto','auto']} tickFormatter={v=>v.toLocaleString('en-US',{maximumFractionDigits:2})} width={70}/>
                    <Tooltip contentStyle={{backgroundColor:'#0f172a',border:'1px solid #1e293b',borderRadius:0,fontSize:10}} formatter={(v:number)=>[v.toLocaleString('en-US',{maximumFractionDigits:4}),'Price']}/>
                    <ReferenceLine y={coin.basePrice} stroke="#334155" strokeDasharray="4 4"/>
                    <Area type="monotone" dataKey="close" stroke={coin.color} strokeWidth={2} fill="url(#pg)" dot={false} activeDot={{r:4,fill:coin.color}}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
            {tab==='depth'&&(
              <div className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[...bids.slice().reverse().map(b=>({price:b.price,bid:b.total})),...asks.map(a=>({price:a.price,ask:a.total}))]} margin={{top:4,right:4,bottom:0,left:0}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
                    <XAxis dataKey="price" stroke="#334155" fontSize={9} tick={{fill:'#475569'}}/>
                    <YAxis stroke="#334155" fontSize={9} tick={{fill:'#475569'}} width={60}/>
                    <Tooltip contentStyle={{backgroundColor:'#0f172a',border:'1px solid #1e293b',borderRadius:0,fontSize:10}}/>
                    <Area type="stepAfter" dataKey="bid" stroke="#22c55e" fill="#22c55e22" strokeWidth={2} dot={false}/>
                    <Area type="stepAfter" dataKey="ask" stroke="#ef4444" fill="#ef444422" strokeWidth={2} dot={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
            {tab==='history'&&(
              <div className="h-[360px] overflow-y-auto">
                <table className="w-full text-[10px] font-mono">
                  <thead className="sticky top-0 bg-black">
                    <tr className="border-b border-slate-800 text-slate-600 uppercase">
                      <th className="text-left pb-2 pr-3">TIME</th><th className="text-left pb-2 pr-3">SIDE</th>
                      <th className="text-right pb-2 pr-3">PRICE</th><th className="text-right pb-2 pr-3">AMOUNT</th>
                      <th className="text-right pb-2">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trades.map((t,i)=>(
                      <tr key={i} className="border-b border-slate-900/50 hover:bg-slate-900/30">
                        <td className="py-1.5 pr-3 text-slate-500">{new Date(t.ts).toLocaleTimeString()}</td>
                        <td className={`py-1.5 pr-3 font-bold ${t.side==='BUY'?'text-green-400':'text-red-400'}`}>{t.side}</td>
                        <td className="py-1.5 pr-3 text-right text-amber-400">${t.price.toLocaleString('en-US',{maximumFractionDigits:4})}</td>
                        <td className="py-1.5 pr-3 text-right text-slate-300">{t.amount} {t.asset}</td>
                        <td className="py-1.5 text-right text-green-400">{t.status}</td>
                      </tr>
                    ))}
                    {trades.length===0&&<tr><td colSpan={5} className="text-center py-12 text-slate-600">NO TRADES YET</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Order Book */}
        <div className="xl:col-span-2 border-r border-slate-900">
          <div className="px-3 py-2 border-b border-slate-900">
            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">ORDER BOOK</p>
          </div>
          <div className="p-2">
            <div className="space-y-0.5 mb-1">
              {asks.slice(0,8).reverse().map((a,i)=>(
                <div key={i} className="relative flex justify-between text-[9px] font-mono py-0.5 px-1">
                  <div className="absolute right-0 top-0 h-full bg-red-500/10" style={{width:`${a.depth}%`}}/>
                  <span className="relative text-red-400">{a.price.toFixed(4)}</span>
                  <span className="relative text-slate-500">{a.size.toFixed(3)}</span>
                </div>
              ))}
            </div>
            <div className="py-2 text-center border-y border-slate-800 my-1">
              <p className="text-base font-black text-amber-500 tracking-tighter">{price.toLocaleString('en-US',{maximumFractionDigits:4})}</p>
              <p className="text-[8px] font-mono text-slate-600">SPREAD: {asks[0]&&bids[0]?(asks[0].price-bids[0].price).toFixed(4):'—'}</p>
            </div>
            <div className="space-y-0.5 mt-1">
              {bids.slice(0,8).map((b,i)=>(
                <div key={i} className="relative flex justify-between text-[9px] font-mono py-0.5 px-1">
                  <div className="absolute right-0 top-0 h-full bg-green-500/10" style={{width:`${b.depth}%`}}/>
                  <span className="relative text-green-400">{b.price.toFixed(4)}</span>
                  <span className="relative text-slate-500">{b.size.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trade Panel + Signals */}
        <div className="xl:col-span-3">
          <div className="flex border-b border-slate-900">
            {(['MARKET','LIMIT','STOP'] as const).map(ot=>(
              <button key={ot} onClick={()=>setOtype(ot)}
                className={`flex-1 py-2.5 text-[9px] font-mono uppercase transition-all ${otype===ot?'text-amber-500 bg-amber-500/10 border-b border-amber-500':'text-slate-600 hover:text-slate-400'}`}>
                {ot}
              </button>
            ))}
          </div>
          <div className="flex border-b border-slate-900">
            <button onClick={()=>setOside('BUY')} className={`flex-1 py-3 text-xs font-black uppercase transition-all ${oside==='BUY'?'bg-green-600 text-white':'text-slate-600 hover:text-green-400'}`}>
              <ChevronUp className="h-3 w-3 inline mr-1"/>BUY
            </button>
            <button onClick={()=>setOside('SELL')} className={`flex-1 py-3 text-xs font-black uppercase transition-all ${oside==='SELL'?'bg-red-600 text-white':'text-slate-600 hover:text-red-400'}`}>
              <ChevronDown className="h-3 w-3 inline mr-1"/>SELL
            </button>
          </div>
          <div className="p-4 space-y-3 border-b border-slate-900">
            {otype!=='MARKET'&&(
              <div>
                <label className="text-[9px] font-mono text-slate-600 uppercase tracking-widest block mb-1">PRICE</label>
                <Input value={limitPx} onChange={e=>setLimitPx(e.target.value)} placeholder={price.toFixed(4)} className="bg-slate-900 border-slate-800 text-white font-mono text-xs rounded-none focus:border-amber-500"/>
              </div>
            )}
            <div>
              <label className="text-[9px] font-mono text-slate-600 uppercase tracking-widest block mb-1">AMOUNT ({coin.symbol})</label>
              <Input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00" className="bg-slate-900 border-slate-800 text-white font-mono text-xs rounded-none focus:border-amber-500"/>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {['25%','50%','75%','100%'].map(pct=>(
                <button key={pct} onClick={()=>setAmount(((WALLETS[coin.symbol]??0)*parseInt(pct)/100).toFixed(4))}
                  className="py-1 text-[9px] font-mono text-slate-500 border border-slate-800 hover:border-amber-500/50 hover:text-amber-400 transition-all">
                  {pct}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[9px] font-mono text-slate-600 border-t border-slate-800 pt-2">
              <span>TOTAL</span>
              <span className="text-amber-400">${(parseFloat(amount||'0')*price).toFixed(2)} USDT</span>
            </div>
            <Button onClick={execute} disabled={killed||!amount}
              className={`w-full font-black py-5 rounded-none uppercase tracking-widest text-sm ${oside==='BUY'?'bg-green-600 hover:bg-green-700':'bg-red-600 hover:bg-red-700'} text-white disabled:opacity-40`}>
              <Zap className="h-4 w-4 mr-2"/>{oside} {coin.symbol}
            </Button>
            <p className="text-[8px] font-mono text-slate-700 text-center uppercase">5% of profit → Hope Campus Fund</p>
          </div>

          {/* AI Signals */}
          <div className="p-3">
            <div className="flex items-center gap-2 mb-3">
              <Radio className="h-3 w-3 text-amber-500 animate-pulse"/>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">AI SIGNAL STREAM</span>
            </div>
            <div className="space-y-2 max-h-[280px] overflow-y-auto">
              {signals.map(sig=>(
                <div key={sig.id} className={`border-l-2 p-2 ${sig.type==='BUY'?'border-l-green-500 bg-green-500/5':sig.type==='SELL'?'border-l-red-500 bg-red-500/5':sig.type==='WHALE'?'border-l-blue-500 bg-blue-500/5':sig.type==='CHARITY'?'border-l-pink-500 bg-pink-500/5':'border-l-amber-500 bg-amber-500/5'}`}>
                  <div className="flex justify-between items-center mb-0.5">
                    <span className={`text-[8px] font-mono font-black uppercase ${sig.type==='BUY'?'text-green-400':sig.type==='SELL'?'text-red-400':sig.type==='WHALE'?'text-blue-400':sig.type==='CHARITY'?'text-pink-400':'text-amber-400'}`}>{sig.type} · {sig.asset}</span>
                    <span className="text-[8px] font-mono text-slate-600">{sig.confidence}%</span>
                  </div>
                  <p className="text-[9px] text-slate-400 leading-relaxed">{sig.message}</p>
                </div>
              ))}
              {signals.length===0&&<p className="text-[9px] font-mono text-slate-600 text-center py-4">AWAITING SIGNALS...</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 p-4 gap-4 border-t border-slate-900">
        {[
          {label:'24H HIGH',value:`$${(price*1.032).toFixed(4)}`,color:'text-green-400'},
          {label:'24H LOW', value:`$${(price*0.968).toFixed(4)}`,color:'text-red-400'},
          {label:'24H VOLUME',value:`${(Math.random()*500+100).toFixed(1)}M ${coin.symbol}`,color:'text-amber-400'},
          {label:'MARKET CAP',value:`$${(price*1e9/1e9).toFixed(2)}B`,color:'text-blue-400'},
        ].map((s,i)=>(
          <div key={i}>
            <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">{s.label}</p>
            <p className={`text-sm font-black tracking-tight ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotTradingTerminal;
