import * as React from 'react';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconColor?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className='relative h-10 w-full'>
        <Slot
          className={cn(
            'absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-gray-500',
            !!props.iconColor ? `text-${props.iconColor}` : ''
          )}
        >
          {props.icon}
        </Slot>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-theme-700 bg-theme-700 px-3 py-2 text-sm ring-offset-theme-700 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            !!props.icon ? 'pl-11' : ''
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
