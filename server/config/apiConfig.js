// API Configuration
const API_CONFIG = {
  // OpenAI Configuration
  openai: {
    model: "gpt-3.5-turbo",
    temperature: 0.1,
    maxTokens: 1000
  },
  
  // ClinicalTrials.gov API Configuration
  clinicalTrials: {
    baseUrl: "https://classic.clinicaltrials.gov/api/query/study_fields",
    fields: [
      'NCTId',
      'BriefTitle',
      'OfficialTitle',
      'Condition',
      'InterventionType',
      'InterventionName',
      'Phase',
      'Status',
      'LeadSponsorName',
      'LocationCountry',
      'MinimumAge',
      'MaximumAge',
      'Sex',
      'StudyType',
      'EnrollmentCount',
      'StartDate',
      'CompletionDate',
      'Description'
    ].join(','),
    minRank: 1,
    maxRank: 20,
    format: 'json',
    maxResults: 10
  },
  
  // Server Configuration
  server: {
    port: process.env.PORT || 5001,
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      credentials: true
    }
  }
};

module.exports = API_CONFIG;
