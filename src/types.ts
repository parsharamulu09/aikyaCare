export type UserRole = 'patient' | 'doctor' | 'hospital' | 'health_worker' | 'ambulance' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  village?: string;
  district?: string;
  verified?: boolean;
}

export interface PatientProfile {
  id: string;
  userId: string;
  aadhaarNumber?: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  address: string;
  village: string;
  district: string;
  pincode: string;
  medicalHistory: string[];
  allergies: string[];
  chronicDiseases: string[];
  vaccinations: { name: string; date: string; status: 'Completed' | 'Pending' }[];
  emergencyContacts: { name: string; relation: string; phone: string }[];
  familyMembers: { name: string; relation: string; age: number; bloodGroup: string }[];
}

export interface DoctorProfile {
  id: string;
  userId: string;
  name: string;
  registrationNo: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  hospitalAffiliation: string;
  consultationFee: number;
  rating: number;
  totalConsultations: number;
  availableDays: string[];
  availableTimeSlots: string[];
  verified: boolean;
  languages: string[];
  about: string;
}

export interface HospitalProfile {
  id: string;
  userId: string;
  hospitalName: string;
  licenseNumber: string;
  address: string;
  village: string;
  district: string;
  contactPhone: string;
  totalBeds: number;
  availableBeds: {
    icu: number;
    oxygen: number;
    general: number;
    pediatric: number;
  };
  hasEmergencyUnit: boolean;
  hasAmbulanceService: boolean;
  verified: boolean;
}

export interface HealthWorkerProfile {
  id: string;
  userId: string;
  ashaCode: string;
  assignedVillage: string;
  subCenter: string;
  assignedHouseholds: number;
  activeMaternalCases: number;
  activeChildCases: number;
}

export interface AmbulanceProfile {
  id: string;
  userId: string;
  vehicleNumber: string;
  driverName: string;
  phone: string;
  currentLocation: { lat: number; lng: number; address: string };
  status: 'Available' | 'On Emergency' | 'In Transit' | 'Offline';
  type: 'Basic Life Support' | 'Advanced Life Support';
  hospitalId?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  date: string;
  timeSlot: string;
  status: 'Requested' | 'Accepted' | 'Completed' | 'Cancelled' | 'In Consultation';
  symptoms: string;
  consultationType: 'Video' | 'Audio' | 'Chat';
  fee: number;
  createdAt: string;
}

export interface PrescriptionItem {
  medicineName: string;
  dosage: string;
  frequency: string; // e.g. "1-0-1 (After Meals)"
  durationDays: number;
  instructions: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorRegistrationNo: string;
  date: string;
  diagnosis: string;
  medicines: PrescriptionItem[];
  labTestsRecommended: string[];
  dietaryAdvice: string;
  digitalSignature?: string;
  followUpDate?: string;
}

export interface HealthMetric {
  id: string;
  patientId: string;
  date: string;
  systolicBP: number;
  diastolicBP: number;
  fastingSugar: number;
  weightKg: number;
  bmi: number;
  heartRate: number;
  waterIntakeLiters: number;
  sleepHours: number;
}

export interface EmergencyRequest {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  location: { lat: number; lng: number; address: string; village: string };
  emergencyType: 'Cardiac' | 'Accident' | 'Pregnancy/Maternal' | 'Severe Fever' | 'Respiratory' | 'Other';
  status: 'Pending' | 'Dispatched' | 'On Scene' | 'Transporting' | 'Resolved';
  assignedAmbulanceId?: string;
  assignedHospitalId?: string;
  timestamp: string;
  vitalsSummary?: string;
}

export interface VillageSurveyRecord {
  id: string;
  ashaId: string;
  householdNumber: string;
  villageName: string;
  headOfFamily: string;
  familyMembersCount: number;
  hasCleanWater: boolean;
  hasSanitation: boolean;
  pregnantWomenCount: number;
  childrenUnderFive: number;
  chronicCasesCount: number;
  surveyDate: string;
  syncedWithServer: boolean;
}

export interface VaccineRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientType: 'Mother' | 'Child';
  vaccineName: string;
  dueDate: string;
  givenDate?: string;
  status: 'Completed' | 'Scheduled' | 'Overdue';
  village: string;
}

export interface MLRiskScore {
  patientId: string;
  diabetesRisk: number; // percentage 0-100
  heartDiseaseRisk: number;
  bpRisk: number;
  obesityRisk: number;
  overallHealthScore: number; // 0-100 where higher is better
  primaryFactor: string;
  recommendation: string;
}

export interface AIAnalysisResult {
  symptomsAnalyzed: string[];
  potentialConditions: { name: string; probability: string; description: string }[];
  urgencyLevel: 'Emergency' | 'Consult Doctor Soon' | 'Home Care / Self Monitoring';
  recommendedSpecialist: string;
  firstAidSteps: string[];
  disclaimer: string;
}
