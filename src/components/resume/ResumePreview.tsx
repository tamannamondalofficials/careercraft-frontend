"use client";

import React from 'react';
import { ResumeFormData } from '@/types/resume.types';
import { TabKey } from '@/components/resume/ResumeForm';
import { Mail, Phone, MapPin, Globe, Sparkles, Edit3 } from 'lucide-react';

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
  const hasPortfolio = Boolean(data.portfolio_url?.trim());
  const hasSummary = Boolean(data.professional_summary?.trim());
  
  const validExperiences = (data.experiences || []).filter(e => e.company_name?.trim() || e.job_title?.trim());
  const hasExperiences = validExperiences.length > 0;
  
  const validEducations = (data.educations || []).filter(e => e.institution_name?.trim() || e.degree?.trim());
  const hasEducations = validEducations.length > 0;
  
  const hasSkills = Boolean(data.skills?.trim());
  const isAllEmpty = !hasName && !hasTitle && !hasEmail && !hasSummary && !hasExperiences && !hasEducations && !hasSkills;

  // Professional sample placeholders
  const sampleName = "Alex Morgan";
  const sampleTitle = "Senior Full-Stack Engineer";
  const sampleEmail = "alex.morgan@example.com";
  const samplePhone = "+1 (555) 234-5678";
  const sampleLocation = "San Francisco, CA";
  const sampleLinkedin = "linkedin.com/in/alexmorgan";
  const sampleSummary = "Results-driven Senior Full-Stack Engineer with 6+ years of experience designing, architecting, and scaling enterprise web applications and cloud services. Expert in React, TypeScript, Node.js, and microservices architecture with a passion for high performance and clean code.";
  
  const sampleExperiences = [
    {
      job_title: "Lead Frontend Engineer",
      company_name: "TechPulse Innovations",
      company_location: "San Francisco, CA",
      start_date: "2022-03",
      end_date: "",
      currently_working: true,
      description: "• Architected and shipped a high-performance Next.js web application serving 500k+ MAU with 99.9% uptime.\n• Mentored a squad of 6 engineers, introduced automated CI/CD pipelines, and reduced bundle size by 35%.\n• Collaborated cross-functionally with Product & UX teams to deliver 12 major product features on schedule."
    },
    {
      job_title: "Software Engineer",
      company_name: "CloudScale Systems",
      company_location: "Austin, TX",
      start_date: "2019-06",
      end_date: "2022-02",
      currently_working: false,
      description: "• Developed scalable RESTful and GraphQL APIs using Node.js, TypeScript, and PostgreSQL.\n• Improved database query performance by 45% through indexed caching and Redis optimization.\n• Built automated end-to-end integration tests using Cypress and Jest, boosting test coverage to 92%."
    }
  ];

  const sampleEducations = [
    {
      degree: "Bachelor of Science",
      field_of_study: "Computer Science",
      institution_name: "University of California, Berkeley",
      institution_location: "Berkeley, CA",
      start_date: "2015-08",
      end_date: "2019-05",
      currently_studying: false,
      description: "Dean's Honors List • Focus on Distributed Systems, Cloud Architecture & Algorithms"
    }
  ];

  const sampleSkills = "React, Next.js, TypeScript, JavaScript, Node.js, Python, PostgreSQL, Redis, Docker, AWS, GraphQL, Tailwind CSS, CI/CD, Git, Agile/Scrum";

  return (
    <div className="flex flex-col items-center w-full">
      
      {/* Sample Preview Notification Banner (Placed above paper with ample spacing) */}
      {isAllEmpty && (
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium shadow-2xs animate-fadeIn select-none">
          <Sparkles size={14} className="text-indigo-600" />
          <span>Sample preview. Start typing in the form to replace it.</span>
        </div>
      )}

      {/* Scaled Preview Canvas Wrapper */}
      <div 
        className="transition-transform duration-200 origin-top flex justify-center w-full"
        style={{ transform: `scale(${scale})` }}
      >
        {/* A4 Sheet with 40px (p-10 md:p-12) padding and shadow */}
        <div 
          ref={previewRef}
          className="bg-white text-gray-900 shadow-2xl rounded-sm w-[210mm] min-h-[297mm] p-10 md:p-12 border border-gray-300/80 flex flex-col justify-between text-left box-border font-sans relative"
          style={{ width: '210mm', minHeight: '297mm' }}
        >
          {/* Main Content Area */}
          <div className="flex flex-col flex-1">
            
            {/* Header Section */}
            <header 
              onClick={() => onSelectSection?.('personal')}
              className="group relative border-b-2 border-indigo-600 pb-4 mb-4 rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
              title="Click to edit Personal Details"
            >
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 flex items-center gap-1 text-[11px] font-semibold bg-white/90 px-2 py-0.5 rounded shadow-2xs border border-indigo-100">
                <Edit3 size={12} /> Edit
              </div>

              {/* Full black when typed; clean light-grey when sample */}
              <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-1 ${hasName ? 'text-gray-900' : 'text-gray-400 font-normal'}`}>
                {hasName ? data.full_name : sampleName}
              </h1>
              {/* Full indigo when typed; light indigo when sample */}
              <h2 className={`text-base md:text-lg font-semibold mb-2.5 ${hasTitle ? 'text-indigo-600 font-semibold' : 'text-indigo-300 font-normal'}`}>
                {hasTitle ? data.job_title : sampleTitle}
              </h2>

              {/* Contact Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                {(hasEmail || !hasName) && (
                  <span className={`inline-flex items-center gap-1.5 ${hasEmail ? 'text-gray-700 font-medium' : 'text-gray-400 font-normal'}`}>
                    <Mail size={13} className="text-indigo-600 shrink-0" />
                    {hasEmail ? data.email : sampleEmail}
                  </span>
                )}
                {(hasPhone || !hasName) && (
                  <span className={`inline-flex items-center gap-1.5 ${hasPhone ? 'text-gray-700 font-medium' : 'text-gray-400 font-normal'}`}>
                    <Phone size={13} className="text-indigo-600 shrink-0" />
                    {hasPhone ? data.phone : samplePhone}
                  </span>
                )}
                {(hasLocation || !hasName) && (
                  <span className={`inline-flex items-center gap-1.5 ${hasLocation ? 'text-gray-700 font-medium' : 'text-gray-400 font-normal'}`}>
                    <MapPin size={13} className="text-indigo-600 shrink-0" />
                    {hasLocation ? [data.city, data.state, data.country].filter(Boolean).join(', ') : sampleLocation}
                  </span>
                )}
                {(hasLinkedin || !hasName) && (
                  <span className={`inline-flex items-center gap-1.5 ${hasLinkedin ? 'text-gray-700 font-medium' : 'text-gray-400 font-normal'}`}>
                    <svg className="w-3.5 h-3.5 text-indigo-600 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 1 0 .04 3.3 1.66 1.66 0 0 0-.04-3.3Z"/>
                    </svg>
                    {hasLinkedin ? data.linkedin_url.replace(/^https?:\/\//, '') : sampleLinkedin}
                  </span>
                )}
                {hasGithub && (
                  <span className="inline-flex items-center gap-1.5 text-gray-700 font-medium">
                    <svg className="w-3.5 h-3.5 text-indigo-600 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                    </svg>
                    {data.github_url.replace(/^https?:\/\//, '')}
                  </span>
                )}
                {hasPortfolio && (
                  <span className="inline-flex items-center gap-1.5 text-gray-700 font-medium">
                    <Globe size={13} className="text-indigo-600 shrink-0" />
                    {data.portfolio_url.replace(/^https?:\/\//, '')}
                  </span>
                )}
              </div>
            </header>

            {/* Section: Professional Summary (16px spacing above, 6px between heading & content) */}
            <section 
              onClick={() => onSelectSection?.('summary')}
              className="group relative mt-2 mb-4 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
              title="Click to edit Professional Summary"
            >
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 flex items-center gap-1 text-[11px] font-semibold bg-white/90 px-2 py-0.5 rounded shadow-2xs border border-indigo-100">
                <Edit3 size={12} /> Edit
              </div>

              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                Professional Summary
              </h3>
              <p className={`text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${hasSummary ? 'text-gray-800' : 'text-gray-400 font-normal'}`}>
                {hasSummary ? data.professional_summary : sampleSummary}
              </p>
            </section>

            {/* Section: Work Experience (16px spacing above, ~12px between jobs) */}
            <section 
              onClick={() => onSelectSection?.('experience')}
              className="group relative mt-2 mb-4 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
              title="Click to edit Work Experience"
            >
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 flex items-center gap-1 text-[11px] font-semibold bg-white/90 px-2 py-0.5 rounded shadow-2xs border border-indigo-100">
                <Edit3 size={12} /> Edit
              </div>

              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                Work Experience
              </h3>
              
              <div className="flex flex-col gap-3">
                {(hasExperiences ? validExperiences : sampleExperiences).map((exp, index) => {
                  const isSample = !hasExperiences;
                  return (
                    <div key={index} className="break-inside-avoid">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className={`text-sm font-bold ${isSample ? 'text-gray-400 font-normal' : 'text-gray-900 font-bold'}`}>
                          {exp.job_title || 'Job Title'}
                        </h4>
                        <span className={`text-xs font-medium whitespace-nowrap ml-4 ${isSample ? 'text-indigo-300' : 'text-indigo-600 font-semibold'}`}>
                          {exp.start_date ? formatDate(exp.start_date) : 'Start'}
                          {' — '}
                          {exp.currently_working ? 'Present' : (exp.end_date ? formatDate(exp.end_date) : 'End')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-baseline mb-1 text-xs">
                        <span className={`font-normal ${isSample ? 'text-gray-400' : 'text-gray-700 font-medium'}`}>
                          {exp.company_name || 'Company Name'}
                        </span>
                        {exp.company_location && (
                          <span className={isSample ? 'text-gray-300' : 'text-gray-500'}>
                            {exp.company_location}
                          </span>
                        )}
                      </div>

                      {exp.description && (
                        <p className={`text-xs leading-relaxed whitespace-pre-wrap ${isSample ? 'text-gray-400 font-normal' : 'text-gray-800'}`}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section: Education (16px spacing above, ~12px between items) */}
            <section 
              onClick={() => onSelectSection?.('education')}
              className="group relative mt-2 mb-4 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
              title="Click to edit Education"
            >
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 flex items-center gap-1 text-[11px] font-semibold bg-white/90 px-2 py-0.5 rounded shadow-2xs border border-indigo-100">
                <Edit3 size={12} /> Edit
              </div>

              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                Education
              </h3>
              
              <div className="flex flex-col gap-2.5">
                {(hasEducations ? validEducations : sampleEducations).map((edu, index) => {
                  const isSample = !hasEducations;
                  return (
                    <div key={index} className="break-inside-avoid">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className={`text-sm font-bold ${isSample ? 'text-gray-400 font-normal' : 'text-gray-900'}`}>
                          {edu.degree || 'Degree'} {edu.field_of_study ? `in ${edu.field_of_study}` : ''}
                        </h4>
                        <span className={`text-xs whitespace-nowrap ml-4 ${isSample ? 'text-indigo-300' : 'text-indigo-600 font-semibold'}`}>
                          {edu.start_date ? formatDate(edu.start_date) : 'Start'}
                          {' — '}
                          {edu.currently_studying ? 'Present' : (edu.end_date ? formatDate(edu.end_date) : 'End')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-baseline text-xs text-gray-600">
                        <span className={isSample ? 'text-gray-400' : 'text-gray-700 font-medium'}>
                          {edu.institution_name || 'School / University'}
                        </span>
                        {edu.institution_location && (
                          <span className={isSample ? 'text-gray-300' : 'text-gray-500'}>
                            {edu.institution_location}
                          </span>
                        )}
                      </div>

                      {edu.description && (
                        <p className={`text-xs leading-relaxed mt-1 ${isSample ? 'text-gray-400 font-normal' : 'text-gray-700'}`}>
                          {edu.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section: Skills (8px gap between chips) */}
            <section 
              onClick={() => onSelectSection?.('skills')}
              className="group relative mt-2 mb-2 break-inside-avoid rounded-lg p-2 -m-2 hover:bg-indigo-50/20 transition-colors cursor-pointer"
              title="Click to edit Skills"
            >
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 flex items-center gap-1 text-[11px] font-semibold bg-white/90 px-2 py-0.5 rounded shadow-2xs border border-indigo-100">
                <Edit3 size={12} /> Edit
              </div>

              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                Skills & Competencies
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {(hasSkills ? data.skills : sampleSkills)
                  .split(/[,•\n]/)
                  .map(s => s.trim())
                  .filter(Boolean)
                  .map((skill, i) => (
                    <span 
                      key={i} 
                      className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
                        hasSkills 
                          ? 'bg-gray-50 text-gray-800 border-gray-200' 
                          : 'bg-gray-50/70 text-gray-400 border-gray-100'
                      }`}
                    >
                      {skill}
                    </span>
                  ))
                }
              </div>
            </section>
          </div>

          {/* Subtle Page Footer (Makes A4 page feel complete and intentional) */}
          <footer className="pt-6 mt-auto border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 select-none">
            <span>{data.full_name ? `${data.full_name} • Resume` : 'Resume Preview'}</span>
            <span>Page 1 of 1</span>
          </footer>


        </div>
      </div>
    </div>
  );
};
