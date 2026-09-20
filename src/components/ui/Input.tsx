import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
        <input
          id={inputId}
          name={name}
          ref={ref}
          required={required}
          className={`w-full h-10 px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

