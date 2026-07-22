import {
  User,
  PatientProfile,
  DoctorProfile,
  HospitalProfile,
  HealthWorkerProfile,
  AmbulanceProfile,
  Appointment,
  Prescription,
  HealthMetric,
  EmergencyRequest,
  VillageSurveyRecord,
  VaccineRecord,
  MLRiskScore
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'usr_pat_1',
    name: 'Harpreet Kaur',
    email: 'harpreet@nabha.care',
    phone: '+91 98765 43210',
    role: 'patient',
    village: 'Kakra',
    district: 'Patiala (Nabha)',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'usr_doc_1',
    name: 'Dr. Rajinder Pal Singh',
    email: 'dr.rajinder@nabhacivil.org',
    phone: '+91 98123 45678',
    role: 'doctor',
    village: 'Nabha Town',
    district: 'Patiala',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'usr_doc_2',
    name: 'Dr. Jaswinder Kaur',
    email: 'dr.jaswinder@nabhacivil.org',
    phone: '+91 98123 99887',
    role: 'doctor',
    village: 'Nabha Town',
    district: 'Patiala',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1594824813566-78a932788e02?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'usr_hosp_1',
    name: 'Nabha Civil Hospital',
    email: 'contact@nabhacivilhospital.gov.in',
    phone: '+91 1765 220100',
    role: 'hospital',
    village: 'Circular Road, Nabha',
    district: 'Patiala',
    verified: true
  },
  {
    id: 'usr_asha_1',
    name: 'Simranjit Kaur (ASHA Worker)',
    email: 'simran.asha@nabha.gov.in',
    phone: '+91 94170 12345',
    role: 'health_worker',
    village: 'Rohti Chhanna',
    district: 'Patiala (Nabha Block)',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'usr_amb_1',
    name: 'Gurmeet Singh (Ambulance 108)',
    email: 'amb108.nabha@punjab.gov.in',
    phone: '+91 98144 00108',
    role: 'ambulance',
    village: 'Nabha Bus Stand Depot',
    district: 'Patiala',
    verified: true
  },
  {
    id: 'usr_admin_1',
    name: 'Nabha Health Admin',
    email: 'admin@aikyacare.gov.in',
    phone: '+91 1765 220999',
    role: 'admin',
    village: 'Block Health Office, Nabha',
    district: 'Patiala',
    verified: true
  }
];

export const mockPatients: PatientProfile[] = [
  {
    id: 'pat_1',
    userId: 'usr_pat_1',
    aadhaarNumber: 'XXXX-XXXX-4821',
    age: 38,
    gender: 'Female',
    bloodGroup: 'B+',
    heightCm: 162,
    weightKg: 68,
    bmi: 25.9,
    address: 'House No. 42, Near Gurudwara Sahib, Kakra Village',
    village: 'Kakra',
    district: 'Nabha, Patiala',
    pincode: '147201',
    medicalHistory: ['Gestational Diabetes (2020)', 'Seasonal Asthma'],
    allergies: ['Penicillin', 'Dust Mites'],
    chronicDiseases: ['Hypertension', 'Pre-Diabetes'],
    vaccinations: [
      { name: 'COVID-19 Booster (Precaution Dosis)', date: '2023-04-12', status: 'Completed' },
      { name: 'Tetanus Toxoid (TT)', date: '2024-01-10', status: 'Completed' },
      { name: 'Influenza Annual', date: '2026-10-15', status: 'Pending' }
    ],
    emergencyContacts: [
      { name: 'Gurdev Singh (Husband)', relation: 'Spouse', phone: '+91 98765 99001' },
      { name: 'Baljit Kaur (Sister)', relation: 'Sister', phone: '+91 98765 88112' }
    ],
    familyMembers: [
      { name: 'Gurdev Singh', relation: 'Husband', age: 42, bloodGroup: 'O+' },
      { name: 'Manpreet Singh', relation: 'Son', age: 12, bloodGroup: 'B+' },
      { name: 'Kiranjit Kaur', relation: 'Daughter', age: 8, bloodGroup: 'B+' }
    ]
  }
];

