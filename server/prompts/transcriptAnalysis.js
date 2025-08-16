const createTranscriptAnalysisPrompt = (transcript) => {
  return `Analyze the following patient-doctor conversation transcript and extract key medical information in JSON format. Include:

{
  "diagnosis": "primary diagnosis or suspected condition",
  "symptoms": ["list of main symptoms"],
  "patientAge": "patient age",
  "patientGender": "patient gender if mentioned",
  "medicalHistory": "relevant medical history",
  "currentMedications": ["current medications"],
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
