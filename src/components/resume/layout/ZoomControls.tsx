import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom
}) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xl rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs text-gray-700">
      <button 
        onClick={onZoomOut} 
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
        onClick={onZoomIn} 
        className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-900 cursor-pointer"
        title="Zoom in"
        aria-label="Zoom in"
      >
        <ZoomIn size={15} />
      </button>
      <div className="h-4 w-px bg-gray-200 mx-1" />
      <button 
        onClick={onResetZoom} 
        className="flex items-center gap-1 px-2 py-0.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600 hover:text-gray-900 text-[11px] font-medium cursor-pointer"
        title="Reset Zoom"
        aria-label="Reset zoom to default"
      >
        <RotateCcw size={12} />
        Reset
      </button>
    </div>
  );
};
