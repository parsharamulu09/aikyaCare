import React, { useState } from 'react';
import { Sparkles, Activity, FileText, Pill, Utensils, MessageSquare, Send, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { AIAnalysisResult } from '../../types';

export const AIHealthAssistant: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'symptom' | 'report' | 'diet' | 'chat'>('symptom');

  // Symptom Checker State
  const [symptomsInput, setSymptomsInput] = useState('High fever, dizziness, headache since yesterday');
  const [symptomLoading, setSymptomLoading] = useState(false);
  const [symptomResult, setSymptomResult] = useState<AIAnalysisResult | null>(null);

  // Report Summarizer State
  const [reportText, setReportText] = useState('CBC Report: Hemoglobin 10.2 g/dL, Fasting Sugar 118 mg/dL, Platelets 220,000 /mcL, WBC 7,200 /mcL.');
  const [reportLoading, setReportLoading] = useState(false);
  const [reportResult, setReportResult] = useState<any>(null);

  // AI Chat State
  const [chatQuery, setChatQuery] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Sat Sri Akal! I am AikyaCare\'s AI Health Assistant for Nabha. How can I assist you with your symptoms, prescriptions, or rural wellness today?' }
  ]);

  const handleSymptomCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setSymptomLoading(true);
    try {
      const res = await fetch('/api/ai/symptom-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: symptomsInput,
          age: 38,
          gender: 'Female',
          village: 'Kakra'
        })
      });
      const data = await res.json();
      setSymptomResult(data);
    } catch (err) {
      console.error('Symptom check error:', err);
    } finally {
      setSymptomLoading(false);
    }
  };

  const handleReportSummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    setReportLoading(true);
    try {
      const res = await fetch('/api/ai/summarize-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportText })
      });
      const data = await res.json();
      setReportResult(data);
    } catch (err) {
      console.error('Report summarize error:', err);
    } finally {
      setReportLoading(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;

    const userText = chatQuery;
    setChatHistory((prev) => [...prev, { role: 'user', text: userText }]);
    setChatQuery('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/health-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userText })
      });
      const data = await res.json();
      setChatHistory((prev) => [...prev, { role: 'ai', text: data.reply }]);
    } catch (err) {
      setChatHistory((prev) => [...prev, { role: 'ai', text: 'Apologies, I encountered an issue reaching the server. Please try again.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800/80">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400 p-2 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">Gemini AI Health Assistant</h2>
            <p className="text-xs text-indigo-200">Server-Side Clinical AI Triage & Report Analysis for Nabha Block</p>
          </div>
        </div>

        {/* Sub-tab Pills */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-indigo-800/80 text-xs">
          {[
            { id: 'symptom', label: 'AI Symptom Triage', icon: <Activity className="w-4 h-4" /> },
            { id: 'report', label: 'Report Summarizer', icon: <FileText className="w-4 h-4" /> },
            { id: 'diet', label: 'Diet & Exercise Plan', icon: <Utensils className="w-4 h-4" /> },
            { id: 'chat', label: 'AI Health Chatbot', icon: <MessageSquare className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-amber-400 text-slate-900 shadow'
                  : 'bg-indigo-950/80 text-indigo-200 hover:bg-indigo-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. AI Symptom Triage */}
      {activeSubTab === 'symptom' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Enter Patient Symptoms</h3>
            <form onSubmit={handleSymptomCheck} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Symptoms Description</label>
                <textarea
                  rows={4}
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-xs"
                  placeholder="Describe symptoms, duration, and pain location..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={symptomLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow transition-all flex items-center justify-center space-x-2"
              >
                {symptomLoading ? (
                  <span>Analyzing with Gemini 3.6 Flash...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Run AI Triage Assessment</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">AI Clinical Analysis Output</h3>
            {!symptomResult ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                Click 'Run AI Triage Assessment' to analyze symptoms using Gemini 3.6 Flash server-side.
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className={`p-3.5 rounded-xl border flex items-center justify-between font-bold ${
                  symptomResult.urgencyLevel === 'Emergency'
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-5 h-5" />
                    <span>Triage Urgency: {symptomResult.urgencyLevel}</span>
                  </div>
                  <span className="text-[11px] font-normal">{symptomResult.recommendedSpecialist}</span>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-800 block">Potential Conditions:</span>
                  {symptomResult.potentialConditions?.map((c, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{c.name}</span>
                        <span className="text-indigo-600">{c.probability}</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{c.description}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl space-y-1.5">
                  <span className="font-bold text-indigo-950 block">Immediate First Aid & Recommendations:</span>
                  <ul className="list-disc list-inside text-indigo-900 space-y-1">
                    {symptomResult.firstAidSteps?.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Medical Report Summarizer */}
      {activeSubTab === 'report' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Paste Lab Report Text</h3>
            <form onSubmit={handleReportSummarize} className="space-y-4 text-xs">
              <textarea
                rows={5}
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="submit"
                disabled={reportLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow transition-all"
              >
                {reportLoading ? 'Processing...' : 'Summarize Report with Gemini'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Report Explanation</h3>
            {!reportResult ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                Submit a lab report to view a plain-language summary.
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {reportResult.summaryText}
                </p>

                <div className="space-y-2">
                  <span className="font-bold text-slate-800 block">Parameter Badges:</span>
                  {reportResult.abnormalParameters?.map((p: any, idx: number) => (
                    <div key={idx} className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-amber-950">{p.parameter}: {p.observedValue}</div>
                        <div className="text-[11px] text-amber-800">Normal Range: {p.normalRange}</div>
                      </div>
                      <span className="bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Diet & Exercise Planner */}
      {activeSubTab === 'diet' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Personalized Rural Punjab Diet & Wellness Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <span className="font-bold text-emerald-950 text-sm block">Recommended Diet (Nabha Region)</span>
              <ul className="space-y-1.5 text-emerald-900">
                <li>• Morning: Methi water + 4 soaked almonds</li>
                <li>• Breakfast: Bajra/Missi Roti with curd (reduced salt)</li>
                <li>• Lunch: Sarson da saag / Chana with jaggery (gur)</li>
                <li>• Dinner: Light Moong Dal khichdi by 7:30 PM</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
              <span className="font-bold text-blue-950 text-sm block">Exercise Routine</span>
              <ul className="space-y-1.5 text-blue-900">
                <li>• 30 mins brisk walking in village grounds every morning</li>
                <li>• Light stretching & deep breathing (Pranayama)</li>
                <li>• Avoid heavy lifting during elevated BP spikes</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 4. AI Chatbot */}
      {activeSubTab === 'chat' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
            {chatHistory.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl max-w-[80%] ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white ml-auto'
                    : 'bg-indigo-50 border border-indigo-100 text-indigo-950 mr-auto'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleChatSubmit} className="pt-2 border-t border-slate-100 flex space-x-2 text-xs">
            <input
              type="text"
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              placeholder="Ask anything about symptoms, medicines, pregnancy care..."
              className="flex-1 p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={chatLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-xl font-bold transition-all"
            >
              {chatLoading ? 'Thinking...' : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
