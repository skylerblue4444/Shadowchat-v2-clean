import React, { useState } from 'react';
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Plus,
  Shield,
  Zap,
  Lock,
  History,
  TrendingUp,
  DollarSign,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
} from 'lucide-react';

interface AssetBalance {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  change: number;
  icon: string;
}

const Wallet: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<'assets' | 'history' | 'staking' | 'mining'>('assets');

  const assets: AssetBalance[] = [
    { symbol: 'SKY4444', name: 'SkyCoin444', balance: '125,000.00', value: '$555,000.00', change: 12.5, icon: '💎' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '1.2450', value: '$85,230.00', change: 2.4, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', balance: '15.80', value: '$60,672.00', change: -1.2, icon: 'Ξ' },
    { symbol: 'SOL', name: 'Solana', balance: '450.20', value: '$65,369.04', change: 5.8, icon: '☀️' },
    { symbol: 'USDT', name: 'Tether', balance: '12,450.00', value: '$12,450.00', change: 0.0, icon: '₮' },
  ];

  const transactions = [
    { id: 'TXN-001', type: 'receive', asset: 'SKY4444', amount: '+5,000.00', status: 'completed', date: '2 hours ago' },
    { id: 'TXN-002', type: 'send', asset: 'BTC', amount: '-0.0500', status: 'pending', date: '5 hours ago' },
    { id: 'TXN-003', type: 'staking', asset: 'SKY4444', amount: '+124.50', status: 'completed', date: '1 day ago' },
    { id: 'TXN-004', type: 'receive', asset: 'ETH', amount: '+2.5000', status: 'completed', date: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <WalletIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black">My Wallet</h1>
              <p className="text-slate-400 text-sm">Enterprise Multi-Coin Infrastructure</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition border border-slate-700">
              <Shield className="h-5 w-5 text-purple-400" />
            </button>
            <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition border border-slate-700">
              <History className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <WalletIcon className="w-64 h-64" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-100 font-semibold">Total Balance</span>
              <button onClick={() => setShowBalance(!showBalance)} className="text-purple-200 hover:text-white transition">
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex items-baseline gap-3 mb-8">
              <h2 className="text-6xl font-black tracking-tighter">
                {showBalance ? '$778,721.04' : '••••••••'}
              </h2>
              <span className="text-green-300 font-bold bg-green-500/20 px-2 py-1 rounded text-sm flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +12.4%
              </span>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-white text-indigo-700 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-purple-50 transition shadow-lg">
                <ArrowDownLeft className="h-5 w-5" /> Receive
              </button>
              <button className="flex-1 bg-indigo-500/50 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-500/70 transition border border-indigo-400/30 backdrop-blur-sm">
                <ArrowUpRight className="h-5 w-5" /> Send
              </button>
              <button className="flex-1 bg-indigo-500/50 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-500/70 transition border border-indigo-400/30 backdrop-blur-sm">
                <RefreshCw className="h-5 w-5" /> Swap
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-6 bg-slate-800/50 p-1 rounded-xl border border-slate-700 inline-flex">
              {(['assets', 'history', 'staking', 'mining'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg font-bold transition ${
                    activeTab === tab ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Assets List */}
            {activeTab === 'assets' && (
              <div className="space-y-3">
                {assets.map((asset) => (
                  <div key={asset.symbol} className="bg-slate-800/50 backdrop-blur border border-slate-700 p-4 rounded-2xl hover:border-purple-500 transition cursor-pointer flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition">
                        {asset.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{asset.name}</h3>
                        <p className="text-slate-400 text-sm font-mono">{asset.balance} {asset.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{asset.value}</p>
                      <p className={`text-sm font-bold ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {asset.change >= 0 ? '+' : ''}{asset.change}%
                      </p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-slate-700 rounded-2xl text-slate-500 font-bold hover:border-purple-500 hover:text-purple-400 transition flex items-center justify-center gap-2">
                  <Plus className="h-5 w-5" /> Add New Asset
                </button>
              </div>
            )}

            {/* History List */}
            {activeTab === 'history' && (
              <div className="space-y-3">
                {transactions.map((txn) => (
                  <div key={txn.id} className="bg-slate-800/50 backdrop-blur border border-slate-700 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        txn.type === 'receive' ? 'bg-green-500/20 text-green-400' :
                        txn.type === 'send' ? 'bg-red-500/20 text-red-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {txn.type === 'receive' ? <ArrowDownLeft className="h-5 w-5" /> :
                         txn.type === 'send' ? <ArrowUpRight className="h-5 w-5" /> :
                         <Zap className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-bold capitalize">{txn.type} {txn.asset}</h3>
                        <p className="text-slate-500 text-xs">{txn.date} • {txn.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-black ${
                        txn.type === 'receive' ? 'text-green-400' :
                        txn.type === 'send' ? 'text-red-400' :
                        'text-purple-400'
                      }`}>{txn.amount}</p>
                      <p className="text-xs text-slate-500 font-bold uppercase">{txn.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar: Security & Staking */}
          <div className="space-y-6">
            {/* Security Status */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" /> Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Lock className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-semibold">2FA Protection</span>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <p className="text-xs font-bold text-purple-400 uppercase mb-1">Recovery Phrase</p>
                  <p className="text-sm text-slate-300 mb-3">Your recovery phrase is secured in encrypted storage.</p>
                  <button className="text-sm font-bold text-purple-400 hover:underline flex items-center gap-1">
                    Backup Now <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Staking Summary */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" /> Staking
              </h3>
              <div className="text-center py-4 mb-4">
                <p className="text-slate-400 text-sm mb-1">Staking Rewards</p>
                <p className="text-3xl font-black text-yellow-400">+1,245.80 SKY4444</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Current APY</span>
                  <span className="font-bold text-green-400">18.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Staked</span>
                  <span className="font-bold">45,000.00</span>
                </div>
              </div>
              <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-black transition">
                Manage Staking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
