import React, { useState, useEffect } from 'react';
import { Server, Database, Wifi, Cpu, HardDrive, Globe, Activity, AlertTriangle, CheckCircle, Zap, RefreshCw, TrendingUp, Shield, Cloud } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const INFRA = {
  compute: [
    { name: 'API-01 (us-east-1)', type: 'c5.4xlarge', cpu: 34, mem: 67, status: 'RUNNING', uptime: '99.97%' },
    { name: 'API-02 (us-east-1)', type: 'c5.4xlarge', cpu: 28, mem: 61, status: 'RUNNING', uptime: '99.97%' },
    { name: 'TRADE-01 (us-east-1)', type: 'c5.9xlarge', cpu: 78, mem: 82, status: 'RUNNING', uptime: '99.99%' },
    { name: 'AI-01 (us-west-2)', type: 'g4dn.xlarge', cpu: 91, mem: 88, status: 'HIGH_LOAD', uptime: '99.90%' },
    { name: 'WORKER-01 (eu-west-1)', type: 'c5.2xlarge', cpu: 45, mem: 54, status: 'RUNNING', uptime: '99.95%' },
  ],
  databases: [
    { name: 'PG-Primary (us-east-1)', type: 'PostgreSQL 15', size: '840 GB', connections: '234/500', status: 'HEALTHY' },
    { name: 'PG-Replica-1 (us-east-1)', type: 'PostgreSQL 15', size: '840 GB', connections: '89/500', status: 'HEALTHY' },
    { name: 'Redis-Cluster (global)', type: 'Redis 7.2', size: '24 GB', connections: '1,204/5000', status: 'HEALTHY' },
    { name: 'ClickHouse (analytics)', type: 'ClickHouse 23', size: '2.4 TB', connections: '12/100', status: 'HEALTHY' },
  ],
  cdn: [
    { region: 'US East', latency: '8ms', requests: '2.4M/hr', bandwidth: '840 Gbps', status: 'OPTIMAL' },
    { region: 'EU West', latency: '12ms', requests: '1.8M/hr', bandwidth: '620 Gbps', status: 'OPTIMAL' },
    { region: 'Asia Pacific', latency: '24ms', requests: '2.1M/hr', bandwidth: '720 Gbps', status: 'OPTIMAL' },
  ],
};

