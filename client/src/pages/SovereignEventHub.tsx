import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Globe, Zap, MapPin, Clock, CheckCircle, Video, Lock } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const EVENTS = [
  { id: 1, title: 'SKY444 Wave 19 Launch AMA', type: 'AMA', date: 'May 25, 2026', time: '3:00 PM CST', host: '@sky_founder', attendees: 4201, price: 'FREE', format: 'Live Stream', status: 'UPCOMING' },
  { id: 2, title: 'Crypto OTC Trading Masterclass', type: 'Workshop', date: 'May 28, 2026', time: '2:00 PM CST', host: '@shadow_trader', attendees: 892, price: '50 SKY444', format: 'Zoom', status: 'UPCOMING' },
  { id: 3, title: 'Grey Area Market Deep Dive', type: 'Webinar', date: 'Jun 1, 2026', time: '4:00 PM CST', host: '@grey_alpha', attendees: 1203, price: '100 SKY444', format: 'Private', status: 'UPCOMING' },
  { id: 4, title: 'Engineer Mode Hackathon', type: 'Hackathon', date: 'Jun 7-8, 2026', time: '48 Hours', host: 'SKY444 Team', attendees: 312, price: 'FREE', format: 'Online', status: 'UPCOMING' },
];

export default function SovereignEventHub() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [registered, setRegistered] = useState<number[]>([1]);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Calendar className="h-6 w-6 text-blue-500" /> SOVEREIGN_EVENTS</h1>
          <p className="text-slate-500 text-xs mt-1">Crypto events, workshops, AMAs · Wave 19</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-blue-400">{EVENTS.length}</div><div className="text-[10px] text-slate-500">Upcoming</div></div>
          <div><div className="text-xl font-black text-green-400">{registered.length}</div><div className="text-[10px] text-slate-500">Registered</div></div>
        </div>
      </div>

      <div className="space-y-4">
        {EVENTS.map(event => (
          <div key={event.id} className="bg-slate-900 border border-slate-800 hover:border-blue-800 p-4 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] border border-blue-800 text-blue-400 px-1.5 py-0.5 font-bold">{event.type}</span>
                  <span className="text-[9px] border border-green-800 text-green-400 px-1.5 py-0.5 font-bold">{event.status}</span>
                </div>
                <h3 className="text-sm font-black">{event.title}</h3>
                <div className="text-[10px] text-slate-500 mt-1">Hosted by {event.host}</div>
              </div>
              <div className={`text-xs font-black ${event.price === 'FREE' ? 'text-green-400' : 'text-amber-400'}`}>{event.price}</div>
            </div>
            <div className="flex items-center gap-4 mb-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {event.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.time}</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {event.attendees.toLocaleString()} attending</span>
              <span className="flex items-center gap-1"><Video className="h-3 w-3" /> {event.format}</span>
            </div>
            <button
              onClick={() => setRegistered(prev => prev.includes(event.id) ? prev.filter(i => i !== event.id) : [...prev, event.id])}
              className={`text-xs font-bold px-4 py-2 transition-all ${registered.includes(event.id) ? 'border border-green-700 text-green-400 flex items-center gap-2' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {registered.includes(event.id) ? <><CheckCircle className="h-3 w-3" /> REGISTERED</> : 'REGISTER'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
