import React, { useState } from 'react';
import { HospitalProfile, EmergencyRequest } from '../../types';
import { Building2, Bed, Siren, Plus, Minus, Package, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HospitalPortalProps {
  hospital: HospitalProfile;
  emergencyRequests: EmergencyRequest[];
}

export const HospitalPortal: React.FC<HospitalPortalProps> = ({ hospital, emergencyRequests }) => {
  const [beds, setBeds] = useState(hospital.availableBeds);
  const [medicines, setMedicines] = useState([
    { id: 'm1', name: 'Paracetamol 500mg', stock: 1450, unit: 'tablets', reorder: 300 },
    { id: 'm2', name: 'Amlodipine 5mg', stock: 820, unit: 'tablets', reorder: 200 },
    { id: 'm3', name: 'Oral Rehydration Salts (ORS)', stock: 95, unit: 'sachets', reorder: 100 },
    { id: 'm4', name: 'Injectable Atropine', stock: 40, unit: 'ampoules', reorder: 50 }
  ]);

  const updateBedCount = async (type: keyof typeof beds, delta: number) => {
    const newCount = Math.max(0, beds[type] + delta);
    const updated = { ...beds, [type]: newCount };
    setBeds(updated);

    try {
      await fetch(`/api/hospitals/${hospital.id}/beds`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error('Bed update failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-900 text-white rounded-2xl p-6 shadow-md border border-teal-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-extrabold">{hospital.hospitalName}</h2>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                Nabha Sub-Divisional Node
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{hospital.address} • License: {hospital.licenseNumber}</p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
              <div className="text-lg font-bold text-emerald-400">
                {beds.icu + beds.oxygen + beds.general + beds.pediatric} / {hospital.totalBeds}
              </div>
              <div className="text-[10px] text-slate-400">Available Beds</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
              <div className="text-lg font-bold text-amber-400">108 Active</div>
              <div className="text-[10px] text-slate-400">Emergency Unit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Bed Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
          <Bed className="w-4 h-4 text-teal-600" />
          <span>Real-time Bed Occupancy Matrix</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {[
            { key: 'icu', label: 'ICU Beds', count: beds.icu, color: 'border-red-200 bg-red-50/50 text-red-900' },
            { key: 'oxygen', label: 'Oxygen Beds', count: beds.oxygen, color: 'border-blue-200 bg-blue-50/50 text-blue-900' },
            { key: 'general', label: 'General Ward', count: beds.general, color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900' },
            { key: 'pediatric', label: 'Pediatric Beds', count: beds.pediatric, color: 'border-purple-200 bg-purple-50/50 text-purple-900' }
          ].map(({ key, label, count, color }) => (
            <div key={key} className={`p-4 rounded-xl border ${color} space-y-3`}>
              <div className="font-bold text-sm flex justify-between items-center">
                <span>{label}</span>
                <span className="text-lg font-black">{count} Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateBedCount(key as any, -1)}
                  className="bg-white hover:bg-slate-100 border p-1.5 rounded-lg text-slate-800 font-bold transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => updateBedCount(key as any, 1)}
                  className="bg-white hover:bg-slate-100 border p-1.5 rounded-lg text-slate-800 font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-slate-500">Update Availability</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Emergency SOS Feed */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Siren className="w-4 h-4 text-red-600" />
            <span>Active Emergency SOS Queue</span>
          </h3>

          <div className="space-y-3">
            {emergencyRequests.map((sos) => (
              <div key={sos.id} className="p-4 bg-red-50/60 border border-red-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-red-950 text-sm">{sos.patientName} ({sos.emergencyType})</span>
                  <span className="bg-red-200 text-red-900 text-[10px] px-2 py-0.5 rounded">{sos.status}</span>
                </div>
                <p className="text-slate-700">Location: {sos.location.address}</p>
                <p className="text-slate-500 text-[11px]">{sos.vitalsSummary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medicine Inventory */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Package className="w-4 h-4 text-teal-600" />
            <span>Pharmacy & Medicine Inventory</span>
          </h3>

          <div className="space-y-2">
            {medicines.map((m) => (
              <div key={m.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900">{m.name}</div>
                  <div className="text-[10px] text-slate-500">Reorder Threshold: {m.reorder} {m.unit}</div>
                </div>
                <div className="text-right">
                  <div className={`font-black ${m.stock < m.reorder ? 'text-red-600' : 'text-emerald-600'}`}>
                    {m.stock} {m.unit}
                  </div>
                  {m.stock < m.reorder && (
                    <span className="text-[9px] bg-red-100 text-red-800 font-bold px-1.5 py-0.2 rounded block">Low Stock</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
