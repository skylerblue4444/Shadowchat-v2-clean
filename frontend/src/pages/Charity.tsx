import React, { useState } from 'react';
import {
  Heart,
  Globe,
  TrendingUp,
  Shield,
  Plus,
  ArrowRight,
  CheckCircle,
  Users,
  DollarSign,
  Award,
  Calendar,
  Zap,
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: string;
  raised: string;
  donors: number;
  image: string;
  category: 'Environment' | 'Education' | 'Health' | 'Crisis';
  impact: string;
  verified: boolean;
}

const Charity: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const campaigns: Campaign[] = [
    { id: '1', title: 'Ocean Clean-up Initiative', description: 'Removing plastic waste from the Pacific Garbage Patch using autonomous swarm technology.', goal: '$500,000', raised: '$345,000', donors: 12450, image: '🌊', category: 'Environment', impact: '450 Tons Removed', verified: true },
    { id: '2', title: 'Web3 Education for All', description: 'Providing free Web3 and AI development courses to underprivileged communities worldwide.', goal: '$250,000', raised: '$189,000', donors: 8934, image: '🎓', category: 'Education', impact: '12K Students Enrolled', verified: true },
    { id: '3', title: 'Global Crisis Relief Fund', description: 'Instant humanitarian aid for areas affected by natural disasters and conflicts.', goal: '$1,000,000', raised: '$850,000', donors: 45230, image: '🏥', category: 'Health', impact: '24 Countries Supported', verified: true },
  ];

  const stats = [
    { label: 'Total Raised', value: '$12.4M', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Total Donors', value: '1.2M', icon: <Users className="h-5 w-5" /> },
    { label: 'Impact Score', value: '98.5', icon: <Award className="h-5 w-5" /> },
    { label: 'Live Campaigns', value: '45', icon: <Zap className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-5xl font-black mb-2">Charity Hub</h1>
            <p className="text-slate-400">Decentralized philanthropy with 100% transparency and verified impact</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Start Campaign
          </button>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 text-center">
              <div className="flex justify-center mb-2 text-pink-400">{stat.icon}</div>
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Campaign List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {campaigns.map((camp) => (
            <div key={camp.id} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:border-pink-500 transition group flex flex-col">
              <div className="aspect-video bg-slate-700/50 flex items-center justify-center text-8xl group-hover:scale-105 transition duration-500">
                {camp.image}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black bg-pink-600/20 text-pink-400 px-2 py-0.5 rounded uppercase">
                    {camp.category}
                  </span>
                  {camp.verified && (
                    <div className="flex items-center gap-1 text-blue-400 text-xs font-bold">
                      <CheckCircle className="h-3 w-3" /> Verified
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2">{camp.title}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3">{camp.description}</p>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400 font-bold">{camp.raised} raised</span>
                    <span className="text-slate-500">Goal: {camp.goal}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-6">
                    <div className="bg-pink-500 h-full" style={{ width: '69%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800 mb-6">
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase">Impact</p>
                      <p className="text-sm font-bold text-green-400">{camp.impact}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 font-black uppercase">Donors</p>
                      <p className="text-sm font-bold">{camp.donors.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-white text-slate-950 rounded-xl font-black hover:bg-pink-50 transition flex items-center justify-center gap-2">
                    Donate Now <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Report */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black mb-2">Transparency & Trust</h2>
              <p className="text-slate-400">Real-time auditing of all charity flows on the blockchain</p>
            </div>
            <button className="text-pink-400 font-bold hover:underline flex items-center gap-1">
              View Audit Log <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Zero Fees', description: '100% of your donation goes directly to the cause.', icon: <Shield className="text-blue-400" /> },
              { title: 'Live Tracking', description: 'Follow your donation from wallet to final impact.', icon: <Globe className="text-green-400" /> },
              { title: 'Verified Orgs', description: 'All partners undergo rigorous security audits.', icon: <CheckCircle className="text-purple-400" /> },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-700/30 rounded-xl border border-slate-600">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charity;
