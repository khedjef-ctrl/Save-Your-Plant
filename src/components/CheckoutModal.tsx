import React, { useState } from 'react';
import { PricingTier } from '../types';
import { X, CheckCircle2, ShieldCheck, Download, ExternalLink, ArrowRight, Lock, Sparkles, FileText, Check } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  tier: PricingTier | null;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, tier, onClose }) => {
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen || !tier) return null;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 1200);
  };

  const handleDownloadGuide = () => {
    // Simulate instant file download trigger
    setDownloadStarted(true);
    const element = document.createElement("a");
    const file = new Blob([
      `SAVE YOUR PLANT — 7-DAY EMERGENCY RESCUE GUIDE\n\n` +
      `Thank you for purchasing the ${tier.name}.\n` +
      `Order Reference: SYP-${Math.floor(100000 + Math.random() * 900000)}\n` +
      `Licensed to: ${customerEmail || 'Plant Parent'}\n\n` +
      `============================================================\n` +
      `Included Resources:\n` +
      `1. 60-Page Botanical Rescue Handbook (Complete Edition)\n` +
      `2. 20 Emergency Printable Fix Cards\n` +
      `3. Notion Companion Care Workspace Link:\n` +
      `   https://saveyourplant.notion.site/plant-rescue-tracker-template\n` +
      `4. 7-Day Recovery Roadmap & Species Matrix\n\n` +
      `============================================================\n` +
      `30-Day Guarantee: If your plant does not recover, email support@saveyourplant.org for a 100% immediate refund.\n`
    ], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `SaveYourPlant_${tier.id}_guide.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#040906]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#091510] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#9db8ac] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isComplete ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3ddc84] uppercase tracking-wider mb-1">
                <span>Secure Checkout</span>
                <span>·</span>
                <span>Instant Digital Delivery</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Unlock {tier.name}
              </h3>
            </div>

            {/* Plan Summary Box */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">{tier.name}</div>
                <div className="text-xs text-[#9db8ac]">{tier.description}</div>
              </div>
              <div className="text-2xl font-extrabold text-[#3ddc84] tabular-nums">
                ${tier.price}
                <span className="text-xs text-[#9db8ac] font-normal block text-right">One-time</span>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSimulatePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
                  Your Full Name
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#0a1510] border border-white/15 focus:border-[#3ddc84] text-white text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
                  Email Address (For instant download delivery)
                </label>
                <input 
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-[#0a1510] border border-white/15 focus:border-[#3ddc84] text-white text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#49e38e] hover:to-[#2bc074] text-[#04170d] font-bold text-sm rounded-xl shadow-[0_4px_25px_rgba(61,220,132,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Generating Your Digital Rescue Access...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Complete Purchase · ${tier.price}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Trust markers */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#9db8ac]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3ddc84]" />
                <span>30-Day 100% Guarantee</span>
              </div>
              <span>256-bit encrypted checkout</span>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4 space-y-6 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-[#3ddc84]/20 border border-[#3ddc84]/40 flex items-center justify-center text-[#3ddc84] mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                You're Ready to Save Your Plant!
              </h3>
              <p className="text-xs text-[#9db8ac] max-w-sm mx-auto">
                Thank you, {customerName || 'Plant Lover'}. Your order for the <strong className="text-white">{tier.name}</strong> is confirmed. A receipt and license have been prepared for {customerEmail}.
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleDownloadGuide}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#49e38e] hover:to-[#2bc074] text-[#04170d] font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {downloadStarted ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Download Initiated! Click to Download Again</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download 60-Page Guide & 20 Fix Cards (.txt / .pdf)</span>
                  </>
                )}
              </button>

              <a
                href="https://notion.so"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-[#3ddc84]" />
                <span>Open Notion Companion Workspace</span>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[#9db8ac] text-left">
              <div className="font-semibold text-white mb-1">Next Step: Day 1 Triage</div>
              <p>Turn to Page 4 of the guide or review Day 1 on the interactive timeline above. Isolate your plant and check root moisture depth before taking further action.</p>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-[#9db8ac] hover:text-white underline cursor-pointer"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
