import React, { useState } from 'react';
import { Code2, Zap, Package, Play, Download, Copy, CheckCircle, Smartphone, Globe, DollarSign } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const TEMPLATES = [
  { id: 'tip-jar', name: 'Crypto Tip Jar', desc: 'Accept BTC/ETH tips with QR code', icon: '💰', price: 'FREE', time: '2 min' },
  { id: 'link-tree', name: 'Link Hub', desc: 'All your links in one page', icon: '🔗', price: 'FREE', time: '1 min' },
  { id: 'nft-gallery', name: 'NFT Gallery', desc: 'Showcase your NFT collection', icon: '🖼️', price: 'FREE', time: '3 min' },
  { id: 'merch-store', name: 'Merch Store', desc: 'Sell products with crypto checkout', icon: '🛍️', price: '$9', time: '5 min' },
  { id: 'booking', name: 'Booking Page', desc: 'Schedule calls & services', icon: '📅', price: '$9', time: '4 min' },
  { id: 'paywall', name: 'Content Paywall', desc: 'Lock content behind crypto payment', icon: '🔒', price: '$19', time: '5 min' },
  { id: 'dao-vote', name: 'DAO Voting', desc: 'Simple token-gated voting', icon: '🗳️', price: '$29', time: '8 min' },
  { id: 'referral', name: 'Referral Program', desc: 'Viral referral with crypto rewards', icon: '🚀', price: '$29', time: '6 min' },
];

const CODE_PREVIEW = `// SKY444 Mini App — Crypto Tip Jar
import { useState } from 'react';
import { QRCode } from 'sky444-sdk';

export default function TipJar() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [amount, setAmount] = useState('0.001');
  const wallet = '0x4444...sky444';
  
  return (
    <div className="tip-jar">
      <h1>Support My Work 💰</h1>
      <QRCode 
        address={wallet}
        amount={amount}
        coin="ETH"
      />
      <input value={amount} onChange={e => setAmount(e.target.value)} />
      <button>Send Tip</button>
    </div>
  );
}`;

export default function MiniAppBuilder() {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [appName, setAppName] = useState('');
  const [copied, setCopied] = useState(false);

  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Zap className="h-6 w-6 text-amber-500" /> MINI_APP_BUILDER
          </h1>
          <p className="text-slate-500 text-xs mt-1">Build & deploy micro-apps in minutes · No code required · SKY444 Platform</p>
        </div>
        <div className="flex gap-3 text-center">
          <div><div className="text-xl font-black text-amber-400">8</div><div className="text-[10px] text-slate-500">Templates</div></div>
          <div><div className="text-xl font-black text-green-400">FREE</div><div className="text-[10px] text-slate-500">To Start</div></div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold ${step >= s ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-500'}`}>
              {s}. {s === 1 ? 'Choose Template' : s === 2 ? 'Customize' : 'Deploy'}
            </div>
            {s < 3 && <div className="h-px w-6 bg-slate-700" />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TEMPLATES.map(t => (
            <div
              key={t.id}
              onClick={() => { setSelected(t.id); setStep(2); }}
              className={`border p-4 cursor-pointer transition-all hover:border-amber-600 ${selected === t.id ? 'border-amber-600 bg-amber-950/20' : 'border-slate-800 bg-slate-900'}`}
            >
              <div className="text-3xl mb-2">{t.icon}</div>
              <div className="text-sm font-bold mb-1">{t.name}</div>
              <div className="text-[10px] text-slate-500 mb-3">{t.desc}</div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black ${t.price === 'FREE' ? 'text-green-400' : 'text-amber-400'}`}>{t.price}</span>
                <span className="text-[10px] text-slate-600">⚡ {t.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400">Customize Your App</h3>
            <div>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">App Name</label>
              <input
                className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none focus:border-amber-600"
                placeholder="My Tip Jar"
                value={appName}
                onChange={e => setAppName(e.target.value)}
              />
            </div>
            {[
              { label: 'Wallet Address', placeholder: '0x4444...sky444' },
              { label: 'Display Name', placeholder: 'SkyBlue Creator' },
              { label: 'Bio', placeholder: 'Support my work!' },
              { label: 'Accent Color', placeholder: '#f59e0b' },
            ].map(f => (
              <div key={f.label}>
                <label className="text-[10px] text-slate-500 uppercase block mb-1">{f.label}</label>
                <input className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm outline-none focus:border-amber-600" placeholder={f.placeholder} />
              </div>
            ))}
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 border border-slate-700 text-slate-400 py-2 text-xs font-bold hover:border-slate-500 transition-all">BACK</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 text-xs font-bold transition-all">NEXT: DEPLOY</button>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Code Preview</span>
              <button onClick={copy} className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-white">
                {copied ? <CheckCircle className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="text-[10px] text-green-400 font-mono overflow-auto leading-relaxed">{CODE_PREVIEW}</pre>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-lg mx-auto text-center space-y-6">
          <div className="p-8 bg-green-950/30 border border-green-800">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-green-400 mb-2">APP DEPLOYED!</h2>
            <p className="text-slate-400 text-sm">Your mini-app is live on the SKY444 platform</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 text-left">
            <div className="text-[10px] text-slate-500 mb-1">Your App URL</div>
            <div className="text-sm font-bold text-amber-400">https://sky444.app/{appName.toLowerCase().replace(/\s/g, '-') || 'my-tip-jar'}</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 hover:border-slate-500 py-3 text-xs font-bold transition-all">
              <Globe className="h-4 w-4" /> Visit
            </button>
            <button className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 hover:border-slate-500 py-3 text-xs font-bold transition-all">
              <Copy className="h-4 w-4" /> Share
            </button>
            <button className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 hover:border-slate-500 py-3 text-xs font-bold transition-all">
              <Code2 className="h-4 w-4" /> Embed
            </button>
          </div>
          <button onClick={() => { setStep(1); setSelected(null); }} className="w-full border border-amber-700 text-amber-400 py-3 text-xs font-bold hover:bg-amber-950/30 transition-all">
            BUILD ANOTHER APP
          </button>
        </div>
      )}
    </div>
  );
}
