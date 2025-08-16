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

    // Build search query for ClinicalTrials.gov API - keep it simple to avoid "too complicated query" error
    const searchTerms = diagnosis.split(' ')[0]; // Use only the first word of diagnosis (e.g., "Migraine" instead of "Migraine headaches")
    
    try {
      // Using the ClinicalTrials.gov API v2
      const response = await axios.get(API_CONFIG.clinicalTrials.baseUrl, {
        params: {
          'query.term': searchTerms,
          fields: API_CONFIG.clinicalTrials.fields.join(','),
          pageSize: API_CONFIG.clinicalTrials.pageSize
        }
      });

      const trials = response.data.studies || [];
      
      // Filter and format trials
      const formattedTrials = trials
        .filter(trial => {
          // Basic filtering - we'll implement more sophisticated filtering later
          return true; // For now, return all trials
        })
        .map(trial => {
          const identification = trial.protocolSection?.identificationModule;
          const description = trial.protocolSection?.descriptionModule;
          const status = trial.protocolSection?.statusModule;
          const sponsor = trial.protocolSection?.sponsorCollaboratorsModule;
          const conditions = trial.protocolSection?.conditionsModule;
          const interventions = trial.protocolSection?.interventionsModule;
          const eligibility = trial.protocolSection?.eligibilityModule;
          
          return {
            nctId: identification?.nctId,
            title: identification?.briefTitle || identification?.officialTitle || 'Title not available',
            condition: conditions?.conditions?.[0] || 'Not specified',
            intervention: interventions?.interventions?.[0]?.interventionName || 'Not specified',
            phase: status?.phase || 'Not specified',
            status: status?.overallStatus || 'Not specified',
            sponsor: sponsor?.leadSponsor?.leadSponsorName || 'Not specified',
            country: eligibility?.locations?.[0]?.country || 'Not specified',
            enrollment: eligibility?.enrollmentInfo?.enrollmentCount || 'Not specified',
            startDate: status?.startDateStruct?.date || 'Not specified',
            completionDate: status?.completionDateStruct?.date || 'Not specified',
            description: description?.briefSummary || 'Study details available on ClinicalTrials.gov',
            studyType: status?.studyType || 'Not specified'
          };
        })
        .slice(0, API_CONFIG.clinicalTrials.maxResults); // Limit to configured max results

      res.json(formattedTrials);
    } catch (apiError) {
      console.error('ClinicalTrials.gov API error:', apiError.message);
      console.error('Full error:', apiError);
      console.error('Error response:', apiError.response?.data);
      
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
