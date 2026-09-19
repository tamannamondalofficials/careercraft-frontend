"use client";

import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, LayoutTemplate, FileText } from 'lucide-react';
import { ResumeForm, defaultExperience } from '@/components/resume/ResumeForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ResumeFormData } from '@/types/resume.types';
import { generateResume } from '@/services/api/resume.service';
import Link from 'next/link';

export default function EditorPage() {
  const [formData, setFormData] = useState<ResumeFormData>({
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
    template: 'modern',
    status: 'draft',
    experiences: [{ ...defaultExperience }]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const componentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: formData.full_name ? `${formData.full_name}_Resume` : 'Resume',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await generateResume(formData);
      setMessage({
        type: 'success',
        text: `Success! Resume saved to your account.`
      });
    } catch (error: any) {
      console.error("Resume save failed:", error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to save resume. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F7F8FA] overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors">
            <FileText size={24} strokeWidth={2.5} />
            <span className="font-bold text-xl tracking-tight hidden sm:block">CareerCraft</span>
          </Link>
          <div className="h-6 w-px bg-gray-200 hidden sm:block" />
          <input 
            type="text" 
            value={formData.title} 
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="text-gray-900 font-medium bg-transparent hover:bg-gray-50 focus:bg-white px-2 py-1 rounded border border-transparent focus:border-indigo-300 focus:outline-none transition-colors w-32 sm:w-48"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors">
            <LayoutTemplate size={16} />
            Template
          </button>
          <button 
            onClick={() => handlePrint()}
            className="flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        
        {/* Left Panel (Editor) - 40% */}
        <div className="w-full md:w-[40%] xl:w-[45%] h-full overflow-y-auto border-r border-gray-200 bg-[#F7F8FA] p-6 lg:p-8 hide-scrollbar">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Resume</h2>
            <ResumeForm 
              formData={formData} 
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              message={message}
            />
          </div>
        </div>

        {/* Right Panel (Preview) - 60% */}
        <div className="w-full md:w-[60%] xl:w-[55%] h-full overflow-y-auto bg-gray-100/50 p-6 lg:p-10 hide-scrollbar flex items-start justify-center">
          <div className="sticky top-0 w-full max-w-[21cm] transition-all transform origin-top mx-auto">
             <ResumePreview data={formData} previewRef={componentRef} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
