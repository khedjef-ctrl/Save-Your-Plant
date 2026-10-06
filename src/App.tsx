import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { DiagnosisTool } from './components/DiagnosisTool';
import { WateringCalculator } from './components/WateringCalculator';
import { RescueTimeline } from './components/RescueTimeline';
import { FixCardsLibrary } from './components/FixCardsLibrary';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { NotionPreviewModal } from './components/NotionPreviewModal';
import { PdfGenerator } from './components/PdfGenerator';
import { PlantTracker } from './components/PlantTracker';
import { NewsletterSignup } from './components/NewsletterSignup';
import { Success } from './pages/Success';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { RefundPolicy } from './pages/RefundPolicy';
import { Contact } from './pages/Contact';
import { PricingTier } from './types';
import { PRICING_TIERS } from './data/plantData';
import { X } from 'lucide-react';

type AppView = 'home' | 'pdf-studio' | 'tracker' | 'privacy' | 'terms' | 'refund' | 'contact' | 'success';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNotionPreviewOpen, setIsNotionPreviewOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [activeFixCardId, setActiveFixCardId] = useState<string | null>(null);
  const [orderInfo, setOrderInfo] = useState({ orderId: 'SYP-984210', email: 'parent@plantcare.com', tierId: 'pro' });

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFixCardFromDiagnosis = (cardId: string) => {
    setActiveFixCardId(cardId);
    handleScrollToSection('cards');
  };

  const handleOpenPricingModal = (tier?: PricingTier) => {
    const targetTier = tier || PRICING_TIERS.find(t => t.id === 'pro') || PRICING_TIERS[1];
    setSelectedTier(targetTier);
    setIsCheckoutOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckoutSuccess = (orderId: string, email: string) => {
    setOrderInfo({ orderId, email, tierId: selectedTier?.id || 'pro' });
    setIsCheckoutOpen(false);
    navigateTo('success');
  };

  return (
    <div className="min-h-screen bg-[#08110c] text-[#eafaf1] flex flex-col font-sans selection:bg-[#3ddc84]/30 selection:text-[#52fab4]">
      {/* 3-Zone Sticky Navigation Bar */}
      <Navbar 
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenPricing={() => handleScrollToSection('pricing')}
        onOpenDiagnosis={() => handleScrollToSection('tools')}
      />

      <main className="flex-grow">
        {/* Router View Switching */}
        {currentView === 'pdf-studio' && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <PdfGenerator />
          </div>
        )}

        {currentView === 'tracker' && (
          <PlantTracker />
        )}

        {currentView === 'success' && (
          <Success 
            orderId={orderInfo.orderId}
            customerEmail={orderInfo.email}
            tierId={orderInfo.tierId}
            onReturnHome={() => navigateTo('home')}
            onOpenEmailCourse={() => {
              navigateTo('home');
              setTimeout(() => handleScrollToSection('course'), 150);
            }}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicy onBack={() => navigateTo('home')} />
        )}

        {currentView === 'terms' && (
          <Terms onBack={() => navigateTo('home')} />
        )}

        {currentView === 'refund' && (
          <RefundPolicy onBack={() => navigateTo('home')} />
        )}

        {currentView === 'contact' && (
          <Contact onBack={() => navigateTo('home')} />
        )}

        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <Hero 
              onScrollToTools={() => handleScrollToSection('tools')}
              onScrollToPricing={() => handleScrollToSection('pricing')}
            />

            {/* Core Capabilities & Bento Grid */}
            <Features 
              onOpenFixCards={() => handleScrollToSection('cards')}
              onOpenTools={() => handleScrollToSection('tools')}
              onOpenNotionPreview={() => setIsNotionPreviewOpen(true)}
            />

            {/* 7-Day Recovery Trajectory & Interactive Checklist */}
            <RescueTimeline 
              onOpenPricing={() => handleScrollToSection('pricing')}
            />

            {/* Live Interactive Tools: Diagnosis Engine & Watering Calculator */}
            <section id="tools" className="py-24 border-t border-white/10 relative">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <div className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider mb-2">
                    Interactive Rescue Suite
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#eafaf1] tracking-tight">
                    Try the Rescue Tools Right Now
                  </h2>
                  <p className="text-[#9db8ac] mt-4 text-base">
                    Two instant diagnostic algorithms included in the full kit. Free to test on your plants today.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  <DiagnosisTool 
                    onExploreFixCards={() => handleScrollToSection('cards')}
                    onSelectFixCard={handleSelectFixCardFromDiagnosis}
                  />
                  <WateringCalculator />
                </div>
              </div>
            </section>

            {/* Plant Tracker (Notion / AppFlowy Alternative) */}
            <PlantTracker />

            {/* 20 Emergency Fix Cards Library */}
            <FixCardsLibrary 
              initialCardId={activeFixCardId}
            />

            {/* 7-Day Email Crash Course & Syllabus */}
            <NewsletterSignup />

            {/* Pricing & Rescue Plans */}
            <PricingSection 
              onSelectTier={(tier) => {
                setSelectedTier(tier);
                setIsCheckoutOpen(true);
              }}
              onOpenPdfSample={() => setIsPdfModalOpen(true)}
              onSuccessRedirect={handleCheckoutSuccess}
            />

            {/* Testimonials Proof Section */}
            <TestimonialsSection />

            {/* Frequently Asked Questions */}
            <FaqSection />
          </>
        )}
      </main>

      {/* Conversion Close & Quiet Footer */}
      <Footer 
        onOpenPricing={() => handleScrollToSection('pricing')}
        onOpenDiagnosis={() => handleScrollToSection('tools')}
        onNavigate={navigateTo}
      />

      {/* Interactive Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        tier={selectedTier}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Notion Companion Preview Modal */}
      <NotionPreviewModal 
        isOpen={isNotionPreviewOpen}
        onClose={() => setIsNotionPreviewOpen(false)}
        onOpenPricing={() => {
          setIsNotionPreviewOpen(false);
          handleScrollToSection('pricing');
        }}
      />

      {/* PDF Sample Preview Modal (Triggered from Pricing) */}
      {isPdfModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#040906]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsPdfModalOpen(false)}
        >
          <div 
            className="w-full max-w-5xl bg-[#091510] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPdfModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#9db8ac] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <PdfGenerator sampleOnly={true} onClose={() => setIsPdfModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
