import { cn } from '@/lib/utils';
import { type ClassValue } from 'clsx';

type ITitleProps = {
  title: string;
  description?: string;
  center?: boolean;
  className?: ClassValue;
  containerClassName?: ClassValue;
  children?: any;
};

export const Title = ({
  title,
  description,
  center,
  className,
  containerClassName,
  children,
}: ITitleProps) => {
  return (
    <div
      className={cn(
        `container`,
        center ? 'flex flex-col items-center justify-center text-center' : '',
        className
      )}
    >
      <div
        className={cn(
          'flex w-fit flex-col gap-2',
          center ? 'items-center justify-center text-center' : '',
          containerClassName
        )}
      >
        <h1 className='font-sora text-4xl font-bold text-theme-400'>{title}</h1>
        {description && (
          <>
            <div className={`h-1 w-1/3 bg-theme-400`} />
            <p className='text-lg'>{description}</p>
          </>
        )}
        {!!children && children}
      </div>
    </div>
  );
};
