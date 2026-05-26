import React, { useState } from 'react';
import {
  Vote,
  Shield,
  FileText,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  ChevronRight,
  Plus,
  Lock,
} from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'failed' | 'queued';
  votesFor: number;
  votesAgainst: number;
  endTime: string;
  proposer: string;
  category: 'treasury' | 'protocol' | 'community' | 'security';
}

const Governance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'proposals' | 'treasury' | 'staking' | 'delegation'>('proposals');

  const proposals: Proposal[] = [
    {
      id: 'PROP-44',
      title: 'Allocate 1M SKY4444 to Creator Fund',
      description: 'Expand the creator economy by providing grants to top-performing artists and developers building on the platform.',
      status: 'active',
      votesFor: 850000,
      votesAgainst: 120000,
      endTime: '2 days left',
      proposer: '@skylerblue',
      category: 'treasury',
    },
    {
      id: 'PROP-43',
      title: 'Upgrade Hope AI Memory Architecture',
      description: 'Implement pgvector-based persistent memory for all Hope AI agents to improve context retention and coordination.',
      status: 'passed',
      votesFor: 1200000,
      votesAgainst: 45000,
      endTime: 'Executed',
      proposer: '@hope_admin',
      category: 'protocol',
    },
    {
      id: 'PROP-42',
      title: 'Implement Multi-Chain Staking Rewards',
      description: 'Bridge staking rewards to ETH and SOL networks to increase token liquidity and reach a wider audience.',
      status: 'failed',
      votesFor: 450000,
      votesAgainst: 600000,
      endTime: 'Finished',
      proposer: '@whale_01',
      category: 'protocol',
    },
  ];

  const treasuryStats = [
    { label: 'Total Treasury', value: '$24.5M', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Locked Value', value: '$18.2M', icon: <Lock className="h-5 w-5" /> },
    { label: 'Voter Participation', value: '34.8%', icon: <Users className="h-5 w-5" /> },
    { label: 'Active Proposals', value: '12', icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-5xl font-black mb-2">Governance Portal</h1>
            <p className="text-slate-400">Shape the future of the ecosystem through decentralized voting</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Proposal
          </button>
        </div>

        {/* Treasury Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {treasuryStats.map((stat, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2 text-purple-400">
                {stat.icon}
                <span className="text-slate-400 text-sm font-semibold">{stat.label}</span>
              </div>
              <p className="text-3xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-700">
          {(['proposals', 'treasury', 'staking', 'delegation'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold transition border-b-2 ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Proposals List */}
          <div className="lg:col-span-2 space-y-6">
            {proposals.map((prop) => (
              <div
                key={prop.id}
                className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-black bg-slate-700 px-2 py-1 rounded text-purple-400 uppercase tracking-wider">
                        {prop.category}
                      </span>
                      <span className="text-xs text-slate-500 font-bold">{prop.id}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{prop.title}</h2>
                    <p className="text-slate-400 text-sm line-clamp-2">{prop.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 ${
                    prop.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    prop.status === 'passed' ? 'bg-blue-500/20 text-blue-400' :
                    prop.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {prop.status === 'active' && <Clock className="h-3 w-3" />}
                    {prop.status === 'passed' && <CheckCircle className="h-3 w-3" />}
                    {prop.status === 'failed' && <XCircle className="h-3 w-3" />}
                    {prop.status}
                  </div>
                </div>

                {/* Voting Progress */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-400 font-bold">For: {prop.votesFor.toLocaleString()}</span>
                    <span className="text-red-400 font-bold">Against: {prop.votesAgainst.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-700 rounded-full flex overflow-hidden">
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: `${(prop.votesFor / (prop.votesFor + prop.votesAgainst)) * 100}%` }}
                    ></div>
                    <div
                      className="bg-red-500 h-full"
                      style={{ width: `${(prop.votesAgainst / (prop.votesFor + prop.votesAgainst)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {prop.proposer}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {prop.endTime}</span>
                  </div>
                  <button className="flex items-center gap-1 text-purple-400 font-bold hover:underline">
                    Vote Now <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voting Power */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Vote className="h-5 w-5 text-purple-400" />
                Your Voting Power
              </h3>
              <div className="text-center py-6 border-b border-slate-700 mb-4">
                <p className="text-4xl font-black mb-1">12,450</p>
                <p className="text-slate-400 text-sm">SKY4444 Staked</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Participation Rate</span>
                  <span className="font-bold">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Influence Rank</span>
                  <span className="font-bold text-purple-400">#1,245</span>
                </div>
                <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition mt-4">
                  Increase Power
                </button>
              </div>
            </div>

            {/* Governance Stats */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Ecosystem Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Staking Ratio</span>
                    <span className="font-bold">64.2%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: '64.2%' }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Shield className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-xs font-bold text-green-400 uppercase">Security Status</p>
                    <p className="text-sm font-bold">Multi-Sig Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-xs font-bold text-blue-400 uppercase">Growth Index</p>
                    <p className="text-sm font-bold">+12.4% MoM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;
