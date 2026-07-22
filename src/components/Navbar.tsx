import React from 'react';
import { UserRole } from '../types';
import {
  HeartPulse,
  User,
  Stethoscope,
  Building2,
  Users,
  Ambulance,
  ShieldCheck,
  Siren,
  FileCode2,
  Bell,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenSOS: () => void;
  onOpenDocs: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  onOpenSOS,
  onOpenDocs,
  activeTab,
  setActiveTab
}) => {
  const roles: { role: UserRole; label: string; icon: React.ReactNode; badge?: string }[] = [
    { role: 'patient', label: 'Patient', icon: <User className="w-4 h-4" /> },
    { role: 'doctor', label: 'Doctor', icon: <Stethoscope className="w-4 h-4" />, badge: 'Verified' },
    { role: 'hospital', label: 'Hospital', icon: <Building2 className="w-4 h-4" /> },
    { role: 'health_worker', label: 'ASHA / ANM', icon: <Users className="w-4 h-4" /> },
    { role: 'ambulance', label: 'Ambulance 108', icon: <Ambulance className="w-4 h-4" /> },
    { role: 'admin', label: 'Admin', icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-sm border-b border-slate-800">
      {/* Top Banner Context for SIH */}
      <div className="bg-slate-950 text-slate-300 text-xs px-4 py-2 flex items-center justify-between border-b border-slate-800/80 font-medium">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
            SIH25018
          </span>
          <span className="hidden sm:inline text-slate-300">AikyaCare: Telemedicine Access for Rural Healthcare in Nabha Block, Punjab</span>
          <span className="sm:hidden text-slate-300">AikyaCare Rural Telemedicine</span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={onOpenDocs}
            className="flex items-center space-x-1.5 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>SIH Docs & Architecture</span>
          </button>
          <span className="text-slate-700">|</span>
          <span className="flex items-center space-x-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Nabha Node Online</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-500 transition-colors">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  AikyaCare
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800/80 px-1.5 py-0.5 rounded">
                  Rural Telemedicine
                </span>
              </div>
            </div>
          </div>

          {/* Role Navigation Pills */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
            {roles.map(({ role, label, icon, badge }) => {
              const isActive = currentRole === role && activeTab !== 'docs' && activeTab !== 'landing';
              return (
                <button
                  key={role}
                  onClick={() => {
                    onSelectRole(role);
                    setActiveTab(role);
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                  {badge && (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1 rounded">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* SOS Trigger */}
            <button
              onClick={onOpenSOS}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-all"
            >
              <Siren className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Emergency SOS</span>
              <span className="sm:hidden">SOS</span>
            </button>

            {/* AI Assistant Quick Pill */}
            <button
              onClick={() => {
                onSelectRole('patient');
                setActiveTab('patient_ai');
              }}
              className="flex items-center space-x-1.5 bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs px-3 py-2 rounded-lg transition-colors hidden md:flex font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>AI Symptom Checker</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                aria-label="Notifications"
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Role Switcher Bar */}
        <div className="lg:hidden py-2 border-t border-slate-800 flex items-center overflow-x-auto space-x-2 no-scrollbar">
          {roles.map(({ role, label, icon }) => {
            const isActive = currentRole === role && activeTab !== 'docs' && activeTab !== 'landing';
            return (
              <button
                key={role}
                onClick={() => {
                  onSelectRole(role);
                  setActiveTab(role);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
