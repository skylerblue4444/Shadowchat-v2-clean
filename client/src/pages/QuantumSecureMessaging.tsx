import React, { useState, useRef, useEffect } from 'react';
import { Lock, Send, Shield, Eye, EyeOff, Trash2, Clock, CheckCheck, Plus, Search } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const CONTACTS = [
  { id: 1, name: 'shadow_trader_44', status: 'online', lastMsg: 'Deal confirmed ✓', time: '2m', unread: 0 },
  { id: 2, name: 'anon_partner_x', status: 'online', lastMsg: 'Sending XMR now', time: '8m', unread: 2 },
  { id: 3, name: 'sky_dev_ghost', status: 'away', lastMsg: 'Contract deployed', time: '1h', unread: 0 },
  { id: 4, name: 'crypto_whale_1', status: 'offline', lastMsg: 'Check the vault', time: '3h', unread: 0 },
];

const MOCK_MESSAGES = [
  { id: 1, from: 'them', text: 'Hey, ready to proceed with the OTC deal?', time: '10:42', read: true },
  { id: 2, from: 'me', text: 'Yes. Sending 2 BTC to escrow now.', time: '10:43', read: true },
  { id: 3, from: 'them', text: 'Confirmed. SKY444 escrow locked. 🔒', time: '10:44', read: true },
  { id: 4, from: 'me', text: 'Perfect. Release when you confirm receipt.', time: '10:45', read: true },
  { id: 5, from: 'them', text: 'Deal confirmed ✓ Great doing business.', time: '10:47', read: true },
];

export default function QuantumSecureMessaging() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeContact, setActiveContact] = useState(CONTACTS[0]);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const [showKeys, setShowKeys] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), from: 'me', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: false }]);
    setInput('');
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex font-sans">
      {/* Sidebar */}
      <div className="w-72 border-r border-slate-900 flex flex-col">
        <div className="p-4 border-b border-slate-900">
          <h1 className="text-sm font-black flex items-center gap-2"><Lock className="h-4 w-4 text-green-500" /> QUANTUM_SECURE_MSG</h1>
          <p className="text-[10px] text-slate-600 mt-0.5">E2E · Double-Ratchet · No logs</p>
        </div>
        <div className="p-3 border-b border-slate-900">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5">
            <Search className="h-3 w-3 text-slate-500" />
            <input className="flex-1 bg-transparent text-xs outline-none placeholder-slate-600" placeholder="Search contacts..." />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONTACTS.map(c => (
            <div key={c.id} onClick={() => setActiveContact(c)} className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-b border-slate-900 ${activeContact.id === c.id ? 'bg-slate-900' : 'hover:bg-slate-900/50'}`}>
              <div className="relative">
                <div className="h-9 w-9 bg-green-900/40 border border-green-800 flex items-center justify-center font-black text-green-400 text-sm">
                  {c.name[0].toUpperCase()}
                </div>
                <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-slate-950 ${c.status === 'online' ? 'bg-green-500' : c.status === 'away' ? 'bg-yellow-500' : 'bg-slate-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold truncate">{c.name}</span>
                  <span className="text-[9px] text-slate-600">{c.time}</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">{c.lastMsg}</div>
              </div>
              {c.unread > 0 && <div className="h-4 w-4 bg-green-600 rounded-full flex items-center justify-center text-[9px] font-black">{c.unread}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-green-900/40 border border-green-800 flex items-center justify-center font-black text-green-400">
              {activeContact.name[0].toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-bold">{activeContact.name}</div>
              <div className="text-[10px] text-green-400">🔒 Encrypted · {activeContact.status}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowKeys(v => !v)} className="p-2 border border-slate-800 hover:border-slate-600 transition-all">
              {showKeys ? <EyeOff className="h-3 w-3 text-slate-500" /> : <Eye className="h-3 w-3 text-slate-500" />}
            </button>
            <button className="p-2 border border-slate-800 hover:border-red-900 transition-all">
              <Trash2 className="h-3 w-3 text-slate-500" />
            </button>
          </div>
        </div>

        {showKeys && (
          <div className="bg-green-950/20 border-b border-green-900 p-3 text-[10px] font-mono text-green-600">
            🔑 Session Key: 4444...sky...shadow...anon · Protocol: Double-Ratchet v10 · PFS: Enabled
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 text-sm ${msg.from === 'me' ? 'bg-green-900/40 border border-green-800' : 'bg-slate-900 border border-slate-800'}`}>
                {msg.text}
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[9px] text-slate-600">{msg.time}</span>
                  {msg.from === 'me' && <CheckCheck className="h-3 w-3 text-green-500" />}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="flex items-center gap-2 p-4 border-t border-slate-900">
          <input
            className="flex-1 bg-slate-900 border border-slate-800 focus:border-green-700 text-white px-4 py-2 text-sm outline-none"
            placeholder="Type encrypted message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <button onClick={send} className="bg-green-600 hover:bg-green-700 text-white p-2.5 transition-all">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
