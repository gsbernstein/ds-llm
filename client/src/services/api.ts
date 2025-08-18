import { 
  PatientData, 
  ClinicalTrial, 
  AnalyzeTranscriptResponse, 
  SearchTrialsResponse,
  SampleTranscriptResponse 
} from '../types';

const API_BASE_URL = process.env['REACT_APP_API_URL'] || 'http://localhost:5001/api';

export class ApiService {
  /**
   * Analyzes a transcript and extracts patient data
   */
  static async analyzeTranscript(transcript: string): Promise<PatientData> {
    const response = await fetch(`${API_BASE_URL}/analyze-transcript`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcript }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze transcript');
    }

    const data: AnalyzeTranscriptResponse = await response.json();
    return data;
  }

  /**
   * Searches for clinical trials based on patient data
   */
  static async searchTrials(patientData: {
    diagnosis: string | string[];
    symptoms: string[];
    patientAge: number;
    patientGender: string;
  }): Promise<ClinicalTrial[]> {
    const response = await fetch(`${API_BASE_URL}/search-trials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });

    if (!response.ok) {
      throw new Error('Failed to search clinical trials');
    }

    const data: SearchTrialsResponse = await response.json();
    return data.trials;
  }

  /**
   * Gets a sample transcript for testing
   */
  static async getSampleTranscript(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/sample-transcript`);
    
    if (!response.ok) {
      throw new Error('Failed to load sample transcript');
    }

    const data: SampleTranscriptResponse = await response.json();
    return data.transcript;
  }
}
