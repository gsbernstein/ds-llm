const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Sample transcript for demo purposes
const sampleTranscript = `Doctor: Good morning, Sarah. How are you feeling today?

Patient: Not great, Dr. Johnson. I've been having these terrible headaches for the past three weeks, and they're getting worse. They're usually in the morning and last most of the day.

Doctor: I'm sorry to hear that. Can you tell me more about the headaches? Where exactly do you feel them?

Patient: They're mostly on the right side of my head, behind my eye. Sometimes they're so bad I can't focus at work. I've also been feeling nauseous when they happen.

Doctor: Have you noticed any other symptoms? Any vision changes, sensitivity to light or sound?

Patient: Yes, actually. Bright lights really bother me during the headaches, and loud noises make them worse. I've also been having trouble sleeping because of the pain.

Doctor: How old are you, Sarah?

Patient: I'm 42.

Doctor: And do you have any family history of migraines or other neurological conditions?

Patient: My mother had migraines, and my sister gets them too. They both started around the same age I am now.

Doctor: I see. Have you tried any over-the-counter medications?

Patient: I've tried Tylenol and Advil, but they don't seem to help much. The pain just keeps coming back.

Doctor: Based on what you're describing, this sounds like classic migraine symptoms. The fact that they're unilateral, associated with nausea and light sensitivity, and have a family history all point to migraines. Let me prescribe you a medication specifically for migraines, and I'd also like to discuss some preventive strategies.`;

// Extract patient data using OpenAI
app.post('/api/analyze-transcript', async (req, res) => {
  try {
    const { transcript } = req.body;
    
    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    const prompt = `Analyze the following patient-doctor conversation transcript and extract key medical information in JSON format. Include:

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

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    });

    const extractedData = JSON.parse(completion.choices[0].message.content);
    res.json(extractedData);
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
    
    // Using the Studies endpoint with search parameters
    const response = await axios.get('https://classic.clinicaltrials.gov/api/query/study_fields', {
      params: {
        expr: searchTerms,
        fields: 'NCTId,BriefTitle,OfficialTitle,Condition,InterventionType,InterventionName,Phase,Status,LeadSponsorName,LocationCountry,MinimumAge,MaximumAge,Sex,StudyType,EnrollmentCount,StartDate,CompletionDate,Description',
        min_rnk: 1,
        max_rnk: 20,
        fmt: 'json'
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
      .slice(0, 10); // Limit to top 10 results

    res.json(formattedTrials);
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
