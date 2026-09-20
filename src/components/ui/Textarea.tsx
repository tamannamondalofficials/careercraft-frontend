import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, required, id, name, ...props }, ref) => {
    const inputId = id || name;

    return (
      <div className="w-full flex flex-col items-start mb-3">
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-xs md:text-sm font-medium text-gray-700 text-left mb-1 flex items-center gap-1"
          >
            {label}
            {required && <span className="text-red-500 font-bold" title="Required">*</span>}
          </label>
        )}
        <textarea
          id={inputId}
          name={name}
          ref={ref}
          required={required}
          className={`w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 min-h-[100px] resize-y transition-all ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium mt-1">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

