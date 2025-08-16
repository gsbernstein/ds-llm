import React from 'react';
import { PatientDataDisplayProps, SeverityLevel } from '../types';

const PatientDataDisplay: React.FC<PatientDataDisplayProps> = ({ patientData }) => {
  if (!patientData) return null;

  const formatValue = (value: string | string[] | number | undefined): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'number') {
      return value.toString();
    }
    return value || 'Not specified';
  };

  const getSeverityColor = (severity: SeverityLevel | undefined): string => {
    switch (severity?.toLowerCase()) {
      case 'severe':
        return 'bg-red-100 text-red-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'mild':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Extracted Patient Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Primary Diagnosis</label>
            <p className="text-lg font-semibold text-gray-900">{formatValue(patientData.diagnosis)}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Severity</label>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(patientData.severity)}`}>
              {formatValue(patientData.severity)}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Duration</label>
            <p className="text-gray-900">{formatValue(patientData.duration)}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Patient Age</label>
            <p className="text-gray-900">{formatValue(patientData.patientAge)} years old</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
            <p className="text-gray-900">{formatValue(patientData.patientGender)}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Symptoms</label>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(patientData.symptoms) ? patientData.symptoms.map((symptom: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {symptom}
                </span>
              )) : (
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {formatValue(patientData.symptoms)}
                </span>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Current Medications</label>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(patientData.currentMedications) ? patientData.currentMedications.map((med: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {med}
                </span>
              )) : (
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {formatValue(patientData.currentMedications)}
                </span>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Medical History</label>
            <p className="text-gray-900">{formatValue(patientData.medicalHistory)}</p>
          </div>
          
          {patientData.allergies && patientData.allergies.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Allergies</label>
              <div className="flex flex-wrap gap-2">
                {patientData.allergies.map((allergy: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {patientData.vitalSigns && (
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Vital Signs</label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {patientData.vitalSigns.bloodPressure && (
                  <div>
                    <span className="text-gray-500">BP:</span> {patientData.vitalSigns.bloodPressure}
                  </div>
                )}
                {patientData.vitalSigns.heartRate && (
                  <div>
                    <span className="text-gray-500">HR:</span> {patientData.vitalSigns.heartRate} bpm
                  </div>
                )}
                {patientData.vitalSigns.temperature && (
                  <div>
                    <span className="text-gray-500">Temp:</span> {patientData.vitalSigns.temperature}°F
                  </div>
                )}
                {patientData.vitalSigns.weight && (
                  <div>
                    <span className="text-gray-500">Weight:</span> {patientData.vitalSigns.weight} kg
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDataDisplay;
