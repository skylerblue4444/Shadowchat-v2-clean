/**
 * Breathing Infrastructure UI v2.0
 * Interactive dashboard for system health, auto-healing, and resilience
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import {
  Activity, Zap, Shield, TrendingUp, AlertTriangle, CheckCircle2,
  Cpu, Database, Network, Clock, Gauge, Droplet, Wind, Heart,
  RefreshCw, Settings, Eye, Volume2, BarChart3, Layers,
} from "lucide-react";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  icon: React.ElementType;
}

export default function BreathingInfrastructureUI() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: "CPU Load", value: 42, max: 100, unit: "%", status: "healthy", icon: Cpu },
    { name: "Memory", value: 68, max: 100, unit: "%", status: "warning", icon: Database },
    { name: "Network I/O", value: 34, max: 100, unit: "%", status: "healthy", icon: Network },
    { name: "Disk I/O", value: 28, max: 100, unit: "%", status: "healthy", icon: Layers },
    { name: "Response Time", value: 145, max: 500, unit: "ms", status: "healthy", icon: Clock },
    { name: "Error Rate", value: 0.2, max: 5, unit: "%", status: "healthy", icon: AlertTriangle },
  ]);

  const [healingActive, setHealingActive] = useState(false);
  const [autoScaling, setAutoScaling] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Simulate breathing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev =>
        prev.map(m => ({
          ...m,
          value: Math.max(0, Math.min(m.max, m.value + (Math.random() - 0.5) * 8)),
          status:
            m.value > m.max * 0.8 ? "critical" :
            m.value > m.max * 0.6 ? "warning" :
            "healthy",
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-emerald-400";
      case "warning": return "text-amber-400";
      case "critical": return "text-red-400";
      default: return "text-slate-400";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "healthy": return "bg-emerald-400/10 border-emerald-400/30";
      case "warning": return "bg-amber-400/10 border-amber-400/30";
      case "critical": return "bg-red-400/10 border-red-400/30";
      default: return "bg-slate-400/10 border-slate-400/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
              <Heart className="h-8 w-8 text-cyan-400 animate-pulse" />
              Breathing Infrastructure
            </h1>
            <p className="text-slate-400">Self-healing, auto-scaling system with real-time resilience monitoring</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setHealingActive(!healingActive)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                healingActive
                  ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                  : "border border-white/10 text-slate-300 hover:border-emerald-400/50"
              }`}
            >
              <RefreshCw className={`h-4 w-4 inline mr-2 ${healingActive ? "animate-spin" : ""}`} />
              {healingActive ? "Healing Active" : "Start Healing"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setAutoScaling(!autoScaling)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                autoScaling
                  ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-lg shadow-cyan-500/30"
                  : "border border-white/10 text-slate-300 hover:border-cyan-400/50"
              }`}
            >
              <Zap className="h-4 w-4 inline mr-2" />
              {autoScaling ? "Auto-Scaling ON" : "Auto-Scaling OFF"}
            </motion.button>
          </div>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Overall Health</div>
            <div className="text-3xl font-black text-emerald-400 mb-1">98.7%</div>
            <div className="text-xs text-slate-500">All systems operational</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Uptime</div>
            <div className="text-3xl font-black text-cyan-400 mb-1">99.99%</div>
            <div className="text-xs text-slate-500">Last 30 days</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Active Nodes</div>
            <div className="text-3xl font-black text-fuchsia-400 mb-1">247</div>
            <div className="text-xs text-slate-500">Globally distributed</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Healing Events</div>
            <div className="text-3xl font-black text-amber-400 mb-1">12</div>
            <div className="text-xs text-slate-500">Last 24 hours</div>
          </motion.div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <AnimatePresence>
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            const percentage = (metric.value / metric.max) * 100;
            return (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedMetric(metric.name)}
                className={`${glassStyles.card} p-6 cursor-pointer ${shadows.md} hover:border-cyan-400/50 transition-all group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-5 w-5 ${getStatusColor(metric.status)}`} />
                      <span className="font-bold text-white">{metric.name}</span>
                    </div>
                    <div className="text-2xl font-black text-white">
                      {metric.value.toFixed(1)}{metric.unit}
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${getStatusBg(metric.status)}`}>
                    {metric.status === "healthy" && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                    {metric.status === "warning" && <AlertTriangle className="h-5 w-5 text-amber-400" />}
                    {metric.status === "critical" && <AlertTriangle className="h-5 w-5 text-red-400" />}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full ${
                        metric.status === "healthy" ? "bg-emerald-400" :
                        metric.status === "warning" ? "bg-amber-400" :
                        "bg-red-400"
                      }`}
                    />
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  {percentage.toFixed(0)}% of {metric.max}{metric.unit}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Healing Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`${glassStyles.card} p-6 ${shadows.md}`}
      >
        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-400" />
          Healing Events Log
        </h2>
        <div className="space-y-3">
          {[
            { time: "2 min ago", event: "Auto-scaled CPU cluster from 8 to 12 nodes", status: "success" },
            { time: "5 min ago", event: "Detected memory leak in worker process, restarted", status: "success" },
            { time: "12 min ago", event: "Failover activated for database replica #3", status: "success" },
            { time: "18 min ago", event: "Network latency spike detected, rerouted traffic", status: "success" },
            { time: "1 hour ago", event: "Disk space low on node-42, triggered cleanup", status: "success" },
          ].map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/10 hover:border-cyan-400/30 transition-all"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-white font-semibold">{log.event}</div>
                <div className="text-xs text-slate-500 mt-1">{log.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
