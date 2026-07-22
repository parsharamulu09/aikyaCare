import React, { useState, useEffect } from 'react';
import { UserRole, Appointment, Prescription, HealthMetric, EmergencyRequest, VillageSurveyRecord } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { SihDocsModal } from './components/SihDocsModal';

// Portals
import { PatientDashboard } from './components/patient/PatientDashboard';
import { TelemedicineBooking } from './components/patient/TelemedicineBooking';
import { VirtualConsultationRoom } from './components/patient/VirtualConsultationRoom';
import { AIHealthAssistant } from './components/patient/AIHealthAssistant';
import { MedicalRecordsVault } from './components/patient/MedicalRecordsVault';
import { HealthTracker } from './components/patient/HealthTracker';

import { DoctorPortal } from './components/doctor/DoctorPortal';
import { HospitalPortal } from './components/hospital/HospitalPortal';
import { HealthWorkerPortal } from './components/healthworker/HealthWorkerPortal';
import { AmbulancePortal } from './components/ambulance/AmbulancePortal';
import { AdminPortal } from './components/admin/AdminPortal';

import { mockPatients, mockDoctors, mockHospitals, mockHealthWorkers, mockAmbulances, mockAppointments, mockPrescriptions, mockHealthMetrics, mockEmergencyRequests, mockVillageSurveys, mockVaccines } from './data/mockDatabase';

