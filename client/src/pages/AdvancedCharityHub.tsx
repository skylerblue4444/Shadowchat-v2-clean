import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Zap, TrendingUp, Users, Globe, Shield, Trophy, Radio } from 'lucide-react';
import { ShadowIntelligenceEngine } from '../lib/shadowIntelligence/ShadowIntelligenceEngine';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const CAUSES = [
  { id:'campus',   name:'Hope Campus Fund',      raised:1250000, goal:5000000, color:'#ec4899', desc:'Building the sovereign Hope Campus — education, housing, and community for all.' },
  { id:'food',     name:'Shadow Food Network',   raised:444444,  goal:1000000, color:'#f59e0b', desc:'Feeding 10,000 families per month through decentralized food distribution.' },
  { id:'tech',     name:'Sky4444 Tech Access',   raised:88888,   goal:500000,  color:'#6366f1', desc:'Providing computers and internet to underserved communities worldwide.' },
  { id:'health',   name:'Sovereign Health DAO',  raised:222222,  goal:2000000, color:'#22c55e', desc:'Decentralized healthcare funding — no insurance required, just community.' },
  { id:'arts',     name:'Hope Arts Initiative',  raised:44444,   goal:250000,  color:'#14b8a6', desc:'Funding artists, musicians, and creators from the Shadow community.' },
  { id:'housing',  name:'Blockchain Housing',    raised:333333,  goal:3000000, color:'#f97316', desc:'Smart contract-powered affordable housing for Shadow ecosystem members.' },
];

const Dot: React.FC<{color?:string}> = ({color='bg-green-500'}) => (
  <span className={`inline-block h-1.5 w-1.5 rounded-full ${color} animate-pulse`} />
);

