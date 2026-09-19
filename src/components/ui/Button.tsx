import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  // In a real app with Tailwind or styled-components, you'd map these to classes
  // For now, mapping to existing generic classes based on variant
  const baseClass = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : '';
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${className}`.trim()} 
      {...props}
    >
      {children}
    </button>
  );
};
