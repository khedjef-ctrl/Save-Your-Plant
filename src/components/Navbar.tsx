import React, { useState } from 'react';
import { Sprout, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenPricing: () => void;
  onOpenDiagnosis: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPricing, onOpenDiagnosis }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#08110c]/85 border-b border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#eafaf1] hover:text-[#3ddc84] transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3ddc84] to-[#1e8f5a] flex items-center justify-center text-[#04170d] shadow-sm group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="font-display">Save<span className="text-[#3ddc84]">YourPlant</span></span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9db8ac]">
          <a href="#features" className="hover:text-[#3ddc84] transition-colors py-1">Features</a>
          <a href="#how-it-works" className="hover:text-[#3ddc84] transition-colors py-1">How It Works</a>
          <a href="#tools" className="hover:text-[#3ddc84] transition-colors py-1">Interactive Tools</a>
          <a href="#cards" className="hover:text-[#3ddc84] transition-colors py-1">20 Fix Cards</a>
          <a href="#pricing" className="hover:text-[#3ddc84] transition-colors py-1">Pricing</a>
          <a href="#faq" className="hover:text-[#3ddc84] transition-colors py-1">FAQ</a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button 
            onClick={onOpenDiagnosis}
            className="px-4 py-2 text-xs font-semibold text-[#9db8ac] hover:text-[#eafaf1] transition-colors whitespace-nowrap"
          >
            Quick Diagnose
          </button>
          <button 
            onClick={onOpenPricing}
            className="px-5 py-2.5 text-xs font-semibold text-[#04170d] bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#49e38e] hover:to-[#2bc074] rounded-full shadow-[0_4px_20px_rgba(61,220,132,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Get the Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#9db8ac] hover:text-white rounded-lg focus-visible:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a1510] border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#9db8ac]">
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#3ddc84] border-b border-white/5"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#3ddc84] border-b border-white/5"
            >
              How It Works
            </a>
            <a 
              href="#tools" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#3ddc84] border-b border-white/5"
            >
              Interactive Tools
            </a>
            <a 
              href="#cards" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#3ddc84] border-b border-white/5"
            >
              20 Fix Cards Library
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#3ddc84] border-b border-white/5"
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#3ddc84]"
            >
              FAQ
            </a>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiagnosis();
              }}
              className="w-full py-3 text-center text-xs font-semibold text-[#eafaf1] bg-white/5 border border-white/10 rounded-xl"
            >
              Free Diagnostic Tool
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPricing();
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
