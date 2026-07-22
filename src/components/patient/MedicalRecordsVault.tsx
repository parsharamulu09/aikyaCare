import React from 'react';
import { Prescription, PatientProfile } from '../../types';
import { FileText, ShieldCheck, Download, Syringe, Heart, Users } from 'lucide-react';

interface MedicalRecordsVaultProps {
  patient: PatientProfile;
  prescriptions: Prescription[];
}

export const MedicalRecordsVault: React.FC<MedicalRecordsVaultProps> = ({ patient, prescriptions }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Encrypted Digital Health Vault</h2>
          <p className="text-xs text-slate-500 mt-1">ABHA Health ID & Nabha Telemedicine Prescriptions</p>
        </div>
        <div className="bg-blue-50 text-blue-800 font-bold text-xs px-3 py-1.5 rounded-lg border border-blue-200 flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>AES-256 Encrypted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Digital Prescriptions List */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Digital Prescriptions</span>
          </h3>

          {prescriptions.map((rx) => (
            <div key={rx.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{rx.doctorName}</span>
                  <span className="text-slate-500">{rx.doctorRegistrationNo} • {rx.date}</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              <div>
                <span className="font-semibold text-slate-800 block">Diagnosis:</span>
                <p className="text-slate-600">{rx.diagnosis}</p>
              </div>

              <div>
                <span className="font-semibold text-slate-800 block mb-1">Prescribed Medications:</span>
                <div className="space-y-2">
                  {rx.medicines.map((m, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-900">{m.medicineName}</div>
                        <div className="text-[11px] text-slate-500">Dosage: {m.dosage} • {m.instructions}</div>
                      </div>
                      <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-[10px]">
                        {m.frequency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {rx.dietaryAdvice && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
                  <span className="font-bold block mb-0.5">Doctor Dietary Advice:</span>
                  <p>{rx.dietaryAdvice}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Vaccinations, Chronic Diseases & Family */}
        <div className="lg:col-span-4 space-y-6">
          {/* Immunization History */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 flex items-center space-x-2">
              <Syringe className="w-4 h-4 text-emerald-600" />
              <span>Vaccination History</span>
            </h3>
            <div className="space-y-2">
              {patient.vaccinations.map((vac, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-900">{vac.name}</div>
                    <div className="text-[10px] text-slate-500">{vac.date}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    vac.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {vac.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Family Profiles */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Family Members</span>
            </h3>
            <div className="space-y-2">
              {patient.familyMembers.map((fm, idx) => (
                <div key={idx} className="p-2.5 bg-purple-50/50 border border-purple-100 rounded-xl flex justify-between items-center">
                  <div>
                    <div className="font-bold text-purple-950">{fm.name} ({fm.relation})</div>
                    <div className="text-[10px] text-purple-800">Age: {fm.age} • Blood Group: {fm.bloodGroup}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
