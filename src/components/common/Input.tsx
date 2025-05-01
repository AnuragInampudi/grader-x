import React from 'react';

/**
 * Input: reusable styled input component
 * Props:
 * - variant: 'default' | 'outline' | 'filled' (default: 'default')
 * - label?: optional label text above input
 * - error?: optional error message displayed below input
 * - all native input attributes
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outline' | 'filled';
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  label,
  error,
  className = '',
  ...props
}) => {
  let baseClasses = 'block w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1';
  let variantClasses = '';
  switch (variant) {
    case 'outline':
      variantClasses = 'border border-gray-300 focus:ring-accent';
      break;
    case 'filled':
      variantClasses = 'bg-gray-100 focus:ring-accent';
      break;
    case 'default':
    default:
      variantClasses = 'border-b border-gray-300 focus:border-accent focus:ring-transparent';
      break;
  }

  return (
    <div className={`mb-4 ${className}`}> 
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input className={`${baseClasses} ${variantClasses}`} {...props} />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};
