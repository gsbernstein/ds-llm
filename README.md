# Clinical Trials Matcher

An AI-powered web application that connects patients with relevant clinical trials by analyzing patient-doctor conversation transcripts and matching them with trials from ClinicalTrials.gov.

## 🚀 Live Demo

**Deployed Application:** [https://clinical-trials-matcher.onrender.com](https://clinical-trials-matcher.onrender.com)

*Note: The demo may take a few moments to load as it's hosted on a free tier service.*

## 🎯 Project Overview

This application demonstrates the intersection of AI, healthcare, and web development by:

1. **Transcript Analysis**: Uses OpenAI's GPT model to extract structured medical information from patient-doctor conversations
2. **Clinical Trial Matching**: Queries the ClinicalTrials.gov API to find relevant trials based on extracted patient data
3. **Intelligent Filtering**: Applies patient demographics and medical criteria to filter and rank trial matches
4. **Modern Web Interface**: Provides an intuitive, responsive UI for healthcare providers to explore trial options

## ✨ Key Features

- **AI-Powered Analysis**: Extracts diagnosis, symptoms, patient demographics, and medical history from conversation transcripts
- **Smart Trial Matching**: Finds relevant clinical trials using multiple criteria including condition, symptoms, age, and gender
- **Interactive Trial Display**: Expandable trial cards with detailed information and direct links to ClinicalTrials.gov
- **Advanced Filtering**: Filter trials by phase, status, and other criteria
- **Sample Data**: Built-in sample transcript for immediate testing
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Processing**: Live analysis and search results

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
   git clone https://github.com/yourusername/clinical-trials-matcher.git
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
   PORT=5000
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend (port 5000) and frontend (port 3000) simultaneously.

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
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── App.js         # Main application
│   │   └── index.js       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
├── server/                 # Node.js backend
│   ├── index.js           # Express server and API endpoints
│   ├── package.json       # Backend dependencies
│   └── env.example        # Environment variables template
├── package.json            # Root package.json with scripts
└── README.md              # This file
```

## 🌐 Deployment

### Render (Recommended for Free Tier)

1. **Connect your GitHub repository** to Render
2. **Create a new Web Service**
3. **Configure environment variables**:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: `production`
4. **Build Command**: `npm run install-all && npm run build`
5. **Start Command**: `npm start`

### Vercel

1. **Import your GitHub repository** to Vercel
2. **Set environment variables** in the Vercel dashboard
3. **Deploy** - Vercel will automatically detect the React app

### AWS/GCP

1. **Build the application**: `npm run build`
2. **Deploy the `client/build` folder** to your hosting service
3. **Deploy the server** to your backend service (EC2, App Engine, etc.)

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

### Manual Testing

1. **Enter a custom transcript** with medical details
2. **Verify extracted information** matches the input
3. **Check trial matches** are relevant to the patient's condition
4. **Test filtering** by phase and status
5. **Verify external links** to ClinicalTrials.gov

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Assumptions & Limitations

### Technical Assumptions
- OpenAI API is available and properly configured
- ClinicalTrials.gov API is accessible and responsive
- Modern browser support (ES6+, CSS Grid, Flexbox)
- Node.js environment for backend development

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
- **API key security**: OpenAI API key stored in environment variables
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

## 📞 Support

For questions or issues:
- Create an issue in the GitHub repository
- Check the deployment logs for errors
- Verify environment variables are properly set
- Ensure all dependencies are installed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the healthcare community**
