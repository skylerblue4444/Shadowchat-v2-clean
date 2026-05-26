import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Heart, TrendingUp, Users, Trophy, Dices, Radio, Shield, AlertTriangle } from 'lucide-react';
import { ShadowIntelligenceEngine } from '../lib/shadowIntelligence/ShadowIntelligenceEngine';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const GAMES = [
  { id:'slots',      name:'SHADOW SLOTS',      icon:Zap,        jackpot:'1,250,000 SKY4444', players:142, color:'#f59e0b', rtp:'96.5%', risk:'LOW' },
  { id:'roulette',   name:'DEGEN ROULETTE',    icon:Dices,      jackpot:'444,444 SHADOW',    players:89,  color:'#8b5cf6', rtp:'97.3%', risk:'MEDIUM' },
  { id:'crash',      name:'CRASH TERMINAL',    icon:TrendingUp, jackpot:'50,000 USDT',       players:256, color:'#22c55e', rtp:'99.0%', risk:'HIGH' },
  { id:'blackjack',  name:'BLACKJACK ELITE',   icon:Users,      jackpot:'100 BTC',           players:12,  color:'#f97316', rtp:'99.5%', risk:'LOW' },
  { id:'dice',       name:'SOVEREIGN DICE',    icon:Dices,      jackpot:'1,000,000 DOGE',    players:67,  color:'#14b8a6', rtp:'98.0%', risk:'MEDIUM' },
  { id:'charity',    name:'CHARITY JACKPOT',   icon:Heart,      jackpot:'250,000 SKY4444',   players:1024,color:'#ec4899', rtp:'100%',  risk:'NONE' },
];

interface SpinResult { win: boolean; amount: number; multiplier: number; message: string; }
interface CharityTx  { id: string; ts: number; game: string; gross: number; charity: number; asset: string; }

const Dot: React.FC<{color?:string}> = ({color='bg-green-500'}) => (
  <span className={`inline-block h-1.5 w-1.5 rounded-full ${color} animate-pulse`} />
);

