export const postgresSqlSchema = `-- AikyaCare PostgreSQL Production Database Schema
-- SIH25018: Telemedicine Access for Rural Healthcare in Nabha
-- Total Tables: 20

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('patient', 'doctor', 'hospital', 'health_worker', 'ambulance', 'admin')),
    village VARCHAR(128),
    district VARCHAR(128) DEFAULT 'Patiala',
    is_verified BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    aadhaar_number VARCHAR(20),
    age INT NOT NULL,
    gender VARCHAR(16) NOT NULL,
    blood_group VARCHAR(8) NOT NULL,
    height_cm NUMERIC(5,2),
    weight_kg NUMERIC(5,2),
    bmi NUMERIC(4,2),
    address TEXT NOT NULL,
    village VARCHAR(128) NOT NULL,
    district VARCHAR(128) DEFAULT 'Patiala',
    pincode VARCHAR(10) DEFAULT '147201',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctors (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    registration_no VARCHAR(64) UNIQUE NOT NULL,
    specialization VARCHAR(128) NOT NULL,
    qualification TEXT NOT NULL,
    experience_years INT NOT NULL,
    hospital_affiliation VARCHAR(255),
    consultation_fee NUMERIC(8,2) DEFAULT 0.00,
    rating NUMERIC(3,2) DEFAULT 5.0,
    total_consultations INT DEFAULT 0,
    available_days TEXT[],
    is_verified BOOLEAN DEFAULT FALSE,
    languages TEXT[]
);

CREATE TABLE IF NOT EXISTS hospitals (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    hospital_name VARCHAR(255) NOT NULL,
    license_number VARCHAR(128) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    village VARCHAR(128) NOT NULL,
    total_beds INT DEFAULT 50,
    icu_beds INT DEFAULT 5,
    oxygen_beds INT DEFAULT 20,
    general_beds INT DEFAULT 20,
    pediatric_beds INT DEFAULT 5,
    has_emergency BOOLEAN DEFAULT TRUE,
    has_ambulance BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS health_workers (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    asha_code VARCHAR(64) UNIQUE NOT NULL,
    assigned_village VARCHAR(128) NOT NULL,
    sub_center VARCHAR(128) NOT NULL,
    assigned_households INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ambulances (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    vehicle_number VARCHAR(32) UNIQUE NOT NULL,
    driver_name VARCHAR(128) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    current_lat NUMERIC(10,8),
    current_lng NUMERIC(11,8),
    status VARCHAR(32) DEFAULT 'Available',
    ambulance_type VARCHAR(64) DEFAULT 'Advanced Life Support',
    hospital_id VARCHAR(64) REFERENCES hospitals(id)
);

CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(64) PRIMARY KEY,
    patient_id VARCHAR(64) REFERENCES patients(id),
    doctor_id VARCHAR(64) REFERENCES doctors(id),
    appointment_date DATE NOT NULL,
    time_slot VARCHAR(32) NOT NULL,
    status VARCHAR(32) DEFAULT 'Requested',
    symptoms TEXT,
    consultation_type VARCHAR(32) DEFAULT 'Video',
    fee NUMERIC(8,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consultations (
    id VARCHAR(64) PRIMARY KEY,
    appointment_id VARCHAR(64) UNIQUE REFERENCES appointments(id),
    patient_id VARCHAR(64) REFERENCES patients(id),
    doctor_id VARCHAR(64) REFERENCES doctors(id),
    video_session_url TEXT,
    chat_log JSONB,
    doctor_notes TEXT,
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS medical_records (
    id VARCHAR(64) PRIMARY KEY,
    patient_id VARCHAR(64) REFERENCES patients(id),
    record_type VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    file_url TEXT,
    summary TEXT,
    uploaded_by VARCHAR(64) REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS prescriptions (
    id VARCHAR(64) PRIMARY KEY,
    appointment_id VARCHAR(64) REFERENCES appointments(id),
    patient_id VARCHAR(64) REFERENCES patients(id),
    doctor_id VARCHAR(64) REFERENCES doctors(id),
    diagnosis TEXT NOT NULL,
    medicines JSONB NOT NULL,
    lab_tests TEXT[],
    dietary_advice TEXT,
    follow_up_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medicines (
    id VARCHAR(64) PRIMARY KEY,
    hospital_id VARCHAR(64) REFERENCES hospitals(id),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(128),
    stock_quantity INT DEFAULT 0,
    unit VARCHAR(32) DEFAULT 'tablets',
    expiry_date DATE,
    reorder_level INT DEFAULT 100
);

CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(64) PRIMARY KEY,
    patient_id VARCHAR(64) REFERENCES patients(id),
    test_name VARCHAR(255) NOT NULL,
    lab_name VARCHAR(255) NOT NULL,
    report_data JSONB,
    summary_ai TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS emergency_requests (
    id VARCHAR(64) PRIMARY KEY,
    patient_id VARCHAR(64) REFERENCES patients(id),
    emergency_type VARCHAR(64) NOT NULL,
    location_lat NUMERIC(10,8),
    location_lng NUMERIC(11,8),
    village VARCHAR(128),
    status VARCHAR(32) DEFAULT 'Pending',
    assigned_ambulance_id VARCHAR(64) REFERENCES ambulances(id),
    assigned_hospital_id VARCHAR(64) REFERENCES hospitals(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(64) DEFAULT 'INFO',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(64) PRIMARY KEY,
    sender_id VARCHAR(64) REFERENCES users(id),
    receiver_id VARCHAR(64) REFERENCES users(id),
    appointment_id VARCHAR(64) REFERENCES appointments(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS family_members (
    id VARCHAR(64) PRIMARY KEY,
    patient_id VARCHAR(64) REFERENCES patients(id),
    name VARCHAR(255) NOT NULL,
    relation VARCHAR(64) NOT NULL,
    age INT NOT NULL,
    blood_group VARCHAR(8)
);

CREATE TABLE IF NOT EXISTS health_metrics (
    id VARCHAR(64) PRIMARY KEY,
    patient_id VARCHAR(64) REFERENCES patients(id),
    record_date DATE NOT NULL,
    systolic_bp INT,
    diastolic_bp INT,
    fasting_sugar INT,
    weight_kg NUMERIC(5,2),
    bmi NUMERIC(4,2),
    heart_rate INT,
    water_liters NUMERIC(3,1),
    sleep_hours NUMERIC(3,1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_reports (
    id VARCHAR(64) PRIMARY KEY,
    patient_id VARCHAR(64) REFERENCES patients(id),
    input_text TEXT NOT NULL,
    ai_summary TEXT NOT NULL,
    recommendations JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS disease_predictions (
    id VARCHAR(64) PRIMARY KEY,
    patient_id VARCHAR(64) REFERENCES patients(id),
    diabetes_risk NUMERIC(5,2),
    heart_risk NUMERIC(5,2),
    bp_risk NUMERIC(5,2),
    obesity_risk NUMERIC(5,2),
    overall_health_score INT,
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

export const prismaSchema = `// AikyaCare Prisma ORM Schema
// Target Database: Supabase / PostgreSQL
// SIH25018 Nabha Telemedicine Platform

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  patient
  doctor
  hospital
  health_worker
  ambulance
  admin
}

