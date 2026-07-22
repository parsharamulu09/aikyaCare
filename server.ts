import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  mockUsers,
  mockPatients,
  mockDoctors,
  mockHospitals,
  mockHealthWorkers,
  mockAmbulances,
  mockAppointments,
  mockPrescriptions,
  mockHealthMetrics,
  mockEmergencyRequests,
  mockVillageSurveys,
  mockVaccines,
  mockMLRiskScores
} from './src/data/mockDatabase';
import { postgresSqlSchema, prismaSchema } from './src/data/sihDocumentation';

// Initialize Gemini Client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'MOCK_KEY_FOR_DEV',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Dynamic in-memory store backed by mockDatabase
  let appointmentsStore = [...mockAppointments];
  let prescriptionsStore = [...mockPrescriptions];
  let emergencyStore = [...mockEmergencyRequests];
  let healthMetricsStore = [...mockHealthMetrics];
  let villageSurveysStore = [...mockVillageSurveys];
  let hospitalsStore = [...mockHospitals];

  // -------------------------------------------------------------
  // API ROUTES
  // -------------------------------------------------------------

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      project: 'AikyaCare - SIH25018 Telemedicine Platform for Nabha',
      timestamp: new Date().toISOString()
    });
  });

  // --- Auth APIs ---
  app.post('/api/auth/login', (req, res) => {
    const { email, role } = req.body;
    let user = mockUsers.find((u) => u.email === email || u.role === role);
    if (!user) {
      user = mockUsers.find((u) => u.role === role) || mockUsers[0];
    }
    const token = `jwt_mock_token_${user.id}_${Date.now()}`;
    res.json({
      success: true,
      user,
      token
    });
  });

  app.get('/api/users', (req, res) => {
    res.json(mockUsers);
  });

  // --- Patient & Profiles ---
  app.get('/api/patients/me', (req, res) => {
    res.json({
      patient: mockPatients[0],
      user: mockUsers[0],
      metrics: healthMetricsStore
    });
  });

  app.post('/api/patients/metrics', (req, res) => {
    const newMetric = {
      id: `hm_${Date.now()}`,
      patientId: 'pat_1',
      date: new Date().toISOString().split('T')[0],
      systolicBP: Number(req.body.systolicBP) || 120,
      diastolicBP: Number(req.body.diastolicBP) || 80,
      fastingSugar: Number(req.body.fastingSugar) || 100,
      weightKg: Number(req.body.weightKg) || 68,
      bmi: Number(req.body.weightKg) ? Number((Number(req.body.weightKg) / ((162 / 100) ** 2)).toFixed(1)) : 25.9,
      heartRate: Number(req.body.heartRate) || 72,
      waterIntakeLiters: Number(req.body.waterIntakeLiters) || 2.5,
      sleepHours: Number(req.body.sleepHours) || 7.0
    };
    healthMetricsStore.unshift(newMetric);
    res.json({ success: true, metric: newMetric });
  });

  // --- Appointments & Consultations ---
  app.get('/api/appointments', (req, res) => {
    const { role, doctorId, patientId } = req.query;
    let list = [...appointmentsStore];
    if (role === 'doctor' && doctorId) {
      list = list.filter((a) => a.doctorId === doctorId || doctorId === 'doc_1');
    } else if (role === 'patient' && patientId) {
      list = list.filter((a) => a.patientId === patientId || patientId === 'pat_1');
    }
    res.json(list);
  });

  app.post('/api/appointments', (req, res) => {
    const { doctorId, doctorName, doctorSpecialization, date, timeSlot, symptoms, consultationType } = req.body;
    const newAppointment = {
      id: `apt_${Date.now()}`,
      patientId: 'pat_1',
      patientName: mockPatients[0].userId === 'usr_pat_1' ? 'Harpreet Kaur' : 'Patient',
      patientAge: 38,
      patientGender: 'Female',
      doctorId: doctorId || 'doc_1',
      doctorName: doctorName || 'Dr. Rajinder Pal Singh',
      doctorSpecialization: doctorSpecialization || 'General Medicine',
      date: date || new Date().toISOString().split('T')[0],
      timeSlot: timeSlot || '10:30 AM',
      status: 'Requested' as const,
      symptoms: symptoms || 'Routine Checkup',
      consultationType: consultationType || 'Video',
      fee: 0,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    appointmentsStore.unshift(newAppointment);
    res.json({ success: true, appointment: newAppointment });
  });

  app.put('/api/appointments/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const apt = appointmentsStore.find((a) => a.id === id);
    if (apt) {
      apt.status = status;
      res.json({ success: true, appointment: apt });
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  });

  // --- Prescriptions ---
  app.get('/api/prescriptions', (req, res) => {
    res.json(prescriptionsStore);
  });

  app.post('/api/prescriptions', (req, res) => {
    const { appointmentId, patientId, patientName, doctorId, doctorName, diagnosis, medicines, labTests, dietaryAdvice } = req.body;
    const newRx = {
      id: `rx_${Date.now()}`,
      appointmentId: appointmentId || 'apt_101',
      patientId: patientId || 'pat_1',
      patientName: patientName || 'Harpreet Kaur',
      doctorId: doctorId || 'doc_1',
      doctorName: doctorName || 'Dr. Rajinder Pal Singh',
      doctorRegistrationNo: 'PMC-PAT-48921',
      date: new Date().toISOString().split('T')[0],
      diagnosis: diagnosis || 'General Evaluation',
      medicines: medicines || [],
      labTestsRecommended: labTests || [],
      dietaryAdvice: dietaryAdvice || 'Maintain a balanced diet and drink clean boiled water.',
      followUpDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
    };
    prescriptionsStore.unshift(newRx);

    // Update appointment status to Completed
    const apt = appointmentsStore.find((a) => a.id === appointmentId);
    if (apt) {
      apt.status = 'Completed';
    }

    res.json({ success: true, prescription: newRx });
  });

  // --- Emergency SOS ---
  app.get('/api/emergency/active', (req, res) => {
    res.json(emergencyStore);
  });

  app.post('/api/emergency/sos', (req, res) => {
    const { lat, lng, address, village, emergencyType } = req.body;
    const newSos = {
      id: `sos_${Date.now()}`,
      patientId: 'pat_1',
      patientName: 'Harpreet Kaur',
      patientPhone: '+91 98765 43210',
      location: {
        lat: lat || 30.3621,
        lng: lng || 76.1412,
        address: address || 'Kakra Village Main Road, Nabha Block',
        village: village || 'Kakra'
      },
      emergencyType: emergencyType || 'Critical SOS Alert',
      status: 'Dispatched' as const,
      assignedAmbulanceId: 'amb_1',
      assignedHospitalId: 'hosp_1',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      vitalsSummary: 'Immediate medical assistance dispatched. Location transmitted to Nabha Civil Hospital & Ambulance 108.'
    };
    emergencyStore.unshift(newSos);
    res.json({ success: true, sos: newSos });
  });

  app.put('/api/emergency/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const sos = emergencyStore.find((e) => e.id === id);
    if (sos) {
      sos.status = status;
      res.json({ success: true, sos });
    } else {
      res.status(404).json({ error: 'SOS request not found' });
    }
  });

  // --- Health Worker (ASHA/ANM) ---
  app.get('/api/health-worker/surveys', (req, res) => {
    res.json(villageSurveysStore);
  });

  app.post('/api/health-worker/surveys', (req, res) => {
    const survey = {
      id: `surv_${Date.now()}`,
      ashaId: 'asha_1',
      householdNumber: req.body.householdNumber || `ROH-${Math.floor(100 + Math.random() * 900)}`,
      villageName: req.body.villageName || 'Kakra',
      headOfFamily: req.body.headOfFamily || 'Resident',
      familyMembersCount: Number(req.body.familyMembersCount) || 4,
      hasCleanWater: Boolean(req.body.hasCleanWater),
      hasSanitation: Boolean(req.body.hasSanitation),
      pregnantWomenCount: Number(req.body.pregnantWomenCount) || 0,
      childrenUnderFive: Number(req.body.childrenUnderFive) || 0,
      chronicCasesCount: Number(req.body.chronicCasesCount) || 0,
      surveyDate: new Date().toISOString().split('T')[0],
      syncedWithServer: true
    };
    villageSurveysStore.unshift(survey);
    res.json({ success: true, survey });
  });

  app.get('/api/health-worker/vaccines', (req, res) => {
    res.json(mockVaccines);
  });

  // --- Hospitals & Beds ---
  app.get('/api/hospitals', (req, res) => {
    res.json(hospitalsStore);
  });

  app.put('/api/hospitals/:id/beds', (req, res) => {
    const { id } = req.params;
    const { icu, oxygen, general, pediatric } = req.body;
    const hosp = hospitalsStore.find((h) => h.id === id || id === 'hosp_1');
    if (hosp) {
      if (icu !== undefined) hosp.availableBeds.icu = icu;
      if (oxygen !== undefined) hosp.availableBeds.oxygen = oxygen;
      if (general !== undefined) hosp.availableBeds.general = general;
      if (pediatric !== undefined) hosp.availableBeds.pediatric = pediatric;
      res.json({ success: true, hospital: hosp });
    } else {
      res.status(404).json({ error: 'Hospital not found' });
    }
  });

  // --- ML Risk Engine APIs ---
  app.post('/api/ml/risk-assessment', (req, res) => {
    const { age = 38, bmi = 25.9, systolicBP = 138, fastingSugar = 118, familyHistory = true, smoking = false } = req.body;

    // Clinical ML rule engine
    let diabetesRisk = Math.min(95, Math.round((fastingSugar > 100 ? (fastingSugar - 80) * 1.2 : 15) + (bmi > 25 ? (bmi - 22) * 2.5 : 0) + (familyHistory ? 15 : 0)));
    let heartDiseaseRisk = Math.min(90, Math.round((systolicBP > 120 ? (systolicBP - 110) * 0.9 : 10) + (age > 40 ? (age - 35) * 1.1 : 5) + (smoking ? 25 : 0)));
    let bpRisk = Math.min(98, Math.round((systolicBP > 120 ? (systolicBP - 100) * 1.4 : 10)));
    let obesityRisk = Math.min(99, Math.round(bmi > 22 ? (bmi - 18.5) * 5 : 5));

    let overallHealthScore = Math.max(10, Math.round(100 - (diabetesRisk * 0.3 + heartDiseaseRisk * 0.3 + bpRisk * 0.25 + obesityRisk * 0.15)));

    let primaryFactor = 'Mild Blood Pressure Elevation & Borderline Fasting Sugar';
    if (diabetesRisk > 60) primaryFactor = 'High Fasting Glucose / Diabetes Risk';
    else if (bpRisk > 60) primaryFactor = 'Hypertension & Elevated Systolic BP';
    else if (heartDiseaseRisk > 50) primaryFactor = 'Cardiovascular Risk Flags';

    res.json({
      success: true,
      riskAssessment: {
        patientId: 'pat_1',
        diabetesRisk,
        heartDiseaseRisk,
        bpRisk,
        obesityRisk,
        overallHealthScore,
        primaryFactor,
        recommendation: 'Target 150 minutes of weekly moderate aerobic activity (e.g., brisk walking in village grounds), reduce sodium intake to < 2g/day, and schedule a monthly tele-consultation with Nabha Civil Hospital doctors.'
      }
    });
  });

  app.get('/api/ml/village-trends', (req, res) => {
    res.json({
      block: 'Nabha Block, Patiala District',
      totalVillagesTracked: 18,
      diseasePrevalence: [
        { disease: 'Hypertension', prevalencePercent: 28.4, highRiskVillages: ['Kakra', 'Rohti Chhanna', 'Bhadson'] },
        { disease: 'Type-2 Diabetes', prevalencePercent: 19.2, highRiskVillages: ['Nabha Urban', 'Kakra'] },
        { disease: 'Anemia in Pregnant Women', prevalencePercent: 34.1, highRiskVillages: ['Duladdi', 'Rohti Chhanna'] },
        { disease: 'Seasonal Respiratory (Asthma/Bronchitis)', prevalencePercent: 14.8, highRiskVillages: ['Bhadson', 'Alohran'] }
      ],
      aiOutbreakForecast: 'Low to moderate risk of seasonal water-borne gastroenteritis following monsoon run-off. Preemptive chlorination recommended in Sector 4 hand-pumps.'
    });
  });

  // --- Gemini AI Endpoints ---

  app.post('/api/ai/symptom-check', async (req, res) => {
    try {
      const { symptoms, age = 38, gender = 'Female', duration = '3 days', village = 'Kakra' } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        // High quality fallback if key isn't provided
        return res.json({
          symptomsAnalyzed: [symptoms],
          potentialConditions: [
            { name: 'Stage-1 Essential Hypertension', probability: '68%', description: 'Elevated blood pressure causing tension headaches and mild lightheadedness.' },
            { name: 'Tension-Type Headache', probability: '22%', description: 'Stress or dehydration induced muscle contraction around neck and forehead.' }
          ],
          urgencyLevel: 'Consult Doctor Soon',
          recommendedSpecialist: 'General Physician / Internal Medicine (Dr. Rajinder Pal Singh)',
          firstAidSteps: [
            'Rest in a quiet, dark room.',
            'Hydrate with clean drinking water or electoral ORS solution.',
            'Avoid heavy physical labor under direct sunlight.',
            'Schedule a tele-consultation with Nabha Civil Hospital doctor for BP monitoring.'
          ],
          disclaimer: 'AikyaCare AI Assistant provides preliminary guidance for rural triage and does not replace a registered medical practitioner diagnosis.'
        });
      }

      const prompt = `You are AikyaCare AI Triage Assistant for rural healthcare in Nabha block, Punjab, India.
Analyze the following patient report:
- Patient Age: ${age}, Gender: ${gender}
- Village: ${village}
- Symptoms: ${symptoms}
- Duration: ${duration}

Return a valid JSON object with the following fields ONLY:
{
  "symptomsAnalyzed": ["list of detected symptoms"],
  "potentialConditions": [
    { "name": "Condition Name", "probability": "Percentage%", "description": "Brief description in plain language" }
  ],
  "urgencyLevel": "Emergency" OR "Consult Doctor Soon" OR "Home Care / Self Monitoring",
  "recommendedSpecialist": "Specialist Type (e.g. General Physician, Gynecologist)",
  "firstAidSteps": ["Step 1", "Step 2", "Step 3"],
  "disclaimer": "Standard disclaimer"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('Gemini AI Symptom Check Error:', err);
      res.status(500).json({
        error: 'AI Triage processing failed',
        details: err.message
      });
    }
  });

  app.post('/api/ai/summarize-report', async (req, res) => {
    try {
      const { reportText } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          summaryText: 'The lab report shows a Complete Blood Count (CBC). Hemoglobin is 10.2 g/dL which is slightly below normal range (12.0-15.0 g/dL), indicating mild anemia. Fasting Blood Glucose is 118 mg/dL (borderline pre-diabetic). Platelets and Leukocyte counts are within healthy limits.',
          abnormalParameters: [
            { parameter: 'Hemoglobin (Hb)', observedValue: '10.2 g/dL', normalRange: '12.0 - 15.0 g/dL', status: 'Low (Mild Anemia)' },
            { parameter: 'Fasting Blood Sugar', observedValue: '118 mg/dL', normalRange: '< 100 mg/dL', status: 'Slightly High (Pre-Diabetic)' }
          ],
          actionPlan: 'Include iron-rich foods (green leafy vegetables, jaggery, chana). Schedule a follow-up consultation with Dr. Jaswinder Kaur or Dr. Rajinder Pal Singh at Nabha Civil Hospital.'
        });
      }

      const prompt = `Summarize this medical lab report for a patient in rural Nabha, Punjab:
${reportText}

Return JSON with:
{
  "summaryText": "Simple plain-language summary",
  "abnormalParameters": [
    { "parameter": "Name", "observedValue": "Value", "normalRange": "Range", "status": "Low/High" }
  ],
  "actionPlan": "Recommended simple next steps for rural patient"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to summarize report', details: err.message });
    }
  });

  app.post('/api/ai/health-assistant', async (req, res) => {
    try {
      const { query, language = 'English/Punjabi' } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply: `Sat Sri Akal! I am AikyaCare's AI Health Assistant for Nabha. Regarding your query about "${query}":
1. For common symptoms like fever or cough, ensure drinking warm boiled water and rest.
2. If you notice high fever above 102°F or breathlessness, trigger our Emergency 1-Click SOS or visit Nabha Civil Hospital immediately.
3. You can also book a free tele-consultation directly from the 'Telemedicine' tab with Dr. Rajinder Pal Singh or Dr. Jaswinder Kaur.`,
          suggestedActions: ['Book Tele-Consultation', 'Check Symptom Triage', 'View Emergency Contacts']
        });
      }

      const prompt = `You are AikyaCare's friendly rural health assistant serving patients and ASHA workers in Nabha, Punjab.
Respond helpfully, empathetically, and clearly to this patient question: "${query}".
Keep language simple, respectful, and include actionable healthcare advice suited for rural Indian context. Mention local healthcare facilities like Nabha Civil Hospital or ASHA workers when relevant.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert, compassionate rural healthcare AI assistant.'
        }
      });

      res.json({
        reply: response.text,
        suggestedActions: ['Book Tele-Consultation', 'Check Symptom Triage', 'View Nearby Hospitals']
      });
    } catch (err: any) {
      res.status(500).json({ error: 'AI Assistant error', details: err.message });
    }
  });

  app.get('/api/docs/schemas', (req, res) => {
    res.json({
      sqlSchema: postgresSqlSchema,
      prismaSchema: prismaSchema
    });
  });

  // -------------------------------------------------------------
  // VITE / STATIC SERVING MIDDLEWARE
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AikyaCare Telemedicine Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
