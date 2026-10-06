import React from 'react';
import { Sprout, ArrowRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenPricing: () => void;
  onOpenDiagnosis: () => void;
  onNavigate: (view: 'home' | 'pdf-studio' | 'tracker' | 'privacy' | 'terms' | 'refund' | 'contact' | 'success') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPricing, onOpenDiagnosis, onNavigate }) => {
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
              className="px-8 py-4 text-sm font-bold text-[#04170d] bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#4be592] hover:to-[#2bc074] rounded-full shadow-[0_10px_35px_rgba(61,220,132,0.35)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
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
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-sm font-bold text-[#eafaf1] cursor-pointer"
            >
              <div className="w-6 h-6 rounded bg-[#3ddc84] flex items-center justify-center text-[#04170d]">
                <Sprout className="w-4 h-4" />
              </div>
              <span>SaveYourPlant</span>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#9db8ac]">
              <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">Home</button>
              <button onClick={() => onNavigate('pdf-studio')} className="hover:text-white transition-colors cursor-pointer">PDF Studio (PDFMe)</button>
              <button onClick={() => onNavigate('tracker')} className="hover:text-white transition-colors cursor-pointer">Plant Tracker</button>
              <a href="#course" onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Email Course</a>
              <a href="#tools" onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Tools</a>
              <a href="#pricing" onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Pricing</a>
              <a href="#faq" onClick={() => onNavigate('home')} className="hover:text-white transition-colors">FAQ</a>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9db8ac]/70">
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              <span>·</span>
              <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
              <span>·</span>
              <button onClick={() => onNavigate('refund')} className="hover:text-white transition-colors cursor-pointer">Refund Guarantee</button>
              <span>·</span>
              <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">Contact Desk</button>
            </div>

            <div>
              © {new Date().getFullYear()} SaveYourPlant. All botanical & digital product rights reserved.
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};
