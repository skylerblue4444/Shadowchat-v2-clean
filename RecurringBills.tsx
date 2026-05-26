import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { glassStyles } from '@/lib/ui-enhancements';
import { Plus, Calendar, Trash2 } from 'lucide-react';

interface RecurringBill {
  id: number;
  name: string;
  amount: number;
  frequency: string;
  nextDue: string;
  category: string;
}

export default function RecurringBills() {
  const [bills, setBills] = useState<RecurringBill[]>([
    { id: 1, name: 'Netflix', amount: 15.99, frequency: 'Monthly', nextDue: '2026-06-01', category: 'Entertainment' },
    { id: 2, name: 'Gym Membership', amount: 45, frequency: 'Monthly', nextDue: '2026-05-28', category: 'Health' },
    { id: 3, name: 'Cloud Hosting', amount: 29, frequency: 'Monthly', nextDue: '2026-06-05', category: 'Business' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newBill, setNewBill] = useState({ name: '', amount: '', frequency: 'Monthly', category: '' });

  const addBill = () => {
    if (!newBill.name || !newBill.amount) return;

    const bill: RecurringBill = {
      id: Date.now(),
      name: newBill.name,
      amount: parseFloat(newBill.amount),
      frequency: newBill.frequency,
      nextDue: '2026-06-15',
      category: newBill.category || 'Other',
    };

    setBills([...bills, bill]);
    setNewBill({ name: '', amount: '', frequency: 'Monthly', category: '' });
    setShowForm(false);
  };

  const deleteBill = (id: number) => {
    setBills(bills.filter(b => b.id !== id));
  };

  const totalMonthly = bills
    .filter(b => b.frequency === 'Monthly')
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="min-h-screen bg-[#0a0f1a] p-6 text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black">Recurring Bills</h1>
            <p className="text-zinc-400">Never miss a payment • Full automation ready</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-blue-600">
            <Plus className="mr-2 h-4 w-4" /> Add Recurring Bill
          </Button>
        </div>

        <Card className={glassStyles.card}>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">Monthly Total: <span className="text-yellow-400">${totalMonthly.toFixed(2)}</span></div>
          </CardContent>
        </Card>

        {showForm && (
          <Card className={glassStyles.card}>
            <CardHeader><CardTitle>Add New Recurring Bill</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Bill Name" value={newBill.name} onChange={e => setNewBill({...newBill, name: e.target.value})} />
              <Input type="number" placeholder="Amount" value={newBill.amount} onChange={e => setNewBill({...newBill, amount: e.target.value})} />
              <Input placeholder="Category" value={newBill.category} onChange={e => setNewBill({...newBill, category: e.target.value})} />
              <div className="flex gap-3">
                <Button onClick={addBill} className="bg-blue-600 flex-1">Add Bill</Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {bills.map(bill => (
            <Card key={bill.id} className={glassStyles.card}>
              <CardContent className="flex justify-between items-center p-6">
                <div>
                  <div className="font-semibold text-lg">{bill.name}</div>
                  <div className="text-sm text-zinc-400">{bill.category} • {bill.frequency}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-mono text-xl font-bold">${bill.amount}</div>
                    <div className="text-xs text-zinc-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Next: {bill.nextDue}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteBill(bill.id)} className="text-red-400 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}