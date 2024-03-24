import type {FC} from 'react';
import {useEffect, useState} from 'react';
import {twMerge} from 'tailwind-merge';

export type optionsType = {
  label: string | JSX.Element;
  value: string;
};

export type ToggleProps = {
  name?: string;
  options: optionsType[];
  selected: string | '' | undefined;
  onChange: ({selection, name}: any) => void;
  disabled?: boolean;
  className?: string;
};

const Toggle: FC<ToggleProps> = ({selected, onChange, name, options, disabled, className}: ToggleProps) => {
  const [selectedValue, setSelectedValue] = useState(selected);
  const activeOptionIndex = options?.findIndex((option: optionsType) => option.value === selectedValue);

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
    <div className="flex flex-col">
      <div
        className={twMerge(
          'flex relative rounded-[7px] w-min border border-base-300',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}>
        {options?.map((option: optionsType, index: number) => {
          return (
            <div
              key={index}
              className={twMerge(
                'w-max py-2 px-2 text-xs first:border-l-0 last:border-r-0 font-bold text-center relative duration-100 ease-linear flex justify-center cursor-pointer items-center',
                activeOptionIndex === index
                  ? 'text-base-color bg-primary-high-contrast rounded-[6px] border-x-0'
                  : 'border-l border-base-300 text-base-500',
                activeOptionIndex + 1 === index && 'border-l-0',
              )}
              onClick={() => handleSelection(option.value)}>
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Toggle;
