import React, { useState } from 'react';
import TranscriptInput from './components/TranscriptInput';
import PatientDataDisplay from './components/PatientDataDisplay';
import ClinicalTrialsList from './components/ClinicalTrialsList';
import Header from './components/Header';

function App() {
  const [transcript, setTranscript] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState('input'); // input, analysis, results

  const handleTranscriptSubmit = async (transcriptText) => {
    setLoading(true);
    setError(null);
    
    try {
      // Step 1: Analyze transcript with LLM
      const response = await fetch('/api/analyze-transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: transcriptText }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze transcript');
      }

      const extractedData = await response.json();
      setPatientData(extractedData);
      setCurrentStep('analysis');

      // Step 2: Search for clinical trials
      const trialsResponse = await fetch('/api/search-trials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diagnosis: extractedData.diagnosis,
          symptoms: extractedData.symptoms,
          patientAge: extractedData.patientAge,
          patientGender: extractedData.patientGender,
        }),
      });

      if (!trialsResponse.ok) {
        throw new Error('Failed to search clinical trials');
      }

      const trialsData = await trialsResponse.json();
      setTrials(trialsData);
      setCurrentStep('results');
    } catch (err) {
      setError(err.message);
      setCurrentStep('input');
    } finally {
      setLoading(false);
    }
  };

  const handleUseSampleTranscript = async () => {
    try {
      const response = await fetch('/api/sample-transcript');
      const data = await response.json();
      setTranscript(data.transcript);
      await handleTranscriptSubmit(data.transcript);
    } catch (err) {
      setError('Failed to load sample transcript');
    }
  };

  const handleReset = () => {
    setTranscript('');
    setPatientData(null);
    setTrials([]);
    setError(null);
    setCurrentStep('input');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <strong>Error:</strong> {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {currentStep === 'input' && (
          <TranscriptInput
            transcript={transcript}
            setTranscript={setTranscript}
            onSubmit={handleTranscriptSubmit}
            onUseSample={handleUseSampleTranscript}
            loading={loading}
          />
        )}

        {currentStep === 'analysis' && (
          <div className="text-center py-12">
            <div className="loading-spinner mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">
              Analyzing transcript and searching for clinical trials...
            </h2>
            <p className="text-gray-500 mt-2">This may take a few moments</p>
          </div>
        )}

        {currentStep === 'results' && patientData && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Clinical Trial Matches
              </h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Start Over
              </button>
            </div>
            
            <PatientDataDisplay patientData={patientData} />
            <ClinicalTrialsList trials={trials} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
