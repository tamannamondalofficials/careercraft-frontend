import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ResumeFormData, Education } from '@/types/resume.types';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

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

interface EducationSectionProps {
  formData: ResumeFormData;
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ formData, setFormData, onChange }) => {
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({ 0: true });

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
    setExpandedIndices(prev => ({ ...prev, [nextIndex]: true }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      educations: (prev.educations || []).filter((_, i) => i !== index)
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
            Education & Certifications
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Add degrees, schools, GPA / honors, and professional certificates.
          </p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Plus size={14} /> Add Degree
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {(formData.educations || []).map((edu, index) => {
          const isExpanded = expandedIndices[index] ?? true;
          const displayTitle = edu.degree && edu.institution_name 
            ? `${edu.degree} - ${edu.institution_name}` 
            : edu.degree || edu.institution_name || `Education #${index + 1}`;

          return (
            <div 
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all bg-white hover:border-gray-300"
            >
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
                      {edu.start_date ? edu.start_date : 'Start'} — {edu.currently_studying ? 'Present' : (edu.end_date || 'End')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  {(formData.educations || []).length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeEducation(index)}
                      className="text-gray-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove degree"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleExpand(index)}
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
                      label="Degree / Major" 
                      name="degree" 
                      placeholder="e.g. B.S. in Computer Science" 
                      value={edu.degree} 
                      onChange={(e) => handleEducationChange(index, e)} 
                      required 
                    />
                    <Input 
                      label="Institution / University" 
                      name="institution_name" 
                      placeholder="e.g. UC Berkeley" 
                      value={edu.institution_name} 
                      onChange={(e) => handleEducationChange(index, e)} 
                      required 
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

      {/* Certifications Input */}
      <div className="border-t border-gray-100 pt-4 mt-2 text-left">
        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
          Certifications & Badges (Optional)
        </h4>
        <Input 
          label="Certifications list" 
          name="certifications" 
          placeholder="e.g. ✓ AWS Certified Solutions Architect • ✓ Meta Frontend Specialist" 
          value={formData.certifications || ''} 
          onChange={onChange} 
        />
      </div>
    </div>
  );
};
