import React, { useState } from 'react';
import { UniversalLayout } from '@/components/UniversalLayout';
import { SovereignCard } from '@/components/SovereignCard';
import { Briefcase, Home, Stethoscope, Palette, Zap, Users, Globe, TrendingUp, Heart, Cpu } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * MEGA UPGRADE v16 - FEATURES 11-20: SPECIALIZED INDUSTRY & LIFESTYLE HUBS
 * 
 * 11. Professional Services Hub (Legal, Accounting, Consulting)
 * 12. Real Estate & Property Management
 * 13. Healthcare & Wellness Marketplace
 * 14. Creative & Digital Arts Studio
 * 15. Education & Skill Development Academy
 * 16. Travel & Lifestyle Concierge
 * 17. Luxury Goods & Collectibles
 * 18. Sustainability & Green Economy
 * 19. Sports & Fitness Ecosystem
 * 20. Enterprise B2B Solutions Platform
 */

export const SpecializedHubsEcosystem: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [activeHub, setActiveHub] = useState<'professional' | 'real-estate' | 'health' | 'creative' | 'education'>('professional');

  const hubs = [
    { id: 'professional', name: 'Professional Services', icon: '💼', users: '125k', revenue: '$450M' },
    { id: 'real-estate', name: 'Real Estate', icon: '🏠', users: '89k', revenue: '$2.1B' },
    { id: 'health', name: 'Healthcare', icon: '⚕️', users: '245k', revenue: '$890M' },
    { id: 'creative', name: 'Creative Arts', icon: '🎨', users: '456k', revenue: '$340M' },
    { id: 'education', name: 'Education', icon: '📚', users: '678k', revenue: '$560M' },
  ];

  const professionalServices = [
    { service: 'Legal Consulting', providers: 2450, rating: 4.8, volume: '$125M' },
    { service: 'Accounting', providers: 1890, rating: 4.7, volume: '$98M' },
    { service: 'Management Consulting', providers: 1240, rating: 4.9, volume: '$156M' },
    { service: 'Tax Planning', providers: 3450, rating: 4.6, volume: '$71M' },
  ];

  const realEstateListings = [
    { type: 'Residential', listings: 45600, avgPrice: '$450k', sold: '12,450' },
    { type: 'Commercial', listings: 8900, avgPrice: '$2.4M', sold: '2,100' },
    { type: 'Industrial', listings: 3450, avgPrice: '$1.2M', sold: '890' },
    { type: 'Land', listings: 12450, avgPrice: '$250k', sold: '4,560' },
  ];

  const healthcareServices = [
    { service: 'Telemedicine', providers: 8900, rating: 4.8, volume: '245k consults' },
    { service: 'Mental Health', providers: 4560, rating: 4.9, volume: '156k sessions' },
    { service: 'Fitness Training', providers: 12450, rating: 4.7, volume: '890k sessions' },
    { service: 'Nutrition', providers: 3450, rating: 4.6, volume: '67k plans' },
  ];

  return (
    <UniversalLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-purple-400 tracking-tighter flex items-center gap-3">
            <Briefcase className="h-8 w-8" /> SPECIALIZED HUBS ECOSYSTEM
          </h1>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Features 11-20: Industry-Specific Platforms</p>
        </div>

        {/* Hub Selector */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {hubs.map(hub => (
            <button
              key={hub.id}
              onClick={() => setActiveHub(hub.id as any)}
              className={`p-3 rounded-none border-2 transition-all text-center ${
                activeHub === hub.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <p className="text-2xl mb-1">{hub.icon}</p>
              <p className="text-[8px] font-bold text-white">{hub.name}</p>
              <p className="text-[7px] text-slate-500">{hub.users}</p>
            </button>
          ))}
        </div>

        {/* Professional Services */}
        {activeHub === 'professional' && (
          <div className="space-y-6">
            <SovereignCard title="Feature 11: Professional Services Hub" accent="blue" icon={<Briefcase className="h-5 w-5" />}>
              <p className="text-[9px] text-slate-400 mb-4">Legal, accounting, and consulting marketplace</p>
              <div className="space-y-2">
                {professionalServices.map(svc => (
                  <div key={svc.service} className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-none">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] font-bold text-white">{svc.service}</span>
                      <span className="text-[8px] text-yellow-400">⭐ {svc.rating}</span>
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-500">
                      <span>{svc.providers.toLocaleString()} providers</span>
                      <span className="text-blue-400">{svc.volume}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SovereignCard>
          </div>
        )}

        {/* Real Estate */}
        {activeHub === 'real-estate' && (
          <div className="space-y-6">
            <SovereignCard title="Feature 12: Real Estate & Property Management" accent="green" icon={<Home className="h-5 w-5" />}>
              <p className="text-[9px] text-slate-400 mb-4">Property listings, management, and investment</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {realEstateListings.map(prop => (
                  <div key={prop.type} className="p-3 bg-green-500/10 border border-green-500/30 rounded-none">
                    <p className="text-[9px] font-bold text-white mb-2">{prop.type}</p>
                    <div className="space-y-1 text-[8px] text-slate-500">
                      <p>Listings: {prop.listings.toLocaleString()}</p>
                      <p>Avg Price: {prop.avgPrice}</p>
                      <p className="text-green-400">Sold: {prop.sold}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SovereignCard>
          </div>
        )}

        {/* Healthcare */}
        {activeHub === 'health' && (
          <div className="space-y-6">
            <SovereignCard title="Feature 13: Healthcare & Wellness Marketplace" accent="red" icon={<Stethoscope className="h-5 w-5" />}>
              <p className="text-[9px] text-slate-400 mb-4">Telemedicine, fitness, and wellness services</p>
              <div className="space-y-2">
                {healthcareServices.map(svc => (
                  <div key={svc.service} className="p-3 bg-red-500/10 border border-red-500/30 rounded-none">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] font-bold text-white">{svc.service}</span>
                      <span className="text-[8px] text-yellow-400">⭐ {svc.rating}</span>
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-500">
                      <span>{svc.providers.toLocaleString()} providers</span>
                      <span className="text-red-400">{svc.volume}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SovereignCard>
          </div>
        )}

        {/* Creative Arts */}
        {activeHub === 'creative' && (
          <div className="space-y-6">
            <SovereignCard title="Feature 14: Creative & Digital Arts Studio" accent="pink" icon={<Palette className="h-5 w-5" />}>
              <p className="text-[9px] text-slate-400 mb-4">Digital art, design, and creative services</p>
              <div className="grid grid-cols-2 gap-2 text-[9px]">
                <div className="p-2 bg-pink-500/10 border border-pink-500/30">
                  <p className="font-bold text-pink-400">Artists</p>
                  <p className="text-slate-500">45,600</p>
                </div>
                <div className="p-2 bg-pink-500/10 border border-pink-500/30">
                  <p className="font-bold text-pink-400">Artworks</p>
                  <p className="text-slate-500">2.4M</p>
                </div>
                <div className="p-2 bg-pink-500/10 border border-pink-500/30">
                  <p className="font-bold text-pink-400">Monthly Volume</p>
                  <p className="text-slate-500">$340M</p>
                </div>
                <div className="p-2 bg-pink-500/10 border border-pink-500/30">
                  <p className="font-bold text-pink-400">Avg Commission</p>
                  <p className="text-slate-500">5%</p>
                </div>
              </div>
            </SovereignCard>
          </div>
        )}

        {/* Education */}
        {activeHub === 'education' && (
          <div className="space-y-6">
            <SovereignCard title="Feature 15: Education & Skill Development Academy" accent="cyan" icon={<Zap className="h-5 w-5" />}>
              <p className="text-[9px] text-slate-400 mb-4">Online learning, certifications, and skill development</p>
              <div className="grid grid-cols-2 gap-2 text-[9px]">
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/30">
                  <p className="font-bold text-cyan-400">Courses</p>
                  <p className="text-slate-500">12,450</p>
                </div>
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/30">
                  <p className="font-bold text-cyan-400">Instructors</p>
                  <p className="text-slate-500">8,900</p>
                </div>
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/30">
                  <p className="font-bold text-cyan-400">Enrollments</p>
                  <p className="text-slate-500">678k</p>
                </div>
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/30">
                  <p className="font-bold text-cyan-400">Completion Rate</p>
                  <p className="text-slate-500">78%</p>
                </div>
              </div>
            </SovereignCard>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SovereignCard title="Travel & Lifestyle" accent="orange" icon={<Globe className="h-5 w-5" />}>
            <div className="space-y-1 text-[9px]">
              <p>✓ 45k destinations</p>
              <p>✓ 12.4k experiences</p>
              <p>✓ $2.1B annual volume</p>
            </div>
          </SovereignCard>

          <SovereignCard title="Luxury & Collectibles" accent="yellow" icon={<TrendingUp className="h-5 w-5" />}>
            <div className="space-y-1 text-[9px]">
              <p>✓ 89k items listed</p>
              <p>✓ $890M monthly</p>
              <p>✓ 2.5% commission</p>
            </div>
          </SovereignCard>

          <SovereignCard title="Enterprise B2B" accent="green" icon={<Cpu className="h-5 w-5" />}>
            <div className="space-y-1 text-[9px]">
              <p>✓ 4,560 enterprises</p>
              <p>✓ $12.4B annual</p>
              <p>✓ 99.99% uptime</p>
            </div>
          </SovereignCard>
        </div>
      </div>
    </UniversalLayout>
  );
};

export default SpecializedHubsEcosystem;
