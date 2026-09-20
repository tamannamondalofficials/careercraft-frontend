import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ResumeFormData, Experience } from '@/types/resume.types';
import { Plus, Trash2, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

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

interface ExperienceSectionProps {
  formData: ResumeFormData;
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ formData, setFormData }) => {
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({ 0: true });

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
    setExpandedIndices(prev => ({ ...prev, [nextIndex]: true }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  const toggleExpand = (index: number) => {
    setExpandedIndices(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4 animate-fadeIn text-left">
      <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900">
            Work Experience
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            List your relevant roles in reverse-chronological order (most recent first).
          </p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Plus size={14} /> Add Role
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {formData.experiences.map((exp, index) => {
          const isExpanded = expandedIndices[index] ?? true;
          const displayTitle = exp.job_title && exp.company_name 
            ? `${exp.job_title} at ${exp.company_name}` 
            : exp.job_title || exp.company_name || `Position #${index + 1}`;

          return (
            <div 
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all bg-white hover:border-gray-300"
            >
              {/* Card Header Accordion Toggle */}
              <div 
                onClick={() => toggleExpand(index)}
                className="p-3.5 bg-gray-50/80 hover:bg-gray-100/80 cursor-pointer flex items-center justify-between transition-colors select-none"
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
                    onClick={() => toggleExpand(index)}
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
                      placeholder="e.g. Lead Full Stack Engineer" 
                      value={exp.job_title} 
                      onChange={(e) => handleExperienceChange(index, e)} 
                      required 
                    />
                    <Input 
                      label="Company name" 
                      name="company_name" 
                      placeholder="e.g. Acme Cloud Corp" 
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
                    label="Key achievements & responsibilities" 
                    name="description" 
                    placeholder="• Led squad of 6 engineers delivering microservices with 99.9% uptime.&#10;• Reduced latency by 40% through caching and query optimization." 
                    value={exp.description} 
                    onChange={(e) => handleExperienceChange(index, e)} 
                    rows={4} 
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
        + Add Another Role
      </button>
    </div>
  );
};
