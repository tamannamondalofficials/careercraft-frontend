"use client";

import React, { useState, useEffect } from 'react';
import { ResumeFormData } from '@/types/resume.types';
import { TabKey } from '@/components/resume/ResumeForm';
import { EXECUTIVE_TEMPLATE_SAMPLE } from '@/constants/sampleCV';
import { Sparkles, Download, Lock, ShieldAlert, X } from 'lucide-react';
import {
  ExecutiveTemplate,
  ModernTemplate,
  MinimalTemplate,
  ElegantTemplate,
  CompactTemplate,
  TemplateProps
} from './templates';

interface ResumePreviewProps {
  data: ResumeFormData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
  scale?: number;
  onSelectSection?: (section: TabKey) => void;
  onDownloadClick?: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  data, 
  previewRef, 
  scale = 1,
  onSelectSection,
  onDownloadClick
}) => {
  const [showCopyNotice, setShowCopyNotice] = useState(false);

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

  // Trigger anti-copy warning notice
  const handlePreventCopy = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowCopyNotice(true);
  };

  useEffect(() => {
    if (showCopyNotice) {
      const timer = setTimeout(() => setShowCopyNotice(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showCopyNotice]);

  const templateProps: TemplateProps = {
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
    nameVal: hasName ? data.full_name : sample.full_name,
    titleVal: hasTitle ? data.job_title : sample.job_title,
    emailVal: hasEmail ? data.email : sample.email,
    phoneVal: hasPhone ? data.phone : sample.phone,
    locationVal: hasLocation 
      ? [data.city, data.state, data.country].filter(Boolean).join(', ') 
      : [sample.city, sample.country].filter(Boolean).join(', '),
    githubVal: (hasGithub ? data.github_url : sample.github_url)?.replace(/^https?:\/\//, ''),
    linkedinVal: (hasLinkedin ? data.linkedin_url : sample.linkedin_url)?.replace(/^https?:\/\//, ''),
    summaryVal: hasSummary ? data.professional_summary : sample.professional_summary,
    expList: hasExperiences ? validExperiences : sample.experiences,
    eduList: hasEducations ? validEducations : sample.educations,
    projList: hasProjects ? validProjects : (sample.projects || []),
    skillsList: (hasSkills ? data.skills : sample.skills).split(/[,•\n]/).map(s => s.trim()).filter(Boolean),
    certList: (hasCertifications ? data.certifications : sample.certifications)?.split('•').map(s => s.trim()).filter(Boolean) || [],
  };

  return (
    <div 
      className="flex flex-col items-center w-full relative"
      onCopy={handlePreventCopy}
      onCut={handlePreventCopy}
      onContextMenu={handlePreventCopy}
    >
      {/* Floating Anti-Copy Prompt Banner */}
      {showCopyNotice && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fadeIn max-w-md">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Lock size={16} />
          </div>
          <div className="text-left flex-1">
            <h4 className="text-xs font-bold text-white">Copying text is disabled on preview</h4>
            <p className="text-[11px] text-slate-300 mt-0.5">
              To use your formatted ATS resume, download your free PDF!
            </p>
          </div>
          {onDownloadClick && (
            <button
              onClick={() => {
                setShowCopyNotice(false);
                onDownloadClick();
              }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 shrink-0 transition-colors shadow-xs cursor-pointer"
            >
              <Download size={13} /> Download
            </button>
          )}
          <button
            onClick={() => setShowCopyNotice(false)}
            className="text-slate-400 hover:text-white p-1 rounded-md"
          >
            <X size={14} />
          </button>
        </div>
      )}

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

      {/* Scaled Preview Canvas (Protected from direct text copy) */}
      <div 
        className="flex justify-center items-start w-full select-none overflow-visible"
        style={{
          minHeight: `${Math.round(297 * 3.78 * scale)}px`,
          height: `${Math.round(297 * 3.78 * scale)}px`,
        }}
      >
        <div 
          className="transition-transform duration-200 origin-top flex justify-center select-none"
          style={{ 
            transform: `scale(${scale})`, 
            width: '210mm',
            minHeight: '297mm',
            userSelect: 'none', 
            WebkitUserSelect: 'none' 
          }}
          onDragStart={(e) => e.preventDefault()}
        >
          <div 
            ref={previewRef}
            className="resume-paper bg-white text-gray-900 shadow-2xl rounded-sm w-[210mm] min-h-[297mm] border border-gray-300/80 flex flex-col justify-between text-left box-border font-sans relative select-none pointer-events-auto"
            style={{ width: '210mm', minHeight: '297mm', userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            {template === 'executive' && <ExecutiveTemplate {...templateProps} />}
            {template === 'modern' && <ModernTemplate {...templateProps} />}
            {template === 'minimal' && <MinimalTemplate {...templateProps} />}
            {template === 'elegant' && <ElegantTemplate {...templateProps} />}
            {template === 'compact' && <CompactTemplate {...templateProps} />}
          </div>
        </div>
      </div>
    </div>
  );
};
