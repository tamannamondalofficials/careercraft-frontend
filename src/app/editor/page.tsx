"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { 
  Download, 
  FileText, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Edit3, 
  Eye, 
  AlertTriangle,
  X,
  ArrowRight,
  Sparkles,
  LayoutTemplate,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { ResumeForm, defaultExperience, defaultEducation, TabKey } from '@/components/resume/ResumeForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ResumeFormData } from '@/types/resume.types';
import { EXECUTIVE_TEMPLATE_SAMPLE } from '@/constants/sampleCV';
import Link from 'next/link';

const LOCAL_STORAGE_KEY = 'career_craft_resume_draft';

const initialResumeData: ResumeFormData = {
  full_name: '',
  email: '',
  phone: '',
  job_title: '',
  professional_summary: '',
  city: '',
  state: '',
  country: '',
  linkedin_url: '',
  github_url: '',
  portfolio_url: '',
  title: 'My Resume',
  template: 'executive',
  status: 'draft',
  experiences: [{ ...defaultExperience }],
  educations: [{ ...defaultEducation }],
  skills: ''
};

interface TemplateOption {
  id: 'executive' | 'modern' | 'minimal' | 'elegant' | 'compact';
  name: string;
  category: 'ats' | 'tech' | 'executive';
  badge: string;
  description: string;
  features: string[];
  accentColor: string;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: 'executive',
    name: 'Executive (Word Style)',
    category: 'executive',
    badge: 'Most Popular / Word CV',
    description: 'Modeled directly from executive Word resumes with deep navy accents and pipe contact lines.',
    features: ['Deep navy (#17365D) uppercase headers', 'Pipe-separated contact info', 'Standard ATS bullet layout'],
    accentColor: '#17365D'
  },
  {
    id: 'modern',
    name: 'Modern Creative Tech',
    category: 'tech',
    badge: 'Top Choice for Developers',
    description: 'Contemporary indigo styling with timeline indicators, badge pills, and high visual contrast.',
    features: ['Vibrant indigo accents', 'Skill pill badges', 'Interactive timeline dots'],
    accentColor: '#4F46E5'
  },
  {
    id: 'minimal',
    name: 'Minimalist Clean ATS',
    category: 'ats',
    badge: '100% ATS Optimized',
    description: 'Clean monochrome layout, monospaced metadata, and ultra-high readability for automated screening.',
    features: ['High ATS pass rate', 'Monospace font accents', 'Clean horizontal rule dividers'],
    accentColor: '#0F172A'
  },
  {
    id: 'elegant',
    name: 'Classic Elegant Serif',
    category: 'executive',
    badge: 'Leadership & Consulting',
    description: 'Sophisticated editorial serif typography with centered headers and tasteful border lines.',
    features: ['Classic editorial serif font', 'Centered header presentation', 'Ideal for executive roles'],
    accentColor: '#44403C'
  },
  {
    id: 'compact',
    name: 'Compact 2-Column Tech',
    category: 'tech',
    badge: 'Modern Sidebar',
    description: 'Dual-column layout with dark tech sidebar for skills/contact and high-density project showcase.',
    features: ['Slate sidebar for tech stack', 'High information density', 'Perfect for 1-page resumes'],
    accentColor: '#0F172A'
  }
];

