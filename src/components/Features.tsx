import React from 'react';
import { BookOpen, GitFork, Calculator, LayoutGrid, Layers, PlayCircle, ArrowUpRight } from 'lucide-react';
import plantCareKitImg from '../assets/images/plant_care_kit_1791124340425.jpg';
import plantMacroImg from '../assets/images/plant_macro_leaves_1791124330436.jpg';

interface FeaturesProps {
  onOpenFixCards: () => void;
  onOpenTools: () => void;
  onOpenNotionPreview: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ 
  onOpenFixCards, 
  onOpenTools, 
  onOpenNotionPreview 
}) => {
  return (
    <section id="features" className="py-24 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider mb-2">
            The Complete Botanical Rescue Kit
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#eafaf1] tracking-tight">
            Everything You Need to Keep Plants Alive
          </h2>
          <p className="text-[#9db8ac] mt-4 text-base">
            Not another generic gardening blog. An actionable, field-tested troubleshooting system designed for fast recovery and lifelong plant health.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: 60-Page Illustrated Guide (col-span-7) */}
          <div className="md:col-span-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#3ddc84]/40 p-8 transition-all hover:bg-white/[0.05] flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3ddc84] to-[#1e8f5a] flex items-center justify-center text-[#04170d] shadow-md group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#3ddc84] transition-colors">
                60-Page Field-Tested Rescue Handbook
              </h3>
              <p className="text-sm text-[#9db8ac] leading-relaxed">
                Step-by-step diagnosis workflows for light, water, pests, and nutrient imbalances. High-resolution anatomical diagrams tell you when to prune, flush, repot, or leave a struggling plant alone.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#9db8ac]">
              <span>60 Pages · PDF & ePub · Print-Ready</span>
              <span className="text-[#3ddc84] font-medium flex items-center gap-1">
                Included in all plans <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: Visual Diagnosis Flowchart with Plant Kit Photo (col-span-5) */}
          <div className="md:col-span-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#3ddc84]/40 overflow-hidden transition-all flex flex-col justify-between group relative">
            <div className="h-44 overflow-hidden relative">
              <img 
                src={plantCareKitImg} 
                alt="Plant care essential kit and tools" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09130e] via-[#09130e]/40 to-transparent" />
            </div>
            <div className="p-6 pt-2 space-y-3">
              <div className="flex items-center gap-2 text-[#3ddc84]">
                <GitFork className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Zero-Guesswork</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#3ddc84] transition-colors">
                Visual Diagnosis Flowchart
              </h3>
              <p className="text-xs text-[#9db8ac] leading-relaxed">
                Isolate the root cause of yellowing, wilting, or black spots in under 60 seconds with simple binary branching questions.
              </p>
              <button 
                onClick={onOpenTools}
                className="pt-2 text-xs font-semibold text-[#3ddc84] hover:text-[#52fab4] flex items-center gap-1 cursor-pointer"
              >
                Launch interactive diagnostic tool →
              </button>
            </div>
          </div>

          {/* Card 3: Dynamic Watering Calculator (col-span-4) */}
          <div className="md:col-span-4 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#3ddc84]/40 p-6 transition-all hover:bg-white/[0.05] flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#3ddc84]/15 border border-[#3ddc84]/30 flex items-center justify-center text-[#3ddc84]">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#3ddc84] transition-colors">
                Personalized Watering Engine
              </h3>
              <p className="text-xs text-[#9db8ac] leading-relaxed">
                Calculates precise hydration intervals based on species biology, pot volume, window exposure, and current season.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-white/5">
              <button 
                onClick={onOpenTools}
                className="text-xs font-medium text-[#3ddc84] hover:underline cursor-pointer"
              >
                Try the live calculator below →
              </button>
            </div>
          </div>

          {/* Card 4: 20 Printable Fix Cards (col-span-4) */}
          <div className="md:col-span-4 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#3ddc84]/40 p-6 transition-all hover:bg-white/[0.05] flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#3ddc84]/15 border border-[#3ddc84]/30 flex items-center justify-center text-[#3ddc84]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#3ddc84] transition-colors">
                20 Emergency Fix Cards
              </h3>
              <p className="text-xs text-[#9db8ac] leading-relaxed">
                Emergency 24-hour protocols for the 20 most frequent fatal plant diseases, pests, light shock, and overwatering scenarios.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-white/5">
              <button 
                onClick={onOpenFixCards}
                className="text-xs font-medium text-[#3ddc84] hover:underline cursor-pointer"
              >
                Browse all 20 cards interactive library →
              </button>
            </div>
          </div>

          {/* Card 5: Notion Plant Care Workspace (col-span-4) */}
          <div className="md:col-span-4 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#3ddc84]/40 p-6 transition-all hover:bg-white/[0.05] flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#3ddc84]/15 border border-[#3ddc84]/30 flex items-center justify-center text-[#3ddc84]">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#3ddc84] transition-colors">
                Notion Rescue Dashboard
              </h3>
              <p className="text-xs text-[#9db8ac] leading-relaxed">
                Track each plant's watering schedule, recovery milestones, repotting history, and photo progress in one cohesive dashboard.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-white/5">
              <button 
                onClick={onOpenNotionPreview}
                className="text-xs font-medium text-[#3ddc84] hover:underline cursor-pointer"
              >
                Preview Notion template layout →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
