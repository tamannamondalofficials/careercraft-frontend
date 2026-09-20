"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { ResumeForm, TabKey } from '@/components/resume/ResumeForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { defaultExperience, defaultEducation } from '@/components/resume/form';
import { EditorHeader, ZoomControls } from '@/components/resume/layout';
import { 
  TemplateGalleryModal, 
  ProfessionPresetsModal, 
  ReviewDownloadModal,
  ResumeStoreModal,
  AtsScoreModal,
  RESUME_STORE_STORAGE_KEY
} from '@/components/resume/modals';
import { ResumeFormData } from '@/types/resume.types';
import { ProfessionSample, PROFESSION_PRESETS } from '@/constants/sampleCV';
import { submitResume } from '@/services/api/resume.service';

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

export default function EditorPage() {
  const [formData, setFormData] = useState<ResumeFormData>(initialResumeData);
  const [activeTab, setActiveTab] = useState<TabKey>('personal');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [isClient, setIsClient] = useState(false);

  // Modals state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showProfessionModal, setShowProfessionModal] = useState(false);
  const [showResumeStoreModal, setShowResumeStoreModal] = useState(false);
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [submittedBackendId, setSubmittedBackendId] = useState<string | number | undefined>();

  // Backend submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const componentRef = useRef<HTMLDivElement>(null);

  // 1. Load draft from localStorage and URL query params on initial render
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      let initialData = initialResumeData;
      if (saved) {
        initialData = { ...initialResumeData, ...JSON.parse(saved) };
      }

      // Check query params if template or preset was clicked on landing page
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const templateParam = params.get('template');
        const presetParam = params.get('preset');

        if (presetParam) {
          const foundPreset = PROFESSION_PRESETS.find(p => p.id === presetParam);
          if (foundPreset) {
            initialData = { ...initialData, ...foundPreset.data };
          }
        }

        if (templateParam && ['executive', 'modern', 'minimal', 'compact', 'elegant'].includes(templateParam)) {
          initialData.template = templateParam as 'executive' | 'modern' | 'minimal' | 'compact' | 'elegant';
        }
      }

      setFormData(initialData);
    } catch (e) {
      console.error("Failed to load draft from localStorage", e);
    }
  }, []);

  // 2. Autosave to localStorage on form changes (debounced 500ms)
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

  // 3. Dismiss feedback toast after 5s
  useEffect(() => {
    if (submitFeedback) {
      const timer = setTimeout(() => setSubmitFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitFeedback]);

  // PDF Print Handler
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: formData.full_name ? `${formData.full_name.replace(/\s+/g, '_')}_Resume` : 'Resume',
  });

  // Load selected profession sample
  const handleSelectProfession = (preset: ProfessionSample) => {
    setFormData(preset.data);
    setShowProfessionModal(false);
    setSubmitFeedback({
      type: 'success',
      message: `Loaded sample data for ${preset.name} (${preset.role})`
    });
  };

  // Submit to backend API (http://127.0.0.1:8000/api/v1/resumes/)
  const handleBackendSubmit = async () => {
    setIsSubmitting(true);
    setSubmitFeedback(null);
    try {
      const res = await submitResume(formData);
      const resumeId = res.id || res.resume_id || res.data?.id;
      setSubmittedBackendId(resumeId);

      // Save version into Resume Store
      try {
        const storedStr = localStorage.getItem(RESUME_STORE_STORAGE_KEY);
        const storedList = storedStr ? JSON.parse(storedStr) : [];
        const newStoreItem = {
          id: `resume_${Date.now()}`,
          savedAt: new Date().toISOString(),
          data: { ...formData },
          backendId: resumeId
        };
        localStorage.setItem(RESUME_STORE_STORAGE_KEY, JSON.stringify([newStoreItem, ...storedList]));
      } catch (storeErr) {
        console.warn('Resume store cache update:', storeErr);
      }

      setSubmitFeedback({
        type: 'success',
        message: resumeId
          ? `Resume successfully saved to backend database (ID: #${resumeId}) & added to your Resume Store!`
          : 'Resume successfully submitted to backend API (http://127.0.0.1:8000/api/v1/resumes/)!'
      });

      // Show the ATS score modal report immediately after submit!
      setShowAtsModal(true);
    } catch (err: any) {
      console.warn('Backend API submission warning:', err);
      const errorMsg = err?.response?.data?.message || err?.message || 'Server connection error';

      // Save locally to store anyway
      try {
        const storedStr = localStorage.getItem(RESUME_STORE_STORAGE_KEY);
        const storedList = storedStr ? JSON.parse(storedStr) : [];
        const newStoreItem = {
          id: `resume_${Date.now()}`,
          savedAt: new Date().toISOString(),
          data: { ...formData }
        };
        localStorage.setItem(RESUME_STORE_STORAGE_KEY, JSON.stringify([newStoreItem, ...storedList]));
      } catch (e) {
        // ignore
      }

      setSubmitFeedback({
        type: 'error',
        message: `Saved locally in your Resume Store! (Backend: ${errorMsg})`
      });

      // Still show the ATS score modal for the user's resume!
      setShowAtsModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Section completeness checklist
  const missingItems: { label: string; tab: TabKey }[] = [];
  if (!formData.full_name?.trim()) missingItems.push({ label: 'Full Name', tab: 'personal' });
  if (!formData.email?.trim()) missingItems.push({ label: 'Email Address', tab: 'personal' });
  if (!formData.job_title?.trim()) missingItems.push({ label: 'Target Job Title', tab: 'personal' });
  if (!formData.professional_summary?.trim()) missingItems.push({ label: 'Professional Summary', tab: 'summary' });
  if (!formData.experiences?.some(e => e.company_name?.trim() || e.job_title?.trim())) {
    missingItems.push({ label: 'Work Experience', tab: 'experience' });
  }
  if (!formData.educations?.some(e => e.institution_name?.trim() || e.degree?.trim())) {
    missingItems.push({ label: 'Education & Degree', tab: 'education' });
  }
  if (!formData.skills?.trim()) {
    missingItems.push({ label: 'Technical & Domain Skills', tab: 'skills' });
  }

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

  // Zoom Handlers
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoomLevel(0.85);

  return (
    <div className="h-screen flex flex-col bg-[#F7F8FA] overflow-hidden">
      
      {/* 1. Header Toolbar */}
      <EditorHeader
        title={formData.title}
        onTitleChange={(title) => setFormData(prev => ({ ...prev, title }))}
        saveStatus={saveStatus}
        currentTemplateId={formData.template}
        mobileTab={mobileTab}
        onMobileTabChange={setMobileTab}
        onOpenProfessionModal={() => setShowProfessionModal(true)}
        onOpenTemplateModal={() => setShowTemplateModal(true)}
        onOpenResumeStoreModal={() => setShowResumeStoreModal(true)}
        onDownloadClick={handleDownloadClick}
        onSubmit={handleBackendSubmit}
        isSubmitting={isSubmitting}
      />

      {/* 2. Global Feedback Toast */}
      {submitFeedback && (
        <div className={`px-6 py-2.5 text-xs font-medium flex items-center justify-between animate-fadeIn transition-all z-20 ${submitFeedback.type === 'success'
          ? 'bg-emerald-50 border-b border-emerald-200 text-emerald-900'
          : 'bg-amber-50 border-b border-amber-200 text-amber-900'
          }`}>
          <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
            {submitFeedback.type === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-amber-600 shrink-0" />
            )}
            <span>{submitFeedback.message}</span>
          </div>
          <button
            onClick={() => setSubmitFeedback(null)}
            className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 3. Main Split-Screen Workspace */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row relative box-border">

        {/* Left Form Panel */}
        <div className={`w-full md:w-[48%] lg:w-[45%] xl:w-[42%] h-full overflow-y-auto border-r border-gray-200 bg-[#F8FAFC] p-6 hide-scrollbar box-border ${mobileTab === 'edit' ? 'block' : 'hidden md:block'
          }`}>
          <div className="max-w-xl mx-auto pb-16 md:pb-8 w-full box-border">
            <ResumeForm
              formData={formData}
              setFormData={setFormData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onSubmit={handleBackendSubmit}
              isSubmitting={isSubmitting}
              onDownloadClick={handleDownloadClick}
            />
          </div>
        </div>

        {/* Right Preview Panel (Clean & Focused) */}
        <div className={`w-full md:w-[52%] lg:w-[55%] xl:w-[58%] h-full overflow-y-auto bg-slate-200/70 p-6 md:p-8 hide-scrollbar flex flex-col items-center relative box-border ${mobileTab === 'preview' ? 'block' : 'hidden md:flex'
          }`}>

          {/* Scaled A4 Preview */}
          <div className="w-full flex justify-center pb-28 pt-1">
            <ResumePreview
              data={formData}
              previewRef={componentRef}
              scale={zoomLevel}
              onSelectSection={handleSectionSelect}
              onDownloadClick={handleDownloadClick}
            />
          </div>

          {/* Floating Zoom Controls */}
          <ZoomControls
            zoomLevel={zoomLevel}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onResetZoom={resetZoom}
          />
        </div>
      </div>

      {/* 4. Modals */}
      {showProfessionModal && (
        <ProfessionPresetsModal
          onSelectPreset={handleSelectProfession}
          onClose={() => setShowProfessionModal(false)}
        />
      )}

      {showTemplateModal && (
        <TemplateGalleryModal
          currentTemplate={formData.template}
          onSelectTemplate={(templateId) => setFormData(prev => ({ ...prev, template: templateId }))}
          onDownload={handleDownloadClick}
          onClose={() => setShowTemplateModal(false)}
        />
      )}

      {showAtsModal && (
        <AtsScoreModal
          isOpen={showAtsModal}
          formData={formData}
          backendId={submittedBackendId}
          onDownload={handlePrint}
          onOpenStore={() => setShowResumeStoreModal(true)}
          onClose={() => setShowAtsModal(false)}
        />
      )}

      {showResumeStoreModal && (
        <ResumeStoreModal
          isOpen={showResumeStoreModal}
          currentData={formData}
          onLoadResume={(loaded) => setFormData(loaded)}
          onDownloadResume={(resData) => {
            setFormData(resData);
            setTimeout(() => handlePrint(), 300);
          }}
          onClose={() => setShowResumeStoreModal(false)}
        />
      )}

      {showReviewModal && (
        <ReviewDownloadModal
          missingItems={missingItems}
          onSelectTab={(tab) => {
            setShowReviewModal(false);
            setActiveTab(tab);
            setMobileTab('edit');
          }}
          onDownloadAnyway={() => {
            setShowReviewModal(false);
            handlePrint();
          }}
          onClose={() => setShowReviewModal(false)}
        />
      )}

    </div>
  );
}
