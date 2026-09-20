import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { TemplateProps, formatDate } from './types';

export const CompactTemplate: React.FC<TemplateProps> = ({
  onSelectSection,
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
}) => {
  return (
    <div className="flex flex-1 min-h-full">
      {/* Left Column Sidebar */}
      <div className="w-[35%] bg-slate-900 text-white p-6 md:p-8 flex flex-col justify-between text-left">
        <div>
          <header
            onClick={() => onSelectSection?.('personal')}
            className="mb-6 cursor-pointer"
          >
            <h1 className="text-xl font-bold tracking-tight text-white mb-1">{nameVal}</h1>
            <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{titleVal}</h2>
          </header>

          {/* Contact Info */}
          <div className="mb-6 space-y-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-2">
              <Mail size={12} className="text-indigo-400 shrink-0" />
              <span className="truncate">{emailVal}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={12} className="text-indigo-400 shrink-0" />
              <span>{phoneVal}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-indigo-400 shrink-0" />
              <span>{locationVal}</span>
            </div>
            {githubVal && (
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-indigo-400 shrink-0" />
                <span className="truncate">{githubVal}</span>
              </div>
            )}
            {linkedinVal && (
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-indigo-400 shrink-0" />
                <span className="truncate">{linkedinVal}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          <div
            onClick={() => onSelectSection?.('skills')}
            className="mb-6 cursor-pointer"
          >
            <h3 className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-700 pb-1 mb-2">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1">
              {skillsList.map((skill, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education in Sidebar */}
          <div
            onClick={() => onSelectSection?.('education')}
            className="mb-4 cursor-pointer"
          >
            <h3 className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-700 pb-1 mb-2">
              Education
            </h3>
            <div className="space-y-2 text-[11px]">
              {eduList.map((edu, idx) => (
                <div key={idx}>
                  <div className="font-bold text-white leading-tight">{edu.degree}</div>
                  <div className="text-slate-400 text-[10px]">{edu.institution_name}</div>
                  <div className="text-slate-500 text-[10px]">
                    {edu.start_date ? formatDate(edu.start_date) : 'Start'} – {edu.currently_studying ? 'Present' : (edu.end_date ? formatDate(edu.end_date) : 'End')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-[9px] text-slate-500">
          Two-Column Tech Format
        </div>
      </div>

      {/* Right Column Main Body */}
      <div className="w-[65%] p-6 md:p-8 flex flex-col justify-between bg-white text-gray-900 text-left">
        <div className="flex flex-col flex-1">
          {/* Summary */}
          <section
            onClick={() => onSelectSection?.('summary')}
            className="mb-5 cursor-pointer"
          >
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-900 pb-1 mb-2">
              Profile Overview
            </h3>
            <p className="text-xs leading-relaxed text-gray-700">{summaryVal}</p>
          </section>

          {/* Experience */}
          <section
            onClick={() => onSelectSection?.('experience')}
            className="mb-5 cursor-pointer"
          >
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-900 pb-1 mb-2.5">
              Experience
            </h3>
            <div className="space-y-3.5">
              {expList.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-slate-900">
                      {exp.job_title} <span className="text-indigo-600 font-semibold">@ {exp.company_name}</span>
                    </h4>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {exp.start_date ? formatDate(exp.start_date) : 'Start'} – {exp.currently_working ? 'Present' : (exp.end_date ? formatDate(exp.end_date) : 'End')}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-[11px] text-gray-600 leading-relaxed mt-1 space-y-0.5">
                      {exp.description.split('\n').map((line: string, lIdx: number) => (
                        <p key={lIdx}>{line.startsWith('•') || line.startsWith('-') ? line : `• ${line}`}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          {projList.length > 0 && (
            <section className="mb-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-900 pb-1 mb-2">
                Key Projects
              </h3>
              <div className="space-y-2">
                {projList.map((proj, idx) => (
                  <div key={idx} className="text-left">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                      {proj.technologies && <span className="text-[10px] text-indigo-600 font-medium">{proj.technologies}</span>}
                    </div>
                    <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <footer className="pt-3 border-t border-gray-100 flex justify-between text-[10px] text-gray-400">
          <span>{nameVal}</span>
          <span>Page 1 of 1</span>
        </footer>
      </div>
    </div>
  );
};
