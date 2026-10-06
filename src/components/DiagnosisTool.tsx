import React, { useState, useRef } from 'react';
import { PLANT_TYPES, SYMPTOMS, LIGHT_LEVELS, WATERING_FREQUENCIES, DIAGNOSIS_MATRIX, TWENTY_FIX_CARDS } from '../data/plantData';
import { usePlantDiagnosis } from '../hooks/usePlantDiagnosis';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Layers, 
  RefreshCw, 
  ArrowRight, 
  BookmarkPlus, 
  Activity, 
  FileCheck, 
  SlidersHorizontal,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface DiagnosisToolProps {
  onExploreFixCards?: () => void;
  onSelectFixCard?: (cardId: string) => void;
}

export const DiagnosisTool: React.FC<DiagnosisToolProps> = ({ 
  onExploreFixCards, 
  onSelectFixCard 
}) => {
  // Tabs: 'vision' (LeafGuard.AI) vs 'manual' (Questionnaire)
  const [activeTab, setActiveTab] = useState<'vision' | 'manual'>('vision');

  // --- Manual Questionnaire State ---
  const [selectedPlant, setSelectedPlant] = useState(PLANT_TYPES[0].id);
  const [selectedSymptom, setSelectedSymptom] = useState(SYMPTOMS[0].id);
  const [selectedLight, setSelectedLight] = useState(LIGHT_LEVELS[1].id);
  const [selectedWatering, setSelectedWatering] = useState(WATERING_FREQUENCIES[2].id);
  const [hasManualDiagnosed, setHasManualDiagnosed] = useState(false);
  const [savedToRoutine, setSavedToRoutine] = useState(false);

  // --- LeafGuard.AI Vision Scanner Hook & State ---
  const {
    isModelLoading,
    isModelReady,
    isClassifying,
    error: visionError,
    prediction,
    classifyLeafImage,
    resetDiagnosis,
  } = usePlantDiagnosis();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Manual diagnosis calculation
  const activeSymptomKey = selectedSymptom in DIAGNOSIS_MATRIX ? selectedSymptom : 'yellow';
  const symptomData = DIAGNOSIS_MATRIX[activeSymptomKey] || DIAGNOSIS_MATRIX['yellow'];
  const activeLightKey = selectedLight in symptomData ? selectedLight : 'medium';
  const currentResult = symptomData[activeLightKey] || symptomData['medium'];
  const plantObj = PLANT_TYPES.find(p => p.id === selectedPlant) || PLANT_TYPES[0];

  const handleRunManualDiagnosis = () => {
    setHasManualDiagnosed(true);
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

  // Handle image upload from files or drag-drop
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    classifyLeafImage(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  // Sample quick-test images generated dynamically on HTML canvas for instant offline testing
  const handleLoadSampleCanvas = (type: 'blight' | 'mildew' | 'yellow' | 'healthy') => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw realistic synthetic leaf texture based on type
    if (type === 'healthy') {
      // Emerald green leaf with delicate veins
      ctx.fillStyle = '#1e6838';
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = '#2fb060';
      ctx.beginPath();
      ctx.ellipse(128, 128, 100, 120, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#55d985';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(128, 20);
      ctx.lineTo(128, 236);
      ctx.stroke();
    } else if (type === 'blight') {
      // Leaf with dark concentric brown/black necrotic spots
      ctx.fillStyle = '#2f603c';
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = '#225530';
      ctx.beginPath();
      ctx.ellipse(128, 128, 90, 110, 0, 0, Math.PI * 2);
      ctx.fill();
      // Concentric necrosis rings
      ctx.fillStyle = '#1c1007';
      ctx.beginPath();
      ctx.arc(100, 100, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#c49a2a';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = '#080502';
      ctx.beginPath();
      ctx.arc(150, 160, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#a68524';
      ctx.lineWidth = 3;
      ctx.stroke();
    } else if (type === 'mildew') {
      // Leaf coated with white talcum-like powdery spots
      ctx.fillStyle = '#275836';
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = '#1f4d2e';
      ctx.beginPath();
      ctx.ellipse(128, 128, 95, 115, 0, 0, Math.PI * 2);
      ctx.fill();
      // Powdery white chalk specks
      ctx.fillStyle = 'rgba(245, 250, 247, 0.85)';
      for (let i = 0; i < 40; i++) {
        const x = 50 + Math.random() * 150;
        const y = 40 + Math.random() * 170;
        const r = 4 + Math.random() * 16;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === 'yellow') {
      // Chlorotic butter-yellow leaf
      ctx.fillStyle = '#c7b436';
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = '#dfcb48';
      ctx.beginPath();
      ctx.ellipse(128, 128, 95, 115, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#8a5c1a';
      ctx.beginPath();
      ctx.ellipse(128, 220, 30, 20, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const dataUrl = canvas.toDataURL('image/jpeg');
    setPreviewImage(dataUrl);
    classifyLeafImage(dataUrl);
  };

  const handleOpenMatchingFixCard = (cardId: string) => {
    if (onSelectFixCard) {
      onSelectFixCard(cardId);
    } else if (onExploreFixCards) {
      onExploreFixCards();
    }
  };

  return (
    <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-5 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
      <div>
        {/* Header with Dual-Mode Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5 text-[#3ddc84]">
            <div className="w-8 h-8 rounded-lg bg-[#3ddc84]/15 border border-[#3ddc84]/30 flex items-center justify-center text-[#3ddc84]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white leading-tight">
                Plant Triage & Diagnosis
              </h3>
              <p className="text-[11px] text-[#9db8ac]">
                LeafGuard.AI Vision Scanner · Client-Side TensorFlow.js
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('vision')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'vision'
                  ? 'bg-gradient-to-r from-[#3ddc84] to-[#22b06a] text-[#04170d] shadow-sm'
                  : 'text-[#9db8ac] hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>AI Leaf Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'manual'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-[#9db8ac] hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Symptom Wizard</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: LEAFGUARD.AI VISION SCANNER (TensorFlow.js)
           ========================================================================= */}
        {activeTab === 'vision' && (
          <div className="space-y-6">
            <p className="text-xs text-[#9db8ac] leading-relaxed">
              Upload a clear photo of an affected leaf, or capture via your camera. 
              <span className="text-white font-medium"> Runs 100% client-side via TensorFlow.js tensor ops</span> with zero server latency or data tracking.
            </p>

            {/* Hidden native inputs for File and Camera */}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageFile(e.target.files[0]);
                }
              }}
            />
            <input 
              ref={cameraInputRef}
              type="file" 
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageFile(e.target.files[0]);
                }
              }}
            />

            {/* Dropzone & Preview Box */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`relative rounded-2xl border-2 border-dashed transition-all p-6 text-center flex flex-col items-center justify-center min-h-[220px] ${
                isDragOver 
                  ? 'border-[#3ddc84] bg-[#3ddc84]/10' 
                  : 'border-white/15 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
              }`}
            >
              {previewImage ? (
                <div className="relative w-full max-w-xs mx-auto">
                  <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-lg">
                    <img 
                      src={previewImage} 
                      alt="Scanned leaf sample" 
                      className="w-full h-44 object-cover"
                    />

                    {/* Scanning Reticle Animation during classification */}
                    {isClassifying && (
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center space-y-2">
                        <div className="w-12 h-12 rounded-full border-2 border-t-[#3ddc84] border-transparent animate-spin" />
                        <span className="text-[11px] font-mono text-[#3ddc84] bg-black/70 px-2.5 py-1 rounded-full">
                          Extracting TF.js Tensors...
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Change Photo</span>
                    </button>
                    <button
                      onClick={() => { setPreviewImage(null); resetDiagnosis(); }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9db8ac] hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3ddc84]/20 to-[#1e8f5a]/20 border border-[#3ddc84]/30 flex items-center justify-center text-[#3ddc84] mx-auto shadow-inner">
                    <Camera className="w-6 h-6 stroke-[2]" />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-white">
                      Drag & Drop Leaf Photo or Snapshot
                    </div>
                    <div className="text-[11px] text-[#9db8ac] mt-1">
                      Supports JPG, PNG, WEBP (under 15 MB)
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#49e38e] hover:to-[#2bc074] text-[#04170d] text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Leaf Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#3ddc84]" />
                      <span>Open Camera</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Test Samples */}
            <div className="p-3.5 rounded-2xl bg-[#07130e] border border-white/10 space-y-2">
              <div className="text-[11px] font-semibold text-[#9db8ac] flex items-center justify-between">
                <span>Or test instantly with synthetic leaf samples:</span>
                <span className="text-[10px] text-[#3ddc84]">No camera needed</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleLoadSampleCanvas('blight')}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#3ddc84]/40 text-[11px] text-white/90 transition-all text-left cursor-pointer truncate"
                >
                  🍂 Leaf Blight
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSampleCanvas('mildew')}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#3ddc84]/40 text-[11px] text-white/90 transition-all text-left cursor-pointer truncate"
                >
                  🍄 Powdery Mildew
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSampleCanvas('yellow')}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#3ddc84]/40 text-[11px] text-white/90 transition-all text-left cursor-pointer truncate"
                >
                  🟡 Overwater Chlorosis
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSampleCanvas('healthy')}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#3ddc84]/40 text-[11px] text-white/90 transition-all text-left cursor-pointer truncate"
                >
                  🌿 Healthy Leaf
                </button>
              </div>
            </div>

            {/* Error notice if any */}
            {visionError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                {visionError}
              </div>
            )}

            {/* AI Prediction Result Box */}
            {prediction && (
              <div className="p-5 rounded-2xl bg-[#091711] border border-[#3ddc84]/40 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                {/* Result Title & Confidence */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <div className="text-[11px] text-[#3ddc84] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>LeafGuard.AI Neural Diagnosis</span>
                    </div>
                    <div className="text-lg font-bold text-white mt-0.5">
                      {prediction.disease.commonNameEn}
                    </div>
                    <div className="text-[11px] text-[#9db8ac] italic">
                      {prediction.disease.scientificName} · {prediction.disease.commonNameAr}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#3ddc84]/15 border border-[#3ddc84]/40 text-[#3ddc84] tabular-nums">
                      {prediction.confidencePercentage} Match
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      prediction.disease.severity === 'critical' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                      prediction.disease.severity === 'moderate' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {prediction.disease.severity}
                    </span>
                  </div>
                </div>

                {/* Computer Vision Tensor Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px] text-[#9db8ac]">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="block text-[#9db8ac]/70">Necrosis Area:</span>
                    <span className="font-bold text-white tabular-nums">{prediction.analysisMetrics.necrosisAreaPercent}% of blade</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="block text-[#9db8ac]/70">Chlorophyll Index:</span>
                    <span className="font-bold text-[#3ddc84] tabular-nums">{prediction.analysisMetrics.chlorophyllIndex}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="block text-[#9db8ac]/70">Recovery Estimate:</span>
                    <span className="font-bold text-white tabular-nums">{prediction.disease.estimatedRecoveryDays} Days</span>
                  </div>
                </div>

                {/* Symptoms & Action */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-white/90">Pathology Symptoms: </span>
                    <span className="text-[#9db8ac]">{prediction.disease.symptoms}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#122e20] border border-[#3ddc84]/30">
                    <span className="font-bold text-[#3ddc84] block mb-1">
                      🚨 First 24-Hour Emergency Intervention:
                    </span>
                    <span className="text-white/95 leading-relaxed">{prediction.disease.immediateAction}</span>
                  </div>

                  <div className="text-[11px] text-[#9db8ac]">
                    <strong className="text-white">Golden Prevention: </strong>
                    {prediction.disease.prevention}
                  </div>
                </div>

                {/* Top 3 Predictions Bar */}
                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] text-[#9db8ac] uppercase tracking-wider font-semibold block">
                    Tensor Confidence Breakdown:
                  </span>
                  {prediction.topPredictions.map((tp, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] text-[#9db8ac]">
                      <span className="truncate max-w-[200px]">{tp.commonName}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#3ddc84] h-full rounded-full" 
                            style={{ width: `${tp.probability * 100}%` }}
                          />
                        </div>
                        <span className="font-mono text-white text-[10px] w-8 text-right">{tp.percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* DIRECT LINK TO MATCHING FIX CARD */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-[#9db8ac]">
                    {prediction.matchedCard ? (
                      <span>
                        Matching Card: <strong className="text-white">{prediction.matchedCard.title}</strong>
                      </span>
                    ) : (
                      <span>Consult complete 20 Fix Cards deck</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenMatchingFixCard(prediction.disease.matchedCardId)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#49e38e] hover:to-[#2bc074] text-[#04170d] text-xs font-bold transition-all shadow cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>View Fix Card Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* =========================================================================
            TAB 2: MANUAL SYMPTOM & ENVIRONMENT QUESTIONNAIRE
           ========================================================================= */}
        {activeTab === 'manual' && (
          <div>
            <p className="text-xs text-[#9db8ac] mb-6">
              Select your plant species and observed symptoms to isolate the primary physiological pathogen or cultural stress.
            </p>

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

              {/* Action Button */}
              <button
                onClick={handleRunManualDiagnosis}
                className="w-full mt-6 py-3.5 px-4 bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#49e38e] hover:to-[#2bc074] text-[#04170d] font-bold text-sm rounded-xl shadow-[0_4px_25px_rgba(61,220,132,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Run Botanical Diagnosis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Manual Result Card */}
            {hasManualDiagnosed && (
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

                <div>
                  <div className="text-xs font-semibold text-[#3ddc84] mb-1">Identified Cause:</div>
                  <p className="text-sm text-white/90 leading-snug">{currentResult.cause}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-xs font-semibold text-[#52fab4] mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3ddc84]" />
                    <span>Immediate Emergency Action:</span>
                  </div>
                  <p className="text-xs text-[#eafaf1] leading-relaxed">{currentResult.fix}</p>
                </div>

                <div className="text-xs text-[#9db8ac]">
                  <span className="font-semibold text-white/80">Golden Prevention Rule: </span>
                  {currentResult.prevent}
                </div>

                {wateringWarning && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs leading-relaxed">
                    {wateringWarning}
                  </div>
                )}

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
                    <span>Browse 20 Fix Cards →</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
