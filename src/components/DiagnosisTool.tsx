import React, { useState } from 'react';
import { PLANT_TYPES, SYMPTOMS, LIGHT_LEVELS, WATERING_FREQUENCIES, DIAGNOSIS_MATRIX } from '../data/plantData';
import { AlertCircle, CheckCircle, Clock, Sparkles, RefreshCw, BookmarkPlus, ArrowRight } from 'lucide-react';

export const DiagnosisTool: React.FC<{ onExploreFixCards: () => void }> = ({ onExploreFixCards }) => {
  const [selectedPlant, setSelectedPlant] = useState(PLANT_TYPES[0].id);
  const [selectedSymptom, setSelectedSymptom] = useState(SYMPTOMS[0].id);
  const [selectedLight, setSelectedLight] = useState(LIGHT_LEVELS[1].id);
  const [selectedWatering, setSelectedWatering] = useState(WATERING_FREQUENCIES[2].id);
  const [hasDiagnosed, setHasDiagnosed] = useState(false);
  const [savedToRoutine, setSavedToRoutine] = useState(false);

  // Look up diagnosis
  const activeSymptomKey = selectedSymptom in DIAGNOSIS_MATRIX ? selectedSymptom : 'yellow';
  const symptomData = DIAGNOSIS_MATRIX[activeSymptomKey] || DIAGNOSIS_MATRIX['yellow'];
  const activeLightKey = selectedLight in symptomData ? selectedLight : 'medium';
  const currentResult = symptomData[activeLightKey] || symptomData['medium'];

  const plantObj = PLANT_TYPES.find(p => p.id === selectedPlant) || PLANT_TYPES[0];

  const handleRunDiagnosis = () => {
    setHasDiagnosed(true);
    setSavedToRoutine(false);
  };

  const getWateringWarning = () => {
    if (selectedWatering === 'daily') {
      return '⚠️ CRITICAL ALERT: Watering daily kills 90% of indoor plants through oxygen starvation in root zones. Halt watering immediately.';
    }
    if (selectedWatering === '2-3days' && (selectedPlant === 'snake' || selectedPlant === 'cactus' || selectedPlant === 'aloe' || selectedPlant === 'zz')) {
      return '⚠️ WARNING: Succulents and arid species require their root ball to dry out 100% between drinks. Hydrating every 2–3 days guarantees root collapse.';
    }
    if (selectedWatering === 'rarely' && selectedPlant === 'fern') {
      return 'ℹ️ NOTE: Boston Ferns require consistently damp substrate and cannot tolerate complete drought.';
    }
    return null;
  };

  const wateringWarning = getWateringWarning();

  return (
    <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[#3ddc84]">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-xl font-bold text-white">Plant Diagnosis Engine</h3>
          </div>
          <span className="text-xs text-[#9db8ac] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
            Real-time Analysis
          </span>
        </div>

        <p className="text-xs text-[#9db8ac] mb-6">
          Select your plant species and observed symptoms to isolate the primary physiological pathogen or cultural stress.
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="plant-type-select" className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
              1. Houseplant Species
            </label>
            <select
              id="plant-type-select"
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              className="w-full bg-[#0a1510] border border-white/15 focus:border-[#3ddc84] text-white text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
            >
              {PLANT_TYPES.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="plant-symptom-select" className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
              2. Main Observed Symptom
            </label>
            <select
              id="plant-symptom-select"
              value={selectedSymptom}
              onChange={(e) => setSelectedSymptom(e.target.value)}
              className="w-full bg-[#0a1510] border border-white/15 focus:border-[#3ddc84] text-white text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
            >
              {SYMPTOMS.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="plant-light-select" className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
                3. Ambient Light Exposure
              </label>
              <select
                id="plant-light-select"
                value={selectedLight}
                onChange={(e) => setSelectedLight(e.target.value)}
                className="w-full bg-[#0a1510] border border-white/15 focus:border-[#3ddc84] text-white text-sm rounded-xl px-3 py-2.5 outline-none transition-colors"
              >
                {LIGHT_LEVELS.map(l => (
                  <option key={l.id} value={l.id}>{l.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="plant-watering-freq-select" className="block text-xs font-semibold text-[#9db8ac] mb-1.5">
                4. Watering Frequency
              </label>
              <select
                id="plant-watering-freq-select"
                value={selectedWatering}
                onChange={(e) => setSelectedWatering(e.target.value)}
                className="w-full bg-[#0a1510] border border-white/15 focus:border-[#3ddc84] text-white text-sm rounded-xl px-3 py-2.5 outline-none transition-colors"
              >
                {WATERING_FREQUENCIES.map(w => (
                  <option key={w.id} value={w.id}>{w.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleRunDiagnosis}
          className="w-full mt-6 py-3.5 px-4 bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#49e38e] hover:to-[#2bc074] text-[#04170d] font-bold text-sm rounded-xl shadow-[0_4px_25px_rgba(61,220,132,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Run Botanical Diagnosis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Result Card */}
      {hasDiagnosed && (
        <div className="mt-6 p-5 rounded-2xl bg-[#091510] border border-[#3ddc84]/30 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-xs text-[#9db8ac]">Diagnosis for:</span>
              <div className="text-base font-bold text-white">{plantObj.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                currentResult.severity === 'critical' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                currentResult.severity === 'moderate' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}>
                {currentResult.severity === 'critical' ? 'High Severity' : currentResult.severity === 'moderate' ? 'Moderate Stress' : 'Mild Issue'}
              </span>
              <div className="flex items-center gap-1 text-xs text-[#9db8ac]">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentResult.recoveryDays} days recovery</span>
              </div>
            </div>
          </div>

          {/* Root Cause */}
          <div>
            <div className="text-xs font-semibold text-[#3ddc84] mb-1">Identified Cause:</div>
            <p className="text-sm text-white/90 leading-snug">{currentResult.cause}</p>
          </div>

          {/* Immediate Fix */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-xs font-semibold text-[#52fab4] mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#3ddc84]" />
              <span>Immediate Emergency Action:</span>
            </div>
            <p className="text-xs text-[#eafaf1] leading-relaxed">{currentResult.fix}</p>
          </div>

          {/* Golden Prevention Rule */}
          <div className="text-xs text-[#9db8ac]">
            <span className="font-semibold text-white/80">Golden Prevention Rule: </span>
            {currentResult.prevent}
          </div>

          {/* Frequency Warning if active */}
          {wateringWarning && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs leading-relaxed">
              {wateringWarning}
            </div>
          )}

          {/* Interaction controls */}
          <div className="pt-2 flex items-center justify-between text-xs border-t border-white/10">
            <button
              onClick={() => setSavedToRoutine(true)}
              className="text-[#3ddc84] hover:text-[#52fab4] flex items-center gap-1 font-medium cursor-pointer"
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              <span>{savedToRoutine ? '✓ Saved to Routine' : 'Save Diagnosis'}</span>
            </button>
            <button
              onClick={onExploreFixCards}
              className="text-[#9db8ac] hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>See matching Fix Card →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
