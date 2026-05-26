import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { glassStyles } from '@/lib/ui-enhancements';
import { Bell, AlertTriangle } from 'lucide-react';

export default function SpendingAlerts() {
  const [alerts, setAlerts] = useState([
    { id: 1, name: 'Overspending Alert', enabled: true, threshold: 500, description: 'Alert when monthly spending exceeds threshold' },
    { id: 2, name: 'Unusual Transaction', enabled: true, threshold: 200, description: 'Alert on single transactions above this amount' },
    { id: 3, name: 'Low Balance Warning', enabled: false, threshold: 100, description: 'Notify when main account drops below threshold' },
    { id: 4, name: 'Recurring Bill Reminder', enabled: true, threshold: 3, description: 'Remind 3 days before recurring bills are due' },
  ]);

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] p-6 text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="h-9 w-9 text-orange-400" />
          <div>
            <h1 className="text-4xl font-black">Spending Alerts</h1>
            <p className="text-zinc-400">Stay in control with smart notifications</p>
          </div>
        </div>

        <div className="grid gap-4">
          {alerts.map(alert => (
            <Card key={alert.id} className={glassStyles.card}>
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    <h3 className="font-semibold text-lg">{alert.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">{alert.description}</p>
                  <p className="text-xs text-zinc-500 mt-1">Threshold: ${alert.threshold}</p>
                </div>

                <div className="flex items-center gap-4">
                  <Switch 
                    checked={alert.enabled} 
                    onCheckedChange={() => toggleAlert(alert.id)} 
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className={glassStyles.card}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="text-emerald-400 mt-1">✓</div>
              <div className="text-sm text-zinc-400">
                Alerts are currently running in demo mode. Real notifications will be enabled once you connect your accounts and notification preferences.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}