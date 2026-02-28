import ShinyButton from '@/components/magicui/shiny-button';
import { cn } from '@/lib/utils';

type IShinyDefaultButtonProps = {
  text: string;
  icon?: React.ReactNode;
  className?: string;
};

export const ShinyDefaultButton = ({
  text,
  icon,
  className,
}: IShinyDefaultButtonProps) => {
  return (
    <>
      <ShinyButton
        text={text}
        icon={icon}
        className={cn(
          'max-lg:text-md flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-md bg-theme-400 px-4 py-2 text-lg font-bold text-theme-900 ring-offset-background transition-colors hover:bg-theme-400/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          className
        )}
      />
    </>
  );
};
