import type {HTMLAttributes, PropsWithChildren} from 'react';
import {twMerge} from 'tailwind-merge';
export type TypographyProps = {
  variant?: TypographyVariants;
  className?: string;
  mode?: Mode;
  overrideBase?: boolean;
} & PropsWithChildren &
  HTMLAttributes<HTMLParagraphElement>;

export type Mode = 'normal' | 'bold' | 'bolder';
export type TypographyVariants = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtext' | 'span';
const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  overrideBase = false,
  children,
  className,
  mode = 'normal',
  ...rest
}: TypographyProps) => {
  const Element = (variant === 'subtext' ? 'p' : variant) || 'p';
  return (
    <Element
      className={twMerge(
        !overrideBase && 'text-base-700',
        `${variant === 'subtext' ? 'text-xs p-[3px]' : ''} ${mode === 'bold' ? 'font-medium' : mode === 'bolder' ? 'font-bold' : ''}`,
        className,
      )}
      {...rest}>
      {children}
    </Element>
  );
};

export default Typography;
