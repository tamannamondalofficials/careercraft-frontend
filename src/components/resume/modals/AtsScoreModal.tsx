"use client";

import React from 'react';
import { ResumeFormData } from '@/types/resume.types';
import { calculateAtsScore } from '@/lib/ats-score';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Download, 
  X, 
  ArrowRight,
  Database,
  Award
} from 'lucide-react';

interface AtsScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ResumeFormData;
  backendId?: string | number;
  onDownload: () => void;
  onOpenStore?: () => void;
}

export const AtsScoreModal: React.FC<AtsScoreModalProps> = ({
  isOpen,
  onClose,
  formData,
  backendId,
  onDownload,
  onOpenStore,
}) => {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Submission & ATS Compatibility Report
              </h3>
              <p className="text-xs text-gray-500">
                Analysis for {formData.full_name || 'Your Resume'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-left">
          
          {/* Success Database Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-emerald-600 shrink-0" />
              <span>
                <strong>Successfully saved to database!</strong> {backendId ? `(Record ID: #${backendId})` : ''}
              </span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 shrink-0">
              Synced & Stored
            </span>
          </div>

          {/* Hero Score Showcase */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-left">
              {/* Score Ring */}
              <div className={`w-18 h-18 rounded-2xl border-2 flex flex-col items-center justify-center font-black shrink-0 ${getScoreColor(atsResult.percentage)} shadow-md`}>
                <span className="text-2xl leading-none font-extrabold">{atsResult.percentage}</span>
                <span className="text-[10px] uppercase tracking-wider font-bold">/ 100</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-white">
                    ATS Score: {atsResult.percentage}%
                  </h4>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${atsResult.color}`}>
                    {atsResult.rating}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-sm leading-relaxed">
                  {atsResult.percentage >= 90
                    ? 'Outstanding! Your resume structure, keywords, and metrics are fully optimized for recruiter ATS scanners.'
                    : 'Good foundation. Review the checkpoints below to boost your score to 95%+.'
                  }
                </p>
              </div>
            </div>

            {/* Quick Download Button */}
            <button
              onClick={() => {
                onClose();
                onDownload();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </button>
          </div>

          {/* 5 ATS Checkpoints Grid */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-3 flex items-center gap-1.5">
              <Sparkles size={14} className="text-indigo-600" />
              Detailed ATS Breakdown
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {atsResult.checks.map((check) => (
                <div 
                  key={check.id}
                  className="bg-slate-50/80 border border-gray-200/90 rounded-xl p-3 flex items-start justify-between gap-2"
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
                      <h5 className="text-xs font-bold text-gray-900 leading-tight">
                        {check.label}
                      </h5>
                      {check.tip && (
                        <p className="text-[11px] text-amber-700 mt-1 leading-snug">
                          💡 {check.tip}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs font-bold shrink-0 ${check.passed ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {check.score}/{check.maxScore}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          {onOpenStore && (
            <button
              onClick={() => {
                onClose();
                onOpenStore();
              }}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors cursor-pointer"
            >
              View in Resume Store →
            </button>
          )}

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-200/70 transition-colors cursor-pointer"
            >
              Continue Editing
            </button>
            <button
              onClick={() => {
                onClose();
                onDownload();
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Download Free PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