export const UnhingedCasinoHub: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeGame, setActiveGame]       = useState(GAMES[0]);
  const [betAmount,  setBetAmount]        = useState('100');
  const [betAsset,   setBetAsset]         = useState('SKY4444');
  const [spinning,   setSpinning]         = useState(false);
  const [lastResult, setLastResult]       = useState<SpinResult|null>(null);
  const [charityTxs, setCharityTxs]       = useState<CharityTx[]>([]);
  const [hopeFundTotal, setHopeFundTotal] = useState(0);
  const [livePlayers,   setLivePlayers]   = useState(1024);
  const [jackpotPulse,  setJackpotPulse]  = useState(250000);
  const [killed,        setKilled]        = useState(false);
  const [tab, setTab]                     = useState<'games'|'charity'|'leaderboard'>('games');

  const ASSETS = ['SKY4444','SHADOW','USDT','BTC'];

  useEffect(()=>{
    const unsub = ShadowIntelligenceEngine.killSwitch.subscribe(s=>setKilled(s.masterKill));
    return unsub;
  },[]);

  // Simulate live player counts & jackpot growth
  useEffect(()=>{
    const id = setInterval(()=>{
      setLivePlayers(p => Math.max(800, p + Math.floor((Math.random()-0.4)*20)));
      setJackpotPulse(j => j + Math.random()*50);
      setHopeFundTotal(ShadowIntelligenceEngine.hopeFundRouter.getTotal());
    },2000);
    return ()=>clearInterval(id);
  },[]);

  const spin = useCallback(()=>{
    if(spinning||killed) return;
    const bet = parseFloat(betAmount);
    if(!bet||bet<=0) return;
    setSpinning(true);
    setLastResult(null);

    setTimeout(()=>{
      const win = Math.random() > 0.45;
      const multipliers = [1.5,2,3,5,10,25,100];
      const mult = win ? multipliers[Math.floor(Math.random()*multipliers.length)] : 0;
      const gross = win ? bet * mult : 0;
      const result: SpinResult = {
        win,
        amount: gross,
        multiplier: mult,
        message: win
          ? mult >= 25 ? `🔥 MEGA WIN! ${mult}x — Shadow Pool jackpot triggered!`
          : mult >= 10 ? `⚡ BIG WIN! ${mult}x — Hope Engine signal confirmed!`
          : `✅ WIN! ${mult}x — Sovereign play.`
          : '❌ No win this round. The house edge funds Hope Campus.',
      };
      setLastResult(result);
      setSpinning(false);

      if(win && gross > 0){
        const tx = ShadowIntelligenceEngine.hopeFundRouter.route(activeGame.id, gross, betAsset);
        const charityTx: CharityTx = {
          id: tx.id, ts: tx.ts, game: activeGame.name,
          gross, charity: tx.charityAmount, asset: betAsset,
        };
        setCharityTxs(p=>[charityTx,...p].slice(0,50));
        setHopeFundTotal(ShadowIntelligenceEngine.hopeFundRouter.getTotal());
      }
    }, 1200 + Math.random()*800);
  },[spinning,killed,betAmount,betAsset,activeGame]);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {killed&&(
        <div className="bg-red-950/70 border-b border-red-900 px-6 py-2 flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse"/>
          <p className="text-red-400 font-mono text-xs uppercase tracking-widest">MASTER KILL SWITCH ACTIVE — Casino suspended.</p>
        </div>
      )}

      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex flex-wrap gap-4 justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tighter text-amber-500">UNHINGED_CASINO</h1>
            <span className="text-[9px] font-mono border border-slate-800 px-2 py-0.5 text-slate-600">v11.0</span>
          </div>
          <div className="flex gap-4 text-[9px] font-mono text-slate-600 uppercase tracking-widest mt-1">
            <span className="flex items-center gap-1"><Dot/> PROVABLY_FAIR</span>
            <span className="flex items-center gap-1"><Dot color="bg-pink-500"/> CHARITY_BURN_5%</span>
            <span className="flex items-center gap-1"><Dot color="bg-amber-500"/> {livePlayers.toLocaleString()} LIVE</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-mono text-pink-400 uppercase tracking-widest">HOPE CAMPUS FUND</p>
          <p className="text-4xl font-black text-pink-500 tracking-tighter">${hopeFundTotal.toLocaleString('en-US',{maximumFractionDigits:0})}</p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-900">
        {[
          {label:'CHARITY JACKPOT',  value:`${jackpotPulse.toLocaleString('en-US',{maximumFractionDigits:0})} SKY4444`, color:'text-pink-400'},
          {label:'LIVE PLAYERS',     value:livePlayers.toLocaleString(), color:'text-amber-400'},
          {label:'CHARITY TXS',      value:charityTxs.length.toString(), color:'text-green-400'},
          {label:'BURN RATE',        value:'5% PER WIN',                 color:'text-pink-400'},
        ].map((k,i)=>(
          <div key={i} className="p-4 border-r border-slate-900 last:border-r-0">
            <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-0.5">{k.label}</p>
            <p className={`text-lg font-black tracking-tight ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-900">
        {(['games','charity','leaderboard'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-6 py-3 text-[10px] font-mono uppercase tracking-widest transition-all ${tab===t?'text-amber-500 border-b-2 border-amber-500 bg-amber-500/5':'text-slate-500 hover:text-slate-300'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="p-6">
        {tab==='games'&&(
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Game Grid */}
            <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {GAMES.map(game=>(
                <div key={game.id} onClick={()=>setActiveGame(game)}
                  className={`bg-slate-900 border transition-all p-5 cursor-pointer rounded-none group ${activeGame.id===game.id?'border-amber-500 bg-amber-500/5':'border-slate-800 hover:border-slate-600'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-slate-800 border border-slate-700 group-hover:border-amber-500/30 transition-all">
                      <game.icon className="h-5 w-5" style={{color:game.color}}/>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-mono text-slate-600 uppercase">RTP</p>
                      <p className="text-sm font-black text-green-400">{game.rtp}</p>
                    </div>
                  </div>
                  <p className="text-xs font-black uppercase tracking-tight text-white mb-1">{game.name}</p>
                  <p className="text-[9px] font-mono text-amber-400 mb-3">{game.jackpot}</p>
                  <div className="flex justify-between text-[8px] font-mono text-slate-600">
                    <span>{game.players} PLAYERS</span>
                    <span className={`uppercase ${game.risk==='NONE'?'text-pink-400':game.risk==='LOW'?'text-green-400':game.risk==='MEDIUM'?'text-amber-400':'text-red-400'}`}>
                      {game.risk==='NONE'?'CHARITY':game.risk} RISK
                    </span>
                  </div>
                  {activeGame.id===game.id&&(
                    <div className="mt-2 text-[8px] font-mono text-amber-500 uppercase flex items-center gap-1">
                      <Dot color="bg-amber-500"/> SELECTED
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Play Panel */}
            <div className="xl:col-span-4 space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-none">
                <div className="flex items-center gap-3 mb-4">
                  <activeGame.icon className="h-5 w-5" style={{color:activeGame.color}}/>
                  <div>
                    <p className="text-sm font-black uppercase">{activeGame.name}</p>
                    <p className="text-[9px] font-mono text-slate-500">RTP {activeGame.rtp} · 5% → Hope Campus</p>
                  </div>
                </div>

                {/* Bet Amount */}
                <div className="space-y-2 mb-4">
                  <label className="text-[9px] font-mono text-slate-600 uppercase tracking-widest block">BET AMOUNT</label>
                  <input
                    value={betAmount}
                    onChange={e=>setBetAmount(e.target.value)}
                    className="w-full bg-black border border-slate-800 text-white font-mono text-sm px-3 py-2 focus:border-amber-500 outline-none rounded-none"
                    placeholder="100"
                  />
                  <div className="grid grid-cols-4 gap-1">
                    {['100','500','1000','MAX'].map(v=>(
                      <button key={v} onClick={()=>setBetAmount(v==='MAX'?'10000':v)}
                        className="py-1 text-[9px] font-mono text-slate-500 border border-slate-800 hover:border-amber-500/50 hover:text-amber-400 transition-all">
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Asset */}
                <div className="space-y-2 mb-4">
                  <label className="text-[9px] font-mono text-slate-600 uppercase tracking-widest block">ASSET</label>
                  <div className="grid grid-cols-4 gap-1">
                    {ASSETS.map(a=>(
                      <button key={a} onClick={()=>setBetAsset(a)}
                        className={`py-1.5 text-[9px] font-mono uppercase font-bold transition-all border rounded-none ${betAsset===a?'bg-amber-500 text-black border-amber-500':'border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result Display */}
                {lastResult&&(
                  <div className={`p-3 mb-4 border-l-2 ${lastResult.win?'border-l-green-500 bg-green-500/5':'border-l-red-500 bg-red-500/5'}`}>
                    <p className={`text-xs font-bold ${lastResult.win?'text-green-400':'text-red-400'}`}>
                      {lastResult.win?`+${lastResult.amount.toFixed(2)} ${betAsset}`:'0.00'}
                    </p>
                    <p className="text-[9px] text-slate-400 mt-0.5">{lastResult.message}</p>
                    {lastResult.win&&(
                      <p className="text-[8px] font-mono text-pink-400 mt-1">
                        ♥ ${(lastResult.amount*0.05).toFixed(2)} donated to Hope Campus Fund
                      </p>
                    )}
                  </div>
                )}

                <Button onClick={spin} disabled={spinning||killed||!betAmount}
                  className={`w-full font-black py-6 rounded-none uppercase tracking-widest text-base ${spinning?'bg-slate-700':'bg-amber-600 hover:bg-amber-700'} text-black disabled:opacity-40`}>
                  {spinning
                    ? <><span className="animate-spin mr-2">⚡</span>SPINNING...</>
                    : <><Zap className="h-5 w-5 mr-2"/>PLAY {activeGame.name}</>
                  }
                </Button>
                <p className="text-[8px] font-mono text-slate-700 text-center mt-2 uppercase">
                  Provably fair · 5% charity burn · Kill switch protected
                </p>
              </div>

              {/* Live Charity Feed */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-none">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-3 w-3 text-pink-500 animate-pulse"/>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">LIVE CHARITY BURNS</span>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {charityTxs.slice(0,10).map((tx,i)=>(
                    <div key={i} className="flex justify-between text-[9px] font-mono py-1 border-b border-slate-900/50">
                      <span className="text-slate-500">{tx.game.slice(0,12)}</span>
                      <span className="text-pink-400">+${tx.charity.toFixed(2)}</span>
                    </div>
                  ))}
                  {charityTxs.length===0&&<p className="text-slate-600 text-[9px] text-center py-4">PLAY TO TRIGGER CHARITY BURNS</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab==='charity'&&(
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-950/30 to-slate-900 border border-pink-900/30 p-8 text-center">
              <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4 animate-pulse"/>
              <p className="text-[10px] font-mono text-pink-400 uppercase tracking-widest mb-2">HOPE CAMPUS FUND — TOTAL RAISED</p>
              <p className="text-6xl font-black text-pink-500 tracking-tighter">${hopeFundTotal.toLocaleString('en-US',{maximumFractionDigits:0})}</p>
              <p className="text-sm text-slate-400 mt-4 max-w-lg mx-auto">
                Every win in the Unhinged Casino automatically routes 5% to the Hope Campus Fund.
                The Charity Jackpot game donates 100% of proceeds. Every bet is a bet on hope.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {label:'CHARITY JACKPOT GAME',desc:'100% of all bets go directly to Hope Campus. Zero house edge. Pure charity.',icon:Heart,color:'text-pink-400'},
                {label:'5% BURN MECHANIC',desc:'Every winning bet across all games burns 5% to the Hope Campus Fund automatically.',icon:Zap,color:'text-amber-400'},
                {label:'TRANSPARENT LEDGER',desc:'All charity transactions are logged on-chain via the Shadow Intelligence Engine.',icon:Shield,color:'text-green-400'},
              ].map((card,i)=>(
                <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-none">
                  <card.icon className={`h-8 w-8 ${card.color} mb-4`}/>
                  <p className="text-sm font-black uppercase mb-2">{card.label}</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-none">
              <h3 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">CHARITY TRANSACTION LOG</h3>
              <div className="space-y-2">
                {ShadowIntelligenceEngine.hopeFundRouter.getTransactions(20).map((tx,i)=>(
                  <div key={i} className="flex justify-between items-center p-3 bg-pink-950/10 border border-pink-900/20">
                    <div>
                      <p className="text-[10px] font-mono text-pink-400 font-bold">{tx.id}</p>
                      <p className="text-[9px] font-mono text-slate-600 uppercase">{tx.sourceModule} · {new Date(tx.ts).toLocaleTimeString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-mono text-pink-400">+${tx.charityAmount.toFixed(2)} {tx.asset}</p>
                      <p className="text-[9px] font-mono text-slate-600">{tx.burnPct}% BURN</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab==='leaderboard'&&(
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-none">
              <h3 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                <Trophy className="h-3 w-3 text-amber-500"/> TOP CHARITY CONTRIBUTORS
              </h3>
              <div className="space-y-2">
                {[
                  {rank:1,name:'SHADOW_WHALE_001',donated:'$44,444',games:1204,badge:'SOVEREIGN'},
                  {rank:2,name:'SKY4444_KING',    donated:'$12,888',games:892, badge:'ELITE'},
                  {rank:3,name:'HOPE_RUNNER_X',   donated:'$8,444', games:567, badge:'CHAMPION'},
                  {rank:4,name:'DEGEN_SAINT',     donated:'$4,200', games:344, badge:'HERO'},
                  {rank:5,name:'CHARITY_MAXI',    donated:'$2,100', games:211, badge:'PATRON'},
                ].map((p,i)=>(
                  <div key={i} className="flex items-center gap-4 p-3 bg-slate-950 border border-slate-800 hover:border-amber-500/30 transition-all">
                    <span className={`text-lg font-black w-6 ${i===0?'text-amber-400':i===1?'text-slate-300':i===2?'text-amber-700':'text-slate-600'}`}>#{p.rank}</span>
                    <div className="flex-1">
                      <p className="text-xs font-black uppercase">{p.name}</p>
                      <p className="text-[9px] font-mono text-slate-600">{p.games} games played</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-pink-400">{p.donated}</p>
                      <p className="text-[8px] font-mono text-slate-600 uppercase">{p.badge}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnhingedCasinoHub;
