import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Send, Zap, Shield, TrendingUp, Globe, Bot, RefreshCw, Mic, MicOff } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const QUICK_COMMANDS = [
  { label: 'Market Analysis', prompt: 'Give me a full crypto market analysis for today' },
  { label: 'Trade Signal', prompt: 'What is the best trade setup right now?' },
  { label: 'Security Check', prompt: 'Run a security audit on my portfolio' },
  { label: 'Tax Estimate', prompt: 'Estimate my crypto tax liability for this year' },
  { label: 'Grey Area Intel', prompt: 'What are the top grey area opportunities right now?' },
  { label: 'Wealth Plan', prompt: 'Create a 5-year sovereign wealth plan for $50K' },
];

const MOCK_RESPONSES: Record<string, string> = {
  default: `**Hope AI Analysis — Wave 19**

Based on current market conditions and your portfolio:

**Market Overview:**
- BTC: $47,200 (+3.2%) — Bullish momentum, RSI 58
- ETH: $2,840 (-1.8%) — Consolidating near $2,800 support
- Overall sentiment: 72/100 (Greed)

**Recommended Actions:**
1. Consider adding BTC position at current levels
2. SOL showing strong breakout signal (91% confidence)
3. Take partial profits on recent ETH gains

**Risk Assessment:**
- Portfolio risk score: 6.8/10
- Suggested hedge: 10% USDT position
- Stop-loss recommendations updated

**Grey Area Intel:**
- OTC BTC volume up 34% this week
- New arbitrage opportunity detected: BTC spread $180 across exchanges

*All analysis is for educational purposes. Not financial advice.*`,
};

export default function SovereignAICommandBridge() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: '**Hope AI Command Bridge v19 Online**\n\nI am your sovereign AI assistant. I can analyze markets, run security checks, plan wealth strategies, and navigate grey-area opportunities. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: MOCK_RESPONSES.default }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-900">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-purple-500" />
          <span className="font-black text-sm">HOPE_AI_COMMAND_BRIDGE_v19</span>
          <span className="text-[9px] border border-green-800 text-green-400 px-1.5 py-0.5 font-bold">ONLINE</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setVoiceOn(v => !v)} className={`p-2 border transition-all ${voiceOn ? 'border-purple-600 text-purple-400' : 'border-slate-700 text-slate-500'}`}>
            {voiceOn ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Quick Commands */}
      <div className="flex gap-2 p-3 border-b border-slate-900 overflow-x-auto">
        {QUICK_COMMANDS.map(cmd => (
          <button key={cmd.label} onClick={() => send(cmd.prompt)} className="flex-shrink-0 text-[10px] font-bold border border-slate-700 hover:border-purple-700 text-slate-400 hover:text-purple-400 px-3 py-1.5 transition-all">
            {cmd.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl p-4 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-purple-900/40 border border-purple-800' : 'bg-slate-900 border border-slate-800'}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-3 w-3 text-purple-500" />
                  <span className="text-[9px] text-purple-400 font-bold">HOPE_AI</span>
                </div>
              )}
              <div className="whitespace-pre-wrap text-xs text-slate-300">{msg.content}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 p-4 flex items-center gap-2">
              <RefreshCw className="h-3 w-3 text-purple-500 animate-spin" />
              <span className="text-xs text-slate-500">Hope AI analyzing...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-4 border-t border-slate-900">
        <input
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-purple-600 text-white px-4 py-3 text-sm outline-none"
          placeholder="Ask Hope AI anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button onClick={() => send()} disabled={loading || !input.trim()} className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-800 text-white p-3 transition-all">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
