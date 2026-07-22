import React, { useState } from 'react';
import { HealthWorkerProfile, VillageSurveyRecord, VaccineRecord } from '../../types';
import { Users, Wifi, WifiOff, RefreshCw, Plus, CheckCircle2, Heart, Baby, Calendar } from 'lucide-react';

interface HealthWorkerPortalProps {
  asha: HealthWorkerProfile;
  surveys: VillageSurveyRecord[];
  vaccines: VaccineRecord[];
  onAddSurvey: (survey: any) => void;
}

export const HealthWorkerPortal: React.FC<HealthWorkerPortalProps> = ({
  asha,
  surveys,
  vaccines,
  onAddSurvey
}) => {
  const [activeTab, setActiveTab] = useState<'survey' | 'maternal' | 'offline'>('survey');
  const [householdNo, setHouseholdNo] = useState('ROH-108');
  const [villageName, setVillageName] = useState('Kakra');
  const [headName, setHeadName] = useState('Gurbachan Singh');
  const [familyCount, setFamilyCount] = useState('5');
  const [cleanWater, setCleanWater] = useState(true);
  const [sanitation, setSanitation] = useState(true);
  const [pregnantCount, setPregnantCount] = useState('1');
  const [childrenCount, setChildrenCount] = useState('1');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [offlinePendingCount, setOfflinePendingCount] = useState(0);
  const [surveySaved, setSurveySaved] = useState(false);

  const handleSubmitSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOfflineMode) {
      setOfflinePendingCount(offlinePendingCount + 1);
    }
    onAddSurvey({
      householdNumber: householdNo,
      villageName,
      headOfFamily: headName,
      familyMembersCount: Number(familyCount),
      hasCleanWater: cleanWater,
      hasSanitation: sanitation,
      pregnantWomenCount: Number(pregnantCount),
      childrenUnderFive: Number(childrenCount)
    });
    setSurveySaved(true);
    setTimeout(() => setSurveySaved(false), 2000);
  };

  const handleSyncOfflineData = () => {
    setOfflinePendingCount(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 via-slate-900 to-orange-900 text-white rounded-2xl p-6 shadow-md border border-amber-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80" alt={asha.userId} className="w-16 h-16 rounded-full object-cover border-2 border-amber-400" />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold">Simranjit Kaur (ASHA Worker)</h2>
                <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded">
                  ASHA Code: {asha.ashaCode}
                </span>
              </div>
              <p className="text-xs text-slate-300">Assigned Sector: {asha.assignedVillage} • Sub-Center: {asha.subCenter}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={`p-3 rounded-xl border flex items-center space-x-2 font-bold transition-all ${
                isOfflineMode ? 'bg-rose-900 border-rose-500 text-white' : 'bg-emerald-900 border-emerald-500 text-white'
              }`}
            >
              {isOfflineMode ? <WifiOff className="w-4 h-4 text-rose-400" /> : <Wifi className="w-4 h-4 text-emerald-400" />}
              <span>{isOfflineMode ? 'Offline Mode Active' : 'Connected to Server'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 pt-6 border-t border-amber-800/80 text-xs">
          <button
            onClick={() => setActiveTab('survey')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'survey' ? 'bg-amber-400 text-slate-900 shadow' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Village Household Survey
          </button>
          <button
            onClick={() => setActiveTab('maternal')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'maternal' ? 'bg-amber-400 text-slate-900 shadow' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Maternal & Child Health ({asha.activeMaternalCases} Active)
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'offline' ? 'bg-amber-400 text-slate-900 shadow' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Offline Data Sync ({offlinePendingCount} Pending)
          </button>
        </div>
      </div>

      {/* 1. Village Survey Tool */}
      {activeTab === 'survey' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <Plus className="w-4 h-4 text-amber-600" />
              <span>Field Household Survey Form</span>
            </h3>

            {surveySaved && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center space-x-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Survey saved successfully {isOfflineMode ? '(Cached locally)' : ''}!</span>
              </div>
            )}

            <form onSubmit={handleSubmitSurvey} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Household No.</label>
                  <input
                    type="text"
                    value={householdNo}
                    onChange={(e) => setHouseholdNo(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Village Name</label>
                  <input
                    type="text"
                    value={villageName}
                    onChange={(e) => setVillageName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Head of Family</label>
                <input
                  type="text"
                  value={headName}
                  onChange={(e) => setHeadName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 mb-1">Total Members</label>
                  <input
                    type="number"
                    value={familyCount}
                    onChange={(e) => setFamilyCount(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Pregnant Women</label>
                  <input
                    type="number"
                    value={pregnantCount}
                    onChange={(e) => setPregnantCount(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Children &lt;5y</label>
                  <input
                    type="number"
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer font-medium">
                  <input type="checkbox" checked={cleanWater} onChange={(e) => setCleanWater(e.target.checked)} />
                  <span>Clean Water Source</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer font-medium">
                  <input type="checkbox" checked={sanitation} onChange={(e) => setSanitation(e.target.checked)} />
                  <span>Sanitation Toilet</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl shadow transition-all"
              >
                Save Household Record
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Completed Village Surveys</h3>
            <div className="space-y-3">
              {surveys.map((s) => (
                <div key={s.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{s.householdNumber} - {s.headOfFamily} ({s.villageName})</span>
                    <span className="text-emerald-600">Synced</span>
                  </div>
                  <div className="text-slate-600">
                    Members: {s.familyMembersCount} • Pregnant Women: {s.pregnantWomenCount} • Children &lt;5y: {s.childrenUnderFive}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Maternal & Child Health */}
      {activeTab === 'maternal' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Baby className="w-4 h-4 text-rose-600" />
            <span>High-Risk Maternal & Immunization Monitoring</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vaccines.map((vac) => (
              <div key={vac.id} className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                <div className="flex justify-between font-bold text-rose-950">
                  <span>{vac.patientName} ({vac.patientType})</span>
                  <span className="bg-rose-200 text-rose-900 text-[10px] px-2 py-0.5 rounded">{vac.status}</span>
                </div>
                <div className="text-slate-700">Vaccine: {vac.vaccineName}</div>
                <div className="text-slate-500 text-[11px]">Due Date: {vac.dueDate} • Village: {vac.village}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Offline Sync Manager */}
      {activeTab === 'offline' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs max-w-xl mx-auto text-center">
          <RefreshCw className={`w-10 h-10 mx-auto text-amber-500 ${offlinePendingCount > 0 ? 'animate-spin' : ''}`} />
          <h3 className="text-base font-bold text-slate-900">Offline Local Storage Manager</h3>
          <p className="text-slate-600">
            Field survey records collected without internet connection are cached locally on your device.
          </p>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between font-bold">
            <span>Pending Offline Records:</span>
            <span className="text-lg text-amber-600">{offlinePendingCount} Items</span>
          </div>

          <button
            onClick={handleSyncOfflineData}
            disabled={offlinePendingCount === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow transition-all disabled:opacity-50"
          >
            Sync All Offline Data to Server Now
          </button>
        </div>
      )}
    </div>
  );
};
