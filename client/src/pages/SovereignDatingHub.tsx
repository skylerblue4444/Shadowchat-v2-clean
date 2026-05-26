import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Zap, Shield, Star, MessageCircle, X, Check, Radio, Users } from 'lucide-react';
import { ShadowIntelligenceEngine } from '../lib/shadowIntelligence/ShadowIntelligenceEngine';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const PROFILES = [
  { id:1, name:'Ava_Shadow',    age:24, loc:'Metaverse_Zone_1',   bio:'AI Engineer & Shadow Runner. Looking for strategic alignment and deep tokenomics conversations.',  compat:'98%', tags:['DeFi','AI','Web3'],   online:true,  verified:true  },
  { id:2, name:'Luna_Crypto',   age:27, loc:'Shadow_Pool_City',   bio:'Whale trader & DeFi architect. Let\'s talk tokenomics, governance, and building sovereign futures.', compat:'94%', tags:['Trading','DAO','NFT'], online:true,  verified:true  },
  { id:3, name:'Nova_Sovereign',age:25, loc:'Sky4444_District',   bio:'Blockchain developer and Hope Campus volunteer. Building the future one smart contract at a time.',  compat:'91%', tags:['Dev','Charity','SOL'], online:false, verified:true  },
  { id:4, name:'Zara_Defi',     age:29, loc:'Shadow_Chain_Hub',   bio:'Quantitative analyst and yield optimizer. I speak in APY and dream in liquidity pools.',           compat:'88%', tags:['Quant','Yield','ETH'], online:true,  verified:false },
  { id:5, name:'Mia_Hodl',      age:23, loc:'Bitcoin_Citadel',    bio:'Long-term holder, short-term adventurer. Looking for someone who understands diamond hands.',        compat:'85%', tags:['BTC','HODL','Mining'], online:true,  verified:true  },
  { id:6, name:'Kai_Protocol',  age:31, loc:'Protocol_City',      bio:'Protocol engineer and open-source maximalist. Let\'s build something sovereign together.',           compat:'82%', tags:['Protocol','OSS','ZK'],  online:false, verified:true  },
];

const MESSAGES: Record<number, Array<{from:'me'|'them';text:string;ts:number}>> = {};

const Dot: React.FC<{color?:string}> = ({color='bg-green-500'}) => (
  <span className={`inline-block h-1.5 w-1.5 rounded-full ${color} animate-pulse`} />
);

