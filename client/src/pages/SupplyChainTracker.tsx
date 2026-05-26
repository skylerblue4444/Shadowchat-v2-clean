import React, { useState } from 'react';
import { Package, MapPin, Clock, CheckCircle, Truck, Globe, QrCode, Search, AlertTriangle } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const SHIPMENTS = [
  { id: 'SKY-4444-001', product: 'Hardware Wallet x50', origin: 'Shenzhen, CN', destination: 'Chicago, US', status: 'IN_TRANSIT', eta: 'May 28', progress: 65, blockchain: '0x4444...verified' },
  { id: 'SKY-4444-002', product: 'Server Components', origin: 'Taiwan', destination: 'Chicago, US', status: 'CUSTOMS', eta: 'May 30', progress: 80, blockchain: '0xABCD...verified' },
  { id: 'SKY-4444-003', product: 'Mining Rigs x10', origin: 'Hong Kong', destination: 'Miami, US', status: 'DELIVERED', eta: 'Delivered', progress: 100, blockchain: '0xDEF0...verified' },
  { id: 'SKY-4444-004', product: 'LED Displays x200', origin: 'Seoul, KR', destination: 'New York, US', status: 'PROCESSING', eta: 'Jun 5', progress: 20, blockchain: '0x1234...verified' },
];

const STATUS_STEPS = ['ORDER', 'PROCESSING', 'SHIPPED', 'IN_TRANSIT', 'CUSTOMS', 'DELIVERED'];

export default function SupplyChainTracker() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [selected, setSelected] = useState(SHIPMENTS[0]);
  const [query, setQuery] = useState('');

  const statusColor = (s: string) => s === 'DELIVERED' ? 'text-green-400 border-green-800' : s === 'IN_TRANSIT' ? 'text-blue-400 border-blue-800' : s === 'CUSTOMS' ? 'text-amber-400 border-amber-800' : 'text-slate-400 border-slate-700';

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Package className="h-6 w-6 text-blue-500" /> SUPPLY_CHAIN_TRACKER</h1>
          <p className="text-slate-500 text-xs mt-1">Blockchain-verified shipment tracking · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-blue-400">{SHIPMENTS.length}</div><div className="text-[10px] text-slate-500">Shipments</div></div>
          <div><div className="text-xl font-black text-green-400">1</div><div className="text-[10px] text-slate-500">Delivered</div></div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-700 px-3">
          <Search className="h-4 w-4 text-slate-500" />
          <input className="flex-1 bg-transparent py-2 text-sm outline-none placeholder-slate-600" placeholder="Track by ID or product..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 transition-all">TRACK</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          {SHIPMENTS.map(s => (
            <div key={s.id} onClick={() => setSelected(s)} className={`border p-3 cursor-pointer transition-all ${selected.id === s.id ? 'border-blue-600 bg-blue-950/20' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-blue-400">{s.id}</span>
                <span className={`text-[9px] font-black px-1.5 py-0.5 border ${statusColor(s.status)}`}>{s.status}</span>
              </div>
              <div className="text-[10px] font-bold mb-1">{s.product}</div>
              <div className="text-[9px] text-slate-500">{s.origin} → {s.destination}</div>
              <div className="mt-2 bg-slate-800 h-1.5"><div className={`h-full ${s.status === 'DELIVERED' ? 'bg-green-500' : 'bg-blue-500'}`} style={{width:`${s.progress}%`}} /></div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg font-black">{selected.id}</div>
              <div className="text-slate-500 text-sm">{selected.product}</div>
            </div>
            <span className={`text-xs font-black px-3 py-1 border ${statusColor(selected.status)}`}>{selected.status}</span>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-1 mb-6 overflow-x-auto">
            {STATUS_STEPS.map((step, i) => {
              const stepIdx = STATUS_STEPS.indexOf(selected.status);
              const done = i <= stepIdx;
              return (
                <React.Fragment key={step}>
                  <div className={`flex flex-col items-center flex-shrink-0 ${done ? 'text-green-400' : 'text-slate-600'}`}>
                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-[9px] font-black ${done ? 'border-green-500 bg-green-950/40' : 'border-slate-700'}`}>
                      {done ? '✓' : i + 1}
                    </div>
                    <div className="text-[8px] mt-1 text-center w-12">{step}</div>
                  </div>
                  {i < STATUS_STEPS.length - 1 && <div className={`h-0.5 flex-1 ${i < stepIdx ? 'bg-green-500' : 'bg-slate-700'}`} />}
                </React.Fragment>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: 'Origin', value: selected.origin, icon: MapPin },
              { label: 'Destination', value: selected.destination, icon: MapPin },
              { label: 'ETA', value: selected.eta, icon: Clock },
              { label: 'Progress', value: `${selected.progress}%`, icon: Truck },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-slate-800 p-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-blue-500" />
                <div><div className="text-[10px] text-slate-500">{label}</div><div className="text-xs font-bold">{value}</div></div>
              </div>
            ))}
          </div>

          <div className="bg-slate-800 p-3">
            <div className="text-[10px] text-slate-500 mb-1">Blockchain Verification</div>
            <div className="text-xs font-mono text-green-400 flex items-center gap-2">
              <CheckCircle className="h-3 w-3" /> {selected.blockchain}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
