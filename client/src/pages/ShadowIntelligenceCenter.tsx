import React, { useState, useEffect, useCallback } from 'react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import {
  ShadowIntelligenceEngine,
  type ShadowModule,
  type ModuleID,
  type SignalEvent,
  type ChaosEvent,
  type TrafficMirrorEntry,
} from '../lib/shadowIntelligence/ShadowIntelligenceEngine';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Zap, Shield, AlertTriangle, Activity, Radio, Cpu,
  Power, RefreshCw, Eye, GitBranch, Heart, TrendingUp,
  ChevronRight, Lock, Unlock, Terminal, Wifi, WifiOff,
} from 'lucide-react';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const RISK_COLOR: Record<string, string> = {
  LOW:      'text-green-400  border-green-500/30  bg-green-500/5',
  MEDIUM:   'text-amber-400  border-amber-500/30  bg-amber-500/5',
  HIGH:     'text-orange-400 border-orange-500/30 bg-orange-500/5',
  CRITICAL: 'text-red-400    border-red-500/30    bg-red-500/5',
};

const STATUS_COLOR: Record<string, string> = {
  ACTIVE:     'text-green-400',
  STANDBY:    'text-amber-400',
  KILLED:     'text-red-500',
  RESTARTING: 'text-blue-400',
};

const SIGNAL_COLOR: Record<string, string> = {
  BUY:     'border-l-green-500  bg-green-500/5',
  SELL:    'border-l-red-500    bg-red-500/5',
  HOLD:    'border-l-amber-500  bg-amber-500/5',
  WHALE:   'border-l-blue-500   bg-blue-500/5',
  CHAOS:   'border-l-orange-500 bg-orange-500/5',
  CHARITY: 'border-l-pink-500   bg-pink-500/5',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const PCard: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string }> = ({
  title, icon, children, className = '',
}) => (
  <div className={`bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all p-5 rounded-none relative overflow-hidden group ${className}`}>
    <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none">
      <Zap className="h-16 w-16 text-amber-500" />
    </div>
    <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
      {icon && <span className="text-amber-500">{icon}</span>}
      {title}
    </h3>
    {children}
  </div>
);

