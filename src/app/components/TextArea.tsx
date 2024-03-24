import type {ChangeEvent, ChangeEventHandler} from 'react';
import {useEffect, useState} from 'react';
import {twMerge} from 'tailwind-merge';

import Typography from '@/components/Typography';

export type TextAreaProps = {
  rows?: number;
  label?: string;
  subtext?: string;
  errorMessage?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  resize?: boolean;
  styles?: {
    textareaWrapper?: string;
    textarea?: string;
  };
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
const TextArea = ({
  rows,
  value,
  onChange,
  required,
  label,
  subtext,
  className,
  resize,
  errorMessage,
  styles: {textarea, textareaWrapper} = {},
  ...rest
}: TextAreaProps) => {
  const [input, setInput] = useState(value);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = (event.target as HTMLTextAreaElement).value;
    setInput(value);
    onChange?.(event);
  };
  return (
    <div className={twMerge('flex flex-col gap-y-1', className)}>
      {label && <Typography mode="bolder">{label + (required ? '*' : '')}</Typography>}
      <div className={twMerge(`flex flex-col ${!resize ? 'resize-none' : ''}`, textareaWrapper)}>
        <textarea onChange={handleChange} rows={rows} value={input} {...rest} className={twMerge(' cursor-auto', textarea)} />
        {subtext && <span className={'text-sm p-[3px]'}>{subtext}</span>}
        {errorMessage && <Typography className={'text-red-high-contrast text-xs'}>{errorMessage}</Typography>}
      </div>
    </div>
  );
};

TextArea.defaultProps = {
  rows: 4,
};

export default TextArea;
