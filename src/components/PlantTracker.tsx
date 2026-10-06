import React, { useState, useEffect } from 'react';
import { Plus, Download, Droplets, Calendar, HeartPulse, Check, Trash2, Edit3, X, Sparkles, AlertCircle, Info, ExternalLink } from 'lucide-react';

export interface TrackedPlant {
  id: string;
  name: string;
  species: string;
  location: string;
  intervalDays: number;
  lastWatered: string; // YYYY-MM-DD
  status: 'Healthy' | 'Recovering' | 'Urgent Care';
  notes: string;
}

const DEFAULT_PLANTS: TrackedPlant[] = [
  {
    id: 'p-1',
    name: 'Living Room Monstera',
    species: 'Monstera Deliciosa',
    location: 'East Bay Window',
    intervalDays: 7,
    lastWatered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Healthy',
    notes: 'New leaf emerging from top node. Fertilized with 50% seaweed extract.'
  },
  {
    id: 'p-2',
    name: 'Office Bookshelf Pothos',
    species: 'Epipremnum Aureum',
    location: 'Office Shelf',
    intervalDays: 8,
    lastWatered: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Healthy',
    notes: 'Vines pruned on Day 4. Growing vigorously.'
  },
  {
    id: 'p-3',
    name: 'Desk Snake Plant',
    species: 'Sansevieria Laurentii',
    location: 'Desk Corner',
    intervalDays: 21,
    lastWatered: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Recovering',
    notes: 'Recovering from overwatering. Kept bone dry in chunky perlite mix.'
  },
  {
    id: 'p-4',
    name: 'Bedroom Calathea',
    species: 'Calathea Medallion',
    location: 'Bedside Table',
    intervalDays: 5,
    lastWatered: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Urgent Care',
    notes: 'Crispy tips detected. Pebble tray refilled; misting daily.'
  }
];

