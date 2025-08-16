const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const axios = require('axios');

// Import separated modules
const sampleTranscript = require('./data/sampleTranscript');
const { mockPatientData, mockClinicalTrials } = require('./data/mockData');
const { createTranscriptAnalysisPrompt } = require('./prompts/transcriptAnalysis');
const API_CONFIG = require('./config/apiConfig');

dotenv.config();

const app = express();
const PORT = API_CONFIG.server.port;

// Middleware
app.use(cors(API_CONFIG.server.cors));
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Extract patient data using OpenAI
app.post('/api/analyze-transcript', async (req, res) => {
  try {
    const { transcript } = req.body;
    
    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    // Check if OpenAI API key is available and has quota
    if (!process.env.OPENAI_API_KEY) {
      // Fallback to sample data for demo purposes
      return res.json(mockPatientData);
    }

    const prompt = createTranscriptAnalysisPrompt(transcript);

    try {
      const completion = await openai.chat.completions.create({
        model: API_CONFIG.openai.model,
        messages: [{ role: "user", content: prompt }],
        temperature: API_CONFIG.openai.temperature,
        max_tokens: API_CONFIG.openai.maxTokens,
      });

      const extractedData = JSON.parse(completion.choices[0].message.content);
      res.json(extractedData);
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError.message);
      
      // If OpenAI API fails (quota exceeded, etc.), use fallback data
      res.json(mockPatientData);
    }
  } catch (error) {
    console.error('Error analyzing transcript:', error);
    res.status(500).json({ error: 'Failed to analyze transcript' });
  }
});

// Search clinical trials using ClinicalTrials.gov API
app.post('/api/search-trials', async (req, res) => {
  try {
    const { diagnosis, symptoms, patientAge, patientGender } = req.body;
    
    if (!diagnosis) {
      return res.status(400).json({ error: 'Diagnosis is required' });
    }

    // Build search query for ClinicalTrials.gov API
    const searchTerms = [diagnosis, ...symptoms].join(' ');
    
    try {
      // Using the Studies endpoint with search parameters
      const response = await axios.get(API_CONFIG.clinicalTrials.baseUrl, {
        params: {
          expr: searchTerms,
          fields: API_CONFIG.clinicalTrials.fields,
          min_rnk: API_CONFIG.clinicalTrials.minRank,
          max_rnk: API_CONFIG.clinicalTrials.maxRank,
          fmt: API_CONFIG.clinicalTrials.format
        }
      });

      const trials = response.data.StudyFieldsResponse.StudyFields || [];
      
      // Filter and format trials
      const formattedTrials = trials
        .filter(trial => {
          const studyFields = trial.StudyFields;
          const age = parseInt(patientAge);
          const minAge = parseInt(studyFields.MinimumAge?.[0] || '0');
          const maxAge = parseInt(studyFields.MaximumAge?.[0] || '999');
          const sex = studyFields.Sex?.[0];
          
          // Basic filtering
          return age >= minAge && age <= maxAge && 
                 (!sex || sex === 'All' || sex === patientGender);
        })
        .map(trial => {
          const studyFields = trial.StudyFields;
          return {
            nctId: studyFields.NCTId?.[0],
            title: studyFields.BriefTitle?.[0] || studyFields.OfficialTitle?.[0],
            condition: studyFields.Condition?.[0],
            intervention: studyFields.InterventionName?.[0],
            phase: studyFields.Phase?.[0],
            status: studyFields.Status?.[0],
            sponsor: studyFields.LeadSponsorName?.[0],
            country: studyFields.LocationCountry?.[0],
            enrollment: studyFields.EnrollmentCount?.[0],
            startDate: studyFields.StartDate?.[0],
            completionDate: studyFields.CompletionDate?.[0],
            description: studyFields.Description?.[0],
            studyType: studyFields.StudyType?.[0]
          };
        })
        .slice(0, API_CONFIG.clinicalTrials.maxResults); // Limit to configured max results

      res.json(formattedTrials);
    } catch (apiError) {
      console.error('ClinicalTrials.gov API error:', apiError.message);
      
      // Fallback to sample trial data
      res.json(mockClinicalTrials);
    }
  } catch (error) {
    console.error('Error searching trials:', error);
    res.status(500).json({ error: 'Failed to search clinical trials' });
  }
});

// Get sample transcript
app.get('/api/sample-transcript', (req, res) => {
  res.json({ transcript: sampleTranscript });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Clinical Trials API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
