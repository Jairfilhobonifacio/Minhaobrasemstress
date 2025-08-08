'use client';

import * as React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  className?: string;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, indicatorClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className || ''}`}
        {...props}
      >
        <div
          className={`h-full bg-blue-600 transition-all duration-300 ease-in-out ${indicatorClassName || ''}`}
          style={{ 
            width: `${Math.min(100, Math.max(0, value || 0))}%`
          }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
