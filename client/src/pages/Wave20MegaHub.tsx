import React from 'react';
import { Zap, TrendingUp, Building2, Briefcase, Globe, Target, Gift, ShoppingBag, Award, BarChart3, Newspaper, Shield, RefreshCw, Rocket, Crown, Star, DollarSign, Package, Lock, ArrowRight } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const WAVE20_FEATURES = [
  { num: 1, name: 'AI Portfolio Manager', icon: TrendingUp, color: 'purple', route: '/dashboard/ai-portfolio' },
  { num: 2, name: 'Options Trading Terminal', icon: BarChart3, color: 'green', route: '/dashboard/options-trading' },
  { num: 3, name: 'Supply Chain Tracker', icon: Package, color: 'blue', route: '/dashboard/supply-chain' },
  { num: 4, name: 'Real Estate Token Hub', icon: Building2, color: 'amber', route: '/dashboard/real-estate-tokens' },
  { num: 5, name: 'Freelance Marketplace', icon: Briefcase, color: 'blue', route: '/dashboard/freelance-market' },
  { num: 6, name: 'Lending Aggregator', icon: DollarSign, color: 'green', route: '/dashboard/lending-aggregator' },
  { num: 7, name: 'Prediction Markets', icon: Target, color: 'amber', route: '/dashboard/prediction-markets' },
  { num: 8, name: 'Global Remittance Hub', icon: Globe, color: 'blue', route: '/dashboard/remittance' },
  { num: 9, name: 'Content Paywall', icon: Lock, color: 'amber', route: '/dashboard/content-paywall' },
  { num: 10, name: 'Analytics Command', icon: BarChart3, color: 'blue', route: '/dashboard/analytics-command' },
  { num: 11, name: 'Crowdfunding Platform', icon: Rocket, color: 'orange', route: '/dashboard/crowdfunding' },
  { num: 12, name: 'Loyalty Program', icon: Crown, color: 'amber', route: '/dashboard/loyalty-program' },
  { num: 13, name: 'AI News Trader', icon: Newspaper, color: 'blue', route: '/dashboard/ai-news-trader' },
  { num: 14, name: 'Escrow Service', icon: Shield, color: 'green', route: '/dashboard/escrow-service' },
  { num: 15, name: 'Crypto Job Board', icon: Briefcase, color: 'blue', route: '/dashboard/crypto-jobs' },
  { num: 16, name: 'Airdrop Center', icon: Gift, color: 'pink', route: '/dashboard/airdrop-center' },
  { num: 17, name: 'Portfolio Rebalancer', icon: RefreshCw, color: 'green', route: '/dashboard/portfolio-rebalancer' },
  { num: 18, name: 'Merch Store', icon: ShoppingBag, color: 'pink', route: '/dashboard/merch-store' },
  { num: 19, name: 'Grant Program', icon: Award, color: 'amber', route: '/dashboard/grant-program' },
  { num: 20, name: 'Wave 20 Hub', icon: Zap, color: 'amber', route: '/dashboard/wave20-hub' },
];

export default function Wave20MegaHub() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen p-6 font-mono">
      <div className="text-center mb-8 border-b border-green-900 pb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Zap className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-green-400 mb-2">WAVE_20_MEGA_UPGRADE</h1>
        <p className="text-slate-600 text-sm">Best 44 Pages · AI Portfolio · RWA · Freelance · Predictions · Remittance · Crowdfunding · More</p>
        <div className="flex justify-center gap-8 mt-4">
          <div><div className="text-2xl font-black text-green-400">44</div><div className="text-[10px] text-slate-600">New Pages</div></div>
          <div><div className="text-2xl font-black text-blue-400">20+</div><div className="text-[10px] text-slate-600">Categories</div></div>
          <div><div className="text-2xl font-black text-amber-400">v20</div><div className="text-[10px] text-slate-600">Wave</div></div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {WAVE20_FEATURES.map(f => {
          const Icon = f.icon;
          return (
            <a key={f.num} href={f.route} className="flex items-center gap-2 border border-slate-800 hover:border-green-700 bg-slate-900 hover:bg-green-950/20 p-3 transition-all group">
              <Icon className={`h-4 w-4 text-${f.color}-500 flex-shrink-0`} />
              <span className="text-[10px] text-slate-400 group-hover:text-white">{f.num}. {f.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
