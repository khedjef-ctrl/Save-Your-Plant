import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, HeartPulse, Droplets } from 'lucide-react';
import heroPlantImg from '../assets/images/hero_healthy_monstera_1791124318142.jpg';

interface HeroProps {
  onScrollToTools: () => void;
  onScrollToPricing: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToTools, onScrollToPricing }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background ambient radial glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-1/4 -z-10 w-[600px] h-[600px] bg-[#1a4433]/30 blur-[140px] rounded-full pointer-events-none"
      />
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-0 -z-10 w-[450px] h-[450px] bg-[#0f2d22]/40 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#3ddc84] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#3ddc84] animate-pulse" />
              <span>Evidence-based botanical rescue system</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#eafaf1] leading-[1.1] text-balance">
              Stop Killing Your <span className="bg-gradient-to-r from-[#3ddc84] via-[#52fab4] to-[#22b06a] bg-clip-text text-transparent">Houseplants</span>.
            </h1>

            <p className="text-lg text-[#9db8ac] max-w-xl leading-relaxed">
              Diagnose, fix, and prevent the 20 most common houseplant problems in 7 days — even if you've killed every plant you've ever owned.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button 
                onClick={onScrollToPricing}
                className="px-7 py-3.5 text-sm font-semibold text-[#04170d] bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#4be592] hover:to-[#2bc074] rounded-full shadow-[0_10px_35px_rgba(61,220,132,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group cursor-pointer"
              >
                <span>Save My Plant Today</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={onScrollToTools}
                className="px-6 py-3.5 text-sm font-medium text-[#eafaf1] hover:text-[#3ddc84] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#3ddc84]/40 rounded-full transition-all cursor-pointer"
              >
                Try Free Diagnostic Tool
              </button>
            </div>

            {/* Proof bar & trust markers */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#9db8ac]">
              <div className="flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#08110c] bg-emerald-700/80 flex items-center justify-center font-bold text-white text-[10px]">ER</div>
                <div className="w-8 h-8 rounded-full border-2 border-[#08110c] bg-teal-700/80 flex items-center justify-center font-bold text-white text-[10px]">MV</div>
                <div className="w-8 h-8 rounded-full border-2 border-[#08110c] bg-green-600/80 flex items-center justify-center font-bold text-white text-[10px]">SL</div>
                <div className="w-8 h-8 rounded-full border-2 border-[#08110c] bg-emerald-500/80 flex items-center justify-center font-bold text-[#04170d] text-[10px]">JK</div>
              </div>
              <div>
                <span className="font-semibold text-white">4,200+</span> plants rescued
                <span className="mx-2 text-white/20">·</span>
                <span className="text-[#3ddc84]">94% recovery rate</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60">
                <ShieldCheck className="w-4 h-4 text-[#3ddc84]" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real Image & Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#0e1d16] group">
              <img 
                src={heroPlantImg} 
                alt="Vibrant healthy monstera deliciosa thriving in natural light" 
                className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08110c] via-transparent to-transparent opacity-80" />

              {/* Floating Diagnosis Overlay Card */}
              <div className="absolute top-5 left-5 right-5 p-4 rounded-2xl bg-[#08110c]/85 border border-white/15 backdrop-blur-md shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-[#3ddc84]" />
                    <span className="text-xs font-medium text-white/70">Recovery Health Score</span>
                  </div>
                  <span className="text-sm font-bold text-[#3ddc84] tabular-nums">92%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#3ddc84] to-[#22b06a] h-full rounded-full w-[92%]" />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#9db8ac]">
                  <span>Symptom: Yellow leaf drop</span>
                  <span className="text-[#3ddc84] font-medium">Reversed in 5 days</span>
                </div>
              </div>

              {/* Floating Bottom Milestone Card */}
              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-[#0c1a14]/90 border border-[#3ddc84]/30 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#3ddc84]/15 border border-[#3ddc84]/30 flex items-center justify-center text-[#3ddc84]">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Next Scheduled Hydration</div>
                    <div className="text-[11px] text-[#9db8ac]">Monstera · Top 4cm currently drying</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#3ddc84] px-2.5 py-1 rounded bg-[#3ddc84]/10 border border-[#3ddc84]/20 tabular-nums">
                  In 4 Days
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