export const SovereignDatingHub: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeProfile, setActiveProfile] = useState(0);
  const [tab, setTab]                     = useState<'discover'|'matches'|'messages'|'profile'>('discover');
  const [matches,    setMatches]          = useState<typeof PROFILES>([]);
  const [chatTarget, setChatTarget]       = useState<typeof PROFILES[0]|null>(null);
  const [chatMsg,    setChatMsg]          = useState('');
  const [chatHistory,setChatHistory]      = useState<Array<{from:'me'|'them';text:string;ts:number}>>([]);
  const [liveUsers,  setLiveUsers]        = useState(4444);
  const [aiSuggestion, setAiSuggestion]  = useState('');

  const profile = PROFILES[activeProfile];

  useEffect(()=>{
    const id = setInterval(()=>{
      setLiveUsers(u=>Math.max(3000,u+(Math.floor(Math.random()*10)-4)));
    },3000);
    return ()=>clearInterval(id);
  },[]);

  // AI suggestion from signal broadcaster
  useEffect(()=>{
    const unsub = ShadowIntelligenceEngine.signalBroadcaster.subscribe(sig=>{
      if(sig.type==='BUY') setAiSuggestion(`Hope AI: High compatibility signal detected. ${profile.name} shares your ${sig.asset} portfolio strategy.`);
    });
    return unsub;
  },[profile]);

  const swipeRight = () => {
    setMatches(m => m.find(x=>x.id===profile.id) ? m : [...m, profile]);
    setActiveProfile(p=>(p+1)%PROFILES.length);
  };
  const swipeLeft  = () => setActiveProfile(p=>(p+1)%PROFILES.length);

  const sendMessage = () => {
    if(!chatMsg.trim()||!chatTarget) return;
    const msg = {from:'me' as const, text:chatMsg, ts:Date.now()};
    setChatHistory(p=>[...p,msg]);
    setChatMsg('');
    // AI auto-reply
    setTimeout(()=>{
      const replies = [
        `That's fascinating! My ${chatTarget.tags[0]} portfolio is up 44% this cycle.`,
        `Totally agree. The Shadow ecosystem is the most sovereign play right now.`,
        `I've been thinking about that too. Want to co-invest in the Hope Campus Fund?`,
        `Your trading strategy sounds aligned with mine. Let's build something together.`,
      ];
      setChatHistory(p=>[...p,{from:'them',text:replies[Math.floor(Math.random()*replies.length)],ts:Date.now()}]);
    },1000+Math.random()*2000);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex flex-wrap gap-4 justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tighter text-pink-500">SOVEREIGN_DATING</h1>
            <span className="text-[9px] font-mono border border-slate-800 px-2 py-0.5 text-slate-600">v11.0</span>
          </div>
          <div className="flex gap-4 text-[9px] font-mono text-slate-600 uppercase tracking-widest mt-1">
            <span className="flex items-center gap-1"><Dot color="bg-pink-500"/> AI_MATCHING_LIVE</span>
            <span className="flex items-center gap-1"><Dot color="bg-green-500"/> {liveUsers.toLocaleString()} ONLINE</span>
            <span className="flex items-center gap-1"><Dot color="bg-amber-500"/> SHADOW_VERIFIED</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-mono text-pink-400 uppercase tracking-widest">YOUR MATCHES</p>
          <p className="text-4xl font-black text-pink-500 tracking-tighter">{matches.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-900 overflow-x-auto">
        {(['discover','matches','messages','profile'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-6 py-3 text-[10px] font-mono uppercase tracking-widest transition-all whitespace-nowrap ${tab===t?'text-pink-500 border-b-2 border-pink-500 bg-pink-500/5':'text-slate-500 hover:text-slate-300'}`}>
            {t}{t==='matches'&&matches.length>0?` (${matches.length})`:''}
          </button>
        ))}
      </div>

      <div className="p-6">
        {tab==='discover'&&(
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Profile Card */}
            <div className="xl:col-span-5">
              <div className="bg-slate-900 border border-slate-800 relative overflow-hidden" style={{aspectRatio:'3/4'}}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10"/>
                {/* Profile visual */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 border-2 border-pink-500/50 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-black text-pink-400">{profile.name[0]}</span>
                    </div>
                  </div>
                </div>
                {/* Profile Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-black tracking-tighter">{profile.name}</h2>
                        <span className="text-lg font-bold text-slate-400">{profile.age}</span>
                        {profile.verified&&<Shield className="h-4 w-4 text-blue-400"/>}
                        {profile.online&&<Dot color="bg-green-500"/>}
                      </div>
                      <p className="text-slate-400 flex items-center gap-1 text-xs">
                        <MapPin className="h-3 w-3"/> {profile.loc}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-pink-400 font-mono uppercase">Compatibility</p>
                      <p className="text-3xl font-black text-pink-500">{profile.compat}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed mb-3">{profile.bio}</p>
                  <div className="flex gap-2 flex-wrap">
                    {profile.tags.map(tag=>(
                      <span key={tag} className="text-[8px] font-mono uppercase px-2 py-0.5 bg-pink-500/10 border border-pink-500/30 text-pink-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <Button onClick={swipeLeft} className="flex-1 bg-slate-900 border border-slate-700 hover:border-red-500 text-red-400 py-6 rounded-none font-black uppercase">
                  <X className="h-5 w-5 mr-2"/>PASS
                </Button>
                <Button onClick={swipeRight} className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-6 rounded-none font-black uppercase">
                  <Heart className="h-5 w-5 mr-2"/>LIKE
                </Button>
              </div>

              {/* AI Suggestion */}
              {aiSuggestion&&(
                <div className="mt-3 p-3 bg-pink-950/20 border border-pink-900/30 border-l-2 border-l-pink-500">
                  <div className="flex items-center gap-2 mb-1">
                    <Radio className="h-3 w-3 text-pink-500 animate-pulse"/>
                    <span className="text-[9px] font-mono text-pink-400 uppercase">AI MATCH SIGNAL</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{aiSuggestion}</p>
                </div>
              )}
            </div>

            {/* Profile Grid */}
            <div className="xl:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3">
              {PROFILES.map((p,i)=>(
                <div key={p.id} onClick={()=>setActiveProfile(i)}
                  className={`bg-slate-900 border transition-all p-4 cursor-pointer rounded-none ${activeProfile===i?'border-pink-500 bg-pink-500/5':'border-slate-800 hover:border-slate-600'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                      <span className="text-sm font-black text-pink-400">{p.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase">{p.name}</p>
                      <p className="text-[8px] font-mono text-slate-600">{p.age} · {p.loc.split('_')[0]}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-pink-400">{p.compat}</span>
                    <div className="flex items-center gap-1">
                      {p.online&&<Dot color="bg-green-500"/>}
                      {p.verified&&<Shield className="h-3 w-3 text-blue-400"/>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='matches'&&(
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {matches.length===0&&(
              <div className="col-span-3 text-center py-16">
                <Heart className="h-12 w-12 text-slate-700 mx-auto mb-4"/>
                <p className="text-slate-600 font-mono uppercase text-sm">No matches yet — start swiping in Discover</p>
              </div>
            )}
            {matches.map(m=>(
              <div key={m.id} className="bg-slate-900 border border-slate-800 hover:border-pink-500/30 transition-all p-5 rounded-none">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                    <span className="text-lg font-black text-pink-400">{m.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase">{m.name}</p>
                    <p className="text-[9px] font-mono text-slate-500">{m.age} · {m.loc}</p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">{m.bio.slice(0,80)}...</p>
                <div className="flex gap-2">
                  <Button onClick={()=>{setChatTarget(m);setChatHistory(MESSAGES[m.id]??[]);setTab('messages');}}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-none uppercase text-[10px]">
                    <MessageCircle className="h-3 w-3 mr-1"/>MESSAGE
                  </Button>
                  <span className="text-[9px] font-mono text-pink-400 self-center">{m.compat}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab==='messages'&&(
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-[600px]">
            {/* Conversation List */}
            <div className="xl:col-span-1 bg-slate-900 border border-slate-800 overflow-y-auto">
              <div className="p-3 border-b border-slate-800">
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">CONVERSATIONS</p>
              </div>
              {matches.length===0&&<p className="text-slate-600 text-[9px] font-mono text-center p-6">Match someone first</p>}
              {matches.map(m=>(
                <button key={m.id} onClick={()=>{setChatTarget(m);setChatHistory(MESSAGES[m.id]??[]);}}
                  className={`w-full text-left p-3 border-b border-slate-900 hover:bg-slate-800 transition-all ${chatTarget?.id===m.id?'bg-pink-500/5 border-l-2 border-l-pink-500':''}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-sm font-black text-pink-400">{m.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase">{m.name}</p>
                      {m.online&&<span className="text-[8px] text-green-400 font-mono">ONLINE</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Chat Window */}
            <div className="xl:col-span-2 bg-slate-900 border border-slate-800 flex flex-col">
              {!chatTarget?(
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-slate-600 font-mono text-sm uppercase">Select a match to start chatting</p>
                </div>
              ):(
                <>
                  <div className="p-3 border-b border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                      <span className="text-sm font-black text-pink-400">{chatTarget.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase">{chatTarget.name}</p>
                      <p className="text-[8px] font-mono text-pink-400">{chatTarget.compat} COMPATIBLE</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatHistory.length===0&&(
                      <p className="text-slate-600 text-[9px] font-mono text-center py-8">Start the conversation — you matched!</p>
                    )}
                    {chatHistory.map((msg,i)=>(
                      <div key={i} className={`flex ${msg.from==='me'?'justify-end':''}`}>
                        <div className={`max-w-xs p-3 text-[10px] leading-relaxed ${msg.from==='me'?'bg-pink-600 text-white':'bg-slate-800 text-slate-300'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-slate-800 flex gap-2">
                    <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)}
                      onKeyDown={e=>{if(e.key==='Enter')sendMessage();}}
                      className="flex-1 bg-black border border-slate-800 text-white font-mono text-xs px-3 py-2 focus:border-pink-500 outline-none rounded-none"
                      placeholder="Type a message..."/>
                    <Button onClick={sendMessage} className="bg-pink-600 hover:bg-pink-700 text-white rounded-none px-4">
                      <Zap className="h-4 w-4"/>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {tab==='profile'&&(
          <div className="max-w-lg mx-auto space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-none text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 border-2 border-pink-500/50 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black text-pink-400">S</span>
              </div>
              <h2 className="text-xl font-black uppercase mb-1">SKYLER_BLUE</h2>
              <p className="text-[9px] font-mono text-slate-500 uppercase mb-3">SKY4444 · SOVEREIGN MEMBER</p>
              <div className="flex justify-center gap-4 text-[9px] font-mono text-slate-600">
                <span><span className="text-amber-400 font-black">{matches.length}</span> MATCHES</span>
                <span><span className="text-pink-400 font-black">98%</span> MATCH RATE</span>
                <span><span className="text-green-400 font-black">VERIFIED</span></span>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-none">
              <h3 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">SOVEREIGN PROFILE SETTINGS</h3>
              <div className="space-y-3">
                {[
                  {label:'AI MATCHING',     value:'ENABLED',  color:'text-green-400'},
                  {label:'SHADOW VERIFIED', value:'ACTIVE',   color:'text-blue-400'},
                  {label:'PRIVACY MODE',    value:'SOVEREIGN',color:'text-amber-400'},
                  {label:'HOPE FUND DONOR', value:'YES',      color:'text-pink-400'},
                ].map((s,i)=>(
                  <div key={i} className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-600 uppercase">{s.label}</span>
                    <span className={`font-bold ${s.color}`}>{s.value}</span>
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

export default SovereignDatingHub;