export default function EditorPage() {
  const [formData, setFormData] = useState<ResumeFormData>(initialResumeData);
  const [activeTab, setActiveTab] = useState<TabKey>('personal');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [isClient, setIsClient] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateFilter, setTemplateFilter] = useState<'all' | 'ats' | 'tech' | 'executive'>('all');

  const componentRef = useRef<HTMLDivElement>(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error("Failed to load draft from localStorage", e);
    }
  }, []);

  // Autosave to localStorage on form changes
  useEffect(() => {
    if (!isClient) return;
    setSaveStatus('saving');
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
        setSaveStatus('saved');
      } catch (e) {
        console.error("Failed to save draft to localStorage", e);
        setSaveStatus('error');
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData, isClient]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: formData.full_name ? `${formData.full_name.replace(/\s+/g, '_')}_Resume` : 'Resume',
  });

  const loadSampleData = () => {
    setFormData(EXECUTIVE_TEMPLATE_SAMPLE);
  };

  // Missing sections checklist
  const missingItems: { label: string; tab: TabKey }[] = [];
  if (!formData.full_name?.trim()) missingItems.push({ label: 'Full Name', tab: 'personal' });
  if (!formData.email?.trim()) missingItems.push({ label: 'Email Address', tab: 'personal' });
  if (!formData.job_title?.trim()) missingItems.push({ label: 'Target Job Title', tab: 'personal' });
  if (!formData.professional_summary?.trim()) missingItems.push({ label: 'Professional Summary', tab: 'summary' });
  if (!formData.experiences?.some(e => e.company_name?.trim() || e.job_title?.trim())) {
    missingItems.push({ label: 'Work Experience', tab: 'experience' });
  }
  if (!formData.educations?.some(e => e.institution_name?.trim() || e.degree?.trim())) {
    missingItems.push({ label: 'Education', tab: 'education' });
  }
  if (!formData.skills?.trim()) missingItems.push({ label: 'Skills & Competencies', tab: 'skills' });

  const handleDownloadClick = () => {
    if (missingItems.length > 0) {
      setShowReviewModal(true);
    } else {
      handlePrint();
    }
  };

  const handleSectionSelect = (section: TabKey) => {
    setActiveTab(section);
    setMobileTab('edit');
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoomLevel(0.85);

  const filteredTemplates = TEMPLATE_OPTIONS.filter(t => {
    if (templateFilter === 'all') return true;
    return t.category === templateFilter;
  });

  const currentTemplateObj = TEMPLATE_OPTIONS.find(t => t.id === formData.template) || TEMPLATE_OPTIONS[0];

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F8FAFC] overflow-hidden text-gray-900 font-sans box-border">
      
      {/* 1. Header Bar */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 md:px-8 lg:px-10 flex items-center justify-between shrink-0 shadow-xs z-30 box-border">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center gap-2.5 text-indigo-600 hover:text-indigo-700 transition-colors shrink-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <FileText size={20} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:inline">
              CareerCraft
            </span>
          </Link>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Editable Resume Title */}
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Resume Title"
              className="text-gray-900 font-semibold text-sm sm:text-base bg-transparent hover:bg-gray-100/70 focus:bg-white px-2.5 py-1 rounded-lg border border-transparent focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all w-28 sm:w-44 truncate cursor-pointer"
              title="Click to rename resume"
            />
          </div>

          {/* Autosave Status Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-50 border border-gray-200 shrink-0">
            {saveStatus === 'saved' && (
              <>
                <Check size={13} className="text-emerald-500 stroke-[3]" />
                <span className="text-gray-600">Saved</span>
              </>
            )}
            {saveStatus === 'saving' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-gray-500">Saving...</span>
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-red-600 font-medium">Save failed</span>
              </>
            )}
          </div>
        </div>
        
        {/* Right Actions Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Load Sample Data Button */}
          <button
            onClick={loadSampleData}
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-2 rounded-xl transition-all cursor-pointer"
            title="Load sample resume data"
          >
            <Sparkles size={14} className="text-indigo-600" />
            <span>Load Sample Data</span>
          </button>

          {/* Template Switcher Button */}
          <button 
            onClick={() => setShowTemplateModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-300 px-3 py-2 rounded-xl transition-all hover:border-indigo-300 cursor-pointer shadow-2xs"
          >
            <LayoutTemplate size={14} className="text-indigo-600" />
            <span className="hidden sm:inline">Templates: </span>
            <span className="text-indigo-700 font-bold">{currentTemplateObj.name.split(' ')[0]}</span>
          </button>

          {/* Mobile Edit/Preview View Switcher */}
          <div className="flex md:hidden bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setMobileTab('edit')}
              className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                mobileTab === 'edit' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
              }`}
            >
              <Edit3 size={13} />
              Edit
            </button>
            <button
              onClick={() => setMobileTab('preview')}
              className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                mobileTab === 'preview' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
              }`}
            >
              <Eye size={13} />
              Preview
            </button>
          </div>

          {/* Primary Action Button: Download PDF */}
          <button 
            onClick={handleDownloadClick}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer shrink-0"
            aria-label="Download Resume as PDF"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </header>

      {/* Rich Template Chooser & Download Suggestion Gallery Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-xs p-4 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden text-left">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white shrink-0">
              <div>
                <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <LayoutTemplate size={18} />
                  </div>
                  <span>Choose Resume Template</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Select from 5 professionally engineered ATS-friendly resume templates.
                </p>
              </div>
              <button 
                onClick={() => setShowTemplateModal(false)}
                className="text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="px-6 py-3 bg-gray-50/80 border-b border-gray-200/80 flex items-center gap-2 overflow-x-auto hide-scrollbar shrink-0">
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
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-[#F8FAFC]">
              {filteredTemplates.map((tpl) => {
                const isSelected = formData.template === tpl.id;
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
                      onClick={() => {
                        setFormData(prev => ({ ...prev, template: tpl.id }));
                      }}
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
                            setFormData(prev => ({ ...prev, template: tpl.id }));
                            setShowTemplateModal(false);
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
                            setFormData(prev => ({ ...prev, template: tpl.id }));
                            setShowTemplateModal(false);
                            setTimeout(() => {
                              handleDownloadClick();
                            }, 300);
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
            <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Layers size={14} className="text-indigo-600" />
                <span>All templates auto-populate your live profile data</span>
              </div>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Review Modal before Download */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 text-left">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-base">
                <AlertTriangle size={20} />
                <span>Review Before Downloading</span>
              </div>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-lg"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Your resume is missing a few recommended sections. You can fill them in for a stronger ATS score, or proceed to download now.
            </p>

            <div className="flex flex-col gap-2 mb-6">
              {missingItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setShowReviewModal(false);
                    setActiveTab(item.tab);
                    setMobileTab('edit');
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-indigo-50 border border-gray-200 text-left text-xs font-medium text-gray-800 transition-colors group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Missing: {item.label}
                  </span>
                  <span className="text-indigo-600 text-[11px] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Add <ArrowRight size={12} />
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  if (missingItems.length > 0) {
                    setActiveTab(missingItems[0].tab);
                    setMobileTab('edit');
                  }
                }}
                className="text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-2"
              >
                Fill Missing Details
              </button>

              <button
                onClick={() => {
                  setShowReviewModal(false);
                  handlePrint();
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm cursor-pointer"
              >
                <Download size={14} />
                Download Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Split-Screen Workspace */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row relative box-border">
        
        {/* Left Form Panel: 24px (p-6) padding */}
        <div className={`w-full md:w-[48%] lg:w-[45%] xl:w-[42%] h-full overflow-y-auto border-r border-gray-200 bg-[#F8FAFC] p-6 hide-scrollbar box-border ${
          mobileTab === 'edit' ? 'block' : 'hidden md:block'
        }`}>
          <div className="max-w-xl mx-auto pb-16 md:pb-8 w-full box-border">
            <ResumeForm 
              formData={formData} 
              setFormData={setFormData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onDownloadClick={handleDownloadClick}
            />
          </div>
        </div>

        {/* Right Preview Panel: 24 to 32px (p-6 md:p-8) padding */}
        <div className={`w-full md:w-[52%] lg:w-[55%] xl:w-[58%] h-full overflow-y-auto bg-slate-200/70 p-6 md:p-8 hide-scrollbar flex flex-col items-center relative box-border ${
          mobileTab === 'preview' ? 'block' : 'hidden md:flex'
        }`}>
          
          {/* Scaled A4 Preview Container */}
          <div className="w-full flex justify-center pb-28 pt-1">
             <ResumePreview 
               data={formData} 
               previewRef={componentRef} 
               scale={zoomLevel} 
               onSelectSection={handleSectionSelect}
             />
          </div>

          {/* Floating Bottom Zoom Control Bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xl rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs text-gray-700">
            <button 
              onClick={zoomOut} 
              className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-900 cursor-pointer"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut size={15} />
            </button>
            <span className="font-semibold px-1 text-gray-800 w-12 text-center select-none">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button 
              onClick={zoomIn} 
              className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-900 cursor-pointer"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn size={15} />
            </button>
            <div className="h-4 w-px bg-gray-200 mx-1" />
            <button 
              onClick={resetZoom} 
              className="flex items-center gap-1 px-2 py-0.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600 hover:text-gray-900 text-[11px] font-medium cursor-pointer"
              title="Reset Zoom"
              aria-label="Reset zoom to default"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>

        </div>
        
      </div>
    </div>
  );
}
