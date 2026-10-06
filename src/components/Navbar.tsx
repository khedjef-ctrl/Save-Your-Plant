import React, { useState } from 'react';
import { Sprout, Menu, X, ArrowRight, BookOpen, LayoutGrid, Mail } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'pdf-studio' | 'tracker' | 'privacy' | 'terms' | 'refund' | 'contact' | 'success';
  onNavigate: (view: 'home' | 'pdf-studio' | 'tracker' | 'privacy' | 'terms' | 'refund' | 'contact' | 'success') => void;
  onOpenPricing: () => void;
  onOpenDiagnosis: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  onOpenPricing, 
  onOpenDiagnosis 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#08110c]/85 border-b border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#eafaf1] hover:text-[#3ddc84] transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3ddc84] to-[#1e8f5a] flex items-center justify-center text-[#04170d] shadow-sm group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="font-display">Save<span className="text-[#3ddc84]">YourPlant</span></span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#9db8ac]">
          <button 
            onClick={() => onNavigate('home')} 
            className={`transition-colors py-1 cursor-pointer ${currentView === 'home' ? 'text-[#3ddc84]' : 'hover:text-[#3ddc84]'}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('pdf-studio')} 
            className={`transition-colors py-1 cursor-pointer flex items-center gap-1 ${currentView === 'pdf-studio' ? 'text-[#3ddc84]' : 'hover:text-[#3ddc84]'}`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>PDF Studio (PDFMe)</span>
          </button>
          <button 
            onClick={() => onNavigate('tracker')} 
            className={`transition-colors py-1 cursor-pointer flex items-center gap-1 ${currentView === 'tracker' ? 'text-[#3ddc84]' : 'hover:text-[#3ddc84]'}`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Plant Tracker</span>
          </button>
          <a href="#course" onClick={() => onNavigate('home')} className="hover:text-[#3ddc84] transition-colors py-1">
            7-Day Course
          </a>
          <a href="#tools" onClick={() => onNavigate('home')} className="hover:text-[#3ddc84] transition-colors py-1">
            Diagnosis & Tools
          </a>
          <a href="#pricing" onClick={() => onNavigate('home')} className="hover:text-[#3ddc84] transition-colors py-1">
            Pricing
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button 
            onClick={() => {
              onNavigate('home');
              setTimeout(onOpenDiagnosis, 50);
            }}
            className="px-4 py-2 text-xs font-semibold text-[#9db8ac] hover:text-[#eafaf1] transition-colors whitespace-nowrap cursor-pointer"
          >
            Quick Diagnose
          </button>
          <button 
            onClick={() => {
              onNavigate('home');
              setTimeout(onOpenPricing, 50);
            }}
            className="px-5 py-2.5 text-xs font-semibold text-[#04170d] bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#49e38e] hover:to-[#2bc074] rounded-full shadow-[0_4px_20px_rgba(61,220,132,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <span>Get the Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#9db8ac] hover:text-white rounded-lg focus-visible:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a1510] border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#9db8ac]">
            <button 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="py-2 text-left hover:text-[#3ddc84] border-b border-white/5 cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => { onNavigate('pdf-studio'); setMobileMenuOpen(false); }}
              className="py-2 text-left hover:text-[#3ddc84] border-b border-white/5 cursor-pointer"
            >
              PDF Studio (PDFMe)
            </button>
            <button 
              onClick={() => { onNavigate('tracker'); setMobileMenuOpen(false); }}
              className="py-2 text-left hover:text-[#3ddc84] border-b border-white/5 cursor-pointer"
            >
              Plant Tracker (AppFlowy / Notion)
            </button>
            <a 
              href="#course" 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="py-2 hover:text-[#3ddc84] border-b border-white/5"
            >
              7-Day Email Course
            </a>
            <a 
              href="#tools" 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="py-2 hover:text-[#3ddc84] border-b border-white/5"
            >
              Diagnostic Tools
            </a>
            <a 
              href="#pricing" 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="py-2 hover:text-[#3ddc84]"
            >
              Pricing
            </a>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
                setTimeout(onOpenDiagnosis, 50);
              }}
              className="w-full py-3 text-center text-xs font-semibold text-[#eafaf1] bg-white/5 border border-white/10 rounded-xl"
            >
              Free Diagnostic Tool
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
                setTimeout(onOpenPricing, 50);
              }}
              className="w-full py-3 text-center text-xs font-semibold text-[#04170d] bg-gradient-to-r from-[#3ddc84] to-[#22b06a] rounded-xl font-medium"
            >
              Get the Guide — From $12
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
