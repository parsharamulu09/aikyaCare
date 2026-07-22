import React, { useState } from 'react';
import { Appointment, DoctorProfile, Prescription } from '../../types';
import { Stethoscope, Calendar, CheckCircle2, XCircle, Video, FileText, User, Plus, Search, Award } from 'lucide-react';

interface DoctorPortalProps {
  doctor: DoctorProfile;
  appointments: Appointment[];
  onUpdateStatus: (aptId: string, status: any) => void;
  onCreatePrescription: (rxData: any) => void;
}

export const DoctorPortal: React.FC<DoctorPortalProps> = ({
  doctor,
  appointments,
  onUpdateStatus,
  onCreatePrescription
}) => {
  const [activeTab, setActiveTab] = useState<'queue' | 'prescribe' | 'history'>('queue');
  const [selectedAptForRx, setSelectedAptForRx] = useState<Appointment | null>(appointments[0] || null);

  // Prescription Form State
  const [diagnosis, setDiagnosis] = useState('Stage-1 Hypertension & Mild Anemia');
  const [medName, setMedName] = useState('Amlodipine');
  const [dosage, setDosage] = useState('5mg');
  const [frequency, setFrequency] = useState('1-0-0 (Morning)');
  const [duration, setDuration] = useState('30');
  const [instructions, setInstructions] = useState('Take after breakfast with water');
  const [labTests, setLabTests] = useState('Complete Blood Count (CBC), Serum Potassium');
  const [dietAdvice, setDietAdvice] = useState('Reduce salt intake (< 5g/day), eat green leafy vegetables');
  const [prescribedSuccess, setPrescribedSuccess] = useState(false);

  const handleGenerateRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAptForRx) return;

    onCreatePrescription({
      appointmentId: selectedAptForRx.id,
      patientId: selectedAptForRx.patientId,
      patientName: selectedAptForRx.patientName,
      doctorId: doctor.id,
      doctorName: doctor.name,
      diagnosis,
      medicines: [
        {
          medicineName: medName,
          dosage,
          frequency,
          durationDays: Number(duration),
          instructions
        }
      ],
      labTests: labTests.split(',').map((t) => t.trim()),
      dietaryAdvice: dietAdvice
    });

    setPrescribedSuccess(true);
    setTimeout(() => {
      setPrescribedSuccess(false);
      setActiveTab('queue');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img src={doctor.userId === 'usr_doc_1' ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=250&q=80' : 'https://images.unsplash.com/photo-1594824813566-78a932788e02?auto=format&fit=crop&w=250&q=80'} alt={doctor.name} className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400" />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold">{doctor.name}</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                  PMC Verified Doctor
                </span>
              </div>
              <p className="text-xs text-slate-300">{doctor.specialization} • {doctor.qualification}</p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">Reg No: {doctor.registrationNo} • {doctor.hospitalAffiliation}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
              <div className="text-lg font-bold text-amber-400">4.9 ★</div>
              <div className="text-[10px] text-slate-400">Patient Rating</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
              <div className="text-lg font-bold text-emerald-400">1,240+</div>
              <div className="text-[10px] text-slate-400">Consultations</div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex space-x-2 pt-6 border-t border-indigo-800/80 text-xs">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'queue' ? 'bg-amber-400 text-slate-900 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Appointments Queue ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('prescribe')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'prescribe' ? 'bg-amber-400 text-slate-900 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Issue Digital Prescription
          </button>
        </div>
      </div>

      {/* 1. Appointments Queue */}
      {activeTab === 'queue' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Today's Rural Telemedicine Queue</span>
          </h3>

          <div className="space-y-3 text-xs">
            {appointments.map((apt) => (
              <div key={apt.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{apt.patientName}</span>
                    <span className="text-slate-500">({apt.patientAge}y, {apt.patientGender})</span>
                    <span className="bg-blue-100 text-blue-800 font-bold text-[10px] px-2 py-0.5 rounded">
                      Nabha Block
                    </span>
                  </div>
                  <div className="text-slate-600">
                    Symptom Note: <span className="font-medium text-slate-800">{apt.symptoms}</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    📅 {apt.date} at {apt.timeSlot} • Status: <span className="font-bold text-slate-900">{apt.status}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {apt.status === 'Requested' && (
                    <>
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'Accepted')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'Cancelled')}
                        className="bg-red-100 hover:bg-red-200 text-red-700 font-bold px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}

                  {apt.status === 'Accepted' && (
                    <button
                      onClick={() => {
                        setSelectedAptForRx(apt);
                        setActiveTab('prescribe');
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Write Digital Rx</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Digital Prescription Writer */}
      {activeTab === 'prescribe' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 text-xs max-w-3xl mx-auto">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Digital Prescription Form</h3>
              <p className="text-slate-500">Patient: {selectedAptForRx?.patientName || 'Harpreet Kaur'} (Kakra Village)</p>
            </div>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
              Verified PMC Stamp
            </span>
          </div>

          {prescribedSuccess ? (
            <div className="bg-emerald-950 text-white p-6 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-sm">Prescription Issued & Transmitted!</h4>
              <p className="text-xs text-emerald-200">Digital prescription saved to patient vault & emailed to Kakra sub-center.</p>
            </div>
          ) : (
            <form onSubmit={handleGenerateRx} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Diagnosis</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="font-bold text-slate-800 block">Prescribed Medication #1</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Medicine Name</label>
                    <input
                      type="text"
                      value={medName}
                      onChange={(e) => setMedName(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Dosage</label>
                    <input
                      type="text"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Frequency</label>
                    <input
                      type="text"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Duration (Days)</label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Special Instructions</label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Recommended Lab Tests</label>
                <input
                  type="text"
                  value={labTests}
                  onChange={(e) => setLabTests(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dietary & Lifestyle Advice</label>
                <textarea
                  rows={2}
                  value={dietAdvice}
                  onChange={(e) => setDietAdvice(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow transition-all"
              >
                Sign & Transmit Digital Prescription
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
