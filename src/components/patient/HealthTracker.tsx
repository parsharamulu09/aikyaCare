import React, { useState } from 'react';
import { HealthMetric } from '../../types';
import { Activity, Plus, Heart, Droplets, Moon, CheckCircle2 } from 'lucide-react';

interface HealthTrackerProps {
  metrics: HealthMetric[];
  onAddMetric: (newMetric: Partial<HealthMetric>) => void;
}

export const HealthTracker: React.FC<HealthTrackerProps> = ({ metrics, onAddMetric }) => {
  const [systolic, setSystolic] = useState('135');
  const [diastolic, setDiastolic] = useState('85');
  const [sugar, setSugar] = useState('115');
  const [weight, setWeight] = useState('68');
  const [water, setWater] = useState('2.8');
  const [sleep, setSleep] = useState('7.5');
  const [logged, setLogged] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMetric({
      systolicBP: Number(systolic),
      diastolicBP: Number(diastolic),
      fastingSugar: Number(sugar),
      weightKg: Number(weight),
      waterIntakeLiters: Number(water),
      sleepHours: Number(sleep)
    });
    setLogged(true);
    setTimeout(() => setLogged(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Health Metrics & Vital Signs Tracker</h2>
          <p className="text-xs text-slate-500 mt-1">Log daily readings to assist ASHA workers and doctors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Metric Logger Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Log Today's Vitals</span>
          </h3>

          {logged && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center space-x-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Vitals logged successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Systolic BP (mmHg)</label>
                <input
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Diastolic BP (mmHg)</label>
                <input
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Fasting Sugar (mg/dL)</label>
                <input
                  type="number"
                  value={sugar}
                  onChange={(e) => setSugar(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Water Intake (Liters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={water}
                  onChange={(e) => setWater(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Sleep (Hours)</label>
                <input
                  type="number"
                  step="0.5"
                  value={sleep}
                  onChange={(e) => setSleep(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow transition-all"
            >
              Save Vitals Record
            </button>
          </form>
        </div>

        {/* Historic Readings Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <Activity className="w-4 h-4 text-indigo-600" />
            <span>Recorded Vitals History</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="p-2.5">Date</th>
                  <th className="p-2.5">BP (mmHg)</th>
                  <th className="p-2.5">Fasting Sugar</th>
                  <th className="p-2.5">Weight</th>
                  <th className="p-2.5">Water / Sleep</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80">
                    <td className="p-2.5 font-bold text-slate-900">{m.date}</td>
                    <td className="p-2.5 font-mono text-red-600">{m.systolicBP}/{m.diastolicBP}</td>
                    <td className="p-2.5 font-mono text-blue-600">{m.fastingSugar} mg/dL</td>
                    <td className="p-2.5 text-slate-700">{m.weightKg} kg</td>
                    <td className="p-2.5 text-slate-600">{m.waterIntakeLiters}L / {m.sleepHours}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