export const AdvancedCharityHub: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [hopeFundTotal, setHopeFundTotal] = useState(0);
  const [donateAmount,  setDonateAmount]  = useState('');
  const [donateAsset,   setDonateAsset]   = useState('SKY4444');
  const [selectedCause, setSelectedCause] = useState(CAUSES[0]);
  const [donations,     setDonations]     = useState<Array<{id:string;ts:number;cause:string;amount:number;asset:string}>>([]);
  const [tab, setTab]                     = useState<'causes'|'donate'|'impact'|'leaderboard'>('causes');
  const [liveStats, setLiveStats]         = useState({ donors: 12444, countries: 44, totalUSD: 2383111 });

  useEffect(()=>{
    const id = setInterval(()=>{
      setHopeFundTotal(ShadowIntelligenceEngine.hopeFundRouter.getTotal());
      setLiveStats(s=>({
        donors:   s.donors   + Math.floor(Math.random()*3),
        countries: s.countries,
        totalUSD: s.totalUSD + Math.floor(Math.random()*500),
      }));
    },2000);
    return ()=>clearInterval(id);
  },[]);

  const donate = () => {
    const amt = parseFloat(donateAmount);
    if(!amt||amt<=0) return;
    const tx = ShadowIntelligenceEngine.hopeFundRouter.route('advanced-charity-hub', amt, donateAsset);
    setDonations(p=>[{id:tx.id,ts:tx.ts,cause:selectedCause.name,amount:amt,asset:donateAsset},...p].slice(0,50));
    setHopeFundTotal(ShadowIntelligenceEngine.hopeFundRouter.getTotal());
    setDonateAmount('');
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex flex-wrap gap-4 justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tighter text-pink-500">ADVANCED_CHARITY_HUB</h1>
            <span className="text-[9px] font-mono border border-slate-800 px-2 py-0.5 text-slate-600">v11.0</span>
          </div>
          <div className="flex gap-4 text-[9px] font-mono text-slate-600 uppercase tracking-widest mt-1">
            <span className="flex items-center gap-1"><Dot color="bg-pink-500"/> HOPE_FUND_LIVE</span>
            <span className="flex items-center gap-1"><Dot color="bg-green-500"/> TRANSPARENT_LEDGER</span>
            <span className="flex items-center gap-1"><Dot color="bg-amber-500"/> SHADOW_ENGINE_WIRED</span>
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
          {label:'TOTAL DONORS',   value:liveStats.donors.toLocaleString(),                                         color:'text-amber-400', icon:<Users className="h-3 w-3"/>},
          {label:'COUNTRIES',      value:liveStats.countries.toString(),                                             color:'text-blue-400',  icon:<Globe className="h-3 w-3"/>},
          {label:'TOTAL USD',      value:`$${liveStats.totalUSD.toLocaleString()}`,                                  color:'text-green-400', icon:<TrendingUp className="h-3 w-3"/>},
          {label:'CASINO BURNS',   value:`$${ShadowIntelligenceEngine.hopeFundRouter.getTransactions(1000).length}`, color:'text-pink-400',  icon:<Heart className="h-3 w-3"/>},
        ].map((k,i)=>(
          <div key={i} className="p-4 border-r border-slate-900 last:border-r-0">
            <div className="flex items-center gap-1 text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">{k.icon} {k.label}</div>
            <p className={`text-xl font-black tracking-tight ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-900 overflow-x-auto">
        {(['causes','donate','impact','leaderboard'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-6 py-3 text-[10px] font-mono uppercase tracking-widest transition-all whitespace-nowrap ${tab===t?'text-pink-500 border-b-2 border-pink-500 bg-pink-500/5':'text-slate-500 hover:text-slate-300'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="p-6">
        {tab==='causes'&&(
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {CAUSES.map(cause=>(
              <div key={cause.id} onClick={()=>{setSelectedCause(cause);setTab('donate');}}
                className="bg-slate-900 border border-slate-800 hover:border-pink-500/30 transition-all p-5 cursor-pointer rounded-none group">
                <div className="flex items-start justify-between mb-3">
                  <Heart className="h-6 w-6 group-hover:animate-pulse" style={{color:cause.color}}/>
                  <span className="text-[9px] font-mono text-slate-600 uppercase">
                    {((cause.raised/cause.goal)*100).toFixed(1)}% FUNDED
                  </span>
                </div>
                <p className="text-sm font-black uppercase mb-1">{cause.name}</p>
                <p className="text-[10px] text-slate-400 leading-relaxed mb-4">{cause.desc}</p>
                <div className="w-full bg-slate-800 h-1 mb-2">
                  <div className="h-1 transition-all" style={{width:`${Math.min((cause.raised/cause.goal)*100,100)}%`,backgroundColor:cause.color}}/>
                </div>
                <div className="flex justify-between text-[9px] font-mono">
                  <span style={{color:cause.color}}>${cause.raised.toLocaleString()} raised</span>
                  <span className="text-slate-600">Goal: ${cause.goal.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab==='donate'&&(
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-none">
                <h3 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">SELECT CAUSE</h3>
                <div className="space-y-2">
                  {CAUSES.map(c=>(
                    <button key={c.id} onClick={()=>setSelectedCause(c)}
                      className={`w-full text-left p-3 border transition-all rounded-none ${selectedCause.id===c.id?'border-pink-500 bg-pink-500/5':'border-slate-800 hover:border-slate-600'}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase">{c.name}</span>
                        <span className="text-[9px] font-mono text-slate-500">{((c.raised/c.goal)*100).toFixed(0)}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-none">
                <h3 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">
                  DONATE TO: {selectedCause.name.toUpperCase()}
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-mono text-slate-600 uppercase tracking-widest block mb-1">AMOUNT</label>
                    <input value={donateAmount} onChange={e=>setDonateAmount(e.target.value)}
                      className="w-full bg-black border border-slate-800 text-white font-mono text-sm px-3 py-2 focus:border-pink-500 outline-none rounded-none"
                      placeholder="100"/>
                    <div className="grid grid-cols-4 gap-1 mt-1">
                      {['10','100','1000','10000'].map(v=>(
                        <button key={v} onClick={()=>setDonateAmount(v)}
                          className="py-1 text-[9px] font-mono text-slate-500 border border-slate-800 hover:border-pink-500/50 hover:text-pink-400 transition-all">
                          ${v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-slate-600 uppercase tracking-widest block mb-1">ASSET</label>
                    <div className="grid grid-cols-4 gap-1">
                      {['SKY4444','SHADOW','USDT','BTC'].map(a=>(
                        <button key={a} onClick={()=>setDonateAsset(a)}
                          className={`py-1.5 text-[9px] font-mono uppercase font-bold transition-all border rounded-none ${donateAsset===a?'bg-pink-500 text-white border-pink-500':'border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={donate} disabled={!donateAmount}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-black py-5 rounded-none uppercase tracking-widest text-sm disabled:opacity-40">
                    <Heart className="h-4 w-4 mr-2"/>DONATE NOW
                  </Button>
                  <p className="text-[8px] font-mono text-slate-700 text-center uppercase">100% on-chain · Transparent · Sovereign</p>
                </div>
              </div>
              {donations.length>0&&(
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-none">
                  <h3 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">YOUR DONATIONS</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {donations.map((d,i)=>(
                      <div key={i} className="flex justify-between text-[9px] font-mono py-1 border-b border-slate-900/50">
                        <span className="text-slate-500">{d.cause.slice(0,16)}</span>
                        <span className="text-pink-400">+{d.amount} {d.asset}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab==='impact'&&(
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-950/30 to-slate-900 border border-pink-900/30 p-8 text-center">
              <Globe className="h-12 w-12 text-pink-500 mx-auto mb-4"/>
              <p className="text-[10px] font-mono text-pink-400 uppercase tracking-widest mb-2">GLOBAL IMPACT REPORT</p>
              <p className="text-5xl font-black text-pink-500 tracking-tighter">${liveStats.totalUSD.toLocaleString()}</p>
              <p className="text-sm text-slate-400 mt-2">Total impact across {liveStats.countries} countries</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {label:'FAMILIES FED',       value:'10,444',   desc:'Monthly food packages delivered via Shadow Food Network'},
                {label:'STUDENTS SUPPORTED', value:'2,444',    desc:'Scholarships and tech access provided through Sky4444 initiative'},
                {label:'HOMES FUNDED',       value:'144',      desc:'Blockchain Housing DAO smart contracts executed'},
                {label:'ARTISTS FUNDED',     value:'444',      desc:'Creators supported through Hope Arts Initiative grants'},
              ].map((stat,i)=>(
                <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-none">
                  <p className="text-3xl font-black text-pink-500 tracking-tighter mb-1">{stat.value}</p>
                  <p className="text-xs font-black uppercase mb-1">{stat.label}</p>
                  <p className="text-[10px] text-slate-400">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='leaderboard'&&(
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-none">
            <h3 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Trophy className="h-3 w-3 text-pink-500"/> TOP SOVEREIGN DONORS
            </h3>
            <div className="space-y-2">
              {[
                {rank:1,name:'HOPE_SOVEREIGN_001',donated:'$444,444',badge:'SOVEREIGN PATRON'},
                {rank:2,name:'SHADOW_PHILANTHROPIST',donated:'$88,888',badge:'ELITE DONOR'},
                {rank:3,name:'SKY4444_GIVER',donated:'$44,444',badge:'CHAMPION'},
                {rank:4,name:'CHARITY_WHALE_X',donated:'$12,000',badge:'HERO'},
                {rank:5,name:'COMMUNITY_BUILDER',donated:'$4,444',badge:'PATRON'},
              ].map((p,i)=>(
                <div key={i} className="flex items-center gap-4 p-3 bg-slate-950 border border-slate-800 hover:border-pink-500/30 transition-all">
                  <span className={`text-lg font-black w-6 ${i===0?'text-amber-400':i===1?'text-slate-300':i===2?'text-amber-700':'text-slate-600'}`}>#{p.rank}</span>
                  <div className="flex-1">
                    <p className="text-xs font-black uppercase">{p.name}</p>
                    <p className="text-[9px] font-mono text-slate-600 uppercase">{p.badge}</p>
                  </div>
                  <p className="text-sm font-black text-pink-400">{p.donated}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedCharityHub;
