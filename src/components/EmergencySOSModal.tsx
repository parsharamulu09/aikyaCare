import React, { useState, useEffect } from 'react';
import { Siren, X, MapPin, Phone, Ambulance, Building2, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { EmergencyRequest } from '../types';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState<'idle' | 'locating' | 'countdown' | 'dispatched'>('idle');
  const [countdown, setCountdown] = useState(5);
  const [emergencyType, setEmergencyType] = useState<string>('Severe Medical Emergency');
  const [activeSOS, setActiveSOS] = useState<EmergencyRequest | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string }>({
    lat: 30.3621,
    lng: 76.1412,
    address: 'Kakra Village Main Road, Nabha Block, Patiala'
  });

  useEffect(() => {
    if (isOpen) {
      // Try fetching browser GPS if available
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              address: `GPS: ${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E (Nabha Block)`
            });
          },
          () => {}
        );
      }
    } else {
      setStage('idle');
      setCountdown(5);
      setActiveSOS(null);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === 'countdown' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (stage === 'countdown' && countdown === 0) {
      triggerSOSDispatch();
    }
    return () => clearTimeout(timer);
  }, [stage, countdown]);

  const triggerSOSDispatch = async () => {
    setStage('dispatched');
    try {
      const res = await fetch('/api/emergency/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: location.lat,
          lng: location.lng,
          address: location.address,
          village: 'Kakra',
          emergencyType
        })
      });
      const data = await res.json();
      if (data.success) {
        setActiveSOS(data.sos);
      }
    } catch (err) {
      console.error('SOS Dispatch API failed:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-red-800/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-white relative animate-in fade-in zoom-in">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-900 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Siren className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">1-Click Emergency SOS Hotline</h3>
              <p className="text-[11px] text-red-100">Nabha Block Emergency Command Center (108 / Civil Hospital)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-red-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {stage === 'idle' && (
            <div className="space-y-5 text-center">
              <div className="p-3 bg-red-950/80 border border-red-800/80 rounded-xl text-left text-xs space-y-1">
                <div className="flex items-center space-x-2 font-bold text-red-300">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Immediate GPS Dispatch Active</span>
                </div>
                <p className="text-slate-300">
                  Pressing the SOS button instantly transmits your location to Ambulance 108, Nabha Civil Hospital Emergency Ward, and notifies your family.
                </p>
              </div>

              {/* Location display */}
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs flex items-center space-x-3 text-left">
                <MapPin className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-200">Current Detected Location</div>
                  <div className="text-slate-400">{location.address}</div>
                </div>
              </div>

              {/* Emergency Category */}
              <div className="text-left space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Select Emergency Type:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    'Cardiac / Chest Pain',
                    'Severe Fever / Seizure',
                    'Accident / Trauma',
                    'Pregnancy / Labor',
                    'Respiratory Distress',
                    'Other Critical Condition'
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEmergencyType(type)}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        emergencyType === type
                          ? 'bg-red-950 border-red-500 text-white font-bold'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* BIG SOS BUTTON */}
              <button
                onClick={() => setStage('countdown')}
                className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-lg py-5 rounded-2xl shadow-xl shadow-red-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-3 border-2 border-red-400"
              >
                <Siren className="w-7 h-7 text-white animate-pulse" />
                <span>CONFIRM & DISPATCH SOS NOW</span>
              </button>
            </div>
          )}

          {stage === 'countdown' && (
            <div className="text-center py-6 space-y-4">
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center rounded-full bg-red-950 border-4 border-red-500 text-5xl font-black text-red-400 animate-ping">
                {countdown}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Sending Alert in {countdown} Seconds...</h4>
                <p className="text-xs text-slate-400 mt-1">Press cancel below if pressed by accident</p>
              </div>
              <button
                onClick={() => setStage('idle')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-6 py-2.5 rounded-xl border border-slate-700"
              >
                Cancel Emergency
              </button>
            </div>
          )}

          {stage === 'dispatched' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/90 border border-emerald-700 p-4 rounded-xl flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-200 text-sm">Emergency Dispatch Confirmed!</h4>
                  <p className="text-xs text-emerald-300">Ambulance PB-11-CB-1081 dispatched to {location.address}</p>
                </div>
              </div>

              {/* Assigned Vehicle Details */}
              <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                  <div className="flex items-center space-x-2 text-slate-200 font-bold">
                    <Ambulance className="w-4 h-4 text-red-400" />
                    <span>Ambulance 108 (Advanced Life Support)</span>
                  </div>
                  <span className="bg-emerald-900 text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">
                    ETA: ~8 mins
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-400 block">Driver:</span>
                    <span className="font-bold text-white">Gurmeet Singh</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Vehicle No:</span>
                    <span className="font-bold text-white">PB-11-CB-1081</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Hospital Unit:</span>
                    <span className="font-bold text-white">Nabha Civil Hospital</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Family Alert:</span>
                    <span className="font-bold text-emerald-400">SMS Sent (+91 98765 99001)</span>
                  </div>
                </div>
              </div>

              {/* Quick Call Controls */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:108"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center space-x-2 text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Driver (108)</span>
                </a>
                <a
                  href="tel:+911765220100"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs py-3 rounded-xl flex items-center justify-center space-x-2 text-center"
                >
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Call Civil Hospital</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
