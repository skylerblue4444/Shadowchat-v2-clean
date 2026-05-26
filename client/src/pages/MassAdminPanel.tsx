import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Activity, Shield, Settings, Database, Cpu, Globe, AlertTriangle, CheckCircle, TrendingUp, Eye, Ban, Zap, RefreshCw, Search, Filter, BarChart3 } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const MOCK_USERS = [
  { id: 1, username: 'sky_whale_44', email: 'whale@sky444.io', tier: 'Diamond', balance: '$284,201', joined: 'Jan 2025', status: 'ACTIVE', trades: 4847, kyc: true, country: 'US' },
  { id: 2, username: 'shadow_trader_x', email: 'shadow@anon.io', tier: 'Gold', balance: '$48,200', joined: 'Mar 2025', status: 'ACTIVE', trades: 1204, kyc: false, country: 'RU' },
  { id: 3, username: 'defi_degen_44', email: 'degen@crypto.io', tier: 'Silver', balance: '$12,847', joined: 'May 2025', status: 'SUSPENDED', trades: 312, kyc: true, country: 'DE' },
  { id: 4, username: 'anon_user_007', email: 'anon@proton.me', tier: 'Bronze', balance: '$2,104', joined: 'Aug 2025', status: 'ACTIVE', trades: 47, kyc: false, country: 'Unknown' },
  { id: 5, username: 'crypto_mom_44', email: 'mom@gmail.com', tier: 'Silver', balance: '$8,420', joined: 'Oct 2025', status: 'ACTIVE', trades: 89, kyc: true, country: 'US' },
];

const SYSTEM_STATS = [
  { label: 'Total Users', value: '2,847,203', delta: '+12.4%', icon: Users, color: 'blue' },
  { label: 'Revenue MTD', value: '$4.28M', delta: '+23.1%', icon: DollarSign, color: 'green' },
  { label: 'Active Sessions', value: '847,441', delta: '+8.2%', icon: Activity, color: 'green' },
  { label: 'Open Tickets', value: '284', delta: '-18%', icon: AlertTriangle, color: 'amber' },
  { label: 'DB Size', value: '2.4 TB', delta: '+0.2TB', icon: Database, color: 'blue' },
  { label: 'API Calls/min', value: '284K', delta: '+34%', icon: Zap, color: 'purple' },
  { label: 'Blocked IPs', value: '12,847', delta: '+204', icon: Shield, color: 'red' },
  { label: 'Uptime', value: '99.97%', delta: '0%', icon: Cpu, color: 'green' },
];

