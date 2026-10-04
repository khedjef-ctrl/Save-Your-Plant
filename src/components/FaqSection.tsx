import React, { useState } from 'react';
import { FAQS } from '../data/plantData';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 border-t border-white/10 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider mb-2">
            Answers & Clarity
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#eafaf1] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#3ddc84] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#9db8ac] leading-relaxed border-t border-white/5 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
