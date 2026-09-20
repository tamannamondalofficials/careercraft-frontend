import React from 'react';
import { Edit3 } from 'lucide-react';
import { TemplateProps, formatDate } from './types';

export const ExecutiveTemplate: React.FC<TemplateProps> = ({
  data,
  onSelectSection,
  hasName,
  hasTitle,
  hasEmail,
  hasPhone,
  hasLocation,
  hasLinkedin,
  hasGithub,
  hasSummary,
  hasExperiences,
  hasEducations,
  hasProjects,
  hasSkills,
  hasCertifications,
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
  projList,
  skillsList,
  certList,
}) => {
  return (
    <div className="flex flex-col flex-1 p-10 md:p-12 font-sans">
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header
          onClick={() => onSelectSection?.('personal')}
          className="group relative border-b-2 border-[#17365D] pb-3 mb-4 rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer text-left"
          title="Click to edit Personal Details"
        >
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#17365D] flex items-center gap-1 text-[11px] font-semibold bg-white/90 px-2 py-0.5 rounded shadow-2xs border border-indigo-100">
            <Edit3 size={12} /> Edit
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold tracking-tight uppercase mb-1 ${hasName ? 'text-[#17365D]' : 'text-gray-400 font-normal'}`}>
            {nameVal}
          </h1>
          <h2 className={`text-sm md:text-base mb-2 ${hasTitle ? 'text-[#365F91] font-semibold' : 'text-gray-400 font-normal'}`}>
            {titleVal}
          </h2>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
            <span className={hasEmail ? 'text-gray-800 font-medium' : 'text-gray-400 font-normal'}>{emailVal}</span>
            <span className="text-gray-300 font-bold">|</span>
            <span className={hasPhone ? 'text-gray-800 font-medium' : 'text-gray-400 font-normal'}>{phoneVal}</span>
            <span className="text-gray-300 font-bold">|</span>
            <span className={hasLocation ? 'text-gray-800 font-medium' : 'text-gray-400 font-normal'}>{locationVal}</span>
            {githubVal && (
              <>
                <span className="text-gray-300 font-bold">|</span>
                <span className={hasGithub ? 'text-indigo-900 font-medium' : 'text-gray-400 font-normal'}>{githubVal}</span>
              </>
            )}
            {linkedinVal && (
              <>
                <span className="text-gray-300 font-bold">|</span>
                <span className={hasLinkedin ? 'text-indigo-900 font-medium' : 'text-gray-400 font-normal'}>{linkedinVal}</span>
              </>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        <section
          onClick={() => onSelectSection?.('summary')}
          className="group relative mt-1 mb-3.5 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer text-left"
          title="Click to edit Professional Summary"
        >
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#17365D] flex items-center gap-1 text-[11px] font-semibold bg-white/90 px-2 py-0.5 rounded shadow-2xs border border-indigo-100">
            <Edit3 size={12} /> Edit
          </div>
          <p className={`text-xs md:text-sm leading-relaxed text-justify ${hasSummary ? 'text-gray-800' : 'text-gray-400 font-normal'}`}>
            {summaryVal}
          </p>
        </section>

        {/* Technical Skills */}
        <section
          onClick={() => onSelectSection?.('skills')}
          className="group relative mt-1 mb-3.5 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer text-left"
          title="Click to edit Skills"
        >
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#17365D] flex items-center gap-1 text-[11px] font-semibold bg-white/90 px-2 py-0.5 rounded shadow-2xs border border-indigo-100">
            <Edit3 size={12} /> Edit
          </div>
          <h3 className="text-xs font-bold text-[#17365D] uppercase tracking-wider border-b border-[#365F91]/40 pb-0.5 mb-1.5 flex items-center gap-1.5">
            TECHNICAL SKILLS
          </h3>
          <div className="text-xs leading-relaxed flex flex-wrap gap-1.5">
            {skillsList.map((skill, i) => (
              <span key={i} className={`text-xs px-2 py-0.5 rounded font-medium border ${hasSkills ? 'bg-slate-50 text-gray-800 border-gray-200' : 'bg-slate-50/60 text-gray-400 border-gray-100'}`}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section
          onClick={() => onSelectSection?.('experience')}
          className="group relative mt-1 mb-3.5 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer text-left"
          title="Click to edit Work Experience"
        >
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#17365D] flex items-center gap-1 text-[11px] font-semibold bg-white/90 px-2 py-0.5 rounded shadow-2xs border border-indigo-100">
            <Edit3 size={12} /> Edit
          </div>
          <h3 className="text-xs font-bold text-[#17365D] uppercase tracking-wider border-b border-[#365F91]/40 pb-0.5 mb-2 flex items-center gap-1.5">
            EXPERIENCE
          </h3>
          <div className="flex flex-col gap-3">
            {expList.map((exp, index) => {
              const isItemSample = !hasExperiences;
              return (
                <div key={index} className="break-inside-avoid text-left">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className={`text-xs md:text-sm font-bold ${isItemSample ? 'text-gray-400 font-normal' : 'text-gray-900'}`}>
                      {exp.job_title || 'Job Title'}
                      <span className={isItemSample ? 'text-gray-400 font-normal' : 'font-semibold text-gray-700'}>
                        {' · '}{exp.company_name || 'Company Name'}
                      </span>
                      {exp.company_location && (
                        <span className={isItemSample ? 'text-gray-300' : 'font-normal text-gray-500 text-xs'}>
                          {', '}{exp.company_location}
                        </span>
                      )}
                    </h4>
                    <span className={`text-xs whitespace-nowrap ml-4 ${isItemSample ? 'text-gray-400' : 'font-semibold text-[#17365D]'}`}>
                      {exp.start_date ? formatDate(exp.start_date) : 'Start'}
                      {' – '}
                      {exp.currently_working ? 'Present' : (exp.end_date ? formatDate(exp.end_date) : 'End')}
                    </span>
                  </div>
                  {exp.description && (
                    <div className={`text-xs leading-relaxed whitespace-pre-wrap mt-0.5 space-y-0.5 ${isItemSample ? 'text-gray-400 font-normal' : 'text-gray-800'}`}>
                      {exp.description.split('\n').map((line: string, lIdx: number) => (
                        <p key={lIdx} className="pl-1">
                          {line.startsWith('•') || line.startsWith('-') ? line : `• ${line}`}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        {projList.length > 0 && (
          <section className="group relative mt-1 mb-3.5 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors text-left">
            <h3 className="text-xs font-bold text-[#17365D] uppercase tracking-wider border-b border-[#365F91]/40 pb-0.5 mb-2 flex items-center gap-1.5">
              PROJECTS
            </h3>
            <div className="flex flex-col gap-2">
              {projList.map((proj, index) => {
                const isItemSample = !hasProjects;
                return (
                  <div key={index} className="break-inside-avoid text-left">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className={`text-xs md:text-sm font-bold ${isItemSample ? 'text-gray-400 font-normal' : 'text-gray-900'}`}>
                        {proj.title}
                        {proj.subtitle && (
                          <span className={isItemSample ? 'text-gray-400 font-normal ml-1.5' : 'font-semibold text-indigo-700 ml-1.5'}>
                            {' | '}{proj.subtitle}
                          </span>
                        )}
                      </h4>
                      {proj.technologies && (
                        <span className={`text-xs font-medium ${isItemSample ? 'text-gray-300' : 'text-gray-500'}`}>
                          {proj.technologies}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs leading-relaxed ${isItemSample ? 'text-gray-400 font-normal' : 'text-gray-800'}`}>
                      {proj.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        <section
          onClick={() => onSelectSection?.('education')}
          className="group relative mt-1 mb-2 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer text-left"
          title="Click to edit Education"
        >
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#17365D] flex items-center gap-1 text-[11px] font-semibold bg-white/90 px-2 py-0.5 rounded shadow-2xs border border-indigo-100">
            <Edit3 size={12} /> Edit
          </div>
          <h3 className="text-xs font-bold text-[#17365D] uppercase tracking-wider border-b border-[#365F91]/40 pb-0.5 mb-2 flex items-center gap-1.5">
            EDUCATION & CERTIFICATIONS
          </h3>
          <div className="flex flex-col gap-2">
            {eduList.map((edu, index) => {
              const isItemSample = !hasEducations;
              return (
                <div key={index} className="break-inside-avoid text-left flex justify-between items-baseline">
                  <div className="text-xs">
                    <span className={`font-bold ${isItemSample ? 'text-gray-400 font-normal' : 'text-gray-900'}`}>
                      {edu.degree}
                    </span>
                    {edu.institution_name && (
                      <span className={isItemSample ? 'text-gray-400' : 'text-gray-700'}>
                        {' – '}{edu.institution_name}
                      </span>
                    )}
                    {edu.description && (
                      <span className={`ml-2 ${isItemSample ? 'text-gray-300' : 'text-gray-600 font-medium'}`}>
                        ({edu.description})
                      </span>
                    )}
                  </div>
                  <span className={`text-xs whitespace-nowrap ml-4 ${isItemSample ? 'text-gray-400' : 'font-semibold text-[#17365D]'}`}>
                    {edu.start_date ? formatDate(edu.start_date) : 'Start'}
                    {' – '}
                    {edu.currently_studying ? 'Present' : (edu.end_date ? formatDate(edu.end_date) : 'End')}
                  </span>
                </div>
              );
            })}

            {/* Certifications Line */}
            {certList.length > 0 && (
              <div className="text-xs text-gray-800 font-medium mt-1 pt-1 border-t border-gray-100 flex flex-wrap gap-x-4 gap-y-1">
                {certList.map((cert, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded border text-[11px] ${hasCertifications
                        ? 'text-emerald-800 bg-emerald-50 border-emerald-100 font-medium'
                        : 'text-gray-400 bg-gray-50 border-gray-100 font-normal'
                      }`}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Page Footer */}
      <footer className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 select-none">
        <span>{hasName ? `${nameVal} • Resume` : 'Executive Resume Template'}</span>
        <span>Page 1 of 1</span>
      </footer>
    </div>
  );
};
