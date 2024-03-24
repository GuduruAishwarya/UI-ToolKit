import {twMerge} from 'tailwind-merge';
import type {IconProps} from './Icon';
import Icon from './Icon';
import Typography from './Typography';

export enum ChipVariant {
  DEFAULT = 'default',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
  RED = 'red',
}

export type ChipProps = {
  chip: string;
  className?: string;
  icon?: IconProps;
  onClick?: () => void;
  styles?: {
    chipStyles?: string;
  };
  variant?: ChipVariant;
};

const Chip = ({chip, className, icon, onClick, variant = ChipVariant.DEFAULT, styles: {chipStyles} = {}}: ChipProps) => {
  return (
    <div
      className={twMerge(
        `flex justify-center items-center border rounded-2xl py-1 px-1 gap-x-1 h-max gap-1 w-fit ${
          variant === ChipVariant.DEFAULT
            ? 'border-base-500 text-base-500'
            : variant === ChipVariant.BLUE
              ? 'border-neutral-high-contrast bg-neutral-low-contrast text-neutral-high-contrast'
              : variant === ChipVariant.GREEN
                ? 'border-green-high-contrast bg-green-low-contrast text-green-high-contrast'
                : variant === ChipVariant.YELLOW
                  ? 'border-yellow-high-contrast bg-yellow-low-contrast text-yellow-high-contrast'
                  : 'border-red-high-contrast bg-red-low-contrast text-red-high-contrast'
        }`,
        className,
      )}
      onClick={onClick}>
      <Typography
        overrideBase={true}
        className={twMerge(
          'min-w-[60px] px-1.5 text-center overflow-hidden text-ellipsis whitespace-nowrap font-bold text-xs',
          chipStyles,
        )}>
        {chip}
      </Typography>
      {icon && (
        <Icon
          {...icon}
          className={
            variant === ChipVariant.GREEN
              ? 'fill-green-high-contrast text-green-high-contrast'
              : variant === ChipVariant.YELLOW
                ? 'fill-yellow-high-contrast text-yellow-high-contrast '
                : variant === ChipVariant.DEFAULT
                  ? 'fill-base-500 text-base-500'
                  : ''
          }
        />
      )}
    </div>
  );
};
export default Chip;
