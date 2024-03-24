'use client';
import React, {useEffect, useState} from 'react';
import {twMerge} from 'tailwind-merge';
import type {SelectOption} from '@/components/Select';
import Select from '@/components/Select';
import Text from '@/components/Text';
import Typography from '@/components/Typography';

import Icon, {IconVariants} from './Icon';

export type TelephoneOptions = {
  countryName: string;
  countryCode: string;
  dialCode: string;
  patterns: string[];
  maxPhoneLength?: number;
};
type PhoneNumberData = {
  country: string;
  phoneCode: string;
  phoneNumber: string;
  pattern: string;
};
type PhonenumberProps = {
  label?: string;
  required?: boolean;
  onChangeSelect: (phoneCode: string, country: string) => void;
  onChangeInput: (number: string) => void;
  error: string;
  setError: (err: string) => void;
  telephoneOptions: TelephoneOptions[];
  className: string;
  defaultValues?: {
    country?: string;
    dialCode?: string;
    phoneNumber?: string;
    pattern?: string;
  };
  toolTip?: string;
  readonly?: boolean;
};

const formatPattern = (pattern: string, input: string) => {
  let matches;
  switch (pattern) {
    case '###-###-####':
      matches = input?.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (/^(\d{0,3})(\d{0,3})(\d{0,4})$/.test(input)) return matches?.slice(1).filter(Boolean).join('-');
      break;
    case '(###) ###-####':
      if (input.length <= 3 && /(\d{3})/g.test(input)) return input?.replace(/(\d{3})/g, '($1)');
      else if (input.length <= 6 && /(\d{3})(\d{0,3})/g.test(input)) return input?.replace(/(\d{3})(\d{0,3})/g, '($1) $2');
      else if (input.length <= 10 && /(\d{3})(\d{3})(\d{0,4})/g.test(input))
        return input?.replace(/(\d{3})(\d{3})(\d{0,4})/g, '($1) $2-$3');
    case '####-######':
      matches = input?.match(/^(\d{0,4})(\d{0,6})$/);
      if (/^(\d{0,4})(\d{0,6})$/.test(input)) return matches?.slice(1).filter(Boolean).join('-');
      break;
    case '## ### ## ##':
      matches = input?.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
      if (/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/.test(input)) return matches?.slice(1).filter(Boolean).join(' ');
      break;
    case '### ### ###':
      matches = input?.match(/^(\d{0,3})(\d{0,3})(\d{0,3})$/);
      if (/^(\d{0,3})(\d{0,3})(\d{0,3})$/.test(input)) return matches?.slice(1).filter(Boolean).join(' ');
      break;
    case '##########':
      matches = input?.match(/^\d{10}$/);
      if (/^(\d{10})$/.test(input)) return input;
      break;
    default:
      return input;
  }
};
function PhoneNumber({
  label,
  onChangeSelect,
  onChangeInput,
  required,
  error,
  setError,
  telephoneOptions,
  className,
  defaultValues,
  toolTip,
  readonly,
}: PhonenumberProps) {
  const [err, setErr] = useState(error);
  const [phoneData, setPhoneData] = useState<PhoneNumberData>({country: '', phoneCode: '', phoneNumber: '', pattern: ''});
  useEffect(() => {
    if (defaultValues) {
      setPhoneData({
        ...phoneData,
        country: defaultValues.country || '',
        phoneCode: defaultValues?.dialCode || '',
        phoneNumber: formatPattern(defaultValues.pattern!, defaultValues.phoneNumber!.replace(/[-() ]/g, ''))! || '',
        pattern: defaultValues.pattern || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues?.pattern, defaultValues?.phoneNumber, defaultValues?.country]);
  const checkPattern = (e: any, phonePattern: string) => {
    const value = e?.target?.value.replace(/\D/g, '');
    const phoneLength = phonePattern?.split('#')?.length - 1;
    if (value.length > phonePattern?.length || value.length > phoneLength) {
      setErr('Invalid phone number');
    } else if (value.length === phonePattern?.length) {
      if (value.match(phonePattern?.replaceAll('#', '\\d'))) {
        setPhoneData({...phoneData, phoneNumber: value});
        onChangeInput(value);
        e.target.value = value;
      } else setErr('Follow ' + phonePattern + ' pattern');
    } else {
      const formattedNumber = formatPattern(phonePattern, value);
      if (!formattedNumber && value) {
        onChangeInput('');
        setError('Invalid phone number');
      } else {
        setPhoneData({...phoneData, phoneNumber: formattedNumber!});
        onChangeInput(formattedNumber!);
        e.target.value = value;
        setErr('');
      }
    }
  };
  const getTelephoneOptions = () =>
    telephoneOptions.reduce((acc: SelectOption[], v) => {
      if (v?.dialCode) {
        acc.push({
          value: v.countryCode || '',
          label: '+' + v.dialCode + ': ' + v.countryCode + ' (' + v.countryName + ')',
          renderHTML: v.countryCode ? (
            <div className="flex gap-2 items-center">
              {/* <Icon name={`flags/${v.countryCode.toLowerCase()}`} variant={IconVariants.LARGE} /> */}
              <Typography>{'+' + v.dialCode + ': ' + v.countryCode + ' (' + v.countryName + ')'}</Typography>
            </div>
          ) : undefined,
        });
      }
      return acc;
    }, []);

  const phoneCountryChangeHandler = (option: SelectOption) => {
    const phonePattern = telephoneOptions?.find((v) => v?.countryCode === option.value)?.patterns?.[0] || '';
    onChangeSelect(option?.label?.split(':')[0].toString() || '', option?.value?.toString() || '');
    setPhoneData({
      ...phoneData,
      country: option?.value?.toString() || '',
      phoneCode: option?.label?.split(':')[0].toString() || '',
      phoneNumber: formatPattern(
        phonePattern,
        phoneData.phoneNumber?.replace(/[-() ]/g, '').slice(0, phonePattern.replace(/[-() ]/g, '').length),
      )!,
      pattern: phonePattern,
    });
  };
  useEffect(() => {
    if (err) setError(err);
  }, [err, setError]);
  return (
    <div className={twMerge(`flex flex-col  gap-1`, className)}>
      {label && <Typography mode="bolder" className="text-base-700 text-sm">{`${label} ${required ? '*' : ''}`}</Typography>}
      <div className="flex w-full">
        <div className="">
          <Select
            label=""
            readOnly={readonly}
            options={getTelephoneOptions()}
            name={'phoneDialCode'}
            className={'max-w-[85px]'}
            value={phoneData.country}
            textInputStyles={{input: 'max-w-[30px]'}}
            shouldDisplayText
            includeSearch
            displayText={
              <div className="flex gap-1 items-center cursor-pointer">
                <div className="w-4 h-4">
                  {/* <Icon name={`flags/${phoneData.country.toLowerCase()}-sm`} variant={IconVariants.SMALL} /> */}
                </div>
                <Typography className="text-primary-high-contrast text-sm ">{phoneData.phoneCode}</Typography>
              </div>
            }
            onSelectChange={({option}) => {
              phoneCountryChangeHandler(option);
            }}
            styles={{
              searchTextContainer: 'rounded',
              inputWrapper: `h-10 text-base-900 font-bold pl-2 py-[9px] pr-1 rounded-l rounded-r-none border-r-0 bg-base-color text-primary-high-contrast gap-1 ${
                err || error ? ' border-red-high-contrast ' : ''
              }`,
              optionsWrapper: `rounded shadow-md w-fit`,
              chevronStyle: 'text-primary-high-contrast',
            }}
          />
        </div>
        <div className="w-full">
          <Text
            as="phone"
            maxLength={phoneData?.pattern.length}
            value={phoneData.phoneNumber}
            className="text-left gap-1"
            styles={{
              inputWrapper: `h-10 p-1 border rounded-r rounded-l-none  bg-base-color ${
                err || error ? ' border-red-high-contrast border-l-base-200 text-red-high-contrast' : ''
              }`,
              input: 'w-[90%]',
            }}
            readOnly={readonly}
            placeholder={phoneData?.pattern?.replace(/#/g, '_')}
            onChange={(e) => {
              checkPattern(e, phoneData.pattern);
            }}
            onBlur={(e) => {
              checkPattern(e, phoneData.pattern);
            }}
            label={''}
            errorMessage={err || error ? ' ' : undefined}
            toolTip={toolTip}
          />
        </div>
      </div>
      {(err || error) && <Typography className={'text-red-high-contrast text-xs'}>{err || error}</Typography>}
    </div>
  );
}

export default PhoneNumber;
