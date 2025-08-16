const createTranscriptAnalysisPrompt = (transcript) => {
  return `Analyze the following patient-doctor conversation transcript and extract key medical information in JSON format. 

IMPORTANT: For symptoms and currentMedications, provide each item as a separate element in the array, not as a comma-separated string.

Example format:
{
  "diagnosis": "primary diagnosis or suspected condition",
  "symptoms": ["symptom 1", "symptom 2", "symptom 3"],
  "patientAge": "patient age",
  "patientGender": "patient gender if mentioned",
  "medicalHistory": "relevant medical history",
  "currentMedications": ["medication 1", "medication 2"],
  "treatmentPlan": "treatment plan if mentioned",
  "severity": "condition severity (mild/moderate/severe)",
  "duration": "how long symptoms have been present",
  "familyHistory": "relevant family history"
}

Transcript: ${transcript}

Please provide only the JSON response, no additional text.`;
};

module.exports = {
  createTranscriptAnalysisPrompt
};
