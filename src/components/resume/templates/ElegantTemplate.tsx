import React from 'react';
import { TemplateProps, formatDate } from './types';

export const ElegantTemplate: React.FC<TemplateProps> = ({
  onSelectSection,
  hasName,
  nameVal,
  titleVal,
  emailVal,
  phoneVal,
  locationVal,
  summaryVal,
  expList,
  eduList,
  skillsList,
}) => {
  return (
    <div className="flex flex-col flex-1 p-10 md:p-12 font-serif">
      <div className="flex flex-col flex-1">
        {/* Elegant Centered Header */}
        <header
          onClick={() => onSelectSection?.('personal')}
          className="group relative pb-4 mb-4 text-center border-b-2 border-stone-800 cursor-pointer"
        >
          <h1 className={`text-3xl tracking-widest uppercase mb-1 font-normal ${hasName ? 'text-stone-900' : 'text-gray-400'}`}>
            {nameVal}
          </h1>
          <h2 className="text-xs tracking-widest uppercase text-stone-600 font-sans font-semibold mb-2">
            {titleVal}
          </h2>
          <div className="flex justify-center items-center gap-3 text-xs text-stone-600 font-sans">
            <span>{emailVal}</span>
            <span>•</span>
            <span>{phoneVal}</span>
            <span>•</span>
            <span>{locationVal}</span>
          </div>
        </header>

        {/* Summary */}
        <section
          onClick={() => onSelectSection?.('summary')}
          className="mb-4 text-left cursor-pointer"
        >
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest border-b border-stone-300 pb-0.5 mb-2 font-sans">
            Executive Summary
          </h3>
          <p className="text-xs md:text-sm leading-relaxed text-stone-800 text-justify italic font-serif">
            &ldquo;{summaryVal}&rdquo;
          </p>
        </section>

        {/* Experience */}
        <section
          onClick={() => onSelectSection?.('experience')}
          className="mb-4 text-left cursor-pointer"
        >
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest border-b border-stone-300 pb-0.5 mb-2.5 font-sans">
            Professional Experience
          </h3>
          <div className="flex flex-col gap-3.5">
            {expList.map((exp, idx) => (
              <div key={idx} className="text-left">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-xs md:text-sm font-bold text-stone-900">
                    {exp.job_title}, <span className="font-normal italic">{exp.company_name}</span>
                  </h4>
                  <span className="text-xs text-stone-500 font-sans">
                    {exp.start_date ? formatDate(exp.start_date) : 'Start'} – {exp.currently_working ? 'Present' : (exp.end_date ? formatDate(exp.end_date) : 'End')}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-xs leading-relaxed text-stone-700 mt-1 space-y-0.5 pl-3 border-l border-stone-200">
                    {exp.description.split('\n').map((line: string, lIdx: number) => (
                      <p key={lIdx}>{line.startsWith('•') || line.startsWith('-') ? line : `• ${line}`}</p>
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
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest border-b border-stone-300 pb-0.5 mb-1.5 font-sans">
            Core Competencies
          </h3>
          <p className="text-xs leading-relaxed text-stone-800 font-sans">
            {skillsList.join('  •  ')}
          </p>
        </section>

        {/* Education */}
        <section
          onClick={() => onSelectSection?.('education')}
          className="mb-3 text-left cursor-pointer"
        >
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest border-b border-stone-300 pb-0.5 mb-2 font-sans">
            Academic Background
          </h3>
          <div className="flex flex-col gap-1.5">
            {eduList.map((edu, idx) => (
              <div key={idx} className="flex justify-between text-xs text-left">
                <span className="font-bold text-stone-900">{edu.degree} — <span className="font-normal italic">{edu.institution_name}</span></span>
                <span className="text-stone-500 font-sans">{edu.start_date ? formatDate(edu.start_date) : 'Start'} – {edu.currently_studying ? 'Present' : (edu.end_date ? formatDate(edu.end_date) : 'End')}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="pt-3 mt-auto border-t border-stone-200 flex justify-between text-[10px] text-stone-400 font-sans">
        <span>{hasName ? nameVal : 'Curriculum Vitae'}</span>
        <span>Confidential</span>
      </footer>
    </div>
  );
};
