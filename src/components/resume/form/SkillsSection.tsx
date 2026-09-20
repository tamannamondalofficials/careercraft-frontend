import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ResumeFormData } from '@/types/resume.types';
import { INDUSTRY_CATEGORIES, detectIndustrySkills } from '@/constants/skills';
import { Plus, X, ArrowLeft, ArrowRight, Sparkles, Lightbulb, AlertTriangle } from 'lucide-react';

interface SkillsSectionProps {
  formData: ResumeFormData;
  setFormData: React.Dispatch<React.SetStateAction<ResumeFormData>>;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ formData, setFormData }) => {
  const [skillInput, setSkillInput] = useState('');
  const [skillError, setSkillError] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('auto');

  const skillList = (formData.skills || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const addSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim().replace(/^[,•\s]+|[,•\s]+$/g, '');
    if (!trimmed) return;
    
    if (skillList.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setSkillError(`"${trimmed}" has already been added.`);
      return;
    }

    const updated = [...skillList, trimmed];
    setFormData(prev => ({ ...prev, skills: updated.join(', ') }));
    setSkillInput('');
    setSkillError(null);
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

  const suggestedSkills = detectIndustrySkills(formData.job_title || '', selectedIndustry);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4 animate-fadeIn text-left">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">
          Skills & Competencies
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
            placeholder="e.g. TypeScript, React, Financial Modeling, Figma... (Press Enter)"
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

      {/* Suggested Skills (Dynamic Multi-Industry Role Selector) */}
      <div className="flex flex-col gap-2.5 text-left border-t border-gray-100 pt-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
            <Sparkles size={14} className="text-indigo-600" />
            Suggested Skills ({selectedIndustry === 'auto' ? (formData.job_title ? formData.job_title : 'Auto Detected') : selectedIndustry}):
          </span>
          <span className="text-[11px] text-gray-400">Click a chip to add</span>
        </div>

        {/* Industry Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
          {INDUSTRY_CATEGORIES.map((ind) => (
            <button
              key={ind.id}
              type="button"
              onClick={() => setSelectedIndustry(ind.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-all cursor-pointer ${
                selectedIndustry === ind.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {suggestedSkills
            .filter(s => !skillList.some(userSkill => userSkill.toLowerCase() === s.toLowerCase()))
            .map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => addSkill(s)}
                className="text-xs px-3 py-1.5 rounded-lg font-medium bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-700 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
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
  );
};
