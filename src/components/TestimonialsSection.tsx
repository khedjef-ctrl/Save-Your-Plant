import React from 'react';
import { TESTIMONIALS } from '../data/plantData';
import { Quote, Star, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider mb-2">
            Verified Plant Parents
          </div>
          <h2 className="text-3xl font-extrabold text-[#eafaf1] tracking-tight">
            Over 4,200 Plants Brought Back from the Brink
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#3ddc84] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#3ddc84]" />
                  ))}
                </div>
                <p className="text-xs text-[#9db8ac] leading-relaxed italic mb-4">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{t.author}</span>
                    <CheckCircle className="w-3 h-3 text-[#3ddc84]" />
                  </div>
                  <div className="text-[11px] text-[#9db8ac]/70">{t.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-[#3ddc84] font-semibold">{t.plantSaved}</div>
                  <div className="text-[10px] text-[#9db8ac]">{t.recoveryDays} days to recover</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
