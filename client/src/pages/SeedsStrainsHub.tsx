import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { Leaf, Droplets, Thermometer, Sun, Zap, Search, ShoppingCart } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Seeds & Strains Hub — Billion-Dollar Polish
 * Elite strains with grow tips, ratings, and multi-coin commerce.
 */
export const SeedsStrainsHub: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/50">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-green-500">SEEDS_&_STRAINS_v10</h1>
          <GlobalStatus />
        </div>
        <div className="flex gap-4">
          <SovereignBadge label="GROW_OPTIMIZATION_ON" />
          <SovereignBadge label="DISCRETE_SHIPPING_ACTIVE" />
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search & Filters */}
        <div className="space-y-6">
          <PremiumCard title="FILTER_BY_TYPE">
            <div className="space-y-2">
              {['SATIVA', 'INDICA', 'HYBRID', 'AUTOFLOWER', 'HIGH_CBD'].map((type, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-900 cursor-pointer group">
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-green-500">{type}</span>
                  <div className="h-2 w-2 bg-slate-800 group-hover:bg-green-500 rounded-full" />
                </div>
              ))}
            </div>
          </PremiumCard>

          <PremiumCard title="GROW_STATS">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Thermometer className="h-4 w-4 text-green-500" />
                <span className="text-[10px] font-mono text-slate-400">TEMP: 74.2°F</span>
              </div>
              <div className="flex items-center gap-3">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-[10px] font-mono text-slate-400">HUMIDITY: 55%</span>
              </div>
              <div className="flex items-center gap-3">
                <Sun className="h-4 w-4 text-yellow-500" />
                <span className="text-[10px] font-mono text-slate-400">LIGHT: 18/6 CYCLE</span>
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* Main Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            { name: 'SHADOW_KUSH', thc: '28%', yield: 'HIGH', flow: '8-9w', price: '44 SKY' },
            { name: 'SKY_WALKER_v10', thc: '24%', yield: 'EXTREME', flow: '7-8w', price: '88 SKY' },
            { name: 'AUTO_SOVEREIGN', thc: '22%', yield: 'MEDIUM', flow: '10w', price: '22 SKY' },
            { name: 'DEGEN_HAZE', thc: '26%', yield: 'HIGH', flow: '9w', price: '44 SKY' },
            { name: 'BLOCKCHAIN_BLUE', thc: '20%', yield: 'HIGH', flow: '8w', price: '32 SKY' },
            { name: 'PHANTOM_PURP', thc: '25%', yield: 'MEDIUM', flow: '9w', price: '50 SKY' },
          ].map((strain, i) => (
            <PremiumCard key={i} title={strain.name}>
              <div className="aspect-square bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group overflow-hidden relative">
                <Leaf className="h-16 w-16 text-slate-800 group-hover:text-green-500 transition-colors" />
                <div className="absolute top-4 right-4 bg-green-500 text-black font-black text-[8px] px-2 py-1 uppercase">{strain.thc} THC</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[8px] font-mono text-slate-500 mb-6 uppercase">
                <div>
                  <p>Yield: <span className="text-slate-200">{strain.yield}</span></p>
                  <p>Flowering: <span className="text-slate-200">{strain.flow}</span></p>
                </div>
                <div className="text-right">
                  <p>Rating: <span className="text-amber-500">★★★★★</span></p>
                  <p className="text-green-500 font-black">{strain.price}</p>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-black font-black py-6 rounded-none uppercase">
                <ShoppingCart className="h-4 w-4 mr-2" /> ADD_TO_CART
              </Button>
            </PremiumCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeedsStrainsHub;
