import React from 'react';
import { Sprout, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPricing: () => void;
  onOpenDiagnosis: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPricing, onOpenDiagnosis }) => {
  return (
    <>
      {/* Final Conversion Section */}
      <section className="py-24 border-t border-white/10 bg-gradient-to-b from-[#08110c] to-[#040906] relative overflow-hidden text-center">
        <div 
          aria-hidden="true" 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#3ddc84]/10 blur-[130px] rounded-full pointer-events-none"
        />

        <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3ddc84] uppercase tracking-wider">
            <span>7-Day Recovery Guarantee</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#eafaf1] tracking-tight leading-tight text-balance">
            Your Plants Deserve a Second Chance
          </h2>

          <p className="text-base text-[#9db8ac] max-w-lg mx-auto leading-relaxed">
            Join 4,200+ plant lovers who replaced heartbreak and yellow leaves with thriving, lush indoor greenery.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={onOpenPricing}
              className="px-8 py-4 text-sm font-bold text-[#04170d] bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#49e38e] hover:to-[#2bc074] rounded-full shadow-[0_10px_35px_rgba(61,220,132,0.35)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Save My Plant Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenDiagnosis}
              className="px-6 py-4 text-sm font-medium text-white hover:text-[#3ddc84] bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors cursor-pointer"
            >
              Use Free Diagnostic Tool
            </button>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-[#9db8ac]">
            <ShieldCheck className="w-4 h-4 text-[#3ddc84]" />
            <span>Instant digital download · 30-day money-back guarantee</span>
          </div>
        </div>
      </section>

      {/* Main Quiet Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#040806] text-xs text-[#9db8ac]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#eafaf1]">
            <div className="w-6 h-6 rounded bg-[#3ddc84] flex items-center justify-center text-[#04170d]">
              <Sprout className="w-4 h-4" />
            </div>
            <span>SaveYourPlant</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#tools" className="hover:text-white transition-colors">Diagnostic Tools</a>
            <a href="#cards" className="hover:text-white transition-colors">20 Fix Cards</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="text-center md:text-right text-[11px] text-[#9db8ac]/60">
            © {new Date().getFullYear()} SaveYourPlant. All botanical rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};
