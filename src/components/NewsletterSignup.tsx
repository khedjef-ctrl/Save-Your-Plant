import React, { useState } from 'react';
import { EMAIL_COURSE_LESSONS, EmailLesson } from '../data/emailCourse';
import { Mail, CheckCircle, ArrowRight, Eye, Calendar, BookOpen, Send, Sparkles, X } from 'lucide-react';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activePreviewEmail, setActivePreviewEmail] = useState<EmailLesson | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsEnrolled(true);
    }, 900);
  };

  return (
    <section id="course" className="py-24 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider">
              {lang === 'en' ? 'Free 7-Day Email Crash Course' : 'دورة بريدية مجانية لمدة 7 أيام'}
            </span>
            <div className="flex items-center bg-white/5 p-0.5 rounded-lg border border-white/10 text-[10px]">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded font-medium ${lang === 'en' ? 'bg-[#3ddc84] text-[#04170d]' : 'text-[#9db8ac]'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-2 py-0.5 rounded font-medium ${lang === 'ar' ? 'bg-[#3ddc84] text-[#04170d]' : 'text-[#9db8ac]'}`}
              >
                AR
              </button>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#eafaf1] tracking-tight">
            {lang === 'en' 
              ? 'One Actionable Plant Rescue Email Per Day' 
              : 'رسالة عملية يومياً لإنقاذ نبتتك في أسبوع'}
          </h2>
          <p className="text-[#9db8ac] mt-3 text-sm">
            {lang === 'en'
              ? 'Join 14,000+ plant parents receiving daily micro-lessons on root aeration, light tuning, and watering science.'
              : 'انضم لأكثر من 14,000 شخص يتعلمون أسرار الري وتهوية الجذور وتوزيع الإضاءة خطوة بخطوة.'}
          </p>
        </div>

        {/* 2-Column: Form & Lesson Syllabus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Box */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#10241a] to-[#091510] border border-[#3ddc84]/30 p-7 shadow-xl space-y-6">
            {!isEnrolled ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-[#3ddc84]">
                  <Mail className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'Direct Inbox Delivery' : 'تسليم مباشر في بريدك'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {lang === 'en' ? 'Start Your 7-Day Recovery Today' : 'ابدأ دورة الإنقاذ المجانية الآن'}
                </h3>

                <p className="text-xs text-[#9db8ac] leading-relaxed">
                  {lang === 'en'
                    ? 'Delivered every morning at 7:00 AM. Unsubscribe with one click anytime.'
                    : 'تصلك كل صباح الساعة 7:00 بتوقيتك المحلي. يمكنك إلغاء الاشتراك بضغطة واحدة في أي وقت.'}
                </p>

                <div>
                  <label className="block text-xs font-medium text-[#9db8ac] mb-1.5">
                    {lang === 'en' ? 'First Name' : 'الاسم الأول'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'en' ? 'e.g. Liam' : 'مثال: أحمد'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9db8ac] mb-1.5">
                    {lang === 'en' ? 'Your Best Email Address' : 'بريدك الإلكتروني'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#4be592] hover:to-[#2bc074] text-[#04170d] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>{lang === 'en' ? 'Enrolling Your Spot...' : 'جاري تسجيل اشتراكك...'}</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Send Me Day 1 Lesson Free' : 'أرسل لي درس اليوم الأول مجاناً'}</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-[11px] text-[#9db8ac] text-center">
                  {lang === 'en' ? '✓ Zero spam · 100% actionable botanical care' : '✓ بدون أي إعلانات مزعجة · محتوى بستاني خالص'}
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-[#3ddc84]/20 border border-[#3ddc84]/40 flex items-center justify-center text-[#3ddc84] mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {lang === 'en' ? `You're Enrolled, ${name}!` : `تم اشتراكك بنجاح، ${name}!`}
                </h3>
                <p className="text-xs text-[#9db8ac] leading-relaxed">
                  {lang === 'en'
                    ? `Day 1 is flying to ${email}. Check your inbox or click any of the 7 lessons on the right to preview them immediately.`
                    : `تم إرسال درس اليوم الأول إلى ${email}. يمكنك تصفح باقي الدروس الـ 7 على اليمين.`}
                </p>
                <button
                  onClick={() => setActivePreviewEmail(EMAIL_COURSE_LESSONS[0])}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl border border-white/10 transition-colors"
                >
                  {lang === 'en' ? 'Read Day 1 Email Now' : 'قراءة رسالة اليوم الأول فوراً'}
                </button>
              </div>
            )}
          </div>

          {/* Right: 7-Day Syllabus Grid */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#9db8ac] mb-1">
              <span>{lang === 'en' ? '7-Day Course Syllabus' : 'منهج الدورة في 7 أيام'}</span>
              <span>{lang === 'en' ? 'Click any day to preview' : 'اضغط على أي يوم للمعاينة'}</span>
            </div>

            {EMAIL_COURSE_LESSONS.map((lesson) => (
              <div
                key={lesson.day}
                onClick={() => setActivePreviewEmail(lesson)}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#3ddc84]/50 hover:bg-white/[0.04] transition-all cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3ddc84]/15 border border-[#3ddc84]/30 flex items-center justify-center text-[#3ddc84] font-mono text-xs font-bold shrink-0">
                    0{lesson.day}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#3ddc84] transition-colors line-clamp-1">
                      {lang === 'en' ? lesson.subjectEn : lesson.subjectAr}
                    </div>
                    <div className="text-[11px] text-[#9db8ac] line-clamp-1 mt-0.5">
                      {lang === 'en' ? lesson.preheaderEn : lesson.preheaderAr}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#3ddc84] shrink-0 font-medium group-hover:translate-x-0.5 transition-transform">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Preview' : 'معاينة'}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Email Preview Modal */}
      {activePreviewEmail && (
        <div 
          className="fixed inset-0 z-50 bg-[#040906]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePreviewEmail(null)}
        >
          <div 
            className="w-full max-w-2xl bg-[#091510] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePreviewEmail(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#9db8ac] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3ddc84] uppercase tracking-wider mb-1">
                <span>{lang === 'en' ? `Email Lesson ${activePreviewEmail.day} of 7` : `الدرس البريدي ${activePreviewEmail.day} من 7`}</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'en' ? activePreviewEmail.subjectEn : activePreviewEmail.subjectAr}
              </h3>
            </div>

            {/* Email Body Paper */}
            <div className="p-6 rounded-2xl bg-[#06100b] border border-white/10 text-xs text-white/90 whitespace-pre-line leading-relaxed font-sans">
              {lang === 'en' ? activePreviewEmail.bodyEn : activePreviewEmail.bodyAr}
            </div>

            {/* Daily Action Box */}
            <div className="p-4 rounded-xl bg-[#122e20] border border-[#3ddc84]/40 text-xs text-[#eafaf1]">
              <div className="font-bold text-[#3ddc84] mb-1">
                {lang === 'en' ? '⚡ TODAY\'S MANDATORY ACTION TASK:' : '⚡ مهمة اليوم العملية الإلزامية:'}
              </div>
              <p>{lang === 'en' ? activePreviewEmail.actionTaskEn : activePreviewEmail.actionTaskAr}</p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-white/10">
              <span className="text-[#9db8ac]">
                {lang === 'en' ? 'Next email arrives automatically in 24 hours.' : 'تصلك الرسالة التالية بعد 24 ساعة تلقائياً.'}
              </span>
              <button
                onClick={() => setActivePreviewEmail(null)}
                className="px-4 py-2 rounded-xl bg-[#3ddc84] text-[#04170d] font-bold cursor-pointer"
              >
                {lang === 'en' ? 'Done Reading' : 'إغلاق المعاينة'}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
