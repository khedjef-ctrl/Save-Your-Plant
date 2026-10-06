import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

export const Terms: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
          <FileText className="w-4 h-4" />
          <span>Terms of Service · الشروط والأحكام</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Terms of Service
        </h1>
        <p className="text-xs text-[#9db8ac]">Effective date: October 2026</p>
      </div>

      <div className="text-xs text-[#9db8ac] space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Digital Product License / ترخيص الاستخدام الرقمي</h2>
          <p>
            Upon purchasing the Starter, Pro, or Ultimate rescue plan, you receive a non-exclusive, non-transferable lifetime personal license to download, print, and use the 60-page handbook, the 20 Fix Cards, and the companion Notion/spreadsheet templates. You may not resell, redistribute, or re-license the digital materials.
          </p>
          <p className="text-[#9db8ac]/80 italic">
            عند شراء أي من باقات الإنقاذ، تحصل على ترخيص شخصي دائم غير قابل للنقل لاستخدام وطباعة الدليل وبطاقات العلاج. يُمنع إعادة بيع أو نشر المحتوى تجارياً.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Horticultural Disclaimer / إخلاء المسؤولية البستانية</h2>
          <p>
            The diagnosis tools and guides provide evidence-based horticultural best practices. However, extreme environmental factors (such as frost, chemical exposure, or terminal cellular necrosis) may occasionally prevent plant resuscitation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Intellectual Property / الملكية الفكرية</h2>
          <p>
            All botanical diagrams, textual protocols, and diagnostic flowchart algorithms are the proprietary intellectual property of Save Your Plant.
          </p>
        </section>
      </div>
    </div>
  );
};
