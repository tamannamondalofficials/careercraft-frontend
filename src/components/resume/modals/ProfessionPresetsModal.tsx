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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-xs p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden text-left">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Briefcase size={18} />
              </div>
              <span>Load Sample Resume by Profession</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Choose a profession to instantly load complete sample data tailored to that industry.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-3 bg-[#F8FAFC]">
          {PROFESSION_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className="p-4 rounded-2xl border border-gray-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/30 transition-all cursor-pointer group flex items-center justify-between shadow-2xs hover:shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {preset.id === 'tech' && <Code size={20} />}
                  {preset.id === 'product' && <Layers size={20} />}
                  {preset.id === 'marketing' && <TrendingUp size={20} />}
                  {preset.id === 'finance' && <DollarSign size={20} />}
                  {preset.id === 'design' && <Palette size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-gray-950 group-hover:text-indigo-600 transition-colors">
                      {preset.name}
                    </h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
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

        <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
