import {IconVariants} from '@/components/Icon';
import {twMerge} from 'tailwind-merge';

export default function Skeleton({
  width,
  height,
  variant = width ? IconVariants.NONE : IconVariants.SMALL,
  className,
}: {
  width?: number | string;
  height?: number | string;
  variant?: IconVariants;
  className?: string;
}) {
  return (
    <div
      className={twMerge(className, 'skeleton')}
      style={{
        width: variant === IconVariants.SMALL ? 16 : variant === IconVariants.MEDIUM ? 20 : variant === IconVariants.LARGE ? 24 : width,
        height: variant === IconVariants.SMALL ? 16 : variant === IconVariants.MEDIUM ? 20 : variant === IconVariants.LARGE ? 24 : height,
      }}></div>
  );
}
