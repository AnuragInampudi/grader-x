import React from 'react';

/**
 * Button: reusable styled button component
 * Props:
 * - variant: 'primary' | 'secondary' | 'tertiary' (default: 'primary')
 * - all native button attributes
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  // Base styles for all variants
  const base = 'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variant-specific styles
  let variantStyles = '';
  switch (variant) {
    case 'secondary':
      variantStyles = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300';
      break;
    case 'tertiary':
      variantStyles = 'bg-transparent text-accent hover:text-accent-dark focus:ring-accent';
      break;
    case 'primary':
    default:
      variantStyles = 'bg-accent text-white hover:bg-purple-600 focus:ring-accent';
      break;
  }

  return (
    <button
      className={`${base} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
