import React from 'react';
import { PatientProfile, HealthMetric, Appointment, Prescription } from '../../types';
import { Heart, Activity, Calendar, FileText, Sparkles, AlertCircle, ArrowUpRight, Plus, Droplets, Moon } from 'lucide-react';

interface PatientDashboardProps {
  patient: PatientProfile;
  metrics: HealthMetric[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  onNavigate: (tab: string) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  patient,
  metrics,
  appointments,
  prescriptions,
  onNavigate
}) => {
  const latestMetric = metrics[0] || {
    systolicBP: 138,
    diastolicBP: 88,
    fastingSugar: 118,
    weightKg: 68,
    bmi: 25.9,
    heartRate: 76,
    waterIntakeLiters: 2.8,
    sleepHours: 7.5
  };

  const upcomingApts = appointments.filter((a) => a.status === 'Accepted' || a.status === 'Requested');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-900/60 border border-blue-700/60 px-3 py-1 rounded-full text-xs text-blue-300 font-semibold mb-2">
              <span>Village: {patient.village} (Nabha Block)</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">Sat Sri Akal, {patient.userId === 'usr_pat_1' ? 'Harpreet Kaur' : 'Patient'}</h2>
            <p className="text-slate-400 text-xs mt-1">
              Health Record ID: <span className="font-mono text-blue-300">PB-NAB-PAT-9041</span> • Aadhaar: {patient.aadhaarNumber}
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-800 p-3.5 rounded-xl border border-slate-700 text-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center font-black text-emerald-400 text-base">
              74
            </div>
            <div>
              <div className="text-slate-200 font-semibold">AI Rural Health Score</div>
              <div className="text-[11px] text-emerald-400 font-medium">Good • BP Monitoring Recommended</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vital Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Blood Pressure</span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {latestMetric.systolicBP}/{latestMetric.diastolicBP} <span className="text-xs font-normal text-slate-500">mmHg</span>
          </div>
          <div className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md font-semibold w-fit border border-amber-200/60">
            Mild Elevation
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Fasting Glucose</span>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {latestMetric.fastingSugar} <span className="text-xs font-normal text-slate-500">mg/dL</span>
          </div>
          <div className="text-[11px] text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md font-semibold w-fit border border-blue-200/60">
            Pre-Diabetic Range
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>BMI & Weight</span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {latestMetric.bmi} <span className="text-xs font-normal text-slate-500">({latestMetric.weightKg} kg)</span>
          </div>
          <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md font-semibold w-fit border border-emerald-200/60">
            Normal Category
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Hydration & Sleep</span>
            <Droplets className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {latestMetric.waterIntakeLiters}L <span className="text-xs font-normal text-slate-500">/ {latestMetric.sleepHours}h</span>
          </div>
          <div className="text-[11px] text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md font-semibold w-fit border border-teal-200/60">
            Healthy Habit
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upcoming Tele-consultations & Quick Actions */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Upcoming Telemedicine Consultations</h3>
              </div>
              <button
                onClick={() => onNavigate('telemedicine_booking')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Book Doctor</span>
              </button>
            </div>

            {upcomingApts.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No upcoming appointments scheduled.</p>
            ) : (
              <div className="space-y-3">
                {upcomingApts.map((apt) => (
                  <div key={apt.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{apt.doctorName}</div>
                      <div className="text-slate-600 font-medium">{apt.doctorSpecialization}</div>
                      <div className="text-slate-500 mt-1">
                        📅 {apt.date} at {apt.timeSlot} • Mode: <span className="font-bold text-blue-600">{apt.consultationType} Call</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onNavigate('consultation_room')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
                      >
                        <span>Join Call</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Prescriptions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Digital Prescriptions & Advice</h3>
              </div>
              <button
                onClick={() => onNavigate('medical_records')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                View All Records
              </button>
            </div>

            {prescriptions.map((rx) => (
              <div key={rx.id} className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-950 text-sm">Diagnosis: {rx.diagnosis}</span>
                  <span className="text-slate-500 font-medium">{rx.date}</span>
                </div>
                <div className="text-slate-700">
                  Doctor: <span className="font-semibold text-slate-900">{rx.doctorName}</span> ({rx.doctorRegistrationNo})
                </div>
                <div className="pt-2 border-t border-indigo-100">
                  <span className="font-semibold text-slate-800 block mb-1">Prescribed Medicines:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    {rx.medicines.map((m, idx) => (
                      <li key={idx}>
                        <span className="font-medium text-slate-900">{m.medicineName}</span> ({m.dosage}) - {m.frequency} for {m.durationDays} days
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Triage & Quick Tools */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-4 border border-slate-800">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-base text-white">AI Triage & Symptom Checker</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Describe how you feel to get instant condition probability, urgency level, and first aid tips powered by Gemini 3.6.
            </p>
            <button
              onClick={() => onNavigate('patient_ai')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-lg shadow-sm transition-all"
            >
              Start Symptom Check
            </button>
          </div>

          {/* Preventive Health Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Nabha Health Alert</span>
            </div>
            <p className="text-amber-900 leading-relaxed">
              ASHA Worker Simranjit Kaur is conducting home visits in Kakra Village on Thursday for blood pressure & anemia screening.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
