import React, { useState } from 'react';
import { RESCUE_TIMELINE_STEPS } from '../data/plantData';
import { Check, CheckCircle2, ChevronRight, Award, ShieldAlert, Sparkles } from 'lucide-react';

export const RescueTimeline: React.FC<{ onOpenPricing: () => void }> = ({ onOpenPricing }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const toggleDayCompletion = (dayNum: number) => {
    if (completedDays.includes(dayNum)) {
      setCompletedDays(completedDays.filter(d => d !== dayNum));
    } else {
      setCompletedDays([...completedDays, dayNum]);
    }
  };

  const currentStep = RESCUE_TIMELINE_STEPS.find(s => s.day === activeDay) || RESCUE_TIMELINE_STEPS[0];
  const progressPercent = Math.round((completedDays.length / 7) * 100);

  return (
    <section id="how-it-works" className="py-24 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider mb-2">
            The 7-Day Recovery Trajectory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#eafaf1] tracking-tight">
            From Dying Plant to Thriving Green in One Week
          </h2>
          <p className="text-[#9db8ac] mt-4 text-base">
            No endless waiting. Plant physiology responds rapidly once root hypoxia, solar scorching, or pest pressures are relieved.
          </p>
        </div>

        {/* Interactive Timeline Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 mb-8">
          {RESCUE_TIMELINE_STEPS.map((step) => {
            const isCompleted = completedDays.includes(step.day);
            const isSelected = activeDay === step.day;

            return (
              <button
                key={step.day}
                onClick={() => setActiveDay(step.day)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected 
                    ? 'bg-[#122b1f] border-[#3ddc84] shadow-[0_4px_20px_rgba(61,220,132,0.2)]' 
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-[#3ddc84]' : 'text-white/60'}`}>
                    DAY 0{step.day}
                  </span>
                  {isCompleted && (
                    <span className="w-4 h-4 rounded-full bg-[#3ddc84] flex items-center justify-center text-[#04170d]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-white mt-1.5 line-clamp-1">
                  {step.title.split(' ')[0]} {step.title.split(' ')[1] || ''}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Card */}
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Day Brief & Actions */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3ddc84] to-[#22b06a] flex items-center justify-center text-[#04170d] font-bold text-base shadow-sm">
                  {currentStep.day}
                </div>
                <div>
                  <div className="text-xs text-[#9db8ac] uppercase tracking-wider font-semibold">
                    Protocol Phase {currentStep.day} of 7
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {currentStep.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#091510] border border-white/10">
                <span className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wide block mb-1">
                  Primary Objective:
                </span>
                <p className="text-sm text-white/90 leading-relaxed">
                  {currentStep.objective}
                </p>
              </div>

              {/* Action checklist */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#eafaf1] uppercase tracking-wider">
                  Mandatory Field Actions for Day {currentStep.day}:
                </div>
                <div className="space-y-2.5">
                  {currentStep.actionItems.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#3ddc84]/15 border border-[#3ddc84]/40 flex items-center justify-center text-[#3ddc84] shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span className="text-xs text-white/90 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 leading-relaxed flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#3ddc84] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-200">Botanist Field Note: </strong>
                  {currentStep.proTip}
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Progress Box */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#08120d] border border-white/10 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-[#9db8ac] mb-2">
                  <span>Rescue Protocol Progress</span>
                  <span className="text-[#3ddc84] font-bold tabular-nums">{progressPercent}%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#3ddc84] to-[#22b06a] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="mt-2 text-[11px] text-[#9db8ac] text-right">
                  {completedDays.length} of 7 days completed
                </div>
              </div>

              <button
                onClick={() => toggleDayCompletion(currentStep.day)}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  completedDays.includes(currentStep.day)
                    ? 'bg-[#3ddc84]/20 border border-[#3ddc84]/40 text-[#3ddc84]'
                    : 'bg-gradient-to-r from-[#3ddc84] to-[#22b06a] text-[#04170d] hover:brightness-110'
                }`}
              >
                {completedDays.includes(currentStep.day) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#3ddc84]" />
                    <span>Day {currentStep.day} Completed</span>
                  </>
                ) : (
                  <>
                    <span>Mark Day {currentStep.day} as Completed</span>
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs text-[#9db8ac] leading-relaxed">
                  Want the full printable tracking worksheets and Notion daily check-in dashboard?
                </div>
                <button
                  onClick={onOpenPricing}
                  className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Unlock Complete 7-Day Kit
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
