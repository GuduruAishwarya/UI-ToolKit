import type {ChangeEvent} from 'react';
import {useEffect, useState} from 'react';
import {twMerge} from 'tailwind-merge';

import Typography from './Typography';

type CheckboxProps = {
  name?: string;
  label?: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({name, label, checked = false, onChange, className, ...rest}: CheckboxProps) => {
  const [selected, setSelected] = useState(checked);

  useEffect(() => {
    setSelected(checked);
  }, [checked]);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.checked);
    onChange?.(e);
  };
  return (
    <div className={twMerge('flex ', className)}>
      <label className="relative self-start mr-6">
        <input
          type="checkbox"
          name={name}
          checked={selected}
          onChange={handleCheck}
          className="h-5 w-5 min-h-0 checked:bg-primary after:block cursor-pointer disabled:cursor-not-allowed absolute opacity-0 peer"
          {...rest}
        />
        <span className="absolute cursor-pointer -top-[9px] left-0 w-5 h-5 border-2 border-base-700 rounded after:content-[''] after:absolute after:hidden after:left-[5px] after:top-[1px] after:w-[6px] after:h-[12px] after:border-white after:border-y-0 after:border-r-[3px] after:border-b-[3px] after:rotate-45 hover:shadow peer-disabled:cursor-not-allowed peer-disabled:opacity-60 peer-checked:bg-primary peer-checked:checkbox-after-style"></span>
      </label>
      {label && (
        <Typography mode="bolder" className="">
          {label}
        </Typography>
      )}
    </div>
  );
};

export default Checkbox;
