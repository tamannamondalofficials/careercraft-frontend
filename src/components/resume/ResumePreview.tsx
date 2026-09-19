"use client";

import React from 'react';
import { ResumeFormData } from '@/types/resume.types';

interface ResumePreviewProps {
  data: ResumeFormData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, previewRef }) => {
  return (
    <div 
      ref={previewRef}
      className="bg-white w-full max-w-[21cm] min-h-[29.7cm] mx-auto shadow-2xl p-10 md:p-14 text-gray-800"
      style={{ aspectRatio: '210 / 297' }}
    >
      {/* Header */}
      <header className="border-b-2 border-indigo-600 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-tight mb-2">
          {data.full_name || 'Your Name'}
        </h1>
        <h2 className="text-xl font-medium text-indigo-600 mb-4">
          {data.job_title || 'Your Target Role'}
        </h2>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
          {data.email && (
            <span className="flex items-center gap-1">
              <span className="font-bold text-indigo-500">@</span> {data.email}
            </span>
          )}
          {data.phone && (
            <span className="flex items-center gap-1">
              <span className="font-bold text-indigo-500">#</span> {data.phone}
            </span>
          )}
          {(data.city || data.state) && (
            <span className="flex items-center gap-1">
              <span className="font-bold text-indigo-500">⚲</span> {data.city}{data.city && data.state ? ', ' : ''}{data.state}
            </span>
          )}
          {data.linkedin_url && (
            <span className="flex items-center gap-1">
              <span className="font-bold text-indigo-500">in</span> {data.linkedin_url.replace(/^https?:\/\//, '')}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {(data.professional_summary) && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3">Professional Summary</h3>
          <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experiences && data.experiences.length > 0 && data.experiences[0].company_name && (
        <section className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
            Work Experience
          </h3>
          <div className="flex flex-col gap-6">
            {data.experiences.map((exp, index) => {
              if (!exp.company_name && !exp.job_title) return null;
              
              return (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900 text-base">{exp.job_title}</h4>
                    <span className="text-sm font-semibold text-indigo-600 whitespace-nowrap ml-4">
                      {exp.start_date ? new Date(exp.start_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Start'} 
                      {' - '} 
                      {exp.currently_working ? 'Present' : (exp.end_date ? new Date(exp.end_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'End')}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2 text-sm text-gray-600">
                    <span className="font-medium text-gray-700">{exp.company_name}</span>
                    <span>{exp.company_location}</span>
                  </div>
                  {exp.description && (
                    <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
