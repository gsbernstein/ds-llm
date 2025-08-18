# Clinical Trials Matcher

An AI-powered web application that connects patients with relevant clinical trials by analyzing patient-doctor conversation transcripts and matching them with trials from ClinicalTrials.gov.

## 🚀 Live Demo

**Deployed Application:** [https://clinical-trial-search-07sv.onrender.com/](https://clinical-trial-search-07sv.onrender.com/)

*Note: The demo may take a few moments to load as it's hosted on a free tier service.*

## 🎯 Project Overview

This application demonstrates the intersection of AI, healthcare, and web development by:

1. **Transcript Analysis**: Uses OpenAI's GPT model to extract structured medical information from patient-doctor conversations
2. **Clinical Trial Matching**: Queries the ClinicalTrials.gov API to find relevant trials based on extracted patient data
3. **Modern Web Interface**: Provides an intuitive, responsive UI for healthcare providers to explore trial options

## 🏗️ Technical Architecture

### Frontend
- **React 18** with modern hooks and functional components
- **Tailwind CSS** for responsive, utility-first styling
- **Component-based architecture** for maintainability and reusability

### Backend
- **Node.js** with Express.js framework
- **OpenAI API** integration for transcript analysis
- **ClinicalTrials.gov API** for trial data retrieval
- **RESTful API design** with proper error handling

### Data Flow
1. User submits transcript → Backend processes with OpenAI
2. Extracted patient data → ClinicalTrials.gov API search
3. Filtered results → Frontend display with interactive features

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gsbernstein/ds-llm.git
   cd clinical-trials-matcher
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Configure environment variables**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend (port 5001) and frontend (port 3000) simultaneously.

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the React frontend
- `npm run build` - Build the React app for production
- `npm run install-all` - Install dependencies for all packages

### Project Structure

```
ds-llm/
├── client/                # React frontend
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── services/      # API methods
│   │   ├── types/         # Type definitions
│   │   ├── App.tsx        # Main application
│   │   └── index.tsx      # Entry point
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
├── server/                # Node.js backend
|   ├── config/            # API constants
|   ├── data/              # sample and mock data
|   ├── prompts/           # AI prompt configuration
│   ├── index.js           # Express server and API endpoints
│   ├── package.json       # Backend dependencies
│   └── env.example        # Environment variables template
├── package.json           # Root package.json with scripts
└── README.md              # This file
```


## 🔑 API Endpoints

### Backend API

- `POST /api/analyze-transcript` - Analyze transcript with OpenAI
- `POST /api/search-trials` - Search ClinicalTrials.gov for matching trials
- `GET /api/sample-transcript` - Get sample transcript for testing
- `GET /api/health` - Health check endpoint

### ClinicalTrials.gov API

The application integrates with the [ClinicalTrials.gov Data API](https://clinicaltrials.gov/data-api/api) to retrieve trial information.

## 🧪 Testing

### Sample Transcript

The application includes a built-in sample transcript featuring a patient with migraine symptoms. Click "Use Sample Transcript" to test the system immediately.


## 📝 Assumptions & Limitations

### Technical Assumptions
- OpenAI API is available and properly configured
- ClinicalTrials.gov API is accessible and responsive
- Modern browser support (ES6+, CSS Grid, Flexbox)

### Medical Assumptions
- Transcripts contain sufficient medical detail for analysis
- Patient information is accurate and complete
- Healthcare providers will verify extracted data
- Clinical trial information is current and reliable

### Limitations
- **AI Analysis**: Results depend on OpenAI's model accuracy
- **API Dependencies**: Requires external API services to be operational
- **Data Freshness**: Clinical trial data depends on ClinicalTrials.gov updates
- **Medical Accuracy**: Not a substitute for professional medical advice

## 🔒 Security & Privacy

- **No data storage**: Transcripts are processed in memory only
- **API key security**: OpenAI API key stored in environment variables and never exposed to the frontend
- **HTTPS only**: Production deployments use secure connections
- **No PII logging**: Patient information is not logged or stored

## 📊 Performance Considerations

- **Caching**: Consider implementing Redis for API response caching
- **Rate limiting**: Add rate limiting for OpenAI API calls
- **Pagination**: Implement pagination for large trial result sets
- **CDN**: Use CDN for static assets in production

## 🚨 Important Notes

- **Medical Disclaimer**: This tool is for informational purposes only
- **Professional Use**: Always verify information with healthcare providers
- **API Costs**: OpenAI API usage incurs costs based on token consumption
- **Trial Participation**: Direct patients to consult with their healthcare team
