import React, { useState } from 'react';
import { PLANT_TYPES } from '../data/plantData';
import { Droplets, Calendar, Sun, Thermometer, Info, Bell, Check } from 'lucide-react';

const SEASONS = [
  { id: 'summer', label: 'Summer (High heat & peak growth)', mod: 0.7 },
  { id: 'spring', label: 'Spring (Active vegetative emergence)', mod: 1.0 },
  { id: 'autumn', label: 'Autumn (Slowing metabolism)', mod: 1.3 },
  { id: 'winter', label: 'Winter (Dormancy & minimal evaporation)', mod: 1.8 }
];

const LIGHT_FACTORS = [
  { id: 'low', label: 'Low light / no direct window view', mod: 1.4 },
  { id: 'medium', label: 'Medium indirect light', mod: 1.0 },
  { id: 'bright', label: 'Bright indirect daylight', mod: 0.8 },
  { id: 'direct', label: 'Direct window sunlight', mod: 0.65 }
];

const POT_SIZES = [
  { id: 'small', label: 'Small nursery pot (under 15 cm)', mod: 0.85 },
  { id: 'medium', label: 'Medium ceramic planter (15–25 cm)', mod: 1.0 },
  { id: 'large', label: 'Large floor container (25 cm+)', mod: 1.25 }
];

export const WateringCalculator: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState(PLANT_TYPES[0].id);
  const [selectedSeason, setSelectedSeason] = useState(SEASONS[1].id);
  const [selectedLight, setSelectedLight] = useState(LIGHT_FACTORS[1].id);
  const [selectedPot, setSelectedPot] = useState(POT_SIZES[1].id);
  const [hasCalculated, setHasCalculated] = useState(true);
  const [reminderSet, setReminderSet] = useState(false);

  const plantObj = PLANT_TYPES.find(p => p.id === selectedPlant) || PLANT_TYPES[0];
  const seasonObj = SEASONS.find(s => s.id === selectedSeason) || SEASONS[1];
  const lightObj = LIGHT_FACTORS.find(l => l.id === selectedLight) || LIGHT_FACTORS[1];
  const potObj = POT_SIZES.find(p => p.id === selectedPot) || POT_SIZES[1];

  // Mathematical formula: baseDays * seasonMod * lightMod * potMod
  const calculatedDays = Math.max(1, Math.round(
    plantObj.baseDays * seasonObj.mod * lightObj.mod * potObj.mod
  ));

  const nextWaterDate = new Date();
  nextWaterDate.setDate(nextWaterDate.getDate() + calculatedDays);
  const formattedDate = nextWaterDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[#3ddc84]">
            <Droplets className="w-5 h-5" />
            <h3 className="text-xl font-bold text-white">Watering Schedule Calculator</h3>
          </div>
          <span className="text-xs text-[#9db8ac] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
            Biophysical Math
          </span>
        </div>

        <p className="text-xs text-[#9db8ac] mb-6">
          Never adhere to a rigid calendar schedule. Calculate exact intervals accounting for species water storage, pot evaporation, and seasonal transpiration.
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="water-plant-select" className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
              1. Plant Type
            </label>
            <select
              id="water-plant-select"
              value={selectedPlant}
              onChange={(e) => { setSelectedPlant(e.target.value); setReminderSet(false); }}
              className="w-full bg-[#0a1510] border border-white/15 focus:border-[#3ddc84] text-white text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
            >
              {PLANT_TYPES.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="water-season-select" className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
                2. Current Season
              </label>
              <select
                id="water-season-select"
                value={selectedSeason}
                onChange={(e) => { setSelectedSeason(e.target.value); setReminderSet(false); }}
                className="w-full bg-[#0a1510] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3 py-2.5 outline-none transition-colors"
              >
                {SEASONS.map(s => (
                  <option key={s.id} value={s.id}>{s.label.split(' ')[0]}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="water-light-select" className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
                3. Light Exposure
              </label>
              <select
                id="water-light-select"
                value={selectedLight}
                onChange={(e) => { setSelectedLight(e.target.value); setReminderSet(false); }}
                className="w-full bg-[#0a1510] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3 py-2.5 outline-none transition-colors"
              >
                {LIGHT_FACTORS.map(l => (
                  <option key={l.id} value={l.id}>{l.label.split(' ')[0]} {l.label.split(' ')[1] || ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="water-pot-select" className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
                4. Pot Diameter
              </label>
              <select
                id="water-pot-select"
                value={selectedPot}
                onChange={(e) => { setSelectedPot(e.target.value); setReminderSet(false); }}
                className="w-full bg-[#0a1510] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3 py-2.5 outline-none transition-colors"
              >
                {POT_SIZES.map(p => (
                  <option key={p.id} value={p.id}>{p.label.split(' ')[0]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {hasCalculated && (
        <div className="mt-6 p-5 rounded-2xl bg-[#091510] border border-[#3ddc84]/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-[#9db8ac]">Optimal Hydration Cadence:</div>
              <div className="text-2xl font-extrabold text-white mt-0.5">
                Every <span className="text-[#3ddc84] tabular-nums">{calculatedDays}</span> day{calculatedDays > 1 ? 's' : ''}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-[#9db8ac]">Target Calendar Date:</div>
              <div className="text-sm font-semibold text-[#52fab4] flex items-center gap-1.5 justify-end mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Biological Tip for Species */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
            <div className="text-xs font-semibold text-white/90 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#3ddc84]" />
              <span>{plantObj.name} Golden Rule:</span>
            </div>
            <p className="text-xs text-[#9db8ac] leading-relaxed">
              {plantObj.tip}
            </p>
          </div>

          {/* Interactive reminder simulation */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[#9db8ac]">Baseline dry-check: Top 3–5cm</span>
            <button
              onClick={() => setReminderSet(!reminderSet)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {reminderSet ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#3ddc84]" />
                  <span className="text-[#3ddc84]">Calendar Sync Scheduled</span>
                </>
              ) : (
                <>
                  <Bell className="w-3.5 h-3.5 text-[#9db8ac]" />
                  <span>Sync to Calendar / Reminders</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
