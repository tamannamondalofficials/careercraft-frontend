"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ResumeFormData } from '@/types/resume.types';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Download,
  Check
} from 'lucide-react';
import {
  PersonalInfoSection,
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  defaultExperience,
  defaultEducation
} from './form';

export { defaultExperience, defaultEducation };
export type TabKey = 'personal' | 'summary' | 'experience' | 'education' | 'skills';

interface ResumeFormProps {
  formData: ResumeFormData;
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>;
  activeTab?: TabKey;
  setActiveTab?: (tab: TabKey) => void;
  onDownloadClick?: () => void;
  message?: { type: 'success' | 'error', text: string } | null;
}

const TABS: { key: TabKey; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { key: 'personal', label: 'Personal', icon: User },
  { key: 'summary', label: 'Summary', icon: FileText },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'skills', label: 'Skills', icon: Sparkles },
];

export const ResumeForm: React.FC<ResumeFormProps> = ({
  formData,
  setFormData,
  activeTab: controlledTab,
  setActiveTab: setControlledTab,
  onDownloadClick,
  message
}) => {
  const [internalTab, setInternalTab] = useState<TabKey>('personal');
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = setControlledTab ?? setInternalTab;

  // Section completion status
  const isPersonalDone = Boolean(formData.full_name?.trim() && formData.email?.trim());
  const isSummaryDone = Boolean(formData.professional_summary?.trim());
  const isExperienceDone = (formData.experiences || []).some(e => e.company_name?.trim() || e.job_title?.trim());
  const isEducationDone = (formData.educations || []).some(e => e.institution_name?.trim() || e.degree?.trim());

  const skillList = (formData.skills || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const isSkillsDone = skillList.length > 0;

  const completedSections = [isPersonalDone, isSummaryDone, isExperienceDone, isEducationDone, isSkillsDone].filter(Boolean).length;

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const currentTabIndex = TABS.findIndex(t => t.key === activeTab);
  const goToNextTab = () => {
    if (currentTabIndex < TABS.length - 1) {
      setActiveTab(TABS[currentTabIndex + 1].key);
    }
  };

  const goToPrevTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(TABS[currentTabIndex - 1].key);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-gray-900 w-full box-border">

      {/* Optional Feedback Alert */}
      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium border flex items-center gap-2 ${message.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : 'bg-red-50 text-red-800 border-red-200'
          }`}>
          <span>{message.text}</span>
        </div>
      )}

      {/* Progress & Live Tracker */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
          <span>{completedSections} of 5 sections completed</span>
          <span className="text-indigo-600 font-bold">{Math.round((completedSections / 5) * 100)}%</span>
        </div>

        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(completedSections / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Tab Navigation Stepper */}
      <div className="flex items-center gap-1.5 p-1.5 bg-gray-100/90 rounded-2xl border border-gray-200 overflow-x-auto hide-scrollbar">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          let isDone = false;
          if (tab.key === 'personal') isDone = isPersonalDone;
          if (tab.key === 'summary') isDone = isSummaryDone;
          if (tab.key === 'experience') isDone = isExperienceDone;
          if (tab.key === 'education') isDone = isEducationDone;
          if (tab.key === 'skills') isDone = isSkillsDone;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 min-w-[90px] py-2 px-2.5 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${isActive
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
            >
              <Icon size={14} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
              <span>{tab.label}</span>
              {isDone && (
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] shrink-0 font-bold">
                  <Check size={10} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Form Tab Content */}
      <div className="w-full">
        {activeTab === 'personal' && (
          <PersonalInfoSection formData={formData} onChange={handleBasicChange} />
        )}
        {activeTab === 'summary' && (
          <SummarySection
            formData={formData}
            onChange={handleBasicChange}
            onApplyTemplateSummary={(text) => setFormData(prev => ({ ...prev, professional_summary: text }))}
          />
        )}
        {activeTab === 'experience' && (
          <ExperienceSection formData={formData} setFormData={setFormData} />
        )}
        {activeTab === 'education' && (
          <EducationSection formData={formData} setFormData={setFormData} onChange={handleBasicChange} />
        )}
        {activeTab === 'skills' && (
          <SkillsSection formData={formData} setFormData={setFormData} />
        )}
      </div>

      {/* Stepper Navigation Footer Buttons */}
      <div className="flex items-center justify-between pt-2 pb-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={goToPrevTab}
          disabled={currentTabIndex === 0}
          className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl border-gray-300 disabled:opacity-40 cursor-pointer"
        >
          <ArrowLeft size={14} />
          Previous
        </Button>

        {currentTabIndex < TABS.length - 1 ? (
          <Button
            type="button"
            variant="primary"
            onClick={goToNextTab}
            className="flex items-center gap-1.5 text-xs font-semibold px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer"
          >
            Next Section
            <ArrowRight size={14} />
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={onDownloadClick}
            className="flex items-center gap-1.5 text-xs font-semibold px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer"
          >
            <Download size={14} />
            Download Resume
          </Button>
        )}
      </div>

    </div>
  );
};
