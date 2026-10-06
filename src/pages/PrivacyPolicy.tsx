import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

export const PrivacyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
          <Shield className="w-4 h-4" />
          <span>Legal & Data Protection · سياسة الخصوصية</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#9db8ac]">Last updated: October 2026</p>
      </div>

      <div className="text-xs text-[#9db8ac] space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Information We Collect / المعلومات التي نجمعها</h2>
          <p>
            Save Your Plant respects your personal privacy. When you purchase our digital rescue handbook or subscribe to our 7-day email course, we collect your name and email address strictly to deliver your digital licenses, receipt, and daily recovery lessons.
          </p>
          <p className="text-[#9db8ac]/80 italic">
            نحن في 'أنقذ نبتتك' نحترم خصوصيتك بالكامل. عند شراء الدليل الرقمي أو الاشتراك في الدورة البريدية، نجمع فقط اسمك وبريدك الإلكتروني لتسليم الملفات والدروس اليومية.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Local Storage & Zero Telemetry / التخزين المحلي</h2>
          <p>
            Your plant care records in the Plant Tracker are stored locally in your browser's <code className="text-[#3ddc84]">localStorage</code>. We do not sell, transmit, or monetize your private plant collection records to any third-party advertisers.
          </p>
          <p className="text-[#9db8ac]/80 italic">
            بيانات نباتاتك في جدول المتابعة تُحفظ محلياً داخل متصفحك ولا يتم بيعها أو مشاركتها مع أي جهة إعلانية على الإطلاق.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Payment Security / أمان المدفوعات</h2>
          <p>
            All financial transactions are processed securely through Stripe via PCI-DSS compliant 256-bit encryption. We never see or store your raw credit card numbers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Contact & Deletion / الاتصال وحذف البيانات</h2>
          <p>
            You may request complete removal of your email from our distribution list at any time by emailing <span className="text-white">support@saveyourplant.org</span>.
          </p>
        </section>
      </div>
    </div>
  );
};
