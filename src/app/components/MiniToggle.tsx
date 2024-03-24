'use client';
import type {FC} from 'react';
import {useEffect, useMemo, useState} from 'react';
import Button from './Button';
import Icon from '@/components/Icon';
import Typography from './Typography';

export type hintTextPosition = 'bottom' | 'right' | 'top' | 'left' | undefined;
type ToggleOnChange = {toggleValue: boolean; name?: string};
export type ToggleProps = {
  checked: boolean;
  onChange?: ({toggleValue, name}: ToggleOnChange) => void;
  hintChecked: string;
  hintUnchecked: string;
  disabled?: boolean;
  hintTextPosition?: hintTextPosition;
  name?: string;
};

const MiniToggle: FC<ToggleProps> = ({checked, hintTextPosition, onChange, name, hintChecked, hintUnchecked, disabled}: ToggleProps) => {
  const [toggle, setToggle] = useState<boolean>(checked || false);

  const handleToggle = () => {
    if (!disabled) {
      setToggle(!toggle);
      onChange?.({toggleValue: !toggle, name});
    }
  };

  useEffect(() => {
    setToggle(checked);
  }, [checked]);

  const subtextOrientationStyle = useMemo(() => {
    return hintTextPosition === 'right'
      ? 'flex items-center'
      : hintTextPosition === 'left'
        ? 'flex items-center flex-row-reverse'
        : hintTextPosition === 'top'
          ? 'flex flex-col-reverse'
          : 'flex flex-col';
  }, [hintTextPosition]);

  return (
    <div className={'gap-2 w-min whitespace-nowrap ' + subtextOrientationStyle}>
      <Button
        variant="none"
        className={`w-16 rounded-full py-0.5 px-[3px] h-8 flex items-center min-w-0 border-none bg-transparent 
        ${toggle ? 'bg-primary-high-contrast hover:enabled:bg-primary-high-contrast' : 'bg-base-200  hover:enabled:bg-base-200'}         
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        `}
        onClick={handleToggle}>
        <div
          className={`h-6 w-6 flex items-center justify-center rounded-full duration-300 ease-in-out
            ${toggle ? 'bg-base-color transform translate-x-[34px]' : 'bg-base-500 '}`}>
          {toggle ? (
            <Icon name="check" width={13} height={13} className="text-green-bright" />
          ) : (
            <Icon name="cross-no-circle" width={12} height={12} />
          )}
        </div>
      </Button>
      {(hintChecked || hintUnchecked) && (
        <Typography variant="p" mode="normal" className="text-base-700 text-xs">
          {toggle ? hintChecked : hintUnchecked}
        </Typography>
      )}
    </div>
  );
};

MiniToggle.defaultProps = {
  checked: false,
};

export default MiniToggle;