const Dot: React.FC<{ color?: string }> = ({ color = 'bg-green-500' }) => (
  <span className={`inline-block h-2 w-2 rounded-full ${color} animate-pulse`} />
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const ShadowIntelligenceCenter: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [modules, setModules]         = useState<ShadowModule[]>([]);
  const [signals, setSignals]         = useState<SignalEvent[]>([]);
  const [chaosEvents, setChaosEvents] = useState<ChaosEvent[]>([]);
  const [mirrorLog, setMirrorLog]     = useState<TrafficMirrorEntry[]>([]);
  const [killLog, setKillLog]         = useState<Array<{ ts: number; module: string; reason: string }>>([]);
  const [masterKilled, setMasterKilled] = useState(false);
  const [hopeFundTotal, setHopeFundTotal] = useState(0);
  const [activeTab, setActiveTab]     = useState<'modules' | 'signals' | 'chaos' | 'mirror' | 'hopefund'>('modules');
  const [tick, setTick]               = useState(0);

  // Poll engine state every 1.5s
  useEffect(() => {
    const id = setInterval(() => {
      setModules(ShadowIntelligenceEngine.getModules());
      setSignals(ShadowIntelligenceEngine.signalBroadcaster.getSignals(30));
      setChaosEvents(ShadowIntelligenceEngine.chaosEngine.getEvents(20));
      setMirrorLog(ShadowIntelligenceEngine.trafficMirror.getLog(20));
      setKillLog(ShadowIntelligenceEngine.killSwitch.getLog());
      setMasterKilled(ShadowIntelligenceEngine.killSwitch.getState().masterKill);
      setHopeFundTotal(ShadowIntelligenceEngine.hopeFundRouter.getTotal());
      setTick(t => t + 1);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  // Subscribe to live signals
  useEffect(() => {
    const unsub = ShadowIntelligenceEngine.signalBroadcaster.subscribe(sig => {
      setSignals(prev => [sig, ...prev].slice(0, 30));
    });
    return unsub;
  }, []);

  // Simulate Hope Fund routing on interval
  useEffect(() => {
    const assets = ['SKY4444', 'SHADOW', 'USDT', 'BTC'];
    const sources = ['casino-charity-burn', 'signal-broadcaster', 'ai-trade-executor'];
    const id = setInterval(() => {
      const gross = 100 + Math.random() * 9900;
      const asset = assets[Math.floor(Math.random() * assets.length)];
      const src   = sources[Math.floor(Math.random() * sources.length)];
      ShadowIntelligenceEngine.hopeFundRouter.route(src, gross, asset);
      setHopeFundTotal(ShadowIntelligenceEngine.hopeFundRouter.getTotal());
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const handleMasterKill = useCallback(() => {
    ShadowIntelligenceEngine.emergencyShutdown('MANUAL_MASTER_KILL');
    setMasterKilled(true);
  }, []);

  const handleMasterRestore = useCallback(() => {
    ShadowIntelligenceEngine.fullRestore();
    setMasterKilled(false);
  }, []);

  const handleModuleToggle = useCallback((id: ModuleID, killed: boolean) => {
    if (killed) ShadowIntelligenceEngine.killSwitch.restoreModule(id);
    else ShadowIntelligenceEngine.killSwitch.killModule(id, 'MANUAL_MODULE_KILL');
  }, []);

  const TABS = [
    { id: 'modules',  label: 'MODULES',      icon: <Cpu className="h-3 w-3" /> },
    { id: 'signals',  label: 'AI SIGNALS',   icon: <Radio className="h-3 w-3" /> },
    { id: 'chaos',    label: 'CHAOS ENGINE', icon: <AlertTriangle className="h-3 w-3" /> },
    { id: 'mirror',   label: 'TRAFFIC MIRROR', icon: <GitBranch className="h-3 w-3" /> },
    { id: 'hopefund', label: 'HOPE FUND',    icon: <Heart className="h-3 w-3" /> },
  ] as const;

  return (
    <div className="bg-black text-white min-h-screen font-sans">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="p-6 border-b border-slate-900 flex flex-wrap gap-4 justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tighter text-amber-500">
              SHADOW_INTELLIGENCE_CENTER
            </h1>
            <span className="text-[10px] font-mono text-slate-600 border border-slate-800 px-2 py-0.5">v10.0</span>
          </div>
          <div className="flex gap-4 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Dot /> ENGINE_LIVE</span>
            <span className="flex items-center gap-1"><Dot color="bg-amber-500" /> AI_SOVEREIGN</span>
            <span className="flex items-center gap-1"><Dot color="bg-pink-500" /> HOPE_FUND_ACTIVE</span>
            <span className="flex items-center gap-1 text-slate-500">TICK_{tick.toString().padStart(4, '0')}</span>
          </div>
        </div>

        {/* Master Kill Switch */}
        <div className="flex flex-col items-end gap-2">
          {masterKilled ? (
            <Button
              onClick={handleMasterRestore}
              className="bg-green-600 hover:bg-green-700 text-black font-black px-8 py-6 rounded-none uppercase tracking-widest text-sm flex items-center gap-2 border-2 border-green-500"
            >
              <Unlock className="h-5 w-5" /> RESTORE ALL SYSTEMS
            </Button>
          ) : (
            <Button
              onClick={handleMasterKill}
              className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-6 rounded-none uppercase tracking-widest text-sm flex items-center gap-2 border-2 border-red-500 animate-pulse"
            >
              <Power className="h-5 w-5" /> MASTER KILL SWITCH
            </Button>
          )}
          <p className="text-[9px] font-mono text-slate-600 uppercase">
            {masterKilled ? '⚠ ALL HIGH-RISK MODULES KILLED' : 'INSTANT SHUTDOWN — ALL HIGH-RISK MODULES'}
          </p>
        </div>
      </div>

      {/* ── Status Bar ─────────────────────────────────────────────────────── */}
      {masterKilled && (
        <div className="bg-red-950/50 border-y border-red-900 px-6 py-3 flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
          <p className="text-red-400 font-mono text-xs uppercase tracking-widest">
            MASTER KILL SWITCH ACTIVE — All high-risk modules suspended. Click RESTORE ALL SYSTEMS to resume.
          </p>
        </div>
      )}

      {/* ── KPI Strip ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-b border-slate-900">
        {[
          { label: 'ACTIVE MODULES',   value: modules.filter(m => m.status === 'ACTIVE').length.toString(),    icon: <Cpu className="h-4 w-4" /> },
          { label: 'KILLED MODULES',   value: modules.filter(m => m.status === 'KILLED').length.toString(),    icon: <Power className="h-4 w-4 text-red-500" /> },
          { label: 'SIGNALS TODAY',    value: signals.length.toString(),                                        icon: <Radio className="h-4 w-4" /> },
          { label: 'CHAOS EVENTS',     value: chaosEvents.length.toString(),                                    icon: <AlertTriangle className="h-4 w-4" /> },
          { label: 'MIRROR REQUESTS',  value: mirrorLog.length.toString(),                                      icon: <GitBranch className="h-4 w-4" /> },
          { label: 'HOPE FUND TOTAL',  value: `$${hopeFundTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`, icon: <Heart className="h-4 w-4 text-pink-500" /> },
        ].map((kpi, i) => (
          <div key={i} className="p-4 border-r border-slate-900 last:border-r-0">
            <div className="flex items-center gap-2 text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-1">
              {kpi.icon} {kpi.label}
            </div>
            <p className="text-2xl font-black text-amber-500 tracking-tighter">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs ───────────────────────────────────────────────────────────── */}
      <div className="flex border-b border-slate-900 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-[10px] font-mono uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-500/5'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">

        {/* ── MODULES TAB ──────────────────────────────────────────────────── */}
        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {modules.map(mod => {
              const killed = mod.status === 'KILLED';
              return (
                <div
                  key={mod.id}
                  className={`bg-slate-900 border transition-all p-5 rounded-none ${
                    killed ? 'border-red-900 opacity-60' : 'border-slate-800 hover:border-amber-500/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-tight text-white">{mod.label}</p>
                      <p className="text-[9px] font-mono text-slate-600 mt-0.5">{mod.id}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[9px] font-mono uppercase ${STATUS_COLOR[mod.status]}`}>
                        {mod.status}
                      </span>
                      <span className={`text-[8px] font-mono uppercase px-2 py-0.5 border ${RISK_COLOR[mod.riskLevel]}`}>
                        {mod.riskLevel}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-4">
                    {Object.entries(mod.metrics).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-[9px] font-mono">
                        <span className="text-slate-600 uppercase">{k.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-slate-400">{typeof v === 'number' ? v.toLocaleString() : v}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-[9px] font-mono">
                      <span className="text-slate-600 uppercase">LAST PING</span>
                      <span className="text-slate-400">{Math.round((Date.now() - mod.lastPing) / 1000)}s ago</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleModuleToggle(mod.id as ModuleID, killed)}
                    size="sm"
                    className={`w-full rounded-none font-mono text-[10px] uppercase ${
                      killed
                        ? 'bg-green-700 hover:bg-green-600 text-white'
                        : 'bg-red-900/50 hover:bg-red-800 text-red-400 border border-red-900'
                    }`}
                  >
                    {killed ? <><Unlock className="h-3 w-3 mr-1" /> RESTORE</> : <><Power className="h-3 w-3 mr-1" /> KILL MODULE</>}
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {/* ── SIGNALS TAB ──────────────────────────────────────────────────── */}
        {activeTab === 'signals' && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <Radio className="h-4 w-4 text-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                LIVE AI SIGNAL STREAM — HOPE ENGINE v10
              </span>
            </div>
            {signals.map(sig => (
              <div
                key={sig.id}
                className={`border-l-2 p-4 ${SIGNAL_COLOR[sig.type] ?? 'border-l-slate-500 bg-slate-900'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 ${
                      sig.type === 'BUY' ? 'bg-green-500/20 text-green-400' :
                      sig.type === 'SELL' ? 'bg-red-500/20 text-red-400' :
                      sig.type === 'WHALE' ? 'bg-blue-500/20 text-blue-400' :
                      sig.type === 'CHARITY' ? 'bg-pink-500/20 text-pink-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>{sig.type}</span>
                    <span className="text-xs font-black text-white">{sig.asset}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-slate-500">
                      {new Date(sig.ts).toLocaleTimeString()}
                    </span>
                    <div className="text-[9px] font-mono text-amber-500 mt-0.5">
                      CONF: {sig.confidence}%
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{sig.message}</p>
                <p className="text-[8px] font-mono text-slate-600 mt-1 uppercase">{sig.id}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── CHAOS ENGINE TAB ─────────────────────────────────────────────── */}
        {activeTab === 'chaos' && (
          <div className="space-y-4">
            <PCard title="Chaos Engineering — Fault Injection Log" icon={<AlertTriangle className="h-3 w-3" />}>
              <div className="space-y-2">
                {chaosEvents.length === 0 && (
                  <p className="text-slate-600 text-xs font-mono text-center py-8">NO CHAOS EVENTS YET — ENGINE WARMING UP</p>
                )}
                {chaosEvents.map((ev, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 border ${ev.resolved ? 'border-slate-800 opacity-60' : 'border-orange-900/50 bg-orange-950/20'}`}>
                    <div className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${ev.resolved ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono font-black text-orange-400 uppercase">{ev.type.replace(/_/g, ' ')}</span>
                        <span className="text-[9px] font-mono text-slate-600">{new Date(ev.ts).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex gap-4 mt-1 text-[9px] font-mono text-slate-500">
                        <span>TARGET: {ev.targetModule}</span>
                        <span>SEVERITY: {ev.severity}%</span>
                        {ev.resolved && <span className="text-green-500">RESOLVED IN {ev.resolutionMs}ms</span>}
                        {!ev.resolved && <span className="text-orange-400 animate-pulse">ACTIVE</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'TOTAL FAULTS', value: chaosEvents.length, color: 'text-orange-400' },
                { label: 'RESOLVED',     value: chaosEvents.filter(e => e.resolved).length, color: 'text-green-400' },
                { label: 'ACTIVE',       value: chaosEvents.filter(e => !e.resolved).length, color: 'text-red-400' },
              ].map((stat, i) => (
                <PCard key={i} title={stat.label}>
                  <p className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
                </PCard>
              ))}
            </div>
          </div>
        )}

        {/* ── TRAFFIC MIRROR TAB ───────────────────────────────────────────── */}
        {activeTab === 'mirror' && (
          <div className="space-y-4">
            <PCard title="Traffic Mirror — Shadow Clone Log" icon={<GitBranch className="h-3 w-3" />}>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-600 uppercase">
                      <th className="text-left pb-2 pr-4">ENDPOINT</th>
                      <th className="text-right pb-2 pr-4">LIVE (ms)</th>
                      <th className="text-right pb-2 pr-4">SHADOW (ms)</th>
                      <th className="text-right pb-2 pr-4">DIVERGENCE</th>
                      <th className="text-right pb-2">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mirrorLog.map((entry, i) => (
                      <tr key={i} className="border-b border-slate-900/50 hover:bg-slate-900/50">
                        <td className="py-2 pr-4 text-amber-400">{entry.endpoint}</td>
                        <td className="py-2 pr-4 text-right text-slate-300">{entry.latencyMs}</td>
                        <td className="py-2 pr-4 text-right text-blue-400">{entry.shadowLatencyMs}</td>
                        <td className={`py-2 pr-4 text-right ${entry.divergence > 20 ? 'text-orange-400' : 'text-green-400'}`}>
                          {entry.divergence.toFixed(1)}%
                        </td>
                        <td className={`py-2 text-right ${entry.statusCode === 200 ? 'text-green-400' : 'text-red-400'}`}>
                          {entry.statusCode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PCard>
          </div>
        )}

        {/* ── HOPE FUND TAB ────────────────────────────────────────────────── */}
        {activeTab === 'hopefund' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-pink-950/30 to-slate-900 border border-pink-900/30 p-8 text-center">
              <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4 animate-pulse" />
              <p className="text-[10px] font-mono text-pink-400 uppercase tracking-widest mb-2">HOPE CAMPUS FUND — TOTAL RAISED</p>
              <p className="text-6xl font-black text-pink-500 tracking-tighter">
                ${hopeFundTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-[10px] font-mono text-slate-600 mt-3 uppercase">
                5% of every casino win, trade profit, and jackpot is automatically routed here
              </p>
            </div>

            <PCard title="Hope Fund Transaction Log" icon={<Heart className="h-3 w-3" />}>
              <div className="space-y-2">
                {ShadowIntelligenceEngine.hopeFundRouter.getTransactions(20).map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-pink-950/10 border border-pink-900/20 hover:border-pink-500/30 transition-all">
                    <div>
                      <p className="text-[10px] font-mono text-pink-400 font-bold">{tx.id}</p>
                      <p className="text-[9px] font-mono text-slate-600 uppercase mt-0.5">
                        {tx.sourceModule} · {new Date(tx.ts).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-mono text-pink-400">+${tx.charityAmount.toFixed(2)} {tx.asset}</p>
                      <p className="text-[9px] font-mono text-slate-600">{tx.burnPct}% BURN</p>
                    </div>
                  </div>
                ))}
              </div>
            </PCard>
          </div>
        )}

        {/* ── Kill Log (always visible at bottom) ──────────────────────────── */}
        {killLog.length > 0 && (
          <PCard title="Kill Switch Audit Log" icon={<Terminal className="h-3 w-3" />} className="border-red-900/30">
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {killLog.map((entry, i) => (
                <div key={i} className="flex items-center gap-3 text-[9px] font-mono py-1 border-b border-slate-900/50">
                  <span className="text-slate-600">{new Date(entry.ts).toLocaleTimeString()}</span>
                  <span className={`uppercase font-bold ${entry.module === 'MASTER' ? 'text-red-500' : 'text-orange-400'}`}>
                    {entry.module}
                  </span>
                  <span className="text-slate-500">{entry.reason}</span>
                </div>
              ))}
            </div>
          </PCard>
        )}

      </div>
    </div>
  );
};

export default ShadowIntelligenceCenter;