export default function MassAdminPanel() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [tab, setTab] = useState<'dashboard' | 'users' | 'moderation' | 'system' | 'financial'>('dashboard');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(MOCK_USERS);
  const [liveActions, setLiveActions] = useState<string[]>([]);

  useEffect(() => {
    const actions = [
      'User sky_whale_44 executed BTC trade $47,200',
      'New signup: user_4848201 from US',
      'KYC approved: defi_user_x',
      'Withdrawal processed: 0.5 ETH to 0x4444...',
      'Suspicious activity flagged: ip=185.220.101.47',
      'Bot TradeMaster_44 executed 12 trades',
    ];
    const t = setInterval(() => {
      setLiveActions(prev => [actions[Math.floor(Math.random() * actions.length)], ...prev.slice(0, 9)]);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const suspendUser = (id: number) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED' } : u));

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-red-500" />
          <div>
            <h1 className="text-lg font-black">MASS_ADMIN_PANEL_v20</h1>
            <p className="text-slate-500 text-xs">Platform Administration · SKY444 Super App</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[10px] text-green-400"><Activity className="h-3 w-3 animate-pulse" /> LIVE</div>
          <span className="text-[10px] border border-red-800 text-red-400 px-2 py-1 font-bold">ADMIN ACCESS</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-3 border-b border-slate-900 overflow-x-auto">
        {(['dashboard', 'users', 'moderation', 'system', 'financial'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-shrink-0 px-4 py-2 text-xs font-bold uppercase transition-all ${tab === t ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>{t}</button>
        ))}
      </div>

      <div className="p-4">
        {tab === 'dashboard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SYSTEM_STATS.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-slate-900 border border-slate-800 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-4 w-4 text-${s.color}-500`} />
                      <span className="text-[10px] text-slate-500">{s.label}</span>
                    </div>
                    <div className={`text-xl font-black text-${s.color}-400`}>{s.value}</div>
                    <div className={`text-[10px] font-bold ${s.delta.startsWith('+') ? 'text-green-400' : s.delta.startsWith('-') ? 'text-red-400' : 'text-slate-500'}`}>{s.delta}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4">
                <h3 className="text-[10px] text-slate-500 uppercase mb-3 flex items-center gap-2"><Activity className="h-3 w-3 text-green-500 animate-pulse" /> Live Activity</h3>
                <div className="space-y-1 text-xs">
                  {liveActions.map((action, i) => (
                    <div key={i} className={`py-1 border-b border-slate-800 last:border-0 ${i === 0 ? 'text-green-400' : 'text-slate-400'}`}>{action}</div>
                  ))}
                  {liveActions.length === 0 && <div className="text-slate-600">Waiting for activity...</div>}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4">
                <h3 className="text-[10px] text-slate-500 uppercase mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Broadcast Message', color: 'blue' },
                    { label: 'Export User Data', color: 'green' },
                    { label: 'Clear Cache', color: 'amber' },
                    { label: 'Run DB Backup', color: 'purple' },
                    { label: 'View Error Logs', color: 'red' },
                    { label: 'Restart Services', color: 'amber' },
                  ].map(a => (
                    <button key={a.label} className={`border border-${a.color}-800 text-${a.color}-400 text-[10px] font-bold py-2 hover:bg-${a.color}-950/30 transition-all`}>{a.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'users' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-700 px-3">
                <Search className="h-4 w-4 text-slate-500" />
                <input className="flex-1 bg-transparent py-2 text-sm outline-none placeholder-slate-600" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="flex items-center gap-2 border border-slate-700 text-slate-400 px-4 text-xs font-bold hover:border-slate-500 transition-all"><Filter className="h-3 w-3" /> Filter</button>
            </div>

            <div className="space-y-2">
              {users.filter(u => u.username.includes(search) || u.email.includes(search)).map(user => (
                <div key={user.id} className={`border p-4 ${user.status === 'SUSPENDED' ? 'border-red-900 bg-red-950/10' : 'border-slate-800 bg-slate-900'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-900/40 border border-blue-800 flex items-center justify-center font-black text-blue-400">{user.username[0].toUpperCase()}</div>
                      <div>
                        <div className="text-sm font-bold">@{user.username}</div>
                        <div className="text-[10px] text-slate-500">{user.email} · {user.country} · Joined {user.joined}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[9px] px-1.5 py-0.5 border ${user.tier === 'Diamond' ? 'border-blue-700 text-blue-400' : user.tier === 'Gold' ? 'border-amber-700 text-amber-400' : user.tier === 'Silver' ? 'border-slate-600 text-slate-400' : 'border-orange-900 text-orange-400'}`}>{user.tier}</span>
                          {user.kyc && <span className="text-[9px] border border-green-800 text-green-400 px-1.5 py-0.5">KYC ✓</span>}
                          <span className={`text-[9px] font-black ${user.status === 'ACTIVE' ? 'text-green-400' : 'text-red-400'}`}>{user.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs font-bold text-amber-400">{user.balance}</div>
                        <div className="text-[10px] text-slate-500">{user.trades} trades</div>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1.5 border border-slate-700 hover:border-slate-500 transition-all"><Eye className="h-3 w-3 text-slate-500" /></button>
                        <button onClick={() => suspendUser(user.id)} className={`p-1.5 border transition-all ${user.status === 'SUSPENDED' ? 'border-green-800 hover:bg-green-950/30' : 'border-red-900 hover:bg-red-950/30'}`}>
                          <Ban className={`h-3 w-3 ${user.status === 'SUSPENDED' ? 'text-green-400' : 'text-red-400'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'moderation' && (
          <div className="space-y-3">
            {[
              { type: 'Spam Report', user: 'anon_user_007', detail: 'Sending unsolicited DMs', severity: 'MED', time: '5m ago' },
              { type: 'Fraud Attempt', user: 'shadow_scammer', detail: 'Fake OTC deal, attempted $50K theft', severity: 'HIGH', time: '12m ago' },
              { type: 'NSFW Violation', user: 'content_violator', detail: 'Uploaded prohibited content', severity: 'HIGH', time: '28m ago' },
              { type: 'Bot Activity', user: 'bot_farm_44', detail: '1,200 automated actions in 1 hour', severity: 'MED', time: '1h ago' },
              { type: 'KYC Fraud', user: 'fake_id_user', detail: 'Submitted forged identity documents', severity: 'CRIT', time: '2h ago' },
            ].map((item, i) => (
              <div key={i} className={`border p-4 ${item.severity === 'CRIT' ? 'border-red-800 bg-red-950/10' : item.severity === 'HIGH' ? 'border-orange-900 bg-orange-950/10' : 'border-slate-800 bg-slate-900'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black px-2 py-0.5 border ${item.severity === 'CRIT' ? 'border-red-700 text-red-400' : item.severity === 'HIGH' ? 'border-orange-700 text-orange-400' : 'border-yellow-700 text-yellow-400'}`}>{item.severity}</span>
                    <span className="text-sm font-bold">{item.type}</span>
                    <span className="text-[10px] text-slate-500">@{item.user}</span>
                  </div>
                  <span className="text-[10px] text-slate-600">{item.time}</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">{item.detail}</p>
                <div className="flex gap-2">
                  <button className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-3 py-1.5 transition-all">BAN USER</button>
                  <button className="border border-amber-800 text-amber-400 text-[10px] font-bold px-3 py-1.5 hover:bg-amber-950/30 transition-all">WARN</button>
                  <button className="border border-slate-700 text-slate-400 text-[10px] font-bold px-3 py-1.5 hover:border-slate-500 transition-all">DISMISS</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'system' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { service: 'API Gateway', cpu: 12, mem: 34, status: 'HEALTHY', region: 'us-east-1' },
              { service: 'Trading Engine', cpu: 45, mem: 67, status: 'HEALTHY', region: 'us-east-1' },
              { service: 'PostgreSQL Primary', cpu: 28, mem: 71, status: 'HEALTHY', region: 'us-east-1' },
              { service: 'Redis Cluster', cpu: 8, mem: 45, status: 'HEALTHY', region: 'global' },
              { service: 'AI Inference', cpu: 78, mem: 82, status: 'HIGH_LOAD', region: 'us-west-2' },
              { service: 'CDN Edge', cpu: 5, mem: 22, status: 'HEALTHY', region: 'global' },
            ].map(svc => (
              <div key={svc.service} className={`border p-4 ${svc.status === 'HIGH_LOAD' ? 'border-yellow-800 bg-yellow-950/10' : 'border-slate-800 bg-slate-900'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-bold">{svc.service}</div>
                  <span className={`text-[9px] font-black px-2 py-0.5 border ${svc.status === 'HEALTHY' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>{svc.status}</span>
                </div>
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[9px] mb-0.5"><span className="text-slate-500">CPU</span><span className={svc.cpu > 70 ? 'text-red-400' : 'text-white'}>{svc.cpu}%</span></div>
                    <div className="bg-slate-800 h-1.5"><div className={`h-full ${svc.cpu > 70 ? 'bg-red-500' : 'bg-blue-500'}`} style={{width:`${svc.cpu}%`}} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] mb-0.5"><span className="text-slate-500">Memory</span><span className={svc.mem > 80 ? 'text-red-400' : 'text-white'}>{svc.mem}%</span></div>
                    <div className="bg-slate-800 h-1.5"><div className={`h-full ${svc.mem > 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{width:`${svc.mem}%`}} /></div>
                  </div>
                </div>
                <div className="text-[9px] text-slate-600 mt-2">{svc.region}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'financial' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Revenue Today', value: '$142,847', color: 'green' },
                { label: 'Revenue MTD', value: '$4.28M', color: 'green' },
                { label: 'Pending Withdrawals', value: '$284,201', color: 'amber' },
                { label: 'Platform Fees', value: '$42,847', color: 'blue' },
              ].map(s => (
                <div key={s.label} className="bg-slate-900 border border-slate-800 p-4 text-center">
                  <div className={`text-xl font-black text-${s.color}-400`}>{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4">
              <h3 className="text-[10px] text-slate-500 uppercase mb-3">Revenue by Feature</h3>
              {[
                { feature: 'Trading Fees', revenue: '$1.84M', pct: 43 },
                { feature: 'Premium Subscriptions', revenue: '$840K', pct: 20 },
                { feature: 'Creator Economy', revenue: '$624K', pct: 15 },
                { feature: 'OTC Desk', revenue: '$420K', pct: 10 },
                { feature: 'Other', revenue: '$512K', pct: 12 },
              ].map(r => (
                <div key={r.feature} className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] text-slate-400 w-40">{r.feature}</span>
                  <div className="flex-1 bg-slate-800 h-2"><div className="h-full bg-green-500" style={{width:`${r.pct}%`}} /></div>
                  <span className="text-[10px] text-green-400 w-16 text-right font-bold">{r.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
