import React, { useState } from 'react';
import { ShieldCheck, BarChart3, Users, Building2, Activity, Map, Sparkles, AlertTriangle } from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'heatmap' | 'policy'>('analytics');
  const [policyQuery, setPolicyQuery] = useState('How can Nabha Block reduce anemia incidence in pregnant women by 30% over 6 months?');
  const [policyResponse, setPolicyResponse] = useState<string | null>(null);
  const [policyLoading, setPolicyLoading] = useState(false);

  const handlePolicyInsight = async (e: React.FormEvent) => {
    e.preventDefault();
    setPolicyLoading(true);
    try {
      const res = await fetch('/api/ai/health-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: policyQuery })
      });
      const data = await res.json();
      setPolicyResponse(data.reply);
    } catch (err) {
      console.error('Policy error:', err);
    } finally {
      setPolicyLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-extrabold">Nabha District Health Administration Command</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">SIH25018 Healthcare Monitoring & Telemedicine Intelligence Dashboard</p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
              18 Villages Operational
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex space-x-2 pt-6 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'analytics' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Health Analytics & ML Predictions
          </button>
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'heatmap' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Village Disease Heatmap
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'policy' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-300'
            }`}
          >
            AI Health Policy Advisor
          </button>
        </div>
      </div>

      {/* 1. Health Analytics & ML */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-slate-500 font-semibold">Total Consultations</span>
              <div className="text-2xl font-bold text-slate-900">1,480</div>
              <div className="text-emerald-600 text-[11px] font-bold">↑ +18% this month</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-slate-500 font-semibold">Avg Ambulance Response</span>
              <div className="text-2xl font-bold text-slate-900">11.4 Mins</div>
              <div className="text-blue-600 text-[11px] font-bold">Nabha Block Standard</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-slate-500 font-semibold">High-Risk Patients Flagged</span>
              <div className="text-2xl font-bold text-slate-900">214</div>
              <div className="text-amber-600 text-[11px] font-bold">Diabetes & Hypertension</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-slate-500 font-semibold">ASHA Survey Records</span>
              <div className="text-2xl font-bold text-slate-900">3,890</div>
              <div className="text-purple-600 text-[11px] font-bold">100% Digital Coverage</div>
            </div>
          </div>

          {/* Disease Prevalence Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Village Health Index & Disease Distribution</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="p-3">Village Name</th>
                    <th className="p-3">Population</th>
                    <th className="p-3">Hypertension %</th>
                    <th className="p-3">Diabetes %</th>
                    <th className="p-3">Anemia Prevalence</th>
                    <th className="p-3">ASHA Worker</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">Kakra</td>
                    <td className="p-3 text-slate-700">1,850</td>
                    <td className="p-3 font-mono text-red-600 font-bold">22.4%</td>
                    <td className="p-3 font-mono text-amber-600 font-bold">14.2%</td>
                    <td className="p-3 text-rose-600 font-bold">High (31%)</td>
                    <td className="p-3 text-slate-700">Simranjit Kaur</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">Rohti Chhanna</td>
                    <td className="p-3 text-slate-700">2,100</td>
                    <td className="p-3 font-mono text-amber-600 font-bold">18.1%</td>
                    <td className="p-3 font-mono text-amber-600 font-bold">11.8%</td>
                    <td className="p-3 text-amber-600 font-bold">Moderate (21%)</td>
                    <td className="p-3 text-slate-700">Gurpreet Kaur</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">Bhadson</td>
                    <td className="p-3 text-slate-700">3,400</td>
                    <td className="p-3 font-mono text-emerald-600 font-bold">12.0%</td>
                    <td className="p-3 font-mono text-emerald-600 font-bold">8.5%</td>
                    <td className="p-3 text-emerald-600 font-bold">Low (11%)</td>
                    <td className="p-3 text-slate-700">Harjeet Kaur</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Disease Heatmap */}
      {activeTab === 'heatmap' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Nabha Block Geographic Disease Heatmap</h3>
          <div className="bg-slate-900 rounded-xl p-6 text-white space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-950/80 border border-red-700 rounded-xl">
                <div className="font-bold text-red-300 text-sm">Kakra Village Zone</div>
                <p className="text-slate-300 mt-1">High Anemia & Hypertension Concentration</p>
                <span className="inline-block mt-2 text-[10px] bg-red-800 text-red-100 font-bold px-2 py-0.5 rounded">
                  Action Required: Mobile Health Camp
                </span>
              </div>

              <div className="p-4 bg-amber-950/80 border border-amber-700 rounded-xl">
                <div className="font-bold text-amber-300 text-sm">Rohti Chhanna Zone</div>
                <p className="text-slate-300 mt-1">Moderate Diabetes & Water Quality Alerts</p>
                <span className="inline-block mt-2 text-[10px] bg-amber-800 text-amber-100 font-bold px-2 py-0.5 rounded">
                  Monitoring Active
                </span>
              </div>

              <div className="p-4 bg-emerald-950/80 border border-emerald-700 rounded-xl">
                <div className="font-bold text-emerald-300 text-sm">Bhadson Zone</div>
                <p className="text-slate-300 mt-1">Normal Health Metrics & High Immunization</p>
                <span className="inline-block mt-2 text-[10px] bg-emerald-800 text-emerald-100 font-bold px-2 py-0.5 rounded">
                  Low Risk Status
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. AI Policy Advisor */}
      {activeTab === 'policy' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI Healthcare Policy & Resource Allocation Advisor</span>
          </h3>

          <form onSubmit={handlePolicyInsight} className="space-y-3">
            <textarea
              rows={3}
              value={policyQuery}
              onChange={(e) => setPolicyQuery(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
            <button
              type="submit"
              disabled={policyLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow"
            >
              {policyLoading ? 'Generating Analysis...' : 'Generate Policy Recommendations'}
            </button>
          </form>

          {policyResponse && (
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-950 leading-relaxed whitespace-pre-wrap">
              {policyResponse}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
