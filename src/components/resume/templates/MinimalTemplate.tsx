import React from 'react';
import { TemplateProps, formatDate } from './types';

export const MinimalTemplate: React.FC<TemplateProps> = ({
  onSelectSection,
  hasName,
  nameVal,
  titleVal,
  emailVal,
  phoneVal,
  locationVal,
  githubVal,
  summaryVal,
  expList,
  eduList,
  skillsList,
}) => {
  return (
    <div className="flex flex-col flex-1 p-10 md:p-12 font-sans">
      <div className="flex flex-col flex-1">
        {/* Minimal Header */}
        <header
          onClick={() => onSelectSection?.('personal')}
          className="group relative pb-3 mb-4 border-b border-gray-900 text-left cursor-pointer"
        >
          <div className="flex justify-between items-baseline">
            <h1 className={`text-2xl font-black uppercase tracking-wider ${hasName ? 'text-gray-950' : 'text-gray-400'}`}>
              {nameVal}
            </h1>
            <span className="text-xs font-semibold text-gray-700 tracking-wider uppercase">{titleVal}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-2 font-mono">
            <span>{emailVal}</span>
            <span>•</span>
            <span>{phoneVal}</span>
            <span>•</span>
            <span>{locationVal}</span>
            {githubVal && <span>• {githubVal}</span>}
          </div>
        </header>

        {/* Summary */}
        <section
          onClick={() => onSelectSection?.('summary')}
          className="mb-4 text-left cursor-pointer"
        >
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-1.5 font-mono">
            // 01. Profile
          </h3>
          <p className="text-xs leading-relaxed text-gray-700">{summaryVal}</p>
        </section>

        {/* Experience */}
        <section
          onClick={() => onSelectSection?.('experience')}
          className="mb-4 text-left cursor-pointer"
        >
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-2 font-mono">
            // 02. Experience
          </h3>
          <div className="flex flex-col gap-3">
            {expList.map((exp, idx) => (
              <div key={idx} className="text-left">
                <div className="flex justify-between text-xs font-bold text-gray-950">
                  <span>{exp.job_title} — <span className="font-normal text-gray-700">{exp.company_name}</span></span>
                  <span className="font-mono text-gray-600 text-[11px]">
                    {exp.start_date ? formatDate(exp.start_date) : 'Start'} - {exp.currently_working ? 'Present' : (exp.end_date ? formatDate(exp.end_date) : 'End')}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-xs text-gray-700 mt-1 leading-relaxed space-y-0.5 pl-2">
                    {exp.description.split('\n').map((line: string, lIdx: number) => (
                      <p key={lIdx}>{line.startsWith('•') || line.startsWith('-') ? line : `- ${line}`}</p>
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
          className="mb-4 text-left cursor-pointer"
        >
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-1.5 font-mono">
            // 03. Skills
          </h3>
          <p className="text-xs leading-relaxed text-gray-800 font-mono">
            {skillsList.join('  |  ')}
          </p>
        </section>

        {/* Education */}
        <section
          onClick={() => onSelectSection?.('education')}
          className="mb-3 text-left cursor-pointer"
        >
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-2 font-mono">
            // 04. Education
          </h3>
          <div className="flex flex-col gap-1.5">
            {eduList.map((edu, idx) => (
              <div key={idx} className="flex justify-between text-xs text-left">
                <span className="font-semibold text-gray-900">{edu.degree} — <span className="font-normal text-gray-700">{edu.institution_name}</span></span>
                <span className="font-mono text-gray-500 text-[11px]">{edu.start_date ? formatDate(edu.start_date) : 'Start'} - {edu.currently_studying ? 'Present' : (edu.end_date ? formatDate(edu.end_date) : 'End')}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="pt-3 mt-auto border-t border-gray-200 flex justify-between text-[10px] text-gray-500 font-mono">
        <span>MINIMAL ATS FORMAT</span>
        <span>PAGE 1/1</span>
      </footer>
    </div>
  );
};
