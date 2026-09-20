"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { ResumeFormData, Experience, Education } from '@/types/resume.types';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Download,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';

export const defaultExperience: Experience = {
  company_name: '',
  company_location: '',
  company_url: '',
  job_title: '',
  employment_type: 'Full-time',
  start_date: '',
  end_date: '',
  currently_working: false,
  description: '',
  display_order: 0,
};

export const defaultEducation: Education = {
  institution_name: '',
  institution_location: '',
  degree: '',
  field_of_study: '',
  start_date: '',
  end_date: '',
  currently_studying: false,
  description: '',
  display_order: 0,
};

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

const SUGGESTED_SKILLS: Record<string, string[]> = {
  default: ['Project Management', 'Problem Solving', 'Leadership', 'Team Collaboration', 'Communication', 'Agile/Scrum', 'Git', 'Data Analysis', 'Time Management'],
  software: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Next.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'REST APIs', 'GraphQL', 'Tailwind CSS', 'Git', 'CI/CD'],
  design: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Adobe XD', 'Illustrator', 'Design Thinking', 'Usability Testing'],
  product: ['Product Strategy', 'Roadmapping', 'User Stories', 'Agile / Scrum', 'Data Analytics', 'A/B Testing', 'Stakeholder Management', 'Market Research', 'Jira'],
  marketing: ['SEO', 'Content Strategy', 'Google Analytics', 'Email Marketing', 'Copywriting', 'Social Media Marketing', 'Growth Marketing', 'HubSpot', 'Campaign Management'],
  data: ['Python', 'SQL', 'Pandas', 'NumPy', 'Machine Learning', 'Tableau', 'Power BI', 'Data Visualization', 'R', 'BigQuery', 'Statistical Analysis']
};

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

  const [expandedExperiences, setExpandedExperiences] = useState<Record<number, boolean>>({ 0: true });
  const [expandedEducations, setExpandedEducations] = useState<Record<number, boolean>>({ 0: true });
  const [skillInput, setSkillInput] = useState('');
  const [skillError, setSkillError] = useState<string | null>(null);

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

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => {
      const newExperiences = [...prev.experiences];
      newExperiences[index] = {
        ...newExperiences[index],
        [name]: type === 'checkbox' ? checked : value
      };
      return { ...prev, experiences: newExperiences };
    });
  };

  const addExperience = () => {
    const nextIndex = formData.experiences.length;
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { ...defaultExperience, display_order: nextIndex }]
    }));
    setExpandedExperiences(prev => ({ ...prev, [nextIndex]: true }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  const toggleExpandExp = (index: number) => {
    setExpandedExperiences(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => {
      const newEducations = [...(prev.educations || [])];
      newEducations[index] = {
        ...newEducations[index],
        [name]: type === 'checkbox' ? checked : value
      };
      return { ...prev, educations: newEducations };
    });
  };

  const addEducation = () => {
    const currentEd = formData.educations || [];
    const nextIndex = currentEd.length;
    setFormData(prev => ({
      ...prev,
      educations: [...currentEd, { ...defaultEducation, display_order: nextIndex }]
    }));
    setExpandedEducations(prev => ({ ...prev, [nextIndex]: true }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      educations: (prev.educations || []).filter((_, i) => i !== index)
    }));
  };

  const toggleExpandEdu = (index: number) => {
    setExpandedEducations(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Skill tag input with validation & keyboard backspace support
  const addSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    setSkillError(null);
    if (!trimmed) return;
    
    if (skillList.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setSkillError(`"${trimmed}" is already added.`);
      return;
    }

    const updated = [...skillList, trimmed];
    setFormData(prev => ({ ...prev, skills: updated.join(', ') }));
    setSkillInput('');
  };

  const removeSkill = (index: number) => {
    const updated = skillList.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, skills: updated.join(', ') }));
    setSkillError(null);
  };

  const moveSkill = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= skillList.length) return;
    
    const updated = [...skillList];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setFormData(prev => ({ ...prev, skills: updated.join(', ') }));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInput);
    } else if (e.key === 'Backspace' && !skillInput && skillList.length > 0) {
      removeSkill(skillList.length - 1);
    }
  };

  const getRelevantSuggestions = () => {
    const title = (formData.job_title || '').toLowerCase();
    if (title.includes('software') || title.includes('developer') || title.includes('engineer') || title.includes('frontend') || title.includes('backend') || title.includes('full stack')) {
      return SUGGESTED_SKILLS.software;
    }
    if (title.includes('design') || title.includes('ux') || title.includes('ui') || title.includes('product designer')) {
      return SUGGESTED_SKILLS.design;
    }
    if (title.includes('product') || title.includes('manager') || title.includes('project')) {
      return SUGGESTED_SKILLS.product;
    }
    if (title.includes('market') || title.includes('seo') || title.includes('content') || title.includes('growth')) {
      return SUGGESTED_SKILLS.marketing;
    }
    if (title.includes('data') || title.includes('analyst') || title.includes('ml') || title.includes('ai')) {
      return SUGGESTED_SKILLS.data;
    }
    return SUGGESTED_SKILLS.default;
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

  const getTabStatus = (key: TabKey) => {
    switch (key) {
      case 'personal': return isPersonalDone;
      case 'summary': return isSummaryDone;
      case 'experience': return isExperienceDone;
      case 'education': return isEducationDone;
      case 'skills': return isSkillsDone;
    }
  };

  const hasJobTitle = Boolean(formData.job_title?.trim());

  return (
    <div className="w-full flex flex-col gap-4 box-border">
      
      {/* 2. Progress Bar & Tabs Container (Clear 6px tall progress track) */}
      <div className="flex flex-col bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        {/* Progress summary line */}
        <div className="flex items-center justify-between px-1 text-xs mb-2">
          <span className="font-semibold text-gray-700">
            {completedSections} of 5 sections completed
          </span>
          <span className="text-gray-500 font-medium">
            {Math.round((completedSections / 5) * 100)}%
          </span>
        </div>
        
        {/* Visible 6px Progress Bar with grey track and indigo fill */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-3 border border-gray-200/80">
          <div 
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(completedSections / 5) * 100}%` }}
          />
        </div>

        {/* Tab Row (8px padding inside, 12px px on each tab, horizontal scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar p-2 bg-gray-50/70 rounded-xl">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            const isDone = getTabStatus(tab.key);

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-white text-indigo-600 font-semibold shadow-2xs ring-1 ring-gray-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                <span>{tab.label}</span>
                {isDone ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <div className="flex-1">{message.text}</div>
        </div>
      )}

      {/* Tab 1: Personal Details */}
      {activeTab === 'personal' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="text-left border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Personal details
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Provide your contact details so employers can easily reach you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
              <Input 
                label="Full name" 
                name="full_name" 
                placeholder="e.g. Jane Doe" 
                value={formData.full_name} 
                onChange={handleBasicChange} 
                required 
              />
              <Input 
                label="Job title" 
                name="job_title" 
                placeholder="e.g. Senior Software Engineer" 
                value={formData.job_title} 
                onChange={handleBasicChange} 
                required 
              />
              <Input 
                label="Email address" 
                name="email" 
                type="email" 
                placeholder="e.g. jane.doe@example.com" 
                value={formData.email} 
                onChange={handleBasicChange} 
                required 
              />
              <Input 
                label="Phone number" 
                name="phone" 
                type="tel"
                placeholder="e.g. +1 (555) 019-2834" 
                value={formData.phone} 
                onChange={handleBasicChange} 
              />
            </div>

            <div className="border-t border-gray-100 pt-5 mt-5">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-left">
                Location & Profiles
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-1 mb-1">
                <Input 
                  label="City" 
                  name="city" 
                  placeholder="e.g. San Francisco" 
                  value={formData.city} 
                  onChange={handleBasicChange} 
                />
                <Input 
                  label="State / Province" 
                  name="state" 
                  placeholder="e.g. CA" 
                  value={formData.state} 
                  onChange={handleBasicChange} 
                />
                <Input 
                  label="Country" 
                  name="country" 
                  placeholder="e.g. United States" 
                  value={formData.country} 
                  onChange={handleBasicChange} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-1">
                <Input 
                  label="LinkedIn URL" 
                  name="linkedin_url" 
                  placeholder="linkedin.com/in/janedoe" 
                  value={formData.linkedin_url} 
                  onChange={handleBasicChange} 
                />
                <Input 
                  label="GitHub URL" 
                  name="github_url" 
                  placeholder="github.com/janedoe" 
                  value={formData.github_url} 
                  onChange={handleBasicChange} 
                />
                <Input 
                  label="Portfolio URL" 
                  name="portfolio_url" 
                  placeholder="janedoe.com" 
                  value={formData.portfolio_url} 
                  onChange={handleBasicChange} 
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Professional Summary */}
      {activeTab === 'summary' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="text-left border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Professional summary
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Write 2-4 concise sentences highlighting your strengths and achievements.
              </p>
            </div>
            
            <Textarea 
              label="Summary" 
              name="professional_summary" 
              placeholder="Results-driven Software Engineer with 5+ years of experience designing scalable web applications and distributed cloud systems..." 
              value={formData.professional_summary} 
              onChange={handleBasicChange} 
              rows={6}
              required 
            />

            <div className="mt-3 p-3.5 md:p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-left flex items-start gap-3">
              <Lightbulb size={18} className="text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-xs text-indigo-900 leading-relaxed">
                <strong>Pro Tip:</strong> Highlight your top technical specializations and measurable impact (e.g. &quot;boosted platform efficiency by 35%&quot;).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Work Experience */}
      {activeTab === 'experience' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <div className="text-left border-b border-gray-100 pb-3">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Work experience
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                List your work history starting with your latest position.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {formData.experiences.map((exp, index) => {
                const isExpanded = expandedExperiences[index] ?? true;
                const displayTitle = exp.job_title || exp.company_name 
                  ? `${exp.job_title || 'Role'} ${exp.company_name ? `@ ${exp.company_name}` : ''}`
                  : `Role #${index + 1}`;

                return (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden transition-all"
                  >
                    <div 
                      onClick={() => toggleExpandExp(index)}
                      className="flex items-center justify-between px-4 py-3 bg-gray-50/80 hover:bg-gray-100/70 cursor-pointer select-none border-b border-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-semibold text-gray-900">{displayTitle}</h4>
                          <span className="text-xs text-gray-500">
                            {exp.start_date ? exp.start_date : 'Start'} — {exp.currently_working ? 'Present' : (exp.end_date || 'End')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        {formData.experiences.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeExperience(index)}
                            className="text-gray-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remove role"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleExpandExp(index)}
                          className="text-gray-500 hover:text-gray-800 p-1 rounded-lg hover:bg-gray-200/60 transition-colors cursor-pointer"
                          aria-label="Toggle role details"
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 flex flex-col gap-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
                          <Input 
                            label="Job title" 
                            name="job_title" 
                            placeholder="e.g. Lead Frontend Engineer" 
                            value={exp.job_title} 
                            onChange={(e) => handleExperienceChange(index, e)} 
                            required 
                          />
                          <Input 
                            label="Company name" 
                            name="company_name" 
                            placeholder="e.g. Acme Corp" 
                            value={exp.company_name} 
                            onChange={(e) => handleExperienceChange(index, e)} 
                            required 
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
                          <Input 
                            label="Location" 
                            name="company_location" 
                            placeholder="e.g. San Francisco, CA (or Remote)" 
                            value={exp.company_location} 
                            onChange={(e) => handleExperienceChange(index, e)} 
                          />
                          
                          <div className="w-full flex flex-col items-start mb-3">
                            <label className="text-xs md:text-sm font-medium text-gray-700 text-left mb-1">
                              Employment type
                            </label>
                            <select 
                              name="employment_type" 
                              value={exp.employment_type || 'Full-time'} 
                              onChange={(e) => handleExperienceChange(index, e)}
                              className="w-full h-10 px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer"
                            >
                              <option value="Full-time">Full-time</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Contract">Contract</option>
                              <option value="Freelance">Freelance</option>
                              <option value="Internship">Internship</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
                          <Input 
                            label="Start date" 
                            name="start_date" 
                            type="month" 
                            value={exp.start_date} 
                            onChange={(e) => handleExperienceChange(index, e)} 
                            required 
                          />
                          
                          <div className="flex flex-col">
                            <Input 
                              label="End date" 
                              name="end_date" 
                              type="month" 
                              value={exp.end_date} 
                              onChange={(e) => handleExperienceChange(index, e)} 
                              disabled={exp.currently_working} 
                              required={!exp.currently_working}
                            />
                            <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer -mt-1 select-none">
                              <input 
                                type="checkbox" 
                                name="currently_working" 
                                checked={exp.currently_working || false} 
                                onChange={(e) => handleExperienceChange(index, e)} 
                                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span>I currently work here</span>
                            </label>
                          </div>
                        </div>

                        <Textarea 
                          label="Key achievements & bullet points" 
                          name="description" 
                          placeholder="• Architected Next.js web application serving 500k+ MAU with 99.9% uptime&#10;• Led squad of 6 engineers and reduced bundle size by 35%" 
                          value={exp.description} 
                          onChange={(e) => handleExperienceChange(index, e)} 
                          rows={4}
                          required 
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button 
              type="button" 
              onClick={addExperience} 
              className="w-full py-3 px-4 border-2 border-dashed border-gray-300 hover:border-indigo-600 rounded-xl text-gray-700 hover:text-indigo-600 font-semibold text-sm flex items-center justify-center gap-2 bg-gray-50/50 hover:bg-indigo-50/30 transition-all cursor-pointer"
            >
              <Plus size={16} />
              + Add Role
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Education */}
      {activeTab === 'education' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <div className="text-left border-b border-gray-100 pb-3">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Education
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Add your degrees, certifications, or academic background.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {(formData.educations || []).map((edu, index) => {
                const isExpanded = expandedEducations[index] ?? true;
                const displayTitle = edu.degree || edu.institution_name
                  ? `${edu.degree || 'Degree'} ${edu.institution_name ? `@ ${edu.institution_name}` : ''}`
                  : `Education #${index + 1}`;

                return (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden transition-all"
                  >
                    <div 
                      onClick={() => toggleExpandEdu(index)}
                      className="flex items-center justify-between px-4 py-3 bg-gray-50/80 hover:bg-gray-100/70 cursor-pointer select-none border-b border-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-semibold text-gray-900">{displayTitle}</h4>
                          <span className="text-xs text-gray-500">
                            {edu.start_date ? edu.start_date : 'Start'} — {edu.currently_studying ? 'Present' : (edu.end_date || 'End')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button 
                          type="button" 
                          onClick={() => removeEducation(index)}
                          className="text-gray-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove education"
                        >
                          <Trash2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleExpandEdu(index)}
                          className="text-gray-500 hover:text-gray-800 p-1 rounded-lg hover:bg-gray-200/60 transition-colors cursor-pointer"
                          aria-label="Toggle education details"
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 flex flex-col gap-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
                          <Input 
                            label="School / University" 
                            name="institution_name" 
                            placeholder="e.g. Stanford University" 
                            value={edu.institution_name} 
                            onChange={(e) => handleEducationChange(index, e)} 
                            required 
                          />
                          <Input 
                            label="Degree" 
                            name="degree" 
                            placeholder="e.g. Bachelor of Science" 
                            value={edu.degree} 
                            onChange={(e) => handleEducationChange(index, e)} 
                            required 
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
                          <Input 
                            label="Field of study" 
                            name="field_of_study" 
                            placeholder="e.g. Computer Science" 
                            value={edu.field_of_study} 
                            onChange={(e) => handleEducationChange(index, e)} 
                          />
                          <Input 
                            label="Location" 
                            name="institution_location" 
                            placeholder="e.g. Stanford, CA" 
                            value={edu.institution_location} 
                            onChange={(e) => handleEducationChange(index, e)} 
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
                          <Input 
                            label="Start date" 
                            name="start_date" 
                            type="month" 
                            value={edu.start_date} 
                            onChange={(e) => handleEducationChange(index, e)} 
                          />
                          <div className="flex flex-col">
                            <Input 
                              label="Graduation / End date" 
                              name="end_date" 
                              type="month" 
                              value={edu.end_date} 
                              onChange={(e) => handleEducationChange(index, e)} 
                              disabled={edu.currently_studying} 
                            />
                            <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer -mt-1 select-none">
                              <input 
                                type="checkbox" 
                                name="currently_studying" 
                                checked={edu.currently_studying || false} 
                                onChange={(e) => handleEducationChange(index, e)} 
                                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span>I am currently enrolled</span>
                            </label>
                          </div>
                        </div>

                        <Textarea 
                          label="Honors & activities (optional)" 
                          name="description" 
                          placeholder="e.g. GPA 3.9/4.0, Dean's Honor List, Relevant coursework: Distributed Systems, Cloud Architecture" 
                          value={edu.description} 
                          onChange={(e) => handleEducationChange(index, e)} 
                          rows={3}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button 
              type="button" 
              onClick={addEducation} 
              className="w-full py-3 px-4 border-2 border-dashed border-gray-300 hover:border-indigo-600 rounded-xl text-gray-700 hover:text-indigo-600 font-semibold text-sm flex items-center justify-center gap-2 bg-gray-50/50 hover:bg-indigo-50/30 transition-all cursor-pointer"
            >
              <Plus size={16} />
              + Add Education
            </button>
          </div>
        </div>
      )}

      {/* Tab 5: Skills Tag Input & Suggestions */}
      {activeTab === 'skills' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <div className="text-left border-b border-gray-100 pb-3">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Skills & competencies
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Add skills as interactive tags. Type a skill and press <strong>Enter</strong> or comma.
              </p>
            </div>

            {/* Tag Input Field */}
            <div className="flex flex-col items-start gap-1">
              <label className="text-xs md:text-sm font-medium text-gray-700 text-left">
                Add skills
              </label>
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => {
                    setSkillInput(e.target.value);
                    if (skillError) setSkillError(null);
                  }}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="e.g. TypeScript, React, System Design... (Press Enter)"
                  className="flex-1 h-10 px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all"
                />
                <Button
                  type="button"
                  onClick={() => addSkill(skillInput)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 h-10 rounded-lg text-sm font-medium shrink-0 cursor-pointer"
                >
                  <Plus size={16} />
                  Add
                </Button>
              </div>
              {skillError && (
                <span className="text-xs text-red-500 font-medium mt-1">{skillError}</span>
              )}
            </div>

            {/* Active Skills Tag Chips */}
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Your Skills ({skillList.length})
                </span>
                {skillList.length > 0 && (
                  <span className="text-[11px] text-gray-400">
                    Use arrows to reorder • Backspace to delete
                  </span>
                )}
              </div>

              {skillList.length === 0 ? (
                <div className="py-4 px-3 border-2 border-dashed border-gray-200 rounded-xl text-center text-xs text-gray-400">
                  No skills added yet. Type above or click suggested chips below.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50/70 border border-gray-200 rounded-xl min-h-[50px]">
                  {skillList.map((skill, index) => (
                    <div 
                      key={index}
                      className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-indigo-300 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-lg shadow-2xs group transition-all"
                    >
                      <span>{skill}</span>
                      
                      <div className="flex items-center gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => moveSkill(index, 'up')}
                            className="text-gray-400 hover:text-indigo-600 p-0.5 cursor-pointer"
                            title="Move left"
                            aria-label={`Move ${skill} left`}
                          >
                            <ArrowLeft size={11} />
                          </button>
                        )}
                        {index < skillList.length - 1 && (
                          <button
                            type="button"
                            onClick={() => moveSkill(index, 'down')}
                            className="text-gray-400 hover:text-indigo-600 p-0.5 cursor-pointer"
                            title="Move right"
                            aria-label={`Move ${skill} right`}
                          >
                            <ArrowRight size={11} />
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-gray-400 hover:text-red-500 ml-1 p-0.5 cursor-pointer transition-colors"
                        title="Remove skill"
                        aria-label={`Remove ${skill}`}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Gentle warning if skill count > 15 */}
              {skillList.length > 15 && (
                <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
                  <AlertTriangle size={14} className="text-amber-600 shrink-0" />
                  <span>Tip: ATS scanners recommend keeping to 8–15 targeted skills so your resume stays punchy.</span>
                </div>
              )}
            </div>

            {/* Suggested Skills (Dynamic Role Header) */}
            <div className="flex flex-col gap-2 text-left border-t border-gray-100 pt-3.5">
              <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Sparkles size={14} className="text-indigo-600" />
                {hasJobTitle 
                  ? `Suggested for "${formData.job_title}":` 
                  : 'Suggested Skills (Click to add):'
                }
              </span>
              <div className="flex flex-wrap gap-2">
                {getRelevantSuggestions()
                  .filter(s => !skillList.some(userSkill => userSkill.toLowerCase() === s.toLowerCase()))
                  .map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => addSkill(s)}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={12} className="text-indigo-500" />
                      {s}
                    </button>
                  ))}
              </div>
            </div>

            {/* ATS Guidance Box */}
            <div className="p-3.5 md:p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-left flex items-start gap-3">
              <Lightbulb size={18} className="text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-950 leading-relaxed space-y-1">
                <p><strong>ATS Best Practice:</strong> Aim for <strong>8 to 12 targeted skills</strong> directly matching the job description.</p>
                <p className="text-indigo-800">Mix technical skills (languages, tools) with organizational competencies.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Bottom Buttons Row */}
      <div className="flex items-center justify-between pt-2">
        {currentTabIndex > 0 ? (
          <Button 
            type="button" 
            variant="outline" 
            onClick={goToPrevTab}
            className="flex items-center gap-2 h-11 px-5 text-sm font-semibold rounded-xl cursor-pointer"
          >
            <ArrowLeft size={16} />
            Previous: {TABS[currentTabIndex - 1].label}
          </Button>
        ) : <div />}

        {currentTabIndex < TABS.length - 1 ? (
          <Button 
            type="button" 
            variant="primary" 
            onClick={goToNextTab}
            className="flex items-center gap-2 h-11 px-5 text-sm font-semibold rounded-xl ml-auto bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm hover:shadow"
          >
            Next: {TABS[currentTabIndex + 1].label}
            <ArrowRight size={16} />
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={onDownloadClick}
            className="flex items-center gap-2 h-11 px-5 text-sm font-semibold rounded-xl ml-auto bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm hover:shadow"
          >
            <Download size={16} />
            Review & Download PDF
          </Button>
        )}
      </div>
    </div>
  );
};
