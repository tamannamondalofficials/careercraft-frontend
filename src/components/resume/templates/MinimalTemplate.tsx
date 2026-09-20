import React from 'react';
import { TemplateProps, formatDate } from './types';

export const MinimalTemplate: React.FC<TemplateProps> = ({
  onSelectSection,
  hasName,
  hasTitle,
  hasSummary,
  hasExperiences,
  hasEducations,
  hasSkills,
  nameVal,
  titleVal,
  emailVal,
  phoneVal,
  locationVal,
  githubVal,
  linkedinVal,
  summaryVal,
  expList,
  eduList,
  skillsList,
}) => {
  return (
    <div className="flex flex-col flex-1 p-10 md:p-12 font-sans bg-white text-gray-900">
      <div className="flex flex-col flex-1">
        {/* Minimal Header */}
        <header
          onClick={() => onSelectSection?.('personal')}
          className="group relative pb-3 mb-5 border-b-2 border-gray-900 text-left cursor-pointer hover:bg-slate-50/50 rounded-lg p-2 -m-2 transition-colors"
        >
          <div className="flex justify-between items-baseline mb-1">
            <h1 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${hasName ? 'text-gray-950' : 'text-gray-400'}`}>
              {nameVal}
            </h1>
            <span className={`text-xs font-bold tracking-wider uppercase ${hasTitle ? 'text-gray-700' : 'text-gray-400'}`}>
              {titleVal}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-1 font-medium">
            <span>{emailVal}</span>
            <span className="text-gray-300">•</span>
            <span>{phoneVal}</span>
            <span className="text-gray-300">•</span>
            <span>{locationVal}</span>
            {githubVal && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-gray-800 font-medium">{githubVal}</span>
              </>
            )}
            {linkedinVal && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-gray-800 font-medium">{linkedinVal}</span>
              </>
            )}
          </div>
        </header>

        {/* Summary */}
        <section
          onClick={() => onSelectSection?.('summary')}
          className="mb-4 text-left cursor-pointer hover:bg-slate-50/50 rounded-lg p-2 -m-2 transition-colors"
        >
          <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            PROFESSIONAL SUMMARY
          </h3>
          <p className={`text-xs leading-relaxed text-justify ${hasSummary ? 'text-gray-800' : 'text-gray-400'}`}>
            {summaryVal}
          </p>
        </section>

        {/* Experience */}
        <section
          onClick={() => onSelectSection?.('experience')}
          className="mb-4 text-left cursor-pointer hover:bg-slate-50/50 rounded-lg p-2 -m-2 transition-colors"
        >
          <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2.5">
            WORK EXPERIENCE
          </h3>
          <div className="flex flex-col gap-3.5">
            {expList.map((exp, idx) => (
              <div key={idx} className="text-left">
                <div className="flex justify-between items-baseline text-xs">
                  <h4 className="font-bold text-gray-950">
                    {exp.job_title}
                    <span className="font-semibold text-gray-700"> — {exp.company_name}</span>
                    {exp.company_location && (
                      <span className="font-normal text-gray-500 text-[11px]"> ({exp.company_location})</span>
                    )}
                  </h4>
                  <span className="text-gray-600 font-semibold text-[11px] whitespace-nowrap ml-4">
                    {exp.start_date ? formatDate(exp.start_date) : 'Start'} – {exp.currently_working ? 'Present' : (exp.end_date ? formatDate(exp.end_date) : 'End')}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-xs text-gray-700 mt-1 leading-relaxed space-y-0.5 pl-1">
                    {exp.description.split('\n').map((line: string, lIdx: number) => (
                      <p key={lIdx}>
                        {line.startsWith('•') || line.startsWith('-') ? line : `• ${line}`}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section
          onClick={() => onSelectSection?.('skills')}
          className="mb-4 text-left cursor-pointer hover:bg-slate-50/50 rounded-lg p-2 -m-2 transition-colors"
        >
          <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            TECHNICAL & PROFESSIONAL SKILLS
          </h3>
          <div className="text-xs leading-relaxed flex flex-wrap gap-1.5">
            {skillsList.map((skill, i) => (
              <span 
                key={i} 
                className={`text-xs px-2 py-0.5 rounded font-medium border ${
                  hasSkills ? 'bg-gray-50 text-gray-800 border-gray-200' : 'bg-gray-50/60 text-gray-400 border-gray-100'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Education */}
        <section
          onClick={() => onSelectSection?.('education')}
          className="mb-3 text-left cursor-pointer hover:bg-slate-50/50 rounded-lg p-2 -m-2 transition-colors"
        >
          <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
            EDUCATION & CREDENTIALS
          </h3>
          <div className="flex flex-col gap-2">
            {eduList.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-xs text-left">
                <div>
                  <span className="font-bold text-gray-950">{edu.degree}</span>
                  {edu.institution_name && (
                    <span className="font-medium text-gray-700"> — {edu.institution_name}</span>
                  )}
                  {edu.description && (
                    <span className="text-gray-500 text-[11px] ml-2">({edu.description})</span>
                  )}
                </div>
                <span className="text-gray-600 font-semibold text-[11px] whitespace-nowrap ml-4">
                  {edu.start_date ? formatDate(edu.start_date) : 'Start'} – {edu.currently_studying ? 'Present' : (edu.end_date ? formatDate(edu.end_date) : 'End')}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="pt-3 mt-auto border-t border-gray-200 flex justify-between text-[10px] text-gray-500">
        <span>{hasName ? `${nameVal} • Resume` : 'Minimalist ATS Resume'}</span>
        <span>Page 1 of 1</span>
      </footer>
    </div>
  );
};
