import React, { useState } from 'react';
import { LayoutTemplate, X, Check, CheckCircle2, Download, Layers } from 'lucide-react';
import { TEMPLATE_OPTIONS } from '@/constants/templates';
import { ResumeFormData } from '@/types/resume.types';

interface TemplateGalleryModalProps {
  currentTemplate: string;
  onSelectTemplate: (templateId: 'executive' | 'modern' | 'minimal' | 'elegant' | 'compact') => void;
  onDownload: () => void;
  onClose: () => void;
}

export const TemplateGalleryModal: React.FC<TemplateGalleryModalProps> = ({
  currentTemplate,
  onSelectTemplate,
  onDownload,
  onClose
}) => {
  const [templateFilter, setTemplateFilter] = useState<'all' | 'ats' | 'tech' | 'executive'>('all');

  const filteredTemplates = TEMPLATE_OPTIONS.filter(t => {
    if (templateFilter === 'all') return true;
    return t.category === templateFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-xs p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden text-left">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-5 border-b border-gray-100 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2 text-gray-900 font-bold text-base sm:text-lg">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <LayoutTemplate size={18} />
              </div>
              <span>Choose Resume Template</span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
              Select from 5 professionally engineered ATS-friendly resume templates.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-50/80 border-b border-gray-200/80 flex items-center gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar shrink-0">
          <button
            onClick={() => setTemplateFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              templateFilter === 'all' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Templates (5)
          </button>
          <button
            onClick={() => setTemplateFilter('executive')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              templateFilter === 'executive' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Executive & Leadership
          </button>
          <button
            onClick={() => setTemplateFilter('tech')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              templateFilter === 'tech' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Tech & Software Engineers
          </button>
          <button
            onClick={() => setTemplateFilter('ats')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              templateFilter === 'ats' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            100% Minimal ATS
          </button>
        </div>

        {/* Template Grid Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 bg-[#F8FAFC]">
          {filteredTemplates.map((tpl) => {
            const isSelected = currentTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                className={`rounded-2xl border-2 transition-all bg-white flex flex-col justify-between overflow-hidden relative group hover:shadow-lg ${
                  isSelected 
                    ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Active Selected Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10 bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-xs">
                    <CheckCircle2 size={12} /> Active
                  </div>
                )}

                {/* Template Visual Mockup Thumbnail */}
                <div 
                  onClick={() => onSelectTemplate(tpl.id)}
                  className="p-4 bg-slate-100/80 border-b border-gray-100 cursor-pointer flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden"
                >
                  {tpl.id === 'executive' && (
                    <div className="w-full max-w-[200px] bg-white rounded shadow-xs p-2.5 border border-slate-200 flex flex-col gap-1.5">
                      <div className="h-2 w-24 bg-[#17365D] rounded-xs" />
                      <div className="h-1 w-16 bg-[#365F91] rounded-xs" />
                      <div className="h-0.5 w-full bg-slate-200" />
                      <div className="flex gap-1">
                        <div className="h-1 w-10 bg-slate-300 rounded-xs" />
                        <div className="h-1 w-10 bg-slate-300 rounded-xs" />
                        <div className="h-1 w-10 bg-slate-300 rounded-xs" />
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-xs" />
                      <div className="h-1 w-4/5 bg-slate-100 rounded-xs" />
                    </div>
                  )}

                  {tpl.id === 'modern' && (
                    <div className="w-full max-w-[200px] bg-white rounded shadow-xs p-2.5 border border-slate-200 flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <div className="h-2.5 w-20 bg-indigo-600 rounded-xs" />
                        <div className="h-2 w-10 bg-indigo-100 rounded-full" />
                      </div>
                      <div className="h-0.5 w-full bg-indigo-50" />
                      <div className="flex gap-1 mt-0.5">
                        <div className="h-1.5 w-8 bg-indigo-100 rounded-full" />
                        <div className="h-1.5 w-8 bg-indigo-100 rounded-full" />
                        <div className="h-1.5 w-8 bg-indigo-100 rounded-full" />
                      </div>
                      <div className="border-l-2 border-indigo-200 pl-1.5 flex flex-col gap-1 mt-0.5">
                        <div className="h-1 w-full bg-slate-200 rounded-xs" />
                        <div className="h-1 w-3/4 bg-slate-100 rounded-xs" />
                      </div>
                    </div>
                  )}

                  {tpl.id === 'minimal' && (
                    <div className="w-full max-w-[200px] bg-white rounded shadow-xs p-2.5 border border-slate-200 flex flex-col gap-1.5 font-mono">
                      <div className="flex justify-between">
                        <div className="h-2 w-20 bg-slate-900 rounded-xs" />
                        <div className="h-1 w-10 bg-slate-400 rounded-xs" />
                      </div>
                      <div className="h-0.5 w-full bg-slate-900" />
                      <div className="h-1 w-16 bg-slate-600 rounded-xs" />
                      <div className="h-1 w-full bg-slate-200 rounded-xs" />
                      <div className="h-1 w-full bg-slate-200 rounded-xs" />
                    </div>
                  )}

                  {tpl.id === 'elegant' && (
                    <div className="w-full max-w-[200px] bg-white rounded shadow-xs p-2.5 border border-slate-200 flex flex-col items-center gap-1.5">
                      <div className="h-2.5 w-24 bg-stone-800 rounded-xs" />
                      <div className="h-1 w-16 bg-stone-400 rounded-xs" />
                      <div className="h-0.5 w-full bg-stone-300" />
                      <div className="h-1 w-full bg-stone-100 rounded-xs" />
                      <div className="h-1 w-4/5 bg-stone-100 rounded-xs" />
                    </div>
                  )}

                  {tpl.id === 'compact' && (
                    <div className="w-full max-w-[200px] bg-white rounded shadow-xs border border-slate-200 flex overflow-hidden h-20">
                      <div className="w-[35%] bg-slate-900 p-1.5 flex flex-col gap-1">
                        <div className="h-1.5 w-full bg-white rounded-xs" />
                        <div className="h-1 w-3/4 bg-indigo-400 rounded-xs" />
                        <div className="h-1 w-full bg-slate-700 rounded-xs mt-1" />
                        <div className="h-1 w-full bg-slate-700 rounded-xs" />
                      </div>
                      <div className="w-[65%] p-1.5 flex flex-col gap-1 bg-white">
                        <div className="h-1.5 w-16 bg-slate-800 rounded-xs" />
                        <div className="h-1 w-full bg-slate-100 rounded-xs" />
                        <div className="h-1 w-full bg-slate-100 rounded-xs" />
                        <div className="h-1 w-3/4 bg-slate-100 rounded-xs" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Template Details */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {tpl.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-gray-950">{tpl.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {tpl.description}
                    </p>

                    <div className="mt-3 space-y-1">
                      {tpl.features.map((feat, fIdx) => (
                        <div key={fIdx} className="text-[11px] text-gray-600 flex items-center gap-1.5">
                          <Check size={12} className="text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectTemplate(tpl.id);
                        onClose();
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {isSelected ? 'Currently Selected' : 'Apply & Preview'}
                    </button>

                    <button
                      onClick={() => {
                        onSelectTemplate(tpl.id);
                        onClose();
                        setTimeout(() => onDownload(), 300);
                      }}
                      className="p-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 border border-gray-200 transition-colors cursor-pointer"
                      title="Download in this template"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-500">
            <Layers size={14} className="text-indigo-600 shrink-0" />
            <span>All templates auto-populate your live profile data</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Close Gallery
          </button>
        </div>
      </div>
    </div>
  );
};
