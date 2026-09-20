import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Check, 
  LayoutTemplate, 
  Sparkles,
  Edit3, 
  Eye, 
  Download 
} from 'lucide-react';
import { TEMPLATE_OPTIONS } from '@/constants/templates';

interface EditorHeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
  saveStatus: 'saved' | 'saving' | 'error';
  currentTemplateId: string;
  mobileTab: 'edit' | 'preview';
  onMobileTabChange: (tab: 'edit' | 'preview') => void;
  onOpenProfessionModal: () => void;
  onOpenTemplateModal: () => void;
  onDownloadClick: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  title,
  onTitleChange,
  saveStatus,
  currentTemplateId,
  mobileTab,
  onMobileTabChange,
  onOpenProfessionModal,
  onOpenTemplateModal,
  onDownloadClick
}) => {
  const currentTemplateObj = TEMPLATE_OPTIONS.find(t => t.id === currentTemplateId) || TEMPLATE_OPTIONS[0];

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 md:px-8 lg:px-10 flex items-center justify-between shrink-0 shadow-xs z-30 box-border">
      {/* Left: Brand Logo & Title */}
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
            value={title} 
            onChange={(e) => onTitleChange(e.target.value)}
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
              <span className="text-gray-600">Draft Saved</span>
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
        
        {/* Multi-Profession Sample Presets Button */}
        <button
          onClick={onOpenProfessionModal}
          className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
          title="Load sample resumes for various professions"
        >
          <Sparkles size={14} className="text-indigo-600" />
          <span>Sample Presets</span>
        </button>

        {/* Template Switcher Button */}
        <button 
          onClick={onOpenTemplateModal}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-300 px-3 py-2 rounded-xl transition-all hover:border-indigo-300 cursor-pointer shadow-2xs"
        >
          <LayoutTemplate size={14} className="text-indigo-600" />
          <span className="hidden sm:inline">Template: </span>
          <span className="text-indigo-700 font-bold">{currentTemplateObj.name.split(' ')[0]}</span>
        </button>

        {/* Primary Action Button: Download PDF */}
        <button 
          onClick={onDownloadClick}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer shrink-0"
          aria-label="Download Resume as PDF"
        >
          <Download size={15} />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>

        {/* Mobile Edit/Preview View Switcher */}
        <div className="flex md:hidden bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => onMobileTabChange('edit')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
              mobileTab === 'edit' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
            }`}
          >
            <Edit3 size={13} />
            Edit
          </button>
          <button
            onClick={() => onMobileTabChange('preview')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
              mobileTab === 'preview' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
            }`}
          >
            <Eye size={13} />
            Preview
          </button>
        </div>
      </div>
    </header>
  );
};
