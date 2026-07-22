import React, { useState } from 'react';
import { AmbulanceProfile, EmergencyRequest } from '../../types';
import { Ambulance, MapPin, Phone, Siren, Navigation, CheckCircle2, ShieldAlert } from 'lucide-react';

interface AmbulancePortalProps {
  ambulance: AmbulanceProfile;
  activeRequests: EmergencyRequest[];
}

export const AmbulancePortal: React.FC<AmbulancePortalProps> = ({ ambulance, activeRequests }) => {
  const [status, setStatus] = useState<'Available' | 'On Emergency' | 'In Transit'>('On Emergency');
  const activeSOS = activeRequests[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 via-slate-900 to-rose-900 text-white rounded-2xl p-6 shadow-md border border-red-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600 p-3 text-white flex items-center justify-center shadow-lg">
              <Ambulance className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold">{ambulance.driverName}</h2>
                <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                  Ambulance 108
                </span>
              </div>
              <p className="text-xs text-slate-300">Vehicle No: {ambulance.vehicleNumber} • Type: {ambulance.type}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-300 font-medium">Status:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="bg-slate-800 text-white font-bold px-3 py-2 rounded-xl border border-slate-700 outline-none"
            >
              <option value="Available">Available</option>
              <option value="On Emergency">On Emergency</option>
              <option value="In Transit">In Transit</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GPS Map Simulation Panel */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-xl text-white space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-red-500 animate-pulse" />
              <h3 className="font-extrabold text-sm">GPS Dispatch Route Simulator</h3>
            </div>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded">
              ETA: ~8 Mins (3.2 km)
            </span>
          </div>

          {/* Interactive Map Visual Box */}
          <div className="relative bg-slate-900 rounded-xl h-64 border border-slate-800 overflow-hidden flex items-center justify-center p-4">
            {/* Grid Map Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

            <div className="relative z-10 space-y-4 text-center">
              <div className="flex items-center justify-center space-x-6">
                <div className="p-3 bg-red-900/80 border border-red-500 rounded-xl text-xs font-bold text-red-200">
                  🏥 Nabha Civil Hospital (Depot)
                </div>
                <div className="text-amber-400 font-mono text-xs animate-pulse">======▶</div>
                <div className="p-3 bg-emerald-900/80 border border-emerald-500 rounded-xl text-xs font-bold text-emerald-200">
                  📍 Kakra Village (Patient SOS)
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Current Ambulance Coordinates: 30.3752° N, 76.1528° E (Circular Road, Nabha)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href="tel:+919876543210"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center space-x-2 text-center"
            >
              <Phone className="w-4 h-4" />
              <span>Call Patient Harpreet Kaur</span>
            </a>
            <button className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs py-3 rounded-xl">
              Start Navigation Audio
            </button>
          </div>
        </div>

        {/* Emergency Patient Details */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Siren className="w-4 h-4 text-red-600" />
            <span>Active Dispatch Request</span>
          </h3>

          {activeSOS && (
            <div className="space-y-3">
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2">
                <div className="flex justify-between font-bold text-red-950">
                  <span>{activeSOS.patientName} ({activeSOS.patientPhone})</span>
                  <span className="bg-red-200 text-red-900 text-[10px] px-2 py-0.5 rounded">{activeSOS.emergencyType}</span>
                </div>
                <div className="text-slate-700">📍 Destination: {activeSOS.location.address}</div>
                <div className="p-2 bg-white rounded-lg border border-red-100 font-mono text-[11px] text-slate-800">
                  Vitals Note: {activeSOS.vitalsSummary}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-slate-600">
                <div className="font-bold text-slate-900">Hospital Pre-Alert Status:</div>
                <p>Nabha Civil Hospital Emergency Room prepared for arrival in ~8 mins.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
