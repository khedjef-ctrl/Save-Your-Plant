import React, { useState, useEffect } from 'react';
import { TWENTY_FIX_CARDS } from '../data/plantData';
import { FixCard } from '../types';
import { Search, Filter, Layers, Check, Copy, Printer, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface FixCardsLibraryProps {
  initialCardId?: string | null;
  onCardSelected?: (card: FixCard) => void;
}

export const FixCardsLibrary: React.FC<FixCardsLibraryProps> = ({ initialCardId, onCardSelected }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalCard, setActiveModalCard] = useState<FixCard | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // If initialCardId is provided or updated from diagnosis, open it automatically
  useEffect(() => {
    if (initialCardId) {
      const targetCard = TWENTY_FIX_CARDS.find(c => c.id === initialCardId);
      if (targetCard) {
        setActiveModalCard(targetCard);
      }
    }
  }, [initialCardId]);

  const categories = [
    { id: 'all', label: 'All 20 Fix Cards' },
    { id: 'watering', label: 'Watering & Soil' },
    { id: 'pests', label: 'Pests & Fungi' },
    { id: 'light', label: 'Light & Heat' },
    { id: 'nutrition', label: 'Roots & Nutrition' },
  ];

  const filteredCards = TWENTY_FIX_CARDS.filter(card => {
    const matchesCat = selectedCategory === 'all' || card.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;

    const matchesSearch = 
      card.title.toLowerCase().includes(q) ||
      card.symptom.toLowerCase().includes(q) ||
      card.primaryCause.toLowerCase().includes(q) ||
      card.affectedPlants.some(p => p.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  const handleOpenCard = (card: FixCard) => {
    setActiveModalCard(card);
    if (onCardSelected) {
      onCardSelected(card);
    }
  };

  const handleCopyCard = (card: FixCard) => {
    const text = `Fix Card: ${card.title}
Symptom: ${card.symptom}
Primary Cause: ${card.primaryCause}
Emergency Action: ${card.emergencyStep}
Prevention Rule: ${card.preventionRule}
Affected Plants: ${card.affectedPlants.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="cards" className="py-24 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider mb-2">
              Print-Ready Emergency Index
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#eafaf1] tracking-tight">
              The 20 Emergency Fix Cards
            </h2>
            <p className="text-[#9db8ac] mt-3 text-base max-w-xl">
              Condenses decades of horticulture experience into immediate 24-hour survival actions and 7-day cure protocols for every common emergency.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#9db8ac] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search symptom or plant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a1510] border border-white/15 focus:border-[#3ddc84] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-[#9db8ac]/60 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#3ddc84] text-[#04170d] shadow-sm'
                  : 'bg-white/[0.04] text-[#9db8ac] hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredCards.map((card) => {
            const isHighlighted = initialCardId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => handleOpenCard(card)}
                className={`rounded-2xl p-5 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group relative ${
                  isHighlighted 
                    ? 'bg-[#133324] border-2 border-[#3ddc84] shadow-[0_4px_25px_rgba(61,220,132,0.3)]'
                    : 'bg-white/[0.03] border border-white/10 hover:border-[#3ddc84]/50 hover:bg-white/[0.05]'
                }`}
              >
                {isHighlighted && (
                  <span className="absolute -top-2.5 right-4 bg-[#3ddc84] text-[#04170d] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    AI Matched
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#9db8ac] mb-2.5">
                    <span className="uppercase font-semibold tracking-wider text-[#3ddc84]">
                      {card.category}
                    </span>
                    <span>Card #{card.id.replace('card-', '')}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#3ddc84] transition-colors leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#9db8ac] mt-2.5 line-clamp-2 leading-relaxed">
                    {card.symptom}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#9db8ac]/80 truncate max-w-[140px]">
                    {card.affectedPlants.slice(0, 2).join(', ')}...
                  </span>
                  <span className="text-[#3ddc84] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    View Card →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCards.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/10 text-sm text-[#9db8ac]">
            No fix cards match "{searchQuery}". Try searching "Monstera", "rot", "mites", or "yellow".
          </div>
        )}

      </div>

      {/* Modal View for Individual Fix Card */}
      {activeModalCard && (
        <div 
          className="fixed inset-0 z-50 bg-[#040906]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalCard(null)}
        >
          <div 
            className="w-full max-w-2xl bg-[#091510] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalCard(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#9db8ac] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3ddc84] uppercase tracking-wider mb-1">
                <span>Card #{activeModalCard.id.replace('card-', '')}</span>
                <span>·</span>
                <span>{activeModalCard.category.toUpperCase()}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {activeModalCard.title}
              </h3>
            </div>

            {/* Symptom & Cause */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-xs font-bold text-[#eafaf1] block mb-1">Observed Symptom:</span>
                <p className="text-xs text-[#9db8ac] leading-relaxed">{activeModalCard.symptom}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-xs font-bold text-[#3ddc84] block mb-1">Primary Biological Cause:</span>
                <p className="text-xs text-[#9db8ac] leading-relaxed">{activeModalCard.primaryCause}</p>
              </div>
            </div>

            {/* Emergency Action */}
            <div className="p-4 rounded-xl bg-[#122e20] border border-[#3ddc84]/40">
              <span className="text-xs font-bold text-[#3ddc84] uppercase tracking-wider block mb-1">
                🚨 Emergency Immediate Action (First 24 Hours):
              </span>
              <p className="text-xs sm:text-sm text-white leading-relaxed">
                {activeModalCard.emergencyStep}
              </p>
            </div>

            {/* Day by Day Protocol */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                5-Day Recovery Protocol:
              </span>
              <div className="space-y-2">
                {activeModalCard.dayByDayGuide.map((step, i) => (
                  <div key={i} className="text-xs text-[#9db8ac] flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84] shrink-0 mt-1.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Golden Prevention Rule */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-[#9db8ac]">
              <strong className="text-white">Golden Prevention Rule: </strong>
              {activeModalCard.preventionRule}
            </div>

            {/* Affected Plants */}
            <div className="text-xs text-[#9db8ac] flex items-center gap-2">
              <span className="font-semibold text-white">Most Vulnerable Species:</span>
              <span>{activeModalCard.affectedPlants.join(', ')}</span>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => handleCopyCard(activeModalCard)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {copiedId === activeModalCard.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#3ddc84]" />
                    <span className="text-[#3ddc84]">Copied Protocol</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Instructions</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Card</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
