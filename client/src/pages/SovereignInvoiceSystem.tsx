import React, { useState } from 'react';
import { FileText, DollarSign, Send, CheckCircle, Clock, AlertTriangle, Download, Plus, Eye } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const INVOICES = [
  { id: 'INV-4444-001', client: 'TechCorp Inc', amount: '0.5 ETH', usd: '$1,420', due: 'May 30', status: 'PAID', issued: 'May 15' },
  { id: 'INV-4444-002', client: 'Crypto Startup X', amount: '0.3 ETH', usd: '$852', due: 'Jun 5', status: 'PENDING', issued: 'May 20' },
  { id: 'INV-4444-003', client: 'DeFi Protocol Y', amount: '1.2 ETH', usd: '$3,408', due: 'Jun 15', status: 'OVERDUE', issued: 'May 1' },
  { id: 'INV-4444-004', client: 'NFT Marketplace Z', amount: '0.8 ETH', usd: '$2,272', due: 'Jul 1', status: 'DRAFT', issued: 'May 22' },
];

export default function SovereignInvoiceSystem() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'invoices' | 'create' | 'stats'>('invoices');
  const statusColor = (s: string) => s === 'PAID' ? 'text-green-400 border-green-800' : s === 'PENDING' ? 'text-amber-400 border-amber-800' : s === 'OVERDUE' ? 'text-red-400 border-red-800' : 'text-slate-400 border-slate-700';

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><FileText className="h-6 w-6 text-blue-500" /> INVOICE_SYSTEM</h1>
          <p className="text-slate-500 text-xs mt-1">Crypto invoicing · Instant payment · Wave 20</p>
        </div>
        <button onClick={() => setTab('create')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 transition-all"><Plus className="h-3 w-3" /> New Invoice</button>
      </div>

      <div className="flex gap-1 mb-4">
        {(['invoices', 'create', 'stats'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'invoices' && (
        <div className="space-y-2">
          {INVOICES.map(inv => (
            <div key={inv.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm font-bold">{inv.id}</div>
                  <div className="text-[10px] text-slate-500">{inv.client} · Issued {inv.issued} · Due {inv.due}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-amber-400">{inv.amount}</div>
                  <div className="text-[10px] text-slate-500">{inv.usd}</div>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 border ${statusColor(inv.status)}`}>{inv.status}</span>
                <div className="flex gap-1">
                  <button className="p-1.5 border border-slate-700 hover:border-slate-500 transition-all"><Eye className="h-3 w-3 text-slate-500" /></button>
                  <button className="p-1.5 border border-slate-700 hover:border-slate-500 transition-all"><Download className="h-3 w-3 text-slate-500" /></button>
                  {inv.status === 'PENDING' && <button className="p-1.5 border border-blue-800 hover:bg-blue-950/30 transition-all"><Send className="h-3 w-3 text-blue-400" /></button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'create' && (
        <div className="max-w-md space-y-4">
          {[
            { label: 'Client Name / Company', placeholder: 'Acme Corp' },
            { label: 'Client Email', placeholder: 'client@company.com' },
            { label: 'Service Description', placeholder: 'Smart contract development...' },
            { label: 'Amount (ETH)', placeholder: '0.5' },
            { label: 'Due Date', placeholder: 'Jun 15, 2026' },
            { label: 'Payment Address', placeholder: '0x4444...sky444' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[10px] text-slate-500 uppercase block mb-1">{f.label}</label>
              <input className="w-full bg-slate-900 border border-slate-700 focus:border-blue-600 text-white px-3 py-2 text-sm outline-none" placeholder={f.placeholder} />
            </div>
          ))}
          <div className="flex gap-3">
            <button className="flex-1 border border-slate-700 text-slate-400 py-3 text-xs font-bold hover:border-slate-500 transition-all">SAVE DRAFT</button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-xs font-bold transition-all flex items-center justify-center gap-2"><Send className="h-3 w-3" /> SEND INVOICE</button>
          </div>
        </div>
      )}

      {tab === 'stats' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Invoiced', value: '$7,952', color: 'blue' },
            { label: 'Paid', value: '$1,420', color: 'green' },
            { label: 'Pending', value: '$852', color: 'amber' },
            { label: 'Overdue', value: '$3,408', color: 'red' },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 p-4 text-center">
              <div className={`text-2xl font-black text-${s.color}-400`}>{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
