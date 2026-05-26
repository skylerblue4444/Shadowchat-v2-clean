/**
 * Admin Dashboard v2.0
 * Comprehensive platform control, analytics, and management
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import {
  Users, Settings, BarChart3, TrendingUp, AlertTriangle, CheckCircle2,
  Lock, Zap, Database, Server, Globe, Activity, Clock, DollarSign,
  Shield, Eye, Trash2, Edit, Plus, Download, Upload, RefreshCw,
  Filter, Search, ChevronRight, Bell, LogOut,
} from "lucide-react";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";

interface AdminMetric {
  label: string;
  value: string | number;
  change?: string;
  icon: React.ElementType;
  color: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "user";
  status: "active" | "suspended" | "inactive";
  joinDate: string;
}

export default function AdminDashboardV2() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeTab, setActiveTab] = useState<"overview" | "users" | "analytics" | "security" | "settings">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const metrics: AdminMetric[] = [
    { label: "Total Users", value: "124,842", change: "+12.4%", icon: Users, color: "cyan" },
    { label: "Active Sessions", value: "8,247", change: "+5.2%", icon: Activity, color: "emerald" },
    { label: "Revenue (30d)", value: "$2.84M", change: "+18.7%", icon: DollarSign, color: "amber" },
    { label: "System Health", value: "98.7%", change: "↑ 0.3%", icon: Shield, color: "fuchsia" },
  ];

  const recentUsers: AdminUser[] = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", joinDate: "2024-01-15" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "moderator", status: "active", joinDate: "2024-02-20" },
    { id: "3", name: "Carol Davis", email: "carol@example.com", role: "user", status: "active", joinDate: "2024-03-10" },
    { id: "4", name: "David Lee", email: "david@example.com", role: "user", status: "suspended", joinDate: "2024-01-05" },
    { id: "5", name: "Eve Wilson", email: "eve@example.com", role: "user", status: "active", joinDate: "2024-04-01" },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-400/20 text-red-300 border-red-400/30";
      case "moderator": return "bg-amber-400/20 text-amber-300 border-amber-400/30";
      default: return "bg-slate-400/20 text-slate-300 border-slate-400/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-emerald-400/20 text-emerald-300 border-emerald-400/30";
      case "suspended": return "bg-red-400/20 text-red-300 border-red-400/30";
      default: return "bg-slate-400/20 text-slate-300 border-slate-400/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Full platform control and analytics</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`${glassStyles.button} px-4 py-2 text-white`}
            >
              <Download className="h-4 w-4 inline mr-2" />
              Export
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`${glassStyles.button} px-4 py-2 text-white`}
            >
              <RefreshCw className="h-4 w-4 inline mr-2" />
              Refresh
            </motion.button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`${glassStyles.card} p-6 ${shadows.md}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${metric.color}-400/20`}>
                    <Icon className={`h-6 w-6 text-${metric.color}-400`} />
                  </div>
                  {metric.change && (
                    <span className="text-xs font-bold text-emerald-400">{metric.change}</span>
                  )}
                </div>
                <div className="text-sm text-slate-400 mb-1">{metric.label}</div>
                <div className="text-3xl font-black text-white">{metric.value}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(["overview", "users", "analytics", "security", "settings"] as const).map(tab => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold transition-all capitalize ${
              activeTab === tab
                ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-lg shadow-cyan-500/30"
                : "border border-white/10 text-slate-300 hover:border-cyan-400/50"
            }`}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <motion.div className={`${glassStyles.card} p-6 ${shadows.md}`}>
              <h2 className="text-xl font-black text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Users, label: "Manage Users", action: () => setActiveTab("users") },
                  { icon: BarChart3, label: "View Analytics", action: () => setActiveTab("analytics") },
                  { icon: Shield, label: "Security", action: () => setActiveTab("security") },
                  { icon: Settings, label: "Settings", action: () => setActiveTab("settings") },
                ].map(action => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.label}
                      whileHover={{ scale: 1.05 }}
                      onClick={action.action}
                      className={`${glassStyles.button} p-4 text-white flex flex-col items-center gap-2`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-semibold">{action.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "users" && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* User Search & Filter */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 ${glassStyles.input}`}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`${glassStyles.button} px-4 py-2 text-white`}
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Add User
              </motion.button>
            </div>

            {/* Users Table */}
            <motion.div className={`${glassStyles.card} p-6 ${shadows.md} overflow-x-auto`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-slate-400 font-bold">Name</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-bold">Email</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-bold">Role</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-bold">Status</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-bold">Joined</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user, idx) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-white/10 hover:bg-white/[0.04] transition-all"
                    >
                      <td className="py-3 px-4 text-white font-semibold">{user.name}</td>
                      <td className="py-3 px-4 text-slate-400">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{user.joinDate}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 rounded hover:bg-red-400/20 text-slate-400 hover:text-red-400 transition-all">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "analytics" && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${glassStyles.card} p-6 ${shadows.md}`}
          >
            <h2 className="text-xl font-black text-white mb-4">Platform Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-white/[0.04] border border-white/10">
                <div className="text-sm text-slate-400 mb-2">Daily Active Users</div>
                <div className="text-3xl font-black text-cyan-400">12,847</div>
                <div className="text-xs text-emerald-400 mt-2">↑ 8.4% from yesterday</div>
              </div>
              <div className="p-4 rounded-lg bg-white/[0.04] border border-white/10">
                <div className="text-sm text-slate-400 mb-2">Transactions (24h)</div>
                <div className="text-3xl font-black text-fuchsia-400">48,294</div>
                <div className="text-xs text-emerald-400 mt-2">↑ 12.1% from yesterday</div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${glassStyles.card} p-6 ${shadows.md}`}
          >
            <h2 className="text-xl font-black text-white mb-4">Security Status</h2>
            <div className="space-y-3">
              {[
                { name: "SSL Certificate", status: "valid", expires: "2025-12-31" },
                { name: "2FA Enforcement", status: "enabled", coverage: "98.4%" },
                { name: "Rate Limiting", status: "active", requests: "10k/min" },
                { name: "DDoS Protection", status: "active", mitigated: "2,847 attacks" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.04] border border-white/10"
                >
                  <div>
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {(item as any).expires || (item as any).coverage || (item as any).requests}
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${glassStyles.card} p-6 ${shadows.md}`}
          >
            <h2 className="text-xl font-black text-white mb-4">Platform Settings</h2>
            <div className="space-y-4">
              {[
                { label: "Maintenance Mode", enabled: false },
                { label: "New User Registration", enabled: true },
                { label: "Email Verification Required", enabled: true },
                { label: "Two-Factor Authentication", enabled: true },
              ].map((setting, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.04] border border-white/10"
                >
                  <div className="font-semibold text-white">{setting.label}</div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      setting.enabled ? "bg-emerald-400" : "bg-slate-600"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
