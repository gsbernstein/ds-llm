import React from 'react';
import { TranscriptInputProps } from '../types';

const TranscriptInput: React.FC<TranscriptInputProps> = ({ 
  transcript, 
  setTranscript, 
  onSubmit, 
  onUseSample, 
  loading 
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (transcript.trim()) {
      onSubmit(transcript);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTranscript(e.target.value);
  };

  const handleUseSampleClick = (): void => {
    onUseSample();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Find Clinical Trials for Your Patients
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload a transcript of a patient-doctor conversation, and our AI will extract key medical information 
          to find relevant clinical trials from ClinicalTrials.gov.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="transcript" className="block text-sm font-medium text-gray-700 mb-2">
              Patient-Doctor Conversation Transcript
            </label>
            <textarea
              id="transcript"
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 resize-none"
              placeholder="Paste the transcript of the patient-doctor conversation here..."
              value={transcript}
              onChange={handleTextareaChange}
              disabled={loading}
            />
            <p className="mt-2 text-sm text-gray-500">
              Include details about symptoms, diagnosis, patient demographics, medical history, and treatment plans.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={!transcript.trim() || loading}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner w-5 h-5 mr-2"></div>
                  Analyzing...
                </div>
              ) : (
                'Analyze Transcript & Find Trials'
              )}
            </button>
            
            <button
              type="button"
              onClick={handleUseSampleClick}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Use Sample Transcript
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">💡 Pro Tips:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Include specific symptoms and their duration</li>
            <li>• Mention patient age, gender, and relevant medical history</li>
            <li>• Include any current medications or treatments</li>
            <li>• Note family history of relevant conditions</li>
            <li>• Be as detailed as possible for better trial matching</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TranscriptInput;
