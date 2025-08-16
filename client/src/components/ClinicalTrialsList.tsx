import React, { useState } from 'react';
import { ClinicalTrialsListProps, ClinicalTrial, PhaseFilter, StatusFilter } from '../types';

const ClinicalTrialsList: React.FC<ClinicalTrialsListProps> = ({ trials }) => {
  const [expandedTrial, setExpandedTrial] = useState<string | null>(null);
  const [filterPhase, setFilterPhase] = useState<PhaseFilter>('all');
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('all');

  if (!trials || trials.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Clinical Trials Found</h3>
        <p className="text-gray-500">
          No matching clinical trials were found for the patient's condition. 
          Try adjusting the search criteria or contact a healthcare provider for alternative options.
        </p>
      </div>
    );
  }

  const getPhaseColor = (phase: string | undefined): string => {
    switch (phase?.toLowerCase()) {
      case 'phase1':
        return 'bg-blue-100 text-blue-800';
      case 'phase2':
        return 'bg-green-100 text-green-800';
      case 'phase3':
        return 'bg-yellow-100 text-yellow-800';
      case 'phase4':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string | undefined): string => {
    switch (status?.toLowerCase()) {
      case 'recruiting':
        return 'bg-green-100 text-green-800';
      case 'active, not recruiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTrials = trials.filter((trial: ClinicalTrial) => {
    if (filterPhase !== 'all' && trial.phase?.toLowerCase() !== filterPhase.toLowerCase()) {
      return false;
    }
    if (filterStatus !== 'all' && trial.status?.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }
    return true;
  });

  const toggleTrialExpansion = (nctId: string): void => {
    setExpandedTrial(expandedTrial === nctId ? null : nctId);
  };

  const handlePhaseFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilterPhase(e.target.value as PhaseFilter);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilterStatus(e.target.value as StatusFilter);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Clinical Trial Matches ({filteredTrials.length})
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
          <select
            value={filterPhase}
            onChange={handlePhaseFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Phases</option>
            <option value="phase 1">Phase 1</option>
            <option value="phase 2">Phase 2</option>
            <option value="phase 3">Phase 3</option>
            <option value="phase 4">Phase 4</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={handleStatusFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="recruiting">Recruiting</option>
            <option value="active, not recruiting">Active, Not Recruiting</option>
            <option value="completed">Completed</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTrials.map((trial: ClinicalTrial) => (
          <div key={trial.nctId} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
                {trial.title}
              </h4>
              <button
                onClick={() => toggleTrialExpansion(trial.nctId)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                {expandedTrial === trial.nctId ? 'Show Less' : 'Show More'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div className="flex items-center space-x-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPhaseColor(trial.phase)}`}>
                  {trial.phase || 'Not specified'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trial.status)}`}>
                  {trial.status || 'Not specified'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600">
                <span className="font-medium">NCT ID:</span> {trial.nctId}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Condition:</span>
                <p className="text-gray-600">{trial.condition || 'Not specified'}</p>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Intervention:</span>
                <p className="text-gray-600">{trial.intervention || 'Not specified'}</p>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Sponsor:</span>
                <p className="text-gray-600">{trial.sponsor || 'Not specified'}</p>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Country:</span>
                <p className="text-gray-600">{trial.country || 'Not specified'}</p>
              </div>
            </div>
            
            {expandedTrial === trial.nctId && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                {trial.description && (
                  <div>
                    <span className="font-medium text-gray-700">Description:</span>
                    <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                      {trial.description.length > 300 
                        ? `${trial.description.substring(0, 300)}...` 
                        : trial.description}
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Enrollment:</span>
                    <p className="text-gray-600">{trial.enrollment || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Start Date:</span>
                    <p className="text-gray-600">{trial.startDate || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Completion Date:</span>
                    <p className="text-gray-600">{trial.completionDate || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href={`https://clinicaltrials.gov/ct2/show/${trial.nctId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View on ClinicalTrials.gov
                  </a>
                  
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save Trial
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Important:</strong> This information is sourced from ClinicalTrials.gov. 
          Always consult with healthcare providers and review the full trial details before considering participation. 
          Clinical trials involve risks and benefits that should be carefully evaluated.
        </p>
      </div>
    </div>
  );
};

export default ClinicalTrialsList;
