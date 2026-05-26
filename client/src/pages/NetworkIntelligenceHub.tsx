import React, { useState, useEffect } from 'react';
import { Globe, Wifi, Activity, Map, TrendingUp, Users, Zap, Server } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const NODES = [
  { city: 'Chicago', country: 'US', lat: 41.8, lon: -87.6, users: 12400, status: 'primary', ping: 8 },
  { city: 'New York', country: 'US', lat: 40.7, lon: -74.0, users: 18200, status: 'active', ping: 12 },
  { city: 'London', country: 'UK', lat: 51.5, lon: -0.1, users: 9800, status: 'active', ping: 89 },
  { city: 'Tokyo', country: 'JP', lat: 35.7, lon: 139.7, users: 7600, status: 'active', ping: 142 },
  { city: 'Singapore', country: 'SG', lat: 1.3, lon: 103.8, users: 5400, status: 'active', ping: 178 },
  { city: 'Frankfurt', country: 'DE', lat: 50.1, lon: 8.7, users: 6200, status: 'active', ping: 95 },
  { city: 'Sydney', country: 'AU', lat: -33.9, lon: 151.2, users: 3100, status: 'active', ping: 201 },
  { city: 'Toronto', country: 'CA', lat: 43.7, lon: -79.4, users: 4800, status: 'active', ping: 22 },
];

export default function NetworkIntelligenceHub() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [selected, setSelected] = useState(NODES[0]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    setTotalUsers(NODES.reduce((a, n) => a + n.users, 0));
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Globe className="h-6 w-6 text-blue-500" /> NETWORK_INTEL_HUB</h1>
          <p className="text-slate-500 text-xs mt-1">Global node network · {NODES.length} regions · Wave 19</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-blue-400">{NODES.length}</div><div className="text-[10px] text-slate-500">Nodes</div></div>
          <div><div className="text-xl font-black text-green-400">{(totalUsers / 1000).toFixed(1)}K</div><div className="text-[10px] text-slate-500">Users</div></div>
          <div><div className="text-xl font-black text-amber-400">99.97%</div><div className="text-[10px] text-slate-500">Uptime</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Node List */}
        <div className="space-y-2">
          {NODES.map(node => (
            <div
              key={node.city}
              onClick={() => setSelected(node)}
              className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${selected.city === node.city ? 'border-blue-600 bg-blue-950/20' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}
            >
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${node.status === 'primary' ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`} />
                <div>
                  <div className="text-xs font-bold">{node.city}</div>
                  <div className="text-[10px] text-slate-500">{node.country}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-green-400">{node.ping}ms</div>
                <div className="text-[10px] text-slate-500">{(node.users / 1000).toFixed(1)}K users</div>
              </div>
            </div>
          ))}
        </div>

        {/* Node Detail */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Server className="h-8 w-8 text-blue-500" />
              <div>
                <h2 className="text-xl font-black">{selected.city} Node</h2>
                <p className="text-slate-500 text-xs">{selected.country} · {selected.status.toUpperCase()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Ping', value: `${selected.ping}ms`, color: selected.ping < 50 ? 'green' : selected.ping < 150 ? 'yellow' : 'red' },
                { label: 'Users', value: selected.users.toLocaleString(), color: 'blue' },
                { label: 'Bandwidth', value: '2.4 Gbps', color: 'green' },
                { label: 'CPU Load', value: '34%', color: 'green' },
              ].map(m => (
                <div key={m.label} className="bg-slate-800 p-3 text-center">
                  <div className={`text-lg font-black text-${m.color}-400`}>{m.value}</div>
                  <div className="text-[10px] text-slate-500">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4">
            <h3 className="text-[10px] text-slate-500 uppercase font-bold mb-3">Traffic Distribution</h3>
            {NODES.map(node => (
              <div key={node.city} className="flex items-center gap-3 mb-2">
                <span className="text-[10px] text-slate-400 w-20">{node.city}</span>
                <div className="flex-1 bg-slate-800 h-2">
                  <div className="h-full bg-blue-500" style={{ width: `${(node.users / totalUsers) * 100}%` }} />
                </div>
                <span className="text-[10px] text-slate-500 w-12 text-right">{((node.users / totalUsers) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
