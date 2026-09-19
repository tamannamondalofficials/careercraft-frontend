import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 mb-4">
        {label && (
          <label className="text-sm font-semibold text-[color:var(--text-muted)] tracking-wide uppercase text-xs">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`px-4 py-3 rounded-lg border border-[color:var(--text-muted)] border-opacity-30 bg-[color:var(--background)] bg-opacity-50 text-[color:var(--foreground)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent transition-all shadow-sm min-h-[120px] resize-y ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
