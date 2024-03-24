'use client';
import type {FC} from 'react';
import React, {useEffect, useRef, useState} from 'react';

import Typography from '@/components/Typography';
import {twMerge} from 'tailwind-merge';

type SecurityCodeProps = {
  errorMessage?: string;
  onChange: (otpCode: string, event?: React.ChangeEvent) => void;
  styles?: {
    input?: string;
    wrapper?: string;
  };
};

const SecurityCode: FC<SecurityCodeProps> = ({errorMessage, onChange, styles: {input, wrapper} = {}}: SecurityCodeProps): JSX.Element => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [activeOTPindex, setActiveOTPindex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const ignoreOnChangeCall = useRef(false);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    if (!ignoreOnChangeCall.current && inputRef.current) {
      const {
        target: {value},
      } = ev;
      const numRegex = /^[0-9]*$/;
      if (!numRegex.test(value)) return;
      const newOTP: string[] = [...otp];
      newOTP[activeOTPindex] = value[(inputRef.current.selectionStart || 1) - 1];
      if (!value) setActiveOTPindex(activeOTPindex - 1);
      else {
        if (activeOTPindex < 5) {
          setActiveOTPindex(activeOTPindex + 1);
        }
      }
      onChange?.(newOTP.join().replaceAll(',', ''), ev);
      setOtp(newOTP);
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const otps = [...otp];
      if (!otps[index] && index > 0) {
        setActiveOTPindex(index - 1);
      }
      otps[index] = '';
      setOtp(otps);

      ignoreOnChangeCall.current = true;
      onChange(otps.join().replaceAll(',', ''));

      setTimeout(() => {
        ignoreOnChangeCall.current = false;
      }, 0);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    ignoreOnChangeCall.current = true;
    const pastedContent: string | string[] = e.clipboardData.getData('text/plain');
    const pattern = /^[0-9]{0,6}$/;
    if (!pattern.test(pastedContent)) {
      return;
    }
    const newOTP = [...otp.slice(0, index)];
    const content = pastedContent.split('');
    newOTP.push(...content.slice(0, 6 - index));
    if (newOTP.length < 6) {
      newOTP.push(...otp.slice(newOTP.length));
    }

    setOtp(newOTP.slice(0, 6));
    setActiveOTPindex(Math.min(6, index + pastedContent.length));
    onChange(newOTP.join().replaceAll(',', ''));
    setTimeout(() => {
      ignoreOnChangeCall.current = false;
    }, 0);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPindex]);

  const handleFocus = (index: number) => {
    if (index !== activeOTPindex) {
      setActiveOTPindex(index);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-4">
      <div className={twMerge('flex gap-4', wrapper)}>
        {otp?.map((_, index) => {
          return (
            <div key={index}>
              <input
                autoComplete="off"
                onKeyDown={(e) => {
                  handleOnKeyDown(e, index);
                }}
                value={otp[index]}
                ref={index === activeOTPindex ? inputRef : null}
                onChange={handleChange}
                onFocus={() => handleFocus(index)}
                type="text"
                className={twMerge(
                  `otp-inputfield h-[90px] w-[80px] rounded-lg font-normal 
              text-6xl border focus:border-2 bg-transparent outline-none text-center text-base-700 transition ${
                errorMessage
                  ? 'border-red-high-contrast focus:border-red-high-contrast border-2'
                  : 'focus:border-yellow-high-contrast border-base-300'
              }`,
                  input,
                )}
                onPaste={(e) => handlePaste(e, index)}></input>
            </div>
          );
        })}
      </div>
      {errorMessage && <Typography className="text-red-high-contrast">{errorMessage}</Typography>}
    </div>
  );
};

export default SecurityCode;
