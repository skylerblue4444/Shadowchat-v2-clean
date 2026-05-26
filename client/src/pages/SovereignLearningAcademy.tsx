import React, { useState } from 'react';
import { BookOpen, Star, Clock, Users, CheckCircle, Play, Lock, Award, Zap, TrendingUp } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

const COURSES = [
  { id: 1, title: 'DeFi Mastery: From Zero to Yield Farmer', instructor: 'hope_ai_teacher', level: 'Beginner', duration: '8 hours', lessons: 24, rating: 4.9, students: 12847, price: 'FREE', completion: 65, category: 'DeFi' },
  { id: 2, title: 'Solidity Smart Contract Development', instructor: 'ghost_dev_44', level: 'Intermediate', duration: '16 hours', lessons: 48, rating: 4.8, students: 8934, price: '50 SKY444', completion: 0, category: 'Dev' },
  { id: 3, title: 'Crypto Trading Masterclass 2026', instructor: 'shadow_trader', level: 'All Levels', duration: '12 hours', lessons: 36, rating: 5.0, students: 24201, price: 'FREE', completion: 100, category: 'Trading' },
  { id: 4, title: 'Privacy & Security for Crypto Users', instructor: 'security_pro', level: 'Beginner', duration: '6 hours', lessons: 18, rating: 4.9, students: 6847, price: '25 SKY444', completion: 30, category: 'Security' },
];

export default function SovereignLearningAcademy() {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [enrolled, setEnrolled] = useState<number[]>([1, 3]);

  return (
    <div className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><BookOpen className="h-6 w-6 text-blue-500" /> LEARNING_ACADEMY</h1>
          <p className="text-slate-500 text-xs mt-1">Crypto education · Earn while you learn · Wave 20</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-xl font-black text-blue-400">2</div><div className="text-[10px] text-slate-500">Enrolled</div></div>
          <div><div className="text-xl font-black text-green-400">82%</div><div className="text-[10px] text-slate-500">Avg Progress</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COURSES.map(course => (
          <div key={course.id} className="bg-slate-900 border border-slate-800 hover:border-blue-700 p-4 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] border border-slate-700 text-slate-400 px-1.5 py-0.5">{course.category}</span>
                  <span className="text-[9px] border border-blue-800 text-blue-400 px-1.5 py-0.5">{course.level}</span>
                  {course.completion === 100 && <span className="text-[9px] border border-green-700 text-green-400 px-1.5 py-0.5">✓ COMPLETE</span>}
                </div>
                <h3 className="text-sm font-bold leading-tight">{course.title}</h3>
                <div className="text-[10px] text-slate-500 mt-0.5">by @{course.instructor}</div>
              </div>
              <div className={`text-xs font-black ${course.price === 'FREE' ? 'text-green-400' : 'text-amber-400'}`}>{course.price}</div>
            </div>

            <div className="flex items-center gap-4 mb-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
              <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{course.lessons} lessons</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.students.toLocaleString()}</span>
              <span className="flex items-center gap-1 text-yellow-400"><Star className="h-3 w-3 fill-yellow-400" />{course.rating}</span>
            </div>

            {enrolled.includes(course.id) && course.completion > 0 && course.completion < 100 && (
              <div className="mb-3">
                <div className="flex justify-between text-[10px] mb-1"><span className="text-slate-500">Progress</span><span className="text-blue-400">{course.completion}%</span></div>
                <div className="bg-slate-800 h-2"><div className="h-full bg-blue-500" style={{width:`${course.completion}%`}} /></div>
              </div>
            )}

            <div className="flex gap-2">
              {enrolled.includes(course.id) ? (
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 transition-all flex items-center justify-center gap-1">
                  <Play className="h-3 w-3" /> {course.completion === 100 ? 'REVIEW' : 'CONTINUE'}
                </button>
              ) : (
                <button onClick={() => setEnrolled(prev => [...prev, course.id])} className={`flex-1 py-2 text-xs font-bold transition-all ${course.price === 'FREE' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white'}`}>
                  {course.price === 'FREE' ? 'ENROLL FREE' : `ENROLL (${course.price})`}
                </button>
              )}
              {course.completion === 100 && <button className="border border-amber-700 text-amber-400 text-xs font-bold px-3 py-2 hover:bg-amber-950/30 transition-all flex items-center gap-1"><Award className="h-3 w-3" /> CERT</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
