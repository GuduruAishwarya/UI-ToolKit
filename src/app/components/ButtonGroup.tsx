import type {FC} from 'react';
import {useEffect, useState} from 'react';
import {twMerge} from 'tailwind-merge';

export type optionsType = {
  label: string | JSX.Element;
  value: string;
  className?: string;
};

export type ButtonGroupProps = {
  name: string;
  options: optionsType[];
  selected: string | '' | undefined;
  onChange: ({selection, name}: any) => void;
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
};

const ButtonGroup: FC<ButtonGroupProps> = ({
  selected,
  onChange,
  name,
  options,
  disabled,
  className,
  wrapperClassName,
}: ButtonGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(selected);
  const activeOptionIndex = options?.findIndex((option) => option.value === selectedValue);

  const handleSelection = (selection: string) => {
    if (!disabled) {
      setSelectedValue(selection);
      onChange?.({selection, name});
    }
  };

  useEffect(() => {
    setSelectedValue(selected);
  }, [selected]);

  return (
    <div className={twMerge('flex flex-col', wrapperClassName)}>
      <div
        className={twMerge(
          'flex relative rounded-[7px] w-min border border-base-300',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}>
        {options.map((option, index) => (
          <div
            key={index}
            className={twMerge(
              'capitalize w-min px-2 py-3  text-xs first:border-l-0 last:border-r-0 font-bold text-center relative duration-100 ease-linear flex justify-center cursor-pointer items-center',
              activeOptionIndex === index
                ? 'text-base-color bg-primary-high-contrast rounded-md border-x-0'
                : 'border-l border-base-300 text-base-500',
              activeOptionIndex + 1 === index && 'border-l-0',
              option.className,
            )}
            onClick={() => handleSelection(option.value)}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
