"use client";

import React, { useState } from 'react';
import { ResumeFormData } from '@/types/resume.types';
import { calculateAtsScore } from '@/lib/ats-score';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Award,
  Zap,
  HelpCircle
} from 'lucide-react';

interface AtsScoreCardProps {
  formData: ResumeFormData;
}

export const AtsScoreCard: React.FC<AtsScoreCardProps> = ({ formData }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const atsResult = calculateAtsScore(formData);

  const getScoreColor = (pct: number) => {
    if (pct >= 90) return 'text-emerald-600 border-emerald-500 bg-emerald-50';
    if (pct >= 75) return 'text-indigo-600 border-indigo-500 bg-indigo-50';
    if (pct >= 60) return 'text-amber-600 border-amber-500 bg-amber-50';
    return 'text-rose-600 border-rose-500 bg-rose-50';
  };

  const getProgressColor = (pct: number) => {
    if (pct >= 90) return 'bg-emerald-500';
    if (pct >= 75) return 'bg-indigo-600';
    if (pct >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="w-full max-w-[210mm] mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all text-left">
      {/* Top Header & Score Bar */}
      <div 
        onClick={() => setExpanded(!expanded)}
        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors select-none"
      >
        <div className="flex items-center gap-3.5">
          {/* Circular Score Badge */}
          <div className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center font-black shrink-0 ${getScoreColor(atsResult.percentage)} shadow-xs`}>
            <span className="text-xl leading-none font-extrabold">{atsResult.percentage}</span>
            <span className="text-[9px] uppercase tracking-wider font-bold">/ 100</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
                <ShieldCheck size={18} className="text-indigo-600" />
                Live ATS Compatibility Score
              </h3>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${atsResult.color}`}>
                {atsResult.rating}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {atsResult.percentage >= 90 
                ? 'Your resume is fully optimized to pass Applicant Tracking Systems (Workday, Greenhouse, Taleo).'
                : 'Complete the checkpoints below to maximize your interview callback rate.'
              }
            </p>
          </div>
        </div>

        {/* Right Toggle Action */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="w-32 sm:w-28 flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-semibold text-gray-600">
              <span>ATS Match</span>
              <span className="font-bold text-indigo-600">{atsResult.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${getProgressColor(atsResult.percentage)}`}
                style={{ width: `${atsResult.percentage}%` }}
              />
            </div>
          </div>

          <button 
            type="button"
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle ATS breakdown"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Expandable Breakdown Checkpoints */}
      {expanded && (
        <div className="px-5 pb-5 pt-2 border-t border-gray-100 bg-slate-50/50 flex flex-col gap-3.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {atsResult.checks.map((check) => (
              <div 
                key={check.id}
                className="bg-white border border-gray-200/90 rounded-xl p-3 flex items-start justify-between gap-2 shadow-2xs"
              >
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 shrink-0">
                    {check.passed ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <AlertCircle size={16} className="text-amber-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 leading-tight">
                      {check.label}
                    </h4>
                    {check.tip && (
                      <p className="text-[11px] text-amber-700 mt-1 leading-snug">
                        💡 {check.tip}
                      </p>
                    )}
                  </div>
                </div>
                <span className={`text-xs font-bold shrink-0 ${check.passed ? 'text-emerald-600' : 'text-gray-500'}`}>
                  {check.score}/{check.maxScore} pts
                </span>
              </div>
            ))}
          </div>

          {/* Quick ATS Best Practices Banner */}
          <div className="bg-indigo-50/70 border border-indigo-100/90 rounded-xl p-3 flex items-start gap-2.5 text-xs text-indigo-900">
            <Sparkles size={16} className="text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">CareerCraft 1-Page Guarantee:</span>
              <p className="text-indigo-800 text-[11px] leading-relaxed">
                All templates automatically format single-column typography and ATS standard date structures to guarantee 100% text legibility by automated screening bots.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
