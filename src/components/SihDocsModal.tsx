import React, { useState } from 'react';
import { X, FileCode2, Database, Layers, Server, Code, CheckCircle2, Copy } from 'lucide-react';
import { postgresSqlSchema, prismaSchema, mlEnginePythonCode, deploymentGuide } from '../data/sihDocumentation';

interface SihDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SihDocsModal: React.FC<SihDocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'prisma' | 'ml' | 'deploy'>('sql');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl text-white relative animate-in fade-in max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <FileCode2 className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-extrabold text-sm text-white">SIH25018 Technical Blueprint & Database Schemas</h3>
              <p className="text-[11px] text-slate-400">PostgreSQL, Prisma ORM, Python ML Engine & Deployment Instructions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="bg-slate-950 p-3 border-b border-slate-800 flex space-x-2 text-xs shrink-0 overflow-x-auto">
          {[
            { id: 'sql', label: 'PostgreSQL DDL Schema', icon: <Database className="w-3.5 h-3.5" /> },
            { id: 'prisma', label: 'Prisma ORM Models', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'ml', label: 'Python Flask ML Service', icon: <Code className="w-3.5 h-3.5" /> },
            { id: 'deploy', label: 'Render/Vercel Deployment', icon: <Server className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-slate-900 shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Viewer */}
        <div className="p-4 overflow-y-auto flex-1 text-xs font-mono bg-slate-950 text-slate-300 relative">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => {
                const code =
                  activeTab === 'sql'
                    ? postgresSqlSchema
                    : activeTab === 'prisma'
                    ? prismaSchema
                    : activeTab === 'ml'
                    ? mlEnginePythonCode
                    : deploymentGuide;
                handleCopy(code);
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded border border-slate-700 text-[11px] flex items-center space-x-1 font-sans"
            >
              <Copy className="w-3 h-3 text-amber-400" />
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Snippet'}</span>
            </button>
          </div>

          <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed text-[11px]">
            {activeTab === 'sql' && postgresSqlSchema}
            {activeTab === 'prisma' && prismaSchema}
            {activeTab === 'ml' && mlEnginePythonCode}
            {activeTab === 'deploy' && deploymentGuide}
          </pre>
        </div>
      </div>
    </div>
  );
};