export const mockDoctors: DoctorProfile[] = [
  {
    id: 'doc_1',
    userId: 'usr_doc_1',
    name: 'Dr. Rajinder Pal Singh',
    registrationNo: 'PMC-PAT-48921',
    specialization: 'General Medicine & Rural Health',
    qualification: 'MBBS, MD (Internal Medicine) - GMC Patiala',
    experienceYears: 14,
    hospitalAffiliation: 'Nabha Civil Hospital',
    consultationFee: 0, // Free rural tele-consultation
    rating: 4.9,
    totalConsultations: 1240,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableTimeSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'],
    verified: true,
    languages: ['Punjabi', 'Hindi', 'English'],
    about: 'Dedicated rural physician serving Nabha block villages for 14 years. Specialist in managing diabetes, hypertension, and rural infectious diseases.'
  },
  {
    id: 'doc_2',
    userId: 'usr_doc_2',
    name: 'Dr. Jaswinder Kaur',
    registrationNo: 'PMC-PAT-51002',
    specialization: 'Gynecology & Obstetrics',
    qualification: 'MBBS, MS (Obs & Gynae)',
    experienceYears: 11,
    hospitalAffiliation: 'Nabha Civil Hospital & Sub-Divisional Hospital',
    consultationFee: 0,
    rating: 4.85,
    totalConsultations: 980,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTimeSlots: ['10:00 AM', '11:30 AM', '03:00 PM'],
    verified: true,
    languages: ['Punjabi', 'Hindi'],
    about: 'Maternal health expert providing specialized tele-consultations for high-risk rural pregnancies and prenatal care.'
  },
  {
    id: 'doc_3',
    userId: 'usr_doc_3',
    name: 'Dr. Amarjit Singh',
    registrationNo: 'PMC-PAT-39011',
    specialization: 'Cardiology',
    qualification: 'MBBS, DM (Cardiology) - PGIMER Chandigarh',
    experienceYears: 18,
    hospitalAffiliation: 'Rajindra Hospital Patiala (Tele-Visiting Expert)',
    consultationFee: 0,
    rating: 4.95,
    totalConsultations: 2150,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    availableTimeSlots: ['11:00 AM', '03:30 PM'],
    verified: true,
    languages: ['Punjabi', 'Hindi', 'English'],
    about: 'Senior cardiologist providing remote ECG screening and cardiovascular risk assessments for Nabha block patients.'
  }
];

export const mockHospitals: HospitalProfile[] = [
  {
    id: 'hosp_1',
    userId: 'usr_hosp_1',
    hospitalName: 'Nabha Civil Hospital',
    licenseNumber: 'PUN-HOSP-2012-049',
    address: 'Circular Road, Near Old Bus Stand, Nabha',
    village: 'Nabha Town',
    district: 'Patiala',
    contactPhone: '+91 1765 220100',
    totalBeds: 120,
    availableBeds: {
      icu: 4,
      oxygen: 18,
      general: 35,
      pediatric: 12
    },
    hasEmergencyUnit: true,
    hasAmbulanceService: true,
    verified: true
  }
];

export const mockHealthWorkers: HealthWorkerProfile[] = [
  {
    id: 'asha_1',
    userId: 'usr_asha_1',
    ashaCode: 'PB-NAB-ASHA-089',
    assignedVillage: 'Rohti Chhanna & Kakra',
    subCenter: 'Rohti Sub-Health Center',
    assignedHouseholds: 184,
    activeMaternalCases: 14,
    activeChildCases: 28
  }
];

export const mockAmbulances: AmbulanceProfile[] = [
  {
    id: 'amb_1',
    userId: 'usr_amb_1',
    vehicleNumber: 'PB-11-CB-1081',
    driverName: 'Gurmeet Singh',
    phone: '+91 98144 00108',
    currentLocation: {
      lat: 30.3752,
      lng: 76.1528,
      address: 'Nabha Civil Hospital Emergency Gate'
    },
    status: 'Available',
    type: 'Advanced Life Support',
    hospitalId: 'hosp_1'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt_101',
    patientId: 'pat_1',
    patientName: 'Harpreet Kaur',
    patientAge: 38,
    patientGender: 'Female',
    doctorId: 'doc_1',
    doctorName: 'Dr. Rajinder Pal Singh',
    doctorSpecialization: 'General Medicine & Rural Health',
    date: '2026-07-22',
    timeSlot: '10:30 AM',
    status: 'Accepted',
    symptoms: 'Mild dizziness, persistent headache for 3 days, elevated BP reading (145/92)',
    consultationType: 'Video',
    fee: 0,
    createdAt: '2026-07-21 18:30'
  },
  {
    id: 'apt_102',
    patientId: 'pat_1',
    patientName: 'Harpreet Kaur',
    patientAge: 38,
    patientGender: 'Female',
    doctorId: 'doc_2',
    doctorName: 'Dr. Jaswinder Kaur',
    doctorSpecialization: 'Gynecology & Obstetrics',
    date: '2026-07-15',
    timeSlot: '11:30 AM',
    status: 'Completed',
    symptoms: 'Routine antenatal guidance & hemoglobin status check',
    consultationType: 'Video',
    fee: 0,
    createdAt: '2026-07-14 11:00'
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'rx_501',
    appointmentId: 'apt_102',
    patientId: 'pat_1',
    patientName: 'Harpreet Kaur',
    doctorId: 'doc_2',
    doctorName: 'Dr. Jaswinder Kaur',
    doctorRegistrationNo: 'PMC-PAT-51002',
    date: '2026-07-15',
    diagnosis: 'Mild Iron-Deficiency Anemia (Hb 10.2 g/dL)',
    medicines: [
      {
        medicineName: 'Ferrous Ascorbate + Folic Acid (Autrin)',
        dosage: '100mg / 1.5mg',
        frequency: '1-0-0 (After Breakfast)',
        durationDays: 30,
        instructions: 'Take with lemon water for better absorption. Do not take with milk/tea.'
      },
      {
        medicineName: 'Calcium Carbonate + Vitamin D3',
        dosage: '500mg',
        frequency: '0-0-1 (After Dinner)',
        durationDays: 30,
        instructions: 'Maintain 2 hour gap from iron tablet.'
      }
    ],
    labTestsRecommended: ['Serum Ferritin', 'Repeat Complete Blood Count (CBC) in 30 days'],
    dietaryAdvice: 'Increase consumption of green leafy vegetables (spinach, sarson), jaggery (gur), and roasted chana.',
    followUpDate: '2026-08-15'
  }
];