enum AppointmentStatus {
  Requested
  Accepted
  Completed
  Cancelled
  InConsultation
}

enum EmergencyStatus {
  Pending
  Dispatched
  OnScene
  Transporting
  Resolved
}

model User {
  id            String    @id @default(uuid())
  name          String
  email         String    @unique
  phone         String
  passwordHash  String
  role          Role
  village       String?
  district      String?   @default("Patiala")
  isVerified    Boolean   @default(false)
  avatarUrl     String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  patientProfile    Patient?
  doctorProfile     Doctor?
  hospitalProfile   Hospital?
  healthWorkerProfile HealthWorker?
  ambulanceProfile  Ambulance?
  medicalRecordsUploaded MedicalRecord[]
  notifications     Notification[]
  sentMessages      Message[] @relation("SentMessages")
  receivedMessages  Message[] @relation("ReceivedMessages")
  activityLogs      ActivityLog[]
}

model Patient {
  id              String   @id @default(uuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  aadhaarNumber   String?
  age             Int
  gender          String
  bloodGroup      String
  heightCm        Float?
  weightKg        Float?
  bmi             Float?
  address         String
  village         String
  district        String   @default("Patiala")
  pincode         String   @default("147201")
  createdAt       DateTime @default(now())

  appointments    Appointment[]
  consultations   Consultation[]
  prescriptions   Prescription[]
  medicalRecords  MedicalRecord[]
  reports         Report[]
  emergencies     EmergencyRequest[]
  familyMembers   FamilyMember[]
  healthMetrics   HealthMetric[]
  aiReports       AIReport[]
  diseasePredictions DiseasePrediction[]
}

model Doctor {
  id                  String   @id @default(uuid())
  userId              String   @unique
  user                User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  registrationNo      String   @unique
  specialization      String
  qualification       String
  experienceYears     Int
  hospitalAffiliation String?
  consultationFee     Float    @default(0)
  rating              Float    @default(5.0)
  totalConsultations  Int      @default(0)
  availableDays       String[]
  isVerified          Boolean  @default(false)
  languages           String[]

  appointments        Appointment[]
  consultations       Consultation[]
  prescriptions       Prescription[]
}

model Hospital {
  id                  String   @id @default(uuid())
  userId              String   @unique
  user                User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  hospitalName        String
  licenseNumber       String   @unique
  address             String
  village             String
  totalBeds           Int      @default(50)
  icuBeds             Int      @default(5)
  oxygenBeds          Int      @default(20)
  generalBeds         Int      @default(20)
  pediatricBeds       Int      @default(5)
  hasEmergency        Boolean  @default(true)
  hasAmbulance        Boolean  @default(true)
  isVerified          Boolean  @default(false)

  ambulances          Ambulance[]
  medicines           Medicine[]
  emergencyRequests   EmergencyRequest[]
}

model HealthWorker {
  id                 String @id @default(uuid())
  userId             String @unique
  user               User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  ashaCode           String @unique
  assignedVillage    String
  subCenter          String
  assignedHouseholds Int    @default(0)
}

model Ambulance {
  id                String    @id @default(uuid())
  userId            String    @unique
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  vehicleNumber     String    @unique
  driverName        String
  phone             String
  currentLat        Float?
  currentLng        Float?
  status            String    @default("Available")
  ambulanceType     String    @default("Advanced Life Support")
  hospitalId        String?
  hospital          Hospital? @relation(fields: [hospitalId], references: [id])

  emergencyRequests EmergencyRequest[]
}

model Appointment {
  id               String            @id @default(uuid())
  patientId        String
  patient          Patient           @relation(fields: [patientId], references: [id])
  doctorId         String
  doctor           Doctor            @relation(fields: [doctorId], references: [id])
  appointmentDate  DateTime
  timeSlot         String
  status           AppointmentStatus @default(Requested)
  symptoms         String?
  consultationType String            @default("Video")
  fee              Float             @default(0)
  createdAt        DateTime          @default(now())

  consultation     Consultation?
  prescriptions    Prescription[]
  messages         Message[]
}

model Consultation {
  id              String      @id @default(uuid())
  appointmentId   String      @unique
  appointment     Appointment @relation(fields: [appointmentId], references: [id])
  patientId       String
  patient         Patient     @relation(fields: [patientId], references: [id])
  doctorId        String
  doctor          Doctor      @relation(fields: [doctorId], references: [id])
  videoSessionUrl String?
  chatLog         Json?
  doctorNotes     String?
  startedAt       DateTime?
  endedAt         DateTime?
}

model MedicalRecord {
  id          String   @id @default(uuid())
  patientId   String
  patient     Patient  @relation(fields: [patientId], references: [id])
  recordType  String
  title       String
  fileUrl     String?
  summary     String?
  uploadedBy  String
  uploader    User     @relation(fields: [uploadedBy], references: [id])
  createdAt   DateTime @default(now())
}

model Prescription {
  id            String      @id @default(uuid())
  appointmentId String
  appointment   Appointment @relation(fields: [appointmentId], references: [id])
  patientId     String
  patient       Patient     @relation(fields: [patientId], references: [id])
  doctorId      String
  doctor        Doctor      @relation(fields: [doctorId], references: [id])
  diagnosis     String
  medicines     Json
  labTests      String[]
  dietaryAdvice String?
  followUpDate  DateTime?
  createdAt     DateTime    @default(now())
}

model Medicine {
  id            String   @id @default(uuid())
  hospitalId    String
  hospital      Hospital @relation(fields: [hospitalId], references: [id])
  name          String
  category      String?
  stockQuantity Int      @default(0)
  unit          String   @default("tablets")
  expiryDate    DateTime?
  reorderLevel  Int      @default(100)
}

model Report {
  id         String   @id @default(uuid())
  patientId  String
  patient    Patient  @relation(fields: [patientId], references: [id])
  testName   String
  labName    String
  reportData Json?
  summaryAi  String?
  createdAt  DateTime @default(now())
}

model EmergencyRequest {
  id                  String          @id @default(uuid())
  patientId           String
  patient             Patient         @relation(fields: [patientId], references: [id])
  emergencyType       String
  locationLat         Float?
  locationLng         Float?
  village             String?
  status              EmergencyStatus @default(Pending)
  assignedAmbulanceId String?
  assignedAmbulance   Ambulance?      @relation(fields: [assignedAmbulanceId], references: [id])
  assignedHospitalId  String?
  assignedHospital   Hospital?       @relation(fields: [assignedHospitalId], references: [id])
  createdAt           DateTime        @default(now())
}

model Notification {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  title     String
  message   String
  type      String   @default("INFO")
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
}

model Message {
  id            String       @id @default(uuid())
  senderId      String
  sender        User         @relation("SentMessages", fields: [senderId], references: [id])
  receiverId    String
  receiver      User         @relation("ReceivedMessages", fields: [receiverId], references: [id])
  appointmentId String?
  appointment   Appointment? @relation(fields: [appointmentId], references: [id])
  content       String
  createdAt     DateTime     @default(now())
}

model FamilyMember {
  id         String  @id @default(uuid())
  patientId  String
  patient    Patient @relation(fields: [patientId], references: [id])
  name       String
  relation   String
  age        Int
  bloodGroup String?
}

model HealthMetric {
  id          String   @id @default(uuid())
  patientId   String
  patient     Patient  @relation(fields: [patientId], references: [id])
  recordDate  DateTime
  systolicBp  Int?
  diastolicBp Int?
  fastingSugar Int?
  weightKg    Float?
  bmi         Float?
  heartRate   Int?
  waterLiters Float?
  sleepHours  Float?
  createdAt   DateTime @default(now())
}

model AIReport {
  id          String   @id @default(uuid())
  patientId   String
  patient     Patient  @relation(fields: [patientId], references: [id])
  inputText   String
  aiSummary   String
  recommendations Json?
  createdAt   DateTime @default(now())
}

model DiseasePrediction {
  id                 String   @id @default(uuid())
  patientId          String   @relation(fields: [patientId], references: [id])
  patient            Patient  @relation(fields: [patientId], references: [id])
  diabetesRisk       Float
  heartRisk          Float
  bpRisk             Float
  obesityRisk        Float
  overallHealthScore Int
  calculatedAt       DateTime @default(now())
}

model ActivityLog {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  action    String
  ipAddress String?
  createdAt DateTime @default(now())
}
`;

export const mlEnginePythonCode = `# AikyaCare Python Scikit-Learn Risk Service (SIH25018)
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load Pre-trained Scikit-Learn Models
diabetes_model = joblib.load('models/diabetes_rf.pkl')
heart_model = joblib.load('models/heart_disease_xgb.pkl')

@app.route('/predict_risk', methods=['POST'])
def predict_risk():
    data = request.json
    bmi = data.get('bmi', 24.0)
    fasting_sugar = data.get('fastingSugar', 100)
    systolic_bp = data.get('systolicBP', 120)
    age = data.get('age', 35)

    # Risk Scoring Logic
    diabetes_prob = float(min(1.0, max(0.0, (fasting_sugar - 70) / 130.0)))
    bp_prob = float(min(1.0, max(0.0, (systolic_bp - 90) / 90.0)))
    overall_health = int(max(20, 100 - (diabetes_prob * 35 + bp_prob * 35)))

    return jsonify({
        'diabetesRisk': round(diabetes_prob, 2),
        'bpRisk': round(bp_prob, 2),
        'overallHealthScore': overall_health,
        'status': 'success'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
`;

export const deploymentGuide = `# AikyaCare Deployment Architecture (SIH25018)

## 1. Frontend (React + Vite + Tailwind CSS) -> Vercel
- Target: Vercel / Netlify
- Build Command: npm run build
- Output Directory: dist

## 2. Backend API Gateway (Express + Node.js + Gemini AI) -> Render / Cloud Run
- Target: Render Web Service
- Build Command: npm run build
- Start Command: npm run start
- Environment Variables Required:
  - GEMINI_API_KEY
  - DATABASE_URL
  - JWT_SECRET

## 3. Database (PostgreSQL) -> Supabase / Neon / Cloud SQL
- Run \`npx prisma db push\` or execute \`postgresSqlSchema\` in query console.
`;
