"use client";

import React from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { ResumeFormData, Experience } from '@/types/resume.types';

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

interface ResumeFormProps {
  formData: ResumeFormData;
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  message: { type: 'success' | 'error', text: string } | null;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  message
}) => {
  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { ...defaultExperience, display_order: prev.experiences.length }]
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8 w-full">
      {message && (
        <div className={`p-4 rounded-xl mb-2 text-sm font-medium flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          <div className="flex-1">{message.text}</div>
        </div>
      )}

      {/* Personal Information Section */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">Personal Details</h3>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2">
          <Input label="Full Name" name="full_name" placeholder="E.g. Jane Doe" value={formData.full_name} onChange={handleBasicChange} required />
          <Input label="Job Title" name="job_title" placeholder="E.g. Senior Product Designer" value={formData.job_title} onChange={handleBasicChange} required />
          <Input label="Email Address" name="email" type="email" placeholder="jane@example.com" value={formData.email} onChange={handleBasicChange} required />
          <Input label="Phone Number" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleBasicChange} />
        </div>
      </section>

      {/* Location & Links Section */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">Location & Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-2">
          <Input label="City" name="city" placeholder="San Francisco" value={formData.city} onChange={handleBasicChange} />
          <Input label="State" name="state" placeholder="CA" value={formData.state} onChange={handleBasicChange} />
          <Input label="Country" name="country" placeholder="United States" value={formData.country} onChange={handleBasicChange} />
          <Input label="LinkedIn URL" name="linkedin_url" placeholder="linkedin.com/in/janedoe" value={formData.linkedin_url} onChange={handleBasicChange} />
          <Input label="GitHub URL" name="github_url" placeholder="github.com/janedoe" value={formData.github_url} onChange={handleBasicChange} />
          <Input label="Portfolio URL" name="portfolio_url" placeholder="janedoe.com" value={formData.portfolio_url} onChange={handleBasicChange} />
        </div>
      </section>

      {/* Summary Section */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">Professional Summary</h3>
        <Textarea 
          label="Summary" 
          name="professional_summary" 
          placeholder="A brief overview of your professional background, key strengths, and career goals..." 
          value={formData.professional_summary} 
          onChange={handleBasicChange} 
          required 
        />
      </section>

      {/* Experience Section */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <h3 className="text-xl font-bold text-gray-900">Work Experience</h3>
          <Button type="button" variant="outline" size="sm" onClick={addExperience} className="text-sm rounded-lg px-4 border border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white transition-all">
            + Add Role
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          {formData.experiences.map((exp, index) => (
            <div key={index} className="group relative p-6 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors shadow-inner">
              
              {formData.experiences.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeExperience(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Remove Experience"
                  title="Remove Experience"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              )}
              
              <div className="grid grid-cols-1 gap-x-6 gap-y-2 mt-2">
                <Input label="Job Title" name="job_title" placeholder="E.g. Lead Developer" value={exp.job_title} onChange={(e) => handleExperienceChange(index, e)} required />
                <Input label="Company Name" name="company_name" placeholder="E.g. Acme Corp" value={exp.company_name} onChange={(e) => handleExperienceChange(index, e)} required />
                <Input label="Location" name="company_location" placeholder="E.g. Remote" value={exp.company_location} onChange={(e) => handleExperienceChange(index, e)} />
                
                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-sm font-semibold text-gray-500 tracking-wide uppercase text-xs">Employment Type</label>
                  <select 
                    name="employment_type" 
                    value={exp.employment_type} 
                    onChange={(e) => handleExperienceChange(index, e as any)}
                    className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent transition-all shadow-sm"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-2">
                <Input label="Start Date" name="start_date" type="date" value={exp.start_date} onChange={(e) => handleExperienceChange(index, e)} required />
                <div className="flex flex-col gap-2">
                  <Input 
                    label="End Date" 
                    name="end_date" 
                    type="date" 
                    value={exp.end_date} 
                    onChange={(e) => handleExperienceChange(index, e)} 
                    disabled={exp.currently_working} 
                    required={!exp.currently_working}
                    className={exp.currently_working ? 'opacity-50' : ''}
                  />
                  <label className="flex items-center gap-3 text-sm cursor-pointer mt-[-10px] mb-2 px-1 text-gray-600">
                    <input 
                      type="checkbox" 
                      name="currently_working" 
                      checked={exp.currently_working} 
                      onChange={(e) => handleExperienceChange(index, e)} 
                      className="w-4 h-4 rounded border-gray-300 text-[color:var(--primary)] focus:ring-[color:var(--primary)]"
                    />
                    <span className="font-medium">I currently work here</span>
                  </label>
                </div>
              </div>

              <Textarea 
                label="Role Description" 
                name="description" 
                placeholder="Highlight your impact, metrics, and technologies used..." 
                value={exp.description} 
                onChange={(e) => handleExperienceChange(index, e)} 
                required 
              />
            </div>
          ))}
        </div>
      </section>

      <div className="pt-4 mb-20 md:mb-0">
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isLoading} 
          className="w-full py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all bg-indigo-600 hover:bg-indigo-700"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : 'Save Details'}
        </Button>
      </div>
    </form>
  );
};
