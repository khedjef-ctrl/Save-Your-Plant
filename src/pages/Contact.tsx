import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle2, ArrowLeft, Clock, MapPin } from 'lucide-react';

export const Contact: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plantType, setPlantType] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <button
        onClick={onBack}
        className="text-xs font-semibold text-[#9db8ac] hover:text-[#3ddc84] flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home / العودة للرئيسية</span>
      </button>

      <div className="space-y-3 border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3ddc84] uppercase tracking-wider">
          <Mail className="w-4 h-4" />
          <span>Horticulture Triage Desk · تواصل معنا</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Contact Our Botanical Rescue Team
        </h1>
        <p className="text-xs sm:text-sm text-[#9db8ac]">
          Have a specific plant emergency or question about your order? We reply within 24 hours.
          <span className="block text-[#9db8ac]/70 mt-0.5">فريقنا البستاني متاح للإجابة على استفساراتك وتشخيص حالات النبات المستعصية.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="md:col-span-7 rounded-3xl bg-[#091510] border border-white/10 p-6 sm:p-8 shadow-xl">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
                  Your Full Name / الاسم
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Lee"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
                  Email Address / البريد الإلكتروني
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
                  Plant Species in Distress / نوع النبتة المصابة (اختياري)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ficus Lyrata, Monstera..."
                  value={plantType}
                  onChange={(e) => setPlantType(e.target.value)}
                  className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
                  How can we help? / تفاصيل المشكلة أو الاستفسار
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your plant symptoms, watering frequency, or inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#4be592] hover:to-[#2bc074] text-[#04170d] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry to Triage Desk / إرسال الرسالة</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-full bg-[#3ddc84]/20 border border-[#3ddc84]/40 flex items-center justify-center text-[#3ddc84] mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Message Received! / تم استلام رسالتك
              </h3>
              <p className="text-xs text-[#9db8ac] max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. A member of our horticulture triage team will review your note and email you back at <strong className="text-white">{email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[#3ddc84] underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          )}
        </div>

        {/* Support Channels & Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#3ddc84]">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Response Window</span>
            </div>
            <div className="text-sm font-bold text-white">Under 24 Hours Guaranteed</div>
            <p className="text-xs text-[#9db8ac] leading-relaxed">
              Every customer message is reviewed by an experienced botanist, not an automated chatbot.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#3ddc84]">
              <Mail className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Direct Email</span>
            </div>
            <div className="text-xs font-mono text-white">support@saveyourplant.org</div>
            <div className="text-xs font-mono text-white">refunds@saveyourplant.org</div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#3ddc84]">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Community Support</span>
            </div>
            <p className="text-xs text-[#9db8ac] leading-relaxed">
              Ultimate plan members have direct access to our private photo review channel and monthly live sessions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
