import React from 'react';
import { AlertTriangle, X, ArrowRight, Download } from 'lucide-react';
import { TabKey } from '@/components/resume/ResumeForm';

interface MissingItem {
  label: string;
  tab: TabKey;
}

interface ReviewDownloadModalProps {
  missingItems: MissingItem[];
  onSelectTab: (tab: TabKey) => void;
  onDownloadAnyway: () => void;
  onClose: () => void;
}

export const ReviewDownloadModal: React.FC<ReviewDownloadModalProps> = ({
  missingItems,
  onSelectTab,
  onDownloadAnyway,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 text-left">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-base">
            <AlertTriangle size={20} />
            <span>Review Before Downloading</span>
          </div>
          <button 
            onClick={onClose}
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
              onClick={() => onSelectTab(item.tab)}
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
              if (missingItems.length > 0) {
                onSelectTab(missingItems[0].tab);
              } else {
                onClose();
              }
            }}
            className="text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-2 cursor-pointer"
          >
            Fill Missing Details
          </button>

          <button
            onClick={onDownloadAnyway}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm cursor-pointer"
          >
            <Download size={14} />
            Download Anyway
          </button>
        </div>
      </div>
    </div>
  );
};
