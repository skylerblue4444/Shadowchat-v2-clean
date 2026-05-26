import React, { useState, useEffect } from 'react';
import { Server, Database, Wifi, AlertTriangle, CheckCircle, Clock, RefreshCw, Cpu, HardDrive, Activity } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const SERVICES = [
  { name: 'API Gateway', status: 'healthy', latency: 12, uptime: 99.97, region: 'us-east-1' },
  { name: 'Auth Service', status: 'healthy', latency: 8, uptime: 99.99, region: 'us-east-1' },
  { name: 'Trading Engine', status: 'healthy', latency: 3, uptime: 99.95, region: 'us-east-1' },
  { name: 'WebSocket Hub', status: 'healthy', latency: 1, uptime: 99.98, region: 'global' },
  { name: 'PostgreSQL', status: 'healthy', latency: 2, uptime: 99.99, region: 'us-east-1' },
  { name: 'Redis Cache', status: 'warning', latency: 45, uptime: 99.80, region: 'us-east-1' },
  { name: 'CDN Edge', status: 'healthy', latency: 5, uptime: 100.00, region: 'global' },
  { name: 'AI Inference', status: 'healthy', latency: 280, uptime: 99.90, region: 'us-west-2' },
  { name: 'Media Storage', status: 'healthy', latency: 18, uptime: 99.99, region: 'global' },
  { name: 'Email Service', status: 'healthy', latency: 120, uptime: 99.85, region: 'us-east-1' },
];

export default function DevOpsMonitor() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); setLastRefresh(new Date()); }, 1200);
  };

  const healthy = SERVICES.filter(s => s.status === 'healthy').length;
  const warnings = SERVICES.filter(s => s.status === 'warning').length;

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Server className="h-6 w-6 text-blue-500" /> DEVOPS_MONITOR</h1>
          <p className="text-slate-500 text-xs mt-1">Infrastructure health · Wave 19 · Last: {lastRefresh.toLocaleTimeString()}</p>
        </div>
        <button onClick={refresh} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-bold transition-all">
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-950/30 border border-green-800 p-4 text-center">
          <div className="text-3xl font-black text-green-400">{healthy}</div>
          <div className="text-xs text-green-600">Healthy</div>
        </div>
        <div className="bg-yellow-950/30 border border-yellow-800 p-4 text-center">
          <div className="text-3xl font-black text-yellow-400">{warnings}</div>
          <div className="text-xs text-yellow-600">Warning</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 text-center">
          <div className="text-3xl font-black text-white">{SERVICES.length}</div>
          <div className="text-xs text-slate-500">Total Services</div>
        </div>
      </div>

      <div className="space-y-2">
        {SERVICES.map(svc => (
          <div key={svc.name} className={`flex items-center justify-between p-4 border ${svc.status === 'warning' ? 'border-yellow-800 bg-yellow-950/10' : 'border-slate-800 bg-slate-900'}`}>
            <div className="flex items-center gap-3">
              {svc.status === 'healthy' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-yellow-500" />}
              <div>
                <div className="text-sm font-bold">{svc.name}</div>
                <div className="text-[10px] text-slate-500">{svc.region}</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <div className="text-center">
                <div className={`font-bold ${svc.latency > 100 ? 'text-yellow-400' : 'text-green-400'}`}>{svc.latency}ms</div>
                <div className="text-[9px] text-slate-600">Latency</div>
              </div>
              <div className="text-center">
                <div className={`font-bold ${svc.uptime >= 99.9 ? 'text-green-400' : 'text-yellow-400'}`}>{svc.uptime}%</div>
                <div className="text-[9px] text-slate-600">Uptime</div>
              </div>
              <span className={`text-[9px] px-2 py-0.5 border font-bold ${svc.status === 'healthy' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>
                {svc.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
