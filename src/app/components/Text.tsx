import type {ChangeEvent, MutableRefObject} from 'react';
import {ForwardedRef, forwardRef, useEffect, useState} from 'react';
import {twMerge} from 'tailwind-merge';

import Icon , {IconVariants} from '@/components/Icon';
import Tooltip from '@/components/Tooltip';
import Typography from '@/components/Typography';
export type TextProps = {
  autofocus?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  subtext?: string | JSX.Element;
  as?: 'number' | 'text' | 'password' | 'phone';
  errorMessage?: string;
  toolTip?: string | JSX.Element | (() => JSX.Element);
  styles?: {
    inputWrapper?: string;
    input?: string;
  };
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Text = forwardRef(
  (
    {
      autoFocus,
      placeholder,
      subtext,
      label,
      required,
      disabled,
      readOnly,
      value,
      as,
      onChange,
      errorMessage,
      className,
      styles: {input, inputWrapper} = {},
      toolTip,
      ...rest
    }: TextProps,
    ref,
  ) => {
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      if ((as === 'number' && /^[0-9]*$/.test(e.target.value)) || as !== 'number') {
        setInputValue(e.target.value);
        onChange?.(e);
      }
    };
    const [isFocused, setIsFocused] = useState(false);

    const [inputValue, setInputValue] = useState(value || '');
    const [showPwd, setShowPwd] = useState(false);

    useEffect(() => {
      if (value !== inputValue) {
        setInputValue(value || '');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return (
      <div
        className={twMerge(`flex flex-col gap-1 `, className)}
        onFocus={() => {
          setIsFocused(!isFocused);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}>
        {label && (
          <Typography mode="bolder" className="text-base-700 text-sm text-left">
            {label + (required ? '*' : '')}
          </Typography>
        )}
        <div className={`flex flex-col`}>
          <div
            className={twMerge(
              `flex border border-base-300 relative rounded-md items-center bg-base-color p-2 gap-1 min-h-[40px]
             ${isFocused ? 'border border-primary' : ''} ${errorMessage ? 'border-red-high-contrast outline-red-high-contrast' : ''}`,
              inputWrapper,
            )}>
            <input
              autoFocus={autoFocus}
              ref={ref as MutableRefObject<HTMLInputElement>}
              type={showPwd || as === 'number' ? 'text' : as}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              autoComplete="off"
              value={as === 'phone' ? inputValue.toString().replace(/[^\d\-\(\)\s+]/g, '') : inputValue}
              onChange={handleOnChange}
              className={twMerge(
                `border-none outline-none text-base-700 pr-0 flex-grow focus:outline-2 bg-base-color  ${
                  toolTip ? 'max-w-[90%]' : 'max-w-full'
                }`,
                input,
              )}
              {...rest}
            />
            {toolTip && (
              <Tooltip content={toolTip}>
                <Icon name="info-circle"  />
              </Tooltip>
            )}
            {errorMessage && <Icon name="exclamation-circle"  />}

            {as === 'password' &&
              (showPwd ? (
                <Icon onClick={() => setShowPwd(!showPwd)}  name="password-eye-open" />
              ) : (
                <Icon onClick={() => setShowPwd(!showPwd)} name="password-eye-close" />
              ))}
          </div>
          {errorMessage && <Typography className={'text-red-high-contrast text-xs text-left'}>{errorMessage}</Typography>}
          {subtext && (
            <Typography variant="subtext" className="text-base-700">
              {subtext}
            </Typography>
          )}
        </div>
      </div>
    );
  },
);

export default Text;
