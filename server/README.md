# Clinical Trials Server

This is the backend server for the AI-powered clinical trial matching application.

## Project Structure

```
server/
├── config/
│   └── apiConfig.js          # API configuration settings
├── data/
│   ├── sampleTranscript.js   # Sample patient-doctor conversation
│   └── mockData.js          # Mock data for fallback scenarios
├── prompts/
│   └── transcriptAnalysis.js # OpenAI prompts for transcript analysis
├── index.js                  # Main server file
├── package.json
└── README.md
```

## Features

- **Transcript Analysis**: Uses OpenAI API to extract medical information from patient-doctor conversations
- **Clinical Trials Search**: Searches ClinicalTrials.gov for relevant clinical trials
- **Fallback Support**: Provides mock data when external APIs are unavailable
- **Modular Design**: Separated concerns with dedicated files for data, prompts, and configuration

## API Endpoints

### `GET /api/health`
Health check endpoint.

### `GET /api/sample-transcript`
Returns a sample patient-doctor conversation transcript for testing.

### `POST /api/analyze-transcript`
Analyzes a patient-doctor conversation transcript and extracts medical information.

**Request Body:**
```json
{
  "transcript": "Doctor: How are you feeling today? Patient: I have a headache..."
}
```

**Response:**
```json
{
  "diagnosis": "Migraine",
  "symptoms": ["Headache", "Nausea"],
  "patientAge": "42",
  "patientGender": "Female",
  "medicalHistory": "No significant medical history",
  "currentMedications": ["Tylenol", "Advil"],
  "treatmentPlan": "Prescription medication",
  "severity": "moderate",
  "duration": "3 weeks",
  "familyHistory": "Mother has migraines"
}
```

### `POST /api/search-trials`
Searches for clinical trials based on patient information.

**Request Body:**
```json
{
  "diagnosis": "Migraine",
  "symptoms": ["Headache", "Nausea"],
  "patientAge": "42",
  "patientGender": "Female"
}
```

**Response:**
```json
[
  {
    "nctId": "NCT12345678",
    "title": "Efficacy and Safety of New Migraine Treatment",
    "condition": "Migraine",
    "intervention": "Oral medication",
    "phase": "Phase 2",
    "status": "Recruiting",
    "sponsor": "PharmaCorp Inc.",
    "country": "United States",
    "enrollment": "150",
    "startDate": "2024-01-15",
    "completionDate": "2025-01-15",
    "description": "A randomized, double-blind study...",
    "studyType": "Interventional"
  }
]
```

## Configuration

The application uses environment variables for configuration:

- `OPENAI_API_KEY`: Your OpenAI API key
- `PORT`: Server port (default: 5001)
- `CLIENT_URL`: Client URL for CORS (default: http://localhost:3000)

## Fallback Behavior

When external APIs are unavailable (quota exceeded, network issues, etc.), the application provides mock data:

- **Transcript Analysis**: Returns predefined patient data for migraine cases
- **Clinical Trials Search**: Returns sample clinical trials data

This ensures the application remains functional for demonstration and testing purposes.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## Dependencies

- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable management
- `openai`: OpenAI API client
- `axios`: HTTP client for external APIs
- `nodemon`: Development server with auto-restart
