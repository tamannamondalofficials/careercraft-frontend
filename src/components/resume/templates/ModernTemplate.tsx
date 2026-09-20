import React from 'react';
import { TemplateProps, formatDate } from './types';

export const ModernTemplate: React.FC<TemplateProps> = ({
  onSelectSection,
  hasName,
  hasSummary,
  hasEmail,
  hasPhone,
  hasLocation,
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
    <div className="flex flex-col flex-1 p-10 md:p-12 font-sans">
      <div className="flex flex-col flex-1">
        {/* Modern Header with Indigo Accent */}
        <header
          onClick={() => onSelectSection?.('personal')}
          className="group relative pb-4 mb-5 border-b border-indigo-100 rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer text-left"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className={`text-3xl font-extrabold tracking-tight ${hasName ? 'text-gray-950' : 'text-gray-400 font-normal'}`}>
                {nameVal}
              </h1>
              <div className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-xs tracking-wide">
                {titleVal}
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-1 text-xs text-gray-600">
              <span className={hasEmail ? 'font-medium text-gray-900' : 'text-gray-400'}>{emailVal}</span>
              <span className={hasPhone ? 'font-medium text-gray-900' : 'text-gray-400'}>{phoneVal} • {locationVal}</span>
              {(githubVal || linkedinVal) && (
                <span className="text-indigo-600 font-medium">{[githubVal, linkedinVal].filter(Boolean).join(' • ')}</span>
              )}
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        <section
          onClick={() => onSelectSection?.('summary')}
          className="group relative mb-5 rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer text-left"
        >
          <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600" /> About Me
          </h3>
          <p className={`text-xs md:text-sm leading-relaxed ${hasSummary ? 'text-gray-700' : 'text-gray-400'}`}>
            {summaryVal}
          </p>
        </section>

        {/* Experience */}
        <section
          onClick={() => onSelectSection?.('experience')}
          className="group relative mb-5 rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer text-left"
        >
          <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-600" /> Work Experience
          </h3>
          <div className="flex flex-col gap-3.5 border-l-2 border-indigo-100 pl-4 ml-1">
            {expList.map((exp, idx) => (
              <div key={idx} className="relative text-left">
                <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white" />
                <div className="flex justify-between items-baseline">
                  <h4 className="text-xs md:text-sm font-bold text-gray-900">
                    {exp.job_title} <span className="text-indigo-600 font-semibold">@ {exp.company_name}</span>
                  </h4>
                  <span className="text-xs font-medium text-gray-500">
                    {exp.start_date ? formatDate(exp.start_date) : 'Start'} – {exp.currently_working ? 'Present' : (exp.end_date ? formatDate(exp.end_date) : 'End')}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-xs text-gray-600 leading-relaxed mt-1 space-y-0.5">
                    {exp.description.split('\n').map((line: string, lIdx: number) => (
                      <p key={lIdx}>{line.startsWith('•') || line.startsWith('-') ? line : `• ${line}`}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills Grid */}
        <section
          onClick={() => onSelectSection?.('skills')}
          className="group relative mb-5 rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer text-left"
        >
          <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600" /> Skills & Competencies
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {skillsList.map((skill, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-indigo-50/80 text-indigo-950 font-semibold border border-indigo-100/80">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Education */}
        <section
          onClick={() => onSelectSection?.('education')}
          className="group relative mb-4 rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer text-left"
        >
          <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600" /> Education & Credentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {eduList.map((edu, idx) => (
              <div key={idx} className="bg-gray-50/80 p-2.5 rounded-lg border border-gray-200/60 text-left">
                <div className="text-xs font-bold text-gray-900">{edu.degree}</div>
                <div className="text-xs text-indigo-700 font-medium">{edu.institution_name}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {edu.start_date ? formatDate(edu.start_date) : 'Start'} – {edu.currently_studying ? 'Present' : (edu.end_date ? formatDate(edu.end_date) : 'End')}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modern Footer */}
      <footer className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
        <span>{hasName ? nameVal : 'Resume'}</span>
        <span className="text-indigo-600 font-semibold">Modern Tech Template</span>
      </footer>
    </div>
  );
};
