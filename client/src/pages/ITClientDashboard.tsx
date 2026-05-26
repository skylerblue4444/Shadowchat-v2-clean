import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { Shield, Activity, Clock, CreditCard, FileText, Settings, User, Bell, ChevronRight } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * IT Client Dashboard — Innovative IT Resolutions
 * The primary customer portal for booking, payments, and service monitoring.
 */
export const ITClientDashboard: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Top Bar */}
      <div className="p-4 border-b border-slate-900 flex justify-between items-center bg-slate-950/50">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-blue-600 flex items-center justify-center font-black">I</div>
          <h2 className="text-sm font-black tracking-tighter">CLIENT_PORTAL_v10</h2>
        </div>
        <div className="flex items-center gap-6">
          <GlobalStatus />
          <Bell className="h-4 w-4 text-slate-500 cursor-pointer hover:text-blue-500 transition-colors" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700" />
            <span className="text-[10px] font-mono text-slate-400 uppercase">Skyler_Admin</span>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar / Navigation */}
        <div className="space-y-2">
          {[
            { label: 'OVERVIEW', icon: Activity, active: true },
            { label: 'MANAGED SERVICES', icon: Shield },
            { label: 'BOOKING & SCHEDULING', icon: Clock },
            { label: 'INVOICES & PAYMENTS', icon: CreditCard },
            { label: 'REPORTS & AUDITS', icon: FileText },
            { label: 'ACCOUNT SETTINGS', icon: Settings },
          ].map((item, i) => (
            <div key={i} className={`flex items-center justify-between p-3 cursor-pointer transition-all ${item.active ? 'bg-blue-600/10 border-l-2 border-blue-600 text-blue-500' : 'text-slate-500 hover:bg-slate-900 hover:text-slate-300'}`}>
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase">{item.label}</span>
              </div>
              <ChevronRight className="h-3 w-3 opacity-30" />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PremiumCard title="SYSTEM HEALTH">
              <div className="flex items-center justify-between">
                <div className="text-3xl font-black text-green-500">99.9%</div>
                <SovereignBadge label="OPTIMAL" />
              </div>
              <p className="text-[10px] text-slate-500 mt-2 uppercase">All managed nodes are active and secure.</p>
            </PremiumCard>
            <PremiumCard title="ACTIVE THREATS">
              <div className="flex items-center justify-between">
                <div className="text-3xl font-black text-slate-200">0</div>
                <SovereignBadge label="SECURE" />
              </div>
              <p className="text-[10px] text-slate-500 mt-2 uppercase">Last scan completed 14m ago.</p>
            </PremiumCard>
            <PremiumCard title="UPCOMING SESSIONS">
              <div className="flex items-center justify-between">
                <div className="text-3xl font-black text-blue-500">2</div>
                <Button variant="ghost" className="h-6 text-[8px] text-blue-500 p-0 hover:bg-transparent">VIEW ALL</Button>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 uppercase">Next: Security Audit @ 2PM</p>
            </PremiumCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PremiumCard title="BOOK A NEW SESSION">
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Schedule an elite consultation or technical intervention.</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-slate-800 text-[10px] font-mono h-12 rounded-none uppercase">Security Audit</Button>
                  <Button variant="outline" className="border-slate-800 text-[10px] font-mono h-12 rounded-none uppercase">DevOps Sprint</Button>
                  <Button variant="outline" className="border-slate-800 text-[10px] font-mono h-12 rounded-none uppercase">Managed Support</Button>
                  <Button variant="outline" className="border-slate-800 text-[10px] font-mono h-12 rounded-none uppercase">Custom Hack</Button>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-none uppercase">GO TO SCHEDULER</Button>
              </div>
            </PremiumCard>

            <PremiumCard title="RECENT INVOICES">
              <div className="space-y-2">
                {[
                  { id: 'INV-4441', amount: '$2,500.00', status: 'PAID' },
                  { id: 'INV-4442', amount: '$1,200.00', status: 'PENDING' },
                ].map((inv, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-slate-900 border border-slate-800 text-[10px] font-mono">
                    <span className="text-slate-400">{inv.id}</span>
                    <span className="text-slate-200 font-bold">{inv.amount}</span>
                    <span className={inv.status === 'PAID' ? 'text-green-500' : 'text-amber-500'}>{inv.status}</span>
                  </div>
                ))}
                <Button className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-none uppercase text-[10px] py-4">MAKE A PAYMENT</Button>
              </div>
            </PremiumCard>
          </div>

          <PremiumCard title="LIVE SERVICE MONITORING">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-600/5 border-l-2 border-blue-600">
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <p className="text-xs font-bold text-slate-200">ENTERPRISE FIREWALL ACTIVE</p>
                    <p className="text-[10px] text-slate-500">Filtering 1.2M packets/sec across all nodes.</p>
                  </div>
                </div>
                <SovereignBadge label="LIVE_LOG" />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-900 border-l-2 border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                  <div>
                    <p className="text-xs font-bold text-slate-200">DEVOPS CI/CD PIPELINE</p>
                    <p className="text-[10px] text-slate-500">Deploying v10.4.2 to Production Shadow Pool.</p>
                  </div>
                </div>
                <SovereignBadge label="DEPLOYING" />
              </div>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default ITClientDashboard;
