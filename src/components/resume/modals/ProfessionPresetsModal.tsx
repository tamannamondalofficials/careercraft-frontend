import React from 'react';
import { Briefcase, X, Code, Layers, TrendingUp, DollarSign, Palette, ArrowRight } from 'lucide-react';
import { PROFESSION_PRESETS, ProfessionSample } from '@/constants/sampleCV';

interface ProfessionPresetsModalProps {
  onSelectPreset: (preset: ProfessionSample) => void;
  onClose: () => void;
}

export const ProfessionPresetsModal: React.FC<ProfessionPresetsModalProps> = ({
  onSelectPreset,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-xs p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden text-left">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-5 border-b border-gray-100 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2 text-gray-900 font-bold text-base sm:text-lg">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Briefcase size={18} />
              </div>
              <span>Load Sample Resume by Profession</span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
              Choose a profession to instantly load complete sample data tailored to that industry.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-2.5 sm:space-y-3 bg-[#F8FAFC]">
          {PROFESSION_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className="p-3.5 sm:p-4 rounded-2xl border border-gray-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/30 transition-all cursor-pointer group flex items-center justify-between shadow-2xs hover:shadow-sm gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {preset.id === 'tech' && <Code size={18} />}
                  {preset.id === 'product' && <Layers size={18} />}
                  {preset.id === 'marketing' && <TrendingUp size={18} />}
                  {preset.id === 'finance' && <DollarSign size={18} />}
                  {preset.id === 'design' && <Palette size={18} />}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-gray-950 group-hover:text-indigo-600 transition-colors">
                      {preset.name}
                    </h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 truncate">
                    Sample Persona: <span className="font-semibold text-gray-700">{preset.data.full_name}</span> ({preset.role})
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                Load <ArrowRight size={14} />
              </span>
            </div>
          ))}
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 sm:py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
