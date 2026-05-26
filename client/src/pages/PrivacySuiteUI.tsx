/**
 * Privacy Suite UI v2.0
 * Interactive dashboard for encryption, anonymity, and data protection
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import {
  Lock, Shield, Eye, EyeOff, Key, Zap, Check, AlertTriangle,
  Fingerprint, Database, Network, Globe, Settings, RefreshCw,
  BarChart3, TrendingUp, Clock, Users, FileText, Download,
} from "lucide-react";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";

interface PrivacyFeature {
  name: string;
  status: "active" | "inactive" | "pending";
  description: string;
  icon: React.ElementType;
  level: "basic" | "standard" | "premium" | "military";
}

export default function PrivacySuiteUI() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [features, setFeatures] = useState<PrivacyFeature[]>([
    {
      name: "End-to-End Encryption",
      status: "active",
      description: "All data encrypted with AES-256-GCM",
      icon: Lock,
      level: "military",
    },
    {
      name: "Zero-Knowledge Architecture",
      status: "active",
      description: "Server cannot access user data",
      icon: Key,
      level: "military",
    },
    {
      name: "Tor Integration",
      status: "active",
      description: "Route traffic through Tor network",
      icon: Globe,
      level: "premium",
    },
    {
      name: "VPN Tunneling",
      status: "active",
      description: "Military-grade VPN with 256-bit keys",
      icon: Network,
      level: "premium",
    },
    {
      name: "Metadata Stripping",
      status: "active",
      description: "Remove all identifying information",
      icon: FileText,
      level: "standard",
    },
    {
      name: "Biometric Privacy",
      status: "active",
      description: "Encrypted biometric templates",
      icon: Fingerprint,
      level: "premium",
    },
  ]);

  const [anonymityLevel, setAnonymityLevel] = useState(85);
  const [encryptionKey, setEncryptionKey] = useState("●●●●●●●●●●●●●●●●");
  const [showKey, setShowKey] = useState(false);
  const [dataRetention, setDataRetention] = useState("7 days");

  const getLevelColor = (level: string) => {
    switch (level) {
      case "military": return "text-red-400";
      case "premium": return "text-fuchsia-400";
      case "standard": return "text-cyan-400";
      default: return "text-slate-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Check className="h-5 w-5 text-emerald-400" />;
      case "inactive": return <Eye className="h-5 w-5 text-slate-400" />;
      case "pending": return <RefreshCw className="h-5 w-5 text-amber-400 animate-spin" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
              <Shield className="h-8 w-8 text-cyan-400" />
              Privacy Suite
            </h1>
            <p className="text-slate-400">Military-grade encryption, anonymity, and data protection</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold shadow-lg shadow-cyan-500/30"
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Configure
            </motion.button>
          </div>
        </div>

        {/* Privacy Score */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Privacy Score</div>
            <div className="text-3xl font-black text-cyan-400 mb-1">{anonymityLevel}%</div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                animate={{ width: `${anonymityLevel}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Encryption</div>
            <div className="text-3xl font-black text-emerald-400 mb-1">AES-256</div>
            <div className="text-xs text-slate-500">Military grade</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Anonymity</div>
            <div className="text-3xl font-black text-fuchsia-400 mb-1">Tor + VPN</div>
            <div className="text-xs text-slate-500">Double-routed</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${glassStyles.card} p-4 ${shadows.md}`}
          >
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Data Retention</div>
            <div className="text-3xl font-black text-amber-400 mb-1">7d</div>
            <div className="text-xs text-slate-500">Auto-delete</div>
          </motion.div>
        </div>
      </div>

      {/* Privacy Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`${glassStyles.card} p-6 ${shadows.md} hover:border-cyan-400/50 transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20">
                    <Icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{feature.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{feature.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(feature.status)}
                  <span className={`text-xs font-bold uppercase tracking-widest ${getLevelColor(feature.level)}`}>
                    {feature.level}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Encryption Key Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`${glassStyles.card} p-6 ${shadows.md} mb-8`}
      >
        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
          <Key className="h-5 w-5 text-fuchsia-400" />
          Master Encryption Key
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.04] border border-white/10">
            <div className="flex-1 font-mono text-sm text-slate-300">
              {showKey ? "••••••••••••••••••••••••••••••••" : encryptionKey}
            </div>
            <button
              onClick={() => setShowKey(!showKey)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all text-slate-400 hover:text-white"
            >
              {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className={`${glassStyles.button} py-2 text-sm font-semibold text-white`}>
              <RefreshCw className="h-4 w-4 inline mr-2" />
              Rotate Key
            </button>
            <button className={`${glassStyles.button} py-2 text-sm font-semibold text-white`}>
              <Download className="h-4 w-4 inline mr-2" />
              Export Backup
            </button>
          </div>
        </div>
      </motion.div>

      {/* Activity Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`${glassStyles.card} p-6 ${shadows.md}`}
      >
        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-cyan-400" />
          Privacy Activity Log
        </h2>
        <div className="space-y-3">
          {[
            { time: "2 min ago", action: "Encrypted 1.2 GB of data", status: "success" },
            { time: "5 min ago", action: "Tor connection established", status: "success" },
            { time: "12 min ago", action: "VPN tunnel activated", status: "success" },
            { time: "18 min ago", action: "Metadata stripped from 847 files", status: "success" },
            { time: "1 hour ago", action: "Encryption key rotated", status: "success" },
          ].map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/10 hover:border-cyan-400/30 transition-all"
            >
              <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-white font-semibold">{log.action}</div>
                <div className="text-xs text-slate-500 mt-1">{log.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
