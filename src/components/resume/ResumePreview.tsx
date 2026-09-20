"use client";

import React from 'react';
import { ResumeFormData } from '@/types/resume.types';
import { TabKey } from '@/components/resume/ResumeForm';
import { EXECUTIVE_TEMPLATE_SAMPLE } from '@/constants/sampleCV';
import { Sparkles, Edit3, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeFormData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
  scale?: number;
  onSelectSection?: (section: TabKey) => void;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  data, 
  previewRef, 
  scale = 1,
  onSelectSection 
}) => {
  const hasName = Boolean(data.full_name?.trim());
  const hasTitle = Boolean(data.job_title?.trim());
  const hasEmail = Boolean(data.email?.trim());
  const hasPhone = Boolean(data.phone?.trim());
  const hasLocation = Boolean((data.city || data.state || data.country)?.trim());
  const hasLinkedin = Boolean(data.linkedin_url?.trim());
  const hasGithub = Boolean(data.github_url?.trim());
  const hasSummary = Boolean(data.professional_summary?.trim());
  
  const validExperiences = (data.experiences || []).filter(e => e.company_name?.trim() || e.job_title?.trim());
  const hasExperiences = validExperiences.length > 0;
  
  const validEducations = (data.educations || []).filter(e => e.institution_name?.trim() || e.degree?.trim());
  const hasEducations = validEducations.length > 0;
  
  const validProjects = (data.projects || []).filter(p => p.title?.trim());
  const hasProjects = validProjects.length > 0;

  const hasSkills = Boolean(data.skills?.trim());
  const hasCertifications = Boolean(data.certifications?.trim());
  
  const isAllEmpty = !hasName && !hasTitle && !hasEmail && !hasSummary && !hasExperiences && !hasEducations && !hasSkills;

  const sample = EXECUTIVE_TEMPLATE_SAMPLE;
  const template = data.template || 'executive';

  const nameVal = hasName ? data.full_name : sample.full_name;
  const titleVal = hasTitle ? data.job_title : sample.job_title;
  const emailVal = hasEmail ? data.email : sample.email;
  const phoneVal = hasPhone ? data.phone : sample.phone;
  const locationVal = hasLocation 
    ? [data.city, data.state, data.country].filter(Boolean).join(', ') 
    : [sample.city, sample.country].filter(Boolean).join(', ');
  const githubVal = (hasGithub ? data.github_url : sample.github_url)?.replace(/^https?:\/\//, '');
  const linkedinVal = (hasLinkedin ? data.linkedin_url : sample.linkedin_url)?.replace(/^https?:\/\//, '');
  const summaryVal = hasSummary ? data.professional_summary : sample.professional_summary;
  const expList = hasExperiences ? validExperiences : sample.experiences;
  const eduList = hasEducations ? validEducations : sample.educations;
  const projList = hasProjects ? validProjects : (sample.projects || []);
  const skillsList = (hasSkills ? data.skills : sample.skills).split(/[,•\n]/).map(s => s.trim()).filter(Boolean);
  const certList = (hasCertifications ? data.certifications : sample.certifications)?.split('•').map(s => s.trim()).filter(Boolean) || [];

  return (
    <div className="flex flex-col items-center w-full">
      
      {/* Sample Preview Notification Banner */}
      {isAllEmpty && (
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium shadow-2xs animate-fadeIn select-none">
          <Sparkles size={14} className="text-indigo-600" />
          <span>
            {template === 'executive' && 'Executive Word Template (Live Preview). Type in the form to customize.'}
            {template === 'modern' && 'Modern Tech Template (Live Preview). Type in the form to customize.'}
            {template === 'minimal' && 'Minimalist ATS Template (Live Preview). Type in the form to customize.'}
            {template === 'elegant' && 'Classic Elegant Template (Live Preview). Type in the form to customize.'}
            {template === 'compact' && 'Compact 2-Column Template (Live Preview). Type in the form to customize.'}
          </span>
        </div>
      )}

      {/* Scaled Preview Canvas */}
      <div 
        className="transition-transform duration-200 origin-top flex justify-center w-full"
        style={{ transform: `scale(${scale})` }}
      >
        {/* A4 Sheet Container */}
        <div 
          ref={previewRef}
          className="bg-white text-gray-900 shadow-2xl rounded-sm w-[210mm] min-h-[297mm] border border-gray-300/80 flex flex-col justify-between text-left box-border font-sans relative"
          style={{ width: '210mm', minHeight: '297mm' }}
        >

          {/* ========================================================= */}
          {/* TEMPLATE 1: EXECUTIVE WORD STYLE                          */}
          {/* ========================================================= */}
          {template === 'executive' && (
            <div className="flex flex-col flex-1 p-10 md:p-12">
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
                  className="group relative mt-1 mb-3.5 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
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
                  className="group relative mt-1 mb-3.5 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
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
                  className="group relative mt-1 mb-3.5 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
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
                              {exp.description.split('\n').map((line, lIdx) => (
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
                  <section className="group relative mt-1 mb-3.5 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors">
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
                  className="group relative mt-1 mb-2 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
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
                            className={`px-2 py-0.5 rounded border text-[11px] ${
                              hasCertifications 
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
          )}

          {/* ========================================================= */}
          {/* TEMPLATE 2: MODERN CREATIVE TECH                          */}
          {/* ========================================================= */}
          {template === 'modern' && (
            <div className="flex flex-col flex-1 p-10 md:p-12">
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
                  className="group relative mb-5 rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
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
                  className="group relative mb-5 rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
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
                            {exp.description.split('\n').map((line, lIdx) => (
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
                  className="group relative mb-5 rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
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
                  className="group relative mb-4 rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
                >
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" /> Education & Credentials
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {eduList.map((edu, idx) => (
                      <div key={idx} className="bg-gray-50/80 p-2.5 rounded-lg border border-gray-200/60">
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
          )}

          {/* ========================================================= */}
          {/* TEMPLATE 3: MINIMALIST CLEAN ATS                          */}
          {/* ========================================================= */}
          {template === 'minimal' && (
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
                      <div key={idx}>
                        <div className="flex justify-between text-xs font-bold text-gray-950">
                          <span>{exp.job_title} — <span className="font-normal text-gray-700">{exp.company_name}</span></span>
                          <span className="font-mono text-gray-600 text-[11px]">
                            {exp.start_date ? formatDate(exp.start_date) : 'Start'} - {exp.currently_working ? 'Present' : (exp.end_date ? formatDate(exp.end_date) : 'End')}
                          </span>
                        </div>
                        {exp.description && (
                          <div className="text-xs text-gray-700 mt-1 leading-relaxed space-y-0.5 pl-2">
                            {exp.description.split('\n').map((line, lIdx) => (
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
                      <div key={idx} className="flex justify-between text-xs">
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
          )}

          {/* ========================================================= */}
          {/* TEMPLATE 4: ELEGANT SERIF / EXECUTIVE                     */}
          {/* ========================================================= */}
          {template === 'elegant' && (
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
                      <div key={idx}>
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
                            {exp.description.split('\n').map((line, lIdx) => (
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
                      <div key={idx} className="flex justify-between text-xs">
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
          )}

          {/* ========================================================= */}
          {/* TEMPLATE 5: COMPACT TWO-COLUMN TECH                       */}
          {/* ========================================================= */}
          {template === 'compact' && (
            <div className="flex flex-1 min-h-full">
              {/* Left Column Sidebar */}
              <div className="w-[35%] bg-slate-900 text-white p-6 md:p-8 flex flex-col justify-between">
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
              <div className="w-[65%] p-6 md:p-8 flex flex-col justify-between bg-white text-gray-900">
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
                              {exp.description.split('\n').map((line, lIdx) => (
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
          )}

        </div>
      </div>
    </div>
  );
};
