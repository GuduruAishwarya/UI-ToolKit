import {twMerge} from 'tailwind-merge';
import type {ButtonProps} from './Button';
import Button from './Button';
import type {TypographyProps} from './Typography';
import Typography from './Typography';
import PopOver from './PopOver';
import type {IconProps} from '@/components/Icon';
import Icon from '@/components/Icon';

export type MenuOption = {
  label: string;
  icon?: IconProps;
  labelProps?: TypographyProps;
} & ButtonProps;
type MenuItemProps = {
  menuOptions: MenuOption[];
  className?: string;
  onClose?: () => void;
  openMenu: boolean;
  elementRef: React.RefObject<HTMLElement>;
  moveLeftBy?: number;
};

const MenuItem = ({menuOptions, className, onClose, openMenu, elementRef, moveLeftBy}: MenuItemProps) => {
  return (
    <PopOver atElement={elementRef} isPopOverOpen={openMenu} onClose={onClose} moveLeftBy={moveLeftBy}>
      <div className={twMerge('rounded-lg bg-base-color absolute border-2 border-solid border-base-200', className)}>
        <div className="flex flex-col gap-[5px] px-2">
          {menuOptions.map((option, index) => {
            const {label, className, icon, ...rest} = option;
            return (
              <Button
                className={twMerge(
                  'flex items-center gap-2 py-2 px-4 w-full enabled:hover:bg-primary-low-contrast enabled:hover:border-transparent enabled:rounded-lg',
                  className,
                )}
                variant="none"
                key={index}
                {...rest}>
                {icon && <Icon {...icon} />}
                <Typography mode="normal" {...option.labelProps}>
                  {label}
                </Typography>
              </Button>
            );
          })}
        </div>
      </div>
    </PopOver>
  );
};

export default MenuItem;
