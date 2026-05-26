import React, { useState } from 'react';
import { Search, Database, Eye, AlertTriangle, CheckCircle, ArrowRight, Link, Zap, Shield } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const MOCK_TRACE = [
  { step: 1, address: '0x4444...sky444', amount: '1.0 BTC', type: 'ORIGIN', risk: 'CLEAN', exchange: 'Coinbase' },
  { step: 2, address: '0xABCD...1234', amount: '0.99 BTC', type: 'TRANSFER', risk: 'CLEAN', exchange: 'Unknown' },
  { step: 3, address: '0xSHAD...OW44', amount: '0.98 BTC', type: 'MIXER', risk: 'FLAGGED', exchange: 'Mixer' },
  { step: 4, address: '0xGHOS...T444', amount: '0.97 BTC', type: 'TRANSFER', risk: 'UNKNOWN', exchange: 'Unknown' },
  { step: 5, address: '0xDEST...ADDR', amount: '0.96 BTC', type: 'DESTINATION', risk: 'CLEAN', exchange: 'Binance' },
];

export default function BlockchainForensicsLab() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [query, setQuery] = useState('');
  const [traced, setTraced] = useState(false);
  const [tracing, setTracing] = useState(false);

  const trace = () => {
    setTracing(true);
    setTimeout(() => { setTracing(false); setTraced(true); }, 1500);
  };

  const riskColor = (risk: string) => risk === 'CLEAN' ? 'text-green-400 border-green-800' : risk === 'FLAGGED' ? 'text-red-400 border-red-800' : 'text-yellow-400 border-yellow-800';

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-black flex items-center gap-2"><Database className="h-6 w-6 text-purple-500" /> BLOCKCHAIN_FORENSICS_LAB</h1>
        <p className="text-slate-500 text-xs mt-1">On-chain transaction tracing · Address clustering · Wave 19 Mock</p>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-700 px-4">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            className="flex-1 bg-transparent py-3 text-sm outline-none placeholder-slate-600 font-mono"
            placeholder="Enter BTC/ETH address or TX hash..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <button onClick={trace} disabled={tracing} className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-800 text-white font-bold text-sm px-6 transition-all">
          {tracing ? 'TRACING...' : 'TRACE'}
        </button>
      </div>

      {traced && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-900 border border-slate-800 p-3 text-center">
              <div className="text-xl font-black text-purple-400">5</div>
              <div className="text-[10px] text-slate-500">Hops Traced</div>
            </div>
            <div className="bg-red-950/20 border border-red-900 p-3 text-center">
              <div className="text-xl font-black text-red-400">1</div>
              <div className="text-[10px] text-slate-500">Flagged Addresses</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 text-center">
              <div className="text-xl font-black text-green-400">0.96 BTC</div>
              <div className="text-[10px] text-slate-500">Final Amount</div>
            </div>
          </div>

          <div className="space-y-2">
            {MOCK_TRACE.map((hop, i) => (
              <div key={hop.step} className={`flex items-center gap-4 p-4 border ${hop.risk === 'FLAGGED' ? 'border-red-800 bg-red-950/10' : 'border-slate-800 bg-slate-900'}`}>
                <div className="text-slate-600 font-bold w-6">{hop.step}</div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-blue-400">{hop.address}</div>
                  <div className="text-[10px] text-slate-500">{hop.exchange} · {hop.type}</div>
                </div>
                <div className="text-xs font-bold text-white">{hop.amount}</div>
                <span className={`text-[9px] font-black px-2 py-0.5 border ${riskColor(hop.risk)}`}>{hop.risk}</span>
                {i < MOCK_TRACE.length - 1 && <ArrowRight className="h-4 w-4 text-slate-600" />}
              </div>
            ))}
          </div>

          <div className="bg-amber-950/30 border border-amber-800 p-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
              <AlertTriangle className="h-4 w-4" /> Mixer Detected at Hop 3
            </div>
            <p className="text-xs text-slate-400">Funds passed through a known mixing service. Chain analysis confidence reduced to 60% after this point.</p>
          </div>
        </div>
      )}

      {!traced && !tracing && (
        <div className="text-center py-12 text-slate-700">
          <Database className="h-12 w-12 mx-auto mb-3" />
          <p className="text-sm">Enter an address or TX hash to begin forensic trace</p>
          <p className="text-xs mt-1">Supports BTC, ETH, SOL, and 20+ chains</p>
        </div>
      )}
    </div>
  );
}