export const PlantTracker: React.FC = () => {
  const [plants, setPlants] = useState<TrackedPlant[]>(() => {
    const saved = localStorage.getItem('syp_tracked_plants');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_PLANTS;
      }
    }
    return DEFAULT_PLANTS;
  });

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showAppFlowyGuide, setShowAppFlowyGuide] = useState(false);
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  // Form state
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [location, setLocation] = useState('');
  const [intervalDays, setIntervalDays] = useState(7);
  const [status, setStatus] = useState<'Healthy' | 'Recovering' | 'Urgent Care'>('Healthy');
  const [notes, setNotes] = useState('');

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('syp_tracked_plants', JSON.stringify(plants));
  }, [plants]);

  const handleWaterPlant = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setPlants(plants.map(p => p.id === id ? { ...p, lastWatered: today } : p));
  };

  const handleDeletePlant = (id: string) => {
    setPlants(plants.filter(p => p.id !== id));
  };

  const handleAddPlant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPlant: TrackedPlant = {
      id: `p-${Date.now()}`,
      name: name.trim(),
      species: species.trim() || 'Houseplant',
      location: location.trim() || 'Indoor',
      intervalDays: Number(intervalDays) || 7,
      lastWatered: new Date().toISOString().split('T')[0],
      status,
      notes: notes.trim() || 'No notes yet.'
    };

    setPlants([newPlant, ...plants]);
    setIsAddModalOpen(false);
    // Reset form
    setName('');
    setSpecies('');
    setLocation('');
    setIntervalDays(7);
    setStatus('Healthy');
    setNotes('');
  };

  // Export to CSV
  const handleExportCsv = () => {
    const header = "ID,Plant Name,Species,Location,Watering Interval (Days),Last Watered,Next Due,Status,Notes\n";
    const rows = plants.map(p => {
      const nextDue = calculateNextDue(p.lastWatered, p.intervalDays).formattedDate;
      return `"${p.id}","${p.name}","${p.species}","${p.location}",${p.intervalDays},"${p.lastWatered}","${nextDue}","${p.status}","${p.notes.replace(/"/g, '""')}"`;
    }).join("\n");

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SaveYourPlant_Database_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper calculation for due days
  const calculateNextDue = (lastWateredStr: string, interval: number) => {
    const lastDate = new Date(lastWateredStr);
    const nextDate = new Date(lastDate.getTime() + interval * 24 * 60 * 60 * 1000);
    const today = new Date();
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      diffDays,
      isOverdue: diffDays < 0,
      isDueToday: diffDays === 0,
      formattedDate: nextDate.toLocaleDateString(lang === 'en' ? 'en-US' : 'ar-EG', {
        month: 'short',
        day: 'numeric'
      })
    };
  };

  const filteredPlants = plants.filter(p => {
    if (filterStatus === 'all') return true;
    return p.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <section id="tracker" className="py-20 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider">
                {lang === 'en' ? 'Open-Source Notion & AppFlowy Alternative' : 'بديل نوشن و AppFlowy مفتوح المصدر'}
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
              {lang === 'en' ? 'Plant Rescue Database & Care Tracker' : 'قاعدة بيانات وجدول متابعة النباتات'}
            </h2>
            <p className="text-[#9db8ac] mt-2 text-xs sm:text-sm max-w-xl">
              {lang === 'en'
                ? 'Track your houseplants in browser memory with zero monthly fees. Syncs offline, notifies when hydration is due, and exports to CSV.'
                : 'تابع نباتاتك مباشرة من متصفحك دون اشتراكات شهرية. يعمل بدون إنترنت مع حساب مواعيد السقاية وتصدير ملف CSV.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowAppFlowyGuide(true)}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#9db8ac] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-[#3ddc84]" />
              <span>{lang === 'en' ? 'AppFlowy API Guide' : 'دليل AppFlowy'}</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#3ddc84]" />
              <span>{lang === 'en' ? 'Export CSV' : 'تصدير CSV'}</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#49e38e] hover:to-[#2bc074] text-[#04170d] text-xs font-bold transition-all shadow cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>{lang === 'en' ? 'Add Plant' : 'إضافة نبتة'}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 pb-4 mb-6 text-xs overflow-x-auto scrollbar-none">
          {['all', 'healthy', 'recovering', 'urgent care'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-lg font-medium capitalize transition-all cursor-pointer ${
                filterStatus === st 
                  ? 'bg-white/15 text-white border border-white/20' 
                  : 'bg-white/[0.02] text-[#9db8ac] hover:text-white border border-white/5'
              }`}
            >
              {st} ({st === 'all' ? plants.length : plants.filter(p => p.status.toLowerCase() === st).length})
            </button>
          ))}
        </div>

        {/* Database Table View */}
        <div className="rounded-2xl bg-[#091510] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0c1c14] border-b border-white/10 text-[#9db8ac]">
                  <th className="py-3 px-4 font-semibold">{lang === 'en' ? 'Plant & Species' : 'النبتة والنوع'}</th>
                  <th className="py-3 px-4 font-semibold">{lang === 'en' ? 'Location' : 'المكان'}</th>
                  <th className="py-3 px-4 font-semibold">{lang === 'en' ? 'Status' : 'الحالة'}</th>
                  <th className="py-3 px-4 font-semibold">{lang === 'en' ? 'Watering Schedule' : 'ميعاد السقاية'}</th>
                  <th className="py-3 px-4 font-semibold">{lang === 'en' ? 'Field Observations' : 'الملاحظات'}</th>
                  <th className="py-3 px-4 font-semibold text-right">{lang === 'en' ? 'Actions' : 'إجراء'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPlants.map((plant) => {
                  const dueInfo = calculateNextDue(plant.lastWatered, plant.intervalDays);

                  return (
                    <tr key={plant.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Name & Species */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-sm">{plant.name}</div>
                        <div className="text-[11px] text-[#9db8ac]">{plant.species}</div>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4 text-[#9db8ac]">
                        {plant.location}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          plant.status === 'Healthy' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                          plant.status === 'Recovering' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                          'bg-red-500/15 text-red-400 border border-red-500/30'
                        }`}>
                          {plant.status}
                        </span>
                      </td>

                      {/* Next Watering */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Droplets className={`w-3.5 h-3.5 ${dueInfo.isOverdue ? 'text-red-400' : 'text-[#3ddc84]'}`} />
                          <span className={dueInfo.isOverdue ? 'text-red-400 font-bold' : 'text-white'}>
                            {dueInfo.isOverdue ? `${Math.abs(dueInfo.diffDays)} days overdue!` : 
                             dueInfo.isDueToday ? 'Due Today!' : 
                             `In ${dueInfo.diffDays} days`}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#9db8ac] mt-0.5">
                          Every {plant.intervalDays}d · Due {dueInfo.formattedDate}
                        </div>
                      </td>

                      {/* Notes */}
                      <td className="py-3 px-4 text-white/80 max-w-xs text-[11px] leading-relaxed">
                        {plant.notes}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleWaterPlant(plant.id)}
                            title="Mark as watered today"
                            className="px-2.5 py-1 rounded bg-[#3ddc84]/15 hover:bg-[#3ddc84]/25 text-[#3ddc84] text-[11px] font-semibold border border-[#3ddc84]/30 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>{lang === 'en' ? 'Watered' : 'سُقيت'}</span>
                          </button>

                          <button
                            onClick={() => handleDeletePlant(plant.id)}
                            title="Delete plant"
                            className="p-1 rounded text-[#9db8ac] hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredPlants.length === 0 && (
            <div className="py-12 text-center text-xs text-[#9db8ac]">
              {lang === 'en' ? 'No plants in this category. Click "+ Add Plant" above.' : 'لا توجد نباتات مسجلة في هذا القسم. اضغط على "+ إضافة نبتة" أعلاه.'}
            </div>
          )}
        </div>

      </div>

      {/* Add Plant Modal */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#040906]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-[#091510] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                {lang === 'en' ? 'Add Plant to Tracker' : 'إضافة نبتة جديدة للجدول'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-[#9db8ac] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPlant} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#9db8ac] mb-1">
                  {lang === 'en' ? 'Plant Nickname' : 'اسم النبتة'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'en' ? 'e.g. Balcony Ficus' : 'مثال: فيكس الشرفة'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#9db8ac] mb-1">
                    {lang === 'en' ? 'Species' : 'النوع / الصنف'}
                  </label>
                  <input
                    type="text"
                    placeholder="Monstera, Pothos..."
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#9db8ac] mb-1">
                    {lang === 'en' ? 'Location' : 'المكان بالمنزل'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'en' ? 'Living Room' : 'غرفة المعيشة'}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#9db8ac] mb-1">
                    {lang === 'en' ? 'Water Every (Days)' : 'الري كل (أيام)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={intervalDays}
                    onChange={(e) => setIntervalDays(Number(e.target.value))}
                    className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#9db8ac] mb-1">
                    {lang === 'en' ? 'Current Health' : 'الحالة الصحية'}
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="Healthy">Healthy / ممتازة</option>
                    <option value="Recovering">Recovering / تحت الشفاء</option>
                    <option value="Urgent Care">Urgent Care / حرجة</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9db8ac] mb-1">
                  {lang === 'en' ? 'Observation Notes' : 'ملاحظات وتاريخ العناية'}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === 'en' ? 'Repotted in chunky mix on Day 2...' : 'تم تغيير التربة إلى مزيج مهوى...'}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#08120d] border border-white/15 focus:border-[#3ddc84] text-white text-xs rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-[#3ddc84] to-[#22b06a] text-[#04170d] font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                {lang === 'en' ? 'Save Plant to Local Storage' : 'حفظ النبتة في المتصفح'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* AppFlowy Cloud & Self-Host Integration Guide Modal */}
      {showAppFlowyGuide && (
        <div 
          className="fixed inset-0 z-50 bg-[#040906]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowAppFlowyGuide(false)}
        >
          <div 
            className="w-full max-w-2xl bg-[#091510] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAppFlowyGuide(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#9db8ac] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3ddc84] uppercase tracking-wider mb-1">
                <span>Developer & Architecture Note</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                How to Connect AppFlowy as an Open-Source Notion Alternative
              </h3>
            </div>

            <div className="text-xs text-[#9db8ac] space-y-3 leading-relaxed">
              <p>
                <strong className="text-white">What is AppFlowy?</strong> AppFlowy is an open-source, privacy-first alternative to Notion built with Flutter and Rust, supporting offline-first collaboration and self-hosting.
              </p>

              <div className="p-4 rounded-xl bg-[#06100b] border border-white/10 space-y-2">
                <span className="font-bold text-white block">Integration Strategy for Save Your Plant:</span>
                <ol className="list-decimal list-inside space-y-1.5 text-white/90">
                  <li>
                    <strong>Client-Side Fallback (Implemented above):</strong> Stores the plant database in standard browser <code className="text-[#3ddc84]">localStorage</code> with instant CSV export and zero server overhead.
                  </li>
                  <li>
                    <strong>AppFlowy Cloud REST API:</strong> To sync with a multi-device AppFlowy database, spin up <code className="text-[#3ddc84]">appflowy-cloud</code> via Docker, then fetch and mutate rows using the AppFlowy REST API endpoint:
                    <div className="bg-black/50 p-2 rounded font-mono text-[11px] text-[#3ddc84] mt-1">
                      POST https://your-appflowy-instance.com/api/v1/database/rows
                    </div>
                  </li>
                  <li>
                    <strong>CSV Import:</strong> Users can click the <strong className="text-white">"Export CSV"</strong> button above and import directly into AppFlowy Desktop or Notion with a single drag-and-drop.
                  </li>
                </ol>
              </div>

              <p>
                This dual architecture guarantees that users have a zero-friction, working tracker out of the box in this browser applet, with a clear upgrade path to self-hosted AppFlowy.
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowAppFlowyGuide(false)}
                className="px-4 py-2 rounded-xl bg-[#3ddc84] text-[#04170d] font-bold text-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
