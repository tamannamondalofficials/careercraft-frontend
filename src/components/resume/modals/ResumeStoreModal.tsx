"use client";

import React, { useState, useEffect } from 'react';
import { ResumeFormData } from '@/types/resume.types';
import { calculateAtsScore } from '@/lib/ats-score';
import { 
  FolderGit2, 
  X, 
  Trash2, 
  FileText, 
  Download, 
  Edit3, 
  Plus, 
  Calendar, 
  Clock, 
  Search,
  CheckCircle2,
  Sparkles,
  Database
} from 'lucide-react';

export interface SavedResumeItem {
  id: string;
  savedAt: string;
  data: ResumeFormData;
  backendId?: string | number;
}

interface ResumeStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: ResumeFormData;
  onLoadResume: (data: ResumeFormData) => void;
  onDownloadResume: (data: ResumeFormData) => void;
}

export const RESUME_STORE_STORAGE_KEY = 'career_craft_resume_store';

export const ResumeStoreModal: React.FC<ResumeStoreModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onLoadResume,
  onDownloadResume,
}) => {
  const [savedResumes, setSavedResumes] = useState<SavedResumeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Load store from localStorage on open
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem(RESUME_STORE_STORAGE_KEY);
        if (stored) {
          setSavedResumes(JSON.parse(stored));
        } else {
          // Initialize with current draft if empty
          if (currentData.full_name?.trim()) {
            const initialItem: SavedResumeItem = {
              id: `resume_${Date.now()}`,
              savedAt: new Date().toISOString(),
              data: currentData,
            };
            setSavedResumes([initialItem]);
            localStorage.setItem(RESUME_STORE_STORAGE_KEY, JSON.stringify([initialItem]));
          }
        }
      } catch (e) {
        console.error("Failed to load resume store", e);
      }
    }
  }, [isOpen, currentData]);

  if (!isOpen) return null;

  const handleSaveCurrent = () => {
    const newItem: SavedResumeItem = {
      id: `resume_${Date.now()}`,
      savedAt: new Date().toISOString(),
      data: { ...currentData },
    };
    const updated = [newItem, ...savedResumes];
    setSavedResumes(updated);
    try {
      localStorage.setItem(RESUME_STORE_STORAGE_KEY, JSON.stringify(updated));
      setSaveSuccessMsg(`Saved "${currentData.full_name || 'Resume'}" to your Resume Store!`);
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (e) {
      console.error("Failed to save to store", e);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedResumes.filter(item => item.id !== id);
    setSavedResumes(updated);
    try {
      localStorage.setItem(RESUME_STORE_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to delete from store", e);
    }
  };

  const filteredResumes = savedResumes.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const name = item.data.full_name?.toLowerCase() || '';
    const title = item.data.job_title?.toLowerCase() || '';
    const template = item.data.template?.toLowerCase() || '';
    return name.includes(query) || title.includes(query) || template.includes(query);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <FolderGit2 size={18} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Resume Store & Version History
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Manage, preview, and load your saved ATS resume profiles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Bar & Search */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 border-b border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>

          {/* Save Current Draft Button */}
          <button
            onClick={handleSaveCurrent}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Save Current as New Version</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {saveSuccessMsg && (
          <div className="px-6 py-2 bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 border-b border-emerald-100">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Resume List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 sm:space-y-3.5 flex-1">
          {filteredResumes.length === 0 ? (
            <div className="text-center py-12 text-gray-500 space-y-3">
              <FileText size={36} className="mx-auto text-gray-300" />
              <p className="text-sm font-medium">No saved resumes found.</p>
              <p className="text-xs text-gray-400">Click &ldquo;Save Current as New Version&rdquo; to store your resume here.</p>
            </div>
          ) : (
            filteredResumes.map((item) => {
              const ats = calculateAtsScore(item.data);
              const formattedDate = new Date(item.savedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-indigo-300 hover:shadow-md transition-all group"
                >
                  <div className="space-y-1 text-left">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {item.data.full_name || 'Untitled Resume'}
                      </h4>
                      <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 uppercase">
                        {item.data.template || 'Executive'}
                      </span>
                      <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border ${ats.color}`}>
                        ATS: {ats.percentage}%
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 font-medium">
                      {item.data.job_title || 'No Job Title Specified'} • {item.data.email || 'No Email'}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-gray-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {formattedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Database size={12} className="text-emerald-500" /> Synced
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <button
                      onClick={() => {
                        onLoadResume(item.data);
                        onClose();
                      }}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors cursor-pointer"
                    >
                      <Edit3 size={13} />
                      <span>Load in Editor</span>
                    </button>

                    <button
                      onClick={() => {
                        onDownloadResume(item.data);
                      }}
                      className="flex items-center justify-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer"
                      title="Download PDF"
                    >
                      <Download size={13} />
                      <span>PDF</span>
                    </button>

                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete version"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500 shrink-0">
          <span className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-indigo-600 shrink-0" />
            <span className="text-[11px] sm:text-xs">{savedResumes.length} saved version{savedResumes.length === 1 ? '' : 's'}</span>
          </span>
          <button
            onClick={onClose}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl text-xs cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
