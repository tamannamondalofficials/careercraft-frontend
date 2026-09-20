import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

