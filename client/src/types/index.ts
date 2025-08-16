// Patient Data Types
export interface PatientData {
  diagnosis: string | string[];
  severity?: 'mild' | 'moderate' | 'severe';
  duration?: string;
  patientAge?: number;
  patientGender?: 'male' | 'female' | 'other';
  symptoms: string[];
  currentMedications?: string[];
  medicalHistory?: string;
  allergies?: string[];
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    weight?: number;
  };
}

// Clinical Trial Types
export interface ClinicalTrial {
  nctId: string;
  title: string;
  condition: string;
  intervention: string;
  phase: string;
  status: string;
  sponsor: string;
  country: string;
  enrollment: string;
  startDate: string;
  completionDate: string;
  description: string;
  studyType: string;
}

// API Response Types
export interface AnalyzeTranscriptResponse {
  diagnosis: string | string[];
  severity?: 'mild' | 'moderate' | 'severe';
  duration?: string;
  patientAge?: number;
  patientGender?: 'male' | 'female' | 'other';
  symptoms: string[];
  currentMedications?: string[];
  medicalHistory?: string;
  allergies?: string[];
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    weight?: number;
  };
}

export interface SearchTrialsResponse {
  trials: ClinicalTrial[];
  totalCount: number;
  searchCriteria: {
    diagnosis: string | string[];
    symptoms: string[];
    patientAge?: number;
    patientGender?: 'male' | 'female' | 'other';
  };
}

export interface SampleTranscriptResponse {
  transcript: string;
}

// Component Props Types
export interface TranscriptInputProps {
  transcript: string;
  setTranscript: (transcript: string) => void;
  onSubmit: (transcript: string) => Promise<void>;
  onUseSample: () => Promise<void>;
  loading: boolean;
}

export interface PatientDataDisplayProps {
  patientData: PatientData | null;
}

export interface ClinicalTrialsListProps {
  trials: ClinicalTrial[];
}

export interface HeaderProps {
  // Add any header-specific props here
}

// App State Types
export type AppStep = 'input' | 'analysis' | 'results';

export interface AppState {
  transcript: string;
  patientData: PatientData | null;
  trials: ClinicalTrial[];
  loading: boolean;
  error: string | null;
  currentStep: AppStep;
}

// API Error Types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Utility Types
export type SeverityLevel = 'mild' | 'moderate' | 'severe';
export type TrialPhase = 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Phase 4' | 'Not Applicable';
export type TrialStatus = 'Recruiting' | 'Active, not recruiting' | 'Completed' | 'Terminated' | 'Suspended' | 'Withdrawn';
export type Gender = 'male' | 'female' | 'other';

// Form Types
export interface TranscriptFormData {
  transcript: string;
}

export interface TrialSearchFormData {
  diagnosis: string | string[];
  symptoms: string[];
  patientAge?: number;
  patientGender?: Gender;
}

// Filter Types
export type PhaseFilter = 'all' | 'phase 1' | 'phase 2' | 'phase 3' | 'phase 4';
export type StatusFilter = 'all' | 'recruiting' | 'active, not recruiting' | 'completed' | 'terminated';

export interface TrialFilters {
  phase: PhaseFilter;
  status: StatusFilter;
}
