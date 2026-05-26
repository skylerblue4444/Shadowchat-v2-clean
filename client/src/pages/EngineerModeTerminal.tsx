import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Zap, Code2, GitBranch, Database, Shield, Activity, Settings, Play, Square, RefreshCw } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const BOOT_SEQUENCE = [
  '> INITIALIZING ENGINEER_MODE_v19...',
  '> Loading kernel modules...',
  '> Mounting shadow filesystem...',
  '> Connecting to SKY444 mesh network...',
  '> Authenticating engineer credentials...',
  '> Unlocking grey-area subsystems...',
  '> All systems ONLINE. Welcome, Engineer.',
];

const COMMANDS: Record<string, string[]> = {
  help: ['Available commands:', '  status   — system health', '  scan     — port/service scan', '  deploy   — push build', '  logs     — tail live logs', '  vault    — open cold vault', '  clear    — clear terminal'],
  status: ['[OK] API Gateway: ONLINE', '[OK] WebSocket: CONNECTED', '[OK] DB Pool: 24/50 connections', '[OK] Redis Cache: 98% hit rate', '[WARN] Memory: 71% used', '[OK] CPU: 12% avg'],
  scan: ['Scanning 0.0.0.0/0...', 'Port 443  HTTPS   OPEN', 'Port 8080 API     OPEN', 'Port 5432 PG      FILTERED', 'Port 6379 Redis   FILTERED', 'Scan complete. 2 open, 2 filtered.'],
  deploy: ['Building production bundle...', 'Running tests... PASS (312/312)', 'Compressing assets...', 'Pushing to CDN edge nodes...', 'Deploy complete. v19.0.0 LIVE'],
  logs: ['[2026-05-22 07:01] INFO  User auth OK uid=4444', '[2026-05-22 07:01] INFO  Trade executed BTC/USDT', '[2026-05-22 07:02] WARN  Rate limit hit ip=10.0.0.1', '[2026-05-22 07:02] INFO  WebSocket ping OK'],
  vault: ['Unlocking ColdVault...', 'Decrypting keystore...', 'Vault OPEN. Handle with care.'],
  clear: [],
};

export default function EngineerModeTerminal() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [booted, setBooted] = useState(false);
  const [running, setRunning] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        setLines(prev => [...prev, BOOT_SEQUENCE[i]]);
        i++;
      } else {
        setBooted(true);
        clearInterval(interval);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setLines(prev => [...prev, `$ ${cmd}`]);
    if (trimmed === 'clear') { setLines([]); return; }
    const output = COMMANDS[trimmed] || [`Command not found: ${trimmed}. Type 'help'.`];
    setRunning(true);
    output.forEach((line, idx) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (idx === output.length - 1) setRunning(false);
      }, idx * 80);
    });
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) { runCommand(input); setInput(''); }
  };

  const metrics = [
    { label: 'CPU', value: '12%', color: 'text-green-400' },
    { label: 'RAM', value: '71%', color: 'text-yellow-400' },
    { label: 'NET', value: '2.4 GB/s', color: 'text-blue-400' },
    { label: 'UPTIME', value: '99.97%', color: 'text-green-400' },
  ];

  return (
    <div className="bg-black text-green-400 min-h-screen font-mono p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-green-900 pb-3">
        <div className="flex items-center gap-3">
          <Terminal className="h-6 w-6 text-green-500" />
          <span className="text-green-300 font-bold text-lg tracking-widest">ENGINEER_MODE_v19</span>
          <span className="text-[10px] bg-green-900/40 border border-green-700 px-2 py-0.5 text-green-400">SUPER_APP</span>
        </div>
        <div className="flex gap-4">
          {metrics.map(m => (
            <div key={m.label} className="text-center">
              <div className={`text-xs font-bold ${m.color}`}>{m.value}</div>
              <div className="text-[9px] text-green-800">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* System Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {[
          { icon: Cpu, label: 'COMPUTE', status: 'ONLINE', color: 'green' },
          { icon: Database, label: 'DATABASE', status: 'ONLINE', color: 'green' },
          { icon: Shield, label: 'SECURITY', status: 'ARMED', color: 'blue' },
          { icon: Activity, label: 'MONITOR', status: 'LIVE', color: 'yellow' },
          { icon: GitBranch, label: 'CI/CD', status: 'READY', color: 'green' },
          { icon: Code2, label: 'BUILD', status: 'v19.0', color: 'green' },
          { icon: Zap, label: 'EDGE CDN', status: 'ACTIVE', color: 'blue' },
          { icon: Settings, label: 'CONFIG', status: 'LOADED', color: 'green' },
        ].map(({ icon: Icon, label, status, color }) => (
          <div key={label} className={`border border-green-900 bg-green-950/20 p-3 flex items-center gap-2`}>
            <Icon className={`h-4 w-4 text-${color}-500`} />
            <div>
              <div className="text-[9px] text-green-700">{label}</div>
              <div className={`text-xs font-bold text-${color}-400`}>{status}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Terminal */}
      <div className="border border-green-900 bg-black rounded-none">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-green-900 bg-green-950/20">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-[10px] text-green-700 ml-2">sky444@engineer:~$</span>
          {running && <RefreshCw className="h-3 w-3 text-green-600 animate-spin ml-auto" />}
        </div>
        <div className="h-72 overflow-y-auto p-4 text-xs leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className={line.startsWith('$') ? 'text-white' : line.includes('WARN') ? 'text-yellow-400' : line.includes('ERR') ? 'text-red-400' : 'text-green-400'}>
              {line}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        {booted && (
          <div className="flex items-center gap-2 px-4 py-2 border-t border-green-900">
            <span className="text-green-600 text-xs">$</span>
            <input
              className="flex-1 bg-transparent text-green-300 text-xs outline-none placeholder-green-900"
              placeholder="type a command..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
            />
            <button onClick={() => { if (input.trim()) { runCommand(input); setInput(''); } }}>
              <Play className="h-4 w-4 text-green-600 hover:text-green-400" />
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-2">
        {Object.keys(COMMANDS).filter(c => c !== 'clear').map(cmd => (
          <button
            key={cmd}
            onClick={() => runCommand(cmd)}
            className="border border-green-900 bg-green-950/20 hover:bg-green-900/30 text-green-400 text-[10px] font-bold uppercase py-2 px-3 transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
