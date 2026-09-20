import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';

interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onFitWidth?: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitWidth
}) => {
  return (
    <div className="fixed sm:absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xl rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-1.5 text-xs text-gray-700 max-w-[calc(100vw-32px)]">
      <button 
        onClick={onZoomOut} 
        className="p-1.5 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors text-gray-600 hover:text-gray-900 cursor-pointer"
        title="Zoom out"
        aria-label="Zoom out"
      >
        <ZoomOut size={15} />
      </button>

      <span className="font-semibold px-1 text-gray-800 w-11 sm:w-12 text-center select-none text-[11px] sm:text-xs">
        {Math.round(zoomLevel * 100)}%
      </span>

      <button 
        onClick={onZoomIn} 
        className="p-1.5 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors text-gray-600 hover:text-gray-900 cursor-pointer"
        title="Zoom in"
        aria-label="Zoom in"
      >
        <ZoomIn size={15} />
      </button>

      {onFitWidth && (
        <>
          <div className="h-4 w-px bg-gray-200 mx-0.5" />
          <button 
            onClick={onFitWidth} 
            className="flex items-center gap-1 px-2 py-1 hover:bg-indigo-50 active:bg-indigo-100 text-indigo-700 rounded-md transition-colors text-[11px] font-semibold cursor-pointer"
            title="Fit to screen width"
            aria-label="Fit resume to screen width"
          >
            <Maximize2 size={12} />
            <span>Fit</span>
          </button>
        </>
      )}

      <div className="h-4 w-px bg-gray-200 mx-0.5" />

      <button 
        onClick={onResetZoom} 
        className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-colors text-gray-600 hover:text-gray-900 text-[11px] font-medium cursor-pointer"
        title="Reset Zoom to 100%"
        aria-label="Reset zoom"
      >
        <RotateCcw size={12} />
        <span className="hidden sm:inline">Reset</span>
      </button>
    </div>
  );
};
