import React from 'react';
import { HeartPulse, ShieldCheck, PhoneCall, MapPin, ExternalLink, FileCode2 } from 'lucide-react';

interface FooterProps {
  onOpenDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 text-white mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 p-1.5 flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">AikyaCare</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">
            AI-Powered Telemedicine Platform for Rural Healthcare. Solving SIH25018 for Nabha Block, Patiala District, Punjab.
          </p>
          <div className="flex items-center space-x-2 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>SIH 2025/2026 Grand Finale Architecture</span>
          </div>
        </div>

        <div>
          <h4 className="text-slate-200 font-semibold mb-3 text-sm">Target Nabha Villages</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>• Kakra Village (Sector 4)</li>
            <li>• Rohti Chhanna</li>
            <li>• Bhadson Sub-Block</li>
            <li>• Duladdi & Alohran</li>
            <li>• Nabha Civil Hospital Sub-Division</li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-200 font-semibold mb-3 text-sm">Emergency Hotlines</h4>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 text-red-400 font-bold text-sm">
              <PhoneCall className="w-4 h-4" />
              <span>National Ambulance: 108</span>
            </li>
            <li className="flex items-center space-x-2 text-amber-300">
              <PhoneCall className="w-4 h-4" />
              <span>Punjab Health Line: 104</span>
            </li>
            <li className="flex items-center space-x-2 text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Civil Hospital Nabha: +91 1765 220100</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-200 font-semibold mb-3 text-sm">Developer Resources</h4>
          <div className="space-y-2">
            <button
              onClick={onOpenDocs}
              className="w-full text-left bg-slate-900 border border-slate-800 hover:border-slate-700 p-2.5 rounded-lg text-amber-200 hover:text-white transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <FileCode2 className="w-4 h-4 text-amber-400" />
                <span>System Architecture & Schemas</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <p className="text-[11px] text-slate-500">
              Includes PostgreSQL SQL Schema, Prisma ORM Models, REST APIs, and System UML Diagrams.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
        <p>© 2026 AikyaCare. Designed for Smart India Hackathon (SIH25018).</p>
        <p>Built with React, TypeScript, Express, Tailwind CSS & Gemini 3.6 Flash AI</p>
      </div>
    </footer>
  );
};
