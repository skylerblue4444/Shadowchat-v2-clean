import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Award, Clock, Star, Users, Zap, Search, ChevronRight } from 'lucide-react';
import { AdaptiveAIPersonalityEngine } from './adaptive-ai-personality';

const engine = new AdaptiveAIPersonalityEngine();

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  emoji: string;
  category: string;
}

const Academy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'my-learning' | 'certifications'>('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    engine.initializePersonality('skyler-main-user', 'strategist');
  }, []);

  const courses: Course[] = [
    { id: '1', title: 'Web3 Development Masterclass', instructor: '@skylerblue', duration: '12h 45m', level: 'Intermediate', rating: 4.9, students: 12450, emoji: '💻', category: 'Development' },
    { id: '2', title: 'Hope AI Orchestration Guide', instructor: '@hope_ai', duration: '5h 20m', level: 'Advanced', rating: 5.0, students: 8934, emoji: '🧠', category: 'AI' },
    { id: '3', title: 'Advanced Trading Strategies', instructor: '@whale_01', duration: '8h 15m', level: 'Advanced', rating: 4.8, students: 15678, emoji: '📈', category: 'Trading' },
    { id: '4', title: 'Crypto Fundamentals & Security', instructor: '@edu_team', duration: '4h 30m', level: 'Beginner', rating: 4.7, students: 45230, emoji: '🪙', category: 'Crypto' },
  ];

  const filteredCourses = courses.filter(c => 
    (selectedCategory === 'All' || c.category === selectedCategory) &&
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-black text-white pb-12">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div>
            <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Sky Academy</h1>
            <p className="text-2xl text-zinc-400 mt-3">Adaptive AI • Web3 • Trading • Finance</p>
          </div>
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-2xl flex items-center gap-2 text-emerald-400 text-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> AI Live
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold hover:scale-105 transition">Become Instructor</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Courses", value: "248", icon: BookOpen },
            { label: "Students", value: "1.4M", icon: Users },
            { label: "Certificates", value: "92K", icon: Award },
            { label: "AI Companions", value: "12K", icon: Zap },
          ].map((s, i) => (
            <div key={i} className="bg-zinc-900/80 border border-zinc-700 rounded-3xl p-8 text-center hover:border-purple-500 transition">
              <s.icon className="w-9 h-9 mx-auto mb-4 text-purple-400" />
              <p className="text-5xl font-bold">{s.value}</p>
              <p className="text-zinc-500 mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-4 text-zinc-500" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-zinc-900 border border-zinc-700 pl-14 py-4 rounded-2xl focus:border-purple-500 text-lg"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All','Development','AI','Trading','Crypto'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-2xl transition ${selectedCategory === cat ? 'bg-purple-600' : 'bg-zinc-900 border border-zinc-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="group bg-zinc-900/80 border border-zinc-700 rounded-3xl overflow-hidden hover:border-purple-500 hover:-translate-y-1 transition-all">
              <div className="h-56 bg-gradient-to-br from-zinc-800 to-purple-900 flex items-center justify-center text-8xl relative">
                {course.emoji}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <Play className="w-20 h-20 text-white" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full">{course.category}</span>
                  <span className="text-xs bg-zinc-800 px-3 py-1 rounded-full">{course.level}</span>
                </div>
                <h3 className="font-bold text-xl mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-zinc-500 text-sm mb-4">{course.instructor}</p>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-yellow-400"><Star className="fill-current" /> {course.rating}</div>
                  <div className="text-zinc-500 flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academy;