export const mockHealthMetrics: HealthMetric[] = [
  {
    id: 'hm_1',
    patientId: 'pat_1',
    date: '2026-07-21',
    systolicBP: 138,
    diastolicBP: 88,
    fastingSugar: 118,
    weightKg: 68,
    bmi: 25.9,
    heartRate: 76,
    waterIntakeLiters: 2.8,
    sleepHours: 7.5
  },
  {
    id: 'hm_2',
    patientId: 'pat_1',
    date: '2026-07-20',
    systolicBP: 142,
    diastolicBP: 90,
    fastingSugar: 122,
    weightKg: 68.2,
    bmi: 26.0,
    heartRate: 79,
    waterIntakeLiters: 2.2,
    sleepHours: 6.5
  },
  {
    id: 'hm_3',
    patientId: 'pat_1',
    date: '2026-07-19',
    systolicBP: 135,
    diastolicBP: 85,
    fastingSugar: 115,
    weightKg: 68.5,
    bmi: 26.1,
    heartRate: 74,
    waterIntakeLiters: 3.0,
    sleepHours: 8.0
  }
];

export const mockEmergencyRequests: EmergencyRequest[] = [
  {
    id: 'sos_901',
    patientId: 'pat_1',
    patientName: 'Harpreet Kaur',
    patientPhone: '+91 98765 43210',
    location: {
      lat: 30.3621,
      lng: 76.1412,
      address: 'House No 42, Kakra Village, Nabha Block',
      village: 'Kakra'
    },
    emergencyType: 'Severe Fever',
    status: 'Dispatched',
    assignedAmbulanceId: 'amb_1',
    assignedHospitalId: 'hosp_1',
    timestamp: '2026-07-21 22:45',
    vitalsSummary: 'High grade fever 103.2°F, shivering, BP 130/85'
  }
];

export const mockVillageSurveys: VillageSurveyRecord[] = [
  {
    id: 'surv_1',
    ashaId: 'asha_1',
    householdNumber: 'ROH-104',
    villageName: 'Rohti Chhanna',
    headOfFamily: 'Sukhdev Singh',
    familyMembersCount: 5,
    hasCleanWater: true,
    hasSanitation: true,
    pregnantWomenCount: 1,
    childrenUnderFive: 2,
    chronicCasesCount: 1,
    surveyDate: '2026-07-18',
    syncedWithServer: true
  },
  {
    id: 'surv_2',
    ashaId: 'asha_1',
    householdNumber: 'ROH-105',
    villageName: 'Rohti Chhanna',
    headOfFamily: 'Balwinder Kaur',
    familyMembersCount: 4,
    hasCleanWater: false,
    hasSanitation: true,
    pregnantWomenCount: 0,
    childrenUnderFive: 1,
    chronicCasesCount: 2,
    surveyDate: '2026-07-20',
    syncedWithServer: true
  }
];

export const mockVaccines: VaccineRecord[] = [
  {
    id: 'vac_1',
    patientId: 'pat_1',
    patientName: 'Harpreet Kaur',
    patientType: 'Mother',
    vaccineName: 'Tetanus Toxoid Booster (TT-2)',
    dueDate: '2026-07-10',
    givenDate: '2026-07-12',
    status: 'Completed',
    village: 'Kakra'
  },
  {
    id: 'vac_2',
    patientId: 'child_101',
    patientName: 'Manpreet Singh (12m)',
    patientType: 'Child',
    vaccineName: 'Measles-Rubella (MR First Dose)',
    dueDate: '2026-08-01',
    status: 'Scheduled',
    village: 'Rohti Chhanna'
  }
];

export const mockMLRiskScores: Record<string, MLRiskScore> = {
  pat_1: {
    patientId: 'pat_1',
    diabetesRisk: 42,
    heartDiseaseRisk: 28,
    bpRisk: 65,
    obesityRisk: 34,
    overallHealthScore: 74,
    primaryFactor: 'Elevated Systolic Blood Pressure & Pre-diabetic fasting glucose',
    recommendation: 'Reduce dietary salt intake (less than 5g/day), engage in 30 mins daily walking, monitor BP twice weekly.'
  }
};
