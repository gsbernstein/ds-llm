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
    baseUrl: "https://clinicaltrials.gov/api/v2/studies",
    fields: [
      'NCTId',
      'BriefTitle',
      'OfficialTitle',
      'Acronym',
      'OverallStatus',
      'BriefSummary',
      'Condition',
      'Sex',
      'MinimumAge',
      'MaximumAge',
      'Phase',
      'EnrollmentCount',
      'StudyType',
      'StartDate',
      'CompletionDate',
      'LocationCity',
    ],
    pageSize: 20,
    // maxResults: 10
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
