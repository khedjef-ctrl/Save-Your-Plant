import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const RefundPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      <button
        onClick={onBack}
        className="text-xs font-semibold text-[#9db8ac] hover:text-[#3ddc84] flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home / العودة للرئيسية</span>
      </button>

      <div className="space-y-3 border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3ddc84] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Guarantee · سياسة الاسترجاع والضمان</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          30-Day Money-Back Guarantee & Refund Policy
        </h1>
        <p className="text-xs text-[#9db8ac]">Fair, transparent, and plant-first guarantee</p>
      </div>

      <div className="text-xs text-[#9db8ac] space-y-6 leading-relaxed">
        <div className="p-5 rounded-2xl bg-[#0e271a] border border-[#3ddc84]/40 text-white space-y-2">
          <h2 className="text-base font-bold text-[#3ddc84]">Our 100% "Green Leaf or Full Refund" Guarantee</h2>
          <p className="text-xs leading-relaxed">
            If you apply our 7-day emergency resuscitation steps and your dying houseplant shows zero sign of recovery within 30 days, we will refund 100% of your purchase immediately. No awkward interrogation, no delays.
          </p>
          <p className="text-[#9db8ac] text-xs italic">
            ضماننا الذهبي: إذا طبقت بروتوكول الإنقاذ لمدة 7 أيام ولم تلاحظ أي بوادر للتحسن على نبتتك خلال 30 يوماً، سنعيد لك كامل المبلغ فوراً دون أي تعقيد.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">How to Claim Your Refund / كيفية طلب الاسترجاع</h2>
          <p>
            Simply email <span className="text-white font-semibold">refunds@saveyourplant.org</span> with your order reference number (e.g. SYP-XXXXXX). Our team processes all refund requests within 24 business hours directly back to your original payment method.
          </p>
          <p className="text-[#9db8ac]/80 italic">
            أرسل رسالة إلى بريدنا مع رقم طلبك وسيتم رد المبلغ خلال 24 ساعة إلى نفس وسيلة الدفع التي استخدمتها.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">Keep the Materials Regardless / احتفظ بالمواد مجاناً</h2>
          <p>
            Even after receiving a refund, you may keep the 60-page PDF handbook, the 20 Fix Cards, and the Notion template with our compliments.
          </p>
        </section>
      </div>
    </div>
  );
};
