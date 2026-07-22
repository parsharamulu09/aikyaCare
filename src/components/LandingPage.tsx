import React from 'react';
import { UserRole } from '../types';
import {
  HeartPulse,
  Stethoscope,
  Building2,
  Users,
  Ambulance,
  ShieldCheck,
  Siren,
  Sparkles,
  ArrowRight,
  Video,
  FileText,
  Activity,
  CheckCircle2,
  FileCode2,
  Brain
} from 'lucide-react';

interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
  onOpenSOS: () => void;
  onOpenDocs: () => void;
  onOpenAiAssistant: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectRole,
  onOpenSOS,
  onOpenDocs,
  onOpenAiAssistant
}) => {
  const problems = [
    { title: 'Lack of Rural Doctors', desc: 'Patients in Kakra & Rohti travel 25+ km to Patiala for basic consultations.', icon: <Stethoscope className="w-5 h-5 text-blue-600" /> },
    { title: 'Delayed Emergency Care', desc: 'Critical delay in dispatching ambulances during acute cardiac or maternal emergencies.', icon: <Siren className="w-5 h-5 text-red-600" /> },
    { title: 'Lost Medical Records', desc: 'Paper prescriptions get damaged or misplaced, hindering treatment history.', icon: <FileText className="w-5 h-5 text-amber-600" /> },
    { title: 'Poor Preventative Monitoring', desc: 'Undetected diabetes, hypertension, and high-risk pregnancy complications in villages.', icon: <Activity className="w-5 h-5 text-emerald-600" /> }
  ];

  const rolesList: { role: UserRole; title: string; subtitle: string; icon: React.ReactNode; color: string }[] = [
    { role: 'patient', title: 'Patient Portal', subtitle: 'Book tele-consults, view digital Rx, track vitals & AI symptom checks', icon: <HeartPulse className="w-6 h-6" />, color: 'from-blue-600 to-indigo-600' },
    { role: 'doctor', title: 'Doctor Console', subtitle: 'Accept rural appointments, video consultation, issue digital prescriptions', icon: <Stethoscope className="w-6 h-6" />, color: 'from-indigo-600 to-purple-600' },
    { role: 'hospital', title: 'Hospital Hub', subtitle: 'Nabha Civil Hospital bed matrix, ambulance dispatch, medicine inventory', icon: <Building2 className="w-6 h-6" />, color: 'from-teal-600 to-emerald-600' },
    { role: 'health_worker', title: 'ASHA / ANM Portal', subtitle: 'Village surveys, offline sync, maternal & child immunization tracking', icon: <Users className="w-6 h-6" />, color: 'from-amber-600 to-orange-600' },
    { role: 'ambulance', title: 'Ambulance 108', subtitle: 'Live GPS SOS navigation, patient vitals stream, nearest hospital route', icon: <Ambulance className="w-6 h-6" />, color: 'from-red-600 to-rose-600' },
    { role: 'admin', title: 'Admin Command', subtitle: 'Nabha district health analytics, disease heatmaps, AI policy insights', icon: <ShieldCheck className="w-6 h-6" />, color: 'from-slate-700 to-slate-900' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>SIH25018 • Rural Healthcare Telemedicine Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              AI-Powered Healthcare Access for <span className="text-blue-500">Rural Communities</span> in Nabha
            </h1>

            <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
              AikyaCare bridges the healthcare gap between rural Punjab villages and super-specialty hospitals through remote video tele-consultations, AI symptom triage, digital health vaults, ASHA worker offline sync, and 1-click GPS ambulance dispatch.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onSelectRole('patient')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-sm transition-all flex items-center space-x-2 text-sm"
              >
                <span>Launch Patient Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAiAssistant}
                className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white font-bold px-5 py-3.5 rounded-xl transition-all flex items-center space-x-2 text-sm"
              >
                <Brain className="w-4 h-4 text-blue-400" />
                <span>Try AI Symptom Checker</span>
              </button>

              <button
                onClick={onOpenSOS}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3.5 rounded-xl shadow-sm transition-all flex items-center space-x-2 text-sm"
              >
                <Siren className="w-4 h-4 text-white" />
                <span>Test 1-Click SOS</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-slate-300">
              <div>
                <div className="text-2xl font-bold text-white">18+</div>
                <div className="text-xs text-slate-400">Nabha Villages Connected</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400">&lt; 12 mins</div>
                <div className="text-xs text-slate-400">Ambulance SOS Response</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">100%</div>
                <div className="text-xs text-slate-400">Digital Health Records</div>
              </div>
            </div>
          </div>

          {/* Interactive Feature Card Simulation */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-200">Live AI Tele-Triage Simulator</span>
                </div>
                <span className="text-[10px] bg-blue-900/80 text-blue-300 border border-blue-700/60 px-2 py-0.5 rounded font-mono font-bold">Gemini 3.6 Flash</span>
              </div>

              <div className="bg-slate-950 rounded-xl p-4 text-xs font-mono space-y-2 border border-slate-800 text-slate-300">
                <p className="text-emerald-400">// Patient in Kakra Village submits symptoms</p>
                <p className="text-slate-200">&gt; Symptoms: "High fever 102F, chills, headache 2 days"</p>
                <p className="text-amber-300">&gt; AI Risk Score: Medium Priority (Possible Malaria/Dengue)</p>
                <p className="text-blue-300">&gt; Auto Action: Matched with Dr. Rajinder Pal Singh (Nabha Civil Hospital)</p>
                <p className="text-purple-300">&gt; ASHA Worker Notified: Simranjit Kaur (Sector 4)</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700/80">
                  <span className="text-slate-300 font-semibold">Video Tele-Consultation</span>
                  <span className="text-emerald-400 font-bold flex items-center space-x-1">
                    <Video className="w-3.5 h-3.5" />
                    <span>Active HD Room</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700/80">
                  <span className="text-slate-300 font-semibold">Digital Prescription Generator</span>
                  <span className="text-blue-300 font-bold">PDF & WhatsApp Sync</span>
                </div>
              </div>

              <button
                onClick={onOpenDocs}
                className="w-full bg-slate-900 border border-slate-700 hover:bg-slate-700/80 text-slate-200 font-semibold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <FileCode2 className="w-4 h-4 text-blue-400" />
                <span>Inspect Full SIH System Architecture & Schemas</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Target Roles Quick Launcher */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Multi-Stakeholder Role Portals
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Select a role below to explore dedicated workflows tailored for rural patients, village doctors, civil hospitals, ASHA workers, ambulances, and administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rolesList.map(({ role, title, subtitle, icon, color }) => (
            <div
              key={role}
              onClick={() => onSelectRole(role)}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${color} p-3 text-white shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                  {icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Enter Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem & Solution Breakdown */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              SIH25018 Focus Area
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Solving Core Challenges in Nabha Rural Healthcare
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((p, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="p-2 bg-slate-50 w-fit rounded-lg border border-slate-200">
                  {p.icon}
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                <div className="flex items-center space-x-1.5 text-[11px] text-emerald-700 font-semibold pt-2 border-t border-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AikyaCare Solution Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
