import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 mb-4">
        {label && (
          <label className="text-sm font-semibold text-[color:var(--text-muted)] tracking-wide uppercase text-xs">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-4 py-2.5 rounded-lg border border-[color:var(--text-muted)] border-opacity-30 bg-[color:var(--background)] bg-opacity-50 text-[color:var(--foreground)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent transition-all shadow-sm ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
