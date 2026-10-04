import React, { useState } from 'react';
import { X, ExternalLink, Check, Copy, Sparkles, Droplets, Calendar, HeartPulse } from 'lucide-react';

interface NotionPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPricing: () => void;
}

export const NotionPreviewModal: React.FC<NotionPreviewModalProps> = ({ isOpen, onClose, onOpenPricing }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const samplePlants = [
    { name: 'Monstera Deliciosa (Living Room)', health: 'Thriving 95%', waterDue: 'In 3 days', status: 'Healthy', notes: 'New fenestration emerging from central petiole' },
    { name: 'Marble Queen Pothos (Bookshelf)', health: 'Stable 88%', waterDue: 'In 5 days', status: 'Healthy', notes: 'Pruned 2 vines on Day 4' },
    { name: 'Sansevieria Trifasciata (Office)', health: 'Recovering 72%', waterDue: 'In 14 days', status: 'Recovering', notes: 'Root surgery completed; drying in perlite mix' },
    { name: 'Calathea Medallion (Bedroom)', health: 'Caution 64%', waterDue: 'Tomorrow', status: 'Care Needed', notes: 'Pebble tray humidity maintained at 60%' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://saveyourplant.notion.site/plant-rescue-tracker-template');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#040906]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-[#091510] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#9db8ac] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-lg">
            🪴
          </div>
          <div>
            <div className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider">
              Template Preview
            </div>
            <h3 className="text-2xl font-bold text-white">
              Notion Plant Care & Rescue Dashboard
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#9db8ac] leading-relaxed">
          Pre-built Notion workspace designed specifically for indoor plant parents. Includes automated countdown timers for watering, photo logs to track leaf recovery, and pest quarantine checklists.
        </p>

        {/* Simulated Notion Workspace Interface */}
        <div className="rounded-2xl bg-[#0d1c15] border border-white/10 overflow-hidden">
          <div className="px-4 py-3 bg-[#0a1610] border-b border-white/10 flex items-center justify-between text-xs text-[#9db8ac]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-[11px] text-white/60">Notion Workspace · SaveYourPlant Tracker v2</span>
            </div>
            <span className="text-[11px] text-[#3ddc84] font-medium">1-Click Duplicate Ready</span>
          </div>

          <div className="p-4 space-y-4">
            {/* Database Table Header */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[#9db8ac]">
                    <th className="pb-2 font-semibold">Plant Name</th>
                    <th className="pb-2 font-semibold">Health Score</th>
                    <th className="pb-2 font-semibold">Next Watering</th>
                    <th className="pb-2 font-semibold">Current State</th>
                    <th className="pb-2 font-semibold">Field Observation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {samplePlants.map((plant, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 font-medium text-white">{plant.name}</td>
                      <td className="py-2.5 text-[#3ddc84] font-bold tabular-nums">{plant.health}</td>
                      <td className="py-2.5 text-[#52fab4] tabular-nums">{plant.waterDue}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          plant.status === 'Healthy' ? 'bg-emerald-500/15 text-emerald-400' :
                          plant.status === 'Recovering' ? 'bg-amber-500/15 text-amber-400' :
                          'bg-red-500/15 text-red-400'
                        }`}>
                          {plant.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-[#9db8ac] text-[11px]">{plant.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <Droplets className="w-5 h-5 text-[#3ddc84]" />
                <div>
                  <div className="text-[11px] text-[#9db8ac]">Pending This Week</div>
                  <div className="text-sm font-bold text-white">2 Plants Due</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <HeartPulse className="w-5 h-5 text-[#52fab4]" />
                <div>
                  <div className="text-[11px] text-[#9db8ac]">Average Health</div>
                  <div className="text-sm font-bold text-white">84.7% Healthy</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#3ddc84]" />
                <div>
                  <div className="text-[11px] text-[#9db8ac]">Quarterly Flush</div>
                  <div className="text-sm font-bold text-white">Scheduled Oct 15</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#9db8ac]">
            Included with <strong className="text-white">Pro ($19)</strong> and <strong className="text-white">Ultimate ($39)</strong> rescue plans.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#3ddc84]" />
                  <span className="text-[#3ddc84]">Template Link Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Sample Link</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenPricing();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#4be592] hover:to-[#2bc074] text-[#04170d] text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              <span>Get Pro & Unlock Template</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
