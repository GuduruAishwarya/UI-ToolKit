import {twMerge} from 'tailwind-merge';
import Typography from './Typography';

export type SpinnerProps = {
  className?: string;
  spinnerStyles?: string;
  variant?: 'xs' | 'small' | 'large' | 'medium';
  loaderText?: string;
};

const Spinner = ({className, spinnerStyles, variant, loaderText}: SpinnerProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col gap-2.5 justify-center items-center z-10 bg-load-background backdrop-blur-sm top-0 bottom-0 right-0 left-0',
        className,
      )}>
      <div
        className={twMerge(
          'bg-transparent rounded-full border-[5px] border-solid border-t-primary animate-spin',
          variant === 'xs'
            ? 'h-5 w-5 border-[3px]'
            : variant === 'small'
              ? 'h-10 w-10'
              : variant === 'large'
                ? 'h-[60px] w-[60px]'
                : 'h-[50px] w-[50px]',
          spinnerStyles,
        )}
      />
      {loaderText && <Typography variant="subtext">{loaderText}</Typography>}
    </div>
  );
};

export default Spinner;
