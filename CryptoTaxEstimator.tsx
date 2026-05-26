import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { glassStyles } from '@/lib/ui-enhancements';
import { Calculator, TrendingUp } from 'lucide-react';

export default function CryptoTaxEstimator() {
  const [holdings, setHoldings] = useState([
    { coin: 'BTC', amount: 0.85, buyPrice: 42000, currentPrice: 67200 },
    { coin: 'ETH', amount: 4.2, buyPrice: 2800, currentPrice: 3450 },
    { coin: 'SKY', amount: 12500, buyPrice: 0.42, currentPrice: 0.89 },
  ]);

  const [taxRate, setTaxRate] = useState(25);

  const calculateGains = () => {
    return holdings.map(h => {
      const costBasis = h.amount * h.buyPrice;
      const currentValue = h.amount * h.currentPrice;
      const gain = currentValue - costBasis;
      const taxableGain = Math.max(gain, 0);
      const estimatedTax = taxableGain * (taxRate / 100);
      return { ...h, costBasis, currentValue, gain, taxableGain, estimatedTax };
    });
  };

  const results = calculateGains();
  const totalGain = results.reduce((sum, r) => sum + r.gain, 0);
  const totalTax = results.reduce((sum, r) => sum + r.estimatedTax, 0);

  return (
    <div className="min-h-screen bg-[#0a0f1a] p-6 text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Calculator className="h-9 w-9 text-yellow-400" />
          <div>
            <h1 className="text-4xl font-black">Crypto Tax Estimator</h1>
            <p className="text-zinc-400">Quick estimate • Real-time calculations</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className={glassStyles.card}>
            <CardHeader><CardTitle>Total Unrealized Gain</CardTitle></CardHeader>
            <CardContent>
              <p className={`text-4xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${totalGain.toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card className={glassStyles.card}>
            <CardHeader><CardTitle>Estimated Tax ({taxRate}%)</CardTitle></CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-yellow-400">${totalTax.toFixed(2)}</p>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={taxRate} 
                onChange={e => setTaxRate(parseInt(e.target.value))}
                className="w-full mt-4"
              />
            </CardContent>
          </Card>
        </div>

        <Card className={glassStyles.card}>
          <CardHeader><CardTitle>Holdings Breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((r, index) => (
                <div key={index} className="p-4 rounded-2xl border border-zinc-800 bg-zinc-950/60">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-lg">{r.coin}</div>
                      <div className="text-sm text-zinc-400">
                        {r.amount} @ ${r.buyPrice} → ${r.currentPrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-mono text-xl font-bold ${r.gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {r.gain >= 0 ? '+' : ''}${r.gain.toFixed(2)}
                      </div>
                      <div className="text-xs text-zinc-500">Est. Tax: ${r.estimatedTax.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={glassStyles.card}>
          <CardContent className="pt-6 text-sm text-zinc-400">
            This is a simplified estimator. Actual tax depends on your country, holding period, and specific rules. 
            For accurate filing, consult a tax professional or use dedicated crypto tax software.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}