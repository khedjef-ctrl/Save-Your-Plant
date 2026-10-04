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
import { PricingTier } from './types';
import { PRICING_TIERS } from './data/plantData';

export default function App() {
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNotionPreviewOpen, setIsNotionPreviewOpen] = useState(false);

  const handleOpenPricingModal = (tier?: PricingTier) => {
    // Default to the Pro tier if not specified
    const targetTier = tier || PRICING_TIERS.find(t => t.id === 'pro') || PRICING_TIERS[1];
    setSelectedTier(targetTier);
    setIsCheckoutOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08110c] text-[#eafaf1] flex flex-col font-sans selection:bg-[#3ddc84]/30 selection:text-[#52fab4]">
      {/* 3-Zone Sticky Navigation Bar */}
      <Navbar 
        onOpenPricing={() => handleScrollToSection('pricing')}
        onOpenDiagnosis={() => handleScrollToSection('tools')}
      />

      <main className="flex-grow">
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
              />
              <WateringCalculator />
            </div>
          </div>
        </section>

        {/* 20 Emergency Fix Cards Library */}
        <FixCardsLibrary />

        {/* Pricing & Rescue Plans */}
        <PricingSection 
          onSelectTier={(tier) => {
            setSelectedTier(tier);
            setIsCheckoutOpen(true);
          }}
        />

        {/* Testimonials Proof Section */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Conversion Close & Quiet Footer */}
      <Footer 
        onOpenPricing={() => handleScrollToSection('pricing')}
        onOpenDiagnosis={() => handleScrollToSection('tools')}
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
    </div>
  );
}
