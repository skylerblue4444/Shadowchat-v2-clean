import React, { useState } from 'react';
import { Shield, Zap, DollarSign, CheckCircle, Star, Package, Lock, Eye, Wifi, Smartphone, Globe, ArrowRight } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const PLANS = [
  {
    id: 'free', name: 'Shadow Free', price: '$0', period: 'forever',
    features: ['Basic VPN (1 device)', 'Password manager', 'Breach alerts', 'Ad blocker'],
    color: 'slate', cta: 'GET FREE',
  },
  {
    id: 'basic', name: 'Sky Protect', price: '$4.99', period: '/mo',
    features: ['VPN (5 devices)', 'Dark web monitoring', 'Identity alerts', 'Phone tracker', 'Firewall', '24/7 support'],
    color: 'blue', cta: 'START $4.99/MO', badge: 'POPULAR',
  },
  {
    id: 'pro', name: 'Sovereign Shield', price: '$9.99', period: '/mo',
    features: ['Unlimited VPN', 'Full device monitoring', 'Real-time threat feed', 'Anonymous payments', 'Privacy vault', 'AI threat analysis', 'Crypto wallet guard', 'Priority support'],
    color: 'amber', cta: 'GO SOVEREIGN', badge: 'BEST VALUE',
  },
];

const QUICK_TOOLS = [
  { name: 'IP Leak Test', icon: Globe, desc: 'Check if your real IP is exposed', action: 'RUN TEST', result: 'IP HIDDEN ✓' },
  { name: 'DNS Leak Test', icon: Wifi, desc: 'Verify DNS queries are private', action: 'RUN TEST', result: 'DNS SECURE ✓' },
  { name: 'Password Strength', icon: Lock, desc: 'Check your password strength', action: 'CHECK', result: 'STRONG ✓' },
  { name: 'Breach Check', icon: Eye, desc: 'See if your email was leaked', action: 'SCAN', result: 'CLEAN ✓' },
];

export default function CheapQuickProtectionSuite() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [selected, setSelected] = useState('basic');
  const [toolResults, setToolResults] = useState<Record<string, string>>({});

  const runTool = (name: string, result: string) => {
    setTimeout(() => setToolResults(prev => ({ ...prev, [name]: result })), 800);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-black flex items-center gap-2"><Shield className="h-6 w-6 text-blue-500" /> CHEAP_QUICK_PROTECTION</h1>
        <p className="text-slate-500 text-xs mt-1">Affordable security suite · Built fast · SKY444 Protect · Wave 19</p>
      </div>

      {/* Quick Tools */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {QUICK_TOOLS.map(tool => {
          const Icon = tool.icon;
          const result = toolResults[tool.name];
          return (
            <div key={tool.name} className="bg-slate-900 border border-slate-800 p-4">
              <Icon className="h-5 w-5 text-blue-500 mb-2" />
              <div className="text-xs font-bold mb-1">{tool.name}</div>
              <div className="text-[10px] text-slate-500 mb-3">{tool.desc}</div>
              {result ? (
                <div className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> {result}
                </div>
              ) : (
                <button onClick={() => runTool(tool.name, tool.result)} className="text-[10px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1">
                  {tool.action} <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Pricing */}
      <h2 className="text-sm font-bold text-slate-400 uppercase mb-4">Protection Plans — Cheap & Quick</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map(plan => (
          <div key={plan.id} onClick={() => setSelected(plan.id)} className={`border p-6 cursor-pointer transition-all relative ${selected === plan.id ? `border-${plan.color}-600 bg-${plan.color}-950/20` : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}>
            {plan.badge && (
              <div className={`absolute -top-2 left-4 text-[9px] font-black px-2 py-0.5 bg-${plan.color}-600 text-white`}>{plan.badge}</div>
            )}
            <div className="mb-4">
              <div className="text-sm font-bold mb-1">{plan.name}</div>
              <div className={`text-3xl font-black text-${plan.color}-400`}>{plan.price}<span className="text-sm font-normal text-slate-500">{plan.period}</span></div>
            </div>
            <div className="space-y-2 mb-6">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
            <button className={`w-full py-3 font-black text-xs uppercase tracking-widest transition-all ${selected === plan.id ? `bg-${plan.color}-600 hover:bg-${plan.color}-700 text-white` : 'border border-slate-700 text-slate-400 hover:border-slate-500'}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-slate-900 border border-slate-800 p-4 flex items-center gap-3">
        <Zap className="h-5 w-5 text-amber-500 flex-shrink-0" />
        <div>
          <div className="text-xs font-bold">Built cheap & quick — just like you asked</div>
          <div className="text-[10px] text-slate-500">All tools are mock/demo. Production requires real VPN API, breach DB integration, and device agent install.</div>
        </div>
      </div>
    </div>
  );
}
