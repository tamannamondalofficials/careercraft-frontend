import React from 'react';
import { Input } from '@/components/ui/Input';
import { ResumeFormData } from '@/types/resume.types';

interface PersonalInfoSectionProps {
  formData: ResumeFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ formData, onChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4 animate-fadeIn text-left">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">
          Personal Details
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          This information will be prominently displayed at the top of your resume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
        <Input 
          label="Full name" 
          name="full_name" 
          placeholder="e.g. Alex Morgan" 
          value={formData.full_name} 
          onChange={onChange} 
          required 
        />
        <Input 
          label="Target job title" 
          name="job_title" 
          placeholder="e.g. Senior Full Stack Developer" 
          value={formData.job_title} 
          onChange={onChange} 
          required 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
        <Input 
          label="Email address" 
          name="email" 
          type="email" 
          placeholder="e.g. alex.morgan@example.com" 
          value={formData.email} 
          onChange={onChange} 
          required 
        />
        <Input 
          label="Phone number" 
          name="phone" 
          placeholder="e.g. +1 (555) 234-5678" 
          value={formData.phone} 
          onChange={onChange} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1">
        <Input 
          label="City" 
          name="city" 
          placeholder="e.g. San Francisco" 
          value={formData.city} 
          onChange={onChange} 
        />
        <Input 
          label="State / Province" 
          name="state" 
          placeholder="e.g. CA" 
          value={formData.state} 
          onChange={onChange} 
        />
        <Input 
          label="Country" 
          name="country" 
          placeholder="e.g. United States" 
          value={formData.country} 
          onChange={onChange} 
        />
      </div>

      <div className="border-t border-gray-100 pt-4 mt-2">
        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
          Online Presence & Links (Optional)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
          <Input 
            label="LinkedIn URL" 
            name="linkedin_url" 
            placeholder="e.g. linkedin.com/in/alexmorgan" 
            value={formData.linkedin_url} 
            onChange={onChange} 
          />
          <Input 
            label="GitHub URL" 
            name="github_url" 
            placeholder="e.g. github.com/alexmorgan-dev" 
            value={formData.github_url} 
            onChange={onChange} 
          />
        </div>
      </div>
    </div>
  );
};
