/**
 * Infrastructure Monitoring v2.0
 * Real-time system monitoring, alerts, and resource management
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import {
  Server, Database, Network, Cpu, HardDrive, Zap, AlertTriangle,
  CheckCircle2, Clock, TrendingUp, TrendingDown, Activity, Gauge,
  Settings, Maximize2, Minimize2, RefreshCw, Eye, Bell, Download,
} from "lucide-react";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";

interface ServerStatus {
  id: string;
  name: string;
  region: string;
  status: "online" | "warning" | "offline";
  cpu: number;
  memory: number;
  disk: number;
  uptime: string;
  lastCheck: string;
}

interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

export default function InfrastructureMonitoringV2() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [servers, setServers] = useState<ServerStatus[]>([
    { id: "1", name: "API Server 1", region: "us-east-1", status: "online", cpu: 42, memory: 68, disk: 34, uptime: "99.98%", lastCheck: "2 min ago" },
    { id: "2", name: "API Server 2", region: "us-west-2", status: "online", cpu: 38, memory: 62, disk: 28, uptime: "99.99%", lastCheck: "1 min ago" },
    { id: "3", name: "Database Primary", region: "eu-west-1", status: "online", cpu: 55, memory: 84, disk: 72, uptime: "99.95%", lastCheck: "30 sec ago" },
    { id: "4", name: "Cache Server", region: "ap-southeast-1", status: "warning", cpu: 78, memory: 91, disk: 45, uptime: "98.2%", lastCheck: "45 sec ago" },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: "1", severity: "critical", title: "High Memory Usage", description: "Cache Server memory at 91%", timestamp: "5 min ago", resolved: false },
    { id: "2", severity: "warning", title: "Disk Space Low", description: "Database Primary disk at 72%", timestamp: "12 min ago", resolved: false },
    { id: "3", severity: "info", title: "Backup Completed", description: "Daily backup completed successfully", timestamp: "1 hour ago", resolved: true },
  ]);

  const [selectedServer, setSelectedServer] = useState<ServerStatus | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setServers(prev =>
        prev.map(s => ({
          ...s,
          cpu: Math.max(0, Math.min(100, s.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(0, Math.min(100, s.memory + (Math.random() - 0.5) * 8)),
          disk: Math.max(0, Math.min(100, s.disk + (Math.random() - 0.5) * 3)),
          status: s.cpu > 85 || s.memory > 90 ? "warning" : s.cpu > 95 || s.memory > 95 ? "offline" : "online",
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "text-emerald-400";
      case "warning": return "text-amber-400";
      case "offline": return "text-red-400";
      default: return "text-slate-400";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-400/20 border-red-400/30 text-red-300";
      case "warning": return "bg-amber-400/20 border-amber-400/30 text-amber-300";
      default: return "bg-cyan-400/20 border-cyan-400/30 text-cyan-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
              <Server className="h-8 w-8 text-cyan-400" />
              Infrastructure Monitoring
            </h1>
            <p className="text-slate-400">Real-time system health and resource utilization</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                autoRefresh
                  ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white"
                  : "border border-white/10 text-slate-300"
              }`}
            >
              <RefreshCw className={`h-4 w-4 inline mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
              {autoRefresh ? "Auto-Refresh ON" : "Auto-Refresh OFF"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`${glassStyles.button} px-4 py-2 text-white`}
            >
              <Download className="h-4 w-4 inline mr-2" />
              Export
            </motion.button>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Servers Online</div>
            <div className="text-3xl font-black text-emerald-400 mb-1">
              {servers.filter(s => s.status === "online").length}/{servers.length}
            </div>
            <div className="text-xs text-slate-500">All operational</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Avg CPU</div>
            <div className="text-3xl font-black text-cyan-400 mb-1">
              {(servers.reduce((sum, s) => sum + s.cpu, 0) / servers.length).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500">Across all nodes</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Avg Memory</div>
            <div className="text-3xl font-black text-fuchsia-400 mb-1">
              {(servers.reduce((sum, s) => sum + s.memory, 0) / servers.length).toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500">Across all nodes</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Active Alerts</div>
            <div className="text-3xl font-black text-amber-400 mb-1">
              {alerts.filter(a => !a.resolved).length}
            </div>
            <div className="text-xs text-slate-500">Requires attention</div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Servers Grid */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-black text-white">Server Status</h2>
          <AnimatePresence>
            {servers.map((server, idx) => (
              <motion.div
                key={server.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedServer(server)}
                className={`${glassStyles.card} p-6 cursor-pointer ${shadows.md} hover:border-cyan-400/50 transition-all group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20">
                      <Server className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white">{server.name}</span>
                        <span className={`text-xs font-bold ${getStatusColor(server.status)}`}>
                          {server.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">{server.region} • {server.uptime}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">{server.lastCheck}</div>
                  </div>
                </div>

                {/* Resource Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">CPU</span>
                      <span className="text-xs font-bold text-white">{server.cpu.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        animate={{ width: `${server.cpu}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">Memory</span>
                      <span className="text-xs font-bold text-white">{server.memory.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        animate={{ width: `${server.memory}%` }}
                        transition={{ duration: 0.3 }}
                        className={`h-full ${
                          server.memory > 85
                            ? "bg-red-400"
                            : server.memory > 70
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">Disk</span>
                      <span className="text-xs font-bold text-white">{server.disk.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        animate={{ width: `${server.disk}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-fuchsia-400"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Alerts Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-white">Active Alerts</h2>
          <div className="space-y-3">
            <AnimatePresence>
              {alerts.map((alert, idx) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`${glassStyles.card} p-4 border ${getSeverityColor(alert.severity)} ${shadows.sm}`}
                >
                  <div className="flex items-start gap-3">
                    {alert.resolved ? (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-bold">{alert.title}</div>
                      <div className="text-xs opacity-80 mt-1">{alert.description}</div>
                      <div className="text-xs opacity-60 mt-2">{alert.timestamp}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
