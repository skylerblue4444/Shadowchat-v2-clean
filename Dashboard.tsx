import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Zap,
  Heart,
  MessageSquare,
  Share2,
  Clock,
} from 'lucide-react';

interface DashboardMetric {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

interface ChartDataPoint {
  time: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'marketplace' | 'social'>('overview');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');

  const metrics: DashboardMetric[] = [
    {
      label: 'Total Users',
      value: '2.4M',
      change: 12.5,
      icon: <Users className="h-6 w-6" />,
      trend: 'up',
    },
    {
      label: 'Active Sessions',
      value: '485K',
      change: 8.2,
      icon: <Activity className="h-6 w-6" />,
      trend: 'up',
    },
    {
      label: 'Marketplace GMV',
      value: '$12.8M',
      change: 23.1,
      icon: <ShoppingCart className="h-6 w-6" />,
      trend: 'up',
    },
    {
      label: 'Creator Earnings',
      value: '$3.2M',
      change: 18.7,
      icon: <DollarSign className="h-6 w-6" />,
      trend: 'up',
    },
    {
      label: 'Engagement Rate',
      value: '34.8%',
      change: 5.3,
      icon: <Heart className="h-6 w-6" />,
      trend: 'up',
    },
    {
      label: 'System Health',
      value: '99.98%',
      change: 0.02,
      icon: <Zap className="h-6 w-6" />,
      trend: 'neutral',
    },
  ];

  const chartData: ChartDataPoint[] = [
    { time: 'Mon', value: 2400 },
    { time: 'Tue', value: 2210 },
    { time: 'Wed', value: 2290 },
    { time: 'Thu', value: 2000 },
    { time: 'Fri', value: 2181 },
    { time: 'Sat', value: 2500 },
    { time: 'Sun', value: 2100 },
  ];

  const topCreators = [
    { name: 'Alex Chen', earnings: '$45,230', followers: '892K', growth: '+12.5%' },
    { name: 'Jordan Smith', earnings: '$38,920', followers: '756K', growth: '+8.3%' },
    { name: 'Taylor Moon', earnings: '$32,450', followers: '645K', growth: '+15.2%' },
    { name: 'Casey Rivers', earnings: '$28,760', followers: '523K', growth: '+6.8%' },
    { name: 'Morgan Blake', earnings: '$24,580', followers: '412K', growth: '+11.1%' },
  ];

  const recentTransactions = [
    { id: 'TXN001', user: 'User #2841', action: 'Purchase', amount: '$124.50', status: 'completed', time: '2 min ago' },
    { id: 'TXN002', user: 'Creator #5623', action: 'Withdrawal', amount: '$2,500.00', status: 'pending', time: '5 min ago' },
    { id: 'TXN003', user: 'User #1234', action: 'Tip', amount: '$50.00', status: 'completed', time: '8 min ago' },
    { id: 'TXN004', user: 'Vendor #7821', action: 'Payout', amount: '$5,200.00', status: 'completed', time: '15 min ago' },
    { id: 'TXN005', user: 'User #9876', action: 'NFT Purchase', amount: '$350.00', status: 'completed', time: '22 min ago' },
  ];

