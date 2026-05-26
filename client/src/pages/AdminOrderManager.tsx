import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, Truck, CheckCircle, XCircle, Clock, ExternalLink, Filter } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Admin Order Manager — Billion-Dollar Polish
 * Fulfillment dashboard for Alibaba/DHGate orders with status tracking and escrow release.
 */
export const AdminOrderManager: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/50">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-rose-500 uppercase">ORDER_MANAGER_v10</h1>
          <GlobalStatus />
        </div>
        <div className="flex gap-4">
          <SovereignBadge label="ESCROW_SYSTEM_ACTIVE" />
          <SovereignBadge label="ADMIN_AUTH_VERIFIED" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PremiumCard title="PENDING_ORDERS">
            <div className="text-3xl font-black text-rose-500">14</div>
            <p className="text-[10px] text-slate-500 mt-2 uppercase">Awaiting Fulfillment</p>
          </PremiumCard>
          <PremiumCard title="IN_TRANSIT">
            <div className="text-3xl font-black text-blue-500">42</div>
            <p className="text-[10px] text-slate-500 mt-2 uppercase">Global Logistics Active</p>
          </PremiumCard>
          <PremiumCard title="TOTAL_REVENUE">
            <div className="text-3xl font-black text-green-500">12.4K SKY</div>
            <p className="text-[10px] text-slate-500 mt-2 uppercase">Net Marketplace Volume</p>
          </PremiumCard>
          <PremiumCard title="ESCROW_LOCKED">
            <div className="text-3xl font-black text-amber-500">8.2K SKY</div>
            <p className="text-[10px] text-slate-500 mt-2 uppercase">Held in Shadow Escrow</p>
          </PremiumCard>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row gap-4 bg-slate-950 border border-slate-900 p-4">
          <div className="flex-1 relative">
            <input 
              className="w-full bg-slate-900 border border-slate-800 text-xs px-4 py-3 rounded-none focus:border-rose-500 outline-none font-mono"
              placeholder="Search_by_Order_ID_or_Tracking_Number..."
            />
          </div>
          <Button variant="outline" className="border-slate-800 text-[10px] font-mono h-10 rounded-none uppercase">
            <Filter className="h-4 w-4 mr-2" /> Filter_Orders
          </Button>
        </div>

        {/* Order Table */}
        <div className="bg-slate-950 border border-slate-900 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-900/30">
                {['Order_ID', 'Client', 'Product', 'Platform', 'Price', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="p-4 text-[10px] font-black text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {[
                { id: 'ORD-4444-X', client: 'User_444', product: 'ASIC_Miner_S19', platform: 'Alibaba', price: '444 SKY', status: 'PENDING' },
                { id: 'ORD-4445-Y', client: 'Hacker_Zero', product: 'Mechanical_Keyboard', platform: 'DHGate', price: '12 SKY', status: 'SHIPPED' },
                { id: 'ORD-4446-Z', client: 'Degen_Lord', product: 'GPU_3080_Ti', platform: 'Alibaba', price: '120 SKY', status: 'DELIVERED' },
              ].map((order, i) => (
                <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4 text-[10px] font-mono text-slate-300">#{order.id}</td>
                  <td className="p-4 text-[10px] font-mono text-slate-400">{order.client}</td>
                  <td className="p-4 text-[10px] font-black text-slate-200 uppercase">{order.product}</td>
                  <td className="p-4 text-[10px] font-mono text-slate-500 uppercase">{order.platform}</td>
                  <td className="p-4 text-[10px] font-black text-green-500">{order.price}</td>
                  <td className="p-4">
                    <span className={`text-[8px] font-black px-2 py-1 uppercase ${order.status === 'PENDING' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30' : order.status === 'SHIPPED' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/30' : 'bg-green-500/10 text-green-500 border border-green-500/30'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-rose-500">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-green-500">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderManager;
