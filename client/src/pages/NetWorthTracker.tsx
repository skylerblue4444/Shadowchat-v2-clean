import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { glassStyles } from '@/lib/ui-enhancements';
import { Plus, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Asset {
  id: number;
  name: string;
  value: number;
  type: string;
}

export default function NetWorthTracker() {
  const [assets, setAssets] = useState<Asset[]>([
    { id: 1, name: 'Bank Account', value: 12450, type: 'Cash' },
    { id: 2, name: 'SkyCoin Holdings', value: 8750, type: 'Crypto' },
    { id: 3, name: 'Staking Positions', value: 3200, type: 'Crypto' },
    { id: 4, name: 'Stocks / ETFs', value: 4800, type: 'Investments' },
  ]);

  const [liabilities] = useState([
    { id: 1, name: 'Credit Card', value: 1850 },
    { id: 2, name: 'Personal Loan', value: 4200 },
  ]);

  const [showAddAsset, setShowAddAsset] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: '', value: '', type: 'Cash' });

  const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.value, 0);
  const netWorth = totalAssets - totalLiabilities;

  const historyData = [
    { month: 'Jan', netWorth: 14200 },
    { month: 'Feb', netWorth: 15800 },
    { month: 'Mar', netWorth: 17100 },
    { month: 'Apr', netWorth: 18950 },
    { month: 'May', netWorth },
  ];

  const addAsset = () => {
    if (!newAsset.name || !newAsset.value) return;
    setAssets([...assets, {
      id: Date.now(),
      name: newAsset.name,
      value: parseFloat(newAsset.value),
      type: newAsset.type
    }]);
    setNewAsset({ name: '', value: '', type: 'Cash' });
    setShowAddAsset(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] p-6 text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black flex items-center gap-3">
              <TrendingUp className="h-9 w-9" /> Net Worth Tracker
            </h1>
            <p className="text-zinc-400">Complete financial picture — fully interactive</p>
          </div>
          <Button onClick={() => setShowAddAsset(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Add Asset
          </Button>
        </div>

        {/* Big Number */}
        <Card className={glassStyles.card}>
          <CardContent className="pt-8 pb-8 text-center">
            <p className="text-zinc-400 text-sm tracking-widest">CURRENT NET WORTH</p>
            <p className="text-6xl font-black mt-2">${netWorth.toLocaleString()}</p>
            <p className="text-green-400 mt-1">+12.4% from last month</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className={glassStyles.card}><CardHeader><CardTitle>Total Assets</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold text-green-400">${totalAssets.toLocaleString()}</p></CardContent></Card>
          <Card className={glassStyles.card}><CardHeader><CardTitle>Total Liabilities</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold text-red-400">${totalLiabilities.toLocaleString()}</p></CardContent></Card>
          <Card className={glassStyles.card}><CardHeader><CardTitle>Net Worth</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold">${netWorth.toLocaleString()}</p></CardContent></Card>
        </div>

        {/* Chart */}
        <Card className={glassStyles.card}>
          <CardHeader><CardTitle>Net Worth Trend</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="netWorth" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Assets List */}
        <Card className={glassStyles.card}>
          <CardHeader><CardTitle>Your Assets</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {assets.map(asset => (
              <div key={asset.id} className="flex justify-between items-center p-4 rounded-2xl border border-zinc-800 bg-zinc-950/50">
                <div>
                  <div className="font-semibold">{asset.name}</div>
                  <div className="text-xs text-zinc-500">{asset.type}</div>
                </div>
                <div className="font-mono text-lg font-bold text-green-400">${asset.value.toLocaleString()}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {showAddAsset && (
          <Card className={glassStyles.card}>
            <CardHeader><CardTitle>Add New Asset</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Asset Name" value={newAsset.name} onChange={e => setNewAsset({...newAsset, name: e.target.value})} />
              <Input type="number" placeholder="Current Value" value={newAsset.value} onChange={e => setNewAsset({...newAsset, value: e.target.value})} />
              <select className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white" value={newAsset.type} onChange={e => setNewAsset({...newAsset, type: e.target.value})}>
                <option>Cash</option><option>Crypto</option><option>Investments</option><option>Real Estate</option><option>Other</option>
              </select>
              <div className="flex gap-3">
                <Button onClick={addAsset} className="bg-blue-600 flex-1">Add Asset</Button>
                <Button variant="outline" onClick={() => setShowAddAsset(false)} className="flex-1">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}