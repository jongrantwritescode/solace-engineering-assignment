import { ReactNode } from 'react';

interface BannerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export function Banner({ 
  children, 
  className = '', 
  variant = 'default' 
}: BannerProps) {
  const baseClasses = "py-2 px-4 text-center text-sm text-white";
  
  const variantClasses = {
    default: "bg-green-800",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    error: "bg-red-600"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
}
