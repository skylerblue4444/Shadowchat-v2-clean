import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Users, Hash, Lock, Globe, Send, TrendingUp, Zap, Star } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const ROOMS = [
  { id: 'general', name: 'general', type: 'public', members: 12847, icon: Hash, unread: 0 },
  { id: 'trading', name: 'trading-signals', type: 'public', members: 8934, icon: TrendingUp, unread: 3 },
  { id: 'defi', name: 'defi-alpha', type: 'public', members: 4201, icon: Zap, unread: 7 },
  { id: 'vip', name: 'vip-lounge', type: 'private', members: 847, icon: Star, unread: 1 },
  { id: 'grey', name: 'grey-area-intel', type: 'private', members: 312, icon: Lock, unread: 0 },
];

const MOCK_MSGS: Record<string, { user: string; text: string; time: string }[]> = {
  general: [
    { user: 'sky_whale_44', text: 'Wave 20 just dropped 🔥 44 new pages!', time: '2m' },
    { user: 'crypto_dev_x', text: 'Engineer mode is insane, love the terminal', time: '4m' },
    { user: 'hope_ai_bot', text: 'BTC looking bullish, RSI at 58 — accumulation zone', time: '6m' },
  ],
  trading: [
    { user: 'shadow_trader', text: 'SOL breakout confirmed, target $160', time: '1m' },
    { user: 'algo_master', text: 'My bot just executed 47 trades today +$2.4K', time: '3m' },
  ],
  defi: [
    { user: 'yield_farmer', text: 'Aave V3 USDT rate jumped to 5.2%', time: '5m' },
    { user: 'defi_degen', text: 'New protocol offering 48% APY — audited?', time: '8m' },
  ],
  vip: [
    { user: 'diamond_member', text: 'Private OTC deal available, 10 BTC block', time: '10m' },
  ],
  grey: [
    { user: 'anon_intel', text: 'New arbitrage opportunity detected across 3 exchanges', time: '15m' },
  ],
};

export default function SovereignChatRooms() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeRoom, setActiveRoom] = useState('general');
  const [messages, setMessages] = useState(MOCK_MSGS);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, activeRoom]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => ({ ...prev, [activeRoom]: [...(prev[activeRoom] || []), { user: 'you', text: input, time: 'now' }] }));
    setInput('');
  };

  const room = ROOMS.find(r => r.id === activeRoom)!;

  return (
    <div className="bg-slate-950 text-white min-h-screen flex font-sans">
      {/* Sidebar */}
      <div className="w-56 border-r border-slate-900 flex flex-col">
        <div className="p-4 border-b border-slate-900">
          <h1 className="text-sm font-black flex items-center gap-2"><MessageCircle className="h-4 w-4 text-blue-500" /> CHAT_ROOMS</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="text-[9px] text-slate-600 uppercase px-2 mb-1">Public</div>
          {ROOMS.filter(r => r.type === 'public').map(r => {
            const Icon = r.icon;
            return (
              <button key={r.id} onClick={() => setActiveRoom(r.id)} className={`w-full flex items-center justify-between px-2 py-1.5 text-xs transition-all ${activeRoom === r.id ? 'bg-blue-950/40 text-white' : 'text-slate-500 hover:text-white'}`}>
                <div className="flex items-center gap-1.5"><Icon className="h-3 w-3" />{r.name}</div>
                {r.unread > 0 && <div className="h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center text-[9px] font-black">{r.unread}</div>}
              </button>
            );
          })}
          <div className="text-[9px] text-slate-600 uppercase px-2 mt-3 mb-1">Private</div>
          {ROOMS.filter(r => r.type === 'private').map(r => {
            const Icon = r.icon;
            return (
              <button key={r.id} onClick={() => setActiveRoom(r.id)} className={`w-full flex items-center justify-between px-2 py-1.5 text-xs transition-all ${activeRoom === r.id ? 'bg-blue-950/40 text-white' : 'text-slate-500 hover:text-white'}`}>
                <div className="flex items-center gap-1.5"><Icon className="h-3 w-3" />{r.name}</div>
                {r.unread > 0 && <div className="h-4 w-4 bg-amber-600 rounded-full flex items-center justify-center text-[9px] font-black">{r.unread}</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-900">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-blue-500" />
            <span className="font-bold text-sm">{room.name}</span>
            <span className={`text-[9px] px-1.5 py-0.5 border ${room.type === 'private' ? 'border-amber-800 text-amber-400' : 'border-slate-700 text-slate-500'}`}>{room.type}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-500"><Users className="h-3 w-3" />{room.members.toLocaleString()}</div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {(messages[activeRoom] || []).map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.user === 'you' ? 'justify-end' : ''}`}>
              {msg.user !== 'you' && (
                <div className="h-7 w-7 bg-blue-900/40 border border-blue-800 flex items-center justify-center font-black text-blue-400 text-xs flex-shrink-0">{msg.user[0].toUpperCase()}</div>
              )}
              <div className={`max-w-xs ${msg.user === 'you' ? 'bg-blue-900/40 border border-blue-800' : 'bg-slate-900 border border-slate-800'} px-3 py-2`}>
                {msg.user !== 'you' && <div className="text-[10px] text-blue-400 font-bold mb-0.5">@{msg.user}</div>}
                <div className="text-xs">{msg.text}</div>
                <div className="text-[9px] text-slate-600 mt-0.5 text-right">{msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="flex items-center gap-2 p-4 border-t border-slate-900">
          <input className="flex-1 bg-slate-900 border border-slate-800 focus:border-blue-600 text-white px-4 py-2 text-sm outline-none" placeholder={`Message #${room.name}...`} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
          <button onClick={send} className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 transition-all"><Send className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
