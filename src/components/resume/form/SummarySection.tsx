import React from 'react';
import { Textarea } from '@/components/ui/Textarea';
import { ResumeFormData } from '@/types/resume.types';
import { Sparkles, Lightbulb } from 'lucide-react';

interface SummarySectionProps {
  formData: ResumeFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onApplyTemplateSummary?: (text: string) => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({ 
  formData, 
  onChange,
  onApplyTemplateSummary
}) => {
  const summaryLength = formData.professional_summary?.length || 0;
  const wordCount = formData.professional_summary ? formData.professional_summary.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4 animate-fadeIn text-left">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">
          Professional Summary
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Write a concise 3-4 sentence elevator pitch highlighting your core achievements and strengths.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Textarea 
          label="Summary statement" 
          name="professional_summary" 
          placeholder="e.g. Results-driven Senior Professional with 5+ years of experience delivering high-impact solutions. Proven track record of scaling operations, leading squads, and accelerating business metrics." 
          value={formData.professional_summary} 
          onChange={onChange} 
          rows={6} 
          required 
        />
        
        <div className="flex items-center justify-between text-xs text-gray-400 px-1">
          <span>{wordCount} words ({summaryLength} characters)</span>
          <span className={wordCount >= 30 && wordCount <= 90 ? 'text-emerald-600 font-medium' : 'text-gray-400'}>
            Recommended: 40–80 words
          </span>
        </div>
      </div>

      {/* Quick Summary Starters */}
      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-left">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gray-700">
          <Sparkles size={14} className="text-indigo-600" />
          <span>Quick Inspiration Starter:</span>
        </div>
        <p className="text-xs text-gray-600 italic mb-2 leading-relaxed">
          &ldquo;Results-driven {formData.job_title || 'Professional'} with experience in driving high-velocity execution, optimizing key metrics, and delivering scalable solutions in fast-paced environments.&rdquo;
        </p>
        {onApplyTemplateSummary && !formData.professional_summary && (
          <button
            type="button"
            onClick={() => onApplyTemplateSummary(`Results-driven ${formData.job_title || 'Professional'} with experience in driving high-velocity execution, optimizing key metrics, and delivering scalable solutions in fast-paced environments.`)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
          >
            + Insert this starter template
          </button>
        )}
      </div>

      <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-left flex items-start gap-3">
        <Lightbulb size={18} className="text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-950 leading-relaxed space-y-1">
          <p><strong>Pro Tip:</strong> Quantify your impact with numbers ($ revenue, % efficiency increase, team size, users served).</p>
        </div>
      </div>
    </div>
  );
};