export default function InfrastructureCommandCenter() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'compute' | 'databases' | 'cdn' | 'costs'>('compute');
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1200); };

  const totalMonthlyCost = 48420;

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Server className="h-6 w-6 text-blue-500" /> INFRASTRUCTURE_COMMAND</h1>
          <p className="text-slate-500 text-xs mt-1">Full platform infrastructure · AWS · Wave 20</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-xl font-black text-red-400">${totalMonthlyCost.toLocaleString()}/mo</div>
            <div className="text-[10px] text-slate-500">Infrastructure Cost</div>
          </div>
          <button onClick={refresh} className="flex items-center gap-2 border border-slate-700 text-slate-400 px-3 py-2 text-xs font-bold hover:border-slate-500 transition-all">
            <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </div>

      {/* Health Summary */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { label: 'Compute', healthy: 4, total: 5, icon: Cpu },
          { label: 'Databases', healthy: 4, total: 4, icon: Database },
          { label: 'CDN Nodes', healthy: 3, total: 3, icon: Globe },
          { label: 'Overall Health', healthy: 99, total: 100, icon: Activity, pct: true },
        ].map(({ label, healthy, total, icon: Icon, pct }) => (
          <div key={label} className={`border p-3 text-center ${healthy < total ? 'border-yellow-800 bg-yellow-950/10' : 'border-green-800 bg-green-950/10'}`}>
            <Icon className={`h-4 w-4 mx-auto mb-1 ${healthy < total ? 'text-yellow-500' : 'text-green-500'}`} />
            <div className={`text-lg font-black ${healthy < total ? 'text-yellow-400' : 'text-green-400'}`}>{pct ? `${healthy}%` : `${healthy}/${total}`}</div>
            <div className="text-[9px] text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-4">
        {(['compute', 'databases', 'cdn', 'costs'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      {tab === 'compute' && (
        <div className="space-y-2">
          {INFRA.compute.map(node => (
            <div key={node.name} className={`border p-4 ${node.status === 'HIGH_LOAD' ? 'border-yellow-800 bg-yellow-950/10' : 'border-slate-800 bg-slate-900'}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-bold">{node.name}</div>
                  <div className="text-[10px] text-slate-500">{node.type} · Uptime: {node.uptime}</div>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 border ${node.status === 'RUNNING' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>{node.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-[9px] mb-1"><span className="text-slate-500">CPU</span><span className={node.cpu > 80 ? 'text-red-400 font-bold' : 'text-white'}>{node.cpu}%</span></div>
                  <div className="bg-slate-800 h-2"><div className={`h-full ${node.cpu > 80 ? 'bg-red-500' : node.cpu > 60 ? 'bg-yellow-500' : 'bg-blue-500'}`} style={{width:`${node.cpu}%`}} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] mb-1"><span className="text-slate-500">Memory</span><span className={node.mem > 85 ? 'text-red-400 font-bold' : 'text-white'}>{node.mem}%</span></div>
                  <div className="bg-slate-800 h-2"><div className={`h-full ${node.mem > 85 ? 'bg-red-500' : node.mem > 70 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{width:`${node.mem}%`}} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'databases' && (
        <div className="space-y-2">
          {INFRA.databases.map(db => (
            <div key={db.name} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm font-bold">{db.name}</div>
                  <div className="text-[10px] text-slate-500">{db.type} · Size: {db.size}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <div className="text-center"><div className="font-bold text-white">{db.connections}</div><div className="text-[9px] text-slate-500">Connections</div></div>
                <span className="text-[9px] font-black px-2 py-0.5 border border-green-800 text-green-400">{db.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'cdn' && (
        <div className="space-y-2">
          {INFRA.cdn.map(node => (
            <div key={node.region} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-sm font-bold">{node.region}</div>
                  <div className="text-[10px] text-slate-500">{node.requests} requests/hr</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <div className="text-center"><div className="font-bold text-green-400">{node.latency}</div><div className="text-[9px] text-slate-500">Latency</div></div>
                <div className="text-center"><div className="font-bold text-blue-400">{node.bandwidth}</div><div className="text-[9px] text-slate-500">Bandwidth</div></div>
                <span className="text-[9px] font-black px-2 py-0.5 border border-green-800 text-green-400">{node.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'costs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 text-center"><div className="text-2xl font-black text-red-400">${totalMonthlyCost.toLocaleString()}</div><div className="text-xs text-slate-500">Monthly Total</div></div>
            <div className="bg-slate-900 border border-slate-800 p-4 text-center"><div className="text-2xl font-black text-amber-400">$1,614/day</div><div className="text-xs text-slate-500">Daily Average</div></div>
            <div className="bg-green-950/20 border border-green-800 p-4 text-center"><div className="text-2xl font-black text-green-400">8.8x</div><div className="text-xs text-slate-500">Revenue/Cost Ratio</div></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4">
            <h3 className="text-[10px] text-slate-500 uppercase mb-3">Cost Breakdown</h3>
            {[
              { item: 'EC2 Compute', cost: '$18,400', pct: 38 },
              { item: 'RDS Databases', cost: '$12,800', pct: 26 },
              { item: 'CloudFront CDN', cost: '$8,200', pct: 17 },
              { item: 'S3 Storage', cost: '$4,820', pct: 10 },
              { item: 'Other AWS', cost: '$4,200', pct: 9 },
            ].map(c => (
              <div key={c.item} className="flex items-center gap-3 mb-2">
                <span className="text-[10px] text-slate-400 w-36">{c.item}</span>
                <div className="flex-1 bg-slate-800 h-2"><div className="h-full bg-red-500" style={{width:`${c.pct}%`}} /></div>
                <span className="text-[10px] text-red-400 w-16 text-right font-bold">{c.cost}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
