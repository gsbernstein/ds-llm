// Mock patient data for fallback when OpenAI API is unavailable
const mockPatientData = {
  diagnosis: "Migraine",
  symptoms: ["Headache", "Nausea", "Light sensitivity", "Sound sensitivity"],
  patientAge: "42",
  patientGender: "Female",
  medicalHistory: "No significant medical history",
  currentMedications: ["Tylenol", "Advil"],
  treatmentPlan: "Prescription migraine medication and preventive strategies",
  severity: "moderate",
  duration: "3 weeks",
  familyHistory: "Mother and sister have migraines"
};

// Mock clinical trials data for fallback when ClinicalTrials.gov API is unavailable
const mockClinicalTrials = [
  {
    nctId: "NCT12345678",
    title: "Efficacy and Safety of New Migraine Treatment Lorem Ipsum",
    condition: "Migraine",
    intervention: "Oral medication",
    phase: "Phase 2",
    status: "Recruiting",
    sponsor: "PharmaCorp Inc.",
    country: "United States",
    enrollment: "150",
    startDate: "2024-01-15",
    completionDate: "2025-01-15",
    description: "A randomized, double-blind study to evaluate the efficacy and safety of a new migraine treatment in adults.",
    studyType: "Interventional"
  },
  {
    nctId: "NCT87654321",
    title: "Preventive Treatment for Chronic Migraine",
    condition: "Chronic Migraine",
    intervention: "Injectable medication",
    phase: "Phase 3",
    status: "Active, not recruiting",
    sponsor: "NeuroMed Solutions",
    country: "United States",
    enrollment: "300",
    startDate: "2023-06-01",
    completionDate: "2024-12-31",
    description: "Study to evaluate the effectiveness of preventive treatment in reducing migraine frequency and severity.",
    studyType: "Interventional"
  },
  {
    nctId: "NCT11223344",
    title: "Non-Pharmacological Treatment for Migraine",
    condition: "Migraine",
    intervention: "Behavioral therapy",
    phase: "Phase 1",
    status: "Recruiting",
    sponsor: "MindBody Institute",
    country: "United States",
    enrollment: "75",
    startDate: "2024-03-01",
    completionDate: "2025-03-01",
    description: "Evaluation of cognitive behavioral therapy and relaxation techniques for migraine management.",
    studyType: "Interventional"
  },
  {
    nctId: "NCT99887766",
    title: "Advanced Imaging in Migraine Research",
    condition: "Migraine with Aura",
    intervention: "Diagnostic imaging",
    phase: "Phase 1",
    status: "Recruiting",
    sponsor: "NeuroImaging Research Center",
    country: "United States",
    enrollment: "50",
    startDate: "2024-02-01",
    completionDate: "2025-02-01",
    description: "Study using advanced MRI techniques to understand brain changes during migraine attacks.",
    studyType: "Observational"
  },
  {
    nctId: "NCT55443322",
    title: "Dietary Interventions for Migraine Prevention",
    condition: "Migraine",
    intervention: "Dietary modification",
    phase: "Phase 2",
    status: "Recruiting",
    sponsor: "Nutritional Health Institute",
    country: "United States",
    enrollment: "200",
    startDate: "2024-04-01",
    completionDate: "2025-10-01",
    description: "Randomized controlled trial evaluating the effectiveness of specific dietary changes in reducing migraine frequency.",
    studyType: "Interventional"
  }
];

module.exports = {
  mockPatientData,
  mockClinicalTrials
};
