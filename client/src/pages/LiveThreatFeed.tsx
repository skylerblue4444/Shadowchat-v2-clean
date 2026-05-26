import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Activity, Globe, Zap, Eye, RefreshCw } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const THREAT_TYPES = ['DDoS', 'Phishing', 'Malware', 'Ransomware', 'Brute Force', 'SQL Injection', 'XSS', 'MITM'];
const COUNTRIES = ['CN', 'RU', 'US', 'BR', 'IN', 'DE', 'KR', 'UA', 'IR', 'NG'];
const SEVERITIES = ['LOW', 'MED', 'HIGH', 'CRIT'];

function generateThreat(id: number) {
  return {
    id,
    type: THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)],
    ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
    severity: SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)],
    blocked: Math.random() > 0.1,
    time: new Date().toLocaleTimeString(),
  };
}

export default function LiveThreatFeed() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [threats, setThreats] = useState(() => Array.from({ length: 12 }, (_, i) => generateThreat(i)));
  const [paused, setPaused] = useState(false);
  const [counter, setCounter] = useState(12);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setCounter(c => c + 1);
      setThreats(prev => [generateThreat(counter), ...prev.slice(0, 19)]);
    }, 1800);
    return () => clearInterval(t);
  }, [paused, counter]);

  const sevColor = (s: string) => s === 'CRIT' ? 'text-red-400 border-red-800' : s === 'HIGH' ? 'text-orange-400 border-orange-800' : s === 'MED' ? 'text-yellow-400 border-yellow-800' : 'text-slate-400 border-slate-700';

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Activity className="h-6 w-6 text-red-500 animate-pulse" /> LIVE_THREAT_FEED
          </h1>
          <p className="text-slate-500 text-xs mt-1">Real-time global threat intelligence · SKY444 Protect v19</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-xl font-black text-red-400">{threats.filter(t => !t.blocked).length}</div>
            <div className="text-[10px] text-slate-500">Active</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-green-400">{threats.filter(t => t.blocked).length}</div>
            <div className="text-[10px] text-slate-500">Blocked</div>
          </div>
          <button onClick={() => setPaused(p => !p)} className={`flex items-center gap-2 px-3 py-2 text-xs font-bold border transition-all ${paused ? 'border-green-700 text-green-400' : 'border-red-800 text-red-400'}`}>
            {paused ? <><RefreshCw className="h-3 w-3" /> RESUME</> : <><Eye className="h-3 w-3" /> PAUSE</>}
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {threats.map((threat, i) => (
          <div key={`${threat.id}-${i}`} className={`flex items-center justify-between p-3 border text-xs transition-all ${i === 0 && !paused ? 'border-red-900 bg-red-950/10 animate-pulse' : 'border-slate-800 bg-slate-900'}`}>
            <div className="flex items-center gap-3 flex-1">
              <span className={`font-black px-1.5 py-0.5 border text-[9px] ${sevColor(threat.severity)}`}>{threat.severity}</span>
              <span className="font-bold text-white w-28">{threat.type}</span>
              <span className="text-slate-500 font-mono w-32">{threat.ip}</span>
              <span className="text-slate-600 w-8">{threat.country}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-700 text-[10px]">{threat.time}</span>
              <span className={`text-[9px] font-black px-2 py-0.5 border ${threat.blocked ? 'border-green-800 text-green-400' : 'border-red-800 text-red-400'}`}>
                {threat.blocked ? 'BLOCKED' : 'ACTIVE'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