  const systemComponents = [
    { name: 'Hope AI Engine', status: 'operational', uptime: '99.99%', latency: '45ms' },
    { name: 'Marketplace Engine', status: 'operational', uptime: '99.98%', latency: '52ms' },
    { name: 'Creator Economy', status: 'operational', uptime: '99.97%', latency: '38ms' },
    { name: 'Social Network', status: 'operational', uptime: '99.99%', latency: '48ms' },
    { name: 'Governance System', status: 'operational', uptime: '99.96%', latency: '61ms' },
    { name: 'Analytics Engine', status: 'operational', uptime: '99.98%', latency: '72ms' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-2">Enterprise Dashboard</h1>
          <p className="text-slate-400">Real-time system monitoring and analytics</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-8">
          {(['24h', '7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                timeRange === range
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  {metric.icon}
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    metric.trend === 'up'
                      ? 'text-green-400'
                      : metric.trend === 'down'
                      ? 'text-red-400'
                      : 'text-slate-400'
                  }`}
                >
                  {metric.trend === 'up' && <ArrowUp className="h-4 w-4" />}
                  {metric.trend === 'down' && <ArrowDown className="h-4 w-4" />}
                  {Math.abs(metric.change)}%
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-1">{metric.label}</p>
              <p className="text-3xl font-bold">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-700">
          {(['overview', 'analytics', 'marketplace', 'social'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition border-b-2 ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* System Components */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">System Components</h2>
              <div className="space-y-3">
                {systemComponents.map((component, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-slate-500 transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{component.name}</p>
                      <p className="text-sm text-slate-400">Latency: {component.latency}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm font-semibold text-green-400">{component.status}</span>
                      </div>
                      <p className="text-sm text-slate-400">Uptime: {component.uptime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
              <div className="space-y-3">
                {recentTransactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{txn.user}</p>
                      <p className="text-sm text-slate-400">{txn.action}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{txn.amount}</p>
                      <p
                        className={`text-sm ${
                          txn.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                        }`}
                      >
                        {txn.status}
                      </p>
                    </div>
                    <p className="text-sm text-slate-400 ml-4 w-20 text-right">{txn.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">User Activity Trend</h2>
              <div className="h-64 flex items-end justify-around gap-2">
                {chartData.map((point, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-lg transition hover:opacity-80"
                      style={{ height: `${(point.value / 2500) * 100}%` }}
                    ></div>
                    <p className="text-xs text-slate-400">{point.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Engagement Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Posts', value: 34, color: 'bg-purple-500' },
                    { label: 'Comments', value: 28, color: 'bg-pink-500' },
                    { label: 'Shares', value: 22, color: 'bg-blue-500' },
                    { label: 'Likes', value: 16, color: 'bg-green-500' },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="text-sm text-slate-400">{item.value}%</p>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Revenue Sources</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Marketplace', value: 45, color: 'bg-indigo-500' },
                    { label: 'Creator Tips', value: 28, color: 'bg-purple-500' },
                    { label: 'NFT Sales', value: 18, color: 'bg-pink-500' },
                    { label: 'Premium', value: 9, color: 'bg-cyan-500' },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="text-sm text-slate-400">{item.value}%</p>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Marketplace Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                <p className="text-slate-400 text-sm mb-2">Total Listings</p>
                <p className="text-4xl font-bold">48.2K</p>
                <p className="text-green-400 text-sm mt-2">↑ 12.5% this week</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                <p className="text-slate-400 text-sm mb-2">Active Vendors</p>
                <p className="text-4xl font-bold">12.8K</p>
                <p className="text-green-400 text-sm mt-2">↑ 8.3% this week</p>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Top Creators</h3>
            <div className="space-y-3">
              {topCreators.map((creator, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{creator.name}</p>
                      <p className="text-sm text-slate-400">{creator.followers} followers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-400">{creator.earnings}</p>
                    <p className="text-sm text-green-400">{creator.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Posts', value: '2.4M', icon: <MessageSquare className="h-6 w-6" /> },
                { label: 'Total Interactions', value: '48.2M', icon: <Heart className="h-6 w-6" /> },
                { label: 'Communities', value: '8.5K', icon: <Users className="h-6 w-6" /> },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Top Communities</h3>
              <div className="space-y-3">
                {[
                  { name: 'Crypto Enthusiasts', members: '245K', posts: '18.5K' },
                  { name: 'Creator Network', members: '189K', posts: '15.2K' },
                  { name: 'Tech Innovators', members: '156K', posts: '12.8K' },
                  { name: 'Gaming Hub', members: '134K', posts: '10.5K' },
                ].map((community, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600"
                  >
                    <div>
                      <p className="font-semibold">{community.name}</p>
                      <p className="text-sm text-slate-400">{community.members} members</p>
                    </div>
                    <p className="text-sm text-slate-400">{community.posts} posts</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
