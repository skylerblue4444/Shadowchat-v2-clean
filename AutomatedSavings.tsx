import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { glassStyles } from '@/lib/ui-enhancements';
import { PiggyBank, Zap } from 'lucide-react';

export default function AutomatedSavings() {
  const [rules, setRules] = useState([
    { id: 1, name: 'Round-up Savings', enabled: true, amount: 0, type: 'roundup', description: 'Round up every purchase to the nearest dollar' },
    { id: 2, name: 'Weekly Auto Save', enabled: true, amount: 50, type: 'fixed', description: 'Automatically save $50 every Monday' },
    { id: 3, name: 'Staking Reward Sweep', enabled: false, amount: 0, type: 'percent', description: 'Auto-move 30% of staking rewards to savings' },
  ]);

  const toggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const updateAmount = (id: number, newAmount: number) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, amount: newAmount } : rule
    ));
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] p-6 text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <PiggyBank className="h-9 w-9 text-emerald-400" />
          <div>
            <h1 className="text-4xl font-black">Automated Savings</h1>
            <p className="text-zinc-400">Set it and forget it • Smart money automation</p>
          </div>
        </div>

        <div className="grid gap-4">
          {rules.map(rule => (
            <Card key={rule.id} className={glassStyles.card}>
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{rule.name}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded ${rule.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-700 text-zinc-400'}`}>
                      {rule.enabled ? 'Active' : 'Paused'}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">{rule.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  {rule.type !== 'roundup' && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-400">$</span>
                      <Input 
                        type="number" 
                        value={rule.amount} 
                        onChange={(e) => updateAmount(rule.id, parseFloat(e.target.value) || 0)}
                        className="w-24 bg-zinc-900"
                      />
                    </div>
                  )}
                  <Switch 
                    checked={rule.enabled} 
                    onCheckedChange={() => toggleRule(rule.id)} 
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className={glassStyles.card}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" /> How it works
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400 space-y-2">
            <p>• Round-ups automatically move spare change into your savings wallet</p>
            <p>• Fixed rules run on schedule and can be paused anytime</p>
            <p>• Percentage rules work great with staking and reward income</p>
            <p className="pt-2 text-emerald-400">Automation is currently running in simulation mode. Connect real payment methods to go live.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}