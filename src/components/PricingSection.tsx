import React from 'react';
import { PRICING_TIERS } from '../data/plantData';
import { PricingTier } from '../types';
import { Check, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectTier: (tier: PricingTier) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier }) => {
  return (
    <section id="pricing" className="py-24 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider mb-2">
            One-Time Investment · Lifetime Access
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#eafaf1] tracking-tight">
            Choose Your Plant Rescue Plan
          </h2>
          <p className="text-[#9db8ac] mt-4 text-base">
            Replace $150+ in dead plants and wilted leaves with a proven, lifetime botanical emergency system.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {PRICING_TIERS.map((tier) => {
            const isPro = tier.id === 'pro';

            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                  isPro 
                    ? 'bg-gradient-to-b from-[#143324] via-[#0b1c14] to-[#08120d] border-2 border-[#3ddc84] shadow-[0_12px_45px_rgba(61,220,132,0.25)] md:-translate-y-2' 
                    : 'bg-white/[0.03] border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular Badge */}
                {isPro && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 bg-gradient-to-r from-[#3ddc84] to-[#22b06a] text-[#04170d] text-[11px] font-bold rounded-full shadow-md uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {tier.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#9db8ac] min-h-[34px] leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="my-6 pt-4 border-t border-white/10">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-extrabold text-white tabular-nums">${tier.price}</span>
                      <span className="text-xs text-[#9db8ac]">USD · one-time</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 my-6">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#9db8ac] leading-snug">
                        <Check className="w-4 h-4 text-[#3ddc84] shrink-0 mt-0.5" />
                        <span className={isPro && idx < 3 ? 'text-white font-medium' : ''}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <button
                    onClick={() => onSelectTier(tier)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isPro
                        ? 'bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#4be592] hover:to-[#2bc074] text-[#04170d] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 max-w-2xl mx-auto p-5 rounded-2xl bg-[#091510] border border-white/10 flex items-center gap-4 text-xs text-[#9db8ac]">
          <ShieldCheck className="w-8 h-8 text-[#3ddc84] shrink-0" />
          <div>
            <strong className="text-white block font-semibold">100% Risk-Free 30-Day Guarantee</strong>
            <span>If your dying plant does not show visible turnaround within 7 days of implementing our protocol, email us for a full prompt refund. No questions asked.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