export function App() {
  const [role, setRole] = useState<UserRole | 'landing'>('landing');
  const [patientTab, setPatientTab] = useState<string>('dashboard');

  // Modals
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Core Dynamic Data State
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [metrics, setMetrics] = useState<HealthMetric[]>(mockHealthMetrics);
  const [emergencies, setEmergencies] = useState<EmergencyRequest[]>(mockEmergencyRequests);
  const [surveys, setSurveys] = useState<VillageSurveyRecord[]>(mockVillageSurveys);

  // Fetch initial state from backend
  useEffect(() => {
    const fetchBackendState = async () => {
      try {
        const [aptRes, rxRes, emRes] = await Promise.all([
          fetch('/api/appointments'),
          fetch('/api/prescriptions/usr_pat_1'),
          fetch('/api/emergency/requests')
        ]);

        if (aptRes.ok) {
          const apts = await aptRes.json();
          if (apts.length > 0) setAppointments(apts);
        }
        if (rxRes.ok) {
          const rxs = await rxRes.json();
          if (rxs.length > 0) setPrescriptions(rxs);
        }
        if (emRes.ok) {
          const ems = await emRes.json();
          if (ems.length > 0) setEmergencies(ems);
        }
      } catch (err) {
        console.log('Using pre-seeded local database records.');
      }
    };

    fetchBackendState();
  }, []);

  // Handlers for state updates
  const handleAppointmentStatusUpdate = async (aptId: string, status: any) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status } : a))
    );
    try {
      await fetch(`/api/appointments/${aptId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePrescription = async (rxData: any) => {
    const newRx: Prescription = {
      id: `rx_${Date.now()}`,
      appointmentId: rxData.appointmentId,
      patientId: rxData.patientId,
      patientName: rxData.patientName,
      doctorId: rxData.doctorId,
      doctorName: rxData.doctorName,
      doctorRegistrationNo: 'PMC-PAT-48921',
      date: new Date().toISOString().split('T')[0],
      diagnosis: rxData.diagnosis,
      medicines: rxData.medicines,
      labTestsRecommended: rxData.labTests,
      dietaryAdvice: rxData.dietaryAdvice,
      digitalSignature: 'SIG_DOCTOR_RAJINDER_PMC48921'
    };

    setPrescriptions((prev) => [newRx, ...prev]);

    try {
      await fetch('/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRx)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMetric = (newMetric: Partial<HealthMetric>) => {
    const created: HealthMetric = {
      id: `m_${Date.now()}`,
      patientId: 'usr_pat_1',
      date: new Date().toISOString().split('T')[0],
      systolicBP: newMetric.systolicBP || 120,
      diastolicBP: newMetric.diastolicBP || 80,
      fastingSugar: newMetric.fastingSugar || 100,
      weightKg: newMetric.weightKg || 65,
      bmi: Number(( (newMetric.weightKg || 65) / 2.65 ).toFixed(1)),
      heartRate: 72,
      waterIntakeLiters: newMetric.waterIntakeLiters || 2.5,
      sleepHours: newMetric.sleepHours || 7
    };
    setMetrics((prev) => [created, ...prev]);
  };

  const handleAddSurvey = (newSurvey: any) => {
    const record: VillageSurveyRecord = {
      id: `surv_${Date.now()}`,
      healthWorkerId: 'usr_hw_1',
      date: new Date().toISOString().split('T')[0],
      ...newSurvey
    };
    setSurveys((prev) => [record, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Navbar
        currentRole={role === 'landing' ? 'patient' : role}
        onSelectRole={(r) => {
          setRole(r);
          if (r === 'patient') setPatientTab('dashboard');
        }}
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {role === 'landing' && (
          <LandingPage
            onSelectRole={(r) => {
              setRole(r);
              if (r === 'patient') setPatientTab('dashboard');
            }}
            onOpenSOS={() => setIsSOSOpen(true)}
            onOpenDocs={() => setIsDocsOpen(true)}
            onOpenAiAssistant={() => {
              setRole('patient');
              setPatientTab('patient_ai');
            }}
          />
        )}

        {/* PATIENT PORTAL */}
        {role === 'patient' && (
          <div className="space-y-6">
            {/* Patient Portal Secondary Sub-Navbar */}
            <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm flex flex-wrap gap-2 text-xs font-bold">
              {[
                { id: 'dashboard', label: 'Dashboard Overview' },
                { id: 'telemedicine_booking', label: 'Book Doctor' },
                { id: 'consultation_room', label: 'Virtual Room' },
                { id: 'patient_ai', label: 'AI Health Assistant' },
                { id: 'medical_records', label: 'Medical Vault' },
                { id: 'vitals_tracker', label: 'Vitals Tracker' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPatientTab(tab.id)}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    patientTab === tab.id
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {patientTab === 'dashboard' && (
              <PatientDashboard
                patient={mockPatients[0]}
                metrics={metrics}
                appointments={appointments}
                prescriptions={prescriptions}
                onNavigate={(tab) => setPatientTab(tab)}
              />
            )}

            {patientTab === 'telemedicine_booking' && (
              <TelemedicineBooking
                onBookingSuccess={() => setPatientTab('dashboard')}
              />
            )}

            {patientTab === 'consultation_room' && <VirtualConsultationRoom />}

            {patientTab === 'patient_ai' && <AIHealthAssistant />}

            {patientTab === 'medical_records' && (
              <MedicalRecordsVault
                patient={mockPatients[0]}
                prescriptions={prescriptions}
              />
            )}

            {patientTab === 'vitals_tracker' && (
              <HealthTracker
                metrics={metrics}
                onAddMetric={handleAddMetric}
              />
            )}
          </div>
        )}

        {/* DOCTOR PORTAL */}
        {role === 'doctor' && (
          <DoctorPortal
            doctor={mockDoctors[0]}
            appointments={appointments}
            onUpdateStatus={handleAppointmentStatusUpdate}
            onCreatePrescription={handleCreatePrescription}
          />
        )}

        {/* HOSPITAL PORTAL */}
        {role === 'hospital' && (
          <HospitalPortal
            hospital={mockHospitals[0]}
            emergencyRequests={emergencies}
          />
        )}

        {/* HEALTH WORKER (ASHA) PORTAL */}
        {role === 'health_worker' && (
          <HealthWorkerPortal
            asha={mockHealthWorkers[0]}
            surveys={surveys}
            vaccines={mockVaccines}
            onAddSurvey={handleAddSurvey}
          />
        )}

        {/* AMBULANCE PORTAL */}
        {role === 'ambulance' && (
          <AmbulancePortal
            ambulance={mockAmbulances[0]}
            activeRequests={emergencies}
          />
        )}

        {/* ADMIN COMMAND PORTAL */}
        {role === 'admin' && <AdminPortal />}
      </main>

      {/* Footer */}
      <Footer onOpenDocs={() => setIsDocsOpen(true)} />

      {/* Modals */}
      <EmergencySOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
      <SihDocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </div>
  );
}

export default App;
