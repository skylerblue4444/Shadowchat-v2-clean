import React from 'react';
import { PremiumCard, SovereignBadge, GlobalStatus } from '../components/ui/BillionDollarUI';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Cpu, Code, MessageSquare, Mail, Phone, Calendar, CheckCircle, Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * Innovative Information Technology Resolutions — Corporate Portal
 * Elite Managed IT, Cybersecurity, and DevOps Infrastructure.
 */
export const InnovativeITResolutions: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Navigation / Header */}
      <nav className="border-b border-slate-900 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter text-blue-500">INNOVATIVE IT RESOLUTIONS</h1>
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.3em]">Advanced Managed Services & Cybersecurity</span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            <a href="#services" className="hover:text-blue-500 transition-colors">Services</a>
            <a href="#about" className="hover:text-blue-500 transition-colors">Founder</a>
            <a href="#book" className="hover:text-blue-500 transition-colors">Book Now</a>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-none skew-x-[-12deg] text-xs">
            CLIENT LOGIN
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
          ELITE MANAGED IT. <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-blue-600 bg-clip-text text-transparent uppercase">
            Sovereign Security.
          </span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          From advanced cybersecurity and DevOps to managed IT and ethical hacking. 
          Billion-dollar grade infrastructure for your enterprise.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-8 text-lg rounded-none skew-x-[-12deg] group">
            BOOK CONSULTATION <Calendar className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" className="border-slate-800 text-slate-400 px-10 py-8 text-lg rounded-none skew-x-[-12deg] hover:bg-slate-900">
            VIEW SERVICES
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="mb-12">
          <SovereignBadge label="ENTERPRISE_SOLUTIONS" />
          <h2 className="text-4xl font-black tracking-tighter mt-4">CORE CAPABILITIES</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'MANAGED IT SERVICES', desc: 'Full-spectrum IT management, infrastructure monitoring, and 24/7 support.', icon: Cpu },
            { title: 'CYBERSECURITY & HACKING', desc: 'Advanced threat detection, penetration testing, and ethical hacking protocols.', icon: Shield },
            { title: 'DEVOPS ENGINEERING', desc: 'Cloud automation, CI/CD pipeline optimization, and scalable architecture.', icon: Code },
            { title: 'STRATEGIC CONSULTING', desc: 'Billion-dollar grade IT roadmaps and digital transformation strategies.', icon: Zap },
            { title: 'CLOUD INFRASTRUCTURE', desc: 'Azure, AWS, and private cloud management with military-grade security.', icon: Globe },
            { title: 'DISASTER RECOVERY', desc: 'Zero-loss data backup and business continuity planning.', icon: CheckCircle },
          ].map((service, i) => (
            <PremiumCard key={i} title={service.title}>
              <div className="p-3 bg-blue-500/5 border border-blue-500/20 w-fit mb-4">
                <service.icon className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
            </PremiumCard>
          ))}
        </div>
      </section>

      {/* Founder's Section */}
      <section id="about" className="bg-slate-900/50 border-y border-slate-900 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SovereignBadge label="FOUNDER_STORY" />
            <h2 className="text-4xl font-black tracking-tighter">SKYLER BLUE SPILLERS</h2>
            <p className="text-slate-400 leading-relaxed">
              Founder of Innovative IT Resolutions. A Bachelor's degree holder, father of three, and a dedicated community volunteer at Hope Campus. 
              Driven by a passion for advanced technology and high-fidelity engineering, Skyler has built an IT firm that rivals the biggest names in the industry.
            </p>
            <div className="flex gap-4">
              <div className="text-center p-4 bg-black border border-slate-800 w-1/3">
                <div className="text-2xl font-black text-blue-500">10+</div>
                <div className="text-[8px] font-mono text-slate-500 uppercase">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-black border border-slate-800 w-1/3">
                <div className="text-2xl font-black text-blue-500">500+</div>
                <div className="text-[8px] font-mono text-slate-500 uppercase">Projects Delivered</div>
              </div>
              <div className="text-center p-4 bg-black border border-slate-800 w-1/3">
                <div className="text-2xl font-black text-blue-500">24/7</div>
                <div className="text-[8px] font-mono text-slate-500 uppercase">Support Active</div>
              </div>
            </div>
          </div>
          <div className="p-8 bg-black border border-slate-800 relative">
            <div className="absolute -top-4 -left-4 p-4 bg-blue-600 text-white font-black skew-x-[-12deg]">CERTIFIED ELITE</div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle className="h-4 w-4 text-blue-500" /> Advanced Cybersecurity Specialist
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle className="h-4 w-4 text-blue-500" /> Senior DevOps Architect
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle className="h-4 w-4 text-blue-500" /> Managed IT Infrastructure Lead
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking & Contact Section */}
      <section id="book" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-4xl font-black tracking-tighter uppercase">GET IN TOUCH</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-slate-900 border border-slate-800 group-hover:border-blue-500 transition-colors">
                  <Phone className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase">Text or Call</p>
                  <p className="text-lg font-bold">479-406-7123</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-slate-900 border border-slate-800 group-hover:border-blue-500 transition-colors">
                  <Mail className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase">Email Us</p>
                  <p className="text-lg font-bold">Skylerblue4444@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-slate-900 border border-slate-800 group-hover:border-blue-500 transition-colors">
                  <Globe className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase">Headquarters</p>
                  <p className="text-sm font-bold">1845 Lake Fort Smith Rd, Mountain Burg, AR 72946</p>
                </div>
              </div>
            </div>
          </div>

          <PremiumCard title="BOOK SERVICE / MAKE PAYMENT">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input className="bg-black border-slate-800 rounded-none" placeholder="First Name" />
                <Input className="bg-black border-slate-800 rounded-none" placeholder="Last Name" />
              </div>
              <Input className="bg-black border-slate-800 rounded-none" placeholder="Email Address" />
              <select className="w-full bg-black border border-slate-800 p-3 text-sm text-slate-400 outline-none focus:border-blue-500">
                <option>Select Service</option>
                <option>Managed IT Support</option>
                <option>Cybersecurity Audit</option>
                <option>DevOps Engineering</option>
                <option>Custom Development</option>
              </select>
              <textarea className="w-full bg-black border border-slate-800 p-3 text-sm text-slate-400 outline-none focus:border-blue-500 h-32" placeholder="Project Details / Payment Reference"></textarea>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-none uppercase">SUBMIT REQUEST</Button>
            </form>
          </PremiumCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col">
            <h2 className="text-xl font-black tracking-tighter text-blue-500">INNOVATIVE IT RESOLUTIONS</h2>
            <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mt-2">© 2026 SKYBLUE SOVEREIGN SYSTEMS. ALL RIGHTS RESERVED.</p>
          </div>
          <GlobalStatus />
        </div>
      </footer>
    </div>
  );
};

export default InnovativeITResolutions;
