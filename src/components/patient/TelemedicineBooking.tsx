import React, { useState } from 'react';
import { DoctorProfile } from '../../types';
import { mockDoctors } from '../../data/mockDatabase';
import { Search, Calendar, Clock, Video, CheckCircle2, Stethoscope, Star } from 'lucide-react';

interface TelemedicineBookingProps {
  onBookingSuccess: () => void;
}

export const TelemedicineBooking: React.FC<TelemedicineBookingProps> = ({ onBookingSuccess }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(mockDoctors[0]);
  const [date, setDate] = useState('2026-07-22');
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [symptoms, setSymptoms] = useState('');
  const [consultationType, setConsultationType] = useState<'Video' | 'Audio' | 'Chat'>('Video');
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    setLoading(true);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          doctorName: selectedDoctor.name,
          doctorSpecialization: selectedDoctor.specialization,
          date,
          timeSlot,
          symptoms: symptoms || 'Rural Tele-Consultation Request',
          consultationType
        })
      });
      const data = await res.json();
      if (data.success) {
        setBooked(true);
        setTimeout(() => {
          onBookingSuccess();
        }, 1500);
      }
    } catch (err) {
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Book Telemedicine Consultation</h2>
          <p className="text-xs text-slate-500 mt-1">Connect with verified Nabha Civil Hospital & Patiala specialists</p>
        </div>
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>100% Free Rural Healthcare Service</span>
        </div>
      </div>

      {booked ? (
        <div className="bg-emerald-950 text-white rounded-2xl p-8 text-center space-y-4 border border-emerald-800 animate-in fade-in">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold">Appointment Booked Successfully!</h3>
          <p className="text-xs text-emerald-200 max-w-md mx-auto">
            Your appointment with <span className="font-bold">{selectedDoctor?.name}</span> for {date} at {timeSlot} has been confirmed.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Doctor Selection List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Doctor Specialist</h3>
            {mockDoctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  selectedDoctor?.id === doc.id
                    ? 'bg-blue-50/80 border-blue-500 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img src={doc.userId === 'usr_doc_1' ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=250&q=80' : 'https://images.unsplash.com/photo-1594824813566-78a932788e02?auto=format&fit=crop&w=250&q=80'} alt={doc.name} className="w-12 h-12 rounded-full object-cover border border-slate-300" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm flex items-center space-x-1">
                      <span>{doc.name}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-slate-500">{doc.rating}</span>
                    </div>
                    <div className="text-xs font-semibold text-blue-600">{doc.specialization}</div>
                    <div className="text-[11px] text-slate-500">{doc.qualification} • {doc.experienceYears} yrs exp</div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-600 bg-slate-100 p-2 rounded-lg">
                  🏥 {doc.hospitalAffiliation}
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Schedule Appointment Details</h3>
              <p className="text-xs text-slate-500">Selected: {selectedDoctor?.name} ({selectedDoctor?.specialization})</p>
            </div>

            <form onSubmit={handleBook} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Select Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Select Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {selectedDoctor?.availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Consultation Mode</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Video', 'Audio', 'Chat'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setConsultationType(mode)}
                      className={`p-2.5 rounded-lg border font-bold transition-all text-center ${
                        consultationType === mode
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {mode} Call
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Describe Symptoms or Medical Reason</label>
                <textarea
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. Dizziness, headache for 3 days, elevated BP reading 145/92 in Kakra village"
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Confirming Appointment...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Free Tele-Consultation Slot</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
